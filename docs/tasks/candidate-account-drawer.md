# Candidate account drawer and dedicated pages

## Intent

Replace the static demo's always-visible candidate menu and combined account screen with a right-side candidate drawer and separate pages for each existing account area.

## Acceptance criteria

- A signed-in candidate can open and close a right-side drawer from candidate account pages and the offers page.
- The drawer links to the overview, applications, offers, candidate data and CV.
- Applications, candidate data and CV each have a dedicated page; the overview no longer renders all three sections together.
- Existing local application progress, withdrawal, profile fields and CV upload/removal behavior continue to work on their respective pages.
- The drawer supports keyboard use, narrow screens, visible focus and reduced motion, and follows the supplied DoRobory.AI moodboard.
- Recruiter and signed-out views do not expose the candidate drawer. Keep all state browser-local and synthetic.
- Update `FEATURES.md` and record actual validation results.

## Verification plan

- Compare the affected views with the supplied moodboard at desktop and mobile sizes; inspect 320 px and relevant reflow boundaries.
- Open each candidate drawer destination and verify it renders only its own content.
- Check menu open/close, Escape, active navigation state, account switching, application status and CV upload/removal.
- Inspect desktop and mobile layouts and run `./scripts/verify`.

## Risks and limits

- Candidate profiles and actions remain a same-browser simulation. This change adds no real account authentication or server storage.

## Verification results

- Manually opened the drawer and visited the overview, applications, offers, candidate data and CV destinations. Each destination rendered its own account content; applications, data and CV were no longer combined on one page.
- Confirmed the current destination is highlighted in the drawer, and Escape closes the drawer and returns focus to its trigger.
- Confirmed the candidate pages and drawer retain the supplied moodboard's navy surfaces, cyan accents and yellow highlights. The drawer displays on desktop and at a 390 px mobile viewport without horizontal page overflow.
- `node --check public/landing-doroboty/site.js` passed.
- `./scripts/verify`: formatting, design-system checks, lint, typecheck, unit tests (28 passed), participant packet verification and production build passed. End-to-end tests could not start because the preview server was denied permission to listen on `127.0.0.1:3106` (`EPERM`).
- The build reported existing Zod annotation and large-chunk warnings. Local validation does not establish CI, deployment or production behavior.
