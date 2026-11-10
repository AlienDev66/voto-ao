import Link from "next/link";
import { notFound } from "next/navigation";
import { VoteResultBars } from "@/components/VoteResultBars";
import { formatDate, resultLabel, stanceLabel } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const proposal = await prisma.proposal.findUnique({ where: { slug } });
  return { title: proposal?.plainTitle ?? "Proposta" };
}

export default async function PropostaPage({ params }: Props) {
  const { slug } = await params;
  const proposal = await prisma.proposal.findUnique({
    where: { slug },
    include: {
      authorParty: true,
      themes: { include: { theme: true } },
      votes: {
        orderBy: { date: "desc" },
        include: {
          positions: { include: { party: true }, orderBy: { party: { sortOrder: "asc" } } },
        },
      },
    },
  });
  if (!proposal) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <div>
        <p className="text-sm text-muted">
          <Link href="/propostas" className="hover:text-accent">
            Propostas
          </Link>
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{proposal.plainTitle}</h1>
        <p className="mt-2 text-sm text-muted">{proposal.officialTitle}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {proposal.authorLabel && (
            <span className="rounded-full border border-border px-3 py-1">{proposal.authorLabel}</span>
          )}
          {proposal.themes.map((t) => (
            <Link
              key={t.themeId}
              href={`/temas/${t.theme.slug}`}
              className="rounded-full border border-border px-3 py-1 text-muted hover:text-accent"
            >
              {t.theme.name}
            </Link>
          ))}
        </div>
      </div>

      {proposal.plainSummary && (
        <section className="rounded-3xl border border-border bg-card p-5">
          <h2 className="mb-2 font-semibold">Em linguagem simples</h2>
          <p className="leading-relaxed text-muted">{proposal.plainSummary}</p>
        </section>
      )}

      {proposal.votes.map((vote) => (
        <section key={vote.id} className="rounded-3xl border border-border bg-card p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>{formatDate(vote.date)}</span>
            <span>·</span>
            <span>{vote.stage}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                vote.result === "aprovada"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-rose-500/15 text-rose-300"
              }`}
            >
              {resultLabel(vote.result)}
            </span>
          </div>
          <VoteResultBars
            votesFor={vote.votesFor}
            votesAgainst={vote.votesAgainst}
            abstentions={vote.abstentions}
          />
          <h3 className="mb-2 mt-6 text-sm font-medium text-muted">Posição por partido</h3>
          <ul className="space-y-2">
            {vote.positions.map((pos) => (
              <li key={pos.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: pos.party.color }} />
                  {pos.party.name}
                </span>
                <span className="text-muted">{stanceLabel(pos.stance)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Fonte:{" "}
            <a href={vote.sourceUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              {vote.sourceLabel}
            </a>
          </p>
        </section>
      ))}
    </div>
  );
}
