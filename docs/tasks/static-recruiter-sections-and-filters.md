# Static recruiter workspace sections and filters

## Intent

Use the shared public navigation and role-aware Mój profil dropdown in the static recruiter demo. Keep offer creation, published offers and candidate applications on dedicated pages.

## Acceptance criteria

- Every recruiter page uses the shared sticky public navigation: Start, Oferty pracy, Dopasowanie, O portalu and FAQ.
- Signed-out users see Zaloguj się. After sign-in, that control becomes a Mój profil dropdown; candidate accounts see all candidate destinations, recruiter accounts see all three recruiter destinations, and Wyloguj się is last. Escape closes the menu and returns focus to the trigger.
- Offer creation, published offers and applications render on their own pages; the applications page retains the AI interview inbox and process actions.
- Applications can be filtered by offer and process status and searched by candidate, role or company. The current result count and empty states are clear; filters can be reset and an offer link can open its filtered applications.
- Keep synthetic browser-local data and role simulation. Follow the existing DoRobory.AI moodboard: dark navy surfaces, cyan accents and yellow primary actions.
- Update `FEATURES.md` and `BRIEF.md` behavior notes without changing stable feature IDs.

## Verification plan

- Check all three pages signed out and as the simulated recruiter, including public navigation and the role-specific profile dropdown.
- Check offer creation and published-offer rendering; check offer, status and text filters, reset, and status changes on applications.
- Inspect keyboard and mobile navigation behavior, including the persistent top bar.
- Run `./scripts/verify`, record the actual results, and separately review the changed source.

## Data boundaries

Recruiter access remains a same-browser simulation. Applications, offers and filters introduce no real credentials, server persistence, candidate delivery or cross-device state. Only synthetic records are supported.

## Verification results

- Browser review confirmed recruiter pages use the same Start, Oferty pracy, Dopasowanie, O portalu and FAQ navigation as Start. With a signed-in candidate, Mój profil opens a dropdown containing Przegląd, Moje aplikacje, Nowe oferty, Moje dane, Moje CV and Wyloguj się. Escape closes it and returns focus to the trigger. Source review confirms recruiter sessions receive the three recruiter destinations and sign-out.
- Reviewed offer creation and published-offer pages. The published offer's applications link opens the applications page with that offer selected, including a clear zero-results state.
- Verified application filters against the local synthetic records: rejected status returned one application, an offer filter returned that offer's two applications, text search for “Kuba” narrowed the selected offer to one, and reset restored all six applications.
- Checked 1280 px, 390 px and 320 px browser viewports. The masthead remained sticky, the public navigation stayed in its own row, the profile dropdown fit inside the viewport and document width matched viewport width. At narrow widths, the public navigation scrolls horizontally inside its row.
- `node --check public/landing-doroboty/site.js` passed. Prettier checks for the changed files and the full-project format check passed.
- `./scripts/verify`: formatting, design-system integrity and examples, lint, typecheck, 28 unit tests, participant packet verification and production build passed. Playwright did not start because the sandbox denied its preview server bind on `127.0.0.1:3106` (`EPERM`). The request to rerun the verification command outside the sandbox was rejected, so the browser suite remains unverified for this change.
- The production build emitted existing Zod annotation and large-chunk warnings. Static source review confirmed role simulation and browser-local records remain intact; filters use local application/job values, and user-visible labels are inserted as text.
