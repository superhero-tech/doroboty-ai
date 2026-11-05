# Candidate work sample — Apply

## Intent and scope

Implement the user's November 5 scenario for AI Operations Specialist only: listing → role → Apply in the salary/conditions panel → preparation page → task → factual summary → existing application. Employer UI remains untouched. The preparation page is public; task records belong to the selected candidate. Prepared AI output must be explicitly labelled as simulation.

## Acceptance criteria

- The target offer exposes Apply even while an employer persona is selected; starting the task asks for a candidate and preserves the destination.
- Preparation/task/summary reuse the current offer's C13/C20/C21/C22 anatomy, actual company/role/salary, Base UI controls, local fonts and existing responsive geometry.
- A candidate writes a prompt, requests a prepared classification, reviews three synthetic messages, changes categories and explains checks. No model-based skill score or hiring recommendation is produced.
- Draft saving, completion and summary survive reload and stay isolated by candidate/job. Old version-1 scenario imports remain valid. Invalid, missing and submitted records have recovery paths.
- Completed work returns to the existing editable application without overwriting its answer; submission freezes a copy of the work alongside the existing immutable application.
- Verify domain validation, ownership, snapshots, keyboard/error states, desktop/mobile layout and the full journey. Run scripts/verify (or its npm run check equivalent on Windows), reporting actual limitations.

## Implementation decisions

Use the existing frontend-only scenario state and optional/defaulted Zod fields. No new dependency, backend, external service, production upload, monitoring permission or employer feature. Reuse shared primitives; keep the immutable design kit unchanged. The offer layout is a host composition, not a new visual direction. Existing CONTINUE.md is unrelated and must be preserved.

## Validation

- Completed: offer → preparation → candidate selection → task → persisted corrections → summary → existing application, exercised in the in-app browser on the user's running dev server. The actual prepared proposal, selected categories and explanation survived reload. The new application link displays completed-task status. No real submission or employer workflow was exercised in this manual run.
- Desktop preparation visually matches the current role header, contours, salary panel and typography. Task geometry was inspected at 1280, 851, 850, 701, 700, 390 and 320 CSS px; no overflowing article, aside, textarea or button was found. Summary was also inspected at 390 and 320 px. These checks are not a full accessibility certification.
- Unit tests: all **30 tests across 6 files passed**, including old-save loading, candidate isolation, completion validation and immutable submitted work. The default sandbox TEMP caused Vitest SSR ENOENT failures; rerunning with process-local TEMP/TMP set to the already writable user Temp directory passed without source/config changes.
- ESLint passed. TypeScript and production build passed. Existing dependency annotation and bundle-size warnings remain.
- `npm run check` (the Windows equivalent of scripts/verify) was attempted and stopped at formatting: pre-existing CRLF checkout files fail the LF formatter check. No bulk formatting or policy weakening was applied.
- Separate design-system integrity and participant-packet checks were attempted. They fail on existing line-ending differences: the kit's `.nvmrc` LF-normalized SHA-256 exactly matches its unchanged manifest; packet output compares CRLF input against LF output. Kit files, baseline data and verification scripts were not modified.
- Playwright E2E was attempted but the sandbox could not establish its preview-server startup. The run was stopped; no automated browser-test pass is claimed. New persisted E2E coverage is in `tests/e2e/work-sample.spec.ts`, ready for the user's normal terminal.

## Separate review pass

Reviewed the final scoped diff against ownership and immutable-snapshot requirements. Restored the existing save-offer control alongside the new Apply entry, kept the employer UI untouched, and placed the summary's return action in the offer sidebar. Task edits never overwrite application answers; opening the task summary from the form saves its answer draft first. The prepared proposal remains explicitly labelled, and summaries report recorded inputs rather than inferred skills. Existing unrelated CONTINUE.md is preserved.

Remaining: full automated browser/a11y execution in a normal local terminal and a real-person usability session. Nothing in this implementation validates the observing agent or repeat-purchase outcome.
