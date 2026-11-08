# Where the extraction stands

| phase | state | proof |
|---|---|---|
| 0 plan | done | `PLAN.md` v1.2, `plan/inventory.tsv` |
| 1 scaffold | done | its own packages (`yarn install`, the product's versions), tsconfig, eslint, prettier, husky; `yarn test` = tsc, lint and format of `scripts/`, then `verify`; the linked copy runs on this repository's packages |
| 2 files | done | 371 files of the wow categories copied as they are at eagle-design 266822b |
| 7 rehearsal | done for phase 2 | `yarn verify ../eagle-design`: build, checks, tsc, lint, test, spec-check, checks:gate, ds-scan, dist/ and every written file the same |

## The mechanism, decided while building (8 Nov)

- Files keep their paths. The plan's `@product/*` alias and a `wow/` folder were tried first: a `wow/` folder moves
  every file one level down, so `ROOT` and 167 home paths would change. Linked in place, nothing moves.
- Three changes in design/ make links work, none changes an output: `walk` in `tools/layout.ts` takes a link to a
  file as a file; `tools/build.ts` bundles with `resolve.symlinks: false`; the product runs node with
  `--preserve-symlinks --preserve-symlinks-main`.
- `scripts/extract.ts` ran once: design/ is the source now, and a second run refuses.

## Scope added by the PM (8 Nov)

- [x] the `.dc.html` wireframes leave the way of working: ds-scan (tool, guard, 11 parts), checks parts r and h,
      the page lines of part a (src holes, app mark, page scripts), source-check's page checks (components, two
      versions, props, page scripts) and its read list's pages, the Feature page's screens and drawings frames,
      the pack's wireframe pointers, three styling rules, checklist rule design-scan-before-ready (moved to the
      product's quality rules: closed tickets cite it), the recon table's row 26
      - left for phase 5: `layout.ts` still publishes `legacy/` at the artifact's root, and source-check's
        `SHEET_PAGE` and `isHistory` still filter page names; both are product facts that move to `product.ts`
      - the product keeps part d's two helpers (`legacyWorld.ts`, `pageShims.ts`): its list check runs the
        type page, a legacy page
- [x] every icon a source names is written from lucide-static (21 today); `public/lucide-icons` (71 hand copies,
      used only by the legacy pages) does not come here, and the port drops it from eagle
- [x] a third page, Wireframes, and its view `app/workspace/wireframes-view.ts`: every screen of the sheet by track,
      each a placeholder frame until the design system's components draw it; tested
      - found on the way: a page's bundle could overwrite a sheet module's (`wireframes.js`): a page bundles as
        `<page>-page.js` now, and the build refuses two sources at one path
- [x] `dev/rules/` · eagle-dev's 18 code-rule files as data, taken by `scripts/take-dev.ts`; the product's build
      prints them back byte for byte (`take-dev --check`), so a release can carry them to every build repository
- [x] `dev/map.ts` → `dev/map.md` · the build repository's folders, atomic design and the organism's inner folders
      included, eagle-dev's routes, renderers and domain concepts cut (`scripts/take-dev-map.ts`, 93 folders)
- [x] the skills: the ticket skills ride `ticket-pipeline.md`; eagle-dev's own 35 files (architect, plan-*,
      orchestrator, evaluate-*, e2e skills; evaluations; patterns; commands) are in `dev/claude/`, byte for byte
      (`scripts/take-dev-claude.ts`); three still name Eagle: types-eval.md, domain-testing.md, nextjs-app-router.md
- [x] the code rules split (PM, 8 Nov: two lists, the rules both keep in a third): `shared/rules/` holds the 43 rules
      both sides keep, each once, with each side's gate; `design/docs/rules` and `dev/rules` keep only their own and
      read the shared rows first. `plan/rule-split.tsv` records where every row of both sets went; a rule both say is
      worded as eagle-dev words it, unless that wording names the build repository's own folders.
      Rows that differ in substance stayed on their side (styling shares none; `index.ts` barrels vs no `index.ts`)
- [x] the design side's app in eagle-dev's folders (`scripts/move.ts`, map `plan/moves/app-components.tsv`):
      `app/components/atoms/{CodeBlock,SectionHead,TitledList}`, `app/components/organisms/{BoardPage,FeaturePage,
      WireframesPage}` each with `index.ts`, `components/`, `hooks/`, `utils/`; `app/pages/*.tsx` mount them through
      the barrel; every bundle byte-equal to before
      - next: the words and view shapes in `app/workspace/` become each organism's `constants/` and `utils/`
        (they are published bundles today); eagle-dev's component rules (folder shape, barrels, flow organisms)
        move to `shared/rules/components.ts` once design-side tests hold them
- [ ] one design system at the top, `design-system/`: the tokens and the shared atomic components, loaded into every
      repository by a script, never copied by hand (PM, 8 Nov; changes D62, where eagle-dev owned it)
      - the same for both sides, and all TypeScript: no CSS and no HTML in this repository; what a browser needs
        is written by a build. A change a repository asks for goes, once approved, up to its root here (PM, 8 Nov)
- [x] the checks are tools first (PM, 8 Nov · A): linters, then tsc, unit tests last, for what crosses files
      in a way no tool reads. ls-lint (the tree), jscpd (a block written twice, 50 tokens), knip (what nobody
      reads) beside ESLint and Prettier; `yarn check:chunk` runs them all, in ~5 s
      - work goes in chunks: the agent's Stop hook (`shared/hooks/chunk-check.ts`) runs `check:chunk` on
        uncommitted work and sends the agent back while it is red; the edit hook (`shared/hooks/edit-check.ts`)
        formats and fixes each file written; pre-commit runs `check:chunk` too; both hooks read the repository
        they run in, so a product takes them with `shared/`
      - ls-lint's config is data (`shared/lint/fileRules.ts`), printed as YAML only for the run
      - jscpd found five copies in `scripts/`: `scripts/repos.ts` and `scripts/ruleTables.ts` hold them once
- [ ] the checks as tools, ported: the 36 design-side checks and the 23 both sides wrote twice, each to the first
      tool that holds it (ESLint `boundaries`, `import-x`, `no-restricted-syntax`, `max-params`, `no-nested-ternary`,
      `naming-convention`; ls-lint; jscpd; knip; tsc unions for token names, rule keys and gates), the rest one
      shared test; known fails in ESLint's suppressions, one mechanism
- [x] no file named by a number: the documents' parts named by what they hold (15 pipeline parts, 2 api-convention
      parts, agent-instructions in one file); `aFileNamesItsPurpose` refuses a number; size.md says why

## The port folder

`ports/eagle-design/` holds what the port changes in eagle-design itself; the rehearsal lays it over the copy.
It is a patch (`ports/eagle-design/port.patch`), written by `scripts/port-save.ts` from the rehearsal copy's own
edits: a patch made on an older eagle-design fails to apply, where a copied file would silently overwrite. Today:
eagle's 14 numbered files as a baseline; design-scan-before-ready in its quality rules; part d's two helpers;
ds-scan out of buildReads, Measure's scan fixtures and package.json; the generated skill and pipeline.
`package.json` in the patch is diffed against the rehearsal's own (`NODE_OPTIONS` added), so the port writes that too.

`plan/expected-differences.tsv` lists every output a decided change moves, with why; `yarn verify` fails on any
other difference, and on a listed one that no longer differs.

## What `yarn test` reaches, and what it cannot yet

- `scripts/` is type-checked, linted and formatted here.
- `design/`, `dev/` and `shared/` import a product's files (the coupled ones), so they are checked inside one:
  `verify` links them into a copy of eagle-design and runs its tsc, lint, tests and checks on this repository's
  packages. A product of its own here (`examples/sample-product`, phase 6) makes it stand alone, after phases 3–5
  cut what the way of working reads of a product.
- Root configs live here now too (`eslint.config.ts`, `.prettierrc`, `.nvmrc`); the port turns eagle-design's into
  readers of these, so one config serves every repository.
