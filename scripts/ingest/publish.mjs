#!/usr/bin/env node
/**
 * Publica VoteExtraction com confiança alta (ou --all-review) como Proposal + Vote.
 * Posições partido a partido ficam "desconhecido" quando a fonte não as indica.
 *
 * Usage:
 *   node scripts/ingest/publish.mjs
 *   node scripts/ingest/publish.mjs --min-confidence=0.65
 *   node scripts/ingest/publish.mjs --ids=abc,def
 */
import { PrismaClient } from "@prisma/client";
import { slugify } from "./lib.mjs";

const prisma = new PrismaClient();

function arg(name, fallback = null) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
}

async function main() {
  const minConfidence = Number(arg("min-confidence", "0.68"));
  const onlyIds = arg("ids");
  const force = process.argv.includes("--force");

  const where = {
    status: "needs_review",
    voteId: null,
    confidence: { gte: minConfidence },
    votesFor: { not: null },
    votesAgainst: { not: null },
  };
  if (onlyIds) where.id = { in: onlyIds.split(",").map((s) => s.trim()).filter(Boolean) };

  const candidates = await prisma.voteExtraction.findMany({
    where,
    include: { document: true },
    orderBy: [{ confidence: "desc" }, { date: "desc" }],
  });

  const parties = await prisma.party.findMany();
  let published = 0;

  for (const ex of candidates) {
    if (!force && (!ex.result || ex.votesFor == null || ex.votesAgainst == null)) continue;

    const abstentions = ex.abstentions ?? 0;
    const result =
      ex.result || (ex.votesFor >= ex.votesAgainst ? "aprovada" : "rejeitada");
    const date = ex.date || new Date();
    const baseSlug = slugify(ex.plainTitle || ex.title) || `votacao-${ex.id.slice(0, 8)}`;
    let slug = baseSlug;
    let n = 2;
    while (await prisma.proposal.findUnique({ where: { slug } })) {
      // Same source URL → skip duplicate publish
      const existing = await prisma.proposal.findFirst({
        where: { sourceUrl: ex.document.url, plainTitle: ex.plainTitle || ex.title },
      });
      if (existing) {
        slug = null;
        break;
      }
      slug = `${baseSlug}-${n++}`;
    }
    if (!slug) {
      await prisma.voteExtraction.update({
        where: { id: ex.id },
        data: { status: "rejected" },
      });
      continue;
    }

    const proposal = await prisma.proposal.create({
      data: {
        slug,
        officialTitle: ex.title,
        plainTitle: ex.plainTitle || ex.title,
        plainSummary: ex.rawSnippet
          ? `Extraído automaticamente de fonte oficial. ${ex.rawSnippet}`
          : "Extraído automaticamente de fonte oficial da Assembleia Nacional.",
        status: result,
        authorLabel: "Assembleia Nacional (fonte oficial)",
        sourceUrl: ex.document.url,
        sourceLabel: labelFor(ex.document),
      },
    });

    const vote = await prisma.vote.create({
      data: {
        proposalId: proposal.id,
        date,
        stage: ex.stage || "Plenário",
        votesFor: ex.votesFor,
        votesAgainst: ex.votesAgainst,
        abstentions,
        result,
        sourceUrl: ex.document.url,
        sourceLabel: labelFor(ex.document),
        positions: {
          create: parties.map((p) => ({
            partyId: p.id,
            stance: "desconhecido",
          })),
        },
      },
    });

    await prisma.voteExtraction.update({
      where: { id: ex.id },
      data: {
        status: "published",
        proposalId: proposal.id,
        voteId: vote.id,
      },
    });
    published++;
    console.log(`PUBLISH ${slug} (${ex.votesFor}/${ex.votesAgainst}/${abstentions})`);
  }

  console.log(`Publish done. published=${published} scanned=${candidates.length}`);
}

function labelFor(doc) {
  if (doc.kind === "noticia") return "Assembleia Nacional — Notícia";
  if (doc.kind === "dan_i") return "Diário da Assembleia Nacional — I Série";
  if (doc.kind === "dan_ii") return "Diário da Assembleia Nacional — II Série";
  if (doc.kind === "pdf") return "Assembleia Nacional — PDF";
  return "Assembleia Nacional";
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
