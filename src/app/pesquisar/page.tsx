import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Pesquisar" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function PesquisarPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const [proposals, deputies, parties] = query
    ? await Promise.all([
        prisma.proposal.findMany({
          where: {
            OR: [
              { plainTitle: { contains: query } },
              { officialTitle: { contains: query } },
              { plainSummary: { contains: query } },
            ],
          },
          take: 20,
          orderBy: { createdAt: "desc" },
        }),
        prisma.deputy.findMany({
          where: { fullName: { contains: query } },
          take: 20,
          include: { party: true },
          orderBy: { fullName: "asc" },
        }),
        prisma.party.findMany({
          where: {
            OR: [{ name: { contains: query } }, { fullName: { contains: query } }],
          },
          orderBy: { sortOrder: "asc" },
        }),
      ])
    : [[], [], []];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">Pesquisar</h1>
      <p className="mt-2 text-muted">Propostas, deputados e partidos.</p>

      <form className="mt-8">
        <input
          name="q"
          defaultValue={query}
          placeholder="Escreve um nome, tema ou título…"
          className="w-full rounded-2xl border border-border bg-card px-4 py-4 text-lg outline-none ring-accent placeholder:text-muted-2 focus:ring-2"
          autoFocus
        />
      </form>

      {!query && (
        <p className="mt-8 text-sm text-muted">
          Exemplos: <Link href="/pesquisar?q=MPLA" className="text-accent">MPLA</Link>,{" "}
          <Link href="/pesquisar?q=dados" className="text-accent">dados</Link>,{" "}
          <Link href="/pesquisar?q=Adão" className="text-accent">Adão</Link>
        </p>
      )}

      {query && (
        <div className="mt-10 space-y-10">
          <ResultBlock title="Partidos" empty="Nenhum partido.">
            {parties.map((p) => (
              <Link key={p.id} href={`/partidos/${p.slug}`} className="block rounded-xl px-3 py-2 hover:bg-card">
                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                {p.name} — {p.fullName}
              </Link>
            ))}
          </ResultBlock>
          <ResultBlock title="Deputados" empty="Nenhum deputado.">
            {deputies.map((d) => (
              <Link key={d.id} href={`/deputados/${d.slug}`} className="block rounded-xl px-3 py-2 hover:bg-card">
                {d.fullName}
                <span className="text-muted"> · {d.party.name}</span>
              </Link>
            ))}
          </ResultBlock>
          <ResultBlock title="Propostas" empty="Nenhuma proposta.">
            {proposals.map((p) => (
              <Link key={p.id} href={`/propostas/${p.slug}`} className="block rounded-xl px-3 py-2 hover:bg-card">
                <div className="font-medium">{p.plainTitle}</div>
                <div className="text-sm text-muted line-clamp-1">{p.officialTitle}</div>
              </Link>
            ))}
          </ResultBlock>
        </div>
      )}
    </div>
  );
}

function ResultBlock({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode[];
}) {
  const items = Array.isArray(children) ? children.filter(Boolean) : [];
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">{title}</h2>
      {items.length === 0 ? <p className="text-muted">{empty}</p> : <div className="space-y-1">{items}</div>}
    </section>
  );
}
