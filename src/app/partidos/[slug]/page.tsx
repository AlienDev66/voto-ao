import Link from "next/link";
import { notFound } from "next/navigation";
import { Hemicycle } from "@/components/Hemicycle";
import { VoteResultBars } from "@/components/VoteResultBars";
import { formatDate, resultLabel, stanceLabel } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const party = await prisma.party.findUnique({ where: { slug } });
  return { title: party?.name ?? "Partido" };
}

export default async function PartidoPage({ params }: Props) {
  const { slug } = await params;
  const party = await prisma.party.findUnique({
    where: { slug },
    include: {
      deputies: { where: { inOffice: true }, orderBy: { fullName: "asc" } },
      positions: {
        include: { vote: { include: { proposal: true } } },
        orderBy: { vote: { date: "desc" } },
        take: 12,
      },
    },
  });
  if (!party) notFound();
  const allParties = await prisma.party.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div>
        <p className="text-sm text-muted">
          <Link href="/partidos" className="hover:text-accent">
            Partidos
          </Link>{" "}
          / {party.name}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span
            className="inline-flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ background: party.color }}
          >
            {party.seats}
          </span>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">{party.name}</h1>
            <p className="text-muted">{party.fullName}</p>
          </div>
        </div>
      </div>

      <Hemicycle parties={allParties} highlightSlug={party.slug} linkToParties showLegend />

      <section>
        <h2 className="section-title mb-4">Deputados ({party.deputies.length})</h2>
        <ul className="columns-1 gap-x-8 sm:columns-2">
          {party.deputies.map((d) => (
            <li key={d.id} className="mb-2 break-inside-avoid">
              <Link href={`/deputados/${d.slug}`} className="hover:text-accent">
                {d.fullName}
              </Link>
              {d.mesaRole && <span className="ml-2 text-xs text-accent">{d.mesaRole}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-title mb-4">Votações registadas</h2>
        {party.positions.length === 0 ? (
          <p className="text-muted">Ainda sem votações ligadas a este partido.</p>
        ) : (
          <div className="space-y-4">
            {party.positions.map((pos) => (
              <Link
                key={pos.id}
                href={`/propostas/${pos.vote.proposal.slug}`}
                className="block rounded-3xl border border-border bg-card p-5 hover:border-accent/40"
              >
                <div className="mb-2 flex flex-wrap gap-2 text-xs text-muted">
                  <span>{formatDate(pos.vote.date)}</span>
                  <span>·</span>
                  <span>{resultLabel(pos.vote.result)}</span>
                  <span>·</span>
                  <span>{stanceLabel(pos.stance)}</span>
                </div>
                <h3 className="mb-3 font-medium">{pos.vote.proposal.plainTitle}</h3>
                <VoteResultBars
                  votesFor={pos.vote.votesFor}
                  votesAgainst={pos.vote.votesAgainst}
                  abstentions={pos.vote.abstentions}
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
