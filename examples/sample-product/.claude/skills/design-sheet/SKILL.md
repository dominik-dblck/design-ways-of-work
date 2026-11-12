---
name: design-sheet
description: "Edits the specification in this repository: where each file lives, what the build writes from data, the board's hand-written fields, one source of truth, and the checks after every change. Use when changing anything in `sheet/`, `roadmaps/`, `docs/`, `app/` or `guards/`."
---

<!-- Written by `yarn build` from `docs/skills/sheet.ts`: edit the data, never this file. -->

# design-sheet · editing the sheet

This repository is the source of truth (W35): the design project lives in the homes `tools/layout.ts` names (W46), and `yarn build` lays them out in `dist/project/` as the artifact holds them (`roadmaps/tickets.ts` here is `project/tickets.js` there). The PM edits nothing by hand: every change is made here.

## Where it lives

- No `.js` in git (W42): a sheet file is `{home}/{name}.ts`; `yarn build` writes `dist/project/` (outside git), which the checks run on and the artifact is published from.
- The build side reads the sheet’s modules, `sheet/contract/blockModel.ts` and `app/styles/componentsSpec.ts` among them; the JSON it reads by blob is printed from the modules `sheet/project.ts` · `buildReads.json` names. The build writes `app/styles/tokens.ts` from `design-system/` and `app/styles/productTokens.ts` (`tools/tokens.ts`, W50), and each skill from `docs/skills/` (W53): edit the source, never what it writes. The markdown the build side reads is written the same way, byte for byte at its path: `ticket-pipeline.md` from `docs/documents/`, the product’s own documents (`agent-instructions.md`, `api-convention.md`) from the modules `buildReads.documents` names: edit the data, never the file.
- An epic's folder `roadmaps/EXX/` holds the epic whole: its notebook and its parts of the board's entries (`EXXTickets.ts`, `EXXEdges.ts`, `EXX…Receipts.ts`, each serving the entry its name ends with). A new epic's folder is started by `yarn new-epic EXX` once its backlog row stands: it writes the parts the folder lacks from `roadmaps/templates.ts` and lists each in its entry.
- How the app works is `sheet/logic/capabilities.ts` (W48): per capability what it decides, its states, rules, walk and examples, each a pointer `{file}.js · {export}`; checks part a holds every pointer to a live export.
- `tools/` is this repository's tooling and is not published. `poc/` holds trials.

## The board's hand-written fields

- **`roadmaps/tickets.ts` + `roadmaps/edges.ts` + `roadmaps/receipts.ts`** · the board's data, three entries loaded in the order edges → receipts → tickets, each epic's rows a part in `roadmaps/EXX/`. `A[]` authored tickets, command tickets derived from `sheet/contract/commands.ts` (id `T-Exx-NN` from `sheet/contract/commands.ts · no`: a command's ticket takes its number, and an epic's authored tickets take the numbers after its commands). `STATUS` is the one hand-written field. `RECEIPTS`, `CAVEATS` (with `until:`), `EDGES` are written by hand from the build side's files; everything else is computed. The board throws on an unknown `depends` or `until`.
- **`guards/measure.ts`** · `Measure.run()` is where every number in a criterion comes from. Never from memory, never from a screenshot (rule:numbers-measured-and-copied).

## One source of truth · how it is kept

- **The map** · one home per fact, rule, word and sentence (`guards/sourceCheck.ts · MAP`): the API’s shape (facts) · `sheet/logic/approval/gateRules.ts` (who may act) · `sheet/logic/translation/translationFlow.ts` (a language) · `sheet/logic/approval/flowCheck.ts` (the walk) · `sheet/words/messages.ts` (sentences) · `sheet/words/glossary.ts` (words) · `app/styles/gateStates.ts` (colours) · the Feature page and the Board (the views, holding nothing). `rule:one-source-of-truth`
- **Before a point** · find its home (`design-refine` · How a point is decided, step 0); where two places hold it, that is the point. `rule:one-source-of-truth`
- **After every change** · `SourceCheck.ratchet` reads 0, with the other checks in the handoff · the Feature page shows the counts against the baseline · a count only falls.
- **A decision that retires code** · its REQUIREMENTS row names it, `replaces: ['file · text']`; the check fails while it is still there.
- **Before READY** · 0 copies; `tools/pack.ts` refuses the pack.

## After every change

- `yarn checks` (build, then `tools/checks.ts` on `dist/project/`, what it writes saved back to its home, `tools/layout.ts · sourceOf`) — every part, one file each in `guards/checks/` (a e f g b c d w r h; `checkWorld.ts` is the world checks and packs run in); `yarn checks c` for one. They list the files they wrote.
- `--snap` retakes a part's snapshot, only after the PM accepted the change it records (parts b, c and d hand their harness `'diff'` hard-coded: `--snap` does not reach them).
- The checks read the top folder of `dist/project/` only, as Claude Design's run_script did.
- `guards/__snapshots__/guardMap.ts` is the guard map part a writes on every run: it moves only with a change that moves the map, and is committed and published with that change.
- `yarn spec-check` (`tools/specCheck.ts`) — `app/styles/componentsSpec.ts` holds together.
- Every commit runs ESLint, tsc, the architecture tests and the checks (W51); a push runs every test.
