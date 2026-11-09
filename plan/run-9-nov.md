# Run D · 9 Nov · the way of working's steps 1–5, then the design port

The PM, 9 Nov: "leccie zatem z eagle dev, tak jak nocny run, podejmujcie decyzje, jezeli macie pytania zapisujcie,
dzialajcie autonomicznie, macie odpowiedzi" · progress after every finished part ("zebym mial historie progressu"),
held by the run hook (`.claude/run.json`). Held for the PM: a release, a page deleted, a snapshot retaken, the
product repositories (eagle-design through its port only, mailing-automation read only).

## Progress

Printed by `~/.claude/hooks/runBars.py` (show · close <stage> <words>), never counted by hand in a reply.

| stage | what | done | of |
| 1 | Harness | 5 | 5 |
| 2 | Rules | 10 | 10 |
| 3 | Names | 6 | 6 |
| 4 | Tools | 5 | 8 |
| 5 | e2e | 0 | 4 |
| 6 | Port design | 0 | 5 |

## History
- 09:38 · stage 2 · 9 of 10 · R1-R3 runner fixes: strict flags, NUL names, eslint --fix on files staged whole (38d402e)
- 09:38 · stage 2 · 10 of 10 · step 2 verified ALL SAME, 50 expected; committed 38d402e
- 10:10 · stage 3 · 1 of 7 · file case by kind, nameCases, git's ignores (facc5a5)
- 10:10 · stage 3 · 2 of 7 · 18 renames by the one mover (facc5a5)
- 10:16 · stage 3 · 3 of 6 · folder case by kind; a module's folder by its name (task 3)
- 10:21 · stage 3 · 4 of 6 · data, tables, assets by kind (task 4)
- 10:25 · stage 3 · 5 of 6 · part names B: repeats rule, 5 parts renamed (task 5)
- 10:49 · stage 3 · 6 of 6 · prettier tables and ignores from the scope (task 6)
- 11:02 · stage 4 · 1 of 8 · words rule: a person's text in its words file (task 1)
- 11:19 · stage 4 · 2 of 8 · Contents for long documents and their cut sections (task 2)
- 11:36 · stage 4 · 3 of 8 · flag B: index signatures, 108 to 27 payload (task 3)
- 11:50 · stage 4 · 4 of 8 · flag C: reads past an end, 41 to 0, flag on (task 4)
- 12:00 · stage 4 · 5 of 8 · flag D: optional properties, 93 to 0, flag on (task 5)

- 08:24 · stage 1 · 1 of 5 · the build side's skills to legacy/ (8bfcd8e)
- 08:51 · stage 1 · 2 of 5 · 7g commitlint (d282df5)
- 09:12 · stage 1 · 3 of 5 · deps:dedupe, three passes (46bda0b)
- 09:47 · stage 1 · 4 of 5 · checks in three tiers (a50ec3c)
- 09:47 · stage 1 · 5 of 5 · the spike lane (a50ec3c)
- 10:05 · stage 2 · 8 of 10 · nested conditionals, cognitive 15, pattern rows, tools row, openings, points 1, 2, 6, 9

## Calls

- Step 1 part 1, the build side's skills: 11 skills and the 5 evaluations only they read to `legacy/dev/claude/`
  (git mv). The evaluate-ux merge waits for the kept skills becoming data (PM, 8 Nov): written once, in data, by
  script, never by hand in markdown first. `scripts/retired.ts` keeps a re-take from bringing them back.
- take-dev-map closes the tree after a cut (a last sibling's `└──`): 8 connectors the earlier cuts left open fixed
  with it. The build side's own skills comment ("lane B's planning pipeline, knowledge") is its text: its port's
  map brings the change.
- The commit tier (eagle-dev's measure, 9 Nov): ESLint, prettier, sonar and cspell on the staged files; tsc whole;
  a tree-wide scan at commit only with its time named, under the 1–3 min budget, else at the feature end.

- Part 1, eagle-dev's probe: 19 files byte-identical with its `.claude`, no kept file naming a retired one, the
  map's 82 lines with no connector fault. Its guard taken: `isRetired` answers only for a `.claude/` path (8 cases
  run, no test home for a take helper).
- The build side's port, from part 1 (eagle-dev's list): its renames 16 → 13 (architect's three files retire) ·
  `knowledge/` (25 mind maps) loses every reader, its port asks the PM whether it goes to `legacy/` · its CLAUDE.md's
  pipeline, knowledge and evaluation sections shrink · `commands/commit.md` points at the commit row at its port
  (the way of working's copy stays byte for byte until it becomes data).
- 7g's row lives in `shared/rules/checks.ts`: its rows are what each tool holds (cspell, syncpack), and commitlint
  is one more; its gate the script `lint:commit`, run by `commit-msg`.

- Later, step 2 or 4 (eagle-dev): the way of working's scripts get a test home, `tests/scripts/`; part 1's eight
  cases its first tests, and `closed()`'s: a cut last sibling, a cut middle one, a cut whose children follow it (a
  regression there moves the emit and the file together, so no freshness check goes red).
- 7g, eagle-dev's notes: merges pass (`defaultIgnores`); the pipeline's step 9 says its subject's 72 count the
  id and the tests count.

- SonarJS's cost (eagle-dev's measure on its 2532 files): `no-redundant-assignments` 958 of 966 s of rule time,
  0 found, already off with its measure; without it, 66 s wall (parse 13, rules 43). `deprecation` already off
  (typescript-eslint's `no-deprecated` the one gate). The AWS family off in part 4: no AWS CDK code in a repository
  of the way of working (`aws-restricted-ip-admin-access` 5.3 s). No single rule dominates after them: the split
  is by file count, sonar with ESLint on the files a change touched at edit and commit, the tree at the feature end.
- Part 4's shape: one tier map, shared (`shared/checkTiers.ts`): each check is a package script, run on the tree,
  or on the files a change touched when it has a files form (ESLint, prettier, cspell). A repository's own checks
  (the design side's architecture tests and checks gate; the way of working's rule tests, kept rules, verify) go in
  its scope by tier. `check:chunk` runs the commit tier, `check:feature` the feature end (pre-push), each check
  timed, the commit tier's total against its 3 min budget. `everyRuleHasAGate` counts a script only when a tier
  runs it. A `spike/*` branch skips the commit tier and its push.

- Part 3, yarn-deduplicate (eagle-dev's probe): `highest` alone never merges an exact pin beside a caret, the very
  split 7f found; the fixer `shared/lint/dedupe.ts` runs highest for every name, then the fewest versions on the
  check tools alone (their scopes, then their names: the package ANDs its filters), read from `PEERS`, now one home
  `shared/lint/checkTools.ts` the test imports too. Red on b56f17d's lock: highest lists regexpp only; the three
  passes list the typescript-eslint family's merge onto 8.70.0, the night's hand merge. Library API, so knip sees
  the package.
- Timings, the tier map's numbers (9 Nov, this machine): the way of working's whole check:chunk ~16 s (ESLint 4.8,
  tsc 1.5, rule tests 3.4, shared tests 1.4); the design copy's tree: ESLint 22.5 s, tsc 3.7, cspell 3.3, prettier
  2.7, architecture tests 3.2, ls-lint 1.2, knip 1.0, syncpack 0.3.

- Parts 4 and 5, the tiers and the spike lane: `shared/checkTiers.ts` (the map), `shared/hooks/checkTier.ts`
  (the runner, each check timed), `RepoScope.checks` (a repository's own by tier), the hooks on both sides
  (pre-commit the commit tier with `--write`, pre-merge-commit the commit tier, pre-push the feature end).
  `everyRuleHasAGate` counts a script only when a tier or a git hook runs it: two design rows gated on `checks`,
  which nothing ran, now name `checks:gate`, which the commit tier runs. SonarJS's AWS family off. Measured: the way
  of working's commit 10.6 s; the design copy's commit 33 s, its feature end 64 s.
- The build side's port (eagle-dev, 9 Nov): `deps:dedupe` on its lock moves zod 4.5.4 → 4.6.7 and @types/node
  22 → 26 (for @types/pg): its full suite runs after it.

- Parts 4–5, eagle-dev's probe (T1–T4): a pre-commit that formats re-staged what a person left unstaged
  (`update-index --again`, the build side's hook today too): the commit tier reads the index (`--staged`), formats
  and stages only a file staged whole, and checks a file staged in part as it stands; the working tree is the Stop
  hook's. A fast-forward runs no hook: the spike row says the push checks its work. The budget one constant
  (`COMMIT_BUDGET_SECONDS`), the Stop hooks' timeout 300 on both. A check that never started says why. Each proven
  red in a scratch repository (partial staging kept, the budget line, a missing tool, the spike).
- Step 2 measured: `sonarjs/no-nested-conditional` 19 on the design copy, 2 in the way of working (one fixed);
  cognitive complexity at 15 and cyclomatic at 10 find 0 on both trees: the swap is free on the design side.

- Step 2, eagle-dev's probe of 38d402e (S1–S3): the commit tier's `--write` ran prettier before `eslint --fix`, so
  a fix (a template from a concatenation) left layout format:check refused: ESLint first, prettier last, then
  staged (lint-staged's order), red then green in a scratch repository. `feature --staged` exits 2 (the feature
  end reads no file list). Its measure: complexity 10 against cognitive 15 finds 0 in its production too, so the
  size row's build exception drops "its tree measured first".

- Step 3 tasks 1–2, a file's case by its kind (PM 9 Nov, 6g A), with eagle-dev's read: `shared/lint/fileRules.ts`
  holds the default for every folder, the root too (TypeScript camel, a view Pascal, markdown kebab, `README` `SKILL`
  `CLAUDE` `AGENTS` as they are, a `_kebab` partial; each sub-kind listed, since ls-lint 2.3.2 reads `.test.ts` apart
  from `.ts`); a folder ruling every kind itself (`.*`, the component shape) keeps its own. Exceptions named once,
  `RepoScope.nameCases`, each with its why: wow's rule files (D29) and its fixtures; the design copy's entries (kebab,
  71, published: renamed inside a release alone), its sources by key (rule groups, skills, documents), its records by
  id (`E04Tickets.ts`, `feature-E04.md`, `T-E18-00.md`), its icons' released `SOURCE.md`. json, tsv, assets: task 4.
- My call, logged: a source named by the key of what it holds or writes (a skill, a document) stands with the PM's
  "a rule file by its key": the same reason, one case.
- ls-lint walks the disk, not git (eagle-dev's point): `runFileLint` skips what git ignores, read at run time, so
  `.gitignore` is its one home; the lint-files lists keep only what git tracks and the lint sets aside (`legacy/`,
  `poc/`, a product's trees in the way of working). Red without it (`dist/`, `.artifact/` flagged), green with it.
- 18 renames by script (`plan/moves/case-by-kind.tsv`): 9 scripts, 2 hooks, 6 product tools, `PLAN.md` →
  `plan/README.md`. `scripts/move.ts` is the one mover (eagle-dev: no second home): rows from the root, any tree,
  imports and exact paths after it; a doc follows a move only where its scope checks its paths
  (`namedPaths.docs`), so notes and release records keep what they named. A first run rewrote the copy's notes
  and `records/release-3-2.md`: undone, the mover fixed, run again.

- Step 3 task 3, a folder's case by its kind: kebab-case in the default, a tool's own by its convention (`.claude`,
  `__tests__`); a folder holding a module's parts takes its module's name (a component's PascalCase, held by the
  component shape; an entry's, held by the design side's folder rules: its name, and the case below it); a
  framework's names (Next's `[id]`) are a product's case (eagle-dev), the shared tests pass one. The copy: its
  records' folders by id (`E04`, `T-E18-00`).

- Step 3 task 4, data, tables and assets by kind (eagle-dev's "still to say"): JSON camelCase (data code reads),
  `package`, `tsconfig`, `eslint-suppressions` as their tools name them; a table (`.tsv`), a patch, an asset (`.svg`,
  `.png`) and a font kebab-case. Named: a font keeps its foundry's name, an icon its source's (`ic_de_color_flag.svg`,
  snake_case), a check's snapshot its check's key, a module written as JSON its module's name until the port's
  release. SQL is the build side's, at its port (by migration order).

- Step 3 task 5, part names B: `wow/file-names-its-purpose` refuses a part whose own name opens with a word of its
  component's (`repeats`, every word, on hooks, utils and constants too; "name the part by what it holds", eagle-dev's
  wording). Red on exactly the 7 files; 8 names by rename.ts (`plan/moves/part-names-b.tsv`), 7 files by move.ts
  (`plan/moves/part-files-b.tsv`): BoardPageHead, BoardPageColumns, BoardPageColumn, FeaturePageHead, FeaturePageSteps.
  The mover rewrote the rule test's example paths (product paths in the way of working's own tests): a product's
  path now follows a move in the linked homes alone; the examples restored, the test red on them again.

- eagle-dev's F1 (probe of facc5a5, f2c1eea): `tools/release-record/` stayed beside the renamed `releaseRecord.ts`, and
  the folder default (kebab) disagreed with "a module's folder takes its name". Both its proposals taken: a shared
  rule (a folder beside a module of its name, case aside, takes the module's name as it is: red on that folder,
  the design side's own entry-folder rule gone into it) and the mover (a folder's row moves its files; a module's
  row moves its parts' folder of its name). Fixed by the mover (`plan/moves/release-record-folder.tsv`).

- Step 3 task 6, prettier tables B with eagle-dev's three inputs: `RepoScope.tables` (files whose rows are objects:
  rule groups, plans, tokens, words; `!` globs allowed) print at a 10000 width, a row one line, the rows array still
  broken (measured); a document's or a map's string arrays stay at 80, one string a line (a wide width joined them:
  measured, taken out). `wow/table-syntax` keeps a table's file data alone. `RepoScope.unformatted` (glob → why)
  with the ignores, product trees and generated files make `.prettierignore`; one generator,
  `shared/lint/writeFormatterFiles.ts`, writes it and `.prettierrc.json` (plain JSON, every reader's), fresh-emit
  tested. 84 `// prettier-ignore` removed by script, takeDevMap's emitted one too (its map now written as prettier
  lays it out: a re-take writes nothing). `.prettierrc` renamed in place to `.prettierrc.json` (the design side's
  `legacy/` is a published home: a config moved there reached the artifact, verify caught it). The design copy's
  37 component files under `app/` had never been formatted (its old ignore held all of `app/` but `.ts`): formatted
  by prettier, 5 components past 40 lines split into parts named by what they hold (BoardPagePortGrid,
  BoardPageEpicHead, FeaturePageKindChips, FeaturePageCombinationTitle, FeaturePageFieldOption).
- Relayed by eagle-dev, 9 Nov, as Dom's: prototypes are built in the build repository on a `spike/*` branch, the
  design side keeps no copy of the app and turns a prototype report into tickets in a release. Taken as input for
  the template's planning (O18); to be heard in the PM's own words before it changes a plan.

- Relayed by eagle-dev, 9 Nov, as Dom's: the design side no longer waits for eagle-dev's probe before a push; it
  sets the way of working's rules for both sides and pushes when its own checks are green; eagle-dev cross-checks
  every pushed commit in one pass at the sync, and takes the rules into its tree then (it works the product on
  `feature/vibe-09-11-2026` meanwhile). Taken: it drops a wait and asks nothing new of the run.

- Step 4 task 1, the words rule (point 15): `wow/words-live-in-a-words-file` reads content by syntax tree, in a
  component root's files but its words files: a string in sentence case (`Preview settings`, `A template is never
  sent`, a template's text with its holes) is a word; a key is not (compared, a case, a map's key, a set's member,
  a list looked up, a property's own name, a value its type closes to named strings, a command's name), nor a style
  (an object `sx`, `style`, `…_SX`, `…Styles` names, or a `csstype` type), nor markup's own (`wow/markup-syntax`).
  Measured read only, typed by each tree's tsconfig: the build side 19 words in 6 files (its 14 exports and the 5 a
  name-keyed gate missed: `Create` in an adapter, `Compare with …`), no false one in 945 files; the design side 0.
  Its build gate `copyLivesInAWordsFile` stays until its port, the row says so.

- Step 4 task 1's push refused by verify: the row's string in double quotes, which the design side's prettier
  (its rule tables at full width) prints single; formatted in place, carried by task 2's commit, never an amend.
- Step 4 task 2, Contents (settled 9 Nov, D and B, point 5): `design/tools/emit/documentContents.ts` opens a
  document past 100 lines with `## Contents` above its first `##` (its opening's headings, then its parts: a
  heading after a rule), and each section the build side cuts (a path heading to the next rule) past 100 lines with
  its own, `##` alone so the cutter is untouched. The pipeline gets one (17 parts) and two cut ones (`_shared.md`,
  the recon template); `ticket-feature` runs 107 lines with no `##` (bold leads), nothing to list: a skill is read
  whole on the build side, the Contents rule is the on-demand files'. api-convention gets one. Both documents join the design side's `onDemand`, so the
  shared `aLongFileOpensWithContents` holds them. A rule file's md stays a table (40 lines at most today): the
  same test holds it past 100, its source held at 200 by `max-lines`. The release and its 2 re-pins: the PM's go.

- Step 4 task 3, flag B (`noPropertyAccessFromIndexSignature`, eagle-dev's order): the word records typed by their
  keys, `liveWords` written once (a part of messages.ts, read by gate-rules and block-rules through it, a Proxy
  typed by its names and by a key a table holds: no assertion), the open pair in `aBlockIsWrittenOnce` closed;
  then TypeScript's own codefix by `scripts/codefix.ts` (generic: a code, a flag, a `--keep` regex on the object
  read; one error TypeScript reports twice written once, a defect its first run had, 3 lines mended by exact
  replacement). 108 → 27, all the event payload's (`payload.…`, `payloadOf(…)`), kept for its typing in the port
  (PM 9 Nov · A), where the flag goes into the design side's tsconfig at 0. `scripts/languageService.ts` is
  rename's and codefix's one service. 27 published modules print differently, listed.

- The PM, 9 Nov ("a czemu nie prosisz go o weryfikacje?"): the relayed no-probe rule taken back; eagle-dev asked to
  probe 81399a5, cbe6ab7, 4470cca, aa58888 by commit, its findings in before the next push.

- Step 4 task 4, flag C (`noUncheckedIndexedAccess`), the 41 read one by one and mended by one script of exact
  replacements: a queue walked by `for…of` (it sees the queue grow), a character by `charAt`, a label by
  `label(key)` (it throws on a key it lacks), a regex group by `?.[1]` and a check of it, a block's key by
  `placeAt` (none past either end), a kept key by `need`, `?? ''` only where the value always stands (a first word
  of a split). 41 → 0: the flag is on in the design side's tsconfig; the shared base takes it when the build side
  reads 0 too (877 measured 8 Nov). 4 more published modules print differently, listed.
- Eagle-dev, 9 Nov: the probe of the 4 pushed commits is held until Dom says go in its own chat (there Dom set
  product first, the way of working at the sync). The design side commits on, and pushes nothing until the probe.

- Step 4 task 5, flag D (`exactOptionalPropertyTypes`), 93 on the design side (88 measured 8 Nov, 5 more from flag
  C's honest reads): TypeScript's own fix covers 7 of them (`codefix.ts` now takes several codes); the rest by
  `scripts/optionalUndefined.ts`, which walks each error from its value to the optional property the value may
  leave undefined (nested, in arrays, through a `return`), reading the declared types (the checker's own adds the
  flag's missing type to any optional one), and writes `?: T | undefined` there: 104 declarations in five passes,
  93 → 0, the flag on in the design side's tsconfig. Call: each keeps today's meaning (before the flag `?: T` was
  `T | undefined`), so no reader moves; every optional property no value leaves undefined is now held strict, and
  a new one is. Open: a widened property every producer always sets could be required instead, a reading of 104
  declarations, for the port ticket's review. Types only: the published modules print the same.

- Step 4 task 6, `sync:groups` (S0): its shared core in `shared/sync/` (a group's normal form: a shape's keys sorted,
  a token's colour six lowercase digits and its px a number, a word's whitespace one space, quotes kept; its sha256;
  the three forms compared leaf by leaf, each moved leaf with the side that moved it; `sync:groups` reads three
  files of each group's data and kind and computes the forms itself, once for both sides, a table a group, never
  refusing; the design side's package names the script, so knip reads its files), its tests (`tests/sync`, `test:tools` in the commit
  tier), and its row in `shared/rules/checks.ts` (`review` on both sides until the ports). The design side's forms
  emitter waits: which fields of each group count (the contract's, the components', the words') is agreed with the
  build side first, and the payloads are typed in the port; both go to the port ticket.

## Questions for the PM

- The design side's 71 entries keep kebab names (`sheet-status.ts`): the artifact and the build side read them by
  path, so a rename goes inside a release. Rename them in the port's release (stage 6), or keep them as the named
  exception? Held as the exception until the PM's word (eagle-dev: the build side's fixtures and skills follow a
  release either way).
  **PM 9 Nov · A**: "zmieniamy nazwy w wydaniu portu (etap 6) => unifikujemy repo". The 71 renamed by script in
  step 6 (a task added there: 5 of them), inside the port's release on the PM's word; the entries' exception goes
  then. Why step 6, not 3: the names sit in a guard snapshot (`content-type-snapshot.json`, its retake the PM's
  word, given with the release) and in frozen notebooks and decisions, which keep what they named; the rename
  rewrites the live pointers alone (capabilities, the source map, imports, skills, configs), each `X.ts`, `X.js`
  and `X/` of a renamed entry.
  My call: a folder holding one module's parts takes that module's name as it is (`sheetStatus/` beside
  `sheetStatus.ts`), as a component's folder takes its component's: one name for one thing.

- At the build side's port (eagle-dev's measure, 9 Nov): its 23 merges carry written subjects of 115–196
  characters (`Merge T-E18-00 · …`), and commitlint lets through only git's own merge forms. From its port a merge
  takes git's form with its summary in the body, or a written subject within 72: the PM's act (`git merge -F -`),
  so the PM's word, asked at that port. Its history is untouched (commit-msg reads new commits only).
