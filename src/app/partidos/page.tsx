import Link from "next/link";
import { Hemicycle } from "@/components/Hemicycle";
import { prisma } from "@/lib/prisma";

function MiniHemicycle({
  parties,
  highlightSlug,
}: {
  parties: { slug: string; name: string; seats: number; color: string }[];
  highlightSlug: string;
}) {
  const ordered = [...parties].sort((a, b) => b.seats - a.seats);
  const seats: { color: string; slug: string }[] = [];
  for (const p of ordered) {
    for (let i = 0; i < p.seats; i++) seats.push({ color: p.color, slug: p.slug });
  }
  while (seats.length < 220) seats.push({ color: "#e5e7eb", slug: "vago" });

  const rows = [22, 28, 34, 40, 46, 50];
  let idx = 0;
  const points: { x: number; y: number; seat: (typeof seats)[0] }[] = [];
  const cx = 160;
  const cy = 145;
  rows.forEach((count, row) => {
    const r = 40 + row * 16;
    for (let i = 0; i < count && idx < seats.length; i++, idx++) {
      const t = Math.PI + (Math.PI * i) / (count - 1 || 1);
      points.push({
        x: cx + r * Math.cos(t),
        y: cy + r * Math.sin(t) * 0.9,
        seat: seats[idx],
      });
    }
  });

  return (
    <svg viewBox="0 0 320 170" className="mx-auto h-auto w-full max-w-sm" aria-hidden>
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={2.8}
          fill={p.seat.color}
          opacity={p.seat.slug === highlightSlug ? 1 : 0.18}
        />
      ))}
    </svg>
  );
}

export const metadata = { title: "Partidos" };

export default async function PartidosPage() {
  const parties = await prisma.party.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { deputies: true } } },
  });
  const totalSeats = parties.reduce((n, p) => n + p.seats, 0);

  return (
    <div>
      <section className="bg-background">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-6 lg:py-16">
          <div>
            <p className="text-sm text-zinc-500">V Legislatura</p>
            <h1 className="mt-2 text-5xl font-bold tracking-tight text-white md:text-6xl">
              Partidos
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-zinc-400">
              {parties.length} partidos, {totalSeats} deputados. Escolhe um para ver como vota, com
              quem vota e que propostas aprovou.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/5 p-3 ring-1 ring-white/10">
            <Hemicycle parties={parties} linkToParties showLegend />
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-4 pb-14 lg:px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {parties.map((p) => (
              <Link
                key={p.id}
                href={`/partidos/${p.slug}`}
                className="group rounded-2xl border border-white/10 bg-[#161618] p-4 transition hover:border-white/25 hover:bg-[#1c1c1f]"
              >
                <div className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logoUrl || `/parties/${p.slug}.png`}
                    alt={p.name}
                    className="h-11 w-11 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-white">{p.name}</p>
                    <p className="text-[13px] text-zinc-500">{p.seats} lugares</p>
                  </div>
                </div>
                <p className="mt-4 line-clamp-2 text-[12px] leading-snug text-zinc-500">
                  {p.fullName}
                </p>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition group-hover:brightness-110"
                    style={{
                      width: `${Math.max((p.seats / totalSeats) * 100, 4)}%`,
                      background: p.color,
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:px-6">
          <Link
            href="/jogo"
            className="flex flex-col justify-between gap-6 rounded-[1.5rem] bg-accent p-6 text-black sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em]">Comparar partidos</p>
              <h2 className="mt-2 max-w-lg text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                Quem faz maioria? E quantas vezes dois partidos votam igual?
              </h2>
              <p className="mt-4 text-sm font-semibold">Experimentar →</p>
            </div>
            <div className="relative h-24 w-40 shrink-0">
              <span className="absolute left-4 top-2 h-20 w-20 rounded-full bg-[#f28c33]/90" />
              <span className="absolute right-2 top-6 h-16 w-16 rounded-full bg-[#1d4ed8]/80" />
            </div>
          </Link>

          <h2 className="mt-14 section-title text-black">Os partidos, um a um.</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {parties.map((p) => (
              <Link
                key={p.id}
                href={`/partidos/${p.slug}`}
                className="soft-card overflow-hidden"
              >
                <div className="p-5 text-white" style={{ background: p.color }}>
                  <div className="flex items-start gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.logoUrl || `/parties/${p.slug}.png`}
                      alt={p.name}
                      className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/30"
                    />
                    <div>
                      <p className="font-bold leading-snug">{p.fullName}</p>
                      <p className="mt-1 text-[13px] text-white/80">
                        {p.seats} deputados · {((p.seats / totalSeats) * 100).toFixed(1)}% dos
                        lugares
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <MiniHemicycle parties={parties} highlightSlug={p.slug} />
                  <p className="mt-4 text-sm font-semibold text-black">Ver o perfil →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
