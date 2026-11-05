# Project checkpoint — candidate Apply path

Updated: 2026-11-05 (Europe/Warsaw).

## Git save status

Commit author supplied by the user: `szkoleniowystefan <szkoleniowystefan@gmail.com>`. Identity is configured for this repository only. The save destination is `origin/main` at https://github.com/szkoleniowystefan/doroboty-ai. This checkpoint accompanies the candidate work-sample implementation, tests and discovery decisions. Verify synchronization on resume with `git status -sb` and the remote commit; a local commit alone does not establish a successful push. A binary patch backup of the implementation is also saved outside the repository in the project's artifacts directory. The browser-session export was not confirmed and is not included.

## Current objective and decision

Implement only the candidate path for the AI Operations Specialist Apply role. Employer development is deferred. The discovery problem is evidence of practical AI use and the candidate's own contribution before an interview invitation.

## Saved implementation

- Offer salary/conditions panel → Apply → preparation page with “Pokaż, jak pracujesz z AI” and Start task.
- Candidate selection preserves the task destination.
- Task: classify three synthetic messages, review an explicitly prepared AI proposal, edit categories and explain verification.
- Candidate/job-specific progress persists locally. Summary shows actual recorded inputs and returns to the existing application.
- Submission optionally freezes completed work with the immutable application. Employer screens and historical baseline are unchanged.
- Existing personas, JSON fixtures and schema are committed sources; browser-local session state is separate. A browser export was attempted during this save request but could not be confirmed because the tab session disconnected. No browser-state export file is included or claimed.

## Entry points

- Development: npm run dev, http://127.0.0.1:3001.
- Offer: /#/oferty/ai-operations-specialist.
- Preparation: /#/aplikuj/ai-operations-specialist/przygotowanie.
- Task: /#/aplikuj/ai-operations-specialist/zadanie.
- Summary: /#/aplikuj/ai-operations-specialist/podsumowanie.
- Application: /#/aplikuj/ai-operations-specialist.
- Scenario export/import: /#/app/settings.

## Evidence and validation

- Task and acceptance/verification record: docs/tasks/candidate-work-sample.md.
- Discovery decision history (original Polish user-facing record): docs/source/discovery/doroboty-discovery-decyzja-2026-11-05.md. This is instructor/source material, excluded from participant packages; do not import it into runtime baseline data.
- Product behavior: FEATURES.md, CAN-19 through CAN-22.
- All 30 unit tests passed. Lint, changed-file formatting, TypeScript and production build passed. Manual in-app browser task/corrections/reload/summary/return checked; responsive task layout checked from 320 to 1280 CSS px.
- Full npm run check is not green: existing CRLF checkout formatting, kit integrity and participant CSV comparisons differ from canonical LF. No bulk formatting, kit changes or relaxed checks were applied.
- Automated Playwright preview startup could not be verified in the sandbox; do not claim an E2E pass. Run npm run test:e2e in the normal local terminal.

## Resume

1. Read AGENTS.md and docs/tasks/candidate-work-sample.md; inspect git status before edits.
2. Open the preparation route and review the candidate experience with the user.
3. Run full browser/a11y checks in a normal local terminal; address checkout line endings separately without changing the immutable reference content or weakening checks.
4. Conduct a real-person usability session. Do not treat prepared AI output, completed screens or scenario scores as agent-quality or business-outcome validation.
5. Keep employer work deferred until an explicit new user decision.

## Previous setup checkpoint (historical)

The following earlier notes predate the implementation above. Their “no changes/no tests” statements describe the setup session only.

# Local setup checkpoint

Updated: 2026-11-05 (Europe/Warsaw).

## Goal

Clone the user's repository using Git (without GitHub CLI), read project instructions and run the application locally.

## Location and source

- Repository: https://github.com/szkoleniowystefan/doroboty-ai
- Local path: `C:\Users\Marcin\Documents\ObsidianStefana\DoRobotyAI-GITHUB\doroboty-ai`

## Completed

- The user confirmed cloning; local repository files were verified.
- Read `AGENTS.md`, `README.md`, `package.json`, `docs/PARTICIPANT_GUIDE.md` and `vite.config.ts`.
- The project requires Node.js 24 and npm. It needs no environment file, account, database or additional service.
- The assistant runtime has Node.js 24.19.0 and npm 11.17.0. Availability in the user's own PowerShell has not been confirmed.
- Git initially was not recognized in the user's PowerShell. Installation instructions were provided, and the user subsequently confirmed cloning.
- No application source changes were made.

## Current status and limits

- The assistant's `npm ci --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000` failed because this session could not resolve `registry.npmjs.org` (ENOTFOUND).
- A `node_modules` directory exists, but this does not establish a successful or complete dependency installation.
- The user was given commands to install dependencies and start the app in their own PowerShell. Their execution and result have not been confirmed.
- The development server has not been verified as running. No build or tests were executed.
- The configured application address is http://127.0.0.1:3001. Vite uses strictPort, so an occupied port will cause startup to fail.

## Resume

1. Check whether the user has successfully completed `npm ci` and started the server. Inspect current local state before repeating installation or starting another process.
2. If needed, execute these commands in PowerShell with network access:

   ```powershell
   cd "C:\Users\Marcin\Documents\ObsidianStefana\DoRobotyAI-GITHUB\doroboty-ai"
   node --version
   npm ci
   npm run dev
   ```

3. Verify that http://127.0.0.1:3001 loads successfully. Report the actual result.
4. Keep the server terminal open; Ctrl+C stops it.

## Project context

- This is a teaching prototype, separate from the production portal. Personas, AI proposals and scores are simulated; use synthetic data only.
- Changes persist in browser storage. Settings support export, import and reset.
- For future product work, follow `AGENTS.md` and its required reading. Its required visual direction is the repository's Poster People design system; no UI change was requested in this setup task.
- `FEATURES.md` was not changed because setup/checkpoint documentation does not alter application behavior.

Suggested continuation request: "Resume local setup according to CONTINUE.md; verify dependencies and start the application."
