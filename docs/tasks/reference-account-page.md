# Serve the supplied account page on localhost

## Intent

Make the exact supplied `konto.html#aplikacje` page the site shown at `/#/`. The previous React adaptation did not match the requested page. Copy the local static site and its dependencies into Vite's public directory, then render the source page directly in the root view without changing the top-level URL. Keep the other React hash routes available.

## Acceptance criteria

- `/#/` embeds `/landing-doroboty/konto.html#aplikacje` with its original HTML, CSS, scripts and local assets, without a page redirect.
- Relative links between the supplied static pages and their assets resolve under localhost.
- Existing React routes such as `/#/oferty` and `/#/app/...` remain accessible.
- The copied page uses its original synthetic profile/application demo state, which is separate from the React prototype's local scenario storage.
- Do not modify or distribute historical AIPH case evidence. Keep the Poster People reference kit immutable and update PUB-01.

## Source and implementation

Copied the supplied `public/landing-doroboty` directory to this project's `public/landing-doroboty`. The React root renders that local page in a full-viewport iframe; the outer shell header/footer are omitted there because the source page includes its own. Other prototype routes and their implementation remain available. The source page keeps its own synthetic profile/application state in browser storage, separate from the React scenario.

## Validation

- `./scripts/verify` ran with local-port permission. Formatting, design-system integrity (67 files), lint, types, 27 unit tests, baseline packet verification and production build passed. Playwright could not launch its 34 Chromium journeys because the provisioned Chromium executable is missing at `~/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell`; no browser or OS dependencies were installed.
- After switching to the exact source page, the root iframe, account document and relative static resources were manually confirmed in the local browser. Desktop/mobile Playwright and keyboard browser journeys remain unverified because Chromium is unavailable.
- The workspace has no `.git` directory, so a task branch and commit are unavailable. No branch or commit is claimed.
