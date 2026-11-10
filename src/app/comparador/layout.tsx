import type { Metadata } from "next";

export const metadata: Metadata = { title: "Comparador de partidos" };

export default function ComparadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
