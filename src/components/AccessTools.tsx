"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  title: string;
  summary: string;
  /** Texto longo para ler em voz alta */
  speakText?: string;
  path?: string;
};

export function AccessTools({ title, summary, speakText, path }: Props) {
  const [easy, setEasy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [langHint, setLangHint] = useState<"pt" | "umb" | "kmb" | "kgk">("pt");

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return path ? `https://votoao.ao${path}` : "";
    return window.location.href;
  }, [path]);

  const waHref = useMemo(() => {
    const text = `${title}\n\n${summary}\n\n${shareUrl || ""}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [title, summary, shareUrl]);

  useEffect(() => {
    document.documentElement.dataset.easy = easy ? "1" : "0";
    return () => {
      delete document.documentElement.dataset.easy;
    };
  }, [easy]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function toggleSpeak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = speakText || `${title}. ${summary}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "pt-PT";
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }

  const langNote =
    langHint === "pt"
      ? "Texto em português simples."
      : langHint === "umb"
        ? "Umbundu: resumo curto ainda em preparação — o áudio e o WhatsApp já funcionam em português."
        : langHint === "kmb"
          ? "Kimbundu: resumo curto ainda em preparação — o áudio e o WhatsApp já funcionam em português."
          : "Kikongo: resumo curto ainda em preparação — o áudio e o WhatsApp já funcionam em português.";

  return (
    <div className="soft-card overflow-hidden">
      <div className="border-b border-zinc-100 bg-gradient-to-r from-amber-50 to-white px-4 py-3 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          Acesso fácil
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          Feito para telemóvel, pouca literacia digital e partilha no WhatsApp.
        </p>
      </div>
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:p-5">
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-sm"
        >
          <WaIcon /> Partilhar no WhatsApp
        </a>
        <button
          type="button"
          onClick={toggleSpeak}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-bold text-white"
        >
          {speaking ? "Parar áudio" : "Ouvir em português"}
        </button>
        <button
          type="button"
          onClick={() => setEasy((v) => !v)}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ring-1 ${
            easy
              ? "bg-accent text-black ring-black/10"
              : "bg-white text-black ring-zinc-200"
          }`}
        >
          {easy ? "Modo simples: ligado" : "Modo simples"}
        </button>
      </div>
      <div className="border-t border-zinc-100 px-4 py-3 sm:px-5">
        <p className="text-xs font-semibold text-zinc-500">Língua do resumo</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["pt", "Português"],
              ["umb", "Umbundu"],
              ["kmb", "Kimbundu"],
              ["kgk", "Kikongo"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setLangHint(id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                langHint === id ? "bg-black text-white" : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">{langNote}</p>
        {easy && (
          <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm leading-relaxed text-zinc-800">
            <strong className="font-bold">Em 1 minuto:</strong> {summary}
          </p>
        )}
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.1 17.6L2 22l4.5-1.2A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.7.7.7-2.6-.2-.3A9 9 0 1 1 12 20.5zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.7-2.7-1.3-3.7-2.9-.3-.4.3-.4.8-1.4.1-.2 0-.4-.1-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.5-1 2.4 0 1.4 1 2.8 1.1 3 .2.2 2.1 3.3 5.1 4.5 1.9.8 2.3.7 3.1.6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.2-.6-.3z" />
    </svg>
  );
}
