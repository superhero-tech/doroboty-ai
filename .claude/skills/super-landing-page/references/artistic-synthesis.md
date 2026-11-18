# Artistic synthesis - from answers to an authored experience

Mandatory after the interview, before the prompt and coding. Perform it independently. Do not send another questionnaire, ask the user to choose a concept, or turn them into the art director. Preserve all settled choices and their ambition.

## 1. Establish requirements that must survive

Extract from the whole conversation, not just menu numbers:

- Audience, promise, goal, and available argument/evidence.
- Leading material, character, composition, palette, and brand constraints.
- Promised experience: intensity, specific effects/sequences, and signature interaction. Explicit parallax, masks, or transitions are requirements, not suggestions to silently omit.
- Execution scope: location, retained functions, local/hosting, integrations, and actual dependencies.

Create a matrix: **requirement | source/status | scene/system implementation | verification method | result**. Before implementation the result is pending; after QA it contains the actual finding. A requirement written in a document has not thereby passed verification.

Separate constraints from agent-invented implementation assumptions. Local-only limits publication, not typefaces, layers, animation tools, or quality. Efficiency means achieving the effect efficiently. Rhythmic describes pace, not permission to use only simple reveals. A hosting/scope choice does not confirm assumptions about the product.

## 2. Develop and select a concept

Prepare three short, distinct interpretations of **the same choices**. Each has a visual thesis, opening, later development, and material behavior. Vary spatial relationships, narrative, and mechanism; recoloring or rearranging the same two columns is not a new concept.

Evaluate fit with the promise, character, whole-page continuity, motion potential at the selected level, mobile, and feasibility with real assets. Choose the strongest yourself. In DESIGN.md record one sentence per alternative and a concise selection rationale: a design decision record, not extended reasoning or another menu.

For limited polish, keep this exploration within authorized scope; do not redesign a fixed layout unsolicited.

State the thesis: **what does the chosen material do to space and the offer's meaning throughout the page?** "Layered paper objects" is a theme. Explain how their scale, position, relationships, and transformations create a story that clarifies the offer.

### Derive the supporting detail language

Design supporting details as intentionally as the principal material. Labels such as editorial, technical, poster-like, and premium do not automatically prescribe captions, lines, and symbols. Derive them from this offer, materials, identity, and compositional relationships. New forms are welcome; identify them as agent proposals. An ornament's inclusion in an agent-written document is neither independent provenance nor a user choice.

For significant detail families, briefly record in DESIGN.md: **starting point -> concrete role -> locations and extent of repetition**. Do not inventory every stroke, but judge each occurrence: a good motif in one location does not justify stamping it across all scenes.

- **Captions/small copy:** what do they add, and why this position and scale? They may supply a fact, orientation, brand voice, or reading rhythm. Do not add text only to fill a corner. Technical-sounding copy must not impersonate actual specifications, status, or data.
- **Lines/dividers:** what relationship do they reveal or concrete formal effect do they create? Shared section components must not force identical headings, paired captions, and borders onto every scene. Design the relationships first, then their shared implementation.
- **Symbols/ornament:** assess scale, direction, placement, material, and motion relative to the dominant. Abstract forms may work purely visually; do not fabricate product symbolism. "Adds character" or "creates coherence" without an observable effect is insufficient.

Do not use a blacklist of shapes, typefaces, or layouts. A form can suit different projects when each specific use earns its place. Do not force every category of detail into the page. Repetition should develop rhythm or meaning rather than automatically signal a "designed section".

During visual iteration compare questionable details with an alternative treatment or without them. Evaluate hierarchy, tension, legibility, and character on mobile too; select the stronger composition. Removing a weak addition does not mean retreating into conservative minimalism. Seek strength in bolder scale, framing, material relationships, space, or choreography. Do not replace one purposeless ornament with another.

## 3. Direct a continuous composition

Storyboard opening through CTA. The unit is a communicative scene, not a ready-made hero/features/FAQ component. For each scene define:

| Field | Decision |
| --- | --- |
| Meaning | What does the visitor understand here that they did not understand before? |
| Composition | Dominant, axes/relationships, near/middle/background planes, scale, crop, density, space. |
| Copy/evidence | Specific thought, content, or material supporting it. |
| Entry -> development -> exit | Initial state, meaningful change, handoff of attention. For static pages: rhythm and relationships between compositions. |
| Continuity | What carries forward: object, motif, line, frame, scale, color, gesture, relationship? |
| Action | CTA or interaction with a real result. |
| Mobile/reduced motion | Preserve meaning while changing arrangement and motion cost. |

Give opening, key middle scene, and finale equal intentionality. Alternate breathing room/density, scale/detail, exposition/action. Do not demand the same spectacle in every scene.

Check whether collage organizes text/image/space or sits in a rectangle beside text. For photography, do frames lead the story? For products, do details explain value? For diagrams, do relationships actually explain something? Two columns can be a deliberate passage, not the entire concept.

## 4. Design motion and transitions

Describe visible events and meaning first, technique second, timing/easing last. **Motion is the behavior of the leading material, not a filter over a finished landing page.** Coordinate:

- Within-scene choreography: object, text, and plane relationships.
- Between-scene transitions: motif continuity, scale/framing change, layer handoff, composition transformation.
- Responses to action: selection, results, comparisons, detail exploration, control states.
- Atmospheric movement only where it supports the idea without distracting.

Consider a rich repertoire: different parallax speeds, bounded sticky scenes with normal document scrolling, masks/clipping, layers/compositing, perspective/transforms, reframing, variable typography, animated gradients/blending within the palette, controlled SVG/canvas sequences, film, or other moving media. Select a coherent subset appropriate to the material. Do not use every technique or impose motion on a chosen static page.

**Sticky and scroll-driven do not mean scroll hijacking.** Tie progress to natural scrolling in a bounded container; do not intercept wheel/touch, arbitrarily change scrolling speed, or block content. Plan entry, exit, and reverse behavior.

### Interpret intensity

| Choice | Required realization |
| --- | --- |
| Static | Strong spatial continuity, selection, crops, rhythm, and full control states. No forced automatic choreography. |
| Subtle | Restrained, distinctive reactions/state changes; polish does not require large displacement. |
| Rhythmic | Directed multi-element sequence and transitions developing the principal material across compositions. Section fade-in/translateY and tab crossfades alone are insufficient. Energy may remain calm. |
| Expressive | Clear principal-material choreography, layers/depth, transforms, linked transitions; a functional signature moment unless excluded. |
| Cinematic/spatial | Developed scenes with planes, camera/framing/light or film, coherent sequence over time, and transitions. Real optimized media and intentionally designed fallbacks. |

If intensity is unspecified but the user requests the original dynamic mandate's ambition, adopt expressive motion appropriate to the direction. Keep explicit effects in the matrix. No separate showpiece means no detached gadget, not cancellation of the motion system.

For rhythmic, expressive, and cinematic variants, describe at least one sequence whose meaning depends on time or user response and cannot be conveyed by one screenshot. A simple text appearance does not count. It may be an integral compositional transition rather than an additional product feature. Respect static/subtle limits without forcing spectacle.

### Motion score

For each key sequence specify: **trigger/natural scroll or action range -> entry state -> development and plane relationships -> meaningful point -> exit/next-scene connection -> reversal -> mobile -> reduced motion/missing medium**. Name actual elements and relationships; "parallax hero, smooth transitions" is insufficient.

Specify what remains readable and actionable in every state. The CTA never waits for an intro. Choose parameters after the score and tools to suit execution, not vice versa.

## 5. Prepare material for the experience

Design assets for the storyboard: separate planes/cutouts, backgrounds, masks, shots/crops, movement margins, mobile variants, and film posters. Three static portraits do not automatically realize a moving brand world. Establish which parts are photographic/bitmap and which independently animated SVG/CSS/canvas.

For film direction, use real optimized video with a poster and sensible loading. Other directions can use intentionally composed layered scenes, animated illustration, working demonstrations, or visualization; do not require a film foreign to the aesthetic. Separately promised video remains a requirement.

Choose fonts for character and readability. System fonts are a deliberate option, not an automatic result of a simple stack. Necessary libraries, fonts, and assets are allowed in local projects. Avoid unnecessary dependencies, not the dependencies required for the selected effect.

## 6. Prevent palette drift

Translate chosen colors into one token system with roles for surfaces, text, CTA, details, media, and key scenes. For named color families choose shades within them; preserve supplied exact values. Do not introduce unrelated families as neutral backgrounds or fashionable accents. Record allowed tonal variants and their functions.

Specify color distribution across scenes, not just hex values. Include imagery, SVG, film, shadows, gradients, and blend modes. Generated assets may introduce foreign tones: inspect and correct the asset/treatment. Blending must not accidentally change palette identity. Resolve contrast within the selected system.

Mobile and reduced motion retain the palette. Check visible output and computed styles; correct token declarations alone do not prove correct use.

## 7. Test concept strength and transfer it to the prompt

Before coding, judge the finished storyboard:

- Does photography/illustration/object/type organize the whole page or fill an empty slot in a standard layout?
- Does its recognizable rule develop through the middle and finale, beyond the hero?
- Does selected motion develop narrative understanding, including transitions rather than entrances alone?
- Would changing the logo and picture make the page fit any business? If so, make the concept more specific.
- Is the supporting detail layer project-specific too? Mentally set aside the hero and inspect captions, lines, and symbols. If they resemble a kit known from available context, evaluate their local role; changing the principal medium does not confer specificity.
- Does each matrix promise have a concrete implementation and verification? Is color binding?
- Are mobile/reduced motion intentionally directed versions of the same idea?

Repair gaps independently without more questions. A longer effects list or more exact CSS values cannot rescue a shallow concept.

Transfer thesis, storyboard, key sequences, palette system, detail decisions, and criteria into LANDING_PROMPT.md. Do not compress it into an administrative interview summary. Preserve the creative mandate: one authored composition, original credible content, real assets, fundamental motion at the selected level, a memorable moment, intentional mobile, and implementation/visual iteration until requirements are met.
