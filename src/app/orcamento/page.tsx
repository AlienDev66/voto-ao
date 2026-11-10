import Link from "next/link";
import { AccessTools } from "@/components/AccessTools";
import { OGE, OGE_2026, type OgeFactCard } from "@/data/governo";
import { LIFE_IMPACT, POPULATION, PROVINCE_SHARE } from "@/data/oge-vida";

export const metadata = { title: "Orçamento" };

const SECTIONS: {
  key: OgeFactCard["section"];
  title: string;
  hint: string;
}[] = [
  {
    key: "aviso",
    title: "Antes de tudo",
    hint: "O tamanho da conta e o estado do processo — para não confundir proposta com lei.",
  },
  {
    key: "povo",
    title: "O que toca no dia-a-dia",
    hint: "Educação, saúde, água, protecção, segurança, energia… fatias que se sentem na vida comum.",
  },
  {
    key: "entrada",
    title: "De onde vem o dinheiro",
    hint: "Impostos, petróleo e empréstimos — quem paga a conta do Estado.",
  },
  {
    key: "saida",
    title: "Para onde vai o dinheiro",
    hint: "Dívida, salários, obras, bens e serviços, apoios — as grandes saídas.",
  },
];

function FactCard({ card }: { card: OgeFactCard }) {
  return (
    <article className="soft-card flex h-full flex-col p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{card.title}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-black">{card.value}</p>
      {card.share && (
        <p className="mt-1 text-sm font-medium text-zinc-500">{card.share}</p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">{card.meaning}</p>
      {card.detail && (
        <p className="mt-3 border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-400">
          {card.detail}
        </p>
      )}
    </article>
  );
}

export default function OrcamentoPage() {
  const done = OGE.steps.filter((s) => s.done).length;

  return (
    <div>
      <section className="bg-banner text-black">
        <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-[12px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Transparência · {OGE.yearLabel}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{OGE.title}</h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-black/70">
            {OGE.plainIntro}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <span>{OGE.amountLabel}</span>
            <span>{OGE.lawLabel}</span>
            <span>
              {done} de {OGE.steps.length} fases
            </span>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {OGE.steps.map((step) => (
              <span
                key={step.key}
                className={`h-2.5 w-10 rounded-full sm:w-14 ${
                  step.done ? "bg-black" : "bg-black/20"
                }`}
                title={step.plainLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] space-y-12 px-4 py-14 lg:px-6">
          <AccessTools
            title={`${OGE.title} ${OGE.yearLabel}`}
            summary={`${OGE.amountPlain} Educação, saúde e água também estão convertidas «por pessoa» mais abaixo.`}
            speakText={`${OGE.title}. ${OGE.plainIntro} ${OGE.amountPlain} ${LIFE_IMPACT.intro}`}
            path="/orcamento"
          />

          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl font-bold text-black">Em uma frase</h2>
            <p className="text-[15px] leading-relaxed text-zinc-600">{OGE.amountPlain}</p>
            <p className="text-xs text-zinc-400">Valor exacto da proposta: {OGE.amountExact}</p>
          </div>

          {/* VIDA CONCRETA */}
          <div id="vida" className="scroll-mt-24 space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-black">Isto na tua vida</h2>
                <p className="mt-1 max-w-2xl text-sm text-zinc-500">{LIFE_IMPACT.intro}</p>
              </div>
              <p className="text-xs text-zinc-400">
                População: {POPULATION.label} · {POPULATION.source}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LIFE_IMPACT.perPerson.map((card) => (
                <article
                  key={card.id}
                  className="soft-card relative overflow-hidden p-5"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-100/70" />
                  <p className="relative text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {card.title}
                  </p>
                  <p className="relative mt-2 text-2xl font-bold tracking-tight text-black">
                    {card.value}
                  </p>
                  <p className="relative mt-3 text-sm leading-relaxed text-zinc-600">
                    {card.plain}
                  </p>
                  {card.detail && (
                    <p className="relative mt-3 border-t border-zinc-100 pt-3 text-xs text-zinc-400">
                      {card.detail}
                    </p>
                  )}
                </article>
              ))}
            </div>
            <p className="text-xs text-zinc-500">{LIFE_IMPACT.disclaimer}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">Escola, hospital, luz, água</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {LIFE_IMPACT.dayToDay.map((card) => (
                <article key={card.id} className="soft-card overflow-hidden p-0">
                  <div className="bg-zinc-900 px-5 py-3">
                    <p className="font-bold text-white">{card.title}</p>
                  </div>
                  <div className="space-y-3 p-5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                        Na proposta
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-700">{card.promise}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-rose-700">
                        Na vida real
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-700">{card.reality}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-black">E se o bolo seguisse a população?</h2>
              <p className="mt-1 max-w-2xl text-sm text-zinc-500">
                Não é assim que o OGE é distribuído — mas ajuda a ver a escala das maiores
                províncias (Censo 2024).
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PROVINCE_SHARE.map((p) => (
                <article key={p.name} className="soft-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                    {p.shareLabel} do país
                  </p>
                  <p className="mt-1 text-xl font-bold text-black">{p.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">{p.peopleLabel} pessoas</p>
                  <p className="mt-3 text-sm font-semibold text-black">{p.ifSplitTotal}</p>
                  <p className="text-xs text-zinc-400">fatia ilustrativa do bolo total</p>
                  <p className="mt-2 text-sm text-zinc-600">Educação ilustrativa: {p.ifSplitEducation}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">{LIFE_IMPACT.proposalVsLaw.title}</h2>
            <ol className="grid gap-3 md:grid-cols-3">
              {LIFE_IMPACT.proposalVsLaw.steps.map((s) => (
                <li key={s.label} className="soft-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">{s.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">{s.plain}</p>
                </li>
              ))}
            </ol>
            <Link href="/execucao" className="btn-primary">
              Ver se o dinheiro está a ser gasto →
            </Link>
          </div>

          {SECTIONS.map((section) => {
            const cards = OGE.facts.filter((f) => f.section === section.key);
            if (cards.length === 0) return null;
            return (
              <div key={section.key} className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-black">{section.title}</h2>
                  <p className="mt-1 max-w-2xl text-sm text-zinc-500">{section.hint}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cards.map((card) => (
                    <FactCard key={card.id} card={card} />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-black">Onde estamos no processo</h2>
              <p className="mt-1 max-w-2xl text-sm text-zinc-500">
                Só para saberes se estes números já são lei ou ainda podem mudar.
              </p>
            </div>
            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {OGE.steps.map((step, i) => (
                <li key={step.key} className="soft-card p-4">
                  <p
                    className={`text-xs font-bold ${
                      step.done ? "text-black" : "text-zinc-400"
                    }`}
                  >
                    {step.done ? "Feito" : `Falta · ${i + 1}`}
                  </p>
                  <p className="mt-1 font-semibold text-black">{step.plainLabel}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">{step.plainDetail}</p>
                  {step.dateLabel && (
                    <p className="mt-2 text-[11px] font-medium text-zinc-400">{step.dateLabel}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-700">
            {OGE.status}
          </div>

          <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-600">
            <p className="font-semibold text-black">Ano passado ({OGE_2026.yearLabel})</p>
            <p className="mt-1">
              Já aprovado ({OGE_2026.lawLabel}), cerca de {OGE_2026.amountLabel}.{" "}
              <Link
                href={`/propostas/${OGE_2026.relatedVoteSlug}`}
                className="font-medium text-black underline underline-offset-2"
              >
                Ver a votação final →
              </Link>
            </p>
          </div>

          <div className="space-y-2 text-sm text-zinc-500">
            <p>{OGE.methodologyNote}</p>
            <p>
              Fontes:{" "}
              <a
                href={OGE.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-black underline underline-offset-2"
              >
                {OGE.sourceLabel}
              </a>
              {" · "}
              <a
                href={OGE.secondarySourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-black underline underline-offset-2"
              >
                {OGE.secondarySourceLabel}
              </a>
              {" · "}
              <Link
                href="/metodologia"
                className="font-medium text-black underline underline-offset-2"
              >
                Metodologia
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
