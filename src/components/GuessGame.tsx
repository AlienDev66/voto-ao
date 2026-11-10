"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Party = { id: string; slug: string; name: string; color: string; seats: number };
type Position = { partyId: string; stance: string };
type GameVote = {
  id: string;
  date: string;
  stage: string;
  result: string;
  votesFor: number;
  votesAgainst: number;
  abstentions: number;
  proposal: { slug: string; plainTitle: string; plainSummary: string | null };
  positions: Position[];
};

const STANCES = [
  { value: "a_favor", label: "A favor" },
  { value: "abstencao", label: "Abstenção" },
  { value: "contra", label: "Contra" },
] as const;

export function GuessGame({ parties, vote }: { parties: Party[]; vote: GameVote | null }) {
  const playable = useMemo(() => {
    if (!vote) return false;
    return vote.positions.some((p) => p.stance !== "desconhecido");
  }, [vote]);

  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);

  if (!vote) {
    return (
      <Empty
        title="Ainda sem votação para o jogo"
        body="Quando houver votações com posição por partido em fonte oficial, o desafio diário aparece aqui."
      />
    );
  }

  if (!playable) {
    return (
      <div className="space-y-6">
        <article className="rounded-3xl border border-border bg-card p-6">
          <p className="text-xs text-muted">{vote.stage}</p>
          <h2 className="mt-2 text-2xl font-semibold">{vote.proposal.plainTitle}</h2>
          {vote.proposal.plainSummary && (
            <p className="mt-3 text-muted">{vote.proposal.plainSummary}</p>
          )}
          <p className="mt-4 text-sm text-muted">
            Resultado agregado: {vote.votesFor} a favor · {vote.abstentions} abst. · {vote.votesAgainst}{" "}
            contra — mas a fonte não indica o voto de cada partido. O jogo completo precisa dessa
            informação.
          </p>
          <Link href={`/propostas/${vote.proposal.slug}`} className="mt-4 inline-block text-accent hover:underline">
            Ver proposta →
          </Link>
        </article>
      </div>
    );
  }

  const known = vote.positions.filter((p) => p.stance !== "desconhecido");
  const score = known.reduce((n, p) => n + (guesses[p.partyId] === p.stance ? 1 : 0), 0);

  return (
    <div className="space-y-6">
      <article className="rounded-3xl border border-border bg-card p-6">
        <p className="text-xs text-muted">Adivinha o voto</p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{vote.proposal.plainTitle}</h2>
        {vote.proposal.plainSummary && <p className="mt-3 text-muted">{vote.proposal.plainSummary}</p>}
      </article>

      <div className="space-y-3">
        {parties.map((party) => {
          const real = vote.positions.find((p) => p.partyId === party.id)?.stance ?? "desconhecido";
          if (real === "desconhecido") return null;
          return (
            <div key={party.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: party.color }} />
                <span className="font-medium">
                  {party.name}{" "}
                  <span className="text-muted">{party.seats} dep.</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {STANCES.map((s) => {
                  const selected = guesses[party.id] === s.value;
                  const correct = revealed && real === s.value;
                  const wrong = revealed && selected && real !== s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      disabled={revealed}
                      onClick={() => setGuesses((g) => ({ ...g, [party.id]: s.value }))}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        correct
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                          : wrong
                            ? "border-rose-500 bg-rose-500/20 text-rose-300"
                            : selected
                              ? "border-accent bg-accent text-black"
                              : "border-border text-muted hover:text-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black"
        >
          Ver resultado
        </button>
      ) : (
        <div className="rounded-3xl border border-border bg-card p-5">
          <p className="text-2xl font-semibold">
            {score}/{known.length} certos
          </p>
          <Link href={`/propostas/${vote.proposal.slug}`} className="mt-2 inline-block text-accent hover:underline">
            Abrir a proposta →
          </Link>
        </div>
      )}
    </div>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <p className="text-xl font-semibold">{title}</p>
      <p className="mt-2 text-muted">{body}</p>
      <Link href="/votacoes" className="mt-4 inline-block text-accent hover:underline">
        Ver votações →
      </Link>
    </div>
  );
}
