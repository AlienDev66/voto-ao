import Link from "next/link";
import { AccessTools } from "@/components/AccessTools";
import { TRANSPARENCY } from "@/data/transparencia";

export const metadata = { title: "Transparência" };

function SectionTitle({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-black">{title}</h2>
      {hint && <p className="mt-1 max-w-2xl text-sm text-zinc-500">{hint}</p>}
    </div>
  );
}

function Card({
  title,
  value,
  body,
  foot,
}: {
  title: string;
  value?: string;
  body: string;
  foot?: string;
}) {
  return (
    <article className="soft-card flex h-full flex-col p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{title}</p>
      {value && <p className="mt-2 text-xl font-bold tracking-tight text-black">{value}</p>}
      <p className={`text-sm leading-relaxed text-zinc-600 ${value ? "mt-3" : "mt-2"}`}>{body}</p>
      {foot && (
        <p className="mt-3 border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-400">
          {foot}
        </p>
      )}
    </article>
  );
}

export default function TransparenciaPage() {
  const d = TRANSPARENCY.deputies;
  const p = TRANSPARENCY.president;

  return (
    <div>
      <section className="bg-banner text-black">
        <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-[12px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Transparência
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {TRANSPARENCY.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-black/70">
            {TRANSPARENCY.plainIntro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <a href="#deputados" className="rounded-full bg-black px-4 py-2 text-white">
              Deputados
            </a>
            <a href="#presidente" className="rounded-full bg-black/10 px-4 py-2 text-black">
              Presidente
            </a>
            <a href="#lacunas" className="rounded-full bg-black/10 px-4 py-2 text-black">
              O que ainda falta
            </a>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] space-y-14 px-4 py-14 lg:px-6">
          <AccessTools
            title={TRANSPARENCY.title}
            summary="Deputado: base cerca de 790 mil Kz + suplementos (bruto estimado ~2,6 milhões). Presidente: cerca de 1,48 milhões na tabela 2026 (base + representação). Há regalias além do salário."
            speakText={`${TRANSPARENCY.title}. ${TRANSPARENCY.plainIntro}`}
            path="/transparencia"
          />

          {/* DEPUTADOS */}
          <div id="deputados" className="scroll-mt-24 space-y-8">
            <div>
              <p className="text-sm font-semibold text-zinc-400">{d.countLabel}</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-black">{d.title}</h2>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="O que fazem de facto"
                hint="Em linguagem de rua — o mandato legal, sem romantizar nem denegrir."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.whatTheyDo.map((card) => (
                  <Card key={card.title} title={card.title} body={card.plain} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="Quanto ganham (dinheiro)"
                hint="Base oficial 2026 + suplementos da Res. 6/19 aplicados ao base actual. Deputado sem cargo de chefia."
              />
              <div className="soft-card grid gap-4 p-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Salário-base
                  </p>
                  <p className="mt-1 text-2xl font-bold text-black">{d.payHeadline.base}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Bruto estimado
                  </p>
                  <p className="mt-1 text-2xl font-bold text-black">{d.payHeadline.grossCalc}</p>
                  <p className="mt-1 text-xs text-zinc-400">base + suplementos mensais</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Líquido (imprensa)
                  </p>
                  <p className="mt-1 text-2xl font-bold text-black">{d.payHeadline.netPress}</p>
                  <p className="mt-1 text-xs text-zinc-400">{d.payHeadline.netPressNote}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.payLines.map((line) => (
                  <Card
                    key={line.label}
                    title={line.label}
                    value={line.amountLabel}
                    body={line.plain}
                    foot={line.note}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="Extras anuais e cargos"
                hint="Além do mensal: férias, 13.º e percentagens se tiver cargo na Assembleia."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.annualExtras.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    value={card.amountLabel}
                    body={card.plain}
                  />
                ))}
                {d.cargoExtras.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    value={card.amountLabel}
                    body={card.plain}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title={d.speakerPay.title}
                hint="Pacote próprio — base mais alto e índices de suplemento diferentes."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.speakerPay.lines.map((line) => (
                  <Card
                    key={line.label}
                    title={line.label}
                    value={line.amountLabel}
                    body={line.plain}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="Regalias (além do salário)"
                hint="Direitos previstos na Lei n.º 6/08 e no Estatuto do Deputado — nem tudo tem preço publicado."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.perks.map((card) => (
                  <Card key={card.title} title={card.title} body={card.plain} />
                ))}
              </div>
            </div>
          </div>

          {/* PRESIDENTE */}
          <div id="presidente" className="scroll-mt-24 space-y-8 border-t border-zinc-200 pt-14">
            <div>
              <p className="text-sm font-semibold text-zinc-400">{p.who}</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-black">{p.title}</h2>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="O que faz de facto"
                hint="Resumo terra-a-terra das competências constitucionais — o poder real do cargo."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.whatTheyDo.map((card) => (
                  <Card key={card.title} title={card.title} body={card.plain} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="Quanto ganha (tabela 2026)"
                hint={p.payHeadline.note}
              />
              <div className="soft-card grid gap-4 p-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Vencimento-base
                  </p>
                  <p className="mt-1 text-2xl font-bold text-black">{p.payHeadline.base}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Representação
                  </p>
                  <p className="mt-1 text-2xl font-bold text-black">
                    {p.payHeadline.representation}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Total tabela
                  </p>
                  <p className="mt-1 text-2xl font-bold text-black">{p.payHeadline.total}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.payLines.map((line) => (
                  <Card
                    key={line.label}
                    title={line.label}
                    value={line.amountLabel}
                    body={line.plain}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="Escalão do Executivo (mesma tabela)"
                hint="Para comparares, lado a lado, o que a tabela publica para os cargos abaixo do Presidente."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {p.hierarchy.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    value={card.amountLabel}
                    body={card.plain}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                title="Regalias e estatuto"
                hint="Lei n.º 14/94 e regime da função executiva — o que a lei garante, mesmo sem preço em cada linha."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.perks.map((card) => (
                  <Card key={card.title} title={card.title} body={card.plain} />
                ))}
              </div>
            </div>
          </div>

          {/* LACUNAS */}
          <div id="lacunas" className="scroll-mt-24 space-y-6 border-t border-zinc-200 pt-14">
            <SectionTitle
              title="O que ainda não está claro em público"
              hint="Transparência também é admitir o buraco. Sem estes dados, ninguém consegue auditar tudo."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[...d.gaps, ...p.gaps].map((card) => (
                <Card key={card.title} title={card.title} body={card.plain} />
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-700">
            {TRANSPARENCY.honesty}
          </div>

          <div className="space-y-2 text-sm text-zinc-500">
            <p className="font-semibold text-zinc-700">Fontes</p>
            <ul className="space-y-1">
              {TRANSPARENCY.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-black underline underline-offset-2"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="pt-2">
              <Link href="/metodologia" className="font-medium text-black underline underline-offset-2">
                Metodologia
              </Link>
              {" · "}
              <Link href="/governo" className="font-medium text-black underline underline-offset-2">
                Governo
              </Link>
              {" · "}
              <Link href="/deputados" className="font-medium text-black underline underline-offset-2">
                Deputados
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
