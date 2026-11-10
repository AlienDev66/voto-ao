"use client";

import Link from "next/link";

export type SeatParty = {
  slug: string;
  name: string;
  seats: number;
  color: string;
  logoUrl?: string | null;
};

type Props = {
  parties: SeatParty[];
  totalSeats?: number;
  highlightSlug?: string | null;
  interactive?: boolean;
  onSelectParty?: (slug: string) => void;
  linkToParties?: boolean;
  caption?: string;
  paused?: boolean;
  onTogglePause?: () => void;
  showLegend?: boolean;
  className?: string;
};

export function Hemicycle({
  parties,
  totalSeats = 220,
  highlightSlug = null,
  interactive = false,
  onSelectParty,
  linkToParties = false,
  caption,
  paused = false,
  onTogglePause,
  showLegend = false,
  className = "",
}: Props) {
  const ordered = [...parties].sort((a, b) => b.seats - a.seats);
  const seats: { color: string; slug: string; name: string }[] = [];
  for (const p of ordered) {
    for (let i = 0; i < p.seats; i++) seats.push({ color: p.color, slug: p.slug, name: p.name });
  }
  while (seats.length < totalSeats) seats.push({ color: "#d4d4d8", slug: "vago", name: "Vago" });

  // 7 filas + espaço entre pontos (sem colar) + tamanho legível.
  const rows = [20, 24, 28, 32, 36, 40, 40];
  let idx = 0;
  const points: { x: number; y: number; seat: (typeof seats)[0] }[] = [];
  const cx = 180;
  const cy = 200;
  const dotR = 4.35;

  rows.forEach((count, row) => {
    const r = 58 + row * 23.5;
    for (let i = 0; i < count && idx < seats.length; i++, idx++) {
      const t = Math.PI + (Math.PI * i) / (count - 1 || 1);
      points.push({
        x: Math.round((cx + r * Math.cos(t)) * 1000) / 1000,
        y: Math.round((cy + r * Math.sin(t) * 0.95) * 1000) / 1000,
        seat: seats[idx],
      });
    }
  });

  // viewBox com margem para o raio dos pontos — evita cortar o arco de cima.
  const pad = dotR + 8;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const vbX = minX - pad;
  const vbY = minY - pad;
  const vbW = maxX - minX + pad * 2;
  const vbH = maxY - minY + pad * 2;

  return (
    <div className={`w-full overflow-hidden rounded-[1.5rem] bg-white p-4 text-black shadow-sm sm:p-5 ${className}`}>
      <svg
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        className="mx-auto h-auto w-full max-w-xl"
        role="img"
        aria-label="Hemiciclo com 220 lugares"
      >
        {points.map((p, i) => {
          const dimmed = Boolean(highlightSlug && p.seat.slug !== highlightSlug);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={dotR}
              fill={p.seat.color}
              opacity={dimmed ? 0.16 : 1}
              className={interactive ? "cursor-pointer transition-opacity duration-300" : "transition-opacity duration-300"}
              onClick={() => {
                if (interactive && onSelectParty && p.seat.slug !== "vago") onSelectParty(p.seat.slug);
              }}
            >
              <title>{p.seat.name}</title>
            </circle>
          );
        })}
      </svg>

      {(caption || onTogglePause) && (
        <div className="mt-1 flex items-center justify-between gap-3 px-1">
          <p className="text-sm font-medium text-zinc-600">{caption}</p>
          {onTogglePause && (
            <button
              type="button"
              aria-label={paused ? "Retomar rotação" : "Pausar rotação"}
              onClick={onTogglePause}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
          )}
        </div>
      )}

      {showLegend && (
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-zinc-600">
          {ordered.map((p) => {
            const content = (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                {p.name} {p.seats}
              </span>
            );
            if (linkToParties) {
              return (
                <Link key={p.slug} href={`/partidos/${p.slug}`} className="hover:text-black">
                  {content}
                </Link>
              );
            }
            return (
              <button key={p.slug} type="button" className="hover:text-black" onClick={() => onSelectParty?.(p.slug)}>
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
