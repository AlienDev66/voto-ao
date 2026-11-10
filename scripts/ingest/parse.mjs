#!/usr/bin/env node
/**
 * Lê SourceDocument (texto ou PDF local) e cria VoteExtraction.
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  ARCHIVE,
  ensureDirs,
  extractPdfText,
  extractVotesFromText,
  stripHtml,
} from "./lib.mjs";

const prisma = new PrismaClient();

async function main() {
  ensureDirs();
  const docs = await prisma.sourceDocument.findMany({
    where: { status: { in: ["fetched", "parsed", "discovered"] } },
  });

  let created = 0;
  let parsed = 0;

  for (const doc of docs) {
    try {
      let text = doc.textExtract || "";
      const abs = doc.localPath ? path.join(ARCHIVE, doc.localPath) : null;

      if ((!text || text.length < 40) && abs && fs.existsSync(abs)) {
        if (/\.pdf$/i.test(abs) || /pdf/i.test(doc.mimeType || "")) {
          text = await extractPdfText(abs);
        } else {
          text = stripHtml(fs.readFileSync(abs, "utf8"));
        }
      }

      // Também aceita .txt paralelos em data/archive/text/
      const txtSidecar = path.join(ARCHIVE, "text", `${doc.id}.txt`);
      const txtBySlug = doc.localPath
        ? path.join(ARCHIVE, "text", path.basename(doc.localPath).replace(/\.[^.]+$/, ".txt"))
        : null;
      for (const p of [txtSidecar, txtBySlug]) {
        if (p && fs.existsSync(p)) {
          text = `${text}\n${fs.readFileSync(p, "utf8")}`;
        }
      }

      if (!text || text.length < 40) {
        await prisma.sourceDocument.update({
          where: { id: doc.id },
          data: { status: "failed", parseError: "sem texto extraível" },
        });
        continue;
      }

      const extractions = extractVotesFromText(text, {
        url: doc.url,
        title: doc.title || "",
      });

      // Replace previous auto extractions for this document that are still needs_review
      await prisma.voteExtraction.deleteMany({
        where: { documentId: doc.id, status: "needs_review", voteId: null },
      });

      for (const ex of extractions) {
        await prisma.voteExtraction.create({
          data: {
            documentId: doc.id,
            title: ex.title,
            plainTitle: ex.plainTitle,
            date: ex.date ? new Date(ex.date) : null,
            stage: ex.stage,
            votesFor: ex.votesFor,
            votesAgainst: ex.votesAgainst,
            abstentions: ex.abstentions,
            result: ex.result,
            confidence: ex.confidence,
            status: ex.confidence >= 0.7 ? "needs_review" : "needs_review",
            rawSnippet: ex.rawSnippet,
          },
        });
        created++;
      }

      await prisma.sourceDocument.update({
        where: { id: doc.id },
        data: {
          textExtract: text.slice(0, 200_000),
          status: "parsed",
          parseError: null,
        },
      });
      parsed++;
      console.log(`PARSED ${doc.url} → ${extractions.length} extracções`);
    } catch (e) {
      await prisma.sourceDocument.update({
        where: { id: doc.id },
        data: { status: "failed", parseError: e.message },
      });
      console.warn(`FAIL parse ${doc.url}: ${e.message}`);
    }
  }

  console.log(`Parse done. docs=${parsed} extractions=${created}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
