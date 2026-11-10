/**
 * Execução orçamental — REOGE (promessa vs dinheiro gasto).
 * Fontes: relatórios oficiais MinFin (CMS).
 */

export const EXECUCAO = {
  title: "O dinheiro saiu do papel?",
  plainIntro:
    "Aprovar o Orçamento é só o começo. O que conta para a escola, o hospital e a estrada é a execução — quanto foi mesmo arrecadado e gasto. Aqui traduzimos os REOGE oficiais.",
  currentYear: {
    label: "OGE 2026 (em vigor)",
    authorized: "33,24 biliões Kz",
    latest: {
      period: "II Trimestre 2026",
      finished: "17 Jul. 2026",
      revenue: "9,85 biliões Kz",
      revenueShare: "30% do previsto no ano",
      expense: "10,24 biliões Kz",
      expenseShare: "31% do previsto no ano",
      balance:
        "Défice orçamental de cerca de 396 mil milhões Kz neste trimestre (gastou-se mais do que entrou).",
      oilNote:
        "Petróleo acima do pressuposto do OGE (Brent médio ~102 USD vs 61 USD de referência) — receitas extra usadas sobretudo para dívida e atrasados.",
      debtStock: "Dívida governamental ~65,75 biliões Kz (30 Jun. 2026).",
      url: "https://cms.minfin.gov.ao/api/assets/portal-minfin/59c27d06-3233-4c28-a2f8-6b3db1888f0c/",
      portal: "https://www.minfin.gov.ao/oge/orcamento-geral-do-estado",
    },
  },
  previousYear: {
    label: "OGE 2025 (já fechado nos relatórios)",
    authorized: "34,63 biliões Kz",
    q4: {
      period: "IV Trimestre 2025",
      revenue: "13,69 biliões Kz (40% do ano)",
      expense: "13,47 biliões Kz (39% do ano)",
      balance: "Superávit trimestral ~218 mil milhões Kz.",
      url: "https://cms.minfin.gov.ao/api/assets/portal-minfin/6fb282a3-8ce4-4319-86ca-e271ae984b2b/",
    },
  },
  howToRead: [
    {
      title: "1. Olha o % do ano",
      plain:
        "A meio do ano, ~50% seria um ritmo «em linha». 30–31% no II trimestre de 2026 quer dizer: ainda falta executar a maior parte.",
    },
    {
      title: "2. Entradas ≠ saídas",
      plain:
        "Se a despesa sobe mais que a receita no período, há défice naquele trimestre — mesmo que o ano ainda se equilibre depois.",
    },
    {
      title: "3. Dívida come espaço",
      plain:
        "Mesmo com petróleo alto, muito do extra foi para pagar dívida e atrasados — não aparece automaticamente como escola nova.",
    },
    {
      title: "4. Obra no terreno",
      plain:
        "O REOGE diz quanto se gastou por natureza/função. Não substitui visitar a obra nem auditar cada contrato — mas é o mínimo oficial.",
    },
  ],
  worksAndContracts: {
    title: "Obras e contratos",
    plain:
      "Angola publica o REOGE e peças do OGE. Um mapa simples «obra X — estado Y — valor Z» ainda não existe de forma aberta e completa no mesmo sítio. Por isso esta secção é honesta: ligamos ao que há, e marcamos o buraco.",
    available: [
      {
        title: "REOGE no MinFin",
        plain: "Relatórios trimestrais de execução — a fonte oficial do «foi gasto ou não».",
        href: "https://www.minfin.gov.ao/oge/orcamento-geral-do-estado",
      },
      {
        title: "Proposta / lei do OGE",
        plain: "Documentos da proposta e do ano corrente no portal das Finanças.",
        href: "https://www.minfin.gov.ao/oge/proposta-oge",
      },
    ],
    missing: [
      "Painel nacional de obras públicas com estado (parada / a decorrer / concluída) em linguagem simples.",
      "Contratos públicos ligáveis ao OGE, com valor, adjudicatário e localização, num formato aberto contínuo.",
      "Série trimestral por província já desmistificada (sem PDF de 100 páginas).",
    ],
  },
  timeline: [
    {
      when: "I Tri 2025",
      revenue: "6,12 bi",
      expense: "6,61 bi",
      note: "Início do ano — ritmo ainda a aquecer.",
    },
    {
      when: "II Tri 2025",
      revenue: "5,93 bi",
      expense: "6,44 bi",
      note: "~17–19% do anual acumulado na altura.",
    },
    {
      when: "III Tri 2025",
      revenue: "5,95 bi",
      expense: "6,31 bi",
      note: "Continuidade do ciclo 2025.",
    },
    {
      when: "IV Tri 2025",
      revenue: "13,69 bi",
      expense: "13,47 bi",
      note: "Fecho do ano com forte volume no 4.º trimestre.",
    },
    {
      when: "II Tri 2026",
      revenue: "9,85 bi",
      expense: "10,24 bi",
      note: "30–31% do OGE 2026 — a seguir com lupa.",
    },
  ],
};
