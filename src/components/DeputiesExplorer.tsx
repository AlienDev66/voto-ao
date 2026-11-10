"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DeputyAvatar } from "./DeputyAvatar";
import { PartyLogo } from "./PartyLogo";

type Party = {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  color: string;
  seats: number;
  logoUrl?: string | null;
  deputies: {
    id: string;
    slug: string;
    fullName: string;
    mesaRole: string | null;
    electoralCircle?: string | null;
    photoUrl?: string | null;
  }[];
};

export function DeputiesExplorer({ parties }: { parties: Party[] }) {
  const [q, setQ] = useState("");
  const [circle, setCircle] = useState("all");

  const circles = useMemo(() => {
    const set = new Set<string>();
    for (const p of parties) {
      for (const d of p.deputies) {
        if (d.electoralCircle) set.add(d.electoralCircle);
      }
    }
    return [...set].sort((a, b) => a.localeCompare(b, "pt"));
  }, [parties]);

  const filteredParties = useMemo(() => {
    const query = q.trim().toLowerCase();
    return parties
      .map((p) => ({
        ...p,
        deputies: p.deputies.filter((d) => {
          if (circle !== "all" && d.electoralCircle !== circle) return false;
          if (!query) return true;
          return (
            d.fullName.toLowerCase().includes(query) ||
            (d.electoralCircle ?? "").toLowerCase().includes(query) ||
            p.name.toLowerCase().includes(query)
          );
        }),
      }))
      .filter((p) => p.deputies.length > 0);
  }, [parties, q, circle]);

  const total = filteredParties.reduce((n, p) => n + p.deputies.length, 0);

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-black">Todos os deputados</h2>
      <p className="mt-2 text-[15px] text-zinc-500">
        Cada nome abre o perfil: votos, iniciativas e comissões quando a fonte existir.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-zinc-600">Procurar</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nome ou círculo eleitoral"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-black outline-none transition focus:border-zinc-400"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-zinc-600">
            Círculo eleitoral
          </span>
          <select
            value={circle}
            onChange={(e) => setCircle(e.target.value)}
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-black outline-none transition focus:border-zinc-400"
          >
            <option value="all">Todos os círculos</option>
            {circles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-3 text-sm text-zinc-500">{total} deputados em funções</p>

      <div className="mt-10 space-y-12">
        {filteredParties.map((p) => (
          <section key={p.id}>
            <div className="mb-4 flex items-center gap-3">
              <PartyLogo name={p.name} color={p.color} logoUrl={p.logoUrl} slug={p.slug} size={36} />
              <span
                className="rounded-md px-2 py-0.5 text-[12px] font-bold text-white"
                style={{ background: p.color }}
              >
                {p.name}
              </span>
              <span className="font-semibold text-black">{p.fullName ?? p.name}</span>
              <span className="ml-auto text-sm font-semibold text-zinc-500">{p.deputies.length}</span>
            </div>
            <div className="h-0.5 w-full" style={{ background: p.color }} />

            <div className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {p.deputies.map((d) => (
                <Link
                  key={d.id}
                  href={`/deputados/${d.slug}`}
                  className="group flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-zinc-100"
                >
                  <DeputyAvatar
                    fullName={d.fullName}
                    color={p.color}
                    photoUrl={d.photoUrl}
                    size={40}
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-black group-hover:underline">
                      {d.fullName}
                    </span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-zinc-500">
                      {d.electoralCircle && <span>{d.electoralCircle}</span>}
                      {d.mesaRole && (
                        <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold text-black">
                          {d.mesaRole}
                        </span>
                      )}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
