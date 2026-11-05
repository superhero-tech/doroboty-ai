import { z } from "zod";

export const WORK_SAMPLE_SLUG = "ai-operations-specialist";
export const sampleCategories = [
  { value: "payments", label: "Płatności" },
  { value: "access", label: "Dostęp do konta" },
  { value: "other", label: "Pozostałe / do wyjaśnienia" },
];
export const sampleMessages = [
  {
    id: "M1",
    text: "Za tę samą fakturę pobrano opłatę dwa razy. Proszę o sprawdzenie płatności.",
    proposed: "payments",
  },
  {
    id: "M2",
    text: "Po zmianie telefonu nie mogę zalogować się do panelu. Kod dostępu nie dochodzi.",
    proposed: "payments",
  },
  {
    id: "M3",
    text: "Czy mogę otrzymać zestawienie użycia za poprzedni miesiąc? Nie zgłaszam problemu z opłatą.",
    proposed: "payments",
  },
];
const category = z.enum(["", "payments", "access", "other"]);
export const workSampleInputSchema = z.object({
  prompt: z.string().trim().max(4000),
  generated: z.boolean(),
  categories: z.array(category).length(sampleMessages.length),
  explanation: z.string().trim().max(12000),
});
export const completedWorkSampleInputSchema = workSampleInputSchema.refine(
  (value) =>
    value.generated &&
    value.prompt.length >= 10 &&
    value.categories.every(Boolean) &&
    value.explanation.length >= 20,
  {
    message:
      "Wpisz polecenie (min. 10 znaków), wygeneruj propozycję, sprawdź kategorie i opisz weryfikację (min. 20 znaków).",
  },
);
export const workSampleSchema = workSampleInputSchema
  .extend({
    candidateId: z.string().min(1).max(100),
    jobId: z.string().min(1).max(100),
    taskVersion: z.literal("operations-v1"),
    completedAt: z.iso.datetime().optional(),
  })
  .refine(
    (sample) => !sample.completedAt || completedWorkSampleInputSchema.safeParse(sample).success,
    { message: "Incomplete work sample" },
  );
export type WorkSampleInput = z.infer<typeof workSampleInputSchema>;
export type WorkSample = z.infer<typeof workSampleSchema>;
export function categoryLabel(value: string) {
  return sampleCategories.find((category) => category.value === value)?.label ?? "Nie wybrano";
}
