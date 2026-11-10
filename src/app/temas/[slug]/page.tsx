import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, resultLabel } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const theme = await prisma.theme.findUnique({ where: { slug } });
  return { title: theme?.name ?? "Tema" };
}

export default async function TemaPage({ params }: Props) {
  const { slug } = await params;
  const theme = await prisma.theme.findUnique({
    where: { slug },
    include: {
      proposals: {
        include: {
          proposal: { include: { votes: { orderBy: { date: "desc" }, take: 1 } } },
        },
      },
    },
  });
  if (!theme) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div>
        <p className="text-sm text-muted">
          <Link href="/temas" className="hover:text-accent">
            Temas
          </Link>
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{theme.name}</h1>
      </div>
      <div className="space-y-4">
        {theme.proposals.length === 0 && <p className="text-muted">Ainda não há propostas neste tema.</p>}
        {theme.proposals.map(({ proposal: p }) => {
          const vote = p.votes[0];
          return (
            <Link
              key={p.id}
              href={`/propostas/${p.slug}`}
              className="block rounded-3xl border border-border bg-card p-5 hover:border-accent/40"
            >
              <div className="mb-1 text-xs text-muted">
                {vote ? `${formatDate(vote.date)} · ${resultLabel(vote.result)}` : p.status}
              </div>
              <h2 className="text-lg font-medium">{p.plainTitle}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
