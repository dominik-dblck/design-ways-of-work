---
name: design-criteria
description: "The rules that change what a criterion, an edge, a note or a spec row says: where the line between the two sides runs, tokens and roles, organisms and their parts, refusals, modes, receipts and caveats, and the words that mean one thing. Use when writing or reviewing a ticket's criterion, edge, note or spec row."
---

<!-- Written by `yarn build` from `docs/skills/criteria.ts`: edit the data, never this file. -->

# design-criteria · what a criterion may say

Every line is a rule with a pointer; the reason lives where the pointer says (`docs/process/plans.ts · RULES`, `TICKET_CHECKLIST`). A rule never lands here first: it lands in `docs/process/plans.ts` with its `because`, then one line here.

## The line

- The design side says WHAT: values as tokens, states, parts, a layout line to read, what is forbidden. No criterion asserts a row: the look is the repo’s and the PM checks it by hand. `rule:the-look-is-the-repos`
- The build side decides HOW: file, tier, props, DOM, MUI slot — from the repository's conventions, which this side cannot see and never guesses at.
- A test asserts a value or a mechanism: an answer, a refusal, a digest, a journey — never a spec row’s look (`rule:the-look-is-the-repos`). `rule:test-asserts-value-not-look` · journeys come from the people’s actions and are checked against the test cases, never generated from them (JR1)
- A shape — order of parts, which props, where the badge sits — is checked by a reader at arch-review and snapshot, against the spec. Never parsed by a test.
- A criterion that starts to say how is the wrong side writing.

## Rules that change what I write in a criterion

- The spec is read where it sits and written only here; a spec file a test needs is a fixture with a hash. `rule:spec-written-only-here`
- A UI component is defined when a ticket needs it, in `app/styles/componentsSpec.ts`, one ticket at a time; the build side gets the rows it builds and nothing more. `rule:component-defined-when-needed`
- A file the design side authors is compared, never described — its count is parsed off the file. `pipeline · contract`
- A criterion with "X, or Y" is a decision I did not make; make it. `pipeline · green 3a`
- A landed receipt never moves; a later ticket that moves the thing under it writes `reported:` on its own report. `rule:receipt-is-a-measurement`
- A caveat has an `until` that names a ticket that exists; the board throws otherwise.
- An id is a name, not a position; a folded ticket is `dropped`, never renumbered. `rule:ticket-id-is-a-name`
- A wireframe is a reading of the spec; where they differ, the wireframe moves. `rule:wireframe-read-against-spec`
- Every colour is a role; a chip's pair flips together; under 12px the floor is 7:1 (`--ink-micro`); a strong outline is `--bd-strong`. `design-system/`
- One hover: the fill arrives (`--ui-hover-fill`), nothing else moves; a filled control darkens. 16px boxes take a 28 halo; inside a row the row owns it. `design-system/tokens/hover.ts`
- Buttons are never pills; menus, popovers and dialogs share one paper; four z-layers. `design-system/`
- A component an organism owns is `{Organism}{Part}` (`campaigns-header`); a shared one has no prefix and `scope: global`. `rule:part-named-after-its-organism`
- One smart organism per screen; every other component is dumb and gets its props from the organism’s adapters. `rule:one-smart-component-per-screen`
- Every test is seen red once: domain / endpoint RED before GREEN; app / browser / infra after GREEN with a planted fault; measured = a dated fact, no test. `rule:every-test-seen-red`
- A control a role may not use: greyed with its refusal line or left out — asked per control, written in the criterion and the spec row, no default. `rule:greyed-or-hidden-per-control`
- Three modes: an epic is one feature ticket (`reconStop` where recon’s questions need a stop); anything else standard at 2+ points, fast at 0–1 (`roadmaps/tracks.ts`); only upward. Mark the factors at refinement. `rule:three-ticket-modes`
- The look is the repo’s: no spec-sync test, no criterion that equals a row, no count of rows; the PM checks screens by hand. `rule:the-look-is-the-repos` · a report that moved a component carries the repo’s copy of the spec, written on the sheet’s as fetched, and the sheet takes it whole (SP1, SP2)
- A shape the sheet does not name: the build side builds it and never stops — inside one organism reported as guessed; a new global atom or molecule reported with what, where and why, and its row written here after the report · a test case the sheet lacks: added on the flow’s entry. `rule:unnamed-shape-built-not-stopped`
- In a feature run the build side never stops for a question: it decides and writes “did X because Y” — contract decisions in the snapshot, the rest in the report, a new event marked. Stops: a digest that differs, the snapshot, the report. `rule:feature-run-never-stops`
- Who may act is the product’s requirement rows: a criterion that names who may act reads them first.
- The build side never writes here — even with the MCP connected. `rule:build-side-never-writes-spec`
- The logic first, the words after the MVP: colour, icon and the status’s name show a state; no new or polished sentence until then, a words-only question takes what is built. `D33`
- A later epic writes into the files an earlier one builds; every row, case and field names its epic, and a build takes behaviour and log up to its own: rows by epic, cases by since, fields by `FIELD_SINCE`. Types of every row may be emitted. `rule:rows-name-their-feature`
- A feature’s contract goes into the sheet the day it is decided; the walk, journeys and spec rows correct it — sheet first. `rule:contract-on-sheet-when-decided`
- Tests over more than one criterion → split the criterion. Criteria with no test → `uncovered`, never silent.

## Words that mean one thing

- holds · carries · names · port · silent command · refusal · streamVersion (a seq) vs version (v1, v2) · Pool · Persona · Directory — `sheet/words/glossary.ts`, grep before READY. `rule:no-retired-word`
