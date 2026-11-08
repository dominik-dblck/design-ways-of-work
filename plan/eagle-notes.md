# What eagle-design can update later

Found while moving the way of working out (8 Nov). Nothing here is changed in eagle-design: each line waits
for the port (phase 8) or the PM's word. Ranked: the first of each group is the one worth most.

## Stale: it serves files that are gone

1. **The `.dc.html` wireframes.** All 49 are in `legacy/`, yet the tools still read them: ds-scan exits 1 with
   197 findings, all on legacy files, on no gate; the Feature page frames `Feature drawings.dc.html`; the pack's
   pointers, source-check's page lists (13 names), two styling rules, checklist rule `design-scan-before-ready`
   and ticket-pipeline row 26 name them. The way of working leaves them out (PM, 8 Nov).
2. **`public/lucide-icons/`** · 69 hand-copied SVGs from the Claude Design days. D10 writes icons from
   lucide-static, but only the names `sheet/` holds: 55 names in `app/`, `guards/`, `roadmaps/` are still
   served from the copies. Fix: the build writes every icon any source names; the folder goes.
3. **`buildReads.modules`** lists 11 modules; the build side uses 4 (eagle-dev, 8 Nov). The 4 views,
   `sheet-status.ts`, `refine-check.ts` and `source-check.ts` can leave it; ds-scan too once it goes.

## Names that say nothing

4. **14 files named by a number** (`screenOne…Four`, `rowsOne…Three`, `refusalOne/Two` in `sheet/words/messages/`,
   `pointsOne…Three` in `sheet/model/eagle-review/`, `settledFrom1/25` in `sheet/contract/block-model/`). The way
   of working now refuses them (`aFileNamesItsPurpose`); the port carries them as a baseline that only shrinks.
   Each wants the name of what it holds, as the ticket-pipeline parts got (`sharedSkill`, `reconTemplate`…).

## Coupling the extraction has to cut (phases 3–5)

5. Three product files import tooling: `sheet/logic/assembly/content-type-logic/fileFlow.ts` and `typeChain.ts`
   read `app/workspace/sheet-status.ts`; `roadmaps/tickets/ticketExpand.ts` reads `guards/expected-files.ts` and
   `app/styles/components.spec.ts` (and pulls expected-files into the build side's closure).
6. `tools/layout.ts` names Eagle's homes, and `tests/architecture/baselines/` (a product's list) sits among the
   way of working's files: both belong to the product (D28).
7. `sheet/project.ts` holds the build side's paths and session names next to the design facts.

## Small

8. `tools/checksGate.ts` starts `node` by name, not `process.execPath`: it runs whatever node the PATH has.

## Decided while extracting (PM, 8 Nov), to carry into eagle-design at the port

9. The design system (tokens, the shared atomic components) lives in the way-of-working repository and every
   repository loads it by script: D62 (eagle-dev's package owns it) changes. A decision row for eagle-design.
10. eagle-dev's coding rules, skills and folder structure come to the way of working, and the design side's
    pages follow them.
11. ds-scan leaves `buildReads`: eagle-dev loads it and never calls it; its `dsScan` test runs an old JS copy
    and can go with it.
12. The agent's hooks: `tools/lintEdited.ts` and the Stop hook become `shared/hooks/edit-check.ts` and
    `chunk-check.ts`; the product names a `check:chunk` script (ls-lint, Prettier, ESLint, tsc, jscpd, knip).
13. `aPublishedPathHasOneSource` says what the build's `refuseClashes` already refuses: one of them goes.
14. One design system: `app/styles/tokens.css` and the Deblock export leave for `legacy/`; `product-tokens.ts`
    holds Eagle's own; `sheet/project.ts` loses `designSystem` and `buildReads` its two CSS files; Measure's theme
    fixture is `tokens.js`. The build side reads `design-system/` from the way of working (phase 9), not `_ds/`.
15. Words left in the product's data name `tokens.css`: three spec rows' notes, two decisions (history, kept),
    `public/assets/manifest.json`'s copiedBy; the spec rows read best moved at the port.
16. `Payloads.DOC` is an entry's API name in UPPER case, and the build side reads it by that name
    (`sheetValue('Payloads', 'DOC')`, mailing-automation `scripts/lib/runExpectations.ts`): it is held in
    `eslint-suppressions.json`, the one known fail; `doc` lands with a release and the build side's read together.
17. ESLint in a repository the way of working is linked into loads its config natively, symlinks kept
    (`NODE_OPTIONS='--preserve-symlinks'`, `ESLINT_FLAGS=unstable_native_nodejs_ts_config`): lint, lint:fix,
    test, test:architecture and the edit-check hook. Through jiti, `tools/layout.ts` resolves to the way of
    working and reads the entries and parts from the wrong root. The flag goes when ESLint loads natively by default.
18. `tools/root.ts` finds the repository from its own path: through a link that path is the way of working's.
    Every runner keeps the links today (`NODE_OPTIONS`, the hooks too since chunk 2: `runKeepsTheTurn` read
    `.claude/run.json` from the wrong root without them); a root read from where the run stands would hold
    without the flags, as `edit-check` does (eagle-dev's cross-check, 8 Nov).
19. 97 booleans in the product's own files carry no `is`/`has`/`can` (`live`, `draft`, `seated`, `fourEyes`…),
    and 95 declarations name a placeholder (`list`, `value`, `item`, `data`, `num`…), one a count alone: each
    is held in `eslint-suppressions.json` (PM, 8 Nov · B). At the port, `scripts/rename.ts` renames them from a
    map (`file:line:column`, new name), by TypeScript's own rename; the suppressions are pruned after it.
20. The way of working's own names moved with the rules: `ticketOf` → `ticketDetailOf` (the board's), `textOf`
    → `tokenTextOf`, `messageOf` → `errorMessageOf` (checkWorld; `guards/checks/measureCheck.ts` and
    `rulesParts.ts` follow it in the port), `RuleRow` → `CodeRuleRow` (docs/rules), `Section` → `TsSection`,
    `TicketRow` → `ExpectedTicket`, the component `JourneyStep` → `JourneyStepItem` (the sheet's type keeps the
    word): `plan/renames-chunk-3*.tsv`.
21. A component's header (`.tsx`) was never read by `aFileStatesItsJob`, which walked `.ts` alone: ESLint reads
    every production file, and 16 bullets over 80 characters were cut in the way of working's own components.
22. The shared shapes of chunk 4 find four things, each held in `eslint-suppressions.json` until decided: two
    heights in the way of working's own components (`DayBars`' plot, `ScreenPlaceholder`'s `minHeight`), layout
    sizes the height shape reads as a control's; and two `…_WORDS` tables the product declares outside a words
    home (`accessFlow.ts`' `SWITCH_WORDS`, `agentCommands.ts`' `KIND_WORDS`). The scope names `sheet/words/**`
    as a words home besides each `{name}Words.ts`, and no brand home (the sheet carries no zod).
23. A corner is one style on both sides (PM, 8 Nov): a role of the design system's radius scale read by name,
    `radiusOf('uiRContainer')` on `borderRadius` (MUI counts it in `shape.borderRadius`, the control's 8px) and
    `lengthOf('uiRTag')` on one corner (plain CSS, px). The way of working's 15 corners moved to it, the same
    pixels (`borderRadius: 2` was 16px, `uiRContainer`). The three React rows of `docs/rules/styling.ts` (a
    colour, a space, raw markup) are held by the shared shapes but are still this side's own: they join the
    build side's into `shared/rules/styling.ts` with one wording, a later step.
