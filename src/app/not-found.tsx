import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <p className="text-muted">Esse conteúdo ainda não existe no VotoAO.</p>
      <Link href="/" className="inline-block text-accent hover:underline">
        Voltar ao início
      </Link>
    </div>
  );
}
