import Link from "next/link";
import { AccessTools } from "@/components/AccessTools";
import { EXECUCAO } from "@/data/execucao";

export const metadata = { title: "Execução do Orçamento" };

export default function ExecucaoPage() {
  const y = EXECUCAO.currentYear;
  const latest = y.latest;

  return (
    <div>
      <section className="bg-banner text-black">
        <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-[12px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Promessa vs dinheiro gasto
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{EXECUCAO.title}</h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-black/70">
            {EXECUCAO.plainIntro}
          </p>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] space-y-10 px-4 py-14 lg:px-6">
          <AccessTools
            title={EXECUCAO.title}
            summary={`No II trimestre de 2026, o Estado arrecadou ${latest.revenue} (${latest.revenueShare}) e gastou ${latest.expense} (${latest.expenseShare}). Orçamento autorizado: ${y.authorized}.`}
            speakText={`${EXECUCAO.title}. ${EXECUCAO.plainIntro} Último relatório: ${latest.period}. Receitas ${latest.revenue}. Despesas ${latest.expense}. ${latest.balance}`}
            path="/execucao"
          />

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="soft-card relative overflow-hidden p-6">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-100/80" />
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">{y.label}</p>
              <p className="mt-2 text-sm text-zinc-500">Autorizado: {y.authorized}</p>
              <h2 className="mt-4 text-2xl font-bold text-black">{latest.period}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Metric label="Entrou" value={latest.revenue} hint={latest.revenueShare} tone="in" />
                <Metric label="Saiu" value={latest.expense} hint={latest.expenseShare} tone="out" />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-700">{latest.balance}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{latest.oilNote}</p>
              <p className="mt-3 text-xs text-zinc-400">{latest.debtStock}</p>
              <a
                href={latest.url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-6"
              >
                Abrir REOGE oficial →
              </a>
            </div>

            <div className="space-y-3">
              <div className="soft-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                  Ano anterior
                </p>
                <p className="mt-2 font-bold text-black">{EXECUCAO.previousYear.label}</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Autorizado: {EXECUCAO.previousYear.authorized}
                </p>
                <p className="mt-3 text-sm text-zinc-700">
                  {EXECUCAO.previousYear.q4.period}: receitas {EXECUCAO.previousYear.q4.revenue};{" "}
                  despesas {EXECUCAO.previousYear.q4.expense}. {EXECUCAO.previousYear.q4.balance}
                </p>
              </div>
              <div className="soft-card bg-zinc-900 p-5 text-white">
                <p className="text-sm font-bold">Regra de ouro</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Orçamento aprovado ≠ merenda na escola. Se o % de execução estiver baixo a meio
                  do ano, pergunta: onde está o dinheiro?
                </p>
                <Link href="/orcamento" className="mt-4 inline-block text-sm font-semibold text-accent">
                  Ver proposta / números do OGE →
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">Linha do tempo (leituras oficiais)</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {EXECUCAO.timeline.map((t) => (
                <div key={t.when} className="soft-card p-4">
                  <p className="text-xs font-bold text-zinc-400">{t.when}</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-700">↑ {t.revenue}</p>
                  <p className="text-sm font-semibold text-rose-700">↓ {t.expense}</p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">{t.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">Como ler isto sem ser economista</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {EXECUCAO.howToRead.map((c) => (
                <article key={c.title} className="soft-card p-5">
                  <p className="font-bold text-black">{c.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{c.plain}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">{EXECUCAO.worksAndContracts.title}</h2>
            <p className="max-w-3xl text-sm text-zinc-600">{EXECUCAO.worksAndContracts.plain}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {EXECUCAO.worksAndContracts.available.map((a) => (
                <a
                  key={a.title}
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className="soft-card block p-5 hover:border-zinc-300"
                >
                  <p className="font-bold text-black">{a.title}</p>
                  <p className="mt-2 text-sm text-zinc-600">{a.plain}</p>
                  <p className="mt-3 text-sm font-semibold text-black">Abrir fonte →</p>
                </a>
              ))}
            </div>
            <div className="rounded-[1.5rem] border border-dashed border-rose-200 bg-rose-50/60 p-5">
              <p className="font-bold text-black">Ainda falta publicar bem</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {EXECUCAO.worksAndContracts.missing.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="text-rose-500">●</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/lacunas"
                className="mt-4 inline-block text-sm font-semibold text-black underline underline-offset-2"
              >
                Ver todas as lacunas →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "in" | "out";
}) {
  return (
    <div className={`rounded-2xl p-4 ${tone === "in" ? "bg-emerald-50" : "bg-rose-50"}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-black">{value}</p>
      <p className="mt-1 text-xs text-zinc-500">{hint}</p>
    </div>
  );
}
