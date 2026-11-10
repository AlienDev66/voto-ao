import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-black">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 lg:grid-cols-3 lg:px-6">
        <div>
          <p className="text-lg font-bold tracking-tight">VotoAO</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
            Como votam os partidos na Assembleia Nacional de Angola, proposta a proposta. Em
            linguagem simples e sem tomar partido.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Explorar</p>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>
              <Link href="/votacoes" className="hover:text-black">
                Votações
              </Link>
            </li>
            <li>
              <Link href="/partidos" className="hover:text-black">
                Partidos
              </Link>
            </li>
            <li>
              <Link href="/deputados" className="hover:text-black">
                Deputados
              </Link>
            </li>
            <li>
              <Link href="/governo" className="hover:text-black">
                Governo
              </Link>
            </li>
            <li>
              <Link href="/comparador" className="hover:text-black">
                Comparador
              </Link>
            </li>
            <li>
              <Link href="/transparencia" className="hover:text-black">
                Transparência
              </Link>
            </li>
            <li>
              <Link href="/orcamento" className="hover:text-black">
                Orçamento
              </Link>
            </li>
            <li>
              <Link href="/execucao" className="hover:text-black">
                Execução
              </Link>
            </li>
            <li>
              <Link href="/lacunas" className="hover:text-black">
                Lacunas
              </Link>
            </li>
            <li>
              <Link href="/jogo" className="hover:text-black">
                Jogo diário
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Sobre os dados</p>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>
              <Link href="/agenda" className="hover:text-black">
                Agenda do Plenário
              </Link>
            </li>
            <li>
              <Link href="/arquivo" className="hover:text-black">
                Arquivo oficial
              </Link>
            </li>
            <li>
              <Link href="/metodologia" className="hover:text-black">
                Metodologia
              </Link>
            </li>
            <li>
              <Link href="/glossario" className="hover:text-black">
                Glossário
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-black">
                Contacto
              </Link>
            </li>
            <li>
              <a
                href="https://www.parlamento.ao/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                Assembleia Nacional ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 px-4 py-4 text-center text-xs text-zinc-400">
        Fonte: Assembleia Nacional / CNE / Governo. Projeto independente e apartidário.
      </div>
    </footer>
  );
}
