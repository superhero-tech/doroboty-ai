# Approved DoRoboty.ai — profile and contribution workshop

User correction: 2026-11-11. The previous implementation incorrectly selected the repository's Poster People reference. For the profile and contribution workshop, use the approved DoRoboty.ai system saved on 2026-11-08 in the user's Super Brain project.

## Sources and precedence

Canonical human documentation: `../design-system/components-v1/component-documentation-v1.md` relative to the application root. Canonical implementation/rules: `../../../7-Skills/doroboty-ui/` relative to the application root. Local portable copies: [approved rules](doroboty-approved/design-rules.md), [source CSS](doroboty-approved/doroboty.css). The live correction is `src/features/project-contribution/doroboty-profile.css`; the original robot is copied to the adjacent assets folder.

This explicit user instruction overrides conflicting pink/Geist/rounded requirements on `/app/profil`, `/app/profil/podglad` and `/opis-projektu`, including their visible shell. Other screens are outside this task; the old 67-file kit is preserved as a reference for their current implementation, not as authority for these corrected routes. Do not edit the canonical Super Brain design or publish a new design-system version for this correction.

## Required roles

- Courier New Bold 700 for headings and buttons; Arial for text, labels, metadata and fields. No Geist Serif, pink accents or pill/rounded cards on these routes.
- Cobalt #2449ED for the project title/selected navigation, ink #191C25 for body/outlines/buttons, white #FFFFFF, paper #F5F5F0 and light blue #E9EDFF for restrained support. Card metadata stays ink. Primary labels are white on ink.
- Continuous 45-degree chamfer contours: card cuts 12px (10px phone), fields/buttons 8px, larger panels up to 18px. Use the source's outer/inner decorative polygon layers. Never clip native inputs, text or focus rings.
- Quiet working profile: one reading axis, maximum 880px profile/card content, 20px cobalt Courier New Bold project title, 14px Arial reading copy, compact fact layout with a mobile stack. Reuse native disclosure for full responsibilities and limits.
- Original robot supports the empty state/identity; do not substitute another mascot. Keep behaviour, candidate-owned drafts and complete saved descriptions, CV and role boundaries unchanged.

## Verification

Check editor/empty/saved/expanded/error states, visible keyboard focus outside diagonal decoration, 1280/850/390/320 layouts, long titles and links, computed 700 Courier headings/actions and Arial controls, ink primary surfaces/white labels, cobalt project title, zero radius and nonempty polygon contours. Run the existing tests/gate and report actual browser limits. Kit hash checks alone do not verify this override. Store new visual evidence separately from the prior incorrect profile captures.

## Agreed form buttons and candidate heading — 2026-11-11

The approved `buttons-courier-bold.png` reference governs every boxed action in the new profile/workshop forms, including outline-variant controls and link-based profile/CV actions: ink #191C25 surface, white Courier New Bold 700, 8px diagonal cuts and a decorative up-right arrow. Quiet text links and shell icon controls remain distinct. Do not reintroduce white outlined form actions. The arrow is painted on the decorative layer; native content and keyboard focus remain unclipped.

At the user’s additional request, the candidate name and professional headline in the profile preview are cobalt #2449ED. “Opis kandydata” is an actual ink/white Courier Bold button that toggles the complete project disclosure with aria-expanded/aria-controls. The existing native summary remains usable and synchronized.
