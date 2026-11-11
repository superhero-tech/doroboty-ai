import { z } from "zod";

const short = z.string().max(200);
const text = z.string().max(1600);
export const draftSchema = z.object({
  version: z.literal(1),
  title: short,
  context: text,
  role: short,
  period: short,
  target: text,
  own: text,
  shared: text,
  others: text,
  decisions: text,
  result: text,
  measurement: text,
  limits: text,
  evidence: text,
  link: z.string().max(600),
});
export type ProjectDraft = z.infer<typeof draftSchema>;
export type FieldName = Exclude<keyof ProjectDraft, "version">;
// Profile projects are reusable experience; relevance to a job belongs to an application.
export const profileProjectDraftSchema = draftSchema.omit({ target: true });
export type ProfileProjectDraft = z.infer<typeof profileProjectDraftSchema>;
export const blankDraft: ProjectDraft = {
  version: 1,
  title: "",
  context: "",
  role: "",
  period: "",
  target: "",
  own: "",
  shared: "",
  others: "",
  decisions: "",
  result: "",
  measurement: "",
  limits: "",
  evidence: "",
  link: "",
};
export const projectSchema = draftSchema.extend({
  title: short.trim().min(3, "Podaj nazwę projektu (co najmniej 3 znaki)."),
  context: text.trim().min(20, "Opisz problem i odbiorców w co najmniej 20 znakach."),
  role: short.trim().min(3, "Podaj swoją rolę w projekcie."),
  period: short.trim().min(3, "Podaj okres i etap swojego udziału."),
  target: text.trim().min(20, "Opisz zadanie w roli, do której aplikujesz (min. 20 znaków)."),
  own: text.trim().min(30, "Opisz konkretne własne czynności (min. 30 znaków)."),
  shared: text
    .trim()
    .min(10, "Rozdziel wspólną pracę lub napisz, że jej nie było (min. 10 znaków)."),
  others: text
    .trim()
    .min(10, "Podaj zakres innych osób lub napisz, że pracowano samodzielnie (min. 10 znaków)."),
  decisions: text.trim().min(20, "Podaj przykład decyzji i kto ją zatwierdził (min. 20 znaków)."),
  result: text.trim().min(20, "Opisz rezultat lub obecny stan projektu (min. 20 znaków)."),
  measurement: text
    .trim()
    .min(10, "Podaj źródło pomiaru lub napisz, czego nie zmierzono (min. 10 znaków)."),
  limits: text.trim().min(10, "Wskaż ograniczenia, niewiadome i zakres poufny (min. 10 znaków)."),
  link: z
    .string()
    .trim()
    .max(600)
    .refine((value) => {
      if (!value) return true;
      try {
        return ["https:", "http:"].includes(new URL(value).protocol);
      } catch {
        return false;
      }
    }, "Podaj pełny adres https:// lub http:// albo pozostaw pole puste."),
});

export const profileProjectSchema = projectSchema.omit({ target: true });

// Synthetic workshop example; independent of personas, research records and E1 stimuli.
export const exampleDraft: ProjectDraft = {
  version: 1,
  title: "Kategoryzacja wiadomości w obsłudze",
  context:
    "Wiadomości trafiały do wspólnej kolejki. Zespół obsługi potrzebował reguł kierowania ich do odpowiednich osób.",
  role: "Specjalistka procesu obsługi",
  period: "Marzec–maj 2026; przygotowanie i pilotaż w jednym zespole",
  target:
    "Rola Apply: opisanie procesu, uzgodnienie kategorii z użytkownikami i prowadzenie pilotażu. Integrację wykonuje programista.",
  own: "Samodzielnie opisałam obieg wiadomości, przygotowałam scenariusze pilotażu i zebrałam uwagi użytkowników. Po uruchomieniu sprawdzałam, czy zespół korzysta z kategoryzacji. Efektem mojej pracy były mapa procesu i lista uwag z pilotażu.",
  shared:
    "Kategorie ustaliliśmy wspólnie z obsługą. Ja przygotowałam propozycję i prowadziłam spotkanie; użytkownicy wskazali wyjątki i sprawdzili nazwy kategorii.",
  others:
    "Programistka wykonała integrację i konfigurację modelu. Lider zatwierdził budżet i uruchomienie. Nie programowałam integracji ani nie odpowiadałam za budżet.",
  decisions:
    "Zaproponowałam osobną kategorię dla reklamacji po analizie wyjątków. Zespół uzgodnił reguły, a lider zatwierdził zakres pilotażu. Nie decydowałam o wyborze modelu.",
  result:
    "Zespół rozpoczął korzystanie z kategoryzacji w codziennej pracy. To rezultat pracy zespołowej; moja część obejmowała proces i pilotaż.",
  measurement:
    "Obserwowałam używanie kategorii i zbierałam uwagi. Nie mierzyliśmy czasu obsługi przed i po zmianie; nie podaję procentowej poprawy.",
  limits:
    "Nie wiem, jak długo rozwiązanie działało po pilotażu. Nie udostępniam danych klientów, firmowego kodu ani nazwy pracodawcy. Mogę wyjaśnić metodę i swój zakres.",
  evidence:
    "Mogę pokazać samodzielnie przygotowany, fikcyjny schemat procesu bez danych firmy. Nie jest to oryginalny dokument z wdrożenia.",
  link: "",
};
