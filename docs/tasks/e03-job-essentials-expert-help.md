# E03: job essentials panel and expert help

Slug: `e03-job-essentials-expert-help`
Created: 2026\-11\-07

## Goal

Prototype for experiment E03 (idea I06): on the job editor the author sees what a candidate will not learn, fills six concrete elements, and can ask an expert (tech lead or hiring manager) for the ones they do not know. The expert answers through a link, can correct what is already written and add a note. The author decides what to accept and publishes, possibly with gaps.

## Context

- Product decision and measurement plan live outside this repository (Super Brain, DoRoboty.ai supersprint, `05-experiments.md` rev. 3) and in mockups agreed in conversation on 2026-11-07.
- Tests run on one laptop: the expert opens the link in a second tab. There is no backend or e-mail.
- Fixed prompts per category (Build/Apply/Lead); no AI judges answers.

## Acceptance criteria

- [x] Category is the first choice after the title, with employer-facing descriptions; it drives the prompts.
- [x] Existing fields remain (function, seniority, mode, contract, location, brief, summary, description, approval); salary moved into the essentials section.
- [x] Six essentials with “Poproś eksperta”, “Pomiń…” (reason required, including “Jest już w briefie”, which does not count as filled); a gap panel with states and a publish label naming the gaps; publication never blocked.
- [x] Draft save for new/draft jobs; expert request saves the draft.
- [x] Request dialog with e-mail validation (required only for “Wyślij prośbę”), name, optional role, questions, message.
- [x] Public `/#/pomoc/:id` with known items + corrections, Wpisz/Nagraj (simulated), “To jeszcze nie jest ustalone”, optional note; single submission.
- [x] Author resolves answers, corrections and note; another tab’s answers appear without reload.
- [x] Session log in local state for later analysis (export from settings).
- [x] Older saves without new lists still import.
- [x] “Przygotuj opis z AI” fills summary and description in one click (no proposal panel); a notice flags a description older than the brief/essentials.
- [ ] `./scripts/verify` passes — see handoff notes.

## Files / areas

- `src/features/prototype/essentials.ts` — keys, prompts, states, proposal text.
- `src/features/prototype/model.ts` — job fields, draft rules, help requests, log, actions.
- `src/features/prototype/store.tsx` — cross-tab `storage` sync.
- `src/features/prototype/job-editor.tsx`, `help-request-dialog.tsx`, `expert-help.tsx`, `employer.tsx`, `app.tsx`.
- `src/app/job-editor.css` (host extension composed from existing outlined surfaces, source ink/pink/fact colors).
- Tests: `src/features/prototype/help-request.test.ts`, `tests/e2e/prototype.spec.ts` (updated publish label, new E03 journey).

## Risks

- Vague answers count as filled; quality is judged after the session.
- The publish label changed (“Opublikuj bez N elementów”), which changes the existing browser journey.
- Moving salary and selects changes the current form beyond E03; acceptable for a lab test, keep in mind for E04.

## Handoff notes

- Run on 2026-11-07: `tsc --noEmit`, `eslint --max-warnings=0 .`, `prettier --check`, `vitest run` (33 tests pass).
- Browser journeys were not run: Playwright Chromium is not provisioned on this machine (`~/Library/Caches/ms-playwright` missing). Per AGENTS.md it was not installed automatically.
- Manual check in the running dev server (1440px): full author → expert (second tab) → author → publish flow, e-mail validation, missing-answer validation, published offer sections.
