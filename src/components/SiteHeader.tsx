"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { href: "/votacoes", label: "Votações" },
  { href: "/temas", label: "Temas" },
  { href: "/partidos", label: "Partidos" },
  { href: "/deputados", label: "Deputados" },
  { href: "/governo", label: "Governo" },
  { href: "/comparador", label: "Comparador" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/orcamento", label: "Orçamento", special: true },
];

const menuItems = [
  { href: "/votacoes", label: "Votações", desc: "Todas, da mais recente à mais antiga" },
  { href: "/temas", label: "Temas", desc: "Do orçamento à justiça, o que se vota" },
  { href: "/partidos", label: "Partidos", desc: "Como vota cada um, voto a voto" },
  { href: "/deputados", label: "Deputados", desc: "Os 220, um a um" },
  { href: "/governo", label: "Governo", desc: "Quem manda em cada ministério" },
  { href: "/comparador", label: "Comparador", desc: "Por tema, em frases curtas" },
  {
    href: "/transparencia",
    label: "Transparência",
    desc: "O que fazem e quanto ganham — deputados e Presidente",
  },
  { href: "/orcamento", label: "Orçamento", desc: "Números na tua vida" },
  { href: "/execucao", label: "Execução", desc: "O dinheiro saiu do papel?" },
  { href: "/lacunas", label: "Lacunas", desc: "O que o Estado ainda não publica" },
  { href: "/arquivo", label: "Arquivo oficial", desc: "PDFs e notícias ingeridos automaticamente" },
  { href: "/jogo", label: "Jogo diário", desc: "Adivinha como votou cada partido" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        window.location.href = "/pesquisar";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white text-header-fg">
        <div className="mx-auto flex h-[58px] max-w-[1200px] items-center gap-4 px-4 lg:px-6">
          <Logo dark />

          <nav className="ml-4 hidden items-center gap-5 text-[14px] font-medium text-zinc-700 xl:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 transition-colors hover:text-black ${
                    active ? "text-black" : ""
                  }`}
                >
                  {item.special && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/pesquisar"
              className="hidden h-10 items-center gap-2 rounded-full bg-zinc-100 px-3 text-sm text-zinc-500 transition hover:bg-zinc-200 sm:inline-flex"
            >
              <SearchIcon />
              <span className="pr-6">Pesquisar propostas...</span>
              <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-[11px] text-zinc-500">
                /
              </kbd>
            </Link>
            <Link
              href="/pesquisar"
              aria-label="Pesquisar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 sm:hidden"
            >
              <SearchIcon />
            </Link>
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 xl:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-[#0c0c0e]/98 pt-[58px] text-white backdrop-blur xl:hidden">
          <div className="mx-auto flex h-full max-w-6xl flex-col px-4 pb-10 pt-6">
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 hover:bg-white/5"
                >
                  <div className="text-xl font-semibold tracking-tight">{item.label}</div>
                  <div className="text-sm text-zinc-400">{item.desc}</div>
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-5 text-sm text-zinc-400">
              <Link href="/metodologia" onClick={() => setOpen(false)}>
                Metodologia
              </Link>
              <Link href="/glossario" onClick={() => setOpen(false)}>
                Glossário
              </Link>
              <Link href="/contacto" onClick={() => setOpen(false)}>
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
