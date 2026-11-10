# VotoAO

Plataforma independente e apartidária que explica a Assembleia Nacional de Angola em linguagem simples: composição, partidos, deputados e votações com **fonte oficial**.

Inspirada na estrutura do [votoavoto.pt](https://votoavoto.pt), com identidade própria.

## Arranque rápido

```bash
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- SQLite + Prisma
- Seed a partir de listas oficiais da Assembleia Nacional

## Fontes oficiais

| Dado | Fonte |
|------|--------|
| 220 deputados por partido | [Relação Nominal por Partido (17 nov 2025)](https://portaladmin.parlamento.ao/storage/dropzone/image/2025_11_17/20251117_140611_DEPUTADOS%20POR%20PARTIDO.pdf) |
| Composição / Mesa / V Legislatura | [Historia V Legislatura](https://parlamento.ao/Historia_V_Legislatura) |
| Resultados eleitorais 2022 | [CNE](https://resultados2022eleicoesgerais.cne.ao/) |
| Votações | Notícias/comunicados da [Assembleia Nacional](https://www.parlamento.ao/) |

**Regra:** só entra no site o que tiver URL oficial citável. Ver `/metodologia`.

## Actualizar dados

1. Edita ou acrescenta registos em `data/seed/deputies.ts` e `prisma/seed.ts` (propostas/votações).
2. Corre `pnpm db:seed` (recria o conteúdo seed).
3. Para alterações de schema: `pnpm db:push` (dev) ou `pnpm db:migrate`.

### Pipeline de ingestão (notícias + Diários / PDFs)

```bash
pnpm ingest                 # crawl → fetch → parse → publish
pnpm ingest:import-text     # importa capturas locais em data/archive/text/*.json
pnpm ingest:parse
pnpm ingest:publish
```

- Catálogo: `data/ingest/catalog.json`
- Arquivo: `data/archive/`
- UI: `/arquivo` (documentos + extracções) → votações publicadas em `/votacoes`
- Posição partido a partido fica `desconhecido` quando a fonte só traz totais

Para novas votações manuais: cria `Proposal` + `Vote` com `sourceUrl` e `sourceLabel`.

## Páginas (paridade com votoavoto.pt)

- `/` — banner especial, hero rotativo, hemiciclo interactivo
- `/votacoes`, `/temas`, `/partidos`, `/deputados`
- `/governo`, `/orcamento`, `/jogo`, `/pesquisar`, `/contacto`
- `/agenda`, `/glossario`, `/metodologia`

## Neutralidade

O VotoAO descreve factos oficiais. Não recomenda voto. Cores de partido servem só para identificação.

## Limites (Angola)

Não existe (ainda) um feed aberto equivalente ao da Assembleia da República portuguesa. A composição está completa; as votações começam **curadas**. Círculos e comissões serão preenchidos a partir dos PDFs oficiais.
