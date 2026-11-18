---
name: experiment-design
description: Design concrete assumption tests using prototypes, demand tests or commitment tests. Use when turning research or selected ideas into experiments, comparing test methods or revising an experiment plan.
metadata:
  ready_to_publish: "true"
---

# Experiment Design

Turn research or selected concepts into a runnable experiment plan. Choose the method by the assumption and the decision it can inform.

Respond and produce all artifacts in the user's conversation language.
Use natural, descriptive language for titles as well as explanations. Before naming or summarizing tests, read `references/writing-quality.md`. Keep participant-facing copy separate from research terminology.

## Explain the experiment first

Explain each experiment through five short, self-contained blocks, translated into the user's language. Keep the first three as the plain-language core:

1. **Hypothesis:** the person's problem and why a specific product change should lead to a desired behavior or outcome. Keep the broader product hypothesis distinct from the assumption this test can examine.
2. **Experiment:** what changes in practice, for whom, at which point in the product or service, using which method. Include the actual action or offer, such as button text. Explain any proposed feature before using shorthand like "the card" or an internal ID.
3. **Observable change:** what behavior should change, in which direction, for whom and how it will be observed. Define the measure, comparison or denominator and relevant context/window. Do not imply an increase from an unknown baseline.
4. **Decision after results:** which next action favorable, unfavorable or mixed evidence would support, within the scope of this method. State what the test cannot decide; failure of one idea does not establish that another works.
5. **Why now:** why reducing this uncertainty matters more than the alternatives, given current evidence, preparation, access to participants and time to useful learning.

Default to directional evidence, not invented numerical success thresholds. The human decides whether the observed change is enough for the next investment. Record thresholds only when supplied by the user or when the user asks for help setting them; keep proposals distinct from accepted criteria. Missing thresholds do not block a recommendation. On results review, present the observations, tradeoffs and recommended interpretation for human judgment, without silently declaring success.

Assumptions belong inside each experiment's hypothesis and explanation. Do not introduce a separate reader-facing assumption layer, gate, register or duplicate lists on idea and test cards. Explain that the agent derives the proposed hypothesis from the selected idea and evidence during experiment design; it is not a source fact or an accepted user decision. Preserve existing assumption IDs internally for traceability, but use plain language in the main view.

Put logistics, source IDs, allocation, rubrics and recording sheets after these blocks or in supporting files. They should support an understandable experiment, not substitute for one. Do not make laboratory prototypes the default first step: match the user's learning priority, including interest in enabling an option in an existing workflow. A short note should state which part of the hypothesis the signal addresses without burying the proposal in caveats.

## Preserve portfolio scope

A user example of wording, format or a metric is illustrative unless they explicitly select that experiment or change the scope. Apply the requested format across the relevant recommendations; do not replace a portfolio with the example, promote its method or threshold to a default, or park other ideas because of a writing correction.

When asked for experiment recommendations for selected ideas, provide a small portfolio covering their important distinct assumptions. Explain which tests are alternatives, can run independently, or depend on earlier findings. Separate recommending the next test from the user selecting a test. Do not add methods merely to fill every family; do not silently reduce a plural request to a single recommendation.

## Intake and resuming

- Reuse the conversation's outcome, opportunity, concepts, sources and destination. Ask only for missing information that materially changes the design and cannot be inferred.
- Read the project's discovery state, such as `ost-state.json` or a Supersprint state, as the map of selections and review status. Preserve its format and identifiers; neither framework is required.
- Unstructured research: run Rounds 1-3. Existing evidence matrix: start at Round 2. Selected concepts: run Round 3 directly, reading their supporting evidence and unresolved constraints.
- State the scope you are resuming. Preserve selected concepts; do not reopen accepted gates or regenerate a fixed number of alternatives.
- Save in the user's project, normally under `experiments/`. Preserve prior plans when revising and identify what supersedes them. Never write client material into the skill itself.
- Designing tests does not imply running sessions, exposing a live feature, contacting people or taking payments. Track plans separately from observations. Synthetic participants and AI role-play can rehearse a protocol, not validate customer behavior.

## Round 1: Evidence, when needed

Load `references/confidence-propagation.md` and the evidence section of `references/output-templates.md`.

1. Extract needs, frustrations and workarounds into `evidence-matrix.md` with specific source citations.
2. Record frequency, severity, confidence (HIGH/MED/LOW) and category (product/policy/ops/tech-debt). Distinguish quotes, observations and inference.
3. Summarize coverage, counterevidence and gaps. Interviews about the same event are not independent replications; identify the relevant people, organizations and events.

Thin evidence is a limitation to carry forward, not an automatic blocker. Source count alone does not make an evidence base solid.

## Round 2: Opportunities and concepts, when needed

Load `references/frame-discipline.md`, `references/concept-diversity.md` and the relevant output templates. Optionally load `references/product-sense-lenses.md` for a useful critique.

1. Write a one-sentence problem frame naming the user and situation.
2. Group evidence into customer needs and link them to the outcome. Reuse opportunity IDs and accepted interpretations.
3. When mapping a wider opportunity space, use the two Mermaid views in the templates.
4. Generate a small set of materially different concepts. Three is a useful starting point, not a quota. Describe each mechanism and biggest assumption.
5. Distinguish confidence in the need from confidence in a particular solution's effect.

## Round 3: Experiment design

Load `references/experiment-catalog.md` and the experiment section of `references/output-templates.md`. When comparing tests or recommending a sequence, also load `references/rice-as-debate.md` for decision and prioritization guidance.

1. **Name the decision and formulate each test's hypothesis.** Distinguish choosing the next learning step from selecting an idea to build or approving a rollout. State which uncertainty blocks that decision. Separate interest, usability, experienced value, repeat use, willingness to pay, technical feasibility and business economics. Identify the riskiest assumption within the experiment explanation and the decision a result would change. Keep untested risks in a plain-language limits note rather than a second tree layer. Distinguish user, beneficiary, buyer and budget owner.
2. **Choose observable behavior.** State what the relevant person would actually do, with what material, in which situation. A favorable opinion, click, completed task, payment and renewal answer different questions.
3. **Select a family and subtype:**
   - **Prototypes:** paper sketches, clickable screens, video demos, Wizard of Oz, concierge or thin functional prototypes.
   - **Demand tests:** smoke tests, including fake doors, advertising, landing pages and pricing pages. A waitlist is a possible action on a page.
   - **Commitment tests:** letters of intent, saved payment methods, presales, paid reservations/deposits, crowdfunding or paid pilots. State the exact commitment and terms.
4. **Compare plausible alternatives.** Explain why the method answers this assumption better than another applicable method. Families can overlap, such as paid concierge. Do not force every concept through all three families or arrange them into a universal ladder. A/B is a comparison design, not a family.
5. **Check scope fit.** For technical feasibility use a research spike or benchmark; for economics include delivery cost. Manual delivery does not validate automation. Unknown traffic, payer, recruitment access or price remains a dependency; prepare what is possible without claiming launch readiness.
6. **Write the five-block explanation first, then supporting materials.** Specify the offer/stimulus, participant task, relevant audience, denominator/comparison, observation window, expected direction and conditional next action. Draft actual prompts, screen copy or service offers when these determine what is tested. Link existing materials rather than duplicating them.
7. **Describe decision-relevant evidence.** Explain favorable, unfavorable and mixed or insufficient observations and their implications. Keep success adequacy under human judgment by default; do not fill missing criteria with arbitrary conversion rates, task counts or time limits. If quantitative design is requested, ground proposed thresholds and sample size in the next decision and available baseline/cost evidence. Include omissions, dropouts and missing outcomes explicitly.
8. **Compare and sequence.** Compare tests by the importance of the decision, uncertainty reduced, evidence fit, effort, recruitment access and time to useful learning. Do not rank different ideas by incomparable click, task-success and payment rates. Recommend one next test with reasons, retaining the rest as alternatives or conditional follow-ups; parallel work is optional when its value justifies the effort. Ground effort and time-to-data in preparation, recruitment, delivery and the behavior's natural recurrence. Park irrelevant methods with a reason. Payment tests need a payer, priced offer and credible fulfillment terms; do not manufacture these to fill a category.

Keep decision-critical fields in the card; put longer stimuli, scripts and recording sheets in a separate materials file. Produce a usable plan, not a copy of the catalog.

## Round 4: Persist and review

1. Save the bet pack and useful materials. Update existing project state/history within scope; preserve accepted selections and pending human reviews. Record family/subtype, assumption links, revision, execution status, threshold status and results separately. A recommendation is not user approval.
2. Re-read only outputs produced or changed in this run. Each recommendation needs an assumption, subtype, concrete stimulus/task, expected directional behavior, comparison/denominator/context, conditional next actions, priority rationale and limitations. Check source links and scope consistency. Apply the standalone readability check in `references/writing-quality.md` to every title and short preview; revise the canonical explanation before updating its views.
3. Check boundaries: clicks are not use or payment; a saved card is not a charge; payment is not satisfaction or retention; manual performance is not automated feasibility. Repeated observations are not independent people or organizations.
4. Verify numerical success criteria have explicit user provenance or a request to propose them, human judgment remains distinct from the recommendation, and outcomes remain empty until observations exist. Do not invent results, participants, prices, launch dates or statistical certainty.
5. Create `mini-spec.md` only after supplied results reduce the relevant assumption enough for the next implementation decision. Mixed or inconclusive evidence calls for another learning step.

Present the portfolio using Hypothesis, Experiment, Observable change, Decision after results and Why now for each recommendation; close with a reasoned next-step recommendation. If the user explicitly requested a single test, narrow accordingly. Put saved files and operational details afterward. On a rerun, explain the material change in the recommendation.

## HTML recommendations and previews

By default generate `bet-pack.html` alongside the canonical Markdown recommendations, unless the user requests text only. Read `references/html-output.md` and `references/html-style.md` for the localized, self-contained view, default visual style and bundled renderer. Preserve every recommendation, the five explanation blocks, sequence, directional criteria and review status in the full recommendations. Tree previews show only the essential hypothesis, practical method and measurable direction, with a link to the full source; do not copy the full plan into the preview. Viewing HTML must not select or approve experiments. Save the view beside the Markdown and record its path in existing project state where appropriate.


For generated HTML artifacts, use the host app's built-in/in-app browser as the primary preview and for visual/interaction checks. Open a visible browser tab through the host's supported capability and verify that it loaded; a file link, editor tab, or queued open request alone is not a confirmed preview. Use Chrome or another external browser only when the in-app browser is unavailable, cannot display the artifact, or lacks a required inspection capability; briefly explain that fallback and keep the in-app preview primary when possible. Honor an explicit user browser choice. If the host blocks access by policy, report the limitation rather than bypassing it through another browser or route.
