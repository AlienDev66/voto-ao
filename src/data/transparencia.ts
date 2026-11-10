/**
 * Transparência — o que fazem e o que recebem (deputados + Presidente).
 * Só factos citáveis. Lacunas oficiais ficam explícitas.
 */

export type MoneyLine = {
  label: string;
  plain: string;
  amountLabel: string;
  note?: string;
};

export type DutyCard = {
  title: string;
  plain: string;
};

export type PerkCard = {
  title: string;
  plain: string;
  amountLabel?: string;
};

export type GapCard = {
  title: string;
  plain: string;
};

const fmt = (n: number) =>
  n.toLocaleString("pt-AO", { maximumFractionDigits: 0 }) + " Kz";

/** Base oficial 2026 (Resolução n.º 15/26). */
export const DEPUTY_BASE = 790_020;
export const SPEAKER_BASE = 877_800;

/**
 * Índices da Resolução n.º 6/19 (ainda referidos pela Res. 15/26).
 * Aplicados sobre o salário-base actual.
 */
export const DEPUTY_SUPPLEMENT_RATES = {
  representacao: 0.5,
  renda: 0.5,
  pessoalDomestico: 0.9,
  comunicacao: 0.4,
} as const;

export const SPEAKER_SUPPLEMENT_RATES = {
  representacao: 0.8,
  pessoalDomestico: 1.0,
  comunicacao: 0.9,
} as const;

export const CARGO_RATES = [
  {
    rate: 0.35,
    who: "Vice-Presidentes da AN, presidentes de comissão / grupo parlamentar, membros da Comissão Permanente, etc.",
  },
  {
    rate: 0.25,
    who: "Secretários da Mesa, vice-presidentes de grupo/comissão, presidente do Grupo das Mulheres Parlamentares, membros do Conselho de Administração, etc.",
  },
  {
    rate: 0.2,
    who: "Secretários de grupos/comissões e coordenadores de subcomissões.",
  },
] as const;

function deputyMonthlyGross() {
  const b = DEPUTY_BASE;
  const r = DEPUTY_SUPPLEMENT_RATES;
  return {
    base: b,
    representacao: Math.round(b * r.representacao),
    renda: Math.round(b * r.renda),
    pessoalDomestico: Math.round(b * r.pessoalDomestico),
    comunicacao: Math.round(b * r.comunicacao),
    total:
      b +
      Math.round(b * r.representacao) +
      Math.round(b * r.renda) +
      Math.round(b * r.pessoalDomestico) +
      Math.round(b * r.comunicacao),
  };
}

function speakerMonthlyGross() {
  const b = SPEAKER_BASE;
  const r = SPEAKER_SUPPLEMENT_RATES;
  return {
    base: b,
    representacao: Math.round(b * r.representacao),
    pessoalDomestico: Math.round(b * r.pessoalDomestico),
    comunicacao: Math.round(b * r.comunicacao),
    total:
      b +
      Math.round(b * r.representacao) +
      Math.round(b * r.pessoalDomestico) +
      Math.round(b * r.comunicacao),
  };
}

const dep = deputyMonthlyGross();
const pan = speakerMonthlyGross();

export const TRANSPARENCY = {
  title: "Quem faz o quê — e quanto custa",
  plainIntro:
    "Transparência sem panfleto: o que a lei diz que os deputados e o Presidente fazem, o que recebem em dinheiro, e que regalias existem. Quando o valor exacto não é público, dizemos isso à cara.",

  deputies: {
    title: "Deputados da Assembleia Nacional",
    countLabel: "220 deputados",
    whatTheyDo: [
      {
        title: "Fazer e mudar leis",
        plain:
          "Propõem projectos de lei, alteram propostas do Governo, discutem e votam no Plenário e nas comissões. Sem o voto deles, a proposta não vira lei.",
      },
      {
        title: "Aprovar o Orçamento",
        plain:
          "Recebem a proposta do OGE, debatem, podem alterar e votam. É a conta anual do Estado — a fatia mais pesada do trabalho parlamentar.",
      },
      {
        title: "Fiscalizar o Executivo",
        plain:
          "Podem fazer perguntas a ministros, pedir documentos, propor audições e comissões de inquérito. Em teoria, é o «olho» do Parlamento sobre o Governo.",
      },
      {
        title: "Trabalhar em comissão",
        plain:
          "Antes do Plenário, as leis passam por comissões especializadas (economia, saúde, educação…). É aí que se lê o texto fino e se escrevem pareceres.",
      },
      {
        title: "Representar quem os elegeu",
        plain:
          "Por listas e círculos. A lei manda manter contacto com o eleitorado — na prática, isso depende de cada um, do partido e da transparência pública do trabalho.",
      },
      {
        title: "O que NÃO é o dia-a-dia de todos",
        plain:
          "Nem todos falam todas as semanas no Plenário. Muitos votam segundo a orientação do grupo parlamentar. O trabalho visível (discurso, pergunta, iniciativa) varia muito de pessoa para pessoa.",
      },
    ] satisfies DutyCard[],

    payHeadline: {
      base: fmt(DEPUTY_BASE),
      grossCalc: fmt(dep.total),
      netPress: "≈ 1,982 milhões Kz líquidos",
      netPressNote:
        "Cálculo do jornal Expansão (Jun. 2026) para deputado sem cargo de chefia, já com descontos. Não é um recibo oficial publicado linha a linha.",
    },

    payLines: [
      {
        label: "Salário-base",
        plain: "Valor oficial mensal fixado pela Assembleia (Res. 15/26).",
        amountLabel: fmt(dep.base),
      },
      {
        label: "Despesas de representação",
        plain: "50% do base — para custos de representar o cargo.",
        amountLabel: fmt(dep.representacao),
      },
      {
        label: "Subsídio de renda de casa",
        plain: "50% do base — apoio à habitação.",
        amountLabel: fmt(dep.renda),
      },
      {
        label: "Pessoal doméstico",
        plain: "90% do base — o maior suplemento mensal do pacote.",
        amountLabel: fmt(dep.pessoalDomestico),
      },
      {
        label: "Comunicação",
        plain: "40% do base — telefone / comunicações.",
        amountLabel: fmt(dep.comunicacao),
      },
      {
        label: "Total mensal bruto estimado",
        plain:
          "Soma do base + suplementos da Res. 6/19, sem cargo extra e antes de impostos.",
        amountLabel: fmt(dep.total),
        note: "Os índices vêm da Res. 6/19; o base actualizado vem da Res. 15/26.",
      },
    ] satisfies MoneyLine[],

    annualExtras: [
      {
        title: "Subsídio de férias",
        plain: "Uma vez por ano, igual ao salário-base do mês anterior.",
        amountLabel: fmt(DEPUTY_BASE),
      },
      {
        title: "13.º mês",
        plain: "No último trimestre do ano, igual ao salário-base.",
        amountLabel: fmt(DEPUTY_BASE),
      },
      {
        title: "Manutenção de residência",
        plain: "Comparticipação anual para benfeitorias na casa onde vive — valor fixado pelo Plenário (não está na Res. 6/19 em % pública clara).",
      },
      {
        title: "Subsídio de instalação",
        plain:
          "No início do mandato: para instalar residência e adquirir viatura pessoal. Montante fixado pelo Plenário — valor exacto nem sempre publicado de forma fácil.",
      },
    ] satisfies PerkCard[],

    cargoExtras: CARGO_RATES.map((c) => ({
      title: `+${Math.round(c.rate * 100)}% do base (cargo)`,
      plain: c.who,
      amountLabel: fmt(Math.round(DEPUTY_BASE * c.rate)) + " / mês",
    })),

    speakerPay: {
      title: "Presidente da Assembleia Nacional",
      base: fmt(SPEAKER_BASE),
      lines: [
        { label: "Salário-base", amountLabel: fmt(pan.base), plain: "Res. 15/26." },
        {
          label: "Representação",
          amountLabel: fmt(pan.representacao),
          plain: "80% do base (Res. 6/19).",
        },
        {
          label: "Pessoal doméstico",
          amountLabel: fmt(pan.pessoalDomestico),
          plain: "100% do base (Res. 6/19).",
        },
        {
          label: "Comunicação",
          amountLabel: fmt(pan.comunicacao),
          plain: "90% do base (Res. 6/19).",
        },
        {
          label: "Total mensal bruto estimado",
          amountLabel: fmt(pan.total),
          plain: "Antes de impostos e sem outras ajudas de custo.",
        },
      ] satisfies MoneyLine[],
    },

    perks: [
      {
        title: "Passaporte diplomático",
        plain: "Extensível ao cônjuge e filhos menores.",
      },
      {
        title: "Saúde",
        plain:
          "Assistência médica e medicamentosa para o deputado e família directa (cônjuge, ascendentes/descendentes nas condições da lei), via plano/seguro.",
      },
      {
        title: "Seguros",
        plain: "Saúde, acidentes pessoais, vida/invalidez e viagem em missão.",
      },
      {
        title: "Pessoal doméstico",
        plain: "Até quatro empregados — além do suplemento em dinheiro.",
      },
      {
        title: "Viagens",
        plain:
          "Missões: ajudas de custo. Uma vez por ano parlamentar: bilhete ida e volta em 1.ª classe (deputado + cônjuge) para um destino no exterior ou equivalente no interior.",
      },
      {
        title: "Segurança e arma",
        plain: "Direito a segurança pessoal e licença de uso e porte de arma para defesa.",
      },
      {
        title: "Livre-trânsito e adiamento do SMO",
        plain: "Acesso facilitado a locais condicionados; adiamento do serviço militar obrigatório.",
      },
      {
        title: "Viatura",
        plain:
          "Cargos de direcção têm viatura protocolar. Há ainda regras de viatura de uso pessoal ligadas ao subsídio de instalação.",
      },
      {
        title: "Depois do mandato",
        plain:
          "Com ≥ 4 anos: cartão, passaporte diplomático (família), porte de arma, assistência médica. Com ≥ 8 anos ou 2 mandatos: subvenção vitalícia (50% do base; 80% a partir dos 60 anos ou incapacidade). Fim de mandato: subsídio proporcional (valor fixado pelo Plenário).",
      },
    ] satisfies PerkCard[],

    gaps: [
      {
        title: "Recibo oficial linha a linha",
        plain:
          "A AN não publica, de forma aberta e contínua, o recibo mensal de cada deputado. Os totais líquidos que vês na imprensa são reconstruções a partir das resoluções.",
      },
      {
        title: "Valores exactos de algumas ajudas",
        plain:
          "Ajudas de custo diárias, instalação, fim de mandato e manutenção de residência dependem de deliberações do Plenário — nem sempre fáceis de encontrar actualizadas.",
      },
      {
        title: "Assiduidade individual",
        plain:
          "Não há um painel público simples com faltas e presença de cada deputado em todas as sessões.",
      },
    ] satisfies GapCard[],
  },

  president: {
    title: "Presidente da República",
    who: "Chefe de Estado, titular do Poder Executivo e Comandante-em-Chefe das Forças Armadas.",
    whatTheyDo: [
      {
        title: "Governa o país",
        plain:
          "Define a orientação política, dirige a Administração Pública e o Conselho de Ministros. Em Angola o Presidente é, ao mesmo tempo, chefe de Estado e chefe do Executivo.",
      },
      {
        title: "Nomeia (e exonera) quase tudo o que manda",
        plain:
          "Ministros, secretários de Estado, governadores provinciais, dirigentes de bancos e tribunais (nos termos da Constituição), Procurador-Geral, etc. Quem manda nos ministérios depende desta caneta.",
      },
      {
        title: "Propõe o Orçamento e legisla",
        plain:
          "Envia a proposta de OGE à Assembleia, pode apresentar propostas de lei e decretos no quadro constitucional. A AN vota; ele promulga.",
      },
      {
        title: "Defesa e emergência",
        plain:
          "Comanda as Forças Armadas; pode declarar guerra/paz, estado de sítio ou emergência (ouvindo a Assembleia, nos termos da Constituição).",
      },
      {
        title: "Representa o Estado",
        plain:
          "Relações internacionais, tratados, mensagens à Assembleia, indultos, condecorações — a face institucional do país.",
      },
    ] satisfies DutyCard[],

    payHeadline: {
      base: "924.187,45 Kz",
      representation: "554.512,47 Kz",
      total: "1.478.699,93 Kz",
      note: "Tabela de vencimentos da Função Executiva do Estado para 2026 (vencimento-base + despesas de representação). Outros suplementos e custos de gabinete/segurança não vêm neste total.",
    },

    payLines: [
      {
        label: "Vencimento-base",
        plain: "Remuneração mensal do cargo (tabela 2026).",
        amountLabel: "924.187,45 Kz",
      },
      {
        label: "Despesas de representação",
        plain: "Abono mensal publicado na mesma tabela.",
        amountLabel: "554.512,47 Kz",
      },
      {
        label: "Total tabela 2026",
        plain: "Soma oficial publicada para o cargo — não é o custo total da Presidência.",
        amountLabel: "1.478.699,93 Kz",
      },
    ] satisfies MoneyLine[],

    hierarchy: [
      {
        title: "Vice-Presidente",
        amountLabel: "1.217.616,97 Kz",
        plain: "Base + representação (tabela 2026).",
      },
      {
        title: "Ministro de Estado",
        amountLabel: "1.109.024,94 Kz",
        plain: "Base + representação (tabela 2026).",
      },
      {
        title: "Ministro / Governador provincial",
        amountLabel: "1.005.053,86 Kz",
        plain: "Base + representação (tabela 2026).",
      },
      {
        title: "Secretário de Estado / Vice-ministro / Vice-governador",
        amountLabel: "905.703,70 Kz",
        plain: "Base + representação (tabela 2026).",
      },
    ] satisfies PerkCard[],

    perks: [
      {
        title: "Suplementos e prestações sociais",
        plain:
          "A Lei n.º 14/94 garante suplementos e prestações nos termos da legislação aplicável (além do abono de representação). Os montantes exactos de cada linha rara vez aparecem num único quadro público.",
      },
      {
        title: "Direitos patrimoniais do cargo",
        plain:
          "Residência, gabinete, segurança, frota e apoio de pessoal fazem parte do exercício do cargo — o custo operacional da Presidência não se resume ao vencimento pessoal.",
      },
      {
        title: "Actualização automática",
        plain:
          "A remuneração base e o abono de representação actualizam-se com os aumentos da mais alta categoria da Administração Pública (Lei 14/94).",
      },
      {
        title: "Ex-Presidentes (mandato completo)",
        plain:
          "Subvenção mensal de 80% do vencimento do Presidente em funções + 80% dos suplementos/prestações; carro do Estado com condutor e combustível; gabinete com pessoal; passaporte diplomático; segurança e porte de arma; ajudas em missões oficiais.",
      },
      {
        title: "Pensão de sobrevivência",
        plain:
          "Em caso de morte: cônjuge (enquanto viúvo/a), filhos menores/incapazes e ascendentes a cargo — 50% do vencimento, em conjunto.",
      },
    ] satisfies PerkCard[],

    gaps: [
      {
        title: "Custo total da Presidência",
        plain:
          "Segurança, viagens, gabinetes, protocolo e Casa Civil/Militar não estão neste vencimento. Não há um «preço completo» fácil de ler num só documento aberto.",
      },
      {
        title: "Património e declarações",
        plain:
          "A transparência patrimonial depende de declarações e fiscalização — o VotoAO não inventa valores que não estejam em fonte oficial pública e verificável.",
      },
      {
        title: "Comparação justa com deputados",
        plain:
          "O vencimento pessoal do Presidente na tabela pode parecer inferior ao pacote bruto de um deputado com todos os suplementos — mas o cargo traz uma máquina de Estado à volta. Comparar só o número do recibo engana.",
      },
    ] satisfies GapCard[],
  },

  sources: [
    {
      label: "Resolução n.º 15/26 (salário-base AN)",
      url: "https://angolex.com/paginas/resolucoes/ajuste-salario-base-mensal-presidente-assembleia-nacional-deputados-15a-26a.html",
    },
    {
      label: "Lei n.º 6/08 — Estatuto Remuneratório dos Deputados",
      url: "https://lex.ao/docs/assembleia-nacional/2008/lei-n-o-6-08-de-04-de-julho/",
    },
    {
      label: "Lei n.º 17/12 — Estatuto do Deputado",
      url: "https://lex.ao/docs/assembleia-nacional/2012/lei-n-o-17-12-de-16-de-maio/",
    },
    {
      label: "Resolução n.º 6/19 (índices de suplementos) — via imprensa/Lusa",
      url: "https://observador.pt/2019/02/27/angola-parlamento-fixa-salario-mensal-dos-deputados-em-1-530-euros/",
    },
    {
      label: "Expansão — cálculo líquido ≈ 1,982 M Kz (Jun. 2026)",
      url: "https://www.expansao.co.ao/angola/detalhe/incluindo-subsidios-e-ja-com-os-descontos-rondam-os-2-milhoes-kz-72532.html",
    },
    {
      label: "Tabela salarial Função Executiva 2026",
      url: "https://angolex.com/paginas/diversos/tabela-salarial-titulares-dos-cargos-de-funcao-executiva-2026a.html",
    },
    {
      label: "Lei n.º 14/94 — Estatuto Remuneratório do Presidente",
      url: "https://www.angolex.com/paginas/leis/lei-do-estatuto-remuneratorio-do-presidente-da-republica-14a-94a.html",
    },
    {
      label: "Constituição — competências do Presidente",
      url: "https://www.tribunalconstitucional.ao/pt/artigos-da-constituicao/",
    },
  ],

  honesty:
    "Não fazemos política de ódio nem de elogio. Mostramos a lei, os números oficiais e as lacunas. Se encontrares um Diário da República ou recibo oficial mais completo, manda — actualizamos.",
};
