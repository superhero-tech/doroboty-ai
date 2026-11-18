import { describe, expect, it } from "vitest";
import { initialState, transition, stateSchema, type State } from "./model";
import { organizeNotes, rubricFor } from "./assessment";
const time = "2026-11-03T10:00:00.000Z";
function as(state: State, id: string) {
  return transition(state, { type: "select_person", id });
}
function submitted() {
  const s = as(initialState(), "candidate-anna");
  return transition(
    s,
    {
      type: "submit",
      jobId: s.jobs[0].id,
      notes: "Original notes",
      generated: "Generated copy",
      answer: "Approved application with sufficient context.",
      consent: true,
    },
    time,
    "application-anna",
  );
}
function assess(state: State, applicationId = "application-anna") {
  const job = state.applications.find((x) => x.id === applicationId)!.jobId;
  return transition(
    state,
    {
      type: "assess",
      applicationId,
      value: {
        notes: rubricFor(job).exampleNotes,
        note: "",
        durationSeconds: 95,
        criteria: rubricFor(job).criteria.map((c) => ({
          label: c.label,
          evidence: "Konkretny przykład z rozmowy.",
          rating: "meets" as const,
        })),
      },
    },
    time,
  );
}
function atConversation() {
  let s = as(submitted(), "employer-brightlabs");
  for (const stage of ["reviewed", "interview_invited", "first_conversation_held"] as const)
    s = transition(s, { type: "stage", applicationId: "application-anna", stage, note: "" }, time);
  return s;
}
describe("post-interview assessment (I1)", () => {
  it("blocks both decisions after the first conversation until an assessment is saved", () => {
    const s = atConversation();
    for (const stage of ["continued", "rejected"] as const)
      expect(() =>
        transition(s, { type: "stage", applicationId: "application-anna", stage, note: "" }, time),
      ).toThrow("Zapisz ocenę");
    const assessed = assess(s);
    expect(assessed.assessments).toHaveLength(1);
    expect(assessed.assessments[0]).toMatchObject({ applicationId: "application-anna", at: time });
    const rejected = transition(
      assessed,
      { type: "stage", applicationId: "application-anna", stage: "rejected", note: "" },
      time,
    );
    expect(rejected.applications.at(-1)?.stage).toBe("rejected");
  });
  it("still allows rejection before the conversation without an assessment", () => {
    const s = as(submitted(), "employer-brightlabs");
    const rejected = transition(
      s,
      { type: "stage", applicationId: "application-anna", stage: "rejected", note: "" },
      time,
    );
    expect(rejected.applications.at(-1)?.stage).toBe("rejected");
  });
  it("requires evidence and a rating for every criterion and replaces an earlier assessment", () => {
    const s = atConversation();
    const job = s.applications.at(-1)!.jobId;
    expect(() =>
      transition(s, {
        type: "assess",
        applicationId: "application-anna",
        value: {
          notes: "",
          note: "",
          criteria: [{ label: rubricFor(job).criteria[0].label, evidence: " ", rating: "meets" }],
        },
      }),
    ).toThrow();
    const twice = assess(assess(s));
    expect(twice.assessments).toHaveLength(1);
  });
  it("lets only the owning employer assess, and only at the conversation stage", () => {
    const s = atConversation();
    expect(() => assess(as(s, "employer-northstar"))).toThrow("Nie znaleziono");
    expect(() => assess(as(s, "candidate-anna"))).toThrow("pracodawcy");
    expect(() => assess(as(submitted(), "employer-brightlabs"))).toThrow("po pierwszej rozmowie");
  });
  it("imports older saves without assessments and rejects dangling references", () => {
    const legacy = structuredClone(initialState()) as Partial<State>;
    delete legacy.assessments;
    expect(stateSchema.parse(legacy).assessments).toEqual([]);
    const broken = structuredClone(assess(atConversation()));
    broken.assessments[0].applicationId = "missing";
    expect(() => stateSchema.parse(broken)).toThrow();
  });
  it("organizes example notes into every criterion without producing ratings", () => {
    const rubric = rubricFor("20000000-0000-4000-8000-000000000001");
    const result = organizeNotes(rubric.exampleNotes, rubric.criteria);
    expect(result.evidence.every(Boolean)).toBe(true);
    expect(result.unmatched).toEqual(["Dopytywała o skład zespołu i budżet na narzędzia."]);
    const labelled = organizeNotes("Mierzenie efektu: NPS wzrósł", rubric.criteria);
    expect(labelled.evidence[2]).toBe("NPS wzrósł");
    for (const id of [
      "20000000-0000-4000-8000-000000000002",
      "20000000-0000-4000-8000-000000000004",
      "20000000-0000-4000-8000-000000000005",
      "unknown-job",
    ]) {
      const r = rubricFor(id);
      const organized = organizeNotes(r.exampleNotes, r.criteria);
      expect(organized.evidence.every(Boolean), id).toBe(true);
    }
  });
});
describe("coherent browser scenario", () => {
  it("requires approval and prevents duplicate applications", () => {
    const s = as(initialState(), "candidate-anna");
    const input = {
      type: "submit" as const,
      jobId: s.jobs[0].id,
      notes: "",
      generated: "",
      answer: "Approved application with sufficient context.",
      consent: false,
    };
    expect(() => transition(s, input, time)).toThrow("Zatwierdź");
    expect(() => transition(submitted(), { ...input, consent: true }, time)).toThrow("już wysłana");
    expect(s.applications).toHaveLength(1);
  });
  it("preserves approved sources while profile and notes evolve", () => {
    const s = submitted();
    const app = s.applications.at(-1)!;
    const changed = transition(s, {
      type: "profile",
      value: {
        name: "Updated Name",
        headline: "Updated Headline",
        bio: "Changed",
        location: "Wrocław",
      },
    });
    expect(changed.applications.at(-1)).toEqual(app);
    expect(app.candidateName).toBe("Anna Kowalska");
    expect(app.sourceNotes).toBe("Original notes");
    expect(app.generatedAnswer).toBe("Generated copy");
  });
  it("supports employer review through conversation and continuation without skipping stages", () => {
    let s = as(submitted(), "employer-brightlabs");
    expect(() =>
      transition(
        s,
        { type: "stage", applicationId: "application-anna", stage: "continued", note: "" },
        time,
      ),
    ).toThrow();
    for (const stage of ["reviewed", "interview_invited", "first_conversation_held"] as const)
      s = transition(
        s,
        { type: "stage", applicationId: "application-anna", stage, note: "Employer note" },
        time,
      );
    s = assess(s);
    for (const stage of ["continued", "hired"] as const)
      s = transition(
        s,
        { type: "stage", applicationId: "application-anna", stage, note: "Employer note" },
        time,
      );
    expect(s.applications.at(-1)?.stage).toBe("hired");
    expect(s.applications.at(-1)?.events).toHaveLength(6);
  });
  it("rejects another employer’s stage writes and another candidate’s withdrawal", () => {
    expect(() =>
      transition(
        as(submitted(), "employer-northstar"),
        { type: "stage", applicationId: "application-anna", stage: "reviewed", note: "" },
        time,
      ),
    ).toThrow();
    expect(() =>
      transition(
        as(submitted(), "candidate-marek"),
        { type: "withdraw", applicationId: "application-anna" },
        time,
      ),
    ).toThrow();
  });
  it("makes withdrawal terminal and keeps drafts and saved jobs person-specific", () => {
    let s = submitted();
    s = transition(s, { type: "withdraw", applicationId: "application-anna" }, time);
    expect(() =>
      transition(
        as(s, "employer-brightlabs"),
        { type: "stage", applicationId: "application-anna", stage: "reviewed", note: "" },
        time,
      ),
    ).toThrow();
    s = transition(s, {
      type: "draft",
      jobId: s.jobs[1].id,
      notes: "Notes",
      generated: "Output",
      answer: "Edited",
    });
    s = transition(s, { type: "toggle_saved", jobId: s.jobs[1].id });
    expect(s.drafts[0].candidateId).toBe("candidate-anna");
    expect(s.saved[0].candidateId).toBe("candidate-anna");
  });
  it("validates broken references, duplicate submissions and invalid histories on import", () => {
    const s = submitted();
    s.applications.push({ ...s.applications.at(-1)!, id: "another-id" });
    expect(stateSchema.safeParse(s).success).toBe(false);
    const broken = submitted();
    broken.applications.at(-1)!.events.push({ stage: "hired", at: time, note: "" });
    broken.applications.at(-1)!.stage = "hired";
    expect(stateSchema.safeParse(broken).success).toBe(false);
    const unknown = initialState();
    unknown.jobs[0].companyId = "missing";
    expect(stateSchema.safeParse(unknown).success).toBe(false);
  });
  it("only publishes own-company jobs and keeps submitted job snapshots unchanged", () => {
    const state = as(submitted(), "employer-brightlabs");
    const updated = { ...state.jobs[0], title: "Updated public role" };
    const result = transition(state, { type: "publish", job: updated });
    expect(result.jobs[0].title).toBe("Updated public role");
    expect(result.applications.at(-1)?.jobTitle).toBe("AI Product Manager");
    expect(() =>
      transition(as(state, "employer-northstar"), { type: "publish", job: updated }),
    ).toThrow();
    expect(() =>
      transition(state, { type: "publish", job: { ...updated, salaryMin: 500, salaryMax: 1 } }),
    ).toThrow();
  });
});
