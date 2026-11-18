---
name: super-landing-page
description: Use when building a distinctive landing page through a guided interview, independent art direction, a detailed execution prompt, and visual iteration. Preserve ambitious composition and motion for the chosen direction. Not for routine code fixes or prompt analysis alone.
metadata:
  ready_to_publish: "true"
---

# Super Landing Page

Guide the user from an idea to a working, polished landing page. The interview reveals intent; the agent translates it into professional design decisions. Do not require knowledge of typography, graphics, animation, or technology. Respond and produce all artifacts in the user's conversation language. Establish the website language from context or during the brief; respect an explicit different language for the page or a requested artifact.

Default deliverables: a working responsive website, `LANDING_BRIEF.md`, `DESIGN.md`, a self-contained `LANDING_PROMPT.md`, and an honest verification report. A prompt alone is the final deliverable only when explicitly requested. Creating or editing this skill does not itself authorize an interview or a sample website.

**Quality target:** an original, visually exceptional, production-quality website whose chosen artistic material organizes the entire scrolling composition: space, hierarchy, rhythm, atmosphere, and behavior. A conventional landing page with added pictures does not meet the target. For dynamic directions, motion structures the experience rather than decorating it with fade-ins. A deliberately quiet or static direction requires equally intentional composition. Preserve this ambition even when the user answers only with numbers.

## 1. Establish context

Read supplied materials and repository instructions. For an existing website, inspect the code and, where available, the rendered page before proposing changes. Separate real brand constraints and facts from incidental implementation choices.

Establish the product, audience, new/redesign/polish scope, language, primary action, available evidence and assets, constraints, repository, and delivery expectations. Respect the user's repository location instructions.

Do not default to typography-first, SaaS, dark backgrounds, gradients, cards, video, 3D, or React. Page type and art direction are separate decisions. Use the existing stack by default.

## 2. Interview with complete options

Read the [interview catalog](references/interview.md) before the first question. Follow its stages, adapting examples to the offer. Ask one decision and one main question per message, never the entire questionnaire. Show progress as "Stage N/12" in the user's language; stage 10 contains two separate decisions.

**The complete menu is a user requirement:** show every option for each question actually asked, including less recommended options. Do not reduce the menu to two or three favorites. The catalog is the supported menu, not a claim to exhaust all possible solutions. Always allow a custom answer, a meaningful combination, and "recommend for me".

Explain each option through its visible outcome, when it helps, and its material cost or limitation. Avoid jargon-heavy definitions. Recommend one option with a reason grounded in this brief, while preserving the complete choice.

Each question includes:

1. Brief context and the effect of this decision.
2. The complete numbered menu with short explanations.
3. One recommendation and a concrete reason.
4. One request to choose by number, description, or delegation.

**Questions belong exclusively in chat text.** Do not use question tools or modal/form interfaces, even if available. In Codex this includes `request_user_input` and `request_user_input_async`; in other hosts use an ordinary text response instead of their question widgets. Apply this to every stage, clarification, and revisited choice. End the turn with the question and wait for the user's normal chat reply. Use Markdown: stage and short context, each numbered option as a separate item, a separate recommendation paragraph, then the question. Separate blocks with blank lines. Do not flatten options into one paragraph or a code block. Allow answers such as "2+5" for multiple choices. Do not make dependent decisions before the answer.

Do not ask again about a choice clearly established in this conversation or supplied materials. Record it and continue at the first unresolved stage. Reopen the complete menu only when the user wants to change that decision.

"I don't know" calls for an explained recommendation, not another demand for design knowledge. "Recommend for me" delegates this decision; "choose everything / no more questions" delegates remaining design decisions. Silence is not a choice. During the interview, clarify only contradictions materially affecting the offer, goal, scope, or feasibility. After the interview, synthesize independently without further design questions.

## 3. Supply expertise, preserve facts

Maintain a decision register: stage, answer, decision, rationale, and status (`supplied`, `chosen`, `proposed`, `unconfirmed`). Separately record binding requirements with sources: palette, medium, composition, promised motion/interactions, scope, and constraints. Writing an agent proposal into the brief does not turn it into a user choice. Persist the register once the destination is known; until then retain it in context. On resuming, read `LANDING_BRIEF.md` and continue from the first gap. Revise dependent choices after a change rather than restarting the interview.

Develop hierarchy, composition, contrast, rhythm, proportions, type and scale, palette, spacing, framing, motion, and mobile yourself. Do not ask for hex values, easing, breakpoints, or font names unless the user wants to specify them. After the leading material is chosen, read the [art-direction mechanisms](references/art-directions.md).

Distinguish:

- **Design decisions:** choose and justify independently.
- **Audience/positioning hypotheses:** propose and label them; do not present them as research.
- **Business facts:** prices, results, integrations, clients, testimonials, certificates, dates, and availability require user input or credible sources. Do not invent them.

Collect assets at their relevant interview stages. Afterward inspect supplied resources and credible sources within authorized scope rather than adding another sourcing/design questionnaire. For missing evidence, specify an honest substitute (demonstration, method, labeled example) or an explicit dependency. Do not mark omitted evidence as delivered. A missing endpoint means an unconnected function, not consent to a simulation. Complete feasible work without pretending production success or presenting a blocked path as ready. Missing facts do not justify lower artistic quality.

Do not copy an entire reference's composition, copy, or branding. Adapt observable mechanisms and record the adaptation. Inspect a supplied URL before claiming to reproduce its style; disclose access limitations.

## 4. Synthesize independently

After the interview, read [artistic synthesis](references/artistic-synthesis.md), then [specification and verification](references/specification.md). This is agent work, not another user gate. Consider alternative interpretations and choose the strongest. Develop the visual thesis, whole-page storyboard, continuity, motion sequences, palette, and materials. Choose CSS parameters only after determining what happens on screen and why.

Derive supporting details from this project too: captions, lines, symbols, numbering, and accents. Do not attach the same decorative kit to different directions. Each use needs a concrete informational, compositional, or expressive role; its appearance in an agent-written brief or prompt is not evidence of suitability. Use the synthesis reference's selection process without a blacklist of forms or further questions. Preserve ambition in composition, material, and motion.

Create a **requirement -> source -> composition/behavior -> verification evidence** matrix. Resolve feasibility and contradictions without silently changing requirements. Local execution does not mean a simpler aesthetic, system fonts only, no libraries, or a demonstrator. Optimization and reduced motion do not authorize removing promised choreography from the full version. Lower implementation cost while preserving effect and meaning.

Do not add questions about concept selection, parallax type, fonts, animations, or synthesis approval. Resolve missing creative details yourself. Describe irreducible business/technical dependencies and continue feasible work without calling them approved scope changes. Preserve required authorization for external actions.

### Write the brief, specification, and full prompt

Before coding, save:

- `LANDING_BRIEF.md`: facts, hypotheses, decisions/provenance, binding requirements, constraints, dependencies, and the status of each selected evidence type.
- `DESIGN.md`: concise alternatives and chosen thesis, storyboard, motion score, concrete palette/composition rules, requirements matrix, QA plan, and later actual evidence. Preserve unrelated screens in an existing document.
- `LANDING_PROMPT.md`: a full creative commission with the ambition of the original Typography-First mandate, adapted to the chosen direction and concrete project. No "as discussed" dependencies, style labels alone, or CSS recipe in place of direction. It must work in a new conversation with the listed assets and files attached.

Present a short concept synthesis and key assumptions, then proceed with authorized building. Do not add mandatory prompt approval when the user already requested implementation. Pause if the user explicitly requested approval before coding. If they want only a prompt, deliver it and stop before implementation.

## 5. Build and refine

If available, `art-direct-landing-page` can supply execution guidance and relevant references. Interview decisions are already resolved: do not restart its gates, prune menus, or override the direction. Its absence is not a blocker.

Use the available website-building workflow. If Sites is available, read its current skill and relevant execution instructions; preserve project identity/configuration for `.openai/hosting.json`. Stage 12's local option explicitly means local-only, without registration or publication. For selected hosting, follow its complete workflow and authorizations. Do not assume specific tool names or plugin version paths.

Build copy, composition, and motion together. The first vertical slice includes the opening, a transition to a key later scene, and actual chosen motion/interaction. Run and view the sequence in motion before expanding. A static hero with "animations later" does not validate the direction. For deliberate static design, verify equivalent compositional continuity. Use a hero -> logos -> cards -> testimonials template only if this project's assets and goal justify it.

Prepare materials for composition and motion: separate layers, masks, backgrounds, frames, states, and media fallbacks. Use the appropriate skill for image generation or implementing a supplied design. Video, CSS, SVG, canvas, WebGL, and animation libraries are implementation choices; the selected experience is a requirement. Do not replace promised material with placeholders or a sequence with a fade-in. If a medium is unavailable, build an equivalent preserving concept, palette, and motion; otherwise record the unmet requirement honestly.

Implement meaningful interaction endpoints. Anchors work; forms validate and handle errors; submission requires a real connection. A local demonstrator must not pretend to save or send. Do not add CRM, payments, analytics, backend, or services absent from the brief.

Run the page and follow the verification reference. Assess correctness, art direction, experience over time, and requirement compliance separately. Inspect scroll transitions and interaction states; a hero screenshot cannot prove parallax or choreography. Compare actual surfaces, text, imagery, and effects with the palette. Fix generic composition, lost continuity, illegibility, missing motion, and palette drift even when the code works. Repeat affected checks after changes and finish when criteria are met. Never claim visual/time-based verification without observing those states; disclose unavailable tools and actual checks without inventing evidence.

## 6. Deliver

Provide a working preview or implementation location, run instructions, links to the three documents, a short concept explanation, and actual verification performed. Include screenshots when available. State remaining dependencies such as an unconnected endpoint without presenting a prototype as a production-connected form.
