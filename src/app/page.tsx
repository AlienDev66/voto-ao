import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { SpecialBanner } from "@/components/SpecialBanner";
import { VoteCard } from "@/components/VoteCard";
import { VoteResultBars } from "@/components/VoteResultBars";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [parties, votes, agenda, themes, counts, sampleDeputies] = await Promise.all([
    prisma.party.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.vote.findMany({
      take: 6,
      orderBy: { date: "desc" },
      include: {
        proposal: { include: { authorParty: true, themes: { include: { theme: true } } } },
        positions: { include: { party: true } },
      },
    }),
    prisma.agendaItem.findMany({ take: 1, orderBy: { date: "asc" } }),
    prisma.theme.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { proposals: true } } },
    }),
    Promise.all([
      prisma.proposal.count(),
      prisma.vote.count(),
      prisma.deputy.count({ where: { inOffice: true } }),
      prisma.party.count(),
    ]),
    prisma.deputy.findMany({
      where: { inOffice: true },
      take: 6,
      include: { party: true },
      orderBy: { fullName: "asc" },
    }),
  ]);

  const [proposalCount, voteCount, deputyCount, partyCount] = counts;
  const featured = votes[0];
  const nextAgenda = agenda[0];

  return (
    <div>
      <SpecialBanner
        title="Orçamento na tua vida"
        subtitle="Por pessoa · execução · o que o Estado ainda não publica"
        href="/orcamento"
        badge="OGE"
        stepsDone={1}
        stepsTotal={5}
      />

      <HomeHero parties={parties} />

      {/* Nós traduzimos */}
      <section className="light-section">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:px-6 lg:py-16">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="section-title text-black">Nós traduzimos o Parlamento.</h2>
            <p className="max-w-md text-[15px] leading-relaxed text-zinc-500 md:text-right">
              Cada proposta chega com um título oficial. Nós dizemos o que muda e quem votou o quê.
            </p>
          </div>

          {featured ? (
            <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
              <div className="rotate-[-1.5deg] rounded-2xl border border-amber-100 bg-[#f7f1e4] p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  Título oficial
                </p>
                <p className="mt-4 font-serif text-[15px] leading-relaxed text-zinc-700">
                  {featured.proposal.officialTitle}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black shadow-md">
                  <ArrowIcon />
                </div>
                <p className="mt-2 text-center text-[12px] font-medium text-zinc-500">
                  Em português
                  <br />
                  simples
                </p>
              </div>

              <Link
                href={`/propostas/${featured.proposal.slug}`}
                className="soft-card block p-6 shadow-md"
              >
                <h3 className="text-xl font-bold leading-snug tracking-tight text-black">
                  {featured.proposal.plainTitle}
                </h3>
                {featured.proposal.plainSummary && (
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
                    {featured.proposal.plainSummary}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                      featured.result === "aprovada"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {featured.result === "aprovada" ? "✓ Aprovada" : "Rejeitada"}
                  </span>
                  <span className="text-sm font-semibold text-black">Ver a votação →</span>
                </div>
                <div className="mt-5 border-t border-zinc-100 pt-5">
                  <VoteResultBars
                    light
                    votesFor={featured.votesFor}
                    votesAgainst={featured.votesAgainst}
                    abstentions={featured.abstentions}
                    positions={featured.positions.map((p) => ({
                      name: p.party.name,
                      color: p.party.color,
                      seats: p.party.seats,
                      stance: p.stance,
                    }))}
                  />
                </div>
              </Link>
            </div>
          ) : (
            <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-500">
              Ainda sem propostas traduzidas nesta base. Os dados oficiais estão a ser carregados.
            </p>
          )}
        </div>
      </section>

      {/* Pergunta */}
      <section className="light-section border-t border-zinc-200/80">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:px-6 lg:py-16">
          <h2 className="section-title mb-8 text-black">Pergunta. Nós respondemos.</h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Link href="/partidos" className="soft-card flex min-h-[220px] flex-col p-5">
              <p className="text-lg font-bold leading-snug text-black">Como vota o meu partido?</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {parties.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={p.id}
                    src={p.logoUrl || `/parties/${p.slug}.png`}
                    alt={p.name}
                    title={p.name}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                ))}
              </div>
              <p className="mt-auto pt-6 text-sm font-semibold text-black">
                Os {partyCount} partidos →
              </p>
            </Link>

            <Link
              href="/deputados"
              className="flex min-h-[220px] flex-col rounded-[1.5rem] bg-[#0c0c0e] p-5 text-white transition hover:brightness-110"
            >
              <p className="text-lg font-bold leading-snug">
                Quem são os deputados do meu círculo?
              </p>
              <div className="mt-5 flex items-center">
                {sampleDeputies.map((d, i) => (
                  <span
                    key={d.id}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0c0c0e] text-[10px] font-bold text-white"
                    style={{
                      background: d.party.color,
                      marginLeft: i === 0 ? 0 : -10,
                      zIndex: sampleDeputies.length - i,
                    }}
                    title={d.fullName}
                  >
                    {initials(d.fullName)}
                  </span>
                ))}
                <span className="ml-2 text-sm text-zinc-400">+{Math.max(deputyCount - 6, 0)}</span>
              </div>
              <p className="mt-auto pt-6 text-sm font-semibold">
                Os {deputyCount}, um a um →
              </p>
            </Link>

            <Link href="/agenda" className="soft-card flex min-h-[220px] flex-col p-5">
              <div className="mb-4 inline-flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-black text-white">
                <span className="text-[9px] font-bold uppercase tracking-wide text-zinc-300">
                  {nextAgenda ? weekdayShort(nextAgenda.date) : "AN"}
                </span>
                <span className="text-lg font-bold leading-none">
                  {nextAgenda ? nextAgenda.date.getDate() : "—"}
                </span>
              </div>
              <p className="text-lg font-bold leading-snug text-black">
                O que vai a votos esta semana?
              </p>
              <p className="mt-auto pt-6 text-sm font-semibold text-black">
                A agenda do Plenário →
              </p>
            </Link>

            <Link
              href="/jogo"
              className="flex min-h-[220px] flex-col rounded-[1.5rem] bg-accent p-5 text-black transition hover:brightness-95"
            >
              <p className="text-lg font-bold leading-snug">Consegues adivinhar como votaram?</p>
              <div className="mt-5 grid grid-cols-4 gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex h-9 items-center justify-center rounded-lg bg-black/10 text-sm font-bold text-black/50"
                  >
                    ?
                  </span>
                ))}
              </div>
              <p className="mt-auto pt-6 text-sm font-semibold">Jogo diário →</p>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex flex-col gap-6 rounded-[1.5rem] bg-[#0c0c0e] px-6 py-6 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4">
              <Stat n={proposalCount} label="propostas" accent />
              <Stat n={voteCount} label="votações em plenário" />
              <Stat n={deputyCount} label="deputados" />
              <Stat n={partyCount} label="partidos" />
            </div>
            <div className="hidden h-12 w-px bg-white/15 lg:block" />
            <p className="max-w-xs text-[13px] leading-relaxed text-zinc-400">
              Apartidário. Sem anúncios. Só dados oficiais da Assembleia Nacional.
            </p>
          </div>
        </div>
      </section>

      {/* Últimas votações */}
      <section className="light-section border-t border-zinc-200/80">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:px-6 lg:py-16">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title text-black">Últimas votações</h2>
              <p className="mt-1 text-[15px] text-zinc-500">
                Com fonte oficial. Em expansão.
              </p>
            </div>
            <Link href="/votacoes" className="text-sm font-semibold text-black hover:underline">
              Todas as votações →
            </Link>
          </div>

          {votes.length === 0 ? (
            <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-500">
              Ainda sem votações nesta base.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {votes.map((v) => (
                <VoteCard
                  key={v.id}
                  href={`/propostas/${v.proposal.slug}`}
                  date={v.date}
                  stage={v.stage}
                  result={v.result}
                  title={v.proposal.plainTitle}
                  officialRef={truncate(v.proposal.officialTitle, 48)}
                  authorParty={v.proposal.authorParty}
                  authorLabel={v.proposal.authorLabel}
                  themes={v.proposal.themes.map((t) => t.theme)}
                  votesFor={v.votesFor}
                  votesAgainst={v.votesAgainst}
                  abstentions={v.abstentions}
                  positions={v.positions}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Temas */}
      <section className="light-section border-t border-zinc-200/80">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:px-6 lg:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title text-black">Explorar por tema</h2>
              <p className="mt-1 text-[15px] text-zinc-500">
                Cada proposta é classificada num ou mais temas.
              </p>
            </div>
            <Link href="/temas" className="text-sm font-semibold text-black hover:underline">
              Todos os temas →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((t, i) => (
              <Link
                key={t.id}
                href={`/temas/${t.slug}`}
                className="soft-card p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-2xl font-bold tabular-nums text-zinc-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-right text-[12px] text-zinc-500">
                    {t._count.proposals} propostas
                  </span>
                </div>
                <p className="text-lg font-bold text-black">{t.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="light-section border-t border-zinc-200/80">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:px-6 lg:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title text-black">Próximas sessões do Plenário</h2>
              <p className="mt-1 text-[15px] text-zinc-500">
                Segundo fontes oficiais. Pode mudar.
              </p>
            </div>
            <Link href="/agenda" className="text-sm font-semibold text-black hover:underline">
              Agenda completa →
            </Link>
          </div>
          {agenda.length === 0 ? (
            <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-500">
              Ainda sem convocatórias estruturadas nesta base. Consulta o site da Assembleia Nacional.
            </p>
          ) : (
            <ul className="space-y-3">
              {agenda.map((a) => (
                <li key={a.id} className="soft-card px-5 py-4">
                  <p className="text-xs text-zinc-500">{formatDate(a.date)}</p>
                  <p className="font-semibold text-black">{a.title}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label, accent = false }: { n: number; label: string; accent?: boolean }) {
  return (
    <div>
      <p className={`text-3xl font-bold tabular-nums ${accent ? "text-accent" : "text-white"}`}>
        {n}
      </p>
      <p className="mt-0.5 text-[13px] text-zinc-400">{label}</p>
    </div>
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

function weekdayShort(date: Date) {
  return date
    .toLocaleDateString("pt-AO", { weekday: "short" })
    .replace(".", "")
    .slice(0, 3)
    .toUpperCase();
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
