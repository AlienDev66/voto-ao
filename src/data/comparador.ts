/**
 * Comparador de partidos — frases curtas, terra-a-terra.
 * Quando o voto nominal partido a partido não é publicado, dizemos como sabemos.
 */

export type PartyStance = {
  partySlug: string;
  partyName: string;
  color: string;
  stance: "a_favor" | "contra" | "abstencao" | "desconhecido" | "misto";
  sentence: string;
};

export type CompareTheme = {
  id: string;
  title: string;
  question: string;
  whyItMatters: string;
  voteLabel: string;
  voteDate: string;
  resultPlain: string;
  evidence: string;
  stances: PartyStance[];
};

export const COMPARADOR = {
  title: "Como votam — em 3 frases",
  plainIntro:
    "Sem gráficos académicos. Escolhe um tema da vida (saúde, impostos, orçamento…) e lê, partido a partido, o que sabemos do voto. Quando o Estado não publica a posição oficial, dizemos isso.",
  themes: [
    {
      id: "orcamento",
      title: "Orçamento do Estado",
      question: "Aprovaram o OGE 2026?",
      whyItMatters:
        "O Orçamento decide escolas, hospitais, salários públicos e dívida. É a votação mais pesada do ano.",
      voteLabel: "OGE 2026 — votação na globalidade",
      voteDate: "17 Dez. 2025",
      resultPlain: "Aprovado com 120 a favor e 79 contra (0 abstenções).",
      evidence:
        "Totais oficiais da AN. Com 124 lugares do MPLA e 90 da UNITA, o resultado encaixa com maioria governamental a favor e oposição maioritária contra — mas a AN não publicou lista nominal aberta partido a partido neste registo do VotoAO.",
      stances: [
        {
          partySlug: "mpla",
          partyName: "MPLA",
          color: "#e31c23",
          stance: "a_favor",
          sentence:
            "Leitura: a favor. A maioria que aprova o OGE coincide com o peso do grupo maioritário — o Executivo é do mesmo campo.",
        },
        {
          partySlug: "unita",
          partyName: "UNITA",
          color: "#0b6e4f",
          stance: "contra",
          sentence:
            "Leitura: contra. O bloco de votos contra (~79) alinha com a oposição liderada pela UNITA, que criticou prioridades do Orçamento.",
        },
        {
          partySlug: "prs",
          partyName: "PRS",
          color: "#1d4ed8",
          stance: "desconhecido",
          sentence:
            "Sem voto nominal público neste dossier no VotoAO. Com 2 deputados, o peso no total é pequeno — mas a posição exacta não está publicada aqui.",
        },
        {
          partySlug: "fnla",
          partyName: "FNLA",
          color: "#000000",
          stance: "desconhecido",
          sentence:
            "Sem registo nominal aberto neste voto. Dois lugares: a posição oficial não está na nossa base.",
        },
        {
          partySlug: "pha",
          partyName: "PHA",
          color: "#7c3aed",
          stance: "desconhecido",
          sentence:
            "Sem registo nominal aberto neste voto. Exigimos transparência: o cidadão merece saber o «sim» ou «não» de cada bancada.",
        },
      ],
    },
    {
      id: "impostos",
      title: "Impostos (IRT / IRPC)",
      question: "Como lidam com códigos de imposto?",
      whyItMatters:
        "IRT e impostos sobre empresas mexem no salário líquido e no custo de fazer negócio — chega à carteira.",
      voteLabel: "Códigos de imposto (IRPS / matérias fiscais em 2026–27)",
      voteDate: "Em acompanhamento",
      resultPlain:
        "Há propostas e debates fiscais no arquivo do VotoAO; a posição partido a partido ainda aparece muitas vezes como «desconhecido» porque a fonte oficial não a detalha.",
      evidence:
        "Pipeline de ingestão + notícias AN. Sem acta com voto por bancada, não inventamos o «sim» ou «não».",
      stances: [
        {
          partySlug: "mpla",
          partyName: "MPLA",
          color: "#e31c23",
          stance: "desconhecido",
          sentence:
            "Como partido do Executivo, costuma defender as propostas fiscais do Governo — mas neste site só marcamos «a favor» com fonte explícita.",
        },
        {
          partySlug: "unita",
          partyName: "UNITA",
          color: "#0b6e4f",
          stance: "desconhecido",
          sentence:
            "Em público tem criticado carga fiscal e priorização — falta o voto nominal publicado para fechar a frase com certeza.",
        },
        {
          partySlug: "prs",
          partyName: "PRS",
          color: "#1d4ed8",
          stance: "desconhecido",
          sentence: "Sem posição nominal publicada neste tema na nossa base.",
        },
        {
          partySlug: "fnla",
          partyName: "FNLA",
          color: "#000000",
          stance: "desconhecido",
          sentence: "Sem posição nominal publicada neste tema na nossa base.",
        },
        {
          partySlug: "pha",
          partyName: "PHA",
          color: "#7c3aed",
          stance: "desconhecido",
          sentence: "Sem posição nominal publicada neste tema na nossa base.",
        },
      ],
    },
    {
      id: "saude-educacao",
      title: "Saúde e educação",
      question: "Priorizam estas áreas no Orçamento?",
      whyItMatters:
        "São as fatias que mais se sentem no dia-a-dia — mas no voto do OGE vêm dentro do pacote inteiro, não isoladas.",
      voteLabel: "Dentro do OGE (não há voto separado «só saúde» / «só educação»)",
      voteDate: "Ciclo orçamental",
      resultPlain:
        "Na proposta 2027, educação ~8,8% e saúde ~6,7% do total — atrás da dívida (~43%). O voto do OGE aprova ou rejeita o pacote completo.",
      evidence:
        "Resumos SIGFE da proposta + votação global do OGE. Não existe, no nosso arquivo, um «sim» isolado só à saúde ou só à educação.",
      stances: [
        {
          partySlug: "mpla",
          partyName: "MPLA",
          color: "#e31c23",
          stance: "misto",
          sentence:
            "Aprova o pacote orçamental que inclui estas áreas — e também a fatia enorme da dívida. «Prioridade social» no discurso ≠ fatia maior que a dívida no papel.",
        },
        {
          partySlug: "unita",
          partyName: "UNITA",
          color: "#0b6e4f",
          stance: "misto",
          sentence:
            "Vota tipicamente contra o pacote quando está na oposição, pedindo outras prioridades. Sem emendas nominais publicadas, não dá para ver o «quanto» exacto que queria para saúde/educação.",
        },
        {
          partySlug: "prs",
          partyName: "PRS",
          color: "#1d4ed8",
          stance: "desconhecido",
          sentence: "Sem detalhe de voto/emenda publicado neste recorte.",
        },
        {
          partySlug: "fnla",
          partyName: "FNLA",
          color: "#000000",
          stance: "desconhecido",
          sentence: "Sem detalhe de voto/emenda publicado neste recorte.",
        },
        {
          partySlug: "pha",
          partyName: "PHA",
          color: "#7c3aed",
          stance: "desconhecido",
          sentence: "Sem detalhe de voto/emenda publicado neste recorte.",
        },
      ],
    },
    {
      id: "transparencia",
      title: "Transparência parlamentar",
      question: "Publicam como cada bancada votou?",
      whyItMatters:
        "Sem voto nominal, o eleitor não consegue cobrar o deputado — só o partido em bloco, e às vezes nem isso.",
      voteLabel: "Prática do Plenário (meta-transparência)",
      voteDate: "Contínuo",
      resultPlain:
        "Muitas votações chegam ao público só com totais (a favor / contra / abstenções), sem lista por partido ou por deputado.",
      evidence:
        "Observação do arquivo VotoAO e do modelo de publicação da AN. Ver também /lacunas.",
      stances: [
        {
          partySlug: "mpla",
          partyName: "MPLA",
          color: "#e31c23",
          stance: "misto",
          sentence:
            "Como maioria, tem poder de agenda para impor mais transparência de votos — até agora o padrão continua opaco em muitos dossiers.",
        },
        {
          partySlug: "unita",
          partyName: "UNITA",
          color: "#0b6e4f",
          stance: "misto",
          sentence:
            "Em discurso pede mais escrutínio; falta pressão pública contínua e regras claras de publicação nominal.",
        },
        {
          partySlug: "prs",
          partyName: "PRS",
          color: "#1d4ed8",
          stance: "desconhecido",
          sentence: "Sem posição formal catalogada neste tema.",
        },
        {
          partySlug: "fnla",
          partyName: "FNLA",
          color: "#000000",
          stance: "desconhecido",
          sentence: "Sem posição formal catalogada neste tema.",
        },
        {
          partySlug: "pha",
          partyName: "PHA",
          color: "#7c3aed",
          stance: "desconhecido",
          sentence: "Sem posição formal catalogada neste tema.",
        },
      ],
    },
  ] satisfies CompareTheme[],
};

export const STANCE_LABEL: Record<PartyStance["stance"], string> = {
  a_favor: "A favor",
  contra: "Contra",
  abstencao: "Abstenção",
  desconhecido: "Não publicado",
  misto: "Leitura mista",
};
