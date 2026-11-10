import { DeputiesExplorer } from "@/components/DeputiesExplorer";
import { DeputyHemicycle } from "@/components/DeputyHemicycle";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Deputados" };

export default async function DeputadosPage() {
  const parties = await prisma.party.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      deputies: { where: { inOffice: true }, orderBy: { fullName: "asc" } },
    },
  });
  const total = parties.reduce((n, p) => n + p.deputies.length, 0);
  const mesaCount = parties.reduce(
    (n, p) => n + p.deputies.filter((d) => d.mesaRole).length,
    0,
  );
  const women = parties.reduce(
    (n, p) => n + p.deputies.filter((d) => d.gender === "F").length,
    0,
  );
  const president = parties
    .flatMap((p) => p.deputies.map((d) => ({ ...d, party: p })))
    .find((d) => d.mesaRole?.startsWith("Presidente"));

  const hemiDeputies = parties.flatMap((p) =>
    p.deputies.map((d) => ({
      id: d.id,
      slug: d.slug,
      fullName: d.fullName,
      electoralCircle: d.electoralCircle,
      mesaRole: d.mesaRole,
      photoUrl: d.photoUrl,
      partySlug: p.slug,
      partyName: p.name,
      partyColor: p.color,
    })),
  );

  const partyMeta = parties.map((p) => ({
    slug: p.slug,
    name: p.name,
    color: p.color,
    logoUrl: p.logoUrl,
    count: p.deputies.length,
  }));

  return (
    <div>
      <section className="bg-[#0c0c0e]">
        <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
          <p className="text-sm text-zinc-500">Deputados · V Legislatura</p>
          <div className="mt-3 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                Os {total}
              </h1>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-400">
                Quem se senta no Parlamento, um a um: de onde vem, há quanto tempo lá está, e quando
                a fonte oficial o permitir — como vota.
              </p>
              {president && (
                <p className="mt-4 text-sm text-zinc-400">
                  Presidente:{" "}
                  <span className="font-semibold text-white">{president.fullName}</span>
                  {" · "}desde 17 nov 2025
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                n={women || "—"}
                label={
                  women
                    ? `mulheres, ${Math.round((women / total) * 100)}% dos deputados`
                    : "género ainda sem fonte estruturada"
                }
              />
              <StatCard n={parties.length} label="forças com assento" />
              <StatCard n={mesaCount} label="na Mesa da Assembleia" />
              <StatCard n="2022–27" label="V Legislatura" />
            </div>
          </div>

          <div className="mt-12">
            <DeputyHemicycle deputies={hemiDeputies} parties={partyMeta} />
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:px-6">
          <DeputiesExplorer parties={parties} />
          <p className="mt-10 text-xs text-zinc-500">
            Fonte: Assembleia Nacional — Mesa (17 nov 2025); deputados por partido e círculo (25 jun
            2026). Fotografias: parlamento.ao.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatCard({ n, label }: { n: number | string; label: string }) {
  return (
    <div className="rounded-2xl bg-[#161618] p-4 ring-1 ring-white/10">
      <p className="text-3xl font-bold tabular-nums text-white">{n}</p>
      <p className="mt-1 text-[12px] leading-snug text-zinc-500">{label}</p>
    </div>
  );
}
