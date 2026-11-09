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
24. Chunk 5 holds the tiers and the parts by tools, on one element map (`shared/lint/componentTiers.ts`):
    boundaries refuses an atom composing any component (icons and any folder outside the tiers included), a
    molecule a tier above it or a context (`useContext`, React 19's `use`), any file past an organism's
    `index.ts`, and an organism's root and parts reading a context; `wow/molecules-compose-one-molecule` counts a
    molecule folder's molecules over every file of it; `wow/parts-serve-their-entry` reads the scope's `owners`
    (each part with its entry, as `tools/layout.ts` places it). A hook is never read off `React` (a shape), so
    the tiers see every read. Measured: the real tree 792 files, the way of working's components 838, 0 hits;
    every rule seen firing on a planted path. `aPartServesItsEntry`, `anAtomComposesNothing`,
    `aMoleculeComposesOneMolecule` retire. A design test in `tests/` still reads a part past its barrel
    (`featurePage.test.tsx`, `ticketPanel.test.tsx`): tests are not read as importers.
25. The rehearsal copy links the way of working's files, and a resolver follows a link to its real path, so a
    rule reading where an import lands saw the way of working's own path there: both resolvers now take
    `symlinks` from the tsconfig's `preserveSymlinks` (`shared/lint/resolution.ts`), which the rehearsal sets,
    as tsc does. A repository without it resolves as before.
26. The way of working compiles at its products' floor, target ES2022 (this side's lib): verify caught a shared
    rule calling `toSorted` (ES2023), which this side's tsc refused; the way of working's own tsc refuses it now.
27. The rehearsal copy hard-links the way of working's files (chunk 6): each one is the file itself at the
    product's path, so every tool reads a real tree, as the product will after its port, and a write there lands
    here. Symlinks had a tool follow a link to the way of working's path (knip, the resolvers, tsc) and needed
    `--preserve-symlinks` in the copy's scripts, tsconfig and vitest config, 15 of which had leaked into the
    port patch; the patch is rebased on the plain product, none left. A file the way of working replaces (a
    new inode) leaves the copy's link behind until the next rehearsal; verify always rehearses afresh.
    `dev/rules/checks.md` joins the other rule documents here, written from its module.
    Its guards (eagle-dev's cross-check): verify hashes every linked file before the copy's run and after, a
    change being a difference (`rewrote · <file>`, seen firing on a stale rule document); `yarn rehearse --check`
    finds a link replaced, a file added or gone since the rehearsal; a copy on another volume fails with why.
28. Knip holds what nobody reads (chunk 6b), from the scope (`shared/lint/knipConfig.ts`): the entries, what the
    build starts from (`starts`: each page, each module it writes as data) and each file a Claude Code hook runs
    are its entries; a part's value and type are read or gone. On a real tree it found the port's gaps: two
    packages the shared config imports and this side lacked (`eslint-plugin-boundaries`,
    `eslint-import-resolver-typescript`), two it no longer reads (`@testing-library/react`, `postcss`), and the
    icons' package read by a joined path (now `import.meta.resolve`). `knip --fix` unexported 33 types and 2
    values nobody read, a script, never a hand. Prettier now reads the way of working's files here too (it
    skips a symlink): 20 formatted. Verify runs `format:check`, `lint:files` and `lint:exports`.
    `aToolIsAScript` retires; `anExportIsRead` keeps an entry's half, read by its global, a ticket's read list
    or the build side's list, which no tool reads.
29. A file's name is one way-of-working rule (chunk 6c), `wow/file-names-its-purpose`: a drawer's name, a name
    ending in a number, a `*Types` file holding a value and an `index.ts` holding code of its own are refused in
    every repository; the scope's `names` give each side its patterns (here an entry kebab-case, a part camelCase
    or its epic, neither `index`). On a real tree it finds the 14 parts named by a number, the list its test held;
    they sit in `eslint-suppressions.json` until the product names each split by its job (a file's rename is the
    product's content). `aFileNamesItsPurpose` retires with the port's baseline; this side has no baseline left,
    so the shared tests row names a list by its family, `tests/architecture/baselines/{scan}.json`.
30. A component file holds one component and its props (chunk 6d, `wow/component-file-holds-its-component`,
    under each root the scope names in `components`; a provider's file and an icon's hold more). This side's ten
    parts moved by `scripts/move-declarations.ts` from `plan/moves/component-parts.tsv`: a second component to
    `components/`, a hook to `hooks/`, a helper to `utils/`, a constant to `constants/`, the imports each reads
    following it. `CombinationFile`, once exported, met the plans' type of that name: renamed
    `CombinationFileItem` first by `scripts/rename.ts` (`plan/renames-chunk-6d.tsv`). The tiers and the molecule
    count read the same roots. The file lint gives each folder one rule set, its most specific key's, written as
    the folder's own path: a `**` key beside a glob made ls-lint pick at random, and a key never reached the
    folders below it (the way of working's own fixtures, named as a product's, now have a key). From the build
    side's cross-check: a key is written raw (an escaped `\[id\]` never matched), a folder's bans take each
    many-dot extension it holds that ends in a banned one, ls-lint's lines come sorted, and an overload's
    signatures are its one component. A renderer (`renderers`, its folder and the app it is drawn inside; none
    here) is an app inside the app: its roots climb a ladder of their own, it imports nothing of its app (a
    package outside the app it reads as the app does), the app enters it at a component's barrel
    (`wow/renderer-stands-alone`, Dom through the build side, 8 Nov); the app's roots climb one ladder, and the
    molecule count reads one ladder.
31. One tsconfig base (chunk 6e, `shared/tsconfig.base.json`): the checking options both sides keep, `strict`,
    `verbatimModuleSyntax`, `erasableSyntaxOnly`, `isolatedModules`, `noImplicitOverride`, `noImplicitReturns`,
    `noFallthroughCasesInSwitch`, `noEmit` and with it `allowImportingTsExtensions` (a path written `.ts`, so
    node runs the code by type stripping), `skipLibCheck`. This side's tsconfig extends it and keeps its
    environment (target, lib, modules, JSON, types, JSX, include). Measured on its tree: each 0 but
    `noUncheckedIndexedAccess` (44), `exactOptionalPropertyTypes` (88) and `noPropertyAccessFromIndexSignature`
    (107), which stay out of the base (`plan/progress.md`, the stricter flags).
32. The generators' check mode is the way of working's first shared test (chunk 7a,
    `shared/tests/aGeneratedFileIsAFreshEmit.test.ts`, run by each side's vitest, reading `scope.generators`): each
    generator runs into a fresh folder under `--permission`, allowed to write there alone, and writes what the tree
    holds byte for byte; each owns its files by `writes` globs, and one it no longer writes is stale. This side's
    one generator is `tools/emit-into.ts`, its emitted texts under `--out` (the JSON, the rule files, the skills,
    the documents, `tokens.ts`); `aGeneratedFileIsItsModule` retires. `scope.generated` stays what lint skips. A
    test lives under `tests/` or the way of working's `shared/tests/` (`TEST_HOMES`, from `SHARED_TESTS` in
    `shared/repoScope.ts`, which the vitest config reads too). The build side's probe of this copy, its first:
    48 written, 48 owned, 0 stale; a stale line in `docs/rules/README.md` fixed.
33. One baseline helper (chunk 7c, `shared/tests/baseline.ts`, its tests beside it): a list starts by its own act,
    `BASELINES=start:{scan}`, refused when it exists or holds nothing, and says so; `BASELINES=write` only shrinks
    a list, never starts one, and removes an emptied one with a printed line, so "clean" has one spelling, no file,
    and a cleaned scan stays red on a new offender (the PM: removed, a note in history; eagle-dev's fix, explicit
    start). A list of anything but strings, or no JSON, is refused naming its scan. This side's `baseline.ts`
    and its test retire; `anExportIsRead` reads the shared one.
34. The way of working's organisms keep the component shape (chunk 6f, the PM's catch): 48 parts in BoardPage,
    FeaturePage and WireframesPage renamed and moved by script (`scripts/part-names.ts` writes the maps,
    `plan/renames-chunk-6f.tsv`, `plan/moves/organism-parts.tsv`; `rename.ts`, `move.ts` apply them,
    `wrap-headers.ts` cuts a header bullet the longer name pushed past 80). A part carries its component's
    name as a plain prefix, never a collapsed one (`BoardPageBoardColumn`, eagle-dev: a collapse clashes and
    cuts words); a hook `use{Component}…`, a service its verb first. `componentShape` leaves the scope: every
    component tree keeps the shape. ls-lint holds a component's folders; ESLint `wow/file-names-its-purpose`
    holds a part's name (`unnamed`) and a drawer folder's closing word (`closing`: utils `Utils`/`Adapters`,
    constants `Constants`/`Words`, types `Types`/`Answers`, providers `Provider`, services `Service`, a purpose
    before it in utils), both read from `shared/lint/partNames.ts`, which the script reads too; a part is
    one under the scope's component roots alone (`components`, the rule's option), so a folder called
    `molecules` elsewhere is no component (eagle-dev's probe).
    The folder-shape row and the drawer-word row are shared now. The two height suppressions in its organisms
    go: the day bars and the screen frame take an aspect ratio (5 / 1, 16 / 9), size following width.
35. Every folder has its place (chunk 6g, the PM's audit): `tools/lint-files.ts` passes ls-lint the rules
    `tools/layout/folderRules.ts` writes from the homes: a home that bundles names its folders (its child homes
    and the folder of each module straight in it, an entry or one written as JSON), every folder on the way to a
    home names its children, and a home that bundles nothing, the repository's own folders (`OWN_FOLDERS`:
    tools, tests, .claude, .husky, design-system, notes) and a module's folder are free below. A new folder
    anywhere else fails, naming the ones it could be. The root's rules are keyed `''` (`shared/lint/fileRules.ts`).
    The way of working keeps its rules (`scripts/keeps-its-rules.ts`, in its check:chunk): no ESLint or
    TypeScript directive in a file of its own, read from the compiler's comments (a JSX brace's too, and one
    TypeScript honours in a JSDoc comment, `/** @ts-expect-error */`), and no suppression of a linked file in
    the rehearsal copy. A component root names its tiers and its tests (`componentFolders`), so a stray folder
    under it fails too (eagle-dev's probe).
36. The skill tests are shared (chunk 7b, first of four): `shared/tests/aSkillSaysWhatAndWhen.test.ts` (a
    description, "Use when", 1024 characters, its name its folder's) and `shared/tests/everySkillIsShort.test.ts`
    (2000 words for a file read whole, 1000 for one read every turn, `## Contents` past 100 lines for one read
    on demand) read the scope's `instructions`: this side's skills (`.claude/skills/*/SKILL.md`, one spelling
    with the generator's `writes`), read whole, `docs/rules/*.md` on demand, `CLAUDE.md` every turn. A glob
    that names no file fails, in each of the four lists. A skill's entry holds its reasons, so a listed skill
    that gains one is new. A scan of counts says so (`heldToItsCount(scan, Map)`): its entry `{key} · {count}`
    may fall, never rise; a plain scan reads an entry whole. This side's two tests retire; the size row is
    shared. `shared/tests/globs.ts` is the one reading of a glob list with `!` (the generators' test reads it
    too): in the disk's case (a Mac echoes a glob's), the scope's ignored folders never read (eagle-dev).
37. A sentence is written once, shared (chunk 7b, second of four): `shared/tests/aSentenceIsWrittenOnce.test.ts`
    reads the scope's `sentences`, globs of code (its strings: the syntax tree's literals of 20 characters or
    more, 6 words a sentence, a generated file aside) and of prose (lines and table cells, fences out, 8 words);
    each sentence two files hold is counted by its copies (`heldToItsCount`), so a new copy is red and a file
    moved changes nothing. This side's prose is `CLAUDE.md`, the skills and `docs/rules/*.md`, its code none
    (a sentence a person sees has its home, `sheet/words/messages.ts`); the way of working's own code is held
    too (0 found). This side keeps its own check as `aRuleIsNamedNeverCopied` (a rule's text, `plans.ts ·
    RULES`, named, never copied). A skill's baseline entry is one per reason (a partial fix is written), and a
    path's case is read step by step from its folders, so a link is no misspelling (eagle-dev's G1, G2).
    A generated file is put aside where the copies are counted, under a case of its own, and a number that
    leads a sentence stays its word (eagle-dev's H2, H3; each seen red). Its re-check: the build side's 13
    found again (6 of 2, 3 of 3, 1 of 5, 3 of 7), the copy 0 over 22 files, the way of working 0 over 78.
    Found by it, next (part 2b): 14 sentences the two sides' rule files and two pipeline skills write twice.
38. The two sides' rule files share their words (chunk 7b, part 2b): `shared/rules/{concern}.ts` holds one
    `shared` per concern, `{ title, opening, rows, whys }`, and `shared/rules/ruleFileFor.ts` makes a side's
    `rules` from it: the title, the opening joined to the side's own intro in one paragraph, the shared rows
    with the side's gate, then its own rows. A reason both sides give is named by its key
    (`why: { shared: 'noCast' }`); the build throws when a side's rows name a shared reason nowhere, or write
    one out in words (each seen red: a reason of its own words, an exact copy inline, which the sentence test
    also counts `· 2`). The 13 rule sentences and the pipeline's stop line (`NO_STOP_OF_ITS_OWN`) have one
    home; the rule files' markdown moved in whitespace only (6 files), `ticket-pipeline.md` byte for byte
    (sha256 a8103e66…). The way of working's sentences now read both sides' trees: a product's tree is read
    by a glob that starts inside it, never by a broad one walking in (`productTrees`, eagle-dev's hole; each
    branch seen red). Found, for later: `shared/rules` reads `RuleFile` from `design/docs/rules/ruleTypes.ts`,
    a shared file importing a product's; its home is `shared/rules`.
39. Every rule's gate, shared (chunk 7b, third of four): `shared/tests/everyRuleHasAGate.test.ts` reads the
    scope's `ruleFiles` (the tables as printed, `| Rule | Gate | Exceptions | Why |`); this side's own test
    goes. What runs is read off the tree, never planted paths: ESLint's config for every file the scope's
    production, react and test globs name (a rule on in one folder alone counts; an ignored file has none),
    its linter options from the same configs, the tests' names (`x.test.ts` is `x`, and a gate may write
    `x.test`), the package's scripts (`yarn x` is `x`), and `review`. An entry names the file and the gate,
    never a number or a note, and a row by its rule's text: `{file} · {rule} · {gate}`, `{file} · {rule} · no
    gate`, `{file} · over 200 lines`, so a listed file gaining a second dead row is red and a partial fix is
    written (eagle-dev's K1). Each list is read on its own, so a `!` in one never takes another's files from
    ESLint's union (K2); a test's name drops `.test` or `.test-d` alike on both sides (K3). Each of its 16
    branches seen red. One `linesIn` for both
    size tests (`shared/tests/textSize.ts`). A product's tree named without its `/**` holds its own folder
    alone, never a sibling sharing its start (eagle-dev's J1, seen red).
40. The docs name real paths, shared (chunk 7b, last of four): `shared/tests/theDocsNameRealPaths.test.ts`
    reads the scope's `namedPaths`: `docs` (globs, each `!` with its reason in scope.ts: an archive, a log,
    generated output, another repository's paths) and `roots` (the top folders a backticked path starts
    with). A path not there is listed `{doc} · {path}`; a placeholder (`{x}`, `*`, `<x>`, `…`, `...`), a
    line or a range (`:3–5`), an anchor, closing punctuation and a pointer's ` · export` are no part of it,
    and a catch-all's `[...name]` is a real folder, a route group's `(name)` keeps its `)`. A path is there
    as the disk spells it, step by step (`isOnDisk`, one home with the globs', eagle-dev's L1), so a doc's
    wrong case is missing on a Mac too. Each of its 12 branches seen red. This side: 23 docs, 53
    paths, 0 missing (`EXX` measured as no placeholder it needs). Its bundle check is this product's own
    fact, so it stays this side's test, `theProcessNamesNoBundle` (its row's gate renamed). The way of
    working reads README.md and the design system's guide; PLAN.md (files to come) and plan/ (notes) are out.
41. SonarJS (chunk 7d): its recommended set less one OFF table, each rule off with its reason
    (`shared/lint/sonarRules.ts`), and `@typescript-eslint/no-deprecated` (`builtinRules` allowed). The design
    side's code met it in code: 35 regexes linear with the same matches, a loop, two nested assignments, a sort;
    the checks' world runs a bundle by `vm.compileFunction` until the PM rules on `code-eval` (morning list);
    `HISTORY` and the gate's `KNOWN_FAILS` gone (empty, the 7c answer; a check's fail held open would start a
    7c baseline, never `eslint-suppressions.json`, which holds ESLint's alone). This side's own 11 are held in `eslint-suppressions.json` until mended here: the regexes in
    `pointerResolve.ts` (3), `ticketExpand.ts`, `caseText.ts`, `chipCtas.ts`, `roleMatrix.ts`, `todoMoves.ts`,
    `catalogRail.ts` (the same rewrites), `listPart.ts`'s `new Function` (as `checkWorld`), and
    `gate-states.ts`'s `substr` (`slice`). The sheet skill's commit line names no known fails.
