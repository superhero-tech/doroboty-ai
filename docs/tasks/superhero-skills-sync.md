# Vendor and sync Superhero skills

## Intent

Make the trainers' skills from https://github.com/superhero-tech/superhero-skills (MIT) available to agents working in this repository and keep them current without manual copying.

## Decisions confirmed by the participant

1. Copy the skills into the repository: `.claude/skills/<name>/` (Claude Code, Claude on the web) and `.agents/skills/<name>/` (Codex). Not a plugin reference only.
2. Automatic updates arrive as a pull request for review; nothing merges automatically.
3. Work on a separate branch, then merge to `main` after approval, because scheduled GitHub Actions run on the default branch.

## Acceptance criteria

- `scripts/sync-superhero-skills.sh [ref]` copies every upstream skill folder (with its references, assets and scripts), writes `docs/superhero-skills.json` (upstream commit and managed list) and the upstream LICENSE into both targets.
- Re-running is idempotent; only manifest-listed skills are replaced or removed; other folders (the participant's own skills) are preserved; duplicate upstream names abort without changes.
- `.github/workflows/sync-superhero-skills.yml` runs weekly and on demand and opens or updates one pull request.
- Vendored files are excluded from Prettier and ESLint; the app, packet and tests are unaffected.

## Evidence

- Sync run twice (idempotent), targets identical, a test folder `.claude/skills/moj-skill` survived a sync. 19 skills from upstream commit b5e0474.
- `./scripts/verify` result recorded in the commit/PR description.
- The GitHub Action has not run yet. On a fork, Actions must be enabled, and "Allow GitHub Actions to create and approve pull requests" must be allowed in repository settings.
