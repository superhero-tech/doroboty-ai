# Prototype — Delivery Register

BRIEF.md describes the current scope. Historical milestones remain in Git history; do not resume tasks from historical documents.

## Completed frontend migration

- [x] Replace Next/server execution with Vite, React and hash routes.
- [x] Move fixtures and state to JSON/React/versioned localStorage.
- [x] Preserve job/profile/application/employer UX with scenario AI and CVs.
- [x] Add validated import/export/reset and unavailable-storage recovery.
- [x] Remove external runtime requests, backend and database setup.
- [x] Update FEATURES.md, agent instructions, participant setup, checks and CI.
- [x] Distribute only baseline evidence without source history or future stages.
- [x] Run ./scripts/verify and mobile/desktop/keyboard checks.
- [x] Complete a separate review pass and record actual evidence in docs/tasks/frontend-only.md.

## Deliberate limitations

- Human research, course release approval and publishing a participant URL remain separate activities; passing code checks does not establish these outcomes.
- Optional candidate interview calls OpenAI only through local Vite development/preview middleware using synthetic profile data; uploaded CV PDFs are not read or sent. A static build does not include the AI API.
