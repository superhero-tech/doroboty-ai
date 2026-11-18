#!/usr/bin/env bash
# Vendors the skills from superhero-tech/superhero-skills (MIT) into this repository:
#   .claude/skills/<name>/  (Claude Code, Claude on the web)
#   .agents/skills/<name>/  (Codex and other AGENTS.md tools)
# Only skills listed in the previous manifest are replaced or removed; any other
# skill folder (for example your own) is left untouched.
#
# Usage: ./scripts/sync-superhero-skills.sh [git-ref]   (default: main)
set -euo pipefail
cd "$(dirname "$0")/.."

UPSTREAM="https://github.com/superhero-tech/superhero-skills.git"
REF="${1:-main}"
MANIFEST="docs/superhero-skills.json"
TARGETS=(".claude/skills" ".agents/skills")

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
git clone --quiet --depth 1 --branch "$REF" "$UPSTREAM" "$work/upstream"
commit="$(git -C "$work/upstream" rev-parse HEAD)"
source_root="$work/upstream/plugins/product-discovery/skills"

# Skills managed by the previous sync (one name per line).
previous=()
if [[ -f "$MANIFEST" ]]; then
  mapfile -t previous < <(node -e 'for (const s of require(process.argv[1]).skills) console.log(s)' "$PWD/$MANIFEST")
fi

mapfile -t skill_dirs < <(find "$source_root" -mindepth 2 -maxdepth 2 -type d -exec test -f '{}/SKILL.md' ';' -print | sort)
if [[ ${#skill_dirs[@]} -eq 0 ]]; then
  echo "No skills found in $UPSTREAM ($REF); aborting without changes." >&2
  exit 1
fi

names=()
for dir in "${skill_dirs[@]}"; do names+=("$(basename "$dir")"); done
if [[ $(printf '%s\n' "${names[@]}" | sort | uniq -d | wc -l) -ne 0 ]]; then
  echo "Duplicate skill names upstream; aborting without changes." >&2
  exit 1
fi

for target in "${TARGETS[@]}"; do
  mkdir -p "$target"
  for name in "${previous[@]}"; do rm -rf "${target:?}/$name"; done
  for dir in "${skill_dirs[@]}"; do
    name="$(basename "$dir")"
    if [[ -e "$target/$name" ]]; then
      echo "Skipping $target/$name: a folder with this name is not managed by this sync." >&2
      continue
    fi
    cp -R "$dir" "$target/$name"
  done
  cp "$work/upstream/LICENSE" "$target/SUPERHERO-SKILLS-LICENSE"
done

node -e '
const [file, commit, ref, ...skills] = process.argv.slice(1);
const data = {
  source: "https://github.com/superhero-tech/superhero-skills",
  path: "plugins/product-discovery/skills",
  ref,
  commit,
  license: "MIT (see .claude/skills/SUPERHERO-SKILLS-LICENSE)",
  targets: [".claude/skills", ".agents/skills"],
  skills,
};
require("fs").writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
' "$MANIFEST" "$commit" "$REF" "${names[@]}"

echo "Synced ${#names[@]} skills from superhero-skills@${commit:0:7} into ${TARGETS[*]}."
