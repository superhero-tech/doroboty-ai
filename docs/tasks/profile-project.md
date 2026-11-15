# Candidate profile project and recruiter summary

User request: put the structured project form into the candidate profile and show a recruiter-oriented summary in a location consistent with existing screens.

Scope: edit at /app/profil, summary after biography and before CV at /app/profil/podglad. One project and incomplete draft per candidate in the versioned scenario, compatible with old saves, export/import/reset. Do not silently adopt the shared workshop draft or expose unsaved content in the preview. Application submission and employer access remain unchanged in this profile task; the preview is labelled as a candidate-controlled preview, not a new public profile endpoint. Preserve prior workshop and discovery work.

Design authority: repository-local docs/design-system (Poster People), current host catalog and immutable kit. An older globally available cobalt skill conflicts with this repository's explicit no-global-skill visual rule and current screens; this task follows the requested consistency with the existing app. Compose C01/C02/C13/C22 with Geist Serif 400, Arial, paper/white/ink, pink action, r18 controls/r24 surfaces. No kit or global theme changes.

Acceptance: labelled reusable form fields, profile-specific validation without job-target requirement, safe optional links, explicit save-draft/save-to-profile, change isolation across personas, saved summary with bounded excerpts and expandable complete text (including limitations and measurement), no implied verification. Existing profile/CV behaviour and application snapshots remain. Check empty/edit/error/complete/draft/reload/import/reset, keyboard and 1280/850/390/320 layouts; compare rendered source controls; run project checks and report actual browser provisioning limits.

## Executed verification and separate review — 2026-11-11

Implemented the existing profile edit/preview routes, candidate-owned optional nested draft/project data, shared workshop fields and read-only expandable summary. Added host component documentation and updated FEATURES.md (CAN-03/04/05/07, PRJ-02). Basic profile, CV, submitted application and employer behaviour are preserved.

`npm run check` passed formatting, immutable-kit integrity/six kit tests, lint, TypeScript, 34 units, baseline packet and build; its browser stage cannot launch the unprovisioned Chromium. No tools or browsers were installed. Full fallback Chrome run: 43/46; two pre-existing PDF tests flag Chrome PDF extension URLs as external, and the third identified existing workspace landmark omissions. Fixed mobile-header/topbar semantics without visual changes. The full profile Axe scan was kept intact. Then 11 targeted profile/shared regression journeys passed. After the final title-scale adjustment, build and all five profile journeys passed again, including full-profile Axe at 390px. Final formatting/lint and diff whitespace checks passed. No full default browser gate pass is claimed.

Separate review inspected edit, empty, saved and expanded preview states in the in-app browser. Matched source/host title font family, weight and 28px desktop / 26px mobile sizes at 1280/390, plus r24 card; comparison JSON and paired source captures are in artifacts/. Scoped card/form captures cover 1280/850/390/320. This is a host recipe, not a new immutable-kit variant or resolution of unrelated company findings. Full-page screenshots may displace fixed shell elements in their export; standalone card captures preserve the deliverable independently.

Durable evidence and Polish review: `../prototypes/profile-project-v1/`. Real participant research and effectiveness results remain uncollected. Profile preview does not confer employer access or attach project snapshots to applications.
