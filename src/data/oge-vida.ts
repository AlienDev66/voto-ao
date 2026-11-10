/**
 * OGE traduzido para a vida concreta.
 * Valores da proposta OGE 2027 (resumos SIGFE 30/10/2026) ÷ população INE.
 */

export const POPULATION = {
  total: 36_604_681,
  label: "36 604 681",
  source: "Censo 2024 (INE) — resultados definitivos, referência 19 Set. 2024",
  sourceUrl:
    "https://www.ine.gov.ao/Arquivos/arquivosCarregados/Carregados/Publicacao_638992698392651704.pdf",
};

/** Totais exactos da proposta (Kz). */
export const OGE_TOTALS = {
  total: 37_337_334_889_249,
  education: 3_290_309_636_584,
  health: 2_506_556_051_609,
  waterHousing: 2_475_539_242_556,
  waterOnly: 842_840_230_014,
  electricityEnergy: 735_129_997_484,
  electricityOnly: 607_835_956_862,
  debtServiceApprox: 16_210_000_000_000,
  primaryEducation: 1_637_245_222_418,
  schoolMealsBeneficiaries: 7_100_000,
};

function perCapita(amount: number) {
  return Math.round(amount / POPULATION.total);
}

function fmtKz(n: number) {
  return n.toLocaleString("pt-AO") + " Kz";
}

/** Fatia populacional (Censo 2024) — para ilustrar escala, não dotação oficial por província. */
export const PROVINCE_SHARE = [
  { name: "Luanda", people: 8_816_297, shareLabel: "24,1%" },
  { name: "Huíla", people: Math.round(36_604_681 * 0.09), shareLabel: "9,0%" },
  { name: "Huambo", people: Math.round(36_604_681 * 0.074), shareLabel: "7,4%" },
  { name: "Benguela", people: Math.round(36_604_681 * 0.071), shareLabel: "7,1%" },
].map((p) => ({
  ...p,
  peopleLabel: p.people.toLocaleString("pt-AO"),
  ifSplitTotal: fmtKz(Math.round((OGE_TOTALS.total * p.people) / POPULATION.total)),
  ifSplitEducation: fmtKz(Math.round((OGE_TOTALS.education * p.people) / POPULATION.total)),
}));

export const LIFE_IMPACT = {
  intro:
    "Os biliões confundem. Aqui dividimos a proposta do OGE 2027 pelo número de angolanos do Censo — para veres o peso por cabeça. Não é dinheiro que cai na tua conta: é a fatia média do bolo público.",
  disclaimer:
    "Contas de transparência: proposta ÷ população. Não promete transferência directa. A lei final pode mudar estes números.",
  perPerson: [
    {
      id: "total",
      icon: "bolo",
      title: "O bolo todo, por pessoa",
      value: fmtKz(perCapita(OGE_TOTALS.total)),
      plain:
        "Se dividisses o Orçamento inteiro por cada angolano do Censo, saía cerca deste valor por cabeça — incluindo dívida, salários e obras.",
    },
    {
      id: "escola",
      icon: "escola",
      title: "Educação, por pessoa",
      value: fmtKz(perCapita(OGE_TOTALS.education)),
      plain:
        "Fatia média de educação no Orçamento por habitante. O ensino primário sozinho leva cerca de metade desta área.",
      detail: `Primário na proposta: ${fmtKz(OGE_TOTALS.primaryEducation)} no total.`,
    },
    {
      id: "merenda",
      icon: "merenda",
      title: "Educação ÷ alunos da merenda",
      value: fmtKz(Math.round(OGE_TOTALS.education / OGE_TOTALS.schoolMealsBeneficiaries)),
      plain:
        "Se dividisses só a rubrica de educação pelos ~7,1 milhões de alunos previstos na merenda escolar, saía este valor por aluno — útil para comparar escala, não para dizer que cada um recebe isso em espécie.",
      detail: "Beneficiários da merenda: notícia oficial MinFin sobre a proposta 2027.",
    },
    {
      id: "hospital",
      icon: "hospital",
      title: "Saúde, por pessoa",
      value: fmtKz(perCapita(OGE_TOTALS.health)),
      plain:
        "Hospitais, centros de saúde, maternidades e saúde pública — média por habitante na proposta.",
    },
    {
      id: "agua",
      icon: "agua",
      title: "Água + bairro, por pessoa",
      value: fmtKz(perCapita(OGE_TOTALS.waterHousing)),
      plain:
        "Habitação e serviços comunitários (água, saneamento, infra-estrutura urbana). A água sozinha na proposta: cerca de " +
        fmtKz(perCapita(OGE_TOTALS.waterOnly)) +
        " por pessoa.",
    },
    {
      id: "luz",
      icon: "luz",
      title: "Energia / electricidade, por pessoa",
      value: fmtKz(perCapita(OGE_TOTALS.electricityEnergy)),
      plain:
        "Combustíveis e energia no Orçamento funcional. Só electricidade: cerca de " +
        fmtKz(perCapita(OGE_TOTALS.electricityOnly)) +
        " por habitante.",
    },
    {
      id: "divida",
      icon: "divida",
      title: "Dívida, por pessoa",
      value: fmtKz(perCapita(OGE_TOTALS.debtServiceApprox)),
      plain:
        "Quase 4 em cada 10 kwanzas do Orçamento vão para juros e amortizações. Por cabeça, é esta ordem de grandeza — dinheiro que não constrói escola nova.",
    },
  ],
  dayToDay: [
    {
      id: "escola-dia",
      title: "A tua escola",
      promise:
        "A proposta fala em reforço da merenda (~7,1 milhões de alunos) e no programa «Minha Escola, Meu Futuro» (milhares de novas salas).",
      reality:
        "Isto só vira obra e merenda na mesa se o dinheiro for executado — não basta estar no PDF. Acompanha a execução em /execucao.",
      tone: "escola",
    },
    {
      id: "hospital-dia",
      title: "O teu hospital / posto",
      promise:
        "Saúde na proposta: cerca de 2,51 biliões Kz (6,7% do total), com peso forte em saúde pública.",
      reality:
        "Mais verba no papel não garante medicamento na prateleira. O teste é a execução trimestral e o que chega à unidade de saúde.",
      tone: "saude",
    },
    {
      id: "luz-dia",
      title: "A tua luz",
      promise:
        "Electricidade aparece com cerca de 0,61 biliões Kz na função energia — uma fatia pequena face ao bolo total.",
      reality:
        "No Censo 2024, só cerca de 48,6% dos agregados tinham electricidade. O Orçamento desta área é estreito face à necessidade.",
      tone: "energia",
    },
    {
      id: "agua-dia",
      title: "A tua água",
      promise:
        "Abastecimento de água: ~0,84 biliões Kz na proposta. Saneamento e infra urbana vêm à parte.",
      reality:
        "No Censo, ~56% dos agregados tinham fonte de água apropriada para beber. Há caminho — e o dinheiro tem de sair do papel.",
      tone: "agua",
    },
  ],
  proposalVsLaw: {
    title: "Proposta ≠ lei",
    steps: [
      {
        label: "Agora",
        status: "proposta",
        plain: "Estes números são da proposta entregue a 30 Out. 2026. Ainda podem mudar no Parlamento.",
      },
      {
        label: "Depois do voto",
        status: "lei",
        plain: "Quando a AN aprovar e for publicada a lei, actualizamos os cards com o texto final — lado a lado com a proposta.",
      },
      {
        label: "Durante o ano",
        status: "execucao",
        plain: "Mesmo a lei aprovada só conta se o dinheiro for gasto. Por isso existe a página de execução (REOGE).",
      },
    ],
  },
};
