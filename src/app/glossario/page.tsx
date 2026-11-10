import { prisma } from "@/lib/prisma";

export const metadata = { title: "Glossário" };

export default async function GlossarioPage() {
  const terms = await prisma.glossaryTerm.findMany({ orderBy: { term: "asc" } });

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Glossário</h1>
        <p className="mt-3 text-lg text-muted">Termos do Parlamento em linguagem simples.</p>
      </div>
      <dl className="space-y-4">
        {terms.map((t) => (
          <div key={t.id} id={t.slug} className="rounded-3xl border border-border bg-card p-5">
            <dt className="text-xl font-semibold">{t.term}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
