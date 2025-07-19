export interface Song {
  title: string;
  lyrics: LyricLine[];
  verses?: LyricLine[][]; // Estrofas separadas
  chorus?: LyricLine[]; // Estribillo opcional
  categories?: {
    massParts?: string[];
    liturgicalSeasons?: string[];
    specialOccasions?: string[];
  };
  key?: string;
  tempo?: string;
  author?: string;
  year?: number;
  source?: string;
}

export interface LyricLine {
  chord: string;
  text: string;
}

export interface TransposedLyricLine {
  chord: string;
  text: string;
}

export interface SearchFilters {
  massParts: string[];
  liturgicalSeasons: string[];
  specialOccasions: string[];
}

export interface TransposeOptions {
  offset: number;
  useSpanishNotation: boolean;
}

export interface SearchState {
  query: string;
  selected: string | null;
  showChords: boolean;
  transposeOffset: number;
  useSpanishNotation: boolean;
  showFilters: boolean;
  filters: SearchFilters;
}

export type MassPart =
  | "Entrada"
  | "Perdón"
  | "Aleluya"
  | "Ofertorio"
  | "Santo"
  | "Padre Nuestro"
  | "Comunión"
  | "Meditación"
  | "Salida";

export type LiturgicalSeason =
  | "Todos"
  | "Adviento"
  | "Cuaresma"
  | "Tiempo Ordinario"
  | "Pascua";

export type SpecialOccasion =
  | "Bautismos"
  | "Comuniones"
  | "Confirmaciones"
  | "Casamientos"
  | "Funerales"
  | "Fiestas Patronales"
  | "Aniversarios"
  | "Procesiones"
  | "Adoración"
  | "Consagraciones";

export interface AppConfig {
  defaultTransposeOffset: number;
  defaultUseSpanishNotation: boolean;
  searchMinLength: number;
  maxResults: number;
}
