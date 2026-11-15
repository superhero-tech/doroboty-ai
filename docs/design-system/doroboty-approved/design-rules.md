# Approved DoRoboty.ai visual rules

Final decisions through 2026-11-08. These supersede conflicting text and images in earlier research drafts. “Lead” in Agata's visual feedback often means an offer card or page opening; do not treat every such mention as the Lead job category.

The complete current implementation was explicitly accepted on 2026-11-08: “Teraz mi się podoba i jest zgodne z designem, zapisz to wszystko jako aktualizacja skila”. All resolved rules below, including the card anatomy and description grid/process, form the approved baseline rather than pending proposals.

## Visual thesis

Cobalt technical retro with a human character: poster-scale entry, terminal-like headlines, precise quiet offer comparison, sharp dark outlines, and an original friendly CRT robot. Gumroad contributes graphic organization; Fishwife contributes an illustration mechanism. The saved DoRoboty.ai landing contributes identity. The result must read as one product, not a collage of those sites.

## Typography

Exactly two intended families, without remote font imports:

| Role                                                    | Family      | Weight                              | Color                                                              |
| ------------------------------------------------------- | ----------- | ----------------------------------- | ------------------------------------------------------------------ |
| Brand hero “Twoje skille. Nowa robota.”                 | Courier New | 700                                 | White on cobalt                                                    |
| Major section heading                                   | Courier New | 700                                 | Ink on light surfaces; white on cobalt                             |
| Job title in a card or offer detail                     | Courier New | 700                                 | Cobalt                                                             |
| Numeric salary range, including currency                | Courier New | 700                                 | Cobalt                                                             |
| Salary unit, period, net/gross and contract explanation | Arial       | 400                                 | Ink                                                                |
| Company, location, category, technologies, metadata     | Arial       | 400                                 | Ink                                                                |
| Body copy, form labels, inputs, helper text, navigation | Arial       | 400 or 700 where hierarchy needs it | Ink on light surfaces                                              |
| Buttons and category/filter controls                    | Courier New | **700**                             | White on ink for primary actions; ink for unselected light filters |
| Selected category/filter control                        | Courier New | 700                                 | White on cobalt                                                    |

Job titles and salary ranges are the only blue text **inside offer cards**. Category labels and technology tags must not inherit blue. Maintain blue only on those two elements; white button text is the deliberate inverse-color exception. This card-specific rule does not prohibit the cobalt brand field, logo accent, selected filters, or appropriate links elsewhere.

The final card title is about 20 px bold; salary is smaller at 16 px. Compact card CTAs are 13 px bold, 44 px minimum height. Card metadata is 14 px Arial and salary units 12 px Arial. Offer-description headings are 19 px Courier New Bold, text 14 px Arial, small section numbers 10 px. These are the accepted component defaults; scale marketing headlines separately. Keep the two font roles stable.

Courier New uses `"Courier New", monospace`; Arial uses `Arial, sans-serif`. If an installed font is unavailable, disclose a visible fallback and solve it in the deployment environment. Do not silently claim a different monospace font is the accepted face. Do not add IBM Plex to future screens: it belongs to the historic landing's source, while Agata approved **Courier New in this study**.

## Colors

| Token            | Value     | Use                                                                   |
| ---------------- | --------- | --------------------------------------------------------------------- |
| `--dr-blue`      | `#2449ED` | Brand fields, job titles, salary ranges, selected filters             |
| `--dr-ink`       | `#191C25` | Card metadata/body text, outlines, primary button backgrounds         |
| `--dr-paper`     | `#F5F5F0` | Main quiet page surface and supporting panels                         |
| `--dr-white`     | `#FFFFFF` | Cards, form fields, inverse text                                      |
| `--dr-blue-soft` | `#E9EDFF` | Restrained supporting surface, never an excuse for blue metadata text |
| `--dr-line`      | `#D9DBE3` | Subtle separators where the strong outline is unnecessary             |

The old `#666B78` muted color is not used for offer-card text. Keep that text ink. Do not add arbitrary accent hues. New semantic colors for errors or success are outside the approved palette; if a task needs them, establish them explicitly, support labels/icons, and do not encode important state by color alone. A match score is not a hiring probability.

## Geometry and outlines

- Cut all four corners diagonally at 45 degrees, like the angular robot monitor. No curves at the cuts.
- Apply to offer cards, CTA buttons, search fields/containers, filter controls, and separated page panels.
- Reference sizes: buttons 8 px, filters 7 px, search container 10 px, cards 12 px, larger panels 18 px. On phones, cards can use 10 px and panels 14 px. The diagonal motif is approved; these depths are scalable defaults.
- Use ink outlines around light cards, fields, and filters; keep the outline continuous across the diagonals. Do not apply a rectangular CSS border and merely clip away its corners: that loses diagonal edges.
- Keep focus indicators and content outside decorative clipping. Reuse the bundled outer/inner polygon layers or an equivalent implementation. Use whitespace at least as generous as the cut so text never touches it.
- No pill controls, soft card radii, glossy 3D surfaces, or large diffuse shadows. Circles that are part of the original robot artwork remain part of that artwork.

## Buttons

“Znajdź rolę” and “Zobacz ofertę” are a shared primary-button style:

- Ink background, white **Courier New Bold 700**, no italic treatment.
- Chamfered corners, 8 px default cut; text/arrow centered with comfortable horizontal padding.
- Keep the simple up-right arrow when it matches the action. Use one icon weight.
- In a card, the action follows or sits beneath the salary at the right. On mobile it follows the salary in the normal reading order.
- “Courier New Regular 400” was a temporary comparison and is superseded by the final explicit approval of Bold.
- Keep button labels readable; do not make the whole button disappear or move out of reach during an animation.

## Offer-card anatomy and placement

The final accepted card uses **shared horizontal rows**, not two independent vertical columns. Apply this to every summary card on home, search, saved results, and related offers, and to the detail lead:

| Row        | Left                                                     | Right                                                       |
| ---------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| Top        | Category and level; age in summary cards                 | Bookmark icon with “Zapisz” / “Zapisano”                    |
| Title      | Blue Courier New Bold title spanning the full card width | Same full-width title area                                  |
| Conditions | Company mark, company, location, work mode/contract      | Blue 16 px salary, then dark Arial unit below               |
| Action     | Technology tags                                          | Dark CTA immediately below salary, horizontally beside tags |

Use a CSS grid with full-width category/title areas and `"meta pay" "tags action"` rows. Salary and company metadata must overlap vertically; the CTA and tags must overlap vertically. A right-aligned salary placed near the title, or a CTA below the whole metadata area, is the rejected arrangement. Avoid large fixed heights and empty bottom space. Cards max out at **880 px**; use about 22–26 px internal padding, 10–24 px gaps and a 208–224 px action column. Narrow containers may be smaller.

**Detail lead:** the small original robot stands at the left of the title row, holding a white chamfered title plaque that stretches across the remainder. The complete role title fits one line on desktop; reduce title size when needed without ellipsis. Preserve blinking. The CTA is “Aplikuj na tę rolę”. Use the approved compact lead, not a large standalone robot sidebar. See `assets/approved-lead.png` and `assets/offer-example.html`.

**Summary card:** no robot in every result. Category/age, full-width title, then the same two paired rows. CTA is “Zobacz ofertę”. Use the same component everywhere. See `assets/approved-summary-cards.png`.

**Bookmark:** a recognizable outline bookmark plus visible “Zapisz” in the upper right, filled when saved, labelled “Zapisano”, with an appropriate accessible pressed state and role-specific label. Do not use a checkbox-looking square or place this control beside the main CTA.

**Phone below 640 px:** category → title → company → tags → salary/unit → CTA, with salary and CTA right-aligned. Long titles and tags wrap at readable sizes; do not shrink text to illegibility to preserve one line. A missing salary is dark Arial “Nie podano wynagrodzenia”, never an invented range.

## Offer-description arrangement

Below the lead, use smaller type and four chamfered sections in this exact row-major arrangement on desktop and narrow desktop panes of at least 640 px:

| Left column                                                       | Right column                                                   |
| ----------------------------------------------------------------- | -------------------------------------------------------------- |
| **1 — Twoja praca:** tasks                                        | **2 — Twoje umiejętności:** requirements and additional assets |
| **3 — Warunki współpracy:** benefits and company/team information | **4 — Kolejne kroki:** recruitment process                     |

The intro spans both columns. Headings 19 px, body 14 px; about 20–24 px section padding and gaps. Keep the company information in section 3 so the process remains section **4**, not 5. Show the process as ordered chamfered blocks with numbered steps and visible arrows, in sequence: application → conversation → cooperation in the fictional example. Replace demo steps with supplied facts for real offers. At phone widths, the sections stack in order 1, 2, 3, 4 and process arrows follow the vertical sequence. Do not collapse the grid at a 760 px desktop-pane width. Verify the live delivered page, not only an example screenshot.

At “Podobny kierunek”, put a small robot to the **right of the heading**, with an actual downward-pointing index finger indicating the related cards below. Related cards use the same summary-card anatomy.

## Page layout and placement

- A light header: DoRoboty.ai identity left, concise navigation and an employer action to the right. Preserve existing navigation requirements; do not invent links that imply unavailable pages.
- At a marketing entry: cobalt opening, large Courier New headline left, original robot right, short Arial explanation. A conspicuous light search area belongs directly below the promise. Keep a short route to results and no blocking intro.
- On a phone: headline first; robot supports the introduction without covering copy. Search stacks, with a full-width action when space requires it. Keep the primary task ahead of decorative storytelling.
- Below entry: light surfaces, a task-oriented heading, search and filters above results, counts/sort near the list. Titles and salaries remain scannable across cards.
- Offer detail: clear hierarchy and action, reusing the title/salary color roles; keep practical conditions visible. Candidate/employer forms: visible Arial labels, clear grouping, dark Courier Bold primary action, chamfered field and panel geometry.
- A cobalt closing CTA can echo the opening on marketing pages. Do not force a large hero or long animated sequence onto a profile, form, dashboard, or working list.
- Use one clear reading axis with internal columns only when they aid comparison. Start with a 4/8/12/16/24/32/48/64 px spacing rhythm; adapt to real content. Spacing and exact breakpoints are defaults, not separately approved design decisions.

## Illustration and motion

The bundled `robot.svg` is the original DoRoboty.ai CRT robot. Preserve its head shape, palette, outline, and recognizable features. Use it near brand introduction, onboarding, or a helpful empty state. Never cover a field, salary, or CTA with it.

Fishwife is an inspiration for flat fills, expressive hand-drawn outlines, and small human scenes. Future illustrations should be original people collaborating with the robot, discussing work, or finding a direction, drawn in cobalt/ink/paper/white/light-blue. Do not reuse its fish, packaging, brand marks, characters, or screenshots as portal artwork. New illustrations have not yet been designed or approved.

The historic saved landing includes a robot grabbing “Znajdź rolę” and revealing a dollar symbol. Preserve that accepted artifact when only creating other screens. If motion is requested for a new screen, keep actions continuously usable, provide a stop/replay option when appropriate, and honor reduced-motion preferences. A static page request does not require that animation.

## Continuity

Reuse these rules when designing another portal page. Do not drift back toward the original draft's pink Gumroad palette, Fishwife serif font, IBM Plex headings, rounded cards, blue category/tag text, or unbolded button labels. New user corrections can override the rules for the requested scope; do not rewrite the shared skill unless asked.
