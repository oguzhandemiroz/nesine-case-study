import type { Bet, SortField, SortOrder } from "@/features/bets/types";

function parseDate(dateStr: string, timeStr: string): number {
  const [d, m, y] = dateStr.split(".");
  const [h, min] = timeStr.split(":");
  return new Date(+y, +m - 1, +d, +h, +min).getTime();
}

function getSortValue(bet: Bet, field: SortField): number {
  switch (field) {
    case "date":
      return parseDate(bet.D, bet.T);
    case "mbs":
      return parseInt(bet.OCG["1"]?.MBS || "0", 10);
    case "odd_ms_1":
      return parseFloat(bet.OCG["1"]?.OC["0"]?.O || "0");
    case "odd_ms_x":
      return parseFloat(bet.OCG["1"]?.OC["1"]?.O || "0");
    case "odd_ms_2":
      return parseFloat(bet.OCG["1"]?.OC["2"]?.O || "0");
    case "odd_au_alt":
      return parseFloat(bet.OCG["5"]?.OC["25"]?.O || "0");
    case "odd_au_ust":
      return parseFloat(bet.OCG["5"]?.OC["26"]?.O || "0");
    default:
      return 0;
  }
}

export function sortMatches(bets: Bet[], field: SortField, order: SortOrder): Bet[] {
  const sorted = [...bets];

  sorted.sort((a, b) => {
    const valA = getSortValue(a, field);
    const valB = getSortValue(b, field);
    return order === "asc" ? valA - valB : valB - valA;
  });

  return sorted;
}
