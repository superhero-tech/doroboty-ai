# HTML Recommendation View

Produce `bet-pack.html` alongside `bet-pack.md` by default, unless the user explicitly requests a text-only output. Markdown remains the canonical record; the HTML is a self-contained reading and comparison view of the same recommendations, order, statuses and expected directions.

Read `references/html-style.md` for the default visual contract. The bundled renderer automatically inlines `assets/html-style.css`; preserve it when adapting layout.

## Content and interaction

- Lead with the recommended next test and its rationale, then compare all relevant recommendations.
- Give each recommendation its five blocks: hypothesis, experiment, observable change, decision after results and why now. Preserve evidence limits and conditional prerequisites.
- Use accessible expandable sections, anchors from the comparison and expand/collapse controls. Viewing interactions must not approve/select an experiment or change project state.
- Keep proposed versus accepted selections and planned versus observed results clear. Do not add quantitative success thresholds or imply completed experiments in the HTML.
- Use a responsive layout, readable type, keyboard focus, usable contrast and print styles. Inline CSS/JS, no remote fonts, CDN, analytics or external runtime.
- Translate all labels and content into the conversation language. Preserve full explanations; do not replace the portfolio with only the recommended test.

## Tree cards and embedded previews

Apply `references/writing-quality.md` to titles and short previews. Keep the concrete person, information or offer, action, and observed behavior when shortening. A preview may use several short sentences; do not turn a clear source explanation into abstract shorthand or rely on a full-source link to explain the proposal.

A tree is another view of the same experiments. Reuse the current recommendation content instead of rebuilding a thinner description from state IDs. Connect the idea directly to the experiment, with no assumption layer or duplicate assumption lists on ideas. On the node show a concise hypothesis, named method with the practical action, and expected measurable behavior. Keep the click preview brief: only the hypothesis, practical method and measurable direction with its essential comparison or denominator, plus a prominent link to the full source plan. Leave protocols, source-ID lists, extended rationale and decision scenarios in that source. The full recommendations retain all five blocks; the preview must not reproduce the full document. Preserve limits and human judgment without inventing thresholds.

Apply the same reading depth across tree layers: each outcome, opportunity and idea node gets a short meaningful summary, then a few sentences of context in its click preview and a link to the full description/evidence. Keep related-node navigation compact.

Keep assumption IDs in internal metadata when needed, not as the reader-facing explanation. Label hypotheses as agent-proposed inferences from selected ideas and evidence; source citations support the rationale, not proof of the solution's effect.

## Bundled renderer

Use `scripts/render_recommendations.py` with standard Python, or adapt the view when the user's needs require it. The renderer accepts a localized JSON view model, escapes raw HTML and supports paragraphs, flat Markdown lists, bold, inline code and links. It is a reading artifact, not an application backend.

```sh
python3 /path/to/skill/scripts/render_recommendations.py /project/experiments/bet-pack-view.json /project/experiments/bet-pack.html
```

The view model contains:

- `lang`, `title`, `subtitle`, `eyebrow`, `kicker`, `summary` (short Markdown), `recommended_id`.
- `columns`: four localized comparison column labels.
- `labels`: localized `overview`, `comparison`, `recommendations`, `expand_all`, `collapse_all`, `source`, `recommended`, `plan_status`, `table_caption`, `footer`.
- `recommendations`: objects with `id` (unique anchor), `title`, `method`, `priority`, `decision`, `dependencies`, `source` (relative Markdown path), and `blocks` (ordered `label`/`body` objects).
- `notes`: optional `title`/`body` objects for sequence, evidence and status notes.

Build the view from the current Markdown explanations; preserve source filenames and relevant links. Keep the view model beside the HTML for reproducibility. Do not store client input or generated artifacts inside the reusable skill. On changes regenerate the view from the current content and check that no recommendation or decision block was lost.

## Verification and preview

Check that all recommendations and five blocks are present, source links resolve, the suggested next test and statuses match the Markdown/state, and the artifact has no runtime network dependency. Check the renderer with the actual view model. When visual/interaction verification is available, inspect desktop and narrow layouts and expandable sections in the host's in-app browser.

Follow the browser preference and policy limits in `SKILL.md`. If policy prevents a local HTML preview, preserve the deliverable and report the unverified visual/interaction check. Do not bypass the restriction with another browser, a local server or another route. A saved file or queued editor open is not a confirmed browser preview.
