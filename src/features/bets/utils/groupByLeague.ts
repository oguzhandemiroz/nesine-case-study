import type { Bet } from "@/features/bets/types";

export interface LeagueGroup {
  key: string;
  date: string;
  day: string;
  leagueName: string;
  bets: Bet[];
}

export function groupByLeague(bets: Bet[]): LeagueGroup[] {
  const map = new Map<string, LeagueGroup>();

  for (const bet of bets) {
    const key = `${bet.D}-${bet.LN}`;

    if (!map.has(key)) {
      map.set(key, {
        key,
        date: bet.D,
        day: bet.DAY,
        leagueName: bet.LN,
        bets: [],
      });
    }

    map.get(key)!.bets.push(bet);
  }

  return Array.from(map.values());
}
