import Link from "next/link";

type Props = {
  title?: string;
  subtitle?: string;
  href?: string;
  daysLeft?: number | null;
  badge?: string;
  stepsDone?: number;
  stepsTotal?: number;
};

export function SpecialBanner({
  title = "Orçamento Geral do Estado",
  subtitle = "Dados oficiais em expansão · Agora: especial",
  href = "/orcamento",
  daysLeft = null,
  badge = "OGE",
  stepsDone = 1,
  stepsTotal = 5,
}: Props) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 bg-banner px-4 py-3 text-black sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6"
    >
      <div className="flex min-w-0 items-start gap-3 sm:items-center">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-[11px] font-bold tracking-wide text-banner">
          {badge}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold">{title}</p>
          <p className="truncate text-sm text-black/70">{subtitle}</p>
        </div>
      </div>

      <div className="hidden items-center gap-1.5 md:flex">
        {Array.from({ length: stepsTotal }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-8 rounded-full ${i < stepsDone ? "bg-black" : "bg-black/20"}`}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        {typeof daysLeft === "number" && (
          <span className="rounded-xl bg-black px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white">
            Faltam {daysLeft} dias
          </span>
        )}
        <span className="text-sm font-semibold">Acompanhar →</span>
      </div>
    </Link>
  );
}
