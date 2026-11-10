import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Agenda" };

export default async function AgendaPage() {
  const items = await prisma.agendaItem.findMany({ orderBy: { date: "asc" } });
  const next = items[0];

  return (
    <div>
      <section className="bg-background">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-6 lg:py-16">
          <div>
            <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-[12px] font-bold text-black">
              Agenda do Plenário
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              O que vai a votos
            </h1>
            {next ? (
              <p className="mt-4 text-[17px] leading-relaxed text-zinc-300">
                Próxima sessão:{" "}
                <span className="font-semibold text-accent">{formatDate(next.date)}</span>
              </p>
            ) : (
              <p className="mt-4 text-[17px] leading-relaxed text-zinc-400">
                Ainda sem convocatórias estruturadas nesta base.
              </p>
            )}
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-500">
              Segundo a agenda oficial da Assembleia Nacional. Pode mudar.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-[#161618] p-5 ring-1 ring-white/10">
            <CalendarPreview highlight={next?.date ?? null} />
            <div className="mt-4 flex items-center gap-4 text-[12px] text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white" /> Plenário
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Votações
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="mx-auto max-w-[1200px] space-y-4 px-4 py-14 lg:px-6">
          {items.length === 0 ? (
            <p className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 text-zinc-500">
              Ainda sem convocatórias estruturadas. A UI está pronta para as próximas sessões
              oficiais.
            </p>
          ) : (
            items.map((a) => (
              <article key={a.id} className="soft-card grid gap-5 p-5 sm:grid-cols-[140px_1fr] sm:p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                    {weekdayShort(a.date)}
                  </p>
                  <p className="text-4xl font-bold tabular-nums text-black">{a.date.getDate()}</p>
                  <p className="text-sm text-zinc-500">{monthName(a.date)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                    Em agenda
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-black">{a.title}</h2>
                  {a.description && (
                    <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{a.description}</p>
                  )}
                  {a.sourceUrl && (
                    <p className="mt-4 text-xs text-zinc-500">
                      Fonte:{" "}
                      <a
                        href={a.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-black underline underline-offset-2"
                      >
                        {a.sourceLabel ?? a.sourceUrl}
                      </a>
                    </p>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function CalendarPreview({ highlight }: { highlight: Date | null }) {
  const days = ["S", "T", "Q", "Q", "S", "S", "D"];
  const cells = Array.from({ length: 35 }, (_, i) => i - 2);
  const highlightDay = highlight?.getDate() ?? null;

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-[11px] text-zinc-500">
        {days.map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((offset, i) => {
          const day = offset + 1;
          const valid = day >= 1 && day <= 30;
          const isHighlight = valid && day === highlightDay;
          return (
            <span
              key={i}
              className={`flex h-9 items-center justify-center rounded-lg text-[13px] font-medium ${
                !valid
                  ? "text-transparent"
                  : isHighlight
                    ? "bg-accent text-black"
                    : "bg-white/5 text-zinc-300"
              }`}
            >
              {valid ? day : "·"}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function weekdayShort(date: Date) {
  return date
    .toLocaleDateString("pt-AO", { weekday: "short" })
    .replace(".", "")
    .slice(0, 3)
    .toUpperCase();
}

function monthName(date: Date) {
  return date.toLocaleDateString("pt-AO", { month: "long" });
}
