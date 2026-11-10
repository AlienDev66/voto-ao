import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="22" r="3.2" fill="#f5c518" />
        <path
          d="M6 18c4.5-6 15.5-6 20 0"
          fill="none"
          stroke={dark ? "#111" : "#f4f4f5"}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M8.5 13.5c3.8-4.8 11.2-4.8 15 0"
          fill="none"
          stroke={dark ? "#111" : "#f4f4f5"}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M11 9.5c2.6-3 7.4-3 10 0"
          fill="none"
          stroke={dark ? "#111" : "#f4f4f5"}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <span className={`text-[17px] font-semibold tracking-tight ${dark ? "text-header-fg" : "text-foreground"}`}>
        VotoAO
      </span>
    </Link>
  );
}
