import { PrismaClient } from "@prisma/client";
import { DEPUTIES, PARTIES } from "../data/seed/deputies";

const prisma = new PrismaClient();

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  await prisma.votePosition.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.proposalTheme.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.committeeMembership.deleteMany();
  await prisma.committee.deleteMany();
  await prisma.deputy.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.agendaItem.deleteMany();
  await prisma.glossaryTerm.deleteMany();
  await prisma.party.deleteMany();

  const partyIds: Record<string, string> = {};

  for (const party of PARTIES) {
    const created = await prisma.party.create({
      data: {
        slug: party.slug,
        name: party.name,
        fullName: party.fullName,
        seats: party.seats,
        color: party.color,
        kind: party.kind,
        sortOrder: party.sortOrder,
        logoUrl: party.logoUrl ?? null,
      },
    });
    partyIds[party.slug] = created.id;
  }

  const usedSlugs = new Set<string>();
  for (const d of DEPUTIES) {
    let slug = slugify(d.fullName);
    if (usedSlugs.has(slug)) slug = `${slug}-${d.partySlug}`;
    usedSlugs.add(slug);
    await prisma.deputy.create({
      data: {
        slug,
        fullName: d.fullName,
        partyId: partyIds[d.partySlug],
        inOffice: true,
        electoralCircle: d.electoralCircle ?? null,
        mesaRole: d.mesaRole ?? null,
        gender: d.gender ?? null,
        photoUrl: d.photoUrl ?? null,
      },
    });
  }

  const themes = [
    { slug: "direitos-e-protecao-de-dados", name: "Direitos e protecção de dados" },
    { slug: "partidos-e-eleicoes", name: "Partidos e eleições" },
    { slug: "orcamento-e-financas", name: "Orçamento e finanças" },
    { slug: "justica-e-seguranca", name: "Justiça e segurança" },
    { slug: "parlamento-e-transparencia", name: "Parlamento e transparência" },
  ];
  const themeIds: Record<string, string> = {};
  for (const t of themes) {
    const created = await prisma.theme.create({ data: t });
    themeIds[t.slug] = created.id;
  }

  // Fontes oficiais: Assembleia Nacional (notícias) + composição CNE / Historia V Legislatura
  const p1 = await prisma.proposal.create({
    data: {
      slug: "alteracao-lei-proteccao-dados-pessoais",
      officialTitle:
        "Projecto de Lei de alteração à Lei n.º 22/11, de 17 de Junho — Lei da Protecção de Dados Pessoais",
      plainTitle: "Alteração à lei da protecção de dados pessoais",
      plainSummary:
        "Iniciativa do Grupo Parlamentar da UNITA. Os autores defendiam aumentar o acesso dos cidadãos e dos partidos políticos a dados pessoais de natureza eleitoral, com garantias de autenticidade e fiabilidade. O Plenário rejeitou o projecto.",
      status: "rejeitada",
      authorPartyId: partyIds.unita,
      authorLabel: "Grupo Parlamentar da UNITA",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional — Notícia (25 jun)",
      themes: {
        create: [
          { themeId: themeIds["direitos-e-protecao-de-dados"] },
          { themeId: themeIds["partidos-e-eleicoes"] },
        ],
      },
    },
  });

  await prisma.vote.create({
    data: {
      proposalId: p1.id,
      date: new Date("2024-06-25"),
      stage: "Plenário",
      votesFor: 75,
      votesAgainst: 95,
      abstentions: 1,
      result: "rejeitada",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional — Notícia (25 jun)",
      positions: {
        create: [
          { partyId: partyIds.unita, stance: "desconhecido" },
          { partyId: partyIds.mpla, stance: "desconhecido" },
          { partyId: partyIds.prs, stance: "desconhecido" },
          { partyId: partyIds.fnla, stance: "desconhecido" },
          { partyId: partyIds.pha, stance: "desconhecido" },
        ],
      },
    },
  });

  const p2 = await prisma.proposal.create({
    data: {
      slug: "alteracao-lei-financiamento-partidos",
      officialTitle: "Projecto de Lei de alteração à Lei do Financiamento aos Partidos Políticos",
      plainTitle: "Alteração à lei do financiamento dos partidos políticos",
      plainSummary:
        "Iniciativa do Grupo Parlamentar da UNITA. Os autores defendiam tornar o financiamento aos partidos mais justo e equitativo. O Plenário rejeitou o projecto.",
      status: "rejeitada",
      authorPartyId: partyIds.unita,
      authorLabel: "Grupo Parlamentar da UNITA",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional — Notícia (25 jun)",
      themes: {
        create: [{ themeId: themeIds["partidos-e-eleicoes"] }],
      },
    },
  });

  await prisma.vote.create({
    data: {
      proposalId: p2.id,
      date: new Date("2024-06-25"),
      stage: "Plenário",
      votesFor: 70,
      votesAgainst: 95,
      abstentions: 1,
      result: "rejeitada",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional — Notícia (25 jun)",
      positions: {
        create: [
          { partyId: partyIds.unita, stance: "desconhecido" },
          { partyId: partyIds.mpla, stance: "desconhecido" },
          { partyId: partyIds.prs, stance: "desconhecido" },
          { partyId: partyIds.fnla, stance: "desconhecido" },
          { partyId: partyIds.pha, stance: "desconhecido" },
        ],
      },
    },
  });

  const p3 = await prisma.proposal.create({
    data: {
      slug: "composicao-v-legislatura-2022",
      officialTitle: "Constituição da V Legislatura da Assembleia Nacional (2022–2027)",
      plainTitle: "Como ficou a Assembleia depois das eleições de 2022",
      plainSummary:
        "Nas eleições gerais de 24 de Agosto de 2022, a Assembleia Nacional ficou com 220 deputados: MPLA 124, UNITA 90, PRS 2, FNLA 2 e PHA 2. A 1.ª Reunião Constitutiva realizou-se a 16 de Setembro de 2022.",
      status: "publicada",
      authorLabel: "Resultado eleitoral / Constituição da legislatura",
      sourceUrl: "https://parlamento.ao/Historia_V_Legislatura",
      sourceLabel: "Assembleia Nacional — V Legislatura",
      themes: {
        create: [
          { themeId: themeIds["partidos-e-eleicoes"] },
          { themeId: themeIds["parlamento-e-transparencia"] },
        ],
      },
    },
  });

  await prisma.vote.create({
    data: {
      proposalId: p3.id,
      date: new Date("2022-08-24"),
      stage: "Eleição / constituição",
      votesFor: 220,
      votesAgainst: 0,
      abstentions: 0,
      result: "aprovada",
      sourceUrl: "https://resultados2022eleicoesgerais.cne.ao/",
      sourceLabel: "CNE — Resultados 2022",
      positions: {
        create: [
          // Resultado eleitoral global — sem «voto parlamentar» partido a partido nesta ficha
          { partyId: partyIds.mpla, stance: "desconhecido" },
          { partyId: partyIds.unita, stance: "desconhecido" },
          { partyId: partyIds.prs, stance: "desconhecido" },
          { partyId: partyIds.fnla, stance: "desconhecido" },
          { partyId: partyIds.pha, stance: "desconhecido" },
        ],
      },
    },
  });

  await prisma.committee.createMany({
    data: [
      { slug: "mesa-da-assembleia", name: "Mesa da Assembleia Nacional" },
      {
        slug: "comissao-assuntos-constitucionais-juridicos",
        name: "Comissão de Assuntos Constitucionais e Jurídicos",
      },
      {
        slug: "comissao-economia-financas",
        name: "Comissão de Economia e Finanças",
      },
    ],
  });

  await prisma.agendaItem.create({
    data: {
      date: new Date("2022-09-16"),
      title: "1.ª Reunião Constitutiva da V Legislatura",
      description:
        "Prestação de juramento dos deputados eleitos e aprovação da constituição da Mesa da Assembleia Nacional.",
      sourceUrl: "https://parlamento.ao/Historia_V_Legislatura",
      sourceLabel: "Assembleia Nacional — V Legislatura",
    },
  });

  const glossary = [
    {
      slug: "assembleia-nacional",
      term: "Assembleia Nacional",
      definition:
        "Órgão legislativo unicameral da República de Angola, composto por 220 deputados eleitos.",
    },
    {
      slug: "grupo-parlamentar",
      term: "Grupo parlamentar",
      definition:
        "Organização dos deputados de um partido com representação suficiente para formar grupo. Na V Legislatura: MPLA e UNITA.",
    },
    {
      slug: "representacao-parlamentar",
      term: "Representação parlamentar",
      definition:
        "Forma de organização dos partidos com menor número de deputados. Na V Legislatura: PRS, FNLA e PHA.",
    },
    {
      slug: "plenario",
      term: "Plenário",
      definition: "Reunião de todos os deputados para debate e votação de iniciativas.",
    },
    {
      slug: "iniciativa-legislativa",
      term: "Iniciativa legislativa",
      definition:
        "Proposta ou projecto apresentado para se tornar lei, segundo as regras do processo legislativo.",
    },
    {
      slug: "v-legislatura",
      term: "V Legislatura",
      definition: "Legislatura em curso (2022–2027), iniciada após as eleições gerais de 24 de Agosto de 2022.",
    },
  ];
  for (const g of glossary) {
    await prisma.glossaryTerm.create({ data: g });
  }

  const counts = await prisma.deputy.groupBy({
    by: ["partyId"],
    _count: true,
  });
  console.log("Seed OK");
  console.log("Partidos:", await prisma.party.count());
  console.log("Deputados:", await prisma.deputy.count());
  console.log("Por partido:", counts);
  console.log("Propostas:", await prisma.proposal.count());
  console.log("Votações:", await prisma.vote.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
