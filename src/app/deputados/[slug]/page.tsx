import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessTools } from "@/components/AccessTools";
import { PartyLogo } from "@/components/PartyLogo";
import { initials, parlamentoEntityUrl } from "@/lib/parlamento";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const deputy = await prisma.deputy.findUnique({ where: { slug } });
  return { title: deputy?.fullName ?? "Deputado" };
}

export default async function DeputadoPage({ params }: Props) {
  const { slug } = await params;
  const deputy = await prisma.deputy.findUnique({
    where: { slug },
    include: {
      party: true,
      committees: { include: { committee: true } },
    },
  });
  if (!deputy) notFound();

  const [peers, partyVotes] = await Promise.all([
    prisma.deputy.findMany({
      where: {
        inOffice: true,
        electoralCircle: deputy.electoralCircle ?? undefined,
        NOT: { id: deputy.id },
      },
      include: { party: true },
      take: 8,
      orderBy: { fullName: "asc" },
    }),
    prisma.votePosition.findMany({
      where: { partyId: deputy.partyId },
      orderBy: { vote: { date: "desc" } },
      take: 8,
      include: {
        vote: {
          include: {
            proposal: true,
          },
        },
      },
    }),
  ]);

  const shortName = displayName(deputy.fullName);
  const circle = deputy.electoralCircle ?? "círculo nacional";
  const roleLine = deputy.mesaRole
    ? deputy.mesaRole
    : `Deputad${deputy.gender === "F" ? "a" : "o"} d${article(deputy.party.name)} ${deputy.party.name} eleit${deputy.gender === "F" ? "a" : "o"} por ${circle}`;

  return (
    <div className="light-section min-h-full">
      <section className="relative overflow-hidden" style={{ background: deputy.party.color }}>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[clamp(6rem,22vw,14rem)] font-black leading-none text-black/10 select-none"
          aria-hidden
        >
          {deputy.party.name}
        </div>
        <div className="relative mx-auto grid max-w-[1200px] gap-8 px-4 pb-0 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-6 lg:pt-10">
          <div className="pb-10">
            <p className="text-sm text-white/80">
              <Link href="/deputados" className="hover:underline">
                Deputados
              </Link>
              {" / "}
              {shortName}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <PartyLogo
                name={deputy.party.name}
                color="#fff"
                logoUrl={deputy.party.logoUrl}
                slug={deputy.party.slug}
                size={36}
                className="!rounded-lg ring-1 ring-black/10"
              />
              <p className="text-sm text-white/90">{roleLine}</p>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
              {shortName}
            </h1>
            <p className="mt-3 text-sm text-black/70">
              {[deputy.electoralCircle, deputy.gender === "F" ? "Deputada" : "Deputado", "V Legislatura"]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {deputy.inOffice ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Em funções
                </span>
              ) : (
                <span className="inline-flex rounded-full border border-black/30 px-4 py-2 text-sm font-semibold text-black">
                  Fora de funções
                </span>
              )}
              <Link
                href={`/partidos/${deputy.party.slug}`}
                className="inline-flex rounded-full border border-black/30 bg-transparent px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
              >
                Como vota {article(deputy.party.name)} {deputy.party.name} →
              </Link>
            </div>
          </div>

          <div className="relative flex items-end justify-center lg:justify-end">
            <div className="relative h-[280px] w-[240px] sm:h-[340px] sm:w-[280px]">
              {deputy.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={deputy.photoUrl}
                  alt={deputy.fullName}
                  className="absolute inset-0 h-full w-full object-cover object-top drop-shadow-2xl"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-end justify-center">
                  <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-black/20 text-4xl font-bold text-white">
                    {initials(deputy.fullName)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-8 lg:px-6">
        <AccessTools
          title={shortName}
          summary={`${roleLine}. Em Angola o voto nominal por deputado quase nunca é publicado — aqui mostramos o que há: partido, círculo, comissões e o histórico da bancada.`}
          speakText={`${deputy.fullName}. ${roleLine}. Sem votos nominais públicos, não dá para dizer exactamente como esta pessoa votou em cada proposta. O VotoAO mostra o partido e pede transparência.`}
          path={`/deputados/${deputy.slug}`}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            value="—"
            label="Presenças no plenário"
            hint="A AN não publica assiduidade aberta por deputado"
          />
          <Stat
            value="—"
            label="Voto nominal"
            hint="Quase nunca há lista pública «nome → sim/não»"
          />
          <Stat
            value={String(deputy.committees.length || "—")}
            label="Comissões nesta ficha"
            hint={
              deputy.committees.length
                ? "Dados estruturados no VotoAO"
                : "Composições oficiais em expansão"
            }
          />
          <Stat
            value="—"
            label="Iniciativas assinadas"
            hint="Ainda sem liga automática a projectos com assinatura individual"
          />
        </div>

        <div className="soft-card overflow-hidden border-amber-200 bg-amber-50/40 p-0">
          <div className="border-b border-amber-100 bg-amber-100/50 px-5 py-3">
            <p className="text-sm font-bold text-black">Provas — o que dá para cobrar hoje</p>
          </div>
          <div className="grid gap-0 md:grid-cols-3">
            <div className="border-b border-amber-100 p-5 md:border-b-0 md:border-r">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Temos</p>
              <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
                <li>• Partido e círculo eleitoral</li>
                <li>• Foto e papel na Mesa (se houver)</li>
                <li>• Comissões (quando estruturadas)</li>
                <li>• Como a bancada aparece nas votações do arquivo</li>
              </ul>
            </div>
            <div className="border-b border-amber-100 p-5 md:border-b-0 md:border-r">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Não temos</p>
              <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
                <li>• Cada «sim/não» desta pessoa</li>
                <li>• Faltas sessão a sessão</li>
                <li>• Perguntas feitas ao Governo</li>
                <li>• Emendas que assinou</li>
              </ul>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Porquê</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                O Parlamento publica pouco em formato aberto. Não inventamos provas.{" "}
                <Link href="/lacunas" className="font-semibold underline underline-offset-2">
                  Ver lacunas →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-black">A bancada ({deputy.party.name})</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Como não há voto nominal deste deputado, mostramos as votações recentes ligadas ao
                partido — com a honestidade de dizer quando a posição está «desconhecida».
              </p>
              {partyVotes.length === 0 ? (
                <p className="mt-5 text-sm text-zinc-600">Ainda sem votações ligadas a este partido.</p>
              ) : (
                <ul className="mt-5 space-y-3">
                  {partyVotes.map((vp) => (
                    <li
                      key={vp.id}
                      className="flex flex-col gap-2 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-black">
                          {vp.vote.proposal.plainTitle}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {vp.vote.date.toLocaleDateString("pt-AO")} · {vp.vote.result} ·{" "}
                          {vp.vote.votesFor}–{vp.vote.votesAgainst}–{vp.vote.abstentions}
                        </p>
                      </div>
                      <StancePill stance={vp.stance} />
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/partidos/${deputy.party.slug}`}
                  className="text-sm font-semibold text-black underline underline-offset-2"
                >
                  Mais sobre {article(deputy.party.name)} {deputy.party.name} →
                </Link>
                <Link
                  href="/comparador"
                  className="text-sm font-semibold text-black underline underline-offset-2"
                >
                  Comparador de partidos →
                </Link>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-black">Presenças, debates, iniciativas</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Espaço reservado para quando a AN publicar dados estruturados.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <MiniEmpty title="Presenças" text="Sem série pública por reunião." />
                <MiniEmpty title="Debates" text="Sem contagem de intervenções aberta." />
                <MiniEmpty title="Iniciativas" text="Sem assinaturas individuais ligadas." />
              </div>
              <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(12px,1fr))] gap-1.5">
                {Array.from({ length: 48 }).map((_, i) => (
                  <span key={i} className="aspect-square rounded-[3px] bg-zinc-200" title="Sem dado" />
                ))}
              </div>
              <p className="mt-3 text-[12px] text-zinc-500">
                Heatmap à espera de fonte oficial — cinzento = não sabemos.
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-black">Comissões</h2>
              <p className="mt-1 text-sm text-zinc-500">
                {deputy.committees.length > 0
                  ? `${deputy.committees.length} comissão(ões) nesta ficha`
                  : "Composições oficiais em expansão"}
              </p>
              {deputy.committees.length === 0 ? (
                <p className="mt-4 text-sm text-zinc-600">
                  Ainda sem dados estruturados de comissões neste perfil. Consulta a{" "}
                  <a
                    href={parlamentoEntityUrl(deputy.fullName)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-black underline underline-offset-2"
                  >
                    ficha no Parlamento
                  </a>
                  .
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {deputy.committees.map((m) => (
                    <li key={m.id} className="flex items-start justify-between gap-3 text-sm">
                      <span className="font-medium text-black">{m.committee.name}</span>
                      <span className="shrink-0 rounded-md bg-black px-2 py-0.5 text-[11px] font-semibold text-white">
                        {m.role}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-black">Quem é</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Nome completo" value={deputy.fullName} />
                <Row label="Partido" value={deputy.party.fullName} />
                <Row label="Círculo" value={deputy.electoralCircle ?? "Não indicado"} />
                <Row label="Mesa" value={deputy.mesaRole ?? "—"} />
              </dl>
            </Card>

            {deputy.electoralCircle && peers.length > 0 && (
              <Card>
                <h2 className="text-xl font-bold text-black">
                  Também eleitos por {deputy.electoralCircle}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {peers.length + 1} deputados em funções neste círculo (amostra)
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {peers.map((p) => (
                    <Link
                      key={p.id}
                      href={`/deputados/${p.slug}`}
                      title={p.fullName}
                      className="inline-flex overflow-hidden rounded-full ring-2 ring-white"
                    >
                      {p.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.photoUrl} alt="" className="h-10 w-10 object-cover" />
                      ) : (
                        <span
                          className="flex h-10 w-10 items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: p.party.color }}
                        >
                          {initials(p.fullName)}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        <p className="text-xs text-zinc-500">
          Fonte: Assembleia Nacional.{" "}
          <a
            href={parlamentoEntityUrl(deputy.fullName)}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Ver ficha oficial ↗
          </a>
        </p>
      </div>
    </div>
  );
}

function displayName(fullName: string) {
  const parts = fullName.split(/\s+/).filter(Boolean);
  if (parts.length <= 2) return fullName;
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

function article(partyName: string) {
  return /^[aeiou]/i.test(partyName) ? "a" : "o";
}

function Stat({ value, label, hint }: { value: string; label: string; hint: string }) {
  return (
    <div className="soft-card p-5">
      <p className="text-3xl font-bold tabular-nums text-black">{value}</p>
      <p className="mt-1 text-sm font-semibold text-black">{label}</p>
      <p className="mt-1 text-[12px] leading-snug text-zinc-500">{hint}</p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="soft-card p-6">{children}</div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-zinc-500">{label}</dt>
      <dd className="font-semibold text-black">{value}</dd>
    </div>
  );
}

function StancePill({ stance }: { stance: string }) {
  const map: Record<string, { label: string; className: string }> = {
    a_favor: { label: "A favor", className: "bg-emerald-100 text-emerald-800" },
    contra: { label: "Contra", className: "bg-rose-100 text-rose-800" },
    abstencao: { label: "Abstenção", className: "bg-amber-100 text-amber-900" },
    desconhecido: { label: "Não publicado", className: "bg-zinc-200 text-zinc-700" },
  };
  const m = map[stance] ?? map.desconhecido;
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${m.className}`}>
      {m.label}
    </span>
  );
}

function MiniEmpty({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
      <p className="text-sm font-bold text-black">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">{text}</p>
    </div>
  );
}
