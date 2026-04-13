export interface OddsChoice {
  ID: string;
  O: string; // Oran değeri
  N: string; // Seçenek adı: "1", "X", "2", "1-X", "Alt", "Üst"
  MBS: string;
  G: string; // Hangi OCG grubuna ait
  OD: number; // Oran değişim yönü: 0=değişmedi, 1=arttı, -1=azaldı
  IMF: boolean;
}

export interface OddsCategoryGroup {
  ID: string;
  N: string; // Kategori adı
  MBS: string;
  SO: number; // Sort order — UI sıralaması için
  OC: Record<string, OddsChoice>;
}

export interface Bet {
  C: string; // Maç kodu (betId)
  N: string; // "Ev Sahibi - Deplasman"
  TYPE: string;
  NID: string;
  D: string; // Tarih "DD.MM.YYYY"
  T: string; // Saat "HH:mm"
  DAY: string; // Gün adı (Türkçe)
  S: string; // Status: "Open"
  LN: string; // Lig adı
  IMF: boolean;
  OCG: Record<string, OddsCategoryGroup>;
  HEC: boolean;
}

export interface CartItem {
  id: string; // Composite: `${matchCode}-${ocgId}-${ocId}`
  matchCode: string;
  matchName: string;
  ocgId: string;
  ocgName: string;
  ocId: string;
  ocName: string;
  oddValue: string;
  mbs: string;
}

export type SortField =
  | "date"
  | "mbs"
  | "odd_ms_1"
  | "odd_ms_x"
  | "odd_ms_2"
  | "odd_au_alt"
  | "odd_au_ust";
export type SortOrder = "asc" | "desc";
