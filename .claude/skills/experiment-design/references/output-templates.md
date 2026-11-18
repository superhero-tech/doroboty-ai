# Output Templates

Use sections needed for the entry point. Round 3 resumption reuses evidence and selections; it does not require a new matrix, map or concept set. Translate headings naturally.

## Evidence matrix, when created

Record source files, date, independent people/organizations/events, coverage, gaps and counterevidence.

| ID | Need / pain | User and situation | Workaround | Quote / observation | Frequency | Severity | Confidence | Category | Source |
|---|---|---|---|---|---|---|---|---|---|
| [ID] | [Need] | [Context] | [Observed / unknown] | [Quote or labeled inference] | HIGH/MED/LOW | HIGH/MED/LOW | HIGH/MED/LOW | product/policy/ops/tech-debt | [File and section] |

Cite underlying material, not only a generated theme. Distinguish unknown frequency from observed counts.

## Bet pack

Deliver `bet-pack.md` plus its `bet-pack.html` reading/comparison view by default. Follow `references/html-output.md` for rendering and verification. Keep them aligned; the HTML is a presentation of the same portfolio, not a separate recommendation or an approval interface.

Start with the problem frame, selected opportunity/concepts, evidence basis and review status. Reuse IDs. Separate confidence in the need from the untested effect of solutions.

### Hypothesis within each experiment

Express what must be true within the experiment's hypothesis, together with the evidence and remaining uncertainty. Describe method choice and alternatives in its explanation. Do not create a separate assumption table or tree layer, or duplicate an assumption list on idea cards. Existing technical IDs may remain in supporting metadata; the reader should understand the proposal without them.

### Portfolio scope

Name the ideas and distinct assumptions covered. Repeat the five-block explanation below for each recommended experiment, keeping hypothesis, experiment and observable change first. Distinguish independent tests, alternatives and conditional follow-ups; give a recommended sequence after presenting the options. A formatting example is not a selection and does not reduce the number of recommendations. Example metrics and methods remain illustrative unless adopted for a stated reason.

### Experiment: reader-facing summary first

These five blocks are the primary explanation, in this order. Translate headings naturally. Start with the user's situation and a concrete change in the product; explain any new feature before giving it a shorthand name. Put source IDs and research operations afterward. Follow `references/writing-quality.md` for the title and body. Describe the actual person, information or offer, and action; method labels and abstract nouns cannot stand in for that description.

```markdown
## [Plain-language experiment name]

### Hypothesis
[Who struggles with what; what product change we believe will help; desired behavior/outcome and why.]

### Experiment
[Family/subtype. Who sees what, where and when in the real product or service.]
[Actual button/prompt/offer and what happens when they act.]

### Observable change
[Expected direction of behavior; measure and relevant audience/comparison/denominator/context.]
[The human assesses whether the observed change is sufficient. No default numeric success threshold.]

### Decision after results
[Decision this test can inform: next learning step, idea development or another specific investment.]
- Favorable evidence: [observed pattern -> proposed next action].
- Unfavorable evidence: [observed pattern -> proposed change/stop].
- Mixed or insufficient evidence: [ambiguity -> specific diagnostic or learning step].
[Keep judgment of success explicit; do not infer that failure of one idea proves another.]

### Why now
[Importance of uncertainty, available evidence, effort/access and useful learning relative to alternatives.]

[One sentence: which part of the broader hypothesis this test examines and what remains for later.]
```

For example, an interest test might expose a new option during a relevant setup step and count the share of unique eligible users who select it. A task test measures task behavior; a payment test measures the exact monetary commitment. Do not turn an example threshold into a default. Add numerical success criteria only when provided by the user or explicitly requested for proposal; record their source and acceptance status.

### Supporting execution details

Include when needed, after the summary or in a separate file:

- Status, execution status, concept/assumption IDs, evidence and review status.
- Eligibility, recruitment/traffic, sample rationale, exposure/comparison, assistance and confounds.
- Event definitions, deduplication, observation window and handling of skips, dropouts or missing data.
- Conditional next actions and human review status; thresholds only when user-defined or requested, with provenance.
- Payment tests: actual buyer, deliverable, price, payment/refund/fulfillment terms; unknowns make the test conditional.
- Preparation, ownership, delivery effort and prerequisites; conditional follow-up.
- Actual results or an explicit not-collected status. No simulated customer results.

Report observed counts without turning them into automatic success criteria. Directional evidence can support a useful recommendation while the human judges its adequacy. If numerical planning is requested and evidence is missing, propose gathering the necessary baseline before setting a cut-off.

### Sequence and handoff

Compare the tests in a compact decision table: decision enabled, key uncertainty, evidence fit, preparation/access and priority. Recommend the next test with prerequisites and conditional follow-ups. Park premature methods with reasons. Distinguish completed design from launch readiness. A favorable small pilot does not justify automatic rollout.

### Separate materials, where useful

Participant copy, stimuli, moderator prompts, coding rubric, exposure/allocation table and recording sheet. Label illustrative vs source-based material. Outcomes stay empty until observations exist. A real offer must be fulfillable; illustrative terms are not approved commercial terms.

## Opportunity maps, when needed

Use `graph TD`, quoted labels `["text"]`, short IDs and `<br/>` line breaks. Write opportunities in the customer's voice with evidence references and confidence. Avoid invented jargon and styling.

Split wider trees into two readable views: outcome plus top-level opportunities; selected opportunity plus relevant sub-opportunities, concepts and experiments. Connect concept directly to experiment. Each experiment contains its hypothesis, named method, concrete action and observable change; do not add assumption nodes between them. Keep its click preview concise and link to the full five-block explanation in the source plan. Give the other layers the same progression: short node summary, a few sentences in the preview, full context at the source. A question title, IDs or method badge alone is not an experiment description.

## Conditional mini-spec

Only after supplied results justify an implementation decision: experiment and observed evidence, remaining uncertainty, user/situation, problem, smallest implementation scope, success measure and open risks. Do not claim confirmation beyond the observation's scope.
