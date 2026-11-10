import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Arquivo oficial" };

export const dynamic = "force-dynamic";

export default async function ArquivoPage() {
  const [documents, extractions, runs] = await Promise.all([
    prisma.sourceDocument.findMany({ orderBy: { updatedAt: "desc" }, take: 100 }),
    prisma.voteExtraction.findMany({
      orderBy: [{ status: "asc" }, { confidence: "desc" }],
      take: 100,
      include: { document: true },
    }),
    prisma.ingestRun.findMany({ orderBy: { startedAt: "desc" }, take: 5 }),
  ]);

  const published = extractions.filter((e) => e.status === "published").length;
  const review = extractions.filter((e) => e.status === "needs_review").length;

  return (
    <div className="light-section min-h-full">
      <div className="mx-auto max-w-[1200px] space-y-10 px-4 py-10 lg:px-6 lg:py-12">
        <div>
          <p className="text-sm font-medium text-zinc-500">Pipeline de ingestão</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-black md:text-5xl">
            Arquivo oficial
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-zinc-500">
            Documentos e notícias da Assembleia Nacional descobertos automaticamente, com extracção
            de votações. Só entram em{" "}
            <Link href="/votacoes" className="underline underline-offset-2 hover:text-black">
              Votações
            </Link>{" "}
            com fonte citável. Ver{" "}
            <Link href="/metodologia" className="underline underline-offset-2 hover:text-black">
              metodologia
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-black">
            <span>{documents.length} documentos</span>
            <span>{extractions.length} extracções</span>
            <span>{published} publicadas</span>
            <span>{review} em revisão</span>
          </div>
        </div>

        {runs[0] && (
          <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-600">
            Última corrida:{" "}
            <span className="font-medium text-black">
              {runs[0].ok ? "OK" : "falhou"} · {runs[0].startedAt.toLocaleString("pt-AO")}
            </span>
            {runs[0].statsJson && (
              <span className="mt-1 block font-mono text-xs text-zinc-400">{runs[0].statsJson}</span>
            )}
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-black">Extracções de votações</h2>
          {extractions.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-zinc-500">
              Ainda sem extracções. Corre <code className="text-black">pnpm ingest</code>.
            </p>
          ) : (
            <div className="grid gap-3">
              {extractions.map((ex) => (
                <article
                  key={ex.id}
                  className="rounded-2xl border border-zinc-200 bg-white px-5 py-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                    <StatusPill status={ex.status} />
                    <span className="text-zinc-400">confiança {(ex.confidence * 100).toFixed(0)}%</span>
                    {ex.stage && <span className="text-zinc-400">{ex.stage}</span>}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-black">{ex.plainTitle || ex.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {ex.votesFor ?? "?"} a favor · {ex.votesAgainst ?? "?"} contra ·{" "}
                    {ex.abstentions ?? "?"} abstenções
                    {ex.result ? ` · ${ex.result}` : ""}
                    {ex.date ? ` · ${ex.date.toLocaleDateString("pt-AO")}` : ""}
                  </p>
                  {ex.rawSnippet && (
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{ex.rawSnippet}</p>
                  )}
                  <a
                    href={ex.document.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-black underline underline-offset-2"
                  >
                    Fonte oficial →
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-black">Documentos arquivados</h2>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-100 bg-zinc-50 text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Título</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => (
                  <tr key={d.id} className="border-b border-zinc-50 last:border-0">
                    <td className="px-4 py-3">
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-black underline-offset-2 hover:underline"
                      >
                        {d.title || d.url}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{d.kind}</td>
                    <td className="px-4 py-3 text-zinc-500">{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-800",
    needs_review: "bg-amber-100 text-amber-900",
    rejected: "bg-zinc-100 text-zinc-500",
  };
  const labels: Record<string, string> = {
    published: "Publicada",
    needs_review: "Em revisão",
    rejected: "Rejeitada",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 ${styles[status] || "bg-zinc-100 text-zinc-600"}`}>
      {labels[status] || status}
    </span>
  );
}
