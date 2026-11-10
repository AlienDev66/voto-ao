"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AccessTools } from "@/components/AccessTools";
import { COMPARADOR, STANCE_LABEL, type CompareTheme } from "@/data/comparador";

export default function ComparadorPage() {
  const [themeId, setThemeId] = useState(COMPARADOR.themes[0]?.id ?? "orcamento");
  const theme = useMemo(
    () => COMPARADOR.themes.find((t) => t.id === themeId) ?? COMPARADOR.themes[0],
    [themeId],
  );

  return (
    <div>
      <section className="bg-banner text-black">
        <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-[12px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Comparador
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {COMPARADOR.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-black/70">
            {COMPARADOR.plainIntro}
          </p>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-14 lg:px-6">
          <AccessTools
            title={COMPARADOR.title}
            summary={
              theme
                ? `${theme.title}: ${theme.question} ${theme.resultPlain}`
                : COMPARADOR.plainIntro
            }
            speakText={
              theme
                ? `${theme.title}. ${theme.question}. ${theme.resultPlain}. ${theme.stances
                    .map((s) => `${s.partyName}: ${s.sentence}`)
                    .join(" ")}`
                : COMPARADOR.plainIntro
            }
            path="/comparador"
          />

          <div className="flex flex-wrap gap-2">
            {COMPARADOR.themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeId(t.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  themeId === t.id
                    ? "bg-black text-white"
                    : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:ring-zinc-300"
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>

          {theme && <ThemePanel theme={theme} />}

          <p className="text-sm text-zinc-500">
            Queres pressionar por votos nominais?{" "}
            <Link href="/lacunas" className="font-medium text-black underline underline-offset-2">
              Ver o que o Estado não publica →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

function ThemePanel({ theme }: { theme: CompareTheme }) {
  return (
    <div className="space-y-6">
      <div className="soft-card overflow-hidden">
        <div className="bg-zinc-900 px-5 py-6 text-white sm:px-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">
            {theme.voteLabel} · {theme.voteDate}
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{theme.question}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">
            {theme.whyItMatters}
          </p>
        </div>
        <div className="grid gap-0 sm:grid-cols-[1fr_1fr]">
          <div className="border-b border-zinc-100 p-5 sm:border-b-0 sm:border-r sm:p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Resultado</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-black">
              {theme.resultPlain}
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Como sabemos</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{theme.evidence}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {theme.stances.map((s) => (
          <article
            key={s.partySlug}
            className="soft-card flex flex-col gap-4 p-5 sm:flex-row sm:items-stretch"
          >
            <div
              className="flex w-full shrink-0 flex-col justify-between rounded-2xl p-4 text-white sm:w-44"
              style={{ background: s.color }}
            >
              <p className="text-lg font-black tracking-tight">{s.partyName}</p>
              <p className="mt-3 inline-flex rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
                {STANCE_LABEL[s.stance]}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-zinc-700 sm:text-[15px]">{s.sentence}</p>
              <Link
                href={`/partidos/${s.partySlug}`}
                className="mt-3 inline-block text-sm font-semibold text-black underline underline-offset-2"
              >
                Ficha do partido →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
