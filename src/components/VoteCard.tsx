import Link from "next/link";
import { formatDate } from "@/lib/format";
import { VoteResultBars } from "./VoteResultBars";

type Theme = { name: string };
type Party = { name: string; color: string; seats: number };
type Position = { stance: string; party: Party };

type Props = {
  href: string;
  date: Date;
  stage: string;
  result: string;
  title: string;
  officialRef?: string;
  authorParty?: { name: string; color: string } | null;
  authorLabel?: string | null;
  themes?: Theme[];
  votesFor: number;
  votesAgainst: number;
  abstentions: number;
  positions?: Position[];
};

export function VoteCard({
  href,
  date,
  stage,
  result,
  title,
  officialRef,
  authorParty,
  authorLabel,
  themes = [],
  votesFor,
  votesAgainst,
  abstentions,
  positions = [],
}: Props) {
  const approved = result === "aprovada";

  return (
    <Link href={href} className="soft-card flex h-full flex-col p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 text-[13px] leading-snug text-zinc-500">
          <p>
            {formatDate(date)} · {stage}
          </p>
          {officialRef && <p className="mt-0.5 truncate">{officialRef}</p>}
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
            approved ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}
        >
          {approved ? <CheckIcon /> : <XIcon />}
          {approved ? "Aprovada" : "Rejeitada"}
        </span>
      </div>

      <h3 className="mb-3 line-clamp-3 text-[1.05rem] font-bold leading-snug tracking-tight text-black">
        {title}
      </h3>

      <p className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-zinc-500">
        {(authorParty || authorLabel) && (
          <span className="inline-flex items-center gap-1.5">
            {authorParty && (
              <span className="h-2 w-2 rounded-full" style={{ background: authorParty.color }} />
            )}
            Proposta {authorParty ? `do ${authorParty.name}` : `de ${authorLabel}`}
          </span>
        )}
        {themes[0] && (
          <>
            <span className="text-zinc-300">·</span>
            <span>{themes[0].name}</span>
          </>
        )}
      </p>

      <div className="mt-auto">
        <VoteResultBars
          light
          votesFor={votesFor}
          votesAgainst={votesAgainst}
          abstentions={abstentions}
          positions={positions.map((p) => ({
            name: p.party.name,
            color: p.party.color,
            seats: p.party.seats,
            stance: p.stance,
          }))}
        />
      </div>
    </Link>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
