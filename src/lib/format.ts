export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pt-AO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function stanceLabel(stance: string): string {
  switch (stance) {
    case "a_favor":
      return "A favor";
    case "contra":
      return "Contra";
    case "abstencao":
      return "Abstenção";
    default:
      return "Não indicado na fonte";
  }
}

export function resultLabel(result: string): string {
  switch (result) {
    case "aprovada":
      return "Aprovada";
    case "rejeitada":
      return "Rejeitada";
    default:
      return result;
  }
}
