# Recruiter demo account and application process

## Intent

Expose one recruiter demo account in the main React employer sign-in flow and make candidate process progress explicit. The existing employer workspace can publish offers and manage company applications in the same local scenario. Keep the separate static demo's recruiter account and process working too.

## Context

The React scenario already provides two employer personas, company-scoped offer management and application stage transitions; the employer entry point should present the one recruiter account requested here. Preserve stable persona IDs and the distinct hiring-manager flow. Candidates need a clear completed-step/next-step view and explicit green positive/red rejected outcomes. This teaching simulation is not authenticated and persists only in browser storage. A separate static demo also has its own local recruiter flow.

## Acceptance criteria

- Employer sign-in offers exactly one recruiter account while preserving the separate candidate, hiring-manager and instructor personas and stable IDs.
- The recruiter can publish a schema-valid job offer locally and review company-scoped applications.
- Recruiter actions clearly mark verification, invite, conversation and positive decision; rejection is available at every active stage.
- Candidate application views show completed milestones, the next step, and green positive/red rejected terminal outcomes. Withdrawn applications remain terminal.
- Existing static-demo recruiting and AI interview flows remain available and browser-local.
- Do not add real credentials, candidate data, cross-device delivery or production access control.
- Update the behavior register and security notes. Follow the supplied DoRobory.AI moodboard for changed product UI: dark navy surfaces, cyan highlights and yellow primary actions.

## Verification plan

- Check recruiter sign-in exposes one recruiter while the other roles remain available.
- Check the existing employer offer/editor and application workflow, including verification, interview, positive outcome and rejection from all active stages.
- Check candidate-visible progress/outcomes, reload persistence, wrong-role access, keyboard use and narrow/desktop layouts.
- Run `./scripts/verify` and record actual results. Review the final implementation separately.

## Verification results

- Manual browser review confirmed the employer sign-in exposes one recruiter account, the recruiter can reach the BrightLabs offers and applicant workspace, and the seeded synthetic application can be advanced to a positive decision. The candidate view showed all four process milestones and the positive outcome.
- Updated the React product theme to match the supplied moodboard: navy background and panels, cyan interaction highlights, yellow primary actions, and dark text on yellow controls. Browser review covered recruiter sign-in and offers at desktop and 320 px, plus the candidate process and account picker at 390 px; the layouts did not overflow horizontally.
- The candidate process layout was also checked at 320 px before the moodboard restyle; the page did not overflow horizontally.
- Unit coverage includes rejection from every active stage. The browser-based end-to-end journey could not run in this environment because Playwright's preview server was denied permission to listen on `127.0.0.1:3106` (`EPERM`).
- `./scripts/verify`: formatting, design-system integrity and examples, lint, typecheck, 28 unit tests, participant packet verification, and production build passed. The command exited during `test:e2e` for the preview-server permission error above. Vite reported existing dependency annotation and large-chunk warnings during the successful build.
- Final source review confirmed the recruiter selection remains a local role simulation, applicant records remain company-scoped, candidate history is projected without employer-only notes, and terminal application states have no further actions.

## Risks and limits

- This frontend-only demo uses synthetic profiles and browser-local storage. The recruiter selector is not authentication or confidentiality; users can inspect or edit local data, and recruiter updates do not reach another device.
- Existing browser data may contain applications without a process-stage field; treat those as newly submitted applications without overwriting their other data.
