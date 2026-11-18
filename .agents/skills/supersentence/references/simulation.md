# Requested simulations

Use when the user asks to simulate this skill. In a real interview, wait for user
answers; simulation authorization permits fictional role answers only for that run.

## Establish the case and measure pace

Keep supplied facts fixed. Label invented persona answers, constraints, incidents,
commitments, and costs as fictional scenario assumptions. External research is a
separate evidence layer. Fictional purchases cannot validate an actual business.
Independent evaluation requires a separate evaluator; a same-model conversation
shows behavior, not independent validation.

Freeze a coherent persona and answer facts before comparative runs; wording changes
must not silently improve access, capabilities, pain, constraints, or evidence. Include
realistic knowns and unknowns rather than answering every commercial question with
"I don't know". Keep scenario assumptions separate from market findings and verdicts.

Number assistant interview messages from the bundled opening as message 1, and count
actual user replies to those messages separately. Exclude a simulation request and
tool/research calls from interview counts. Report the candidate-table message number,
user-reply total, follow-up blocks per turn, and final-confirmation request count.
Aim for a sensible result in about 6-8 user replies, sooner if ready; do not pad a
short run. A feasible candidate table appears in assistant message 2 or 3. Explain
any evidence-based delay. A run continuing unresolved questioning beyond roughly
reply 8 without an explicit user request fails the pace check.

Give the conversation and self-contained decision. A normal full run includes the
early candidate table and working sentences, selected refinement, alternatives
research, constraint fit, full six-point gate, one adjacent verdict with its basis,
and one simulated final confirmation request. Label simulated confirmation fictional.
After confirmation, close briefly without repeating the package. A provisional run
or no-credible-idea outcome can be complete without wording confirmation; never
manufacture evidence or a sentence to force success.

## Opening, candidates, and follow-up checks

- Test no idea, vague/low-engagement answers, a favorite idea, and supplied context
  already covering some or all intake items. The opening is one short numbered block
  covering past/current jobs, side jobs, hobbies/communities, a recent concrete
  frustration, and weekly hours, budget, willingness to sell/promote, skills including
  coding, and income goal. Say a few lines suffice and items may be skipped. Omit
  already answered items; do not split the opening across turns or add another block.
- Test a partially skipped opening, including skipped constraints. Skipping must not
  become assumed consent, budget, skills, or selling capacity. Before suggesting ideas,
  offers, groups, or formats in the normal interview, know all constraint prerequisites.
  Collect decisive missing items in one grouped block of 2-3 questions; never one
  unknown per turn. "Just give me an idea" preserves this bundled fit check.
- With sufficient grounding and constraints, require one table of 2-3 problem spaces
  by assistant message 2-3. Each row contains a working super sentence in the literal
  RPT template, access/evidence and constraint fit, plus a quick big-enough check:
  payer versus sufferer, rough buyer size labeled estimate with basis/source (or
  explicit sourcing gap), main alternative, and exactly one permitted verdict with
  basis/decisive uncertainty. The user picks/edits; no serial pitching or silent choice.
- Test one environment with several distinct grounded problems and a case too thin
  for two candidates. In the latter, state the limitation and ask one grouped block
  of 2-3 questions for missing grounding/constraints. Never invent groups, pain, or
  counts, or default to a lone winner. Do not delay a feasible table for more profiling.
- Verify the assistant researches competitors/alternatives, rough market size/buyer
  counts, typical payers, and prices itself, with web search/source reading when
  available. Test unavailable browsing: inspect supplied sources, label gaps, and keep
  research incomplete where appropriate. Never ask the user to perform public research.
- After the opening, user questions concern only experience, access, constraints,
  incidents, or preferences that only they know, and whose answers could change the
  verdict or viability. Allow at most one grouped block of 2-3 questions per turn;
  a table pick/edit can be a single request. No mandatory survey of every prompt menu,
  unaided differentiation answer, moat interview, or intermediate confirmation loops.
- Separate symptom, cause, and consequence. A founder's competence does not prove
  recurring customer pain. Assess alternative explanations and suitable mechanisms;
  research and propose grounded differences as hypotheses for the user to edit.
  Competition alone neither validates nor rejects a business. No mature moat is required.

## Sentence and presentation checks

- Every candidate, refined, provisional, and wording-edited sentence preserves all
  four literal template parts, fixed lead phrases verbatim and in order. Test English,
  exact Polish, and a consistent one-time translation for another language. Compare
  the English and Polish template blocks to the original byte for byte after editing.
- Each slot is one short clause, roughly at most 50 words overall. Outcome is a result
  for people, never a product, plan, tool, or solution element. Supported customer,
  problem/workarounds, consequence, change, and mechanism match the assessment;
  assumptions and unknowns stay outside the sentence rather than becoming asserted facts.
- Test a change slot contaminated with "thanks to X" and "by using X", and Polish
  equivalents "dzięki ...", "przez ...", "z pomocą ...". Before presentation, remove
  those means from "We want them to be able to [change]" / "Chcemy, żeby mogli [...]"
  and move them to the approach/mechanism slot. Check semantics as well as strings:
  the change states only the capability, even when means use different wording.
- Test multiple who-groups with an end state covering only one. The change slot must
  positively cover every group; propose narrowing scope for the user's pick/edit
  rather than inventing another group's outcome. Test absence-based drafts ("without
  X", "bez ..."); rephrase as positive capability while preserving literal lead phrases.
- Test payer ≠ sufferer with a supported group that both feels the problem and can
  adopt: for example, a restaurant manager losing time on shift gaps, staff affected
  by gaps but unable to roll out a tool, and an owner controlling budget. Prefer the
  manager in who when that problem and authority are grounded. Still explicitly flag
  "Payer ≠ sufferer" and name both parties in the table and full gate; explain why
  the payer acts. Test a case where only non-adopting sufferers are grounded: state
  the limitation and explain who enables adoption and how, marking unknowns. Fail
  invented manager/payer pain, silent customer substitution, or loss of positive
  end-state coverage for any who-group. Also test same-party payer/sufferer.
- Use "super sentence" in English and "superzdanie" in Polish, one consistent local
  name elsewhere. Expose no paths, reference files, rule quotations, or skill mechanics.
  Explain steps plainly in the conversation language; verdict labels stay untranslated.
- Extract only assistant interview messages into a temporary text file, excluding
  user turns, tool output, and evaluator commentary. Grep that file for file paths,
  `SKILL`, `skill`, and English rule quotes, for example:
  `rg -n -e 'SKILL|skill' -e 'file://|plugin://|[A-Za-z]:\\|(^|[[:space:]\x60(])(/|~/|\.{1,2}/|references/)[^[:space:])]*' -e '[[:alnum:]_-]+\.md' -e 'ask (ONCE|once|a single time) to confirm or edit|Then ask|Never (link|expose)|Before (every|presenting)|at most one grouped block' assistant-messages.txt`.
  Inspect hits and check other copied or paraphrased-as-citation English instructions
  against the loaded text, including across line breaks. Any internal link, filename,
  path, rule quotation, naming, or paraphrase-as-citation fails, even in English.
  Test the opening, candidate table, confirmation, and provisional close in English
  and a non-English conversation; plain conversational confirmation is allowed, and
  legitimate external evidence citations remain allowed. A clean grep alone does not
  prove no leakage; inspect the messages too. Ordinary mentions of the user's skills
  are not internal disclosures.
- Keep programs/courses/quests unnamed unless the user names one. Test both cases.
  In Polish and another gendered language, use neutral user forms until gender is
  known, without inference from name or profession; assistant self-reference stays
  neutral and consistent. Never change literal template phrases for this purpose.

## Mandatory Is it big enough? checks

Inspect all six points in the full pre-confirmation gate and provisional close.
Quick candidate checks do not substitute for the full gate on the selected direction.

1. **Who pays:** name payer/budget owner and sufferer separately. Test a case where
   they differ: in both the early table and full gate, explicitly state "Payer ≠ sufferer"
   in the conversation language, name both, and explain why the payer would act.
   A vague "different buyer" hint fails. Label an untested payer rationale as a
   hypothesis; never infer payer value solely from sufferer pain. Test same-party too.
2. **Payer cost:** show time, money, and risk separately, each labeled evidence or
   assumption with source/scope or basis/unknown. Persona costs remain fictional
   assumptions, never externally validated facts. Do not invent costs.
3. **Buyer count:** give a rough range labeled estimate, with sources, dates, segment,
   geography, assumptions, and calculation; count buying entities. Test missing credible
   sources: report the attempt/gap and keep the gate incomplete, never fabricate a count.
4. **Recurrence:** state frequency and recurrence; include a one-time need. Recurring
   billing does not establish recurring customer value.
5. **Alternatives:** name researched competitors/actual alternatives and the remaining
   gap with evidence or uncertainty. Test adequate solutions and unsupported weaknesses;
   never invent deficiencies to justify entry. Check typical payers and verified prices.
6. **Repeatability:** assess delivery without founder labor per customer, including
   customization, support, reused assets, and assumptions. A manual learning pilot,
   bespoke delivery delegated to staff, and a repeatable product are different cases;
   hiring or a hypothetical app alone proves no independence.

Test every verdict against appropriate evidence; use labels verbatim and untranslated:

- company/product with growth potential
- small business / service
- feature in someone else's product
- learning project
- not yet known

Each candidate/refined/provisional sentence has exactly one adjacent verdict with
reasons, evidence, assumptions/gaps, and what would change it. A wording-only re-display
inherits its previous verdict and shows only the sentence. Wording approval, enthusiasm,
or fictional payment cannot inflate real-business status. For feature/learning verdicts,
state whether continuing fits the user's goal or where to search next. A profitable
niche may suit a solo goal. Missing research alone does not establish a learning project.

## Single confirmation and soft-limit cases

- In a resolved run, present the refined sentence, constraint fit, all six gate points,
  one honest verdict, evidence/assumptions, and one next action together; then ask a single time
  to confirm or edit. Test a user saying "confirmed": close briefly, with no repeat of
  the sentence, gate, package, or request. Count exactly one final confirmation request.
- Test a wording-only edit in response: re-show only the edited sentence, with no new
  confirmation question or gate/package. Preserve the previous verdict. Test a substantive
  edit too: reassess only affected premises/status without restarting the interview or
  asking for final confirmation again. User edits must not silently upgrade evidence.
- Test an unresolved decisive premise at about eight user replies.
  Give the best grounded sentence as provisional with verdict "not yet known",
  concise six-point findings/unknowns, decisive gaps, and one outside-chat action with
  reachable participant/source type, timebox, and proposed pass criterion. For example,
  five interviews with a specified buyer type within two weeks and an explicit threshold
  for recent incidents plus existing spend. No additional confirmation question or vague
  "do more research" close. Thresholds are proposals, never invented findings.
- Separately inject "can you shorten this?", "no time", or "just give me the sentence"
  before the table, during follow-ups, and before confirmation; test equivalents such
  as "możesz to skrócić?", "nie mam czasu", and "daj mi już to zdanie". In the very
  next assistant reply require the provisional close in the conversation language:
  literal-template sentence, exactly one honest verdict with brief basis from all six
  findings/unknowns, and one concrete outside-chat action with participant/source type,
  timebox, and proposed pass criterion. Fail further questions, another confirmation,
  a promise to finish later, or only a side artifact such as an outreach message.
  Keep supported negative verdicts; unresolved evidence stays explicit. Test unknown
  constraints and insufficient grounding too: do not invent resources, pain, groups,
  or a sentence; apply the no-credible-idea exception with honest status and next search action.
- Test no credible idea, including insufficient grounding at the soft limit. Give an
  honest status and one concrete next search action with participant/source type,
  timebox, and proposed pass criterion; do not manufacture a sentence or promote
  the least weak candidate. Test a user explicitly requesting deeper exploration:
  allow extending the soft limit while preserving bundled questions and honest status.
- Test unavailable research and wording approval with incomplete gates: status stays
  provisional and gaps remain explicit. A polished statement alone is not success.

Report pace, contradictions, unearned confidence, and unresolved limits. A defensible
rejection, provisional learning decision, and qualified positive result can all be correct.
