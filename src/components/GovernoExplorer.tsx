"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GOVERNMENT, type GovMember } from "@/data/governo";

export function GovernoExplorer() {
  const [selectedSlug, setSelectedSlug] = useState(GOVERNMENT.members[0]?.slug ?? "");

  const featured = useMemo(() => {
    const all: GovMember[] = [...GOVERNMENT.members, ...GOVERNMENT.ministries];
    return all.find((m) => m.slug === selectedSlug) ?? GOVERNMENT.members[0];
  }, [selectedSlug]);

  const totalFichas = GOVERNMENT.members.length + GOVERNMENT.ministries.length;

  return (
    <div>
      <section className="bg-background">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:px-6 lg:py-16">
          <div>
            <p className="text-sm text-zinc-500">{GOVERNMENT.title}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Quem manda em quê
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-zinc-400">
              {GOVERNMENT.subtitle}. Escolha um lugar para ver quem dirige a pasta — nomes e
              ministérios com fonte oficial.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white">
              <span>{totalFichas} fichas oficiais</span>
              <span>{GOVERNMENT.ministries.length} ministérios</span>
              <a
                href="https://governo.gov.ao/ministro"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 underline-offset-2 hover:underline"
              >
                fonte: governo.gov.ao
              </a>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-zinc-500">{GOVERNMENT.note}</p>

            {featured && (
              <article className="mt-8 rounded-[1.5rem] bg-white p-5 text-black shadow-sm">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
                  {featured.role}
                </p>
                <p className="text-sm text-zinc-500">{featured.ministry}</p>
                <div className="mt-4 flex items-center gap-3">
                  <GovAvatar member={featured} size={56} />
                  <div>
                    <p className="text-lg font-bold">{featured.name}</p>
                    <p className="text-sm text-zinc-500">
                      {featured.party && (
                        <span className="mr-2 inline-flex rounded-md bg-[#ce1126] px-1.5 py-0.5 text-[11px] font-bold text-white">
                          {featured.party}
                        </span>
                      )}
                      {featured.since && `desde ${featured.since}`}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-zinc-100 px-3 py-3 text-[13px] text-zinc-600">
                    Intervenções no Parlamento — em expansão
                  </div>
                  <div className="rounded-xl bg-zinc-100 px-3 py-3 text-[13px] text-zinc-600">
                    Propostas do Governo — em expansão
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={featured.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Fonte oficial →
                  </a>
                  <Link href="/votacoes" className="inline-flex items-center text-sm font-semibold">
                    As propostas do Governo →
                  </Link>
                </div>
              </article>
            )}
          </div>

          <div>
            <div className="rounded-[2rem] bg-[#161618] p-6 ring-1 ring-white/10">
              <p className="mb-6 text-center text-[12px] font-medium uppercase tracking-wide text-zinc-500">
                Conselho de Ministros — composição oficial
              </p>
              <div className="mx-auto flex max-w-md flex-col items-center gap-6">
                {GOVERNMENT.members.map((m) => (
                  <button
                    key={m.slug}
                    type="button"
                    onClick={() => setSelectedSlug(m.slug)}
                    className="flex flex-col items-center text-center transition hover:opacity-90"
                  >
                    <GovAvatar
                      member={m}
                      size={64}
                      ringClass={selectedSlug === m.slug ? "ring-white" : "ring-white/20"}
                    />
                    <p className="mt-2 text-[12px] font-semibold text-white">{m.role}</p>
                    <p className="text-[11px] text-zinc-500">{m.name}</p>
                  </button>
                ))}
                <div className="h-3 w-full max-w-sm rounded-full bg-white/10" />
                <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-4">
                  {GOVERNMENT.ministries.map((m) => (
                    <button
                      key={m.slug}
                      type="button"
                      onClick={() => setSelectedSlug(m.slug)}
                      className="flex flex-col items-center text-center transition hover:opacity-90"
                    >
                      <GovAvatar
                        member={m}
                        size={40}
                        ringClass={selectedSlug === m.slug ? "ring-white" : "ring-white/15"}
                      />
                      <p className="mt-1.5 text-[10px] leading-tight text-zinc-400">
                        {m.shortLabel ?? m.ministry}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-14 lg:px-6">
          <div className="soft-card p-6">
            <h2 className="text-2xl font-bold text-black">Ministérios</h2>
            <p className="mt-2 text-[15px] text-zinc-500">
              {GOVERNMENT.ministries.length} pastas com titular publicado em governo.gov.ao. Clique
              para ver a ficha.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GOVERNMENT.ministries.map((m) => (
                <button
                  key={m.slug}
                  type="button"
                  onClick={() => {
                    setSelectedSlug(m.slug);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left transition hover:border-zinc-300 hover:shadow-sm"
                >
                  <GovAvatar member={m} size={48} ringClass="ring-zinc-200" />
                  <div className="min-w-0">
                    <p className="font-semibold text-black">{m.ministry}</p>
                    <p className="mt-0.5 truncate text-sm text-zinc-700">{m.name}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {m.role}
                      {m.since ? ` · desde ${m.since}` : ""}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-zinc-500">
            Fonte:{" "}
            <a
              href="https://governo.gov.ao/ministro"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-black underline underline-offset-2"
            >
              governo.gov.ao/ministro
            </a>
            . Ver também{" "}
            <Link href="/votacoes" className="font-medium text-black underline underline-offset-2">
              votações
            </Link>{" "}
            e a{" "}
            <Link href="/metodologia" className="font-medium text-black underline underline-offset-2">
              metodologia
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

function GovAvatar({
  member,
  size,
  ringClass = "ring-white/20",
}: {
  member: GovMember;
  size: number;
  ringClass?: string;
}) {
  const [failed, setFailed] = useState(false);
  const label = initials(member.name);

  if (!member.photoUrl || failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#ce1126] font-bold text-white ring-2 ${ringClass}`}
        style={{ width: size, height: size, fontSize: Math.max(10, size * 0.28) }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full bg-zinc-200 ring-2 ${ringClass}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.photoUrl}
        alt=""
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover object-top"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}
