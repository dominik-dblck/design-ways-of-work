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
      - [x] the tokens: `scripts/take-tokens.ts` read the Deblock stylesheet and Eagle's `tokens.css` into
        `design-system/` (14 homes by subject, `plan/token-split.tsv`), its fonts, element styles and guide beside
        them; Eagle keeps only `app/styles/product-tokens.ts` (its mark, document states, type chips, message
        states). `tools/tokens.ts` writes `tokens.ts` from both and refuses a name both declare: the same 264 light
        and 70 dark tokens, compared value by value. Three comment-only groups about the `.dc.html` wireframes cut;
        both stylesheets and the Deblock export moved to the product's `legacy/` (D24)
      - [ ] the shared atomic components, from eagle-dev, by script
- [x] the checks are tools first (PM, 8 Nov · A): linters, then tsc, unit tests last, for what crosses files
      in a way no tool reads. ls-lint (the tree), jscpd (a block written twice, 50 tokens), knip (what nobody
      reads) beside ESLint and Prettier; `yarn check:chunk` runs them all, in ~5 s
      - work goes in chunks: the agent's Stop hook (`shared/hooks/chunk-check.ts`) runs `check:chunk` on
        uncommitted work and sends the agent back while it is red; the edit hook (`shared/hooks/edit-check.ts`)
        formats and fixes each file written; pre-commit runs `check:chunk` too; both hooks read the repository
        they run in, so a product takes them with `shared/`
      - ls-lint's config is data (`shared/lint/fileRules.ts`), printed as YAML only for the run
      - jscpd found five copies in `scripts/`: `scripts/repos.ts` and `scripts/ruleTables.ts` hold them once
      - the product takes them in the port: `lint:files` (ls-lint, `legacy/` and `poc/` aside), `check:chunk`, its
        edit hook on `shared/hooks/edit-check.ts` (its own `tools/lintEdited.ts` was the same code) and the Stop hook
      - next: a header bullet over 80 characters in this repository's own scripts (about 40) waits for the rule as
        an ESLint rule, so it is held by the tool, not by hand
- [ ] the checks as tools, ported (PM, 8 Nov: imports on ESLint `boundaries` + `import-x`, A; cspell, syncpack,
      sonarjs and commitlint added): the 36 design-side checks and the 23 both sides wrote twice, each to the first
      tool that holds it (ESLint `boundaries`, `import-x`, `no-restricted-syntax`, `max-params`, `no-nested-ternary`,
      `naming-convention`; ls-lint; jscpd; knip; tsc unions for token names, rule keys and gates), the rest one
      shared test; known fails in ESLint's suppressions, one mechanism
      - [x] one ESLint config for every repository, `shared/lint/eslintConfig.ts`: wow's and the product's were the
        same file twice; each now names only its scope. wow's own scripts meet the size rules for the first time
      - [x] five tests became its rules, each planted case caught as the test caught it: past two parameters
        (callbacks kept), a chain three deep (two kept, types kept), cycles (type-only kept), an empty clause,
        an import's extension; the rule rows' design gates name the ESLint rules
      - the one-shot scripts that refuse a second run moved to `legacy/scripts/`, frozen and out of every check
      - [x] four more became shapes of `no-restricted-syntax`, every planted case caught alike: a colour, a space and
        raw markup in React code (`shared/lint/shapes.ts`; a stylesheet or a page file is ls-lint's), and a name's
        case, read off the exported name of an entry or a part, which each scope lists from its own layout
      - [x] eagle-dev's cross-check (8 Nov) taken: SVG inside `SvgIcon` passes, a quoted key and the X/Y and
        logical spacing keys are read, `useTheme().palette` and a destructured `palette` are found, a helper's
        '0' is a count, `__tests__/` is a test; the hooks keep the links. Its build-side points: `plan/dev-notes.md`
      - [x] the last baseline is an ESLint suppression (`Payloads.DOC`, read by the build side); a fixed one left
        listed fails the lint until pruned, as the baseline's `fixed` did
      - [x] the way of working's own ESLint plugin, `shared/lint/wowPlugin.ts`: six architecture tests became its
        rules (no ticket in a name, a file's header, comments, readonly data, nothing read at load, one home per
        name, now every file's: values, types, components), each proven by RuleTester (`yarn test:rules`, 34 cases)
      - [x] names (PM, 8 Nov · B): `naming-convention` (types and components PascalCase, a boolean `is…`) and the
        placeholder and count-alone shapes; the way of working's own 70 names renamed by `scripts/rename.ts`, the
        product's 193 in ESLint's suppressions until the port renames them
      - [x] eagle-dev's cross-check of chunk 3, its rules worth porting asked with it
      - [x] eagle-dev's rules and tests the design side lacks: which come to the way of working, for both sides
        (PM, 8 Nov), a table and the PM's form
      - [x] the chunks' order (PM, 8 Nov · C, eagle-dev's read): 4 the shapes, the plugin's rules and brands, with
        the TypeScript resolver; 5 boundaries, the alias rule and the molecule count on one element map; 6 ls-lint,
        knip and tsc from one layout source; 7 the generators' check mode, the shared tests, cspell, syncpack,
        sonarjs, commitlint; 8 the e2e framework · `plan/checks-inventory.tsv` holds each of the 184 tests' tool
      - [x] chunk 4: the shapes, the plugin's rules and brands, with the TypeScript resolver · 14 shapes,
        4 `wow` rules, `production-syntax`, 10 rows to `shared/rules/` (`plan/eagle-notes.md` 22–23, `plan/dev-notes.md` 14–15)
      - [x] ask eagle-dev how it runs mutation tests (PM, 8 Nov): Stryker 10 on a command runner (`vitest related
        --bail 1` a mutant, coverage off), the domain folder by folder, then app services and utils, a second pass of
        the survivors on the database tests; no threshold, a measure; by hand only, never CI nor a hook
      - [ ] ⏸ mutation tests in the way of working: whether, where, how (PM decides)
      - [x] eagle-dev's criterion and its consistency points, before chunk 5 (PM, 8 Nov · A): 8 rows in
        `shared/rules/checks.ts`; the scope is one `scope.ts` a repository, `RepoScope` in `shared/repoScope.ts`
      - [ ] the shared tests read `scope.ts` (chunk 7), with the way of working's one baseline format
      - [ ] the spawn check: a blank repository from the template green on every shared check (phase 7)
- [ ] the e2e framework comes to the way of working whole (PM, 8 Nov): eagle-dev's e2e skills (`e2e`,
      `e2e-category`, `e2e-discovery`), `e2e/framework/` (13 files) and the test-id registry, the journeys staying
      each product's; its 11 gates become shared tests
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
