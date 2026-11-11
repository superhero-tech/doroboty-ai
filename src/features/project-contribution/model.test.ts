import { describe, expect, it } from "vitest";
import { blankDraft, draftSchema, exampleDraft, projectSchema } from "./model";

describe("project contribution boundaries", () => {
  it("preserves incomplete drafts but requires responsibility boundaries for preview", () => {
    expect(draftSchema.safeParse(blankDraft).success).toBe(true);
    expect(projectSchema.safeParse(blankDraft).success).toBe(false);
    expect(projectSchema.safeParse(exampleDraft).success).toBe(true);
    for (const field of ["own", "shared", "others", "measurement", "limits"]) {
      expect(projectSchema.safeParse({ ...exampleDraft, [field]: "   " }).success).toBe(false);
    }
  });
  it("accepts an absent public artifact and rejects executable or malformed links", () => {
    for (const link of [
      "javascript:alert(1)",
      "data:text/html,test",
      "file:///secret",
      "example.com",
    ]) {
      expect(projectSchema.safeParse({ ...exampleDraft, link }).success).toBe(false);
    }
    expect(
      projectSchema.safeParse({ ...exampleDraft, link: "https://example.com/demo" }).success,
    ).toBe(true);
  });
  it("rejects incompatible or excessive stored drafts", () => {
    expect(draftSchema.safeParse({ ...blankDraft, version: 2 }).success).toBe(false);
    expect(draftSchema.safeParse({ ...blankDraft, own: "x".repeat(1601) }).success).toBe(false);
  });
});
