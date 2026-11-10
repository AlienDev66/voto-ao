type PartySeg = {
  name: string;
  color: string;
  seats: number;
  stance: string;
};

type Props = {
  votesFor: number;
  votesAgainst: number;
  abstentions: number;
  positions?: PartySeg[];
  light?: boolean;
};

export function VoteResultBars({
  votesFor,
  votesAgainst,
  abstentions,
  positions = [],
  light = false,
}: Props) {
  const total = Math.max(votesFor + votesAgainst + abstentions, 1);
  const favor = positions.filter((p) => p.stance === "a_favor");
  const against = positions.filter((p) => p.stance === "contra");
  const abstain = positions.filter((p) => p.stance === "abstencao");
  const hasPositions = favor.length + against.length + abstain.length > 0;

  const muted = light ? "text-zinc-500" : "text-muted";
  const strong = light ? "text-black" : "text-foreground";

  return (
    <div className="space-y-2.5">
      <div className={`flex items-end justify-between gap-3 text-sm ${muted}`}>
        <div>
          <span className={`text-2xl font-bold tabular-nums ${strong}`}>{votesFor}</span>{" "}
          <span>a favor</span>
        </div>
        <div className="text-center text-xs">
          {abstentions > 0 && (
            <>
              <span className={`font-semibold ${strong}`}>{abstentions}</span> abst.
            </>
          )}
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold tabular-nums ${strong}`}>{votesAgainst}</span>{" "}
          <span>contra</span>
        </div>
      </div>

      <div className={`flex h-2.5 overflow-hidden rounded-full ${light ? "bg-zinc-100" : "bg-zinc-800"}`}>
        {hasPositions ? (
          <>
            {favor.map((p) => (
              <div
                key={`f-${p.name}`}
                title={`${p.name} a favor`}
                style={{ width: `${(p.seats / total) * 100}%`, background: p.color }}
              />
            ))}
            {abstain.map((p) => (
              <div
                key={`a-${p.name}`}
                title={`${p.name} abstenção`}
                style={{ width: `${(p.seats / total) * 100}%`, background: p.color, opacity: 0.45 }}
              />
            ))}
            {against.map((p) => (
              <div
                key={`c-${p.name}`}
                title={`${p.name} contra`}
                style={{ width: `${(p.seats / total) * 100}%`, background: p.color }}
              />
            ))}
          </>
        ) : (
          <>
            <div className="bg-emerald-500" style={{ width: `${(votesFor / total) * 100}%` }} />
            <div className="bg-zinc-400" style={{ width: `${(abstentions / total) * 100}%` }} />
            <div className="bg-rose-500" style={{ width: `${(votesAgainst / total) * 100}%` }} />
          </>
        )}
      </div>

      {hasPositions && (
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1">
            {favor.map((p) => (
              <PartyTag key={`tf-${p.name}`} name={p.name} color={p.color} />
            ))}
          </div>
          <div className="flex flex-wrap justify-end gap-1">
            {against.map((p) => (
              <PartyTag key={`tc-${p.name}`} name={p.name} color={p.color} />
            ))}
          </div>
        </div>
      )}

      {abstain.length > 0 && (
        <p className={`text-xs ${muted}`}>
          Abstenção: {abstain.map((p) => p.name).join(", ")}
        </p>
      )}
    </div>
  );
}

function PartyTag({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white"
      style={{ background: color }}
    >
      {name}
    </span>
  );
}
