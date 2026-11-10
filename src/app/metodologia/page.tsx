import Link from "next/link";

export const metadata = { title: "Metodologia" };

export default function MetodologiaPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Metodologia</h1>
        <p className="mt-3 text-lg text-muted">
          Como o VotoAO obtém, verifica e apresenta a composição e as votações da Assembleia
          Nacional.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">De onde vêm os dados</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>Listas nominais e composição: Assembleia Nacional (PDFs e páginas oficiais).</li>
          <li>Resultados eleitorais 2022: CNE.</li>
          <li>
            Votações: notícias do plenário e Diário da Assembleia Nacional (I/II Série), via pipeline
            automático de ingestão — ver{" "}
            <Link href="/arquivo" className="text-accent hover:underline">
              arquivo oficial
            </Link>
            .
          </li>
          <li>Governo: páginas oficiais do Executivo, quando citáveis.</li>
          <li>
            Remunerações e regalias (página{" "}
            <Link href="/transparencia" className="text-accent hover:underline">
              Transparência
            </Link>
            ): Diário da República / resoluções da AN (ex.: Res. 15/26, Lei 6/08, Lei 17/12),
            tabela da Função Executiva 2026, Lei 14/94, Constituição; cálculos de imprensa só
            quando identificados como tal; lacunas oficiais ficam explícitas.
          </li>
          <li>
            OGE «na vida»: proposta SIGFE ÷ população do Censo 2024 (INE). Ilustrativo — não é
            transferência directa.
          </li>
          <li>
            Execução: REOGE oficiais do MinFin (totais trimestrais). Obras/contratos: apontamos o
            que falta em{" "}
            <Link href="/lacunas" className="text-accent hover:underline">
              Lacunas
            </Link>
            .
          </li>
          <li>
            Comparador: frases curtas; quando o voto nominal não é público, marcamos «não
            publicado» em vez de inventar.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Pipeline automático</h2>
        <p className="leading-relaxed text-muted">
          O VotoAO descobre URLs oficiais (notícias e Diários), arquiva o conteúdo, extrai totais de
          votação («X a favor / Y contra / Z abstenções») e propõe fichas. A posição partido a
          partido só é preenchida quando a fonte a indica; caso contrário fica «desconhecido».
          Extracções com confiança insuficiente ficam em revisão e não inventamos votos.
        </p>
        <p className="text-sm text-muted">
          Operação local: <code className="text-black">pnpm ingest</code> (crawl → fetch → parse →
          publish).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Interatividade</h2>
        <p className="leading-relaxed text-muted">
          O site espelha a experiência do Voto a Voto (menu, hemiciclo, pesquisa, jogo, especial
          orçamento). Secções sem dados oficiais suficientes mostram UI completa com estado
          explícito «em construção / fonte em falta» — nunca inventamos votos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Neutralidade</h2>
        <p className="leading-relaxed text-muted">
          Independente e apartidário. Cores e logótipos servem só para identificar partidos. Não faz
          recomendações de voto.
        </p>
      </section>

      <p className="text-sm text-muted">
        Ver também o{" "}
        <Link href="/glossario" className="text-accent hover:underline">
          glossário
        </Link>{" "}
        e o{" "}
        <Link href="/contacto" className="text-accent hover:underline">
          contacto
        </Link>
        .
      </p>
    </div>
  );
}
