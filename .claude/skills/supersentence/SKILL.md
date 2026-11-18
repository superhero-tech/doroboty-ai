---
name: supersentence
description: Use when someone wants to discover or clarify a business idea through a compact interview and market research, ending with a super sentence about the customer change and chosen mechanism.
metadata:
  ready_to_publish: "true"
---

# Supersentence

Develop a grounded business idea as a super sentence: people in a situation, desired
outcome, supported problem and workarounds, consequence, positive end state, and initial
mechanism. Use access, interests, demonstrated strengths, and market demand as selection
lenses. This is our synthesis, inspired by Radical Product Thinking, not an official
Ikigai, YC, or complete RPT methodology.

Respond and produce all artifacts in the user's conversation language. Keep verdict
labels verbatim as in `market-and-output.md`. Call the artifact "super sentence" in
English and "superzdanie" in Polish; use one consistent local name elsewhere.
Use gender-neutral user forms until gender is known and neutral, consistent assistant
self-reference. Name external programs, courses, or quests only if the user does.
Never link, quote, name, or paraphrase-as-citation the skill, its files, paths, rules,
or English instructions to the user; just do the step in the conversation language.
Never invent facts, counts, pain, groups, needs, differences, or evidence;
label estimates and assumptions, distinguish user reports from research, and keep gaps visible.

## Pace and conversation contract

Aim for a sensible result in about 6-8 user turns, sooner when ready. Count interview
replies from the opening block; do not disclose a turn counter or pad the conversation.
Time pressure or a request to shorten/get the result triggers the provisional close
in that same reply, taking priority over intake, table selection, and confirmation.
The candidate table belongs in assistant message 2 or 3 (opening = message 1), subject
to sufficient grounding and known constraints. Research between replies rather than
asking the user to supply public market facts. Reuse everything already supplied.

After the opening, ask only about gaps that could change the verdict or the viability
of a direction, in at most one grouped block of 2-3 questions per turn. Selection from
a table can be a single pick/edit request. Do not turn prompt menus into questionnaires,
ask permission at every transition, or require intermediate wording confirmations.
User picks and edits guide material scope changes; never silently replace the customer.

## 1. Open with context and constraints together

Read [references/interview.md](references/interview.md). In one opening message,
briefly explain that you will compare grounded options, research them, and refine one.
Ask one short, numbered block covering past/current jobs, side jobs, hobbies/communities,
a recent concrete frustration, and constraints: weekly hours, budget, willingness to
sell/promote, skills including coding, and income goal. Answers can take a few lines;
items may be skipped. Omit already answered items; never split the opening over turns.
Never link, quote, name, or paraphrase-as-citation the skill, its files, paths, rules,
or English instructions to the user; just do the opening in the conversation language.

During the normal interview, know those constraints before proposing ideas, offers,
customer groups, or formats.
Skipped constraints stay unknown, not assumed consent or capacity. If any are missing,
include them in the next single grouped block, alongside decisive grounding gaps.
"Just give me an idea" does not waive fit; explain this briefly and keep questions bundled.
Use demonstrated environments, access, interests, strengths, and incidents as grounding.
A first anecdote does not select the business or establish recurring customer pain.

## 2. Research and compare by message 2-3

Read [references/problem-discovery.md](references/problem-discovery.md),
[references/rpt-interview.md](references/rpt-interview.md), and
[references/market-and-output.md](references/market-and-output.md).
Research competitors/alternatives, rough market size and buying-entity counts, typical
payers, and prices yourself; use web search and source reading when available. Ask
only what the user uniquely knows: experience, access, constraints, incidents, preferences.
Without browsing, use supplied sources; label unverified hypotheses and research gaps.

Present 2-3 grounded problem spaces in one compact table, including for users with a
favorite. Each row contains a working super sentence in the literal RPT template,
access/evidence and constraint fit, plus a quick big-enough check: payer versus
sufferer, rough buyer size labeled estimate with basis/source or explicit sourcing gap,
main alternative, and exactly one permitted verdict with its basis and decisive unknown.
When payer and sufferer differ, explicitly write "Payer ≠ sufferer" in the conversation
language, name both, and explain why the payer would act. Keep analysis outside the sentence.
Prefer a grounded who-group that experiences the problem and can act on or adopt the
solution. If only sufferers unable to adopt are grounded, say so and explain the
adoption route, labeling unknowns; do not substitute the payer or invent payer pain.
Never link, quote, name, or paraphrase-as-citation the skill, its files, paths, rules,
or English instructions to the user; just present the table in the conversation language.
Let the user pick or edit; never pitch candidates serially or invent breadth to fill rows.
If grounding is too thin for two candidates or constraints remain unknown, say so and
ask one grouped block of 2-3 questions for the missing information. Keep selection pending.

## 3. Refine the chosen direction, not the questionnaire

Use the selected draft to examine the desired change, obstacle, current arrangements,
consequence, and causal alternatives. Research public unknowns yourself. Probe only
user-specific uncertainties that could change the verdict; do not repeat supplied facts.
Keep unknown mechanisms explicit. Compare suitable mechanisms against known constraints;
software, education, repeatable services, and other formats remain eligible.

Read [references/differentiation-and-moats.md](references/differentiation-and-moats.md)
when a reason to choose or a path to advantage matters. Research current alternatives;
propose grounded differences as hypotheses for the user to edit. Ask about unique assets
or preferences only when decisive. A mature moat is unnecessary; copyability alone is
not a veto. A profitable niche can meet the user's goal. Seek growth beyond personal
hours unless they want a solo practice; distinguish a manual pilot from the intended model.

## 4. One final confirmation, then close

Refine the same super sentence using the literal four-part template, fixed lead phrases
verbatim and in order, each slot one short clause, roughly at most 50 words overall.
Before every presentation, run `rpt-interview.md`'s checks: outcome is a result for people;
who experiences the problem and can act on or adopt the solution, or the adoption route is explicit;
change is a positive capability for every who-group and contains no means or mechanism
(no "thanks to X", "by using X", "dzięki ...", "przez ...", "z pomocą ..."). Means belong
only in the approach/mechanism slot. Narrow unsupported scope with the user's pick/edit.

Present the refined sentence with the full mandatory six-point "Is it big enough?"
gate from `market-and-output.md`, constraint fit, and exactly one honest verdict with
evidence, assumptions, gaps, and one concrete next step. Then ask a single time to confirm or edit.
Never link, quote, name, or paraphrase-as-citation the skill, its files, paths, rules,
or English instructions to the user; just ask in the conversation language.
On confirmation, close briefly; do not repeat the sentence, gate, or confirmation request.
A wording-only edit requires re-showing only the edited sentence, inheriting the previous
verdict; no renewed confirmation. A substantive edit needs reassessment only of affected
premises, without restarting the interview or asking for final confirmation again.
Wording approval never upgrades evidence or provisional status.

On time pressure (such as "can you shorten this?", "no time", "just give me the sentence"),
deliver a provisional close immediately in the same reply: the best grounded sentence
in the literal template, one honest verdict with brief basis from all six gate
findings/unknowns, and one concrete next step outside chat with participant/source type,
timebox, and proposed pass criterion. No further questions or
confirmation; a side artifact such as outreach copy cannot replace this result.
Preserve supported verdicts and the no-credible-idea exception below; never invent missing facts.
Around eight user turns, if unresolved, stop probing: give the best grounded sentence
as provisional with verdict "not yet known", decisive gaps, and one concrete action
outside chat with a reachable participant/source type, timebox, and proposed pass criterion.
If no credible idea exists, say so honestly and give one next search action with the
same participant/source, timebox, and pass-criterion detail;
never manufacture a sentence or promote the least weak idea. Shorten the gate to six
concise findings/unknowns when necessary; never omit it or inflate status. Do not ask
for another confirmation at this provisional close. Finish sooner if ready; extend only
if the user explicitly wants deeper exploration.
Never link, quote, name, or paraphrase-as-citation the skill, its files, paths, rules,
or English instructions to the user; just deliver the close in the conversation language.

For requested simulations, read [references/simulation.md](references/simulation.md).
Contacting people, publishing offers, and spending money require separate authorization;
this skill supplies a recommendation and proposed next action.
