"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { partyPhotoUrl } from "@/lib/knockout-photo";
import { initials } from "@/lib/parlamento";

export type HemiDeputy = {
  id: string;
  slug: string;
  fullName: string;
  electoralCircle?: string | null;
  mesaRole?: string | null;
  photoUrl?: string | null;
  partySlug: string;
  partyName: string;
  partyColor: string;
};

type PartyMeta = {
  slug: string;
  name: string;
  color: string;
  logoUrl?: string | null;
  count: number;
};

type Props = {
  deputies: HemiDeputy[];
  parties: PartyMeta[];
};

type Point = HemiDeputy & { x: number; y: number; r: number; cleanPhoto: string | null };

const VB_W = 1520;
const VB_H = 860;

export function DeputyHemicycle({ deputies, parties }: Props) {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | "all">("all");

  const goToProfile = (slug: string) => {
    router.push(`/deputados/${slug}`);
  };

  // Left → right: smaller parties then UNITA then MPLA
  const order = ["pha", "fnla", "prs", "unita", "mpla"];
  const ordered = useMemo(() => {
    const byParty = new Map<string, HemiDeputy[]>();
    for (const d of deputies) {
      const list = byParty.get(d.partySlug) ?? [];
      list.push(d);
      byParty.set(d.partySlug, list);
    }
    for (const list of byParty.values()) {
      list.sort((a, b) => a.fullName.localeCompare(b.fullName, "pt"));
    }
    const flat: HemiDeputy[] = [];
    for (const slug of order) {
      flat.push(...(byParty.get(slug) ?? []));
    }
    for (const [slug, list] of byParty) {
      if (!order.includes(slug)) flat.push(...list);
    }
    return flat;
  }, [deputies]);

  const visible = filter === "all" ? ordered : ordered.filter((d) => d.partySlug === filter);
  const points = useMemo(() => layoutHemicycle(visible), [visible]);
  const active = points.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div className="relative w-full">
      <div className="relative mx-auto aspect-[1520/860] w-full max-w-[90rem]">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-full w-full overflow-visible"
          role="img"
          aria-label="Hemiciclo dos deputados"
        >
          <defs>
            {points.map((p) => (
              <clipPath key={`clip-${p.id}`} id={`clip-${p.id}`}>
                <circle cx={p.x} cy={p.y} r={p.r} />
              </clipPath>
            ))}
          </defs>

          {points.map((p) => {
            const dimmed = filter !== "all" && p.partySlug !== filter;
            const isActive = activeSlug === p.slug;
            const ring = isActive ? 3.4 : 2.4;

            return (
              <g
                key={p.id}
                className="cursor-pointer outline-none"
                opacity={dimmed ? 0.16 : 1}
                role="link"
                aria-label={p.fullName}
                onMouseEnter={() => setActiveSlug(p.slug)}
                onMouseLeave={() => setActiveSlug((s) => (s === p.slug ? null : s))}
                onFocus={() => setActiveSlug(p.slug)}
                onBlur={() => setActiveSlug((s) => (s === p.slug ? null : s))}
                onClick={() => goToProfile(p.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToProfile(p.slug);
                  }
                }}
                tabIndex={0}
              >
                {p.cleanPhoto ? (
                  <image
                    href={p.cleanPhoto}
                    x={p.x - p.r}
                    y={p.y - p.r}
                    width={p.r * 2}
                    height={p.r * 2}
                    clipPath={`url(#clip-${p.id})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <>
                    <circle cx={p.x} cy={p.y} r={p.r} fill={p.partyColor} />
                    <text
                      x={p.x}
                      y={p.y + p.r * 0.28}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={p.r * 0.72}
                      fontWeight={700}
                      fontFamily="var(--font-geist-sans), Inter, system-ui, sans-serif"
                    >
                      {initials(p.fullName)}
                    </text>
                  </>
                )}

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r + ring * 0.3}
                  fill="none"
                  stroke={p.partyColor}
                  strokeWidth={ring}
                />

                {isActive && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.r + ring + 2.8}
                    fill="none"
                    stroke="#fff"
                    strokeOpacity={0.4}
                    strokeWidth={1.6}
                  />
                )}

                <circle cx={p.x} cy={p.y} r={p.r + 1} fill="transparent">
                  <title>{p.fullName}</title>
                </circle>
              </g>
            );
          })}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute z-30 w-[300px] -translate-x-1/2 -translate-y-[calc(100%+16px)]"
            style={{
              left: `${(active.x / VB_W) * 100}%`,
              top: `${(active.y / VB_H) * 100}%`,
            }}
          >
            <div className="pointer-events-auto rounded-[20px] bg-white p-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
              <div className="flex gap-3.5">
                <div className="relative h-[76px] w-[68px] shrink-0 overflow-hidden rounded-[12px] bg-zinc-100">
                  {active.cleanPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={active.cleanPhoto}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                      {initials(active.fullName)}
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-[16px] font-bold leading-snug text-black">
                    {shortName(active.fullName)}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-zinc-500">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: active.partyColor }}
                    />
                    <span className="truncate">
                      {active.partyName}
                      {active.electoralCircle ? ` · ${active.electoralCircle}` : ""}
                    </span>
                  </p>
                  <Link
                    href={`/deputados/${active.slug}`}
                    className="mt-auto self-end pt-2 text-[13px] font-bold text-black hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver perfil →
                  </Link>
                </div>
              </div>
            </div>
            <div className="mx-auto -mt-1.5 h-3 w-3 rotate-45 bg-white" />
          </div>
        )}
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-2.5">
        {orderedParties(parties, order).map((p) => (
          <FilterPill
            key={p.slug}
            active={filter === p.slug}
            onClick={() => setFilter(p.slug === filter ? "all" : p.slug)}
            label={`${p.name} ${p.count}`}
            color={p.color}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-[12px] text-zinc-500">
        Cada partido no seu lado do hemiciclo; dentro de cada um, por ordem alfabética. Fotografias:
        Assembleia Nacional.
      </p>
    </div>
  );
}

function orderedParties(parties: PartyMeta[], order: string[]) {
  return [...parties].sort((a, b) => {
    const ia = order.indexOf(a.slug);
    const ib = order.indexOf(b.slug);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

function FilterPill({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] transition ${
        active
          ? "border-white/45 bg-white/10 text-white"
          : "border-white/15 bg-transparent text-zinc-300 hover:border-white/30"
      }`}
    >
      {color ? <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /> : null}
      {label}
    </button>
  );
}

function shortName(fullName: string) {
  const parts = fullName.split(/\s+/).filter(Boolean);
  if (parts.length <= 2) return fullName;
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

/** Larger seats + clear gaps, votoavoto-style proportions. */
function layoutHemicycle(deputies: HemiDeputy[]): Point[] {
  const total = deputies.length;
  if (total === 0) return [];

  const cx = VB_W / 2;
  const cy = VB_H - 22;
  const seatR = 22.5;
  const gap = 13;
  const pitch = seatR * 2 + gap;
  const rowPitch = seatR * 2 + 16;
  const innerR = 125;

  const capacities: number[] = [];
  let capacity = 0;
  for (let row = 0; capacity < total; row++) {
    const r = innerR + row * rowPitch;
    const usableArc = Math.PI * r - pitch * 0.35;
    const count = Math.max(8, Math.floor(usableArc / pitch) + 1);
    capacities.push(count);
    capacity += count;
    if (row > 14) break;
  }

  const points: Point[] = [];
  let idx = 0;
  capacities.forEach((count, row) => {
    const r = innerR + row * rowPitch;
    const n = Math.min(count, total - idx);
    if (n <= 0) return;
    const start = Math.PI + 0.04;
    const end = 2 * Math.PI - 0.04;
    for (let i = 0; i < n; i++, idx++) {
      const d = deputies[idx];
      const t = n === 1 ? Math.PI * 1.5 : start + ((end - start) * i) / (n - 1);
      points.push({
        ...d,
        // Round so SSR and client hydration use identical SVG attribute strings
        x: roundCoord(cx + r * Math.cos(t)),
        y: roundCoord(cy + r * Math.sin(t) * 0.94),
        r: seatR,
        cleanPhoto: partyPhotoUrl(d.photoUrl, 128),
      });
    }
  });

  return points;
}

function roundCoord(n: number) {
  return Math.round(n * 1000) / 1000;
}
