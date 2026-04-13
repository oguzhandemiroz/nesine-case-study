import type { Bet } from "@/features/bets/types";

export function filterBySearch(bets: Bet[], term: string): Bet[] {
  const trimmed = term.trim();
  if (!trimmed) return bets;

  const lower = trimmed.toLocaleLowerCase("tr");

  return bets.filter(
    (bet) =>
      bet.N.toLocaleLowerCase("tr").includes(lower) ||
      bet.LN.toLocaleLowerCase("tr").includes(lower),
  );
}
