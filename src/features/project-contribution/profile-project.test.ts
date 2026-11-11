import { describe, expect, it } from "vitest";
import { initialState, transition, stateSchema } from "../prototype/model";
import { parseState, serializeState } from "../prototype/storage";
import { blankDraft, exampleDraft, profileProjectDraftSchema } from "./model";

describe("candidate-owned profile project", () => {
  const value = profileProjectDraftSchema.parse(exampleDraft);
  const anna = () => transition(initialState(), { type: "select_person", id: "candidate-anna" });
  it("keeps incomplete drafts private to their candidate and requires a complete published description", () => {
    const incomplete = profileProjectDraftSchema.parse({ ...blankDraft, title: "Unfinished" });
    const state = transition(anna(), { type: "profile_project_draft", value: incomplete });
    expect(state.people.find((p) => p.id === "candidate-anna")?.projectDraft?.title).toBe(
      "Unfinished",
    );
    expect(state.people.find((p) => p.id === "candidate-anna")?.project).toBeUndefined();
    expect(state.people.find((p) => p.id === "candidate-marek")?.projectDraft).toBeUndefined();
    expect(() => transition(state, { type: "profile_project_save", value: incomplete })).toThrow();
  });
  it("saves without job relevance, clears the working draft and survives import/export", () => {
    let state = transition(anna(), { type: "profile_project_draft", value });
    state = transition(state, { type: "profile_project_save", value });
    const person = state.people.find((p) => p.id === "candidate-anna")!;
    expect(person.project).toEqual(value);
    expect(person.projectDraft).toBeUndefined();
    expect(person.project).not.toHaveProperty("target");
    expect(parseState(serializeState(state))).toEqual(state);
    expect(stateSchema.safeParse(initialState()).success).toBe(true);
    expect(initialState().people.every((p) => p.project === undefined)).toBe(true);
  });
  it("requires a candidate role and leaves existing application snapshots untouched", () => {
    const state = anna();
    const updated = transition(state, { type: "profile_project_save", value });
    expect(updated.applications).toEqual(state.applications);
    const employer = transition(updated, { type: "select_person", id: "employer-brightlabs" });
    expect(() => transition(employer, { type: "profile_project_save", value })).toThrow(
      "Wybierz profil kandydata",
    );
    expect(() => transition(employer, { type: "profile_project_draft", value })).toThrow();
  });
  it("does not replace the last complete project with a newer partial draft", () => {
    const saved = transition(anna(), { type: "profile_project_save", value });
    const state = transition(saved, {
      type: "profile_project_draft",
      value: { ...value, title: "New draft", own: "" },
    });
    expect(state.people.find((p) => p.id === "candidate-anna")?.project?.title).toBe(value.title);
    expect(state.people.find((p) => p.id === "candidate-anna")?.projectDraft?.own).toBe("");
  });
});
