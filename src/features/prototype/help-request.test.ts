import { describe, expect, it } from "vitest";
import { initialState, stateSchema, transition, type JobRecord, type State } from "./model";
import { essentialState, proposeDescription, proposeSummary } from "./essentials";
import { parseState, serializeState } from "./storage";

const time = "2026-11-07T10:00:00.000Z";
const later = "2026-11-07T10:12:00.000Z";

function employer(id = "employer-brightlabs") {
  return transition(initialState(), { type: "select_person", id });
}
function draftJob(state: State, patch: Partial<JobRecord> = {}): JobRecord {
  const base = state.jobs[0];
  return {
    ...base,
    id: "job-e03",
    slug: "oferta-job-e03",
    title: "AI Engineer (RAG)",
    summary: "",
    description: "",
    salaryMin: undefined,
    salaryMax: undefined,
    publicationStatus: "draft",
    essentials: { firstTask: "Przebudowa indeksowania PDF-ów.", team: "2 osoby backend." },
    essentialStatus: { salary: { state: "skipped", reason: "confidential" } },
    sourceBrief: "  Brief roli do testu. ",
    ...patch,
  };
}
function requested() {
  const s = employer();
  return transition(
    s,
    {
      type: "request_help",
      requestId: "request-1",
      job: draftJob(s),
      expertEmail: "michal@brightlabs.example",
      expertName: "Michał",
      expertRole: "Tech Lead",
      message: "Kilka minut teraz oszczędzi rozmów.",
      channel: "email",
      questions: ["ownership", "decisions"],
    },
    time,
  );
}

describe("E03 job essentials and expert help", () => {
  it("keeps older saves valid without the new lists", () => {
    const raw = JSON.parse(serializeState(initialState()));
    delete raw.helpRequests;
    delete raw.experimentLog;
    const state = parseState(JSON.stringify(raw));
    expect(state.helpRequests).toEqual([]);
    expect(state.experimentLog).toEqual([]);
  });

  it("reads the earlier separate in-brief state as a skip reason", () => {
    const raw = JSON.parse(serializeState(initialState()));
    raw.jobs[0].essentialStatus = { team: { state: "in_brief" } };
    const state = parseState(JSON.stringify(raw));
    expect(state.jobs[0].essentialStatus?.team).toEqual({ state: "skipped", reason: "in_brief" });
  });

  it("saves incomplete drafts but keeps publishing rules for public jobs", () => {
    const s = employer();
    const saved = transition(s, { type: "save_job_draft", job: draftJob(s) }, time);
    expect(saved.jobs[0].publicationStatus).toBe("draft");
    expect(saved.experimentLog.at(-1)?.type).toBe("draft_saved");
    expect(() => transition(saved, { type: "publish", job: draftJob(s) }, time)).toThrow();
    expect(() => transition(s, { type: "save_job_draft", job: { ...s.jobs[0] } }, time)).toThrow(
      "Opublikowanej",
    );
  });

  it("saves the draft, snapshots known answers and logs the gap state with a request", () => {
    const s = requested();
    const request = s.helpRequests[0];
    expect(s.jobs.find((j) => j.id === "job-e03")?.publicationStatus).toBe("draft");
    expect(request.known.map((k) => k.key)).toEqual(["firstTask", "team"]);
    expect(request.brief).toBe("Brief roli do testu.");
    expect(request.status).toBe("sent");
    expect(s.experimentLog.at(-1)).toMatchObject({
      type: "help_requested",
      detail: {
        channel: "email",
        essentials: { salary: "skipped:confidential", ownership: "missing" },
      },
    });
  });

  it("requires an email for the email channel and rejects other companies", () => {
    const s = employer();
    const input = {
      type: "request_help" as const,
      requestId: "request-x",
      job: draftJob(s),
      expertEmail: "",
      expertName: "Michał",
      expertRole: "",
      message: "",
      channel: "email" as const,
      questions: ["ownership" as const],
    };
    expect(() => transition(s, input, time)).toThrow("e-mail");
    expect(transition(s, { ...input, channel: "link" }, time).helpRequests).toHaveLength(1);
    const other = transition(requested(), { type: "select_person", id: "employer-northstar" });
    expect(() =>
      transition(other, {
        type: "resolve_help",
        requestId: "request-1",
        target: { kind: "note", resolution: "added" },
      }),
    ).toThrow();
  });

  it("accepts expert answers once, with corrections, undecided items and a note", () => {
    const s = requested();
    const answer = {
      type: "expert_answer" as const,
      requestId: "request-1",
      answers: [
        {
          key: "ownership" as const,
          mode: "text" as const,
          text: "Pipeline indeksowania.",
          undecided: false,
        },
        { key: "decisions" as const, mode: "voice" as const, text: "", undecided: true },
      ],
      corrections: [
        {
          key: "firstTask" as const,
          original: "Przebudowa indeksowania PDF-ów.",
          text: "Najpierw ewaluacja.",
        },
      ],
      note: { mode: "text" as const, text: "Dokumenty klientów finansowych." },
    };
    expect(() =>
      transition(s, {
        ...answer,
        answers: [{ ...answer.answers[0], text: "" }, answer.answers[1]],
      }),
    ).toThrow("Odpowiedz");
    const answered = transition(s, answer, later);
    expect(answered.helpRequests[0].status).toBe("answered");
    expect(answered.experimentLog.at(-1)?.detail).toMatchObject({ minutesSinceRequest: 12 });
    expect(() => transition(answered, answer, later)).toThrow("już wysłane");
    const resolved = transition(answered, {
      type: "resolve_help",
      requestId: "request-1",
      target: { kind: "correction", key: "firstTask", resolution: "kept" },
    });
    expect(resolved.helpRequests[0].corrections[0].resolution).toBe("kept");
    expect(stateSchema.safeParse(resolved).success).toBe(true);
  });

  it("derives element states and builds a proposal only from provided answers", () => {
    const pending = new Set(["ownership"] as const);
    const values = { firstTask: "Zadanie" };
    expect(essentialState("firstTask", values, {}, {})).toBe("filled");
    expect(essentialState("ownership", values, {}, {}, pending)).toBe("pending_expert");
    expect(essentialState("salary", values, {}, { min: 10000 })).toBe("filled");
    // "Jest już w briefie" is a skip reason and never counts as filled.
    expect(
      essentialState("team", values, { team: { state: "skipped", reason: "in_brief" } }, {}),
    ).toBe("skipped");
    const text = proposeDescription("Brief roli", values);
    // The offer page renders the title and an “O roli” heading itself.
    expect(text.startsWith("Brief roli")).toBe(true);
    expect(text).not.toMatch(/^O roli$/m);
    expect(text).toContain("### Pierwszy projekt");
    expect(text).not.toContain("Zakres odpowiedzialności");
    expect(proposeSummary("Rozwijamy asystenta. Dziś gubi się w tabelach.")).toBe(
      "Rozwijamy asystenta.",
    );
    const long = proposeSummary(`${"słowo ".repeat(60)}koniec.`, 40);
    expect(long.endsWith("…")).toBe(true);
    expect(long.length).toBeLessThanOrEqual(41);
  });
});
