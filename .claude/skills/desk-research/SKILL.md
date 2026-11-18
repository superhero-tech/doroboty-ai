---
name: desk-research
description: "Use when the user wants desk research, a literature review, competitive evidence, or to test a hypothesis. Search live sources, challenge assumptions, and explain what the evidence means in a concise report with a separate evidence file."
metadata:
  ready_to_publish: "true"
---

# Desk Research

Answer the user's research question with traceable evidence, explain when the answer changes, and connect it to their decision when one exists. Research depth belongs in the evidence file; the report should make the subject easier to understand.

Respond and produce all artifacts in the user's conversation language.

## Natural titles and explanations

Write titles, labels, summaries, and explanations in natural, descriptive language from the start. A reader should understand who does or needs what, with which concrete information or product change, without opening another file. Prefer a clear sentence to compressed research shorthand; do not impose a fixed title formula.

Use descriptive report and finding titles that state the question or supported answer in ordinary language. In each short explanation, identify the people, task, change, and observed outcome. Preserve uncertainty and distinctions between interventions rather than replacing them with broad labels.

Before saving the canonical artifact and again after shortening it for HTML or a handoff, read the title and description on their own. Can a reader picture what happens and say what we learned or want to learn? If not, clarify them here before projecting them into another view. This is part of this skill's own output quality, not a dependency on a separate editing skill. Do not invent details or alter facts, scope, or review status to make the wording concrete.

Use live web search and read original sources. If search is unavailable, say so and stop rather than presenting remembered claims as fresh research. Never modify `ost-state.json`.

## 1. Establish the brief

Read relevant project context and any existing `research/desk-research-state.json`. Reuse an agreed brief and prior user choices. Resume a matching run; for a different question or an explicit comparison, create a separate run directory and preserve earlier results.

Identify the question, relevant population or setting, working hypothesis if any, and decision if one exists. Ask only about missing information that would materially change the research, one question at a time. Do not invent a business decision for an exploratory request. State reasonable assumptions and continue when the user has delegated the process; do not require approval of queries or synthesis by default.

Use up to three focused research questions for a normal run. If the hypothesis says "usually", "better", or "without loss of quality", identify the population, comparison and outcome needed to evaluate that claim. A counterexample may establish a boundary without refuting a claim about what usually happens. Separate compound claims, such as speed and quality, when their evidence differs.

Default to **quick**. Use **deep** for an explicitly broad review or when requested; question count alone does not determine depth. Explain any material scope expansion before undertaking it. Initialize `assets/state-template.json` for a new run; keep an existing state's usable brief and fields when resuming.

## 2. Plan and collect evidence

Read `references/quality-rubric.md` before evaluating evidence. Search both practical applications and research literature unless the scope calls for only one. Choose terms, cases and source languages for the actual domain; technical questions need primary papers, documentation or original research reports rather than commentary.

For rapidly changing topics such as AI and coding agents, actively seek the most current applicable primary evidence and follow-ups before selecting historical studies. Apply the rubric's freshness check using data-collection dates and tool generations, not publication date alone. Older results can explain mechanisms or provide historical baselines; conclusions about present tools need evidence that actually applies to them. If that evidence is missing, say the current effect is unknown rather than letting historical results stand in for it.

Plan searches for the hypothesis, rival explanations, null or adverse results, and conditions where the effect changes. Record the main searches and access gaps in the evidence file. There is no quota of contrary findings or percentage of negative text. If no credible counterevidence is found, state the search limitation without inventing opposition or claiming its absence proves the hypothesis.

When delegation is available, dispatch the two scans in parallel using:

- `assets/shared-subagent-base.md` plus `assets/competitive-subagent-prompt.md` for applications and company cases.
- `assets/shared-subagent-base.md` plus `assets/scholar-subagent-prompt.md` for research literature.

Include the quality rubric and brief in each dispatch. Substitute the placeholders from the brief, query plan and project path. If delegation is unavailable, run the scans sequentially and keep their notes separate. Delegation is a research technique, not the report's organizing structure.

For quick, aim for 5-7 relevant sources per stream, allowing overlap. Start with about 20 web operations per stream; count each query, page open and find, including failed requests. These are planning guides, not reasons to pad evidence or stop before verifying a central claim. Review relevance and access problems before expanding. Stop unproductive retrieval routes promptly, and record actual coverage or overruns instead of looping to satisfy quotas. Deep reviews can broaden coverage where it changes the answer.

Read the methods, results and limitations of studies that carry the conclusion, not just their abstracts. Try an author manuscript or institutional repository when full text is blocked. If still abstract-only, limit the claim accordingly and name any missing detail that matters; do not imply the full study was assessed.

## 3. Synthesize by question and condition

Read both scans in full. Deduplicate underlying studies across streams, preprints, journal versions and company retellings. Cluster by what the reader needs to understand, not by which agent found it.

For each question, distinguish:

- What was observed, for whom, doing what, with which intervention or version, and against what comparison.
- What the design can establish, and how well it fits the user's setting.
- The strongest material counterexample or limitation and how it changes the answer.

Explain apparent disagreements using differences the sources actually establish: outcomes, task, population, tool generation, study design or time. Do not attribute a difference to experience, task complexity or another moderator merely because two studies differ on it. Distinguish an observed subgroup effect from a plausible explanation and an open question.

Avoid averaging incompatible measures or treating output counts as time saved, quality or business value. Treat "no statistically significant effect" as uncertainty, not proof of no effect. Older negative evidence needs the same recency scrutiny as positive evidence.

Form a direct answer and select 3-5 useful findings if supported; fewer is fine. A qualified answer should say which condition matters or which missing fact prevents a decision. "Results are mixed" alone is not a synthesis.

## 4. Write and save

Read `references/report-template.md`. If an HTML view is requested or produced by the agreed workflow, also read `references/html-style.md` and inline `assets/html-style.css` as the default style unless the user requests another. Keep the research scope, evidence, word limits and agreed output set unchanged; the style rule alone does not add a deliverable. Save two reader-facing files:

- `research/<YYYY-MM-DD>-desk-<topic>.md`: the report, at most **700 words for quick** or **1200 for deep**, including headings, tables, link labels and source notes. URL targets do not count.
- `research/<YYYY-MM-DD>-desk-<topic>-evidence.md`: the evidence register, full source details, access limitations and compact search/method notes. Link it from the report.

Write for the user's level of familiarity. Prefer familiar terms; explain necessary technical language where it appears. Include a statistic only when its meaning or uncertainty helps the reader. Explain why a conclusion deserves trust or caution instead of repeating unexplained confidence labels. Do not expose internal skill rules, agent roles, operation counts or approval history in the report.

Describe each finding once, with its relevant limitation beside it. The opening can state the answer without replaying the studies. Do not repeat the same percentages in a summary, two scan sections, a synthesis and a separate counterargument section. Keep important uncertainty in the report; the evidence file must not become a place to hide caveats.

If there is a decision, give a next move specific to the evidence. A recommendation to test should identify the comparison, outcome, main risk, and what result would change the decision. Label proposed thresholds, durations or sample sizes as proposals; do not invent them as research findings. If no decision was requested, close with the most important unresolved question rather than an unsolicited rollout plan.

Before finishing, check that the report answers the brief, explains relevant conditions without inventing causes, represents the strongest contrary evidence fairly, and stays within its word limit. Check central citations against original passages and verify that evidence-file links resolve. Store completion and file paths in state; clean up only the run's scratch files after consolidating their evidence. Preserve previous reports when comparing runs; when updating a report in place, retain its prior version in state rather than appending another full narrative.

Return the report link and its main answer. Keep research process details in the evidence file.
