import type { AppConfig, MassPart, LiturgicalSeason, SpecialOccasion } from "@/types";

export const APP_CONFIG: AppConfig = {
  defaultTransposeOffset: 0,
  defaultUseSpanishNotation: true,
  searchMinLength: 3,
  maxResults: 50,
};

export const MASS_PARTS: MassPart[] = [
  "Entrada",
  "Perdón",
  "Aleluya",
  "Ofertorio",
  "Santo",
  "Padre Nuestro",
  "Comunión",
  "Meditación",
  "Salida",
];

export const LITURGICAL_SEASONS: LiturgicalSeason[] = [
  "Adviento",
  "Cuaresma",
  "Tiempo Ordinario",
  "Pascua",
];

export const SPECIAL_OCCASIONS: SpecialOccasion[] = [
  "Bautismos",
  "Comuniones",
  "Confirmaciones",
  "Casamientos",
  "Funerales",
  "Fiestas Patronales",
  "Aniversarios",
  "Procesiones",
  "Adoración",
  "Consagraciones",
];

export const CHORDS = {
  spanish: ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"],
  english: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
};

export const STORAGE_KEYS = {
  CUSTOM_SONGS: "customSongs",
  USER_PREFERENCES: "userPreferences",
  SEARCH_HISTORY: "searchHistory",
} as const;

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  ADD: "/add",
  LYRICS: "/lyrics",
} as const;

export const ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
    EASE_OUT: "cubic-bezier(0, 0, 0.2, 1)",
    EASE_IN: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const; 