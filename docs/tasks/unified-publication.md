# Unified publication — 2026-11-15

Combine the accepted original retro landing, approved portal v6 and accepted
candidate profile/project prototype into one deployable folder. The previous
readiness result covered the teaching repository application only.

## Acceptance and composition

The entry shows the accepted landing and original robot. Search opens the
approved portal; offer details link to the profile; the profile returns to the
landing and portal. Name/headline stay cobalt, buttons ink/white Courier New Bold,
with chamfered corners. A fresh profile starts with fictional Anna and an example
project. Existing saved scenarios are never overwritten by that initial example.

- `publication/landing`: preserved copy of the accepted 2026-10-25 landing.
- `publication/portal`: preserved copy of the approved 2026-11-08 portal v6.
- `src/features/project-contribution` and `src/features/prototype`: accepted
  profile and validated local storage.
- `publication/integration.*`: current fonts/buttons, shared catalogue and
  saved-offer identifiers, and cross-page navigation.

`npm run build:publication` builds profile mode and packages `publish/`:
landing at `/`, portal under `/portal/`, profile/form under `/profil/`.
All use the same origin. The portal's nine fictional jobs and saved offers also
drive landing cards. The marketing specialization scene remains an illustrative
example from the original landing. Application drafts remain local; profile
projects are not attached to applications or sent to employers.

The ordinary repository build remains a separate teaching workflow. Public
navigation uses the accepted landing and portal. No real authentication or
recruitment service is introduced. Original source folders outside this app
are not modified.

## Verification

Run `npm run check`, then `npm run build:publication` and
`npm run test:publication`. The latter tests the assembled folder: landing,
search/detail, saved-offer continuity, populated profile, disclosure, CV, return
navigation, desktop/mobile and file hashes. The new readiness report records
executed results and outstanding remote checks; the old 100% is not inherited.

Only `publish/` goes to Netlify. Source, research, QA screenshots, instructor
history and readiness reports are excluded from the public folder.
