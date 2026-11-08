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
