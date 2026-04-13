export interface OddSlot {
  ocKey: string;
  label: string;
}

export interface ColumnGroup {
  id: string;
  label: string;
  ocgKey: string;
  odds: OddSlot[];
}

export const BULLETIN_COLUMNS: ColumnGroup[] = [
  {
    id: "match-result",
    label: "Maç Sonucu",
    ocgKey: "1",
    odds: [
      { ocKey: "0", label: "1" },
      { ocKey: "1", label: "X" },
      { ocKey: "2", label: "2" },
    ],
  },
  {
    id: "over-under",
    label: "Alt/Üst 2,5",
    ocgKey: "5",
    odds: [
      { ocKey: "25", label: "Alt" },
      { ocKey: "26", label: "Üst" },
    ],
  },
  {
    id: "double-chance",
    label: "Çifte Şans",
    ocgKey: "2",
    odds: [
      { ocKey: "3", label: "1-X" },
      { ocKey: "4", label: "1-2" },
      { ocKey: "5", label: "X-2" },
    ],
  },
];

export const TOTAL_ODD_SLOTS = BULLETIN_COLUMNS.reduce((sum, col) => sum + col.odds.length, 0);
