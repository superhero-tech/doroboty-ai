import { z } from "zod";
import marketplace from "./data/marketplace.json" with { type: "json" };
import people from "./data/people.json" with { type: "json" };
import type { JobWithCompany } from "@/features/jobs/types";
import {
  essentialKeys,
  essentialState,
  skipReasons,
  textEssentialKeys,
  type EssentialKey,
} from "./essentials";

const id = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/);
const shortText = z.string().trim().min(1).max(200);
const text = z.string().trim().max(12000);
export const MIN_APPLICATION_ANSWER_LENGTH = 20;
const essentialValuesSchema = z.object(
  Object.fromEntries(textEssentialKeys.map((key) => [key, text.optional()])) as Record<
    (typeof textEssentialKeys)[number],
    z.ZodOptional<typeof text>
  >,
);
// Saves from before 2026-11-07 stored "in brief" as its own state; read it as a skip reason.
const essentialStatusSchema = z.preprocess(
  (value) =>
    value && typeof value === "object" && (value as { state?: unknown }).state === "in_brief"
      ? { state: "skipped", reason: "in_brief" }
      : value,
  z.object({ state: z.literal("skipped"), reason: z.enum(skipReasons) }),
);
const essentialStatusesSchema = z.object(
  Object.fromEntries(essentialKeys.map((key) => [key, essentialStatusSchema.optional()])) as Record<
    EssentialKey,
    z.ZodOptional<typeof essentialStatusSchema>
  >,
);
const companySchema = z.object({
  id,
  slug: id,
  name: shortText,
  summary: text,
  description: text,
  websiteUrl: z.string().max(500),
  location: shortText,
  sizeLabel: shortText,
  logoUrl: z
    .string()
    .regex(/^\/(?!\/)/)
    .optional(),
});
export const jobSchema = z
  .object({
    id,
    slug: id,
    companyId: id,
    title: shortText,
    summary: text,
    description: text,
    category: z.enum(["build", "apply", "lead"]),
    function: z.enum(["product", "engineering", "data", "design", "marketing", "operations"]),
    remoteStatus: z.enum(["onsite", "hybrid", "remote"]),
    locations: z.array(shortText).min(1).max(10),
    coordinates: z
      .object({ latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180) })
      .optional(),
    seniority: z.enum(["junior", "mid", "senior", "lead"]),
    contract: z.enum(["employment", "b2b", "mandate"]),
    salaryMin: z.number().nonnegative().optional(),
    salaryMax: z.number().nonnegative().optional(),
    salaryCurrency: z.enum(["PLN", "EUR"]).optional(),
    salaryPeriod: z.enum(["month", "year"]).optional(),
    salaryKind: z.enum(["gross", "net"]).optional(),
    publicationStatus: z.enum(["draft", "review", "published", "hidden", "expired", "archived"]),
    publishedAt: z.iso.datetime(),
    expiryAt: z.iso.datetime(),
    verificationStatus: z.enum(["unverified", "editorial", "employer_verified"]),
    sourceBrief: text.optional(),
    generatedDescription: text.optional(),
    essentials: essentialValuesSchema.optional(),
    essentialStatus: essentialStatusesSchema.optional(),
  })
  .refine(
    (job) =>
      job.salaryMin === undefined || job.salaryMax === undefined || job.salaryMin <= job.salaryMax,
    { path: ["salaryMax"], message: "Salary maximum must not be below minimum" },
  )
  // Drafts may be incomplete; anything visible to candidates keeps the original minimums.
  .refine((job) => job.publicationStatus === "draft" || job.summary.length >= 10, {
    path: ["summary"],
    message: "Summary must have at least 10 characters",
  })
  .refine((job) => job.publicationStatus === "draft" || job.description.length >= 30, {
    path: ["description"],
    message: "Description must have at least 30 characters",
  });
export type JobRecord = z.infer<typeof jobSchema>;
const helpAnswerSchema = z.object({
  key: z.enum(essentialKeys),
  mode: z.enum(["text", "voice"]),
  text,
  undecided: z.boolean(),
  resolution: z.enum(["accepted", "edited", "rejected"]).optional(),
});
const helpCorrectionSchema = z.object({
  key: z.enum(textEssentialKeys),
  original: text,
  text: text.min(1),
  resolution: z.enum(["accepted", "kept", "merged"]).optional(),
});
export const helpRequestSchema = z.object({
  id,
  jobId: id,
  companyId: id,
  authorId: id,
  expertEmail: z.union([z.literal(""), z.email().max(200)]),
  expertName: shortText,
  expertRole: z.string().trim().max(200),
  message: text,
  channel: z.enum(["email", "link"]),
  questions: z.array(z.enum(essentialKeys)).min(1).max(essentialKeys.length),
  known: z.array(z.object({ key: z.enum(textEssentialKeys), text: text.min(1) })).max(5),
  // Brief snapshot shown to the expert as context; requests saved before it was added have "".
  brief: text.default(""),
  status: z.enum(["sent", "answered"]),
  createdAt: z.iso.datetime(),
  answeredAt: z.iso.datetime().optional(),
  answers: z.array(helpAnswerSchema).max(essentialKeys.length),
  corrections: z.array(helpCorrectionSchema).max(5),
  note: z.object({ mode: z.enum(["text", "voice"]), text: text.min(1) }).optional(),
  noteResolution: z.enum(["added", "dismissed"]).optional(),
});
export type HelpRequest = z.infer<typeof helpRequestSchema>;
export const experimentEventSchema = z.object({
  at: z.iso.datetime(),
  jobId: id,
  type: z.enum([
    "draft_saved",
    "help_requested",
    "expert_answered",
    "answer_resolved",
    "correction_resolved",
    "note_resolved",
    "published",
  ]),
  detail: z.record(z.string(), z.unknown()),
});
export const profileSchema = z.object({
  name: shortText,
  headline: shortText,
  bio: text,
  location: shortText,
});
const personSchema = profileSchema.extend({
  id,
  role: z.enum(["candidate", "employer", "operator"]),
  companyId: id.optional(),
  cv: text,
  exampleScore: z.number().int().min(0).max(100),
  exampleSummary: text,
});
export const stages = [
  "submitted",
  "reviewed",
  "interview_invited",
  "first_conversation_held",
  "continued",
  "rejected",
  "withdrawn",
  "hired",
] as const;
export type Stage = (typeof stages)[number];
export const stageLabels: Record<Stage, string> = {
  submitted: "Aplikacja wysłana",
  reviewed: "W przeglądzie",
  interview_invited: "Zaproszenie na rozmowę",
  first_conversation_held: "Pierwsza rozmowa odbyta",
  continued: "Kolejny etap",
  rejected: "Proces zakończony",
  withdrawn: "Wycofana",
  hired: "Zatrudnienie",
};
export const nextStages: Record<Stage, Stage[]> = {
  submitted: ["reviewed", "rejected"],
  reviewed: ["interview_invited", "rejected"],
  interview_invited: ["first_conversation_held", "rejected"],
  first_conversation_held: ["continued", "rejected"],
  continued: ["hired", "rejected"],
  rejected: [],
  withdrawn: [],
  hired: [],
};
const applicationSchema = z.object({
  id,
  candidateId: id,
  jobId: id,
  companyId: id,
  jobTitle: shortText,
  candidateName: shortText,
  cv: text.min(20),
  answer: text.min(MIN_APPLICATION_ANSWER_LENGTH),
  sourceNotes: text,
  generatedAnswer: text,
  score: z.number().int().min(0).max(100),
  summary: text,
  stage: z.enum(stages),
  events: z
    .array(z.object({ stage: z.enum(stages), at: z.iso.datetime(), note: text }))
    .min(1)
    .max(30),
});
const draftSchema = z.object({
  candidateId: id,
  jobId: id,
  notes: text,
  generated: text,
  answer: text,
});
export const stateSchema = z
  .object({
    version: z.literal(1),
    activePersonId: id.nullable(),
    companies: z.array(companySchema).min(1).max(200),
    jobs: z.array(jobSchema).min(1).max(1000),
    people: z.array(personSchema).min(1).max(100),
    applications: z.array(applicationSchema).max(2000),
    saved: z.array(z.object({ candidateId: id, jobId: id })).max(5000),
    drafts: z.array(draftSchema).max(1000),
    // Added for E03; older saves and exports without these lists stay valid.
    helpRequests: z.array(helpRequestSchema).max(500).default([]),
    experimentLog: z.array(experimentEventSchema).max(5000).default([]),
  })
  .superRefine((s, ctx) => {
    const problem = (message: string) => ctx.addIssue({ code: "custom", message });
    for (const list of [s.companies, s.jobs, s.people, s.applications]) {
      if (new Set(list.map((x) => x.id)).size !== list.length) problem("Duplicate identifiers");
    }
    if (
      new Set(s.jobs.map((x) => x.slug)).size !== s.jobs.length ||
      new Set(s.companies.map((x) => x.slug)).size !== s.companies.length
    )
      problem("Duplicate slugs");
    const companyIds = new Set(s.companies.map((x) => x.id));
    const jobs = new Map(s.jobs.map((x) => [x.id, x]));
    const candidates = new Set(s.people.filter((x) => x.role === "candidate").map((x) => x.id));
    if (s.activePersonId !== null && !s.people.some((x) => x.id === s.activePersonId))
      problem("Unknown active person");
    for (const p of s.people)
      if (p.role === "employer" && (!p.companyId || !companyIds.has(p.companyId)))
        problem("Unknown employer company");
    for (const j of s.jobs) if (!companyIds.has(j.companyId)) problem("Unknown job company");
    const keys = new Set<string>();
    for (const a of s.applications) {
      const key = `${a.candidateId}:${a.jobId}`;
      if (
        !candidates.has(a.candidateId) ||
        jobs.get(a.jobId)?.companyId !== a.companyId ||
        keys.has(key)
      )
        problem("Invalid application reference");
      keys.add(key);
      if (a.events[0]?.stage !== "submitted" || a.events.at(-1)?.stage !== a.stage)
        problem("Invalid application history");
      for (let i = 1; i < a.events.length; i++) {
        const before = a.events[i - 1];
        const after = a.events[i];
        if (!(
          nextStages[before.stage].includes(after.stage) ||
          (after.stage === "withdrawn" &&
            !["hired", "rejected", "withdrawn"].includes(before.stage))
        ))
          problem("Invalid stage transition");
        if (after.at < before.at) problem("Invalid event order");
      }
    }
    if (new Set(s.helpRequests.map((x) => x.id)).size !== s.helpRequests.length)
      problem("Duplicate identifiers");
    for (const r of s.helpRequests)
      if (jobs.get(r.jobId)?.companyId !== r.companyId) problem("Invalid help request reference");
    for (const list of [s.saved, s.drafts]) {
      const pairs = new Set<string>();
      for (const item of list) {
        const key = `${item.candidateId}:${item.jobId}`;
        if (!candidates.has(item.candidateId) || !jobs.has(item.jobId) || pairs.has(key))
          problem("Invalid candidate/job reference");
        pairs.add(key);
      }
    }
  });
export type State = z.infer<typeof stateSchema>;
export type Person = State["people"][number];
export type Application = State["applications"][number];
export type Action =
  | { type: "select_person"; id: string | null }
  | { type: "profile"; value: z.infer<typeof profileSchema> }
  | { type: "toggle_saved"; jobId: string }
  | { type: "draft"; jobId: string; notes: string; generated: string; answer: string }
  | {
      type: "submit";
      jobId: string;
      notes: string;
      generated: string;
      answer: string;
      consent: boolean;
    }
  | { type: "stage"; applicationId: string; stage: Stage; note: string }
  | { type: "withdraw"; applicationId: string }
  | { type: "publish"; job: JobRecord }
  | { type: "save_job_draft"; job: JobRecord }
  | {
      type: "request_help";
      requestId: string;
      job: JobRecord;
      expertEmail: string;
      expertName: string;
      expertRole: string;
      message: string;
      channel: "email" | "link";
      questions: EssentialKey[];
    }
  | {
      type: "expert_answer";
      requestId: string;
      answers: HelpRequest["answers"];
      corrections: HelpRequest["corrections"];
      note?: HelpRequest["note"];
    }
  | {
      type: "resolve_help";
      requestId: string;
      target:
        | { kind: "answer"; key: EssentialKey; resolution: "accepted" | "edited" | "rejected" }
        | {
            kind: "correction";
            key: (typeof textEssentialKeys)[number];
            resolution: "accepted" | "kept" | "merged";
          }
        | { kind: "note"; resolution: "added" | "dismissed" };
    }
  | { type: "company"; name: string; description: string };

/** Missing, skipped and in-brief elements at a point in time, for the E03 session log. */
export function essentialSnapshot(job: JobRecord) {
  const values = job.essentials ?? {};
  const statuses = job.essentialStatus ?? {};
  const salary = { min: job.salaryMin, max: job.salaryMax };
  const result: Record<string, string> = {};
  for (const key of essentialKeys) {
    const state = essentialState(key, values, statuses, salary);
    const status = statuses[key];
    result[key] =
      state === "skipped" && status?.state === "skipped" ? `skipped:${status.reason}` : state;
  }
  return result;
}

export function initialState(): State {
  const state = stateSchema.parse({
    version: 1,
    activePersonId: null,
    ...marketplace,
    people,
    applications: [],
    saved: [],
    drafts: [],
  });
  const bob = state.people.find((x) => x.id === "candidate-marek")!;
  const job = state.jobs[0];
  state.applications.push({
    id: "application-example",
    candidateId: bob.id,
    jobId: job.id,
    companyId: job.companyId,
    jobTitle: job.title,
    candidateName: bob.name,
    cv: bob.cv,
    answer:
      "Pracowałem nad automatyzacją obsługi zgłoszeń. Poprowadziłem badania z użytkownikami i wdrożenie, które skróciło czas odpowiedzi o 25%. Chętnie opowiem o decyzjach i ograniczeniach tego projektu.",
    sourceNotes: "",
    generatedAnswer: "",
    score: bob.exampleScore,
    summary: bob.exampleSummary,
    stage: "submitted",
    events: [{ stage: "submitted", at: "2026-11-02T09:00:00.000Z", note: "" }],
  });
  return stateSchema.parse(state);
}
export function publishedJobs(state: State): JobWithCompany[] {
  return state.jobs
    .filter((x) => x.publicationStatus === "published")
    .map((job) => ({ ...job, company: state.companies.find((x) => x.id === job.companyId)! }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function currentPerson(state: State) {
  return state.people.find((x) => x.id === state.activePersonId);
}
export function transition(
  state: State,
  action: Action,
  now = new Date().toISOString(),
  newId: string = crypto.randomUUID(),
): State {
  const s = structuredClone(state);
  const person = currentPerson(s);
  const fail = (message: string): never => {
    throw new Error(message);
  };
  const candidate = () => {
    if (person?.role !== "candidate") return fail("Wybierz profil kandydata.");
    return person;
  };
  const employer = () => {
    if (person?.role !== "employer") return fail("Wybierz profil pracodawcy.");
    return person;
  };
  if (action.type === "select_person") {
    if (action.id !== null && !s.people.some((x) => x.id === action.id))
      fail("Nie znaleziono osoby.");
    s.activePersonId = action.id;
  } else if (action.type === "profile")
    Object.assign(candidate(), profileSchema.parse(action.value));
  else if (action.type === "toggle_saved") {
    const p = candidate();
    if (!s.jobs.some((x) => x.id === action.jobId)) fail("Nie znaleziono oferty.");
    const index = s.saved.findIndex((x) => x.candidateId === p.id && x.jobId === action.jobId);
    if (index >= 0) s.saved.splice(index, 1);
    else s.saved.push({ candidateId: p.id, jobId: action.jobId });
  } else if (action.type === "draft") {
    const p = candidate();
    const draft = draftSchema.parse({ candidateId: p.id, ...action });
    s.drafts = s.drafts.filter((x) => !(x.candidateId === p.id && x.jobId === action.jobId));
    s.drafts.push(draft);
  } else if (action.type === "submit") {
    const p = candidate();
    const job = s.jobs.find((x) => x.id === action.jobId && x.publicationStatus === "published");
    if (!job) return fail("Oferta nie jest dostępna.");
    if (!action.consent) fail("Zatwierdź treść i zgodę na przesłanie aplikacji.");
    if (s.applications.some((x) => x.candidateId === p.id && x.jobId === job.id))
      fail("Aplikacja na tę ofertę została już wysłana.");
    s.applications.push(
      applicationSchema.parse({
        id: newId,
        candidateId: p.id,
        jobId: job.id,
        companyId: job.companyId,
        jobTitle: job.title,
        candidateName: p.name,
        cv: p.cv,
        answer: action.answer,
        sourceNotes: action.notes,
        generatedAnswer: action.generated,
        score: p.exampleScore,
        summary: p.exampleSummary,
        stage: "submitted",
        events: [{ stage: "submitted", at: now, note: "" }],
      }),
    );
    s.drafts = s.drafts.filter((x) => !(x.candidateId === p.id && x.jobId === job.id));
  } else if (action.type === "stage" || action.type === "withdraw") {
    const application = s.applications.find((x) => x.id === action.applicationId);
    if (!application) return fail("Nie znaleziono aplikacji.");
    const stage = action.type === "withdraw" ? "withdrawn" : action.stage;
    if (action.type === "withdraw") {
      const p = candidate();
      if (
        application.candidateId !== p.id ||
        ["hired", "rejected", "withdrawn"].includes(application.stage)
      )
        fail("Nie można wycofać tej aplikacji.");
    } else {
      const p = employer();
      if (application.companyId !== p.companyId || !nextStages[application.stage].includes(stage))
        fail("Ta zmiana etapu nie jest dostępna.");
    }
    application.stage = stage;
    application.events.push({ stage, at: now, note: action.type === "stage" ? action.note : "" });
  } else if (action.type === "publish" || action.type === "save_job_draft") {
    const p = employer();
    const job = jobSchema.parse({
      ...action.job,
      publicationStatus: action.type === "publish" ? "published" : "draft",
    });
    if (job.companyId !== p.companyId) fail("Wybierz ofertę własnej firmy.");
    const index = s.jobs.findIndex((x) => x.id === job.id);
    if (index >= 0) {
      if (s.jobs[index].companyId !== p.companyId) fail("Nie można zmienić tej oferty.");
      if (action.type === "save_job_draft" && s.jobs[index].publicationStatus !== "draft")
        fail("Opublikowanej oferty nie można cofnąć do szkicu.");
      s.jobs[index] = job;
    } else s.jobs.unshift(job);
    s.experimentLog.push({
      at: now,
      jobId: job.id,
      type: action.type === "publish" ? "published" : "draft_saved",
      detail: { essentials: essentialSnapshot(job) },
    });
  } else if (action.type === "request_help") {
    const p = employer();
    const existing = s.jobs.find((x) => x.id === action.job.id);
    if (existing && existing.companyId !== p.companyId) fail("Nie można zmienić tej oferty.");
    // A new or draft job is saved so the request survives reloads; a published job is untouched.
    if (!existing || existing.publicationStatus === "draft") {
      const job = jobSchema.parse({ ...action.job, publicationStatus: "draft" });
      if (job.companyId !== p.companyId) fail("Wybierz ofertę własnej firmy.");
      if (existing) s.jobs[s.jobs.indexOf(existing)] = job;
      else s.jobs.unshift(job);
    }
    const job = s.jobs.find((x) => x.id === action.job.id)!;
    const asked = new Set(action.questions);
    const known = textEssentialKeys
      .filter((key) => !asked.has(key) && action.job.essentials?.[key]?.trim())
      .map((key) => ({ key, text: action.job.essentials![key]!.trim() }));
    if (action.channel === "email" && !action.expertEmail.trim())
      fail("Podaj adres e-mail eksperta.");
    s.helpRequests.push(
      helpRequestSchema.parse({
        id: action.requestId,
        jobId: job.id,
        companyId: job.companyId,
        authorId: p.id,
        expertEmail: action.expertEmail.trim(),
        expertName: action.expertName,
        expertRole: action.expertRole,
        message: action.message,
        channel: action.channel,
        questions: [...asked],
        known,
        brief: action.job.sourceBrief?.trim() ?? "",
        status: "sent",
        createdAt: now,
        answers: [],
        corrections: [],
      }),
    );
    s.experimentLog.push({
      at: now,
      jobId: job.id,
      type: "help_requested",
      detail: {
        requestId: action.requestId,
        channel: action.channel,
        expertRole: action.expertRole.trim(),
        questions: [...asked],
        essentials: essentialSnapshot(action.job),
      },
    });
  } else if (action.type === "expert_answer") {
    // The expert link works without a selected person, as an unauthenticated link would.
    const request = s.helpRequests.find((x) => x.id === action.requestId);
    if (!request) return fail("Nie znaleziono prośby.");
    if (request.status !== "sent") fail("Odpowiedzi zostały już wysłane.");
    const asked = new Set(request.questions);
    if (
      action.answers.length !== asked.size ||
      action.answers.some((a) => !asked.has(a.key) || (!a.undecided && !a.text.trim()))
    )
      fail("Odpowiedz na każde pytanie albo zaznacz, że to jeszcze nie jest ustalone.");
    const knownKeys = new Set(request.known.map((x) => x.key));
    if (action.corrections.some((c) => !knownKeys.has(c.key)))
      fail("Poprawka dotyczy nieznanego elementu.");
    request.answers = action.answers.map((a) => ({ ...a, resolution: undefined }));
    request.corrections = action.corrections.map((c) => ({ ...c, resolution: undefined }));
    request.note = action.note;
    request.status = "answered";
    request.answeredAt = now;
    s.experimentLog.push({
      at: now,
      jobId: request.jobId,
      type: "expert_answered",
      detail: {
        requestId: request.id,
        minutesSinceRequest: Math.round((Date.parse(now) - Date.parse(request.createdAt)) / 60000),
        answers: request.answers.map((a) => ({ key: a.key, mode: a.mode, undecided: a.undecided })),
        corrections: request.corrections.map((c) => c.key),
        note: request.note ? request.note.mode : null,
      },
    });
  } else if (action.type === "resolve_help") {
    const p = employer();
    const request = s.helpRequests.find((x) => x.id === action.requestId);
    if (!request || request.companyId !== p.companyId) return fail("Nie znaleziono prośby.");
    const target = action.target;
    if (target.kind === "answer") {
      const answer = request.answers.find((x) => x.key === target.key);
      if (!answer) return fail("Nie znaleziono odpowiedzi.");
      answer.resolution = target.resolution;
    } else if (target.kind === "correction") {
      const correction = request.corrections.find((x) => x.key === target.key);
      if (!correction) return fail("Nie znaleziono poprawki.");
      correction.resolution = target.resolution;
    } else {
      if (!request.note) fail("Nie znaleziono uwagi.");
      request.noteResolution = target.resolution;
    }
    s.experimentLog.push({
      at: now,
      jobId: request.jobId,
      type: `${target.kind}_resolved`,
      detail: {
        requestId: request.id,
        key: "key" in target ? target.key : null,
        resolution: target.resolution,
      },
    });
  } else if (action.type === "company") {
    const p = employer();
    Object.assign(
      s.companies.find((x) => x.id === p.companyId)!,
      { name: shortText.parse(action.name), description: text.parse(action.description) },
    );
  }
  return stateSchema.parse(s);
}
