"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Hemicycle, type SeatParty } from "./Hemicycle";

type Props = {
  parties: SeatParty[];
};

export function HomeHero({ parties }: Props) {
  const ordered = [...parties].sort((a, b) => b.seats - a.seats);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = ordered[index] ?? ordered[0];

  useEffect(() => {
    if (paused || ordered.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ordered.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [paused, ordered.length]);

  if (!current) return null;

  const article = /^[aeiouàáâãéêíóôõú]/i.test(current.name) ? "a" : "o";

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-6 lg:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            O Parlamento, sem ruído
          </div>

          <h1 className="mt-5 max-w-xl text-[2.35rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Sabes como vota {article}{" "}
            <span
              className="inline-flex translate-y-[-2px] items-center rounded-xl px-2.5 py-1 align-middle text-[0.78em] font-bold text-white"
              style={{ background: current.color }}
            >
              {current.name}
            </span>
            ?
          </h1>

          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-zinc-400">
            Todas as votações da Assembleia Nacional, explicadas em português simples. Partido a
            partido, deputado a deputado.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/votacoes" className="btn-primary">
              Ver as últimas votações →
            </Link>
            <Link href="/jogo" className="btn-ghost">
              Jogar: adivinha o voto
            </Link>
          </div>

          <Link
            href="/pesquisar"
            className="mt-5 flex h-12 max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-zinc-500 transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <SearchIcon />
            <span className="flex-1">Pesquisa um tema: rendas, IRS, saúde...</span>
            <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[11px] text-zinc-500">
              /
            </kbd>
          </Link>
        </div>

        <div>
          <Hemicycle
            parties={parties}
            highlightSlug={current.slug}
            interactive
            caption={`${current.seats} deputados d${article === "a" ? "a" : "o"} ${current.name}`}
            paused={paused}
            onTogglePause={() => setPaused((p) => !p)}
            onSelectParty={(slug) => {
              const i = ordered.findIndex((p) => p.slug === slug);
              if (i >= 0) {
                setPaused(true);
                setIndex(i);
              }
            }}
          />

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {ordered.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={`Mostrar ${p.name}`}
                aria-pressed={i === index}
                onClick={() => {
                  setPaused(true);
                  setIndex(i);
                }}
                className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border-2 bg-white transition ${
                  i === index ? "border-accent shadow-[0_0_0_2px_rgba(255,210,63,0.25)]" : "border-transparent"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logoUrl || `/parties/${p.slug}.png`}
                  alt={p.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
