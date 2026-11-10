import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Temas" };

export default async function TemasPage() {
  const themes = await prisma.theme.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { proposals: true } } },
  });

  return (
    <div className="light-section min-h-full">
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-10 lg:px-6 lg:py-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">Temas</h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-zinc-500">
            Do orçamento à justiça — o que se vota, agrupado. Atribuição manual no início; assistida
            depois com revisão.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {themes.map((t, i) => (
            <Link key={t.id} href={`/temas/${t.slug}`} className="soft-card p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="text-2xl font-bold tabular-nums text-zinc-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-right text-[12px] leading-snug text-zinc-500">
                  {t._count.proposals} proposta{t._count.proposals === 1 ? "" : "s"}
                </span>
              </div>
              <h2 className="text-xl font-bold text-black">{t.name}</h2>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-black"
                  style={{ width: `${Math.min(100, 12 + t._count.proposals * 18)}%` }}
                />
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${Math.min(100, 8 + t._count.proposals * 14)}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
