// E03: the six things a candidate needs to know about a role, with fixed (non-AI) prompts.
import type { JobCategory } from "@/features/jobs/types";

export const essentialKeys = [
  "firstTask",
  "ownership",
  "decisions",
  "team",
  "salary",
  "process",
] as const;
export type EssentialKey = (typeof essentialKeys)[number];
export const textEssentialKeys = [
  "firstTask",
  "ownership",
  "decisions",
  "team",
  "process",
] as const;
export type TextEssentialKey = (typeof textEssentialKeys)[number];

export const skipReasons = ["unknown", "confidential", "undecided", "in_brief"] as const;
export type SkipReason = (typeof skipReasons)[number];
export const skipReasonLabels: Record<SkipReason, string> = {
  unknown: "Nie wiem",
  confidential: "Poufne",
  undecided: "Jeszcze nieustalone",
  in_brief: "Jest już w briefie",
};

// "Jest już w briefie" is a skip reason: the author's claim does not count as a filled element.
export type EssentialStatus = { state: "skipped"; reason: SkipReason };

export const essentialLabels: Record<EssentialKey, string> = {
  firstTask: "Pierwsze zadanie",
  ownership: "Za co ta osoba odpowiada",
  decisions: "O czym ta osoba decyduje",
  team: "Zespół",
  salary: "Widełki",
  process: "Przebieg rekrutacji",
};

// Genitive forms for "Opublikuj bez …" when exactly one element is missing.
export const essentialGenitive: Record<EssentialKey, string> = {
  firstTask: "pierwszego zadania",
  ownership: "zakresu odpowiedzialności",
  decisions: "zakresu decyzji",
  team: "opisu zespołu",
  salary: "widełek",
  process: "przebiegu rekrutacji",
};

const sharedPrompts: Record<EssentialKey, string> = {
  firstTask: "Od czego nowa osoba zacznie w pierwszym miesiącu? Opisz jedno konkretne zadanie.",
  ownership: "Co będzie należeć tylko do tej osoby, a co do innych?",
  decisions: "O czym ta osoba będzie decydować sama?",
  team: "Z kim ta osoba będzie pracować na co dzień?",
  salary: "Ile ta osoba zarobi? Podaj kwotę brutto miesięcznie od–do.",
  process: "Ile etapów ma rekrutacja i z kim rozmawia kandydat?",
};

const categoryPrompts: Record<JobCategory, Partial<Record<EssentialKey, string>>> = {
  build: {
    firstTask: "Co ta osoba zbuduje albo poprawi w pierwszym miesiącu? Jedno konkretne zadanie.",
    ownership: "Którą część systemu ta osoba zbuduje sama, a co robią inni?",
    decisions: "Jakie wybory techniczne ta osoba podejmie bez pytania innych?",
  },
  apply: {
    firstTask: "Jaką pracę ta osoba wykona z AI w pierwszym miesiącu? Jedno konkretne zadanie.",
    ownership: "Za jaki zakres pracy ta osoba odpowiada sama, a co zostaje po stronie innych?",
    decisions: "Co ta osoba może zmienić w swoim sposobie pracy bez zgody innych?",
  },
  lead: {
    firstTask: "Jaką zmianę albo decyzję ta osoba poprowadzi w pierwszym miesiącu?",
    ownership: "Za jaki obszar i za których ludzi ta osoba odpowiada, a za co ktoś inny?",
    decisions: "Jakie decyzje ta osoba podejmuje sama, a które wymagają zgody wyżej?",
  },
};

export function essentialPrompt(key: EssentialKey, category: JobCategory) {
  return categoryPrompts[category][key] ?? sharedPrompts[key];
}

export const categoryDescriptions: Record<JobCategory, string> = {
  build: "Będzie tworzyć modele, systemy i produkty wykorzystujące AI.",
  apply: "Będzie używać AI, żeby lepiej wykonywać swoją właściwą pracę.",
  lead: "Będzie prowadzić zmianę, decyzje i zespoły w świecie AI.",
};

// Section headings already recognized by the public description parser.
const descriptionHeadings: Record<TextEssentialKey, string> = {
  firstTask: "Pierwszy projekt",
  ownership: "Zakres odpowiedzialności",
  decisions: "Decyzje i odpowiedzialność",
  team: "Zespół i współpraca",
  process: "Proces rekrutacji",
};

export type EssentialValues = Partial<Record<TextEssentialKey, string>>;
export type EssentialStatuses = Partial<Record<EssentialKey, EssentialStatus>>;

export type EssentialState = "filled" | "skipped" | "pending_expert" | "answer_ready" | "missing";

export function essentialState(
  key: EssentialKey,
  values: EssentialValues,
  statuses: EssentialStatuses,
  salary: { min?: number; max?: number },
  pending: ReadonlySet<EssentialKey> = new Set(),
): EssentialState {
  const filled =
    key === "salary"
      ? salary.min !== undefined || salary.max !== undefined
      : Boolean(values[key]?.trim());
  if (filled) return "filled";
  const status = statuses[key];
  if (pending.has(key)) return "pending_expert";
  if (status?.state === "skipped") return "skipped";
  return "missing";
}

export function isReady(state: EssentialState) {
  return state === "filled";
}

/**
 * Simulated AI proposal: built only from what the author provided, never padded with filler.
 * Like the fixture jobs it opens with a plain paragraph: the offer page already shows the title
 * and its own “O roli” heading above the description.
 */
export function proposeDescription(brief: string, values: EssentialValues) {
  const parts = [brief.trim().slice(0, 8000)];
  for (const key of textEssentialKeys) {
    const value = values[key]?.trim();
    if (value) parts.push("", `### ${descriptionHeadings[key]}`, "", value);
  }
  return parts.join("\n").trim();
}

/** Simulated AI summary: the first complete sentence of the brief, never cut mid-word. */
export function proposeSummary(brief: string, max = 200) {
  const text = brief.trim().replace(/\s+/g, " ");
  const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text;
  if (sentence.length <= max) return sentence;
  const cut = sentence.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}
