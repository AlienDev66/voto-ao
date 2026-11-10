import Link from "next/link";
import { VoteCard } from "@/components/VoteCard";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Votações" };

export default async function VotacoesPage() {
  const votes = await prisma.vote.findMany({
    orderBy: { date: "desc" },
    include: {
      proposal: { include: { authorParty: true, themes: { include: { theme: true } } } },
      positions: { include: { party: true } },
    },
  });

  const pages = Math.max(1, Math.ceil(votes.length / 24));

  return (
    <div className="light-section min-h-full">
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-10 lg:px-6 lg:py-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">Votações</h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-zinc-500">
            Todas as votações em plenário com fonte oficial — incluindo extracções automáticas de
            notícias e Diários da Assembleia Nacional. Em Angola o registo costuma trazer totais; a
            posição partido a partido só aparece quando a fonte a indica.{" "}
            <Link href="/arquivo" className="underline decoration-zinc-300 underline-offset-2 hover:text-black">
              arquivo oficial
            </Link>
            {" · "}
            <Link href="/metodologia" className="underline decoration-zinc-300 underline-offset-2 hover:text-black">
              metodologia
            </Link>
            .
          </p>
        </div>

        <Link
          href="/agenda"
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-100/80 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          <BallotIcon />
          <span className="font-medium">Próximas votações e agenda do Plenário</span>
          <span className="ml-auto font-semibold text-black">Ver a agenda →</span>
        </Link>

        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-black">Filtros</span>
            <span className="text-zinc-500">Em breve</span>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          {votes.length} votações · página 1 de {pages}
        </p>

        {votes.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-500">
            Ainda sem votações nesta base.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {votes.map((v) => (
              <VoteCard
                key={v.id}
                href={`/propostas/${v.proposal.slug}`}
                date={v.date}
                stage={v.stage}
                result={v.result}
                title={v.proposal.plainTitle}
                officialRef={v.proposal.officialTitle.slice(0, 56)}
                authorParty={v.proposal.authorParty}
                authorLabel={v.proposal.authorLabel}
                themes={v.proposal.themes.map((t) => t.theme)}
                votesFor={v.votesFor}
                votesAgainst={v.votesAgainst}
                abstentions={v.abstentions}
                positions={v.positions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BallotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}
