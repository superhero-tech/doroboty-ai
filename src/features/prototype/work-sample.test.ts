import { describe, expect, it } from "vitest";
import { initialState, transition, stateSchema } from "./model";

const now = "2026-11-05T19:00:00.000Z";
function candidate() {
  return transition(initialState(), { type: "select_person", id: "candidate-anna" });
}
const input = {
  prompt: "Podziel wiadomości na płatności, dostęp i pozostałe.",
  generated: true,
  categories: ["payments", "access", "other"] as const,
  explanation: "Sprawdziłam treść każdej wiadomości i poprawiłam błędne przypisania.",
};
describe("candidate work sample", () => {
  it("loads old version-1 saves without losing their applications", () => {
    const old = initialState();
    const legacy = JSON.parse(
      JSON.stringify(old, (key, value) => (key === "workSamples" ? undefined : value)),
    );
    const loaded = stateSchema.parse(legacy);
    expect(loaded.workSamples).toEqual([]);
    expect(loaded.applications).toEqual(old.applications);
  });
  it("requires a candidate, the configured role and complete evidence", () => {
    const state = candidate();
    const job = state.jobs.find((j) => j.slug === "ai-operations-specialist")!;
    const action = {
      type: "work_sample" as const,
      jobId: job.id,
      value: { ...input, categories: [...input.categories] },
      complete: true,
    };
    expect(() => transition(initialState(), action, now)).toThrow();
    expect(() => transition(state, { ...action, jobId: state.jobs[0].id }, now)).toThrow();
    expect(() =>
      transition(state, { ...action, value: { ...action.value, explanation: "" } }, now),
    ).toThrow();
    const result = transition(state, action, now);
    expect(result.workSamples[0].completedAt).toBe(now);
    expect(result.workSamples[0].candidateId).toBe("candidate-anna");
  });
  it("isolates candidates and freezes the completed work on submission", () => {
    let state = candidate();
    const job = state.jobs.find((j) => j.slug === "ai-operations-specialist")!;
    state = transition(
      state,
      {
        type: "work_sample",
        jobId: job.id,
        value: { ...input, categories: [...input.categories] },
        complete: true,
      },
      now,
    );
    const completed = state.workSamples[0];
    state = transition(state, { type: "select_person", id: "candidate-marek" });
    state = transition(state, {
      type: "work_sample",
      jobId: job.id,
      value: { prompt: "", generated: false, categories: ["", "", ""], explanation: "" },
      complete: false,
    });
    expect(state.workSamples).toHaveLength(2);
    expect(state.workSamples.find((s) => s.candidateId === "candidate-anna")).toEqual(completed);
    state = transition(state, { type: "select_person", id: "candidate-anna" });
    state = transition(
      state,
      {
        type: "submit",
        jobId: job.id,
        answer: "Mam doświadczenie w automatyzacji obsługi zgłoszeń.",
        notes: "",
        generated: "",
        consent: true,
      },
      now,
      "sample-application",
    );
    expect(state.applications.at(-1)?.workSample).toEqual(completed);
    expect(() =>
      transition(state, {
        type: "work_sample",
        jobId: job.id,
        value: { ...input, categories: [...input.categories] },
        complete: false,
      }),
    ).toThrow();
  });
});
