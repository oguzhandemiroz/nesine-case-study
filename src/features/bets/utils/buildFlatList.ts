import type { LeagueGroup } from "./groupByLeague";

export interface LeagueHeaderItem {
  type: "league-header";
  key: string;
  date: string;
  day: string;
  leagueName: string;
  matchCount: number;
}

export interface MatchItem {
  type: "match";
  betId: string;
}

export type FlatListItem = LeagueHeaderItem | MatchItem;

export function buildFlatList(groups: LeagueGroup[]): FlatListItem[] {
  const items: FlatListItem[] = [];

  for (const group of groups) {
    items.push({
      type: "league-header",
      key: group.key,
      date: group.date,
      day: group.day,
      leagueName: group.leagueName,
      matchCount: group.bets.length,
    });

    for (const bet of group.bets) {
      items.push({
        type: "match",
        betId: bet.C,
      });
    }
  }

  return items;
}
