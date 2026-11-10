export const metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">Contacto</h1>
      <p className="mt-3 text-lg text-muted">
        Encontrou um erro num resumo, num tema ou numa votação, ou tem uma sugestão?
      </p>
      <div className="mt-8 rounded-3xl border border-border bg-card p-6">
        <p className="text-sm text-muted">Email do projecto</p>
        <p className="mt-2 text-2xl font-semibold">contacto@votoao.ao</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Indique a página (o endereço) e o que está errado. Lemos todas as mensagens. O VotoAO é
          independente e apartidário.
        </p>
      </div>
    </div>
  );
}
