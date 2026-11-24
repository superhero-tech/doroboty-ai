export const applicationStatusLabels = {
  submitted: "Nowa aplikacja",
  in_review: "W przeglądzie",
  interview: "Etap rozmowy",
  continued: "Kolejny etap",
  rejected: "Aplikacja odrzucona",
  withdrawn: "Wycofana",
  hired: "Decyzja pozytywna",
} as const;

export const applicationStageLabels = {
  submitted: "Aplikacja wysłana",
  reviewed: "Zgłoszenie zweryfikowane",
  interview_invited: "Zaproszenie na rozmowę",
  first_conversation_held: "Rozmowa przeprowadzona",
  continued: "Przejście do kolejnego etapu",
  rejected: "Aplikacja odrzucona",
  withdrawn: "Aplikacja wycofana",
  hired: "Decyzja pozytywna",
} as const;

export type ApplicationStatus = keyof typeof applicationStatusLabels;

export function applicationStatusLabel(status: string) {
  return applicationStatusLabels[status as ApplicationStatus] ?? "Status nieznany";
}

export const applicationStatusDescriptions: Record<string, string> = {
  submitted: "Pracodawca otrzymał aplikację. Na tym etapie nie musisz nic robić.",
  in_review: "Pracodawca przegląda Twoje zgłoszenie.",
  interview: "Proces jest na etapie rozmowy. Szczegóły zaproszenia otrzymasz od pracodawcy.",
  continued: "Pracodawca chce kontynuować proces i skontaktuje się w sprawie kolejnego kroku.",
  rejected: "Pracodawca odrzucił tę aplikację.",
  withdrawn: "Aplikacja została przez Ciebie wycofana i nie bierze już udziału w procesie.",
  hired: "Proces zakończył się pozytywną decyzją.",
};

export function applicationStatusDescription(status: string) {
  return applicationStatusDescriptions[status] ?? "Status aplikacji został zaktualizowany.";
}

export function applicationStageLabel(stage: string) {
  return applicationStageLabels[stage as keyof typeof applicationStageLabels] ?? "Zmiana etapu";
}

export function applicationStatusClass(status: string) {
  if (status === "hired" || status === "continued") {
    return "bg-[var(--gui-success-transparent)] text-[var(--gui-text)]";
  }
  if (status === "rejected" || status === "withdrawn") {
    return "bg-[var(--gui-error-transparent)] text-[var(--gui-text)]";
  }
  if (status === "interview") {
    return "bg-[var(--gui-color-1-transparent)] text-[var(--gui-text)]";
  }
  return "bg-secondary text-secondary-foreground";
}
