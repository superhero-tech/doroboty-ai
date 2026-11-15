# DoRoboty.ai — AIPH3 prototype

## Unified site for Agata — 2026-11-15

Build the accepted landing + portal + profile with `npm run build:publication`.
Upload **publish/** to Netlify, not dist/. Preview with
`npm run preview:publication` at http://127.0.0.1:3015/.
See [the publication guide](publication/README.md) and
[integration scope](docs/tasks/unified-publication.md).
The ordinary build below remains the teaching application. The previous
readiness report assessed that application, not the unified publication.

## User-confirmed profile design override — 2026-11-11

For `/app/profil`, `/app/profil/podglad` and `/opis-projektu`, the user explicitly requires the approved Super Brain DoRoboty.ai system: **Courier New Bold + Arial, cobalt #2449ED, ink #191C25 and 45-degree chamfered corners**. Use [the correction guide](docs/design-system/DOROBOTY-PROFILE.md) and [approved rules](docs/design-system/doroboty-approved/design-rules.md). This scope overrides every conflicting Poster People instruction below. Do not reselect the pink/Geist/r24 theme for these routes. Preserve data, Base UI behaviour and the old immutable kit; unrelated marketplace routes retain their existing implementation until requested otherwise.

A frontend-only job marketplace for participants to extend and test. Built with React, TypeScript and Vite, using Base UI components. The required visual direction for new and changed screens is the accepted Poster People design system.

## Design system — start here for UI work

Read [project integration instructions](docs/design-system/README.md), [host implementation rules](docs/design-system/IMPLEMENTATION.md) and [application acceptance checklist](docs/design-system/VERIFICATION.md), then [design.md](docs/design-system/agent-kit/design.md), [component API](docs/design-system/agent-kit/components/API.md) and the relevant [human documentation](docs/design-system/agent-kit/reference/index.html). The complete 67-file kit is stored under docs/design-system/agent-kit, including reusable CSS/JS, component states, listing/offer examples, screenshots, Geist Serif with license and illustration. No other chat or global skill is required.

```sh
npm run design-system:check
npm run design-system:dev
```

With Node 24, the first command verifies the preserved kit and examples; the second serves a separate local preview at http://127.0.0.1:8952/. No kit installation is needed. The main app uses port 3001 as below.

Build UI from this system, adapting its anatomy and visual roles into the existing React/Base UI components and host tokens. Preserve application behavior and hash routing; do not replace product state with the standalone demo fixtures/controllers. The application has a host adaptation. For every UI task, compare the affected anatomy, type roles, state and keyboard behavior with the reference; passing kit checks alone does not establish visual acceptance. See the integration guide for exact reading order, assets, React mapping, responsive rules and verification. AGENTS.md and CLAUDE.md enforce the same direction.

## Run

Requirements: **Node.js 24 and npm**.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3001. No environment file, account, database or additional service is required. Package installation requires access to the npm registry.

Select Anna or Marek as a candidate, Karolina or Tomasz as an employer, or the instructor. Publish a job, apply, switch person and record the employer decision. Changes survive reload in this browser; settings provide export, import and reset. AI and scores simulate prepared scenarios. Use example CVs only.

## Build and verify

```sh
npm run build
npm run preview
./scripts/verify
```

The static output is dist/. Browser checks require an already provisioned Playwright Chromium; starting the app never installs it. See [participant guide](docs/PARTICIPANT_GUIDE.md), [architecture](docs/architecture.md), [current features](FEATURES.md) and [case protocol](docs/case/CASE_PROTOCOL.md).

For checks using an existing Google Chrome instead, set `PLAYWRIGHT_CHANNEL=chrome`
before `npm run check` (PowerShell: `$env:PLAYWRIGHT_CHANNEL='chrome'`). This does
not install a browser. CI keeps its provisioned Playwright Chromium.

Local moderated sessions: see [release and recovery instructions](docs/LOCAL-RELEASE.md)
and the offline [readiness report](docs/production-readiness.html).

To distribute a baseline participant package, run npm run package:participant -- /absolute/output/directory. This excludes Git history and instructor source material. Never distribute this repository’s history as a stage-safe packet.
