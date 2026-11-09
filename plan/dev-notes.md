# What mailing-automation needs when the shared checks reach it

From eagle-dev's cross-check of the checks, chunk 2 (8 Nov, its tree at `7696dd86`). Nothing here changes
mailing-automation: each line waits for its port (phase 9) and the PM's word. Ranked: the first is worth most.

## Its scope, named in its own `eslint.config.ts`

1. **Imports.** Its imports carry no extension and go through `@/`, `@domain/`, `@store/` (moduleResolution
   bundler). `import-x/extensions` 'always' fails every one, and `import-x/no-cycle` cannot follow the aliases.
   It needs the TypeScript resolver and either a migration to extensions or the rule named per scope.
2. **React code.** Leave `app/styles/**` (the theme and generated tokens), `app/renderers/**` (the phone's own
   look, Figma values on purpose) and `app/components/icons/**` (brand-icon fills) out of `react`. Leave Next's
   `app/layout.tsx` and `app/global-error.tsx` out too, which must write `<html>`, `<body>`, `<main>` and `<p>`.
3. **Tests.** Besides `**/__tests__/**` (in the shared list since this chunk), its Playwright `e2e/**`
   (`*.spec.ts`) is a test: the scope names it, because `*.spec.ts` is data in eagle-design.
4. **Names.** It has no entries or parts: 465 PascalCase components, camelCase zod schemas, query keys and
   test ids, and Next's fixed names (`GET`, `POST`, `PATCH`, `DELETE`, `dynamic`, `metadata`). `entries: []`;
   `parts` is at most `app/**/constants/*.ts`, after its 7 camelCase exports are looked at.
5. **Known fails, not exceptions.** `atoms/Wordmark/constants` reads next/font's `var(--font-wordmark)` and
   `atoms/AppMark/constants` a `var(--app-mark)` mask: the font one is next/font's documented output, the
   mask is theirs to move. Each is a suppression with its reason, never a hole in the shared selector.

## Its files

6. **ls-lint.** `app/globals.css` (Next's global stylesheet), the copied fixtures (`app/styles/__fixtures__/*.css`,
   the sheet copy's `tokens.css`, `.claude/__fixtures__/*.js`), `eslint.config.js` and the root `index.html`
   are banned extensions: the fixture roots go in its ignore, the rest move or are named.

## Linked in place

7. **Its files are real, so no runner needs a flag (its cross-check of chunk 6a).** The rehearsal hard-links the
   way of working, a real tree, and the patch carries no `--preserve-symlinks`; its port adds none. The way of
   working reaches it as copies taken at a release sha (`git cat-file`) with a hashes file and a gate that the
   copy's bytes are the release's (its `everyFixtureRootIsHeld` pattern), never links into its working tree: its
   pre-commit `eslint --fix` and `prettier --write` would write through a link, and drift a copy; the copy is left
   out of its writes, or takes the way of working's prettier config (3.9.6 and one `.prettierrc` today).
   `ESLINT_FLAGS=unstable_native_nodejs_ts_config` stays: ESLint reads a TypeScript config.
8. **The way of working stays in the tree.** Node refuses to strip types under `node_modules`: `shared/`, `tools/`
   and `design-system/` are linked into the tree, never a `link:` dependency.

## The way of working's own rules (chunk 3, 8 Nov)

9. **Its tests that are now `wow` rules.** `theCodeNamesNoTicket`, `aFileStatesItsJob`, `commentsAreInvariants`,
   `dataIsReadonly`, `aNameHasOneHome` exist on both sides; the shared config runs them as
   `wow/no-ticket-names`, `wow/file-states-its-job`, `wow/comments-are-invariants`, `wow/data-is-readonly`,
   `wow/one-home-per-name`. Its `mutableByDesign.json` becomes the scope's `mutable`; a route's HTTP verbs and
   `default` become the scope's `families` (`{ files: 'app/**/route.ts', name: 'GET' }`…).
10. **Names.** `naming-convention` (types PascalCase, values camelCase or UPPER_SNAKE, a boolean `is…`) and the
    placeholder and count-alone shapes (its `aNameSaysWhatNotHowMany`, regex unchanged) reach it with the config:
    its count of fails is measured at its port, each held in its suppressions until renamed by `scripts/rename.ts`.
11. **What its tests hold beyond the rules (its cross-check of chunk 3).** Its `theCodeNamesNoTicket` reads
    strings, test titles, assertion messages, the root configs, `db/*.sql` and `.husky/`: ESLint reads
    identifiers, so the rest stays its test until a shape on test titles holds it. Its `dataIsReadonly` also reads
    a function's signature, a module's unexported constants, zod's `.readonly()` and exempts a ref's `current`:
    `wow/data-is-readonly` grows to the union at its port. Its header may run 12 prose lines and its comments
    carry `Read at stream:`; both stay its own.
12. **Its scope at its port.** Next's handlers written `export async function GET` need UPPER_CASE functions in
    `app/**/route.ts`; the boolean prefix flags 224 names there and the placeholder shape 152 (`value` in its type
    guards and handlers most), each held in its suppressions; `scripts/` adds 19 names twice to one-home.
13. **Its e2e framework comes to the way of working whole (PM, 8 Nov).** The skills `e2e`, `e2e-category`,
    `e2e-discovery`, `e2e/framework/` and the test-id registry are shared; its journeys and page objects
    (`e2e/theDocuments/`, `e2e/theEditor/`…) stay its own. The 11 gates that hold the framework (every role a
    flow, every path walked, test ids from the registry and prefixed, a drag through the framework…) become shared
    tests, each scope naming its own roles and paths.

## The shapes and rules of chunk 4 (8 Nov)

14. **Its tests that are now shapes and `wow` rules.** `timeIsMovedNotWaited` and `aPresenceIsReadOneWay`
    (shapes on tests), the `__brand` half of `brandsCrossOnce` (every file), `noComponentWritesAHeight`,
    `anSxIsAsConst` and `aStyleReadsItsScale` (React code), `aWordIsNotInTheMarkup` and `hoverTextIsAHint`
    (`wow/markup-syntax`), `noTestOnlyBranchInProduction`, `aSchemaIsStrict` (with zod 4's `.loose()`),
    `copyLivesInAWordsFile` and `.brand()` outside its home (`wow/production-syntax`), `reExportsLiveInBarrels`,
    `noTestMocksItsSubject`, `aHookIsNamedForItsFile`, `aFileTakesOneStyle` (`wow` rules). Their rows moved to
    `shared/rules/`: its gate stays its test until the port. A layer, a weight, a fade or a radius named off its
    scale (`zIndex: 'appBar'`) stays its test: a selector cannot know a scale's names.
15. **Its scope at its port (its cross-check of chunk 4).** `react` is the look (renderers, icons, `app/styles/**`,
    `layout.tsx`, `global-error.tsx` out); `markup` is what a person reads, every `app/**/*.tsx`, renderers in;
    `barrels: ['app/**/route.ts']`, a route re-exporting its own handler; `words:
    ['packages/domain/messages/**']` (`messageTables.ts`' four tables); `brands: ['packages/domain/model/brands/**']`;
    `scripts/` stays out of the loose-schema shape and `one-call-style` or takes a scope of its own (its re-check: 83 loose
    schemas reading part of a report file, 4 one-call-style hits there; PM decides at its port). Its named waits (`aWhile`,
    `holding`), the two loose schemas that read part of more, its `PhonePreview`/`LayoutPreview` corners and its
    fixtures' brands are suppressions with their reasons. Its 27 `.not.toMatchTypeOf` in
    `tests/types/brands.test-d.ts` become `.not.toExtend` (expect-type 1.2), never `.not.toEqualTypeOf`.
    A corner is one style on both sides (PM, 8 Nov): its `radiusOf` is the design side's too
    (`design/app/theme/tokenReads.ts`), one helper for both at its port. The TypeScript resolver reads its `@/`
    aliases (`import-x/no-cycle` proven on an aliased fixture).
16. **Its tiers at its port (chunk 5, its consult).** `anAtomComposesNothing`, `aMoleculeComposesOneMolecule` and
    `organismsMeetAtTheBarrel` are boundaries and `wow/molecules-compose-one-molecule` in the shared config;
    `theMoleculesAreDumb` and `organismPartsOnlyDraw` keep their product halves (queries, requests, commands,
    providers, clients, the router) as its scope's layers, their context half shared (`useContext`, `use`,
    `React.use*`). Its rows moved: the barrel and the context to `shared/rules/components.ts`, the strip to a row
    of its own (`theStripIsNotTheShells`); the barrel row's exception went, a header slot read through the barrel
    being no exception to it. A known loss: its barrel test read tests as importers, the shared
    config does not (0 such today; the design side's tests read parts from `tests/`). Its layers and doors
    (`app/api`, `app/clients`, `app/services`, `app/providers`, `app/utils`, `packages/domain`, the store, the
    edge) are named in its scope at its port, and `boundaries/no-unknown-files` turns on with them, a scope switch
    off until a scope names every element. Its alias rule (`anImportLeavesByTheAlias`) lands with those layers:
    the design side imports by relative path and has no alias to hold.
17. **Its knip at its port (chunk 6b, its consult).** `knipConfig(scope)` with its `starts: ['scripts/*.ts']` (five
    run by hand or read by tests), and knip's plugins for next, vitest (its projects and the two mutation
    configs), playwright, husky and stryker (its two configs name the mutation configs by string: entries if
    the plugin misses them). Its scan reads values; knip reads types too: on, as new findings, or off at its
    port (the shared row says so until then). `import.meta.glob` is unread by knip: its icons are imported
    elsewhere and its fixtures ignored, to check on its tree. Its cross-check of 6b measured, on its tree: its
    `starts` also take three files loaded by a string (`tests/forbiddenDriver.ts`, a vitest alias target;
    `tests/architecture/theScanAdapter.ts` and `theSpecCheckAdapter.ts`, a variable `import()`); a package kept on
    purpose (`recharts`, drawn later) needs a scope field knip ignores, at its port; knip finds what its scan
    missed: two dead molecules (`SourceChip`, `UpdatedAt`, their barrels read by nobody), a dead test helper,
    duplicate exports (`e2e/theDesk.ts`, `replaySteps.ts`), two stryker packages unlisted, one unused
    (`@testing-library/jest-dom`). Its 172 unread types, 91 of them `{Name}Props` re-exported by barrels, ask a
    convention at its port: Props out of the barrels, or a barrel's types public.
18. File names are one way-of-working rule (chunk 6c, `wow/file-names-its-purpose`), measured on the build side's
    tree by eagle-dev (8 Nov, 1,656 files): no drawer and no busy index, as its own scans found; a name ending in
    digits is a count unless the digits name a term (`sha256`, `base64`, `utf8`, `int32`, `md5`, `es2017`: its
    `scripts/lib/sha256.ts` passes). A `*Types` file held to types alone is a scope's list (`typesOnly`), not a
    convention: its types files hold a type and its zod schema side by side (11), two are the domain's noun
    (`contentTypes.ts`, `blockTypes.ts`, constants) and two mix a value in (`logTypes.ts`' `emitted`,
    `storeTypes.ts`' `RECORD_TABLES`); which it lists is its call at its port. Its suffix map is six `names` rows
    (`utils/` Utils|Adapters, `constants/` Constants|Words, `types/` Types|Answers, `providers/` Provider,
    `queries/` use…Query|Mutation, `app/api/` route|…Route); a helper inside a component, `{component}{Purpose}Utils`,
    needs the folder in its stem: a `{component}` placeholder filled from the folder under `components/<tier>/`,
    built at its port. Its own `theDocsNameRealPaths` reads `{scan}` as a placeholder before the reworded baseline
    row lands there. Its cross-check (8 Nov): with `typesOnly: []` and the six rows, 0 hits over its 1,656 files,
    its baseline's `[]`; every planted name caught, a content breach on its line; a term is read off the stem's
    last camel word (`rules2`, `changed2`, `index2` are counts; `imageBase64` a term). `minimatch` against node's
    `path.matchesGlob`, 62 globs × 3,798 files: two pairs differ, both node folding case under `__fixtures__/`.
19. Its component tests become tools (chunk 6d): `oneComponentAFile` and `aComponentFileHoldsItsComponent` one
    ESLint rule, `wow/component-file-holds-its-component` (a component read off the tree: a PascalCase function,
    an arrow, `forwardRef`, `memo`, `lazy`, `dynamic`; a name in capitals is a constant; a directive no
    declaration); `aComponentFolderIsStructured` ls-lint rules, `componentFolders(roots)`, which its lint-files
    takes at its port (its root file and barrel, the shape's folders, every part named for it at any depth, an
    atom without parts, the root `__tests__` and a dotfile aside). Its scope names both trees, `components:
    ['app/components', 'app/renderers/mobile/components']`: the mobile one no scan read; there `MobileHome.tsx`'s
    `FIGMA_BANNER` sits beside its component, its own to move. Measured on its tree read-only: the folder rules
    0 under both roots. A part moved out of a component file takes the component's name (`{Component}{Part}.tsx`,
    `use{Component}{What}.ts`, `{component}{Purpose}Utils.ts`), so a move map there is written to its names rows.
    `FIGMA_BANNER` moved on its side (7c2fa3a5). Dom, 8 Nov: the mobile renderer is an app inside the app; at the
    port `renderers: [{ folder: 'app/renderers/mobile', app: 'app' }]` beside both roots: its tiers held within
    it, the app enters it at a component's barrel, it imports nothing of `app/` while a package (`@domain`) is
    read as the app reads one (`wow/renderer-stands-alone`; its re-check, read-only and typed: 0 hits over
    1,658 files, the 6 imports into it all at barrels). Its `components.md` row's build gate is `review` until
    then.
20. Its root tsconfig extends `shared/tsconfig.base.json` at its port (chunk 6e), and its two packages' through it;
    it keeps its environment (lib, JSX, the Next plugin, `paths`, `incremental`, `allowJs`, `esModuleInterop`,
    `resolveJsonModule`, its target). With `extends` there Next 16 stops writing its tsconfig (no option, include
    line or plugin, `writeConfigurationDefaults.js` 238), so a Next upgrade's new include or option reaches it by
    script at its port: Next's setup run on a copy without `extends`, what it writes diffed.
    Measured read-only over its three tsconfigs (`tsc --incremental false` and one flag; its consult added the
    packages; its cross-check: `--showConfig` moves by the five new flags alone, its file sets the same):
    `verbatimModuleSyntax`, `noImplicitReturns`, `noFallthroughCasesInSwitch` 0; `erasableSyntaxOnly`
    4 (`e2e/framework/theCoverageRegistry.ts` 9 and 10, `tests/store-contract/store.test.ts` 745,
    `packages/domain/log/digest.test.ts` 120: a parameter property each, a field and an assignment instead);
    `noImplicitOverride` 2 (`app/components/organisms/TypeLibrary/__tests__/theGroupsPage.test.tsx` 61 and 65,
    `override` on `state` and `render`): all six test code, its to fix on its port branch, unhurried, nothing
    before it (PM, 8 Nov). `noUncheckedIndexedAccess` 877 (root 454, domain 418, store 5) stays out of the base.
21. Its generators become `scope.generators` rows at its port (chunk 7a), each `--out` its final text (prettier
    runs inside the seed generator) and `writes` the globs it owns: generateSeedFixture and generateRunFixture
    (`--fixtures`), generateSkills (`--source`), generateTokens and renderComponentsDoc given an `--out` (today
    `--check` and `--print`). The day leaves the `// Generated` line (3 files, `dayless` deleted). Its six tests
    keep their content and digest halves (the 32 bodies, `QUERY_IDS`, the six forms, `hashes.json`); renderCurlDoc
    calls the database, so it stays its own test. Its `generated` (`**/__fixtures__/**`, `legacy/**`, tokens) stays
    what lint skips: it holds the design side's copies, which no generator writes. Its own, on its
    port branch with the rest (PM, 8 Nov): `.prettierignore` comments still name `.mjs` generators.
    Its cross-check (read-only, outputs to scratch): seed 13 files, run 1, skills 14 under the permission contract,
    nothing more needed (prettier's API no cache, no child process); 25 of 28 byte for byte, the 3 others the day
    alone; tokens and the components doc read-only. Its `writes`, explicit where a folder holds hand-written
    files: seed `packages/domain/{commands/commandActors,commands/commandBodies,directory/directory,log/blockSpecs,
    messages/messageTables,model/blockTypes,model/contentTypes,model/nodeData,queries/queryIds,queries/queryParams,
    seed/__fixtures__/expected,seed/summerInsurance,seed/theCatalog}.ts` · run `packages/domain/log/__fixtures__/run.ts` ·
    skills `.claude/skills/ticket-*/SKILL.md`, `.claude/skills/ticket/_*.md`, `roadmaps/templates/ticket-*.md` ·
    tokens `app/styles/tokens.ts` · components `docs/components.md`.
22. Its baseline helper becomes the shared one at its port (chunk 7c): `heldToItsBaseline(scan, offenders)` keeps
    its signature, so a caller changes its import alone; `aScanPlantsNothing`'s writer path moves to
    `shared/tests/baseline.ts`; `docs/rules/tests.md` row 24 and the `.prettierignore` baselines comment say
    start and write; its 11 `[]` lists go by script, each in a commit that says so.
23. At its port (chunk 6f): `components.md`'s folder-shape row is a shared row now, its gate unchanged
    (`aComponentFolderIsStructured`), and a drawer folder's closing words a shared `names.md` row
    (`aFileNamesItsPurpose`, its list); row 17 keeps "wherever it lies" and its purpose clause, the in-folder
    clause leaving it for the shared row. On the design side ESLint holds both (`wow/file-names-its-purpose`,
    `shared/lint/partNames.ts`); whether its own two tests give way to that rule at its port is Dom's.
    Its view (8 Nov): split them. The names half goes to ESLint, since one file decides it. The folder half of
    `aComponentFolderIsStructured` goes to ls-lint only if its port takes `lint-files` with `componentFolders`.
    `aFileNamesItsPurpose` retires only once ESLint also reads "wherever it lies": its 6 Utils/Adapters files
    outside `utils/`, which `wordsOwed` does not read today.
24. If its port takes `lint-files` (chunk 6g): the root's ls-lint rules are keyed `''`, for a folder no key
    covers, so a top folder nothing names fails; the design side writes its keys from its layout's homes.
    Its view: its `docs/map.md` (856 folders, held both ways by `theMapIsTheTree`) would be its homes, one
    list. A component root now names its tiers and `__tests__` alone: its `app/components/icons/` needs a
    tier or a scope field at its port. Route segments under `app/api` and `packages/domain/*` areas are held
    by its map alone. All Dom's.
25. At its port (chunk 7b, skills): its scope's `instructions` (its view, 8 Nov): `skills` its
    `.claude/skills/*/SKILL.md` but the pipeline's generated ones (`!` globs); `whole` each `SKILL.md`,
    `_shared.md`, `ticket/_*.md` and command; `onDemand` the rest of `.claude/skills`, `patterns`,
    `evaluations`; `everyTurn` `CLAUDE.md` or none (2,034 words today: listing it starts a counted list; Dom's).
    Its lists start by `BASELINES=start:{scan}`: `aSkillSaysWhatAndWhen` its 9 planning skills,
    `everySkillIsShort` `architect/SKILL.md · 4556`, `evaluate-onboarding-ux · 3222`, `evaluate-app-ux · 2511`,
    `aLongFileOpensWithContents` its 5; `OVER_TODAY` and `WITHOUT_CONTENTS_TODAY` retire into them. A name is
    now checked against its folder (its 22 hold). Its size rows 14 and 15 are shared rows. Its four entry
    globs are one const (`whole`, and negated in `onDemand`); `!.claude/skills/ticket-*/SKILL.md` is its
    skill generator's `writes`, one const too. Its `describe('every ticket skill')` (each ticket skill's first
    task reads `ticket/_shared.md`) moves to a test of its own before `everySkillIsShort` retires, or it is
    lost. "The ticket skills also keep their pipeline's 100 lines" is held by nothing (the pipeline counts
    words since D8; `ticket-feature/SKILL.md` 104 lines, `ticket/_shared.md` 123): left out of the shared
    row; its own row is Dom's.
26. At its port (chunk 7b, sentences): its scope's `sentences` (its measure, 8 Nov: 13 sentences, the same):
    code `{app,packages}/**/*.{ts,tsx}` minus `**/__tests__/**`, `**/__fixtures__/**`, `**/*.test.{ts,tsx}`,
    `**/*.test-d.{ts,tsx}`, `**/*.d.ts` (1593 files named; the test puts the 13 `// GENERATED by` aside, 1580 read); prose
    `.claude/**/*.md`, `docs/rules/**/*.md` minus `.claude/__fixtures__/**` and its pipeline's writes
    (`.claude/skills/ticket-*/SKILL.md`, `.claude/skills/ticket/_*.md`, one const with that generator's row).
    Its 13 restart as counts (`sentence · copies`: 6 of 2, 3 of 3, 1 of 5, 3 of 7): the port script removes the
    plain list first, then `BASELINES=start:aSentenceIsWrittenOnce` starts the counted one; its `codeOf`
    goes (the syntax tree reads no comment). Its one-home row keeps "a sentence the domain holds is read from
    the domain" (`theWordsFollowTheGlossary`); the sentence-once half is shared. CLAUDE.md and `docs/*.md` in
    its prose: Dom's.
27. At its port (chunk 7b, part 2b): its scope adds `productTrees: []` (a product's tree held inside a
    repository, read only by a glob that starts inside it; the way of working's are design/, dev/ and
    shared/rules/). Its rule files, once emitted (`dev/rules/*.ts`), are `ruleFileFor({ side: 'build', shared,
    intro, rows, outro })`; a reason both sides give is `why: { shared: key }`. A shared reason read by two of
    its rows in two files prints twice in its md, which its prose test counts (eagle-dev, 8 Nov: 0 today,
    each key read once a side).
28. At its port (chunk 7b, every rule's gate): its scope's `ruleFiles` names its rule tables (its 18 md, the
    README aside); its `everyRuleHasAGate` goes, the shared one reads the same (its measure, 8 Nov: 18 files,
    181 rows, 259 gates, 0 short: test 208, review 33, ESLint 13, script 4, linter option 1). Its tests are
    named by `testsOf` as they stand (`tests/**`, `**/__tests__/**`, `**/*.test.{ts,tsx}`), so its 18 under
    `app/**/__tests__` and the one in `packages/` count. No baseline to start.
29. At its port (chunk 7b, the docs' paths): its scope's `namedPaths` (its measure, 8 Nov): docs
    `.claude/**/*.md`, `docs/**/*.md`, CLAUDE.md, minus `.claude/__fixtures__/**` and a rendered doc; roots
    app, packages, tests, e2e, scripts, .claude, docs, roadmaps, db, knowledge, ux-evaluations (200 more paths,
    0 missing). Open, Dom's: README.md (3 paths gone), `knowledge/**` (source articles), its pipeline md (1
    path gone, mended in our ticket-pipeline source, a re-pin). Its test goes; `@/` and `@domain/` aliases are
    never read as paths; `[...nextauth]` is a real folder.
30. At its port (chunk 7d, SonarJS): `eslint-plugin-sonarjs` 4.2.2 exact joins its `package.json` (Dom's word),
    the shared OFF table with it; its measure (8 Nov): about 27 findings to mend or hold, 30 deprecated calls
    for `no-deprecated`. Sonar's typed rules want typescript `>=5 <6.1.0`: its typescript pinned exactly, one
    in the lockfile (7f syncpack holds it). Both rows' build gates stay `review` until then.
31. At its port (chunk 7e, cspell, eagle-dev's measure 8 Nov): its scope's `spelling.files` its screen copy
    (`app/**/constants/*Words.ts`), its prose md (CLAUDE.md, docs/**, .claude/**, minus fixtures, the pipeline's
    generated skills and its two rendered docs, which go to `generated`) and its production code; `alsoIn` [].
    Its words from data: the glossary through the sheet fixture's `uiRows()`, the seed's persona names and
    catalog ids, the deeplink catalog's ids; a reviewed list of its API words and coinages. One slip for Dom:
    `packages/domain/blocks/sameField.ts:2,26` "two datas of a node".
