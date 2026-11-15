# Design-system integration status

This is a receiving-application snapshot as of November 2, 2026. The immutable reference remains Poster People v1.0.0 (67 files). User-requested host implementation/documentation does not imply a new source-kit release, publishing or approval of every application screen.

Engineering task paths below refer to the full development repository and are deliberately not distributed in participant packages. All current component contracts and open findings are self-contained in this directory; task history and ignored screenshots are optional supporting evidence.

## Implemented work and evidence

| Area                   | Implemented contract                                                                                                           | Engineering evidence                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Employer process view  | One reading sheet, actual event margin, integrated note/actions, proper terminal states and focus.                             | Process implementation (`docs/tasks/candidate-process-view.md`)             |
| CV-only reading        | No CV in Answer; CV tab contains local file actions and framed native PDF; custom imports retain complete text.                | CV preview (`docs/tasks/candidate-process-cv-preview.md`)                   |
| Heading hierarchy      | Application answer, submitted CV and recruiter note are H3, 26px/400; hidden sheet H2 preserves the outline.                   | Heading checks and follow-up (`docs/tasks/candidate-sheet-heading-size.md`) |
| Scenario score         | Shared tag below the name and in role lists/details; red/orange/yellow/vivid-green ranges; removed visible exemplary caption.  | Score colors and contrast (`docs/tasks/match-score-colors.md`)              |
| Action feedback        | Shared enabled-action pointer/color hover, preserved selected contrast and disabled states.                                    | Hover audit (`docs/tasks/interactive-hover-states.md`)                      |
| Return links           | Shared BackLink anatomy and aligned public entry spacing; valid hash targets and keyboard activation.                          | Return links (`docs/tasks/shared-back-links.md`)                            |
| Offer/application flow | Apply/Save separation; real offer context next to the form, in-place complete description, integrated CV row and mobile order. | Application redesign (`docs/tasks/application-page-redesign.md`)            |
| Submit celebration     | Success-only button-origin burst; duplicate guard, textual feedback, cleanup and reduced-motion path.                          | Confetti implementation (`docs/tasks/application-submit-confetti.md`)       |

Read the current [host catalog](HOST-COMPONENTS.md), [record APIs](RECORDS.md) and [acceptance checklist](VERIFICATION.md) before extending these patterns. Historical tasks describe their own state at the time; the current component contracts supersede earlier permanent-CV-row or always-pink-score choices.

Candidate submitted detail now also uses the shared ApplicationRecord composition, with owner-filtered stage/date history, CV-only snapshot preview and focused two-step withdrawal. Repository-only execution evidence: `docs/tasks/candidate-submitted-record-redesign.md`. This does not resolve the company-page audit below.

## Open company-page findings

### Aktualizacja 2026-11-15

NH-01–NH-05 poprawiono w lokalnej kopii podczas przeglądu gotowości:
poprawne grupy dt/dd i link poza dl, istniejący biały `prototype-panel`,
obrys i standardowy rozmiar identyfikacji, zapis ofert dla aktywnego kandydata
oraz informacja o danych demonstracyjnych. Nowy test `tests/e2e/readiness.spec.ts`
sprawdza rzeczywistą stronę Northstar Health z Axe, zapis klawiaturą, odświeżenie
i widok mobilny. Wynik tego sprawdzenia: bez naruszeń Axe; zapis utrzymany po
odświeżeniu. Poniższa tabela zachowuje historyczny stan audytu z 2 listopada.

The Northstar Health audit (`docs/tasks/northstar-company-design-audit.md`) was read-only. The following findings were **open at that audit**, not fixed by the later confetti work. See the dated closure above:

| ID    | Remaining issue                                                                                                 |
| ----- | --------------------------------------------------------------------------------------------------------------- |
| NH-01 | Invalid definition-list structure; targeted Axe scan reports serious `definition-list` and `dlitem` violations. |
| NH-02 | Company information surface lacks the expected white fill and visible ink contour.                              |
| NH-03 | Header identity fallback lacks a visible contour and uses the older large treatment.                            |
| NH-04 | Company cards omit save toggles even for an active candidate because the saved state is not supplied.           |
| NH-05 | Company/profile footer lacks the demonstrative-data context present in C08/C12.                                 |

The full company-page layout is not a canonical v1 screen. Container alignment, contextual BackLink and richer empty-state recovery are documented host recommendations; do not convert them into invented source requirements. The audit does not require the compact source profile's H2 size or illustration on every full company page.

## Evidence boundaries

The latest completed implementation gate, including the shared candidate record, ran 27 unit tests and 34 Chromium journeys, plus formatting, source-kit integrity/six kit tests, lint, types, packet and static build. Those counts are dated execution evidence, not a permanent acceptance guarantee or a claim about future changes. The current task records its own execution separately.

A green gate does not close NH-01: the existing general accessibility journeys do not scan that company-page structure. Add targeted company accessibility/save regressions when fixing it. The older audit (`docs/tasks/poster-people-design-system-audit.md`), re-audit (`docs/tasks/poster-people-design-system-reaudit.md`) and subsequent task evidence remain historical records; do not erase them or infer a new closure from a documentation edit. Ignored artifacts support local review but are not the sole portable specification.
