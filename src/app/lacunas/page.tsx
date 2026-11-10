import Link from "next/link";
import { AccessTools } from "@/components/AccessTools";
import { LACUNAS } from "@/data/lacunas";

export const metadata = { title: "O Estado não publica isto" };

const IMPACT: Record<string, string> = {
  alto: "Prioridade alta",
  medio: "Importante",
};

export default function LacunasPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,210,63,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-14 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Honestidade pública
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {LACUNAS.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/70">
            {LACUNAS.plainIntro}
          </p>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-14 lg:px-6">
          <AccessTools
            title={LACUNAS.title}
            summary="Faltam votos nominais, assiduidade, recibos claros, custo real da Presidência, painel de obras e contratos abertos. Sem isto, a fiscalização fica a meio."
            speakText={`${LACUNAS.title}. ${LACUNAS.plainIntro} ${LACUNAS.items.map((i) => `${i.title}: ${i.ask}`).join(" ")}`}
            path="/lacunas"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {LACUNAS.items.map((item, i) => (
              <article
                key={item.id}
                className="soft-card group relative overflow-hidden p-0"
              >
                <div className="flex items-stretch">
                  <div className="flex w-14 shrink-0 items-center justify-center bg-zinc-950 text-xl font-black text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-black">{item.title}</h2>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                        {IMPACT[item.impact] ?? item.impact}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.plain}</p>
                    <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                        Pedido claro · {item.who}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-zinc-800">
                        {item.ask}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 text-sm leading-relaxed text-zinc-700">
            {LACUNAS.closing}
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/transparencia" className="btn-primary">
              Remunerações →
            </Link>
            <Link
              href="/execucao"
              className="inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold ring-1 ring-zinc-200"
            >
              Execução do OGE →
            </Link>
            <Link
              href="/comparador"
              className="inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold ring-1 ring-zinc-200"
            >
              Comparador →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
