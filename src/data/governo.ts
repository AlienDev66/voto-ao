/** Composição do Executivo — fonte: https://governo.gov.ao/ministro (consultado Nov 2026).
 *  Fotos: plataformacipra.gov.ao (mesmo CDN do portal oficial).
 */
export type GovMember = {
  slug: string;
  name: string;
  role: string;
  ministry: string;
  /** Rótulo curto para o organograma */
  shortLabel?: string;
  party?: string;
  since?: string;
  photoUrl?: string;
  sourceUrl: string;
  sourceLabel: string;
};

const CIPRA = "https://plataformacipra.gov.ao/public/ficheiros/entidades";

const SRC = {
  sourceUrl: "https://governo.gov.ao/ministro",
  sourceLabel: "Governo de Angola",
} as const;

export const GOVERNMENT = {
  title: "Executivo da República de Angola",
  subtitle: "Presidência e Governo — quem manda em quê",
  note:
    "Nomes, pastas e fotos segundo governo.gov.ao / CIPRA. Intervenções no Parlamento e propostas do Governo ainda em expansão.",
  members: [
    {
      slug: "presidente-da-republica",
      name: "João Lourenço",
      role: "Presidente da República",
      ministry: "Presidência da República",
      party: "MPLA",
      since: "2017",
      photoUrl: `${CIPRA}/pr.jpg`,
      sourceUrl: "https://governo.gov.ao/biografia/presidência/joão-manuel-gonçalves-lourenço",
      sourceLabel: "Governo de Angola",
    },
    {
      slug: "vice-presidente",
      name: "Esperança da Costa",
      role: "Vice-Presidente da República",
      ministry: "Vice-Presidência",
      party: "MPLA",
      since: "2022",
      photoUrl: `${CIPRA}/551310220939421665697182.jpg`,
      sourceUrl:
        "https://governo.gov.ao/biografia/presidência/esperança-maria-eduardo-francisco-da-costa",
      sourceLabel: "Governo de Angola",
    },
  ] satisfies GovMember[],
  ministries: [
    {
      slug: "defesa-nacional",
      name: "Lúcio Gonçalves Amaral",
      role: "Ministro",
      ministry: "Defesa Nacional e Veteranos da Pátria",
      shortLabel: "Defesa Nacional",
      since: "2026",
      photoUrl: `${CIPRA}/622904260112531777464773.jpg`,
      ...SRC,
    },
    {
      slug: "interior",
      name: "Manuel Gomes da Conceição Homem",
      role: "Ministro",
      ministry: "Interior",
      shortLabel: "Interior",
      since: "2024",
      photoUrl: `${CIPRA}/430511240714291730787269.jpg`,
      ...SRC,
    },
    {
      slug: "relacoes-exteriores",
      name: "Téte António",
      role: "Ministro",
      ministry: "Relações Exteriores",
      shortLabel: "Relações Exteriores",
      since: "2022",
      photoUrl: `${CIPRA}/min_rel.jpg`,
      ...SRC,
    },
    {
      slug: "administracao-territorio",
      name: "Daniel Félix Neto",
      role: "Ministro",
      ministry: "Administração do Território",
      shortLabel: "Adm. do Território",
      since: "2025",
      photoUrl: `${CIPRA}/41411251243561763120636.png`,
      ...SRC,
    },
    {
      slug: "justica",
      name: "Marcy Cláudio Lopes",
      role: "Ministro",
      ministry: "Justiça e dos Direitos Humanos",
      shortLabel: "Justiça e DH",
      since: "2022",
      photoUrl: `${CIPRA}/492209221117251663845445.jpg`,
      ...SRC,
    },
    {
      slug: "financas",
      name: "Vera Esperança dos Santos Daves de Sousa",
      role: "Ministra",
      ministry: "Finanças",
      shortLabel: "Finanças",
      since: "2022",
      photoUrl: `${CIPRA}/352704230328381682605718.jpg`,
      ...SRC,
    },
    {
      slug: "planeamento",
      name: "Victor Hugo Guilherme",
      role: "Ministro",
      ministry: "Planeamento",
      shortLabel: "Planeamento",
      since: "2024",
      photoUrl: `${CIPRA}/992501240719451706163585.png`,
      ...SRC,
    },
    {
      slug: "cultura",
      name: "Filipe Silvino de Pina Zau",
      role: "Ministro",
      ministry: "Cultura",
      shortLabel: "Cultura",
      since: "2024",
      photoUrl: `${CIPRA}/120104240323031711981383.jpg`,
      ...SRC,
    },
    {
      slug: "administracao-publica",
      name: "Teresa Rodrigues Dias",
      role: "Ministra",
      ministry: "Administração Pública, Trabalho e Segurança Social",
      shortLabel: "Adm. Pública",
      since: "2022",
      photoUrl: `${CIPRA}/teresadias.jpg`,
      ...SRC,
    },
    {
      slug: "agricultura",
      name: "Isaac Francisco Maria dos Anjos",
      role: "Ministro",
      ministry: "Agricultura e Florestas",
      shortLabel: "Agricultura",
      since: "2024",
      photoUrl: `${CIPRA}/872011240956281732136188.jpg`,
      ...SRC,
    },
    {
      slug: "pescas",
      name: "Carmen do Sacramento Neto",
      role: "Ministra",
      ministry: "Pescas e Recursos Marinhos",
      shortLabel: "Pescas",
      since: "2022",
      photoUrl: `${CIPRA}/961601240556191705424179.jpg`,
      ...SRC,
    },
    {
      slug: "industria-comercio",
      name: "Rui Miguêns de Oliveira",
      role: "Ministro",
      ministry: "Indústria e Comércio",
      shortLabel: "Indústria e Comércio",
      since: "2023",
      photoUrl: `${CIPRA}/993107240334521722436492.jpeg`,
      ...SRC,
    },
    {
      slug: "recursos-minerais",
      name: "Diamantino Pedro Azevedo",
      role: "Ministro",
      ministry: "Recursos Minerais, Petróleo e Gás",
      shortLabel: "Petróleo e Gás",
      since: "2022",
      photoUrl: `${CIPRA}/diamantinoazevedo.jpg`,
      ...SRC,
    },
    {
      slug: "transportes",
      name: "Ricardo Daniel Sandão Queirós Viegas de Abreu",
      role: "Ministro",
      ministry: "Transportes",
      shortLabel: "Transportes",
      since: "2022",
      photoUrl: `${CIPRA}/ricardoabreu.jpg`,
      ...SRC,
    },
    {
      slug: "energia-aguas",
      name: "João Baptista Borges",
      role: "Ministro",
      ministry: "Energia e Águas",
      shortLabel: "Energia e Águas",
      since: "2020",
      photoUrl: `${CIPRA}/joaoborges.jpg`,
      ...SRC,
    },
    {
      slug: "telecomunicacoes",
      name: "Mário Augusto da Silva Oliveira",
      role: "Ministro",
      ministry: "Telecomunicações, Tecnologias de Informação e Comunicação Social",
      shortLabel: "Telecomunicações",
      since: "2022",
      photoUrl: `${CIPRA}/971809221136481663501008.png`,
      ...SRC,
    },
    {
      slug: "turismo",
      name: "Márcio de Jesus Lopes Daniel",
      role: "Ministro",
      ministry: "Turismo",
      shortLabel: "Turismo",
      since: "2024",
      photoUrl: `${CIPRA}/950104240316401711981000.png`,
      ...SRC,
    },
    {
      slug: "obras-publicas",
      name: "Carlos Alberto Gregório dos Santos",
      role: "Ministro",
      ministry: "Obras Públicas, Urbanismo e Habitação",
      shortLabel: "Obras Públicas",
      since: "2022",
      photoUrl: `${CIPRA}/791601240552191705423939.jpg`,
      ...SRC,
    },
    {
      slug: "ensino-superior",
      name: "Albano Vicente Lopes Ferreira",
      role: "Ministro",
      ministry: "Ensino Superior, Ciência, Tecnologia e Inovação",
      shortLabel: "Ensino Superior",
      since: "2024",
      photoUrl: `${CIPRA}/892211241029381732310978.jpg`,
      ...SRC,
    },
    {
      slug: "educacao",
      name: "Erika Linete Batalha de Carvalho Aires",
      role: "Ministra",
      ministry: "Educação",
      shortLabel: "Educação",
      since: "2026",
      photoUrl: `${CIPRA}/401202260802061770922926.jpg`,
      ...SRC,
    },
    {
      slug: "saude",
      name: "Sílvia Paula Valentim Lutucuta",
      role: "Ministra",
      ministry: "Saúde",
      shortLabel: "Saúde",
      since: "2022",
      photoUrl: `${CIPRA}/silvialutukuta.jpg`,
      ...SRC,
    },
    {
      slug: "accao-social",
      name: "Ana Paula da Silva do Sacramento Neto",
      role: "Ministra",
      ministry: "Acção Social, Família e Promoção da Mulher",
      shortLabel: "Acção Social",
      since: "2022",
      photoUrl: `${CIPRA}/551809221200471663502447.jpg`,
      ...SRC,
    },
    {
      slug: "ambiente",
      name: "Ana Paula Chantre Luna de Carvalho Pereira",
      role: "Ministra",
      ministry: "Ambiente",
      shortLabel: "Ambiente",
      since: "2022",
      photoUrl: `${CIPRA}/270607260428401783351720.jpg`,
      ...SRC,
    },
    {
      slug: "juventude-desportos",
      name: "Rui Luís Falcão Pinto de Andrade",
      role: "Ministro",
      ministry: "Juventude e Desportos",
      shortLabel: "Juventude e Desportos",
      since: "2024",
      photoUrl: `${CIPRA}/381402240246021707918362.jpg`,
      ...SRC,
    },
  ] satisfies GovMember[],
};

export type OgeStep = {
  key: string;
  label: string;
  plainLabel: string;
  done: boolean;
  plainDetail: string;
  dateLabel?: string;
  votes?: { for: number; against: number; abstentions: number };
  sourceUrl?: string;
};

export type OgeFactCard = {
  id: string;
  section: "povo" | "entrada" | "saida" | "aviso";
  title: string;
  value: string;
  share?: string;
  meaning: string;
  detail?: string;
};

/** Ciclo OGE 2026 já concluído — mantido para referência. */
export const OGE_2026 = {
  yearLabel: "OGE 2026",
  amountLabel: "33,24 biliões Kz",
  lawLabel: "Lei n.º 14/25",
  relatedVoteSlug:
    "orcamento-geral-do-estado-para-2026-foi-aprovada-na-globalidade-a-17-de-dezembro",
  sourceUrl: "https://parlamento.ao/Noticia_61693",
  minfinUrl:
    "https://www.minfin.gov.ao/sala-de-imprensa/noticias/noticia/orcamento-geral-do-estado-para-2026-ja-em-vigor",
};

/**
 * Proposta OGE 2027 — números desmistificados a partir dos resumos oficiais
 * do MinFin (SIGFE, emissão 30/10/2026) e notícias oficiais da entrega.
 * Valores em kwanzas; «biliões» = mil milhões (10⁹), como no uso angolano.
 */
export const OGE = {
  title: "Orçamento Geral do Estado",
  yearLabel: "OGE 2027",
  plainIntro:
    "Aqui não vais encontrar PDFs. O Governo já os publica. O VotoAO traduz os números oficiais para português simples: quanto dinheiro entra, para onde vai, e o que isso significa no dia-a-dia.",
  amountLabel: "37,34 biliões Kz",
  amountExact: "37.337.334.889.249 Kz",
  amountPlain:
    "A proposta de 2027 move cerca de 37,34 biliões de kwanzas — o mesmo valor do lado das receitas e do lado das despesas. Ainda é proposta: só vira lei depois do Parlamento e da publicação oficial.",
  lawLabel: "Ainda é proposta (não é lei)",
  facts: [
    {
      id: "total",
      section: "aviso",
      title: "O tamanho da conta",
      value: "37,34 biliões Kz",
      share: "100% da proposta",
      meaning:
        "É o valor total previsto para 2027. Serve de «bolo» para comparar todas as fatias abaixo.",
      detail: "Fonte: resumos SIGFE da proposta, emitidos a 30/10/2026.",
    },
    {
      id: "ainda-proposta",
      section: "aviso",
      title: "Isto ainda pode mudar",
      value: "1 de 5 fases",
      meaning:
        "A proposta já foi entregue ao Parlamento (30 Out.). Os deputados ainda vão debater, podem alterar números, e só depois é que vira lei.",
      detail: "Próximo marco anunciado: debate na generalidade a 12 Nov. 2026.",
    },
    {
      id: "petroleo-partilha",
      section: "entrada",
      title: "Petróleo (partilha de produção)",
      value: "6,13 biliões Kz",
      share: "16,4% das entradas",
      meaning:
        "Parte do petróleo que o Estado recebe directamente dos contratos de partilha. É uma das maiores entradas — quando o petróleo oscila, esta fatia oscila consigo.",
    },
    {
      id: "impostos-petroleo",
      section: "entrada",
      title: "Impostos petrolíferos",
      value: "2,86 biliões Kz",
      share: "7,7% das entradas",
      meaning:
        "Imposto sobre o rendimento do petróleo. Junto com a partilha, o sector petrolífero pesa muito no que o Estado cobra.",
    },
    {
      id: "irt",
      section: "entrada",
      title: "Imposto sobre o trabalho (IRT)",
      value: "1,94 biliões Kz",
      share: "5,2% das entradas",
      meaning:
        "O que é retido dos salários e rendimentos do trabalho. É a fatia mais directa do trabalhador comum no Orçamento.",
    },
    {
      id: "iva",
      section: "entrada",
      title: "IVA (consumo)",
      value: "2,30 biliões Kz",
      share: "6,2% das entradas",
      meaning:
        "Imposto que pagas quando compras bens e serviços. Quanto mais se consome no país, mais esta linha sobe.",
    },
    {
      id: "imposto-industrial",
      section: "entrada",
      title: "Imposto industrial (empresas)",
      value: "2,27 biliões Kz",
      share: "6,1% das entradas",
      meaning:
        "Imposto sobre lucros e retenções das empresas. Mostra quanto o tecido empresarial contribui para a conta pública.",
    },
    {
      id: "financiamento",
      section: "entrada",
      title: "Empréstimos e financiamentos",
      value: "15,48 biliões Kz",
      share: "41,5% das entradas",
      meaning:
        "Quase metade do «bolo» de entradas não é imposto nem petróleo do ano: é dinheiro emprestado (interno 6,24 + externo 9,24). Depois tem de se pagar — por isso a dívida pesa nas despesas.",
      detail: "Receitas de capital / financiamento no resumo oficial de receitas.",
    },
    {
      id: "divida",
      section: "saida",
      title: "Serviço da dívida",
      value: "≈ 16,21 biliões Kz",
      share: "≈ 43% das saídas",
      meaning:
        "Juros (7,49) + amortizações (8,72). Em termos simples: quase 4 em cada 10 kwanzas do Orçamento vão para pagar dívida antiga, não para escolas ou hospitais novos.",
      detail:
        "Nos resumos por função, «Encargos financeiros» aparecem com 16,39 biliões (43,9%).",
    },
    {
      id: "pessoal",
      section: "saida",
      title: "Salários e pessoal do Estado",
      value: "5,74 biliões Kz",
      share: "15,4% das saídas",
      meaning:
        "Vencimentos de civis, militares e paramilitares, mais contribuições. É o custo de manter a máquina do Estado a funcionar (professores, médicos, polícias, funcionários…).",
    },
    {
      id: "investimento",
      section: "saida",
      title: "Investimento (obras e equipamentos)",
      value: "6,21 biliões Kz",
      share: "16,6% das saídas",
      meaning:
        "Construção, infra-estruturas, equipamentos, reabilitações. É a parte mais visível no terreno: estradas, escolas, redes, material.",
      detail: "Só construção de infra-estruturas: cerca de 3,46 biliões (9,3%).",
    },
    {
      id: "bens-servicos",
      section: "saida",
      title: "Bens e serviços do dia-a-dia",
      value: "4,99 biliões Kz",
      share: "13,4% das saídas",
      meaning:
        "Combustível, comida institucional, material, limpeza, manutenção, consultas, viagens de serviço… O «correr» do Estado, sem ser salário nem obra nova.",
    },
    {
      id: "subsidios",
      section: "saida",
      title: "Subsídios e transferências",
      value: "3,43 biliões Kz",
      share: "9,2% das saídas",
      meaning:
        "Inclui apoio a preços/empresas públicas (≈ 1,52) e transferências a famílias — reformas, abonos, bolsas, autoridades tradicionais, antigos combatentes (≈ 1,53).",
    },
    {
      id: "educacao",
      section: "povo",
      title: "Educação",
      value: "3,29 biliões Kz",
      share: "8,8% do total",
      meaning:
        "Escolas, professores, secundário, técnico e superior. O ensino primário sozinho leva cerca de 1,64 biliões; o secundário cerca de 0,97.",
      detail:
        "Notícia oficial MinFin: merenda escolar para cerca de 7,1 milhões de alunos; programa «Minha Escola, Meu Futuro» com milhares de novas salas previstas.",
    },
    {
      id: "saude",
      section: "povo",
      title: "Saúde",
      value: "2,51 biliões Kz",
      share: "6,7% do total",
      meaning:
        "Hospitais, centros de saúde, maternidades e saúde pública. A fatia de saúde pública (prevenção e serviços de base) é a maior dentro desta área (≈ 1,15 biliões).",
    },
    {
      id: "agua-casa",
      section: "povo",
      title: "Água, saneamento e bairro",
      value: "2,48 biliões Kz",
      share: "6,6% do total",
      meaning:
        "Habitação e serviços comunitários: água (≈ 0,84), infra-estrutura urbana (≈ 1,33), saneamento (≈ 0,15). É o dinheiro que mexe com o chão da casa e da rua.",
    },
    {
      id: "protecao-social",
      section: "povo",
      title: "Protecção social",
      value: "1,67 biliões Kz",
      share: "4,5% do total",
      meaning:
        "Apoios a famílias, infância, habitação social e outros programas de protecção. É a rede de segurança escrita no Orçamento — aparte das pensões que também aparecem em transferências.",
    },
    {
      id: "seguranca",
      section: "povo",
      title: "Segurança e ordem pública",
      value: "2,05 biliões Kz",
      share: "5,5% do total",
      meaning:
        "Polícia, bombeiros, prisões e serviços ligados à ordem pública. A fatia policial é a maior (≈ 1,28 biliões).",
    },
    {
      id: "defesa",
      section: "povo",
      title: "Defesa",
      value: "1,70 biliões Kz",
      share: "4,6% do total",
      meaning:
        "Forças armadas e defesa militar. Aparece aqui para se poder comparar, lado a lado, com educação, saúde ou dívida.",
    },
    {
      id: "energia",
      section: "povo",
      title: "Electricidade e energia",
      value: "≈ 0,74 biliões Kz",
      share: "≈ 2,0% do total",
      meaning:
        "Dentro dos assuntos económicos, combustíveis e energia somam cerca de 0,74 biliões — a electricidade sozinha cerca de 0,61. É a linha mais ligada à luz em casa e à indústria.",
    },
    {
      id: "agricultura",
      section: "povo",
      title: "Agricultura, pesca e floresta",
      value: "≈ 0,30 biliões Kz",
      share: "≈ 0,8% do total",
      meaning:
        "Produção de comida e recursos naturais no Orçamento funcional. Número pequeno face ao total — útil para ver o peso real desta área na proposta.",
    },
  ] satisfies OgeFactCard[],
  steps: [
    {
      key: "entrega",
      label: "Entrega",
      plainLabel: "1. Entrega",
      done: true,
      plainDetail:
        "O Governo entregou a proposta ao Parlamento a 30 de Outubro de 2026. Os números desta página vêm dessa proposta.",
      dateLabel: "30 Out. 2026",
      sourceUrl:
        "https://www.minfin.gov.ao/sala-de-imprensa/noticias/noticia/proposta-do-oge2027-preve-crescimento-economico-na-ordem-de-5-5",
    },
    {
      key: "generalidade",
      label: "Generalidade",
      plainLabel: "2. Primeiro debate",
      done: false,
      plainDetail:
        "Os deputados discutem e votam a ideia geral. Marco anunciado: 12 de Novembro de 2026.",
      dateLabel: "12 Nov. 2026 (previsto)",
    },
    {
      key: "especialidade",
      label: "Especialidade",
      plainLabel: "3. Alterações",
      done: false,
      plainDetail:
        "Podem mudar verbas e regras, peça a peça. É aqui que os números desta página podem deixar de bater certo.",
    },
    {
      key: "final",
      label: "Votação final",
      plainLabel: "4. Voto final",
      done: false,
      plainDetail: "Votação do texto completo. Se passar, segue para promulgação.",
    },
    {
      key: "lei",
      label: "Publicação",
      plainLabel: "5. Vira lei",
      done: false,
      plainDetail:
        "Só com publicação oficial é que o Orçamento passa a valer para 2027.",
    },
  ] satisfies OgeStep[],
  status:
    "Números da proposta entregue a 30/10/2026. Actualizamos os cards quando o Parlamento alterar ou aprovar o texto final.",
  sourceUrl: "https://www.minfin.gov.ao/oge/proposta-oge",
  sourceLabel: "Ministério das Finanças — Proposta OGE 2027",
  secondarySourceUrl:
    "https://www.minfin.gov.ao/sala-de-imprensa/noticias/noticia/proposta-do-oge2027-preve-crescimento-economico-na-ordem-de-5-5",
  secondarySourceLabel: "MinFin — notícia da entrega",
  methodologyNote:
    "Os valores foram lidos dos resumos oficiais de receita e despesa (SIGFE) publicados no portal do MinFin. Não inventamos percentagens: arredondamos para leitura humana e explicamos o significado em linguagem corrente.",
};
