/**
 * Post-interview assessment (I1). Criteria and example notes are prepared scenario fixtures,
 * not validated rubrics. The "organize" step is a deterministic keyword simulation of an AI
 * helper: it only assigns note lines to criteria and never produces a rating.
 */
export const ratings = ["develop", "partial", "meets", "exceeds"] as const;
export type Rating = (typeof ratings)[number];
export const ratingLabels: Record<Rating, string> = {
  develop: "Do rozwinięcia",
  partial: "Częściowo spełnia",
  meets: "Spełnia",
  exceeds: "Przewyższa",
};

export type Criterion = { label: string; hint: string; keywords: string[] };
type Rubric = { criteria: Criterion[]; exampleNotes: string };

const rubrics: Record<string, Rubric> = {
  // BrightLabs — AI Product Manager
  "20000000-0000-4000-8000-000000000001": {
    criteria: [
      {
        label: "Praca z AI w produkcie",
        hint: "Czy kandydat sam podejmował decyzje o modelu, jakości odpowiedzi i roli człowieka?",
        keywords: ["model", "ai", "asystent", "prompt", "halucyn", "llm", "automatyz"],
      },
      {
        label: "Badania z użytkownikami",
        hint: "Czy opisał konkretne badania i to, co z nich wynikło dla produktu?",
        keywords: ["badan", "wywiad", "rozmów", "użytkownik", "konsultant", "test"],
      },
      {
        label: "Mierzenie efektu",
        hint: "Czy potrafi wskazać miarę sukcesu i wynik przed oraz po zmianie?",
        keywords: ["%", "mierz", "metryk", "wynik", "kpi", "czas", "spadł", "wzrósł"],
      },
    ],
    exampleNotes: [
      "Opisała wdrożenie asystenta AI do obsługi zgłoszeń: sama wybrała model i ustaliła, kiedy odpowiedź trafia do człowieka.",
      "Przed wdrożeniem przeprowadziła 12 wywiadów z konsultantami; wyszło, że potrzebują podglądu źródła odpowiedzi.",
      "Po wdrożeniu czas odpowiedzi spadł o 30%; mierzyła też odsetek odpowiedzi poprawianych ręcznie.",
      "Dopytywała o skład zespołu i budżet na narzędzia.",
    ].join("\n"),
  },
  // BrightLabs — AI Operations Specialist
  "20000000-0000-4000-8000-000000000004": {
    criteria: [
      {
        label: "Automatyzacja procesów",
        hint: "Czy zautomatyzował realny proces i wie, gdzie automatyzacja się kończy?",
        keywords: ["automatyz", "proces", "workflow", "skrypt", "integrac"],
      },
      {
        label: "Kontrola jakości wyników AI",
        hint: "Jak sprawdzał, czy wyniki AI są poprawne, i co robił z błędami?",
        keywords: ["jakoś", "błęd", "sprawdz", "weryfik", "próbk", "halucyn"],
      },
      {
        label: "Dokumentowanie procedur",
        hint: "Czy zostawił procedurę, z której korzysta zespół?",
        keywords: ["dokument", "procedur", "instrukc", "zespół", "szkoleni"],
      },
    ],
    exampleNotes: [
      "Zautomatyzował przypisywanie zgłoszeń w helpdesku; ręczne przypadki zostawił dla zespołu.",
      "Co tydzień sprawdzał próbkę 50 odpowiedzi i zgłaszał powtarzające się błędy.",
      "Przygotował instrukcję dla zespołu wsparcia i przeprowadził krótkie szkolenie.",
    ].join("\n"),
  },
  // Northstar Health — Staff AI Engineer
  "20000000-0000-4000-8000-000000000002": {
    criteria: [
      {
        label: "Wdrażanie modeli na produkcję",
        hint: "Czy prowadził model od prototypu do produkcji i utrzymania?",
        keywords: ["produkc", "wdroż", "deploy", "monitor", "utrzyma"],
      },
      {
        label: "Ewaluacja modeli",
        hint: "Jak mierzył jakość modelu i decydował, że jest wystarczająco dobry?",
        keywords: ["ewaluac", "metryk", "zbiór testowy", "jakoś", "benchmark", "%"],
      },
      {
        label: "Decyzje architektoniczne",
        hint: "Czy uzasadnił wybór architektury i jej koszty?",
        keywords: ["architekt", "koszt", "skalow", "opóźnien", "infrastruktur"],
      },
    ],
    exampleNotes: [
      "Wdrożył model klasyfikacji dokumentów na produkcję i ustawił monitoring dryfu.",
      "Przygotował zbiór testowy z lekarzami; trafność wzrosła z 81% do 89%.",
      "Wybrał mniejszy model ze względu na koszt i opóźnienia odpowiedzi.",
    ].join("\n"),
  },
  // Northstar Health — Growth Lead — AI Products
  "20000000-0000-4000-8000-000000000005": {
    criteria: [
      {
        label: "Eksperymenty wzrostowe",
        hint: "Czy zaprojektował eksperyment z hipotezą i decyzją po wyniku?",
        keywords: ["eksperyment", "test a/b", "a/b", "hipotez"],
      },
      {
        label: "Analiza lejka",
        hint: "Czy potrafi wskazać, gdzie w lejku traci użytkowników i dlaczego?",
        keywords: ["lejek", "lejka", "konwersj", "dane", "analiz", "%"],
      },
      {
        label: "Współpraca z zespołem produktu",
        hint: "Jak wdrażał wnioski razem z produktem i inżynierami?",
        keywords: ["zespół", "produkt", "inżynier", "współprac", "priorytet"],
      },
    ],
    exampleNotes: [
      "Prowadził test A/B nowego onboardingu z jasną hipotezą i progiem decyzji.",
      "Z analizy lejka wynikło, że 40% użytkowników odpada na weryfikacji konta.",
      "Ustalał priorytety wspólnie z zespołem produktu i inżynierami.",
    ].join("\n"),
  },
};

const fallback: Rubric = {
  criteria: [
    {
      label: "Konkretny przykład z pracy",
      hint: "Czy kandydat opisał własną rolę w konkretnym projekcie?",
      keywords: ["projekt", "wdroż", "przygotował", "zrobił", "prowadził"],
    },
    {
      label: "Wyjaśnianie decyzji",
      hint: "Czy uzasadnił wybory i przyjęte założenia?",
      keywords: ["dlaczego", "uzasadn", "decyz", "założen", "wybrał"],
    },
    {
      label: "Mierzenie wyniku",
      hint: "Czy wskazał miarę i wynik swojej pracy?",
      keywords: ["%", "mierz", "wynik", "metryk", "czas"],
    },
  ],
  exampleNotes: [
    "Opisała projekt automatyzacji obsługi zgłoszeń, który sama prowadziła.",
    "Wyjaśniła, dlaczego wybrała prostsze rozwiązanie i jakie przyjęła założenia.",
    "Mierzyła czas obsługi; spadł o 30% w ciągu kwartału.",
  ].join("\n"),
};

export function rubricFor(jobId: string): Rubric {
  return rubrics[jobId] ?? fallback;
}

export type Organized = { evidence: string[]; unmatched: string[] };

/** Simulated AI helper: assigns note lines to criteria by label prefix, then by keywords. */
export function organizeNotes(notes: string, criteria: Criterion[]): Organized {
  const evidence = criteria.map(() => [] as string[]);
  const unmatched: string[] = [];
  const lines = notes
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
  for (const line of lines) {
    const lower = line.toLocaleLowerCase("pl");
    const labelled = criteria.findIndex((c) =>
      lower.startsWith(`${c.label.toLocaleLowerCase("pl")}:`),
    );
    if (labelled >= 0) {
      evidence[labelled].push(line.slice(line.indexOf(":") + 1).trim());
      continue;
    }
    const scores = criteria.map((c) => c.keywords.filter((k) => lower.includes(k)).length);
    const best = Math.max(...scores);
    if (best === 0) unmatched.push(line);
    else evidence[scores.indexOf(best)].push(line);
  }
  return { evidence: evidence.map((items) => items.join("\n")), unmatched };
}
