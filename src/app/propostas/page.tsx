import Link from "next/link";
import { formatDate, resultLabel } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Propostas" };

export default async function PropostasPage() {
  const proposals = await prisma.proposal.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      authorParty: true,
      votes: { orderBy: { date: "desc" }, take: 1 },
      themes: { include: { theme: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Propostas</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Título oficial + explicação em linguagem simples. Só com fonte oficial.
        </p>
      </div>
      <div className="space-y-4">
        {proposals.map((p) => {
          const vote = p.votes[0];
          return (
            <Link
              key={p.id}
              href={`/propostas/${p.slug}`}
              className="block rounded-3xl border border-border bg-card p-5 hover:border-accent/40"
            >
              <div className="mb-2 flex flex-wrap gap-2 text-xs text-muted">
                {vote && <span>{formatDate(vote.date)}</span>}
                {p.authorParty && (
                  <>
                    <span>·</span>
                    <span>{p.authorParty.name}</span>
                  </>
                )}
                {vote && (
                  <>
                    <span>·</span>
                    <span>{resultLabel(vote.result)}</span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-medium md:text-2xl">{p.plainTitle}</h2>
              <p className="mt-1 text-sm text-muted line-clamp-2">{p.officialTitle}</p>
              {p.themes.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.themes.map((t) => (
                    <span
                      key={t.themeId}
                      className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                    >
                      {t.theme.name}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
