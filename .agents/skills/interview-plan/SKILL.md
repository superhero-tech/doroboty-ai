---
name: interview-plan
description: "Turn a brief, data, or desk research into a customer interview plan: research questions, screener, guide, and a note format. Use when someone is about to talk to customers and needs to decide who to recruit, what to ask, and when to stop."
metadata:
  ready_to_publish: "true"
---

# Interview Plan

Build a customer interview plan gate by gate from evidence the team already has: research questions tied to a decision, a screener, a guide made of topics and probes, and a note format that drops straight into affinity mapping.

Respond and produce all artifacts in the user's conversation language. Mirror the vocabulary from the user's project files.

## Natural titles and explanations

Write titles, labels, summaries, and explanations in natural, descriptive language from the start. A reader should understand who does or needs what, with which concrete information or product change, without opening another file. Prefer a clear sentence to compressed research shorthand; do not impose a fixed title formula.

Name the behavior and situation each research question investigates. Write guide topics and participant questions so an interviewer and participant can understand them without research terminology. Do not simplify away the distinction between team research questions and questions read to participants.

Before saving the canonical artifact and again after shortening it for HTML or a handoff, read the title and description on their own. Can a reader picture what happens and say what we learned or want to learn? If not, clarify them here before projecting them into another view. This is part of this skill's own output quality, not a dependency on a separate editing skill. Do not invent details or alter facts, scope, or review status to make the wording concrete.

This skill **plans** interviews. It does not run them, does not invent participants or answers, and does not synthesize results - that is `affinity-mapping`.

## Where this sits

```
desk-research (competitors / industry) ─┐
                                        ├─→ interview-plan → affinity-mapping → supersprint
data-analysis (your own quant data)    ─┘
```

Either input alone is optional. Having *some* evidence base is not.

## Reference load map

Load each file only at the stage indicated:

| Stage | Load |
|-------|------|
| 2 Recruiting | `references/screener.md` |
| 3 Guide | `references/question-craft.md` + `references/modes.md` |
| 4 Logistics | `references/sample-and-consent.md` |
| 5 Artifacts | `assets/plan-template.md`, `assets/guide-template.md`, `assets/notes-template.md` |

## Hard rules (always active)

1. **No evidence base, no plan.** A brief, quantitative data, or existing qualitative material must be present. Without one, stop at Stage 0 and say what is missing. A plan invented from nothing produces questions that test the team's imagination.
2. **Every guide question traces to a research question.** No mapping, no question.
3. **Mom Test lint on every question.** Banned: hypothetical and future-tense ("would you", "how much would you pay"), solution-first (mentions your product before a story exists), compliment bait, leading, yes/no, double-barrelled. See `references/question-craft.md`.
4. **The falsifier is mandatory.** The plan states what the team would have to hear to conclude its hypothesis is wrong, and the guide contains at least one question capable of producing exactly that.
5. **Open before specific.** Broad story prompts come first; named topics later. A topic raised by the interviewer is not evidence that it matters.
6. **Verbatim or it did not happen.** Plan for a recording or a transcript, one file per interview, participant IDs assigned upfront. `affinity-mapping` cannot work without verbatim quotes and sources.
7. **Never fabricate participants or answers.** Synthetic respondents are sycophantic and untraceable to any real conversation. If the user wants practice, produce a roleplay explicitly labelled as an exercise, never as data.
8. **The user never picks a methodology.** You choose the spine (Stage 3.1) and say why in one sentence. Asking "story-based or switch interview?" pushes a decision onto someone who hired the skill to make it.

## Lazy user mode

Only after an actual skip signal from the user ("skip", "", "." or equivalent) - never as a default reading of a short request: auto-decide, state your pick and why in one sentence, continue. **Exception: the falsifier (1.5) is never auto-skipped** - it is the one thing protecting the plan from confirming what the team already believes. If the user will not answer it, derive a candidate from their hypothesis and make them approve or edit it. If they skip that too, write the candidate into the plan tagged `falsifier: derived, unconfirmed` and repeat the tag in the wrap-up - a gate nobody confirmed stays visible rather than silently passing.

## Workflow

```
Stage 0 Setup → 1 Decision + questions + falsifier → 2 Recruiting → 3 Guide → 4 Logistics → 5 Artifacts
```

**A gate ends your turn.** Present the block, ask, and stop there - do not open the next stage in the same message, and never produce artifacts before the last gate has an answer. Showing a gate and walking through it yourself is the same as having no gate. Generate everything in one pass only when the user asks for that explicitly ("just give me the whole plan"); say once that the gates were skipped and which decisions you made alone.

## Stage 0 - Setup and evidence base

1. **Ingest in two passes.** First take inventory: list the `.md` files at the project root and in `research/`, `analyses/` or similarly named folders, each with its first heading. Names alone lie, and briefs, PRDs and ICP notes rarely follow a convention - but reading everything burns the context on unrelated documentation. Then read in full only what the inventory shows is about the customers, the decision, or the domain. Above roughly 15 candidates, show the inventory and ask which to read. Note `.csv`/`.xlsx` filenames and data dictionaries without opening them; `ost-state.json` read-only; list transcripts already present.
2. **Report the base** in one table - `source | what it gives | how the plan will use it`. A source whose third column you cannot fill is not a source; drop it from the table. What survives is the citation pool for Stage 2.
3. **The base is empty** when nothing in it says who the customers are or what decision is at stake - a folder of files about something else counts as zero, not as two. Then stop and ask for the minimum; a paragraph is enough. Write that answer to `interviews/brief.md` as source zero and tag everything derived from it `[stated, unverified]`, so Stage 2's citation rule stays honest instead of being quietly skipped.
4. **If `interviews/plan.md` exists:** offer revise / plan a new round / stop.

## Stage 1 - Decision, research questions, falsifier (gate)

1. **Decision at stake** - one sentence: what gets approved, rejected, or changed by what we hear. When the brief already names the solution, the decision at stake is not that solution - it is whatever is still open around it. Name the locked part explicitly and scope the study to the rest. Only if nothing at all is open, say so and ask whether the research is worth running.
2. **Focus question** - the single question that disciplines the whole study ("What stops new customers from finishing setup?"). Hand this exact string to `affinity-mapping` later, so write it once and keep it stable.
3. **3-5 research questions** about behavior, needs, and mental models - never about product decisions. These are for the team, not for participants: a research question is not an interview question and is never read out loud.
4. **Working hypothesis** - what the team already believes, stated plainly even if nobody has written it down. You usually find it in the brief's framing.
5. **Falsifier (hard gate).** Ask: *what would we have to hear to conclude this hypothesis is wrong?* Push for something observable in a conversation, not an abstraction. Weak: "if customers disagree". Strong: "if customers who abandoned never raise price unprompted and instead describe not knowing what to do next".
6. Show the whole block. Gate: OK / edit / stop and discuss.

## Stage 2 - Who we talk to (gate)

Load `references/screener.md`.

1. **Segment from evidence, with a citation.** Every criterion points at a source and a number from Stage 0 ("customers who abandoned setup within 7 days - 38% of signups, `01-data-analysis.md`"). A criterion with no citation is a guess; mark it as one or drop it.
2. **Inclusion / exclusion criteria** - only attributes a research question actually depends on. Over-screening kills the sample.
2a. **Contrast group.** If the data shows the metric under study is not the one that pays (high activation, low conversion), add 2-3 people from the other side of it. Interviewing only the failing group tells you what they say, never what distinguishes them.
3. **Screener** - funnel order, past behavior instead of intentions, no yes/no, purpose never revealed, at least one open-ended question to catch professional participants.
4. **Channels** - name them, and if everyone will arrive through one channel, write the self-selection risk into the plan.
5. **ID scheme and empty slots** - fix the prefix scheme now (A, B, C...) and leave the rows empty. A pseudonym belongs to a real candidate record; invent one and you have put a person who does not exist into the plan, which is rule 7. Fill a row when someone actually answers the screener.
6. Gate.

## Stage 3 - The guide (gate)

Load `references/question-craft.md` and `references/modes.md`.

1. **Pick the spine yourself.** Story-based by default; switch timeline when the decision is about churn, switching, or purchase. State the choice and the reason in one sentence. Do not offer a menu.
2. **Opening** - one past-behavior story prompt ("Tell me about the last time..."), never a general-habit question ("What do you usually do?").
3. **Topics, not a questionnaire.** Each topic gets a purpose and two or three probes. The guide is a list of what must be covered, not a script to be read; in the room it is followed loosely.
4. **Mom Test lint** over every line. Rewrite what fails, do not just delete it - the underlying curiosity is usually fine, the phrasing is not.
5. **Disconfirmation check** - point at the question that can produce the falsifier from 1.5, and verify it comes before any question that names the same topic. If nothing can produce it, the guide is not finished.
6. **Mapping table** - `question -> research question`. Anything unmapped is either cut or promoted to a new research question (which means going back to gate 1).
7. **End state** - what makes the conversation worth having: facts, a commitment (they give up time, reputation, or money), or an advancement (they move a step further). Write the concrete next step the interviewer should ask for. A conversation with no next step was a nice chat.
8. Gate.

## Stage 4 - Logistics

Load `references/sample-and-consent.md`.

Decide and write down: starting N with a **stopping rule and an expansion rule** (never a bare number), cadence, session shape (45 min = 20-30 interviewing + 15-25 writing notes while it is fresh), roles (interviewer + notetaker), consent and data handling, file naming, and where transcripts land.

## Stage 5 - Artifacts

For any HTML view produced at this stage, read `references/html-style.md` and inline `assets/html-style.css` as the default visual style unless the user requests another. Preserve the agreed plan, gates and output set; this style rule does not add an HTML deliverable to every run.

Generate from `assets/`:

- `interviews/plan.md` - decision, focus question, research questions, hypothesis, falsifier, segment with citations, N and stopping rule, logistics, consent
- `interviews/screener.md`
- `interviews/guide.md` - opening, topics with probes, mapping table, end state
- `interviews/notes-template.md` - one per interview, verbatim-first
- `interviews/transcripts/` - empty, with the naming convention in the plan

Wrap up with: the artifact links, the falsifier restated in one line, the first three recruitment slots with the channel each is sourced from (real names only when they come from a file the user gave you - never invented contacts), and the handoff - *after the first interviews, run `affinity-mapping` with this focus question, one transcript file per interview, and the participant IDs from the plan*.

## Quality gates - stop and fix

- Guide question with no research question → cut it or go back to gate 1.
- No question can produce the falsifier → back to 3.5.
- Screener contains yes/no questions or reveals the purpose → back to 2.3.
- Segment criterion with no citation → back to 2.1, or label it explicitly as an assumption.
- N with no stopping rule → back to Stage 4.
- Any invented participant, quote, or answer → delete it and restate rule 7.
