import type { LucideIcon } from "lucide-react";

export type Tone = "negative" | "warning" | "neutral" | "positive" | "strong-positive";

export type Column = {
  id: string;
  label: string;
  sublabel?: string;
  symbol?: string; // e.g. "↓", "↓↓", "=", "↑", "↑↑", "⊘", "0%"
  tone?: Tone;
};

export type CellOverride = {
  label?: string;
  // emoji indicator like 😊 😐 😕 😣  or any small visual hint
  face?: "great" | "ok" | "meh" | "bad" | "worst";
  // for battery row in Q3
  battery?: 100 | 75 | 50 | 25 | 0;
  // for runner row in Q3
  runner?: "ok" | "slow" | "walk" | "tired" | "stop";
  // for "—" empty cells
  empty?: boolean;
};

export type Row = {
  id: string;
  number?: number;
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
  /** Optional visual scale image shown above the option buttons (image-cards layout). */
  scaleImage?: string;
  // optional overrides keyed by column id
  cells?: Record<string, CellOverride>;
};

export type Questionnaire = {
  slug: string;
  title: string;
  subtitle: string;
  helper?: string;
  page?: string;
  category: string;
  importantNote: string;
  whyTrack: string;
  alertRule?: string;
  howTo?: string[];
  columns: Column[];
  rows: Row[];
  /** Forces stacked image-card layout (used when rows have scale images). */
  layout?: "table" | "image-cards";
};