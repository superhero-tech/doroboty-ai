# Release, smoke check and recovery

This prototype is a static build (`dist/`) for AIPH3 course participants. It has no server, database, accounts or environment variables; every participant's scenario lives in their own browser's localStorage. Hosting is **not chosen yet**, so provider-specific steps below are marked _TBD_. The production-readiness report is [production-readiness.html](production-readiness.html).

Owner and first responder: **Tom** (`tommlyski`). Participants report problems through: _TBD — e.g. the course channel_.

## Release a known version

1. Start from a reviewed commit on `main` with green CI (`.github/workflows/ci.yml` runs `./scripts/verify`).
2. Locally with Node 24: `npm ci`, then `./scripts/verify`, then `npm run build`.
3. Check that `dist/` holds only `assets/`, `case/baseline.csv`, `company-logos/`, `cv/` and `index.html`; no `docs/source` or instructor notes. A local macOS build may copy `public/.DS_Store` into `dist/`; delete it before publishing (CI builds from a clean checkout do not have it).
4. Publish the `dist/` folder of that commit. _TBD per hosting._ Note the commit hash and the provider's deployment ID in the release note.
5. Keep the previous deployment available for rollback (most static hosts keep earlier deployments).

`vite.config.ts` uses `base: "./"`, so the build also works from a sub-path such as `https://<user>.github.io/<repo>/`.

## Smoke check right after publishing (about 5 minutes)

Use a fresh private browser window so no earlier local state interferes.

1. The target address opens over **HTTPS**, shows the homepage with job cards and the robot brand, with no browser console errors.
2. Open a hash deep link directly, e.g. `<address>/#/oferty/ai-product-manager`, and reload: the same offer appears (no 404, no unstyled page).
3. Main journey: choose Anna Kowalska → apply to “AI Product Manager” → switch to Karolina Wiśniewska (BrightLabs) → find the application under Kandydaci → change its stage. Reload: everything is still there.
4. Settings (`/#/app/settings`): export downloads a JSON file; reset asks for confirmation.
5. Network tab: no requests to any host other than the target address.
6. Unknown address `<address>/#/oferty/missing` shows “Nie znaleziono strony”.

**Rollback condition:** roll back if step 1, 2 or 3 fails, or if participants see a blank page or “Coś poszło nie tak” on a core route. Fixing forward is fine only if the fix is small and can be verified before the next session.

## Incident runbook

### 1. Diagnose (5 minutes)

- Reproduce in a private window at the target address. Does the homepage load? Does the failing route fail for everyone or for one participant?
- **Everyone affected** (site down, blank page, 404 for assets): a hosting or build problem → go to step 2.
- **One participant affected** (their data does not load, “Nie udało się odczytać zapisu”, “Coś poszło nie tak” only for them): a local-state problem → go to step 3.
- Check the browser console (F12) for the error. Do not ask participants to send their exported file through public channels; it contains the whole scenario.

### 2. Return to the previous version

- Republish the last known-good deployment. _TBD per hosting_ (e.g. “Promote/Publish” on the previous deployment, or redeploy the previous commit).
- Repeat smoke checks 1–3.
- Data compatibility: participants keep their localStorage. An older build must still read saves written by the newer one. If a release changed the stored data shape, check in a private window that a save exported from the newer build imports into the older one before relying on rollback.

### 3. Recover one participant's data

1. Ask them to open **Ustawienia** (`/#/app/settings`) and **export** their data first (if the app shows “Nie udało się odczytać zapisu”, they can download the original save there).
2. Reload. If the problem stays: **import** the exported file (validated; an invalid file leaves the current state unchanged).
3. Last resort: **reset** the scenario to the baseline. This deletes their local changes, so export first.

### 4. Communicate

Short message for participants (Polish UI language):

> Prototyp DoRoboty.ai ma chwilowy problem. Nie czyść danych przeglądarki — Twoje zmiany są zapisane lokalnie. Damy znać, gdy wszystko wróci do normy (zwykle w ciągu kilkunastu minut).

After recovery, post a one-line all-clear and record what happened in `docs/learnings/` if there is a lesson worth keeping.
