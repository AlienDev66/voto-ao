import Link from "next/link";
import { GuessGame } from "@/components/GuessGame";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Adivinha o voto" };

export default async function JogoPage() {
  const [parties, vote] = await Promise.all([
    prisma.party.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.vote.findFirst({
      orderBy: { date: "desc" },
      include: {
        proposal: true,
        positions: true,
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-muted">Jogo diário</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Adivinha o voto?</h1>
      <p className="mt-3 text-lg text-muted">
        Uma votação real. Diz como achas que votou cada partido e vê quantos acertas.
      </p>
      <div className="mt-8">
        <GuessGame
          parties={parties}
          vote={
            vote
              ? {
                  id: vote.id,
                  date: vote.date.toISOString(),
                  stage: vote.stage,
                  result: vote.result,
                  votesFor: vote.votesFor,
                  votesAgainst: vote.votesAgainst,
                  abstentions: vote.abstentions,
                  proposal: {
                    slug: vote.proposal.slug,
                    plainTitle: vote.proposal.plainTitle,
                    plainSummary: vote.proposal.plainSummary,
                  },
                  positions: vote.positions.map((p) => ({
                    partyId: p.partyId,
                    stance: p.stance,
                  })),
                }
              : null
          }
        />
      </div>
      <p className="mt-8 text-xs text-muted">
        Os resultados ficam só neste dispositivo. Ver{" "}
        <Link href="/metodologia" className="text-accent hover:underline">
          metodologia
        </Link>
        .
      </p>
    </div>
  );
}
