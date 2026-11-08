# design-ways-of-work · the extraction plan

v1.1 · 8 Nov 2026 · written by the eagle-design session on the PM's word; eagle-dev's answers folded in. eagle-design itself is not
touched until phase 8, and only on the PM's word.

## What this repository is

The way of working that eagle-design runs today, taken out of it so that more than one product runs
it: the design side's tools, checks, pages, skills and process documents, and later the build side's
code rules (D76). A product keeps its own data (the sheet, the roadmap, the decisions) and links this
repository by path.

It rests on these decisions of eagle-design (`docs/process/decisions/`):

- D28 · the way of working is product-agnostic: no product fact lives in it
- D61 · a new project is a copy, the product cut by hand: stands for the product's own parts
- D75 · four repositories, a second product (Argus) runs the same way of working
- D76 · one way-of-working repository, linked by path; its rules steer every build side
- D2 · one writer: the eagle-design session writes this repository; argus-design proposes
- D6 · the build side reads one design repository at one sha
- D21, D25 · what is written from data is generated and committed, never edited by hand

## The shape

```
design-ways-of-work/
├── design/                     the design side's way of working
│   ├── tools/                  build, checks, pack, release record, layout, new-epic
│   ├── guards/                 the generic checks: refine, spec, expected files, journeys, ids
│   ├── registries/             the machinery and types of the standard registries:
│   │                           contract, cases, roadmaps, decisions, rules, words
│   ├── app/                    pages, theme, workspace views (Board, Feature, Contract)
│   ├── docs/                   skills, documents, plans, modes (all data)
│   └── tests/                  architecture tests and the views' tests
├── dev/                        the build side's way of working (phase 9)
├── examples/sample-product/    a minimal product every check and test runs on
├── scripts/rehearse.ts         a port rehearsal on a copy of a product, never the product
└── package.json, tsconfig.json, eslint, prettier, vitest, husky
```

## How a product uses it

- The product's `package.json` links it: `"way-of-working": "link:../design-ways-of-work"`.
- `yarn build` and `yarn checks` in the product run this repository's tools with the product's root.
  `tools/root.ts` splits in two: `WOW_ROOT` (here) and `PRODUCT_ROOT` (the product).
- This repository reads a product two ways only:
  - the alias `@product/*`: every product keeps the same layout of homes (`new-project.md`
    requires it), so a view imports `@product/sheet/contract/commands.ts` and each product points
    the alias at itself
  - `product.ts` at the product's root: today's `sheet/project.ts`, plus its homes (`tools/layout.ts`
    SHEET_HOMES and the rest), its own check parts, the source-check map, and the files the build
    side reads
- A product reads this repository through `@wow/*`: types and registry machinery only.

## The release still reads one repository at one sha

`sheet/project.ts · buildReads.modules` lists eleven modules of the way of working. eagle-dev read
its tree (answer 1): it uses four of them.

| module | what the build repository does with it | after the extraction |
|---|---|---|
| `guards/measure.ts` | runs `Measure.run()` for the seed fixture's headers | stays in the product (a product check): not vendored |
| `guards/ds-scan.ts`, `guards/spec-check.ts` | takes and loads them, never calls them; the scans that run are older JS copies in its `.claude/__fixtures__/` | vendored; its two tests (`dsScan`, `theSpecHoldsTogether`) may move to them at the port |
| `guards/expected-files.ts` | reaches it only by closure: `spec-check/ownerChecks.ts` → `roadmaps/tickets.ts` → `ticketExpand.ts` → it | leaves the closure once phase 3 settles `ticketExpand.ts` |
| the four views, `sheet-status.ts`, `refine-check.ts`, `source-check.ts` | nothing | leave `buildReads.modules` at the port |

The build side reads one design repository at one sha (D6), so the product's `yarn build` writes
those modules and their import closure into the product under `vendor/wow/`, committed, digested in
the release record like `fixtures/data/` (D21). eagle-dev's take accepts the path (answer 2): it
reads each entry by `git cat-file` and follows relative imports as written, so:

- the vendored copy rewrites every `@product/*` and `@wow/*` import to a relative path that resolves
  inside the release tree
- no two vendored entries share a basename (the take names a module by it: `measure.ts` → `Measure`)
- on the build side the change is three lines of `scripts/lib/sheetReads.ts`, theirs at the port

## The inventory

Every tracked file of eagle-design at `266822b`, one row each: `plan/inventory.tsv`.

| category | files | what happens |
|---|---|---|
| wow, pure | 301 | copied as they are: they read nothing of the product |
| wow, coupled | 63 | copied, their product imports turned to `@product/*` |
| registry entry | 22 | split: the machinery (aggregation, lookups, derived values) comes here, the rows stay |
| registry types | 23 | come here: the shape every product's rows take |
| mixed check | 7 | split: the generic core here, the product's part exported from `product.ts` |
| root config | 10 | come here; the product keeps its name, its scripts call this repository |
| product data | 460 | stay: the sheet's rows, the product's logic, models, samples, screens, looks |
| product check | 15 | stay: checks of Eagle's own logic (gates, content types, pools, Measure) |
| product test | 8 | stay: tests of Eagle's own logic |
| artefact | 300 | stay: records, legacy, fixtures, poc, notes, snapshots, assets |
| generated | 12 | stay generated in the product: skills, `ticket-pipeline.md`, `agent-instructions.md` |

What the way-of-working files read of the product today, as (file, home) import pairs, product checks and tests included (the `@product/*` surface):

| product home | import pairs |
|---|---|
| `roadmaps/` (tickets, backlog, edges, receipts, notes, features, tracks, ideas, findings, templates) | 28 |
| `sheet/contract/` (commands, queries, refusals, ports, block-model) | 15 |
| `sheet/project.ts` | 15 |
| `sheet/model/` | 12 |
| `sheet/cases/` (test-cases, journeys) | 11 |
| `sheet/logic/` | 21, most of them in product checks that stay |
| `sheet/words/`, `sheet/samples/`, `sheet/screens/`, `app/styles/` | 22 |

## The direction of every import

- This repository → a product: only through `@product/*` (data) and `product.ts`.
- A product → this repository: types and registry machinery through `@wow/*`. A module the build
  side reads imports nothing of `@wow/*` unless the vendored copy carries it.
- Three product files import tooling today and are settled in phase 3:
  - `sheet/logic/assembly/content-type-logic/fileFlow.ts` and `typeChain.ts` read
    `app/workspace/sheet-status.ts`
  - `roadmaps/tickets/ticketExpand.ts` reads `guards/expected-files.ts` and `app/styles/components.spec.ts`
- An architecture test here holds the rule: nothing under `design/` imports a product path.

## The phases

Each phase ends with the tests and the checks green here, one commit, one push.

| # | phase | what it does | estimate |
|---|---|---|---|
| 0 | plan | this file and `plan/inventory.tsv` | done |
| 1 | scaffold | package.json, tsconfig with `@product/*` and `@wow/*`, eslint, prettier, vitest, husky, README | 0.5 day |
| 2 | pure files | the 301 pure files into `design/`, compiled with no product | 0.5 day |
| 3 | registries | the 23 types and the machinery of the 22 entries come here; each entry's rows get one named export in the product; the three product files that import tooling settled, `ticketExpand.ts` first (it pulls `expected-files` into the build side's closure) | 1 day |
| 4 | coupled files | the 63 files read `@product/*`; the 7 mixed checks split, their product parts named in `product.ts` | 1 day |
| 5 | product.ts | its contract written as a type here: homes, check parts, source-check map, build reads, design system | 0.5 day |
| 6 | sample product | `examples/sample-product`: one epic, a command, a query, an event, a refusal, a journey, a ticket, a decision, a notebook; every generic check and architecture test green on it | 0.5 day |
| 7 | port rehearsal | `scripts/rehearse.ts ../eagle-design` copies the product to a scratch folder, cuts what came here, links this repository, runs build, checks and tests; every output byte-equal to today's (snapshots, `fixtures/data/`, packs, release record) | 0.5 day |
| 8 | port | into eagle-design on the PM's word, one commit per step; `buildReads.modules` cut to what the build side uses; the first release after it carries `vendor/wow/`; eagle-dev changes `sheetReads.ts` | 0.5 day |
| 9 | dev way of working | with eagle-dev: the code rules as data (D76), the presets, the scripts; written into each build repository through its product's release | 1 day here, 1–2 days eagle-dev |
| 10 | Argus | `new-project.md` rewritten for a product on this repository; argus-design, then argus-dev | 0.5 day |

## eagle-dev's answers (8 Nov, read off its tree at 7696dd86)

Answers 1 and 2 are folded into the release section above. Answers 3 and 4 shape phase 9.

What the build repository shares as it stands (no product fact): the husky hooks; the scripts
`generateSkills.ts`, `takeRelease.ts`, `cacheSheet.ts`, `checkReports.ts`, `ticketSnapshot.ts`,
`coverageRun.ts`, `coverageTrend.ts`, `zipRepo.sh` and their helpers; the Claude hooks
`ticketRunKeepsTheTurn.py` and `e2eKeepsTheTurn.py`; the ticket skills (generated from
`ticket-pipeline.md`, shared by construction).

What carries Eagle facts and becomes a parameter in phase 9: `scripts/lib/repoPaths.ts` (the design
repository's path, the sheet copies' root), `scripts/lib/sheetReads.ts` (the module list),
`scripts/verifyFixtures.ts`, `scripts/lib/coverageRows.ts`, `scripts/lib/typescriptHooks.ts`, the
eslint, tsconfig, vitest, stryker and mutation configs and scripts (the domain's folders, the test
database, `STORE_IMPL`, `AUTH_GOOGLE_ID`), `docs/rules` (generic rules, Eagle's paths and examples),
the Claude hooks `designRepoReadOnly.py` (the design repository's path hard-coded) and
`reviewRows.py` (path globs), the lane-B skills (they point at `docs/app-architecture.md`,
`docs/rules`, `knowledge/`).

How the code rules ride the skills generator (answer 4): `yarn skills` cuts its released source on
lines that are exactly `---`; a section headed `` # `path` `` is written at that path, a fenced
`name:` / `description:` opening becomes frontmatter. The generator is path-agnostic: a section
headed `` # `docs/rules/tests.md` `` is written like any template. What grows on the build side: its
gate's generated set (`skillsAreGenerated.test.ts`) and the source's row in `hashes.json`. Open for
phase 9: the rules inside `ticket-pipeline.md`, or a second released source passed by `--source`.

## The questions asked (8 Nov)

1. Of `buildReads.modules` (the views in `app/workspace/` and the guards), which does the build
   repository import or run, and for what? The vendored set is exactly that.
2. Can `sheet:take` read them under `vendor/wow/` instead of `app/workspace/` and `guards/`, or must
   the paths stay as they are?
3. Which of the build repository's scripts and configs carry no product fact: `docs/rules`, the
   eslint, tsconfig, vitest, playwright and stryker presets, `sheet:take`, `skills`,
   `reports:check`, `snapshot`, coverage, mutation, the hooks?
4. How are the skills written from `ticket-pipeline.md` today, so the code rules ride the same
   generator?

## Risks

- A change here reaches every linked product at once (a path link has no version): this
  repository's pre-push runs the rehearsal on every product it knows.
- The `@product/*` alias needs every product to keep the same layout: `new-project.md` and
  `theWayOfWorkingNamesNoProduct` hold it.
- The release's import closure crosses two repositories: the vendored copy keeps it one.
- The tools assume today that the product and the tools share one root: phase 1 splits the root,
  and phase 7 proves nothing else assumed it.

## To iterate before phase 3

- `design/` as a folder, or the design side at the root and `dev/` beside it.
- The registry machinery's names here, and the one export each product entry gives.
- `product.ts`: one file, or `sheet/project.ts` kept and `product.ts` beside it.
- How `tools/checks.ts` takes a product's own parts (a to h are mixed today).
