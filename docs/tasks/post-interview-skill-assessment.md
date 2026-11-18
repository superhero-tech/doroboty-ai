# Post-interview skill assessment (I1)

## Intent

Participant quest: extend DoRoboty.ai with a solution grounded in the participant's own discovery.

- **Problem (opportunity O2):** recruiters without AI experience cannot fairly assess a candidate's practical skills (employer interviews F1, F3, F4; F2 did not report it). Since June the scenario Match Score no longer predicts progress after the interview (90+: 94/162 continued in May vs 45/252 in June).
- **Solution (idea I1, decision D1, approved 2026-11-06):** after the first conversation, a simulated AI step organizes the recruiter's notes into a short form with the role's criteria and evidence. The recruiter alone rates every criterion. Target completion time: 1–2 minutes.
- **Known limitation:** F3 describes difficulty _before_ inviting a candidate; I1 acts _after_ the conversation.
- **Persona:** employer (Karolina, BrightLabs). Scenario: Anna applies for AI Product Manager, Karolina reviews, invites, records the conversation, assesses and decides.

## Decisions confirmed by the participant

1. Placement: inside the existing employer process view `/#/app/kandydaci/:id` when the stage is `first_conversation_held`.
2. The decision after the first conversation (`continued` / `rejected`) **requires** a saved assessment. Enforced in the domain transition and reflected in the UI.
3. Criteria are prepared per employer job (three each for the four employer-owned jobs) with a generic fallback for new jobs. They are scenario fixtures, not validated rubrics.
4. Visual direction: Poster People host recipes (RecordSheet section, existing Button/Textarea/FormSelect, records.css), not the participant's earlier Deel mockup.

## Acceptance criteria

- At `first_conversation_held`, the employer sees "Ocena po rozmowie" with notes, a simulated organize action, prepared example notes, evidence and rating per criterion and an optional recruiter note.
- "Organize" assigns note lines to criteria by labels or keywords; unmatched lines are listed for manual handling. It never produces a rating. The UI labels it as a simulation.
- Saving requires evidence and a rating for every criterion; errors are announced and retained input survives.
- Decision buttons are disabled with an explanation until an assessment is saved; the domain rejects the transition without an assessment.
- The saved assessment (criteria, ratings, evidence, note, elapsed time) persists in localStorage, survives reload/export/import and is shown read-only after the decision.
- Candidates never see the assessment. Other employers cannot write it.
- Older exports without `assessments` still import (default empty list).
- Existing journeys still pass; FEATURES.md updated.

## Evidence

Recorded 2026-11-18 in a cloud workspace (Node 24.22.3, provisioned Playwright Chromium 1243):

- `./scripts/verify` (= `npm run check`) passed: format, design-system kit check, lint, typecheck, unit tests (33, incl. 6 new I1 tests), participant packet check, build and 36 browser journeys (34 existing + 2 new).
- Existing journey "candidate applies → employer moves to Kolejny etap → Zatrudnienie" updated to save an assessment first (required by decision 2).
- New journeys: full I1 flow with disabled decisions, announced validation, simulated organize (3/3 criteria, 1 unmatched line), ratings, axe (wcag2a/aa) on the section, reload persistence, decision, read-only summary, 390px reflow, candidate exclusion and other-employer denial; narrow-screen form check.
- Screenshots: `artifacts/i1-assessment-*.png`, `artifacts/i1-circle-*.png` (git-ignored).
- FEATURES.md: new EMP-11, EMP-09 updated.

Not established: human usability, real 1–2 minute completion by recruiters (elapsed time is recorded but only measured in automated runs), AI accuracy (no model is used), or any effect on repeat purchases.
