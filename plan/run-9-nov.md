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
| 4 | Tools | 8 | 8 |
| 7 | P1 release | 5 | 5 |
| 5 | e2e | 4 | 4 |
| 6 | Port design | 5 | 8 |
| 8 | E19 + backup | 3 | 3 |

Stage 6, measured 9 Nov 17:20 (the PM holds it: start asked): 1 · links, how wow's files stand in eagle-design's git
(the PM's decision, README · How a product uses it) and the script writing them, ~1 h · 2 · port.patch (144 files,
+4006 -723) on eagle-design main, one commit per step, ~1 h · 3 · `vendor/wow/`: the build writes the closure the
build side reads, digested in the record; `buildReads.modules` cut to its four, ~2-3 h (not built yet) · 4 · the 71
renames by the mover, ~1 h · 5 · snapshots retaken (guard-map, content-type), the PM's word · 6 · the port's release,
the PM's word, ~0.5 h; eagle-dev's three lines of `sheetReads.ts` and its take, ~1 h of its own. Mine ~5-7 h.

Stage 7 (PM 9 Nov, A: P1 alone before the port, everything eagle-dev changed since its last merge) runs first: 1 · 4a rows + six copies committed on eagle-design main · 2 · 4a pushed, recorded, tagged, sent · 3 · 4b component facts + screens D1–D13 · 4 · 4b released and sent · 5 · main merged into restructure, the rehearsal applies its patch --3way.

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
- 12:25 · stage 4 · 6 of 8 · sync:groups shared core; words acronym miss mended (task 6)
- 13:17 · stage 4 · 7 of 8 · design system guide as TS data, guide.md generated (task 7)
- 13:20 · stage 4 · 8 of 8 · scripts' test home: retired, mapTree, movePaths (task 8)
- 13:51 · stage 5 · 1 of 4 · browser tier framework in shared/e2e, fitted to the rules (task 1)
- 14:04 · stage 5 · 2 of 4 · scope browser tier, first four gates red and green (task 2)
- 15:00 · stage 7 · 1 of 5 · 4a committed on main, 775a968
- 15:03 · stage 7 · 2 of 5 · release 4 out, 81a1804, sent
- 15:17 · stage 7 · 3 of 5 · 4.1 committed feb6056: spec merged, screens, edge 13
- 15:19 · stage 7 · 4 of 5 · 4.1 released 09c0ab9, tag release-2026-11-09-2, sent
- 15:42 · stage 7 · 5 of 5 · main merged into restructure c4ed4d7, port rebased 1ec3346, verify ALL SAME
- 16:22 · stage 5 · 3 of 4 · e2e gates: flows by the registry, roles, test ids, registry leaves, helpers (a03b90d..9df193a)
- 17:01 · stage 5 · 4 of 4 · e2e skills from data, be2a135
- 18:42 · stage 8 · 1 of 3 · T-E19-00 refined with the PM (C1-C15), releases 5 and 5.1, sent to eagle-dev
- 18:42 · stage 8 · 2 of 3 · yarn backup in wow and eagle-design, restored in scratch, zips taken
- 18:42 · stage 8 · 3 of 3 · port.patch re-saved on main of 9 Nov evening, chain green
- 20:28 · stage 6 · 1 of 6 · take built in wow, product side lands with the patch
- 21:10 · stage 6 · 2 of 6 · port branch on wow v0.1.4, feature tier green
- 00:59 · stage 6 · 3 of 6 · vendor/wow on the branch a95cc34, wow v0.1.7, faces in tokens
- 01:56 · stage 6 · 4 of 6 · rename built: wow 4915103, moves.tsv; branch waits on task 5
- 10:02 · stage 6 · 5 of 8 · task 8: every HTML and CSS to legacy, df0c982 pushed

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

- Eagle-dev's probe, 9 Nov, on Dom's go (81399a5, cbe6ab7, 4470cca, aa58888, a590ae6): nothing wrong; its cutter
  takes the Contents with only the added lines (27, in `_shared.md` and the recon template), everySkillIsShort green;
  one miss in the words rule: a label opening with an acronym (`CTA label`) failed the sentence test. Mended: the
  first word capitalised or an acronym, one lowercase letter at least in the text (`HTTP GET` stays out); the
  build side's count 19 → 22 in the same 6 files, the design side's 0. Its flags B and C read 392 and 454 on its
  tree: the shared base waits for its port.

- The PM, 9 Nov · B: the design side pushes when its own checks are green; eagle-dev probes the pushed commits in
  batches, when the product leaves it time, and its findings land as commits after. (09e6bcd and da6d7f8 went out
  before its probe, against what the design side had said: asked for at its next pass.)

- Eagle-dev's second probe, 9 Nov (b9fc613, 09e6bcd, da6d7f8): four findings, each mended with its test.
  The words rule's acronym branch took `GET /api/groups` for a sentence: an acronym is now followed by one space
  and a word. The sync core: a key holding a dot (`kind.unknown`) ran into its path, now a path is its keys; an
  empty `{}` or `[]` had no leaf and a moved group showed no row, now it is a leaf; a group one side lacks
  digested as null, now as no text; `rgba(0, 0, 0, 0.80)` is written `rgba(0,0,0,0.8)`. Arrays compare by place
  (a moved item reads as each place after it changed): kept, said here. Flag D on its tree reads 375: it would
  widen only the optionals a value passes through and list the rest by hand; the design side's 104 take the
  same review at the port (stage 6), each `?: T | undefined` read again as required or optional.

- Eagle-dev's P1 consult, 9 Nov (Dom's in-app routes, relayed): answered with the sheet's facts alone (six rows
  that move with its 7a; `kind.unknown` already the refusal; addressOf and category ours). Its Q1–Q4 came as its
  relay, not the PM's word here: asked of the PM first, then the design rows one at a time (ContentType's kind
  as a union or optional, In-app as a CATEGORIES layer and addressOf's first segment, one delivery order per
  in-app row, a placeholder refused for not being built, a kindless type's copy sources).
  **PM 9 Nov · A**: "tak potwierdzam": Q1–Q4 are the PM's. The rows are written in the design copy and reach
  eagle-dev with the port's release (7a); next, the first design row, ContentType's kind.
  **P1 row 1 · B, PM 9 Nov ("B zatem")**: ContentType a union by channel: a channel with kinds gives rows a
  required `kind`, one without gives `kind?: never`, a placeholder its own member; which channel is which read off
  channels.ts's table. Lost: A, `kind?:` as today: the fact held by data and tests alone, an old event's kind could
  land on an in-app row and compile. Same shape as eagle-dev's 7b TypeRow.
  **P1 row 2 · B, PM 9 Nov**: the nav's groups a table of their own beside PLACEHOLDERS (typeKinds.ts), in their
  shape with channel ids: In-app `path: 'in-app'`, its cards `bottomSheet → bottom-sheets`, `appBanner →
  banners`; Email and Push groups of one channel; channels.ts holds no nav fact; a test holds each channel in one
  group; addressOf writes `/{group}/{card}`. Lost: A, a `nav` field on each channel row: the nav in two homes and
  channels.ts holding the model and the menu.
  **P1 row 3 · no question (PM 9 Nov: "co to ma za znaczenie teraz skoro ani nie mamy audience ani
  segments?")**: Audience and Segments are not built (their shape is E10's), so an in-app row's order shows
  nothing today. My call: the in-app rows keep the order written today on their lists (SEGMENTS_FIRST), no value
  moves; E10 3f sets the in-app audience when it is built. I asked a point with no effect: a point is put to the
  PM only when someone sees it change.
  **P1 row 5 · no question**: derived from Q2 ("from an existing one"): a kindless type's copy sources are the
  documents of its own type; the kinds' copiesInto stays for Email and Push.
  **P1 row 4 · A, PM 9 Nov**: the API takes a channel's id alone; a placeholder lives in the nav (`nav: false`)
  and reads as `400 type.unknown`; typeKnown's words widen, one case added (a placeholder's slug). The E18 edge on
  17 moves from kind.unknown to type.unknown. Lost: B, a new `type.notBuilt`: a requirement no one asked for.
  My call: the five rows are one task of stage 6, its first (the port's release carries them, and they move
  `content-type-snapshot.json`, whose retake is the PM's word there); eagle-dev gets the picks now, so its 7b
  takes the same shape, and its steps 1–6 (about 7 h) run on today's model meanwhile.

- Stage 4 task 7, wow-design-system: the Deblock guide is the design system's data, `design-system/guide.ts`
  (its voice and its foundations, two parts), each value it names a token, `{--x}` or `{--x:dark}`, written out
  with its value by `guideText`; `design-system/guide.md` is written by `writeGuide.ts`, a generator of the scope
  (its freshness the shared test's), with `## Contents`. The shadows' uses moved onto their tokens'
  `why` (elevation.ts), so the guide's radii and shadows lists are the tokens' own. Dropped as the export's process:
  Sources, Index, Caveats, Copied assets, Ready to iterate. The old file to `legacy/design-system/` (D24), on both
  sides; the copy's artifact publishes it from there as legacy/ is (one expected difference, 83).
  Two places the guide's words and the tokens differed, settled by the tokens (the code reads them; no one sees
  a change): small tags 8px (`--r-xs`, "badges, small tags"), where the guide said 12px; the guide's 150–250ms for
  state changes kept as written beside `--motion-in` 320ms, an entrance's, not the same move.

- Stage 4 task 8, the scripts' test home: `tests/scripts/`, run by `test:tools`. `isRetired`'s eight cases (a
  retired skill by its folder, its files, one it never held; a retired file; a kept skill, a kept file; a folder
  no skill names; a path outside `.claude/`) against legacy/ as it is. `closed()` and `treeOf` moved out of
  `takeDevMap.ts` into `scripts/mapTree.ts`, their cases eagle-dev named: a cut last sibling, a cut middle one, a
  cut after a folder with children. `move.ts`'s pure parts into `scripts/movePaths.ts` (imports written again,
  exact paths, a root's landing and barrel), six cases; its runner keeps the files and git.

- Stage 5 task 1, the browser tier's framework into `shared/e2e/` (Q1 A, Q2 A, Q3 B): copied by script from
  mailing-automation `e2e/framework` at 56a47d46, read only, then fitted to the way of working's rules (68 lint
  and 12 tsc errors to 0). Its face changes for the build side's port, each named here so its port rewrites by
  script: `resolveRuntime()` → `runtimeOf(testInfo.project.use.baseURL)`, the address's one home the product's
  `playwright.config.ts`, no env and no default (rule: production reads no `E2E_…`); `runCategorisedTests` takes
  `healthPath` and `reportingProject` (were `/api/health`, `chromium`), `options` gone; its hooks read
  `test.info()`, so no empty pattern needs a suppression; `theAppAnswers` a file of its own; `expectUrl(page,
  { url, timeout })`; `journeysKept({ categories, only, except })`; `journeysRunApart({ screensRoot, screen })`,
  its root the product's (was `process.cwd()/e2e`), read without a regex; `createCoverageRegistry` a closure, no
  class (erasable syntax only); `flowIdsOf` and `flowDataOf` without a type assertion (a type guard checks each
  key reads back as itself); `FLOW_PATHS` in `flowPaths.ts`; `dragging` split in three (`dragPointer`,
  `dragHold`, `dragging`), its calls past two values one object. Its README's framework half beside it, composed
  by script; the product half (identity, one mode, theTierIsReady, what is not here) stays the build side's.
  My call: the framework's face (the 12 files a product's flows import) is a knip entry wherever `shared/` is
  held (`knipConfig.ts · BROWSER_FACE`); `@playwright/test` 1.63.0 exact in the way of working and in the design
  side (types only, its lockfile entries by script): a repository typechecks `shared/` whole, so it names what
  `shared/` imports, a browser tier or none.

- Stage 5 task 2, the scope's browser tier: `browser: BrowserTier | { none: why }` (`shared/browserTypes.ts`), its
  paths named by the product (screensRoot, statusRoot, registry, templates, componentRoots, roles, exemptions),
  none fixed by the way of working; the way of working says none (it holds the framework, a product runs it),
  the design side none with the PM's reason (Q2 A). First gates as shared tests on it, each skipped under the
  `none` sentence, never passing silently: theBrowserTierIsPortable (inverted: shared/e2e imports node,
  Playwright and itself), aDragGoesThroughTheFramework, everyPathIsWalked, theStatusFileHolds; their logic in
  `shared/tests/browserGates.ts` beside the readers (`browserScreens.ts`, `statusFile.ts`, `codeText.ts`, the
  comments blanked by TypeScript's scanner, so a line keeps its number), proven red and green on a tree of one
  screen (`tests/browser/`, 9 cases). No zod here: a catalogue is checked by a type guard.

- Eagle-dev's third probe, 9 Nov (9ad168b, 7407976, c7fc4ad, 023332d, 5861192; Dom: a request from the design
  side is done at once): the drag code logs the same events as its own, line for line, in Chromium; test.info()
  reads each project's baseURL; the sync's four fixes hold on its data; 43 of 44 guide values match its tokens.
  F2 mended: a component root is any `components/{tier}/X/X.tsx` (its renderer's tree too), and a file named as
  its folder lands on that folder's barrel when the tree holds one (its providers), read after the move. N2
  mended: a `var()` inside a composite value is written out (`--shadow-solid` · 2px 2px 0 #000000). N1 kept: a
  leaf turned branch reads as the leaf gone and the branch come, each true. F1 asked back (QUESTION), withdrawn
  by eagle-dev: the emitted map holds folders alone, so a folder its files alone follow closes there (the 37
  redraws intended); `closed()` found a glyph fault in its hand-drawn map instead (`packages/domain/` drawn └
  beside `store-postgres/`), which its paths-only `theMapIsTheTree` never saw; fixed on its side.

- Stage 7, PM 9 Nov · A ("ok, tak zrobmy - daj eagle-dev co mu tam potrzeba", "wez je wszystkie od niego",
  "nie tylko do tego featura ale do tego co zrobilismy w ostatnim merge"): P1's rows on eagle-design main, alone,
  with every sheet-facing change of eagle-dev's merge 56a47d46. Release 4 (4a) out: 81a1804, tag
  release-2026-11-09-1: P1 rows 1-5, eagle-dev's five (kind left out on in-app in commands, events, groups; pools
  by slug; the seed's in-app kinds gone), the six copies (R6, patch f6b261a7…). My calls, no visible effect: a
  kindless channel holds `row`, no `kinds`; T23b's guard passes an in-app type's own set (its one row), the
  only valid reading once a channel has one row; the Delivery word stays the delivery kind's (no question:
  the sheet held it); the in-app kinds' samples to legacy/samples-retired.md (D24); moduleFields.ts' two
  adjacent comments one line each (our comment rule). 4b next: eagle-dev's patch 2 into components.spec.ts by
  script, D1-D13's screen facts, E03 edge 13's pick moved (Show more cut). eagle-dev's F3 (the drag gate walks
  e2e/framework) to the wow port: (b), its framework leaves for shared/e2e.

- Stage 7 order, PM 9 Nov · A ("A zatem"): 4.1 (eagle-dev's patch 2 into components.spec.ts, the list and group
  screens' lines, E03 edge 13, F4) and the one merge of main into restructure before wow resumes. Lost: B, wow
  first: two merges, and a patch against a spec that keeps moving.

- Release 4.1 (stage 7 tasks 3–4), 9 Nov: feb6056 + record 09c0ab9, tag release-2026-11-09-2; eagle-dev took it
  (its three-way check clean, `yarn sheet:take` green) and settled P1 Point 1 with Dom (B: the list as built). eagle-dev's spec at P1 (patch 2) merged three
  ways over a8304cf8 by script (`merge3.py`: rows by id, fields by key; one conflict, campaigns' notes, both
  edits kept), written into the parts by AST position (`writeParts.mjs`), the emit equal to the merge. My calls,
  no visible effect: badge and person-row back to `Badge` (55bde38's Board rename hit the spec, eagle-dev's F4);
  `P1 · 9 Nov` in ownedBy/changedIn becomes `T-E18-00` (spec-check takes ticket ids; P1 refined E18's feature);
  E03 edge 13 moves to a new d (P1's group page), the ListDocuments case keeps its `when` so its id holds, J9's
  step drops "no Show more"; screens library and group take P1's lines, views 1a/1b retaken (the PM's word on
  4.x's retakes). Todo, stage 6 or after: the wireframe drawings of 1a/1b still draw the list before P1 (cards,
  band, the group page's card) — redrawn from the lines, a visible change, shown to the PM with it.

- Stage 7 task 5, 9 Nov: main (releases 4, 4.1) merged into restructure, c4ed4d7, pushed. My calls, no visible
  effect: E10's destinations take a kindless channel whole (`takes: { appBanner: true, bottomSheet: true }`,
  typed by KindedChannelId and KindlessChannelId), destinationsOf's kind optional; the in-app rows' own `row`
  carries destination eagleCore; E10's notebook carries P1 in (the Export's kind and topic a kinded type's alone,
  open for the Export). Snapshots content type and wireframes retaken, each leaf checked three ways over b239529:
  main's change or restructure's, nothing else. The port rebased by a merge in a plain clone (new product +
  the port commit): one conflict, the EpicBadge line the port had reflowed, now Badge on the product; port.patch
  145 → 144 files, applied clean by rehearse.ts, links held.
  The rehearsal's lint caught my release-4 code: typeJourneys.ts' testOf nested a ternary (wow's
  sonarjs/no-nested-conditional, not the product's rule); the port splits it into addWordsOf, the words the same.
  verify: ALL SAME, 83 differences expected.

- Stage 5 task 3, half 1 of the registry gate: a flow reaches an element by its registry id alone. ESLint
  `no-restricted-syntax` on a browser tier's flows (`{screensRoot}/**/*.ts`, its registry aside), `FLOW_SHAPES`
  (`flowShapes.ts`: getByRole/Text/Label/Placeholder, a `locator` handed a string); the flows' list carries
  every file's and a test's shapes (one rule key a file), and their time moved. `restricted` and `testRules`
  left eslintConfig.ts (at 200 lines) for files of their own. The rule's row in tests.ts. My call, no visible
  effect: the shapes' name `FLOW_SHAPES`, as `E2E_…` is the production rule's test switch.

- Stage 5 task 3, everyRoleHasAFlow (mailing-automation's at 56a47d46, its roles then the directory's plus
  signed-out): each role the scope's tier names is taken by a flow of each screen (`userType`), or waived under
  "Roles no flow takes, and why"; a waiver of a role the tier lacks is red. `rolesMissingOf` beside `unwalkedOf`;
  the list of roles the product's scope computes (its directory and its visitor), never fixed here. Red and green
  on the one-screen fixture (an AP waiver added to its status).
  The copy's tier caught P1's `kinded` (release 4's types) unknown to the spelling: the port's scope.ts lists
  it among the sheet's words.

- Stage 5 task 3, testIdsComeFromTheRegistry (mailing-automation's at 56a47d46, its regexes on code text): read
  off TypeScript's tree instead (`shared/tests/testIds.ts`). A `data-testid` given a string or a template is
  spelled in place; one given an expression is the registry's when each name it starts from (both branches of a
  choice) is imported from `{registry}/`, or is `testId` its props declare, in the component or a file of the
  folder it owns (`componentRoots`); a registry export holding a conditional is one build's. Walked over the
  scope's production `.tsx` and the registry's files; skipped under `none`. Red and green on sources never put on
  disk (`tests/browser/testIds.test.ts`, 6 cases, the original's controls each one).

- Stage 5 task 3, every registry id rendered and read (the second half of mailing-automation's
  e2eReachesByTheRegistry, regexes on code text): read off TypeScript's tree (`shared/tests/registryLeaves.ts`),
  the convention named once in `shared/e2e/theRegistry.ts` (`{screen}TestIds`) and the framework's README. My
  call, tighter than the original, no visible effect: a leaf spelled covers itself alone; only a group spelled
  whole (passed, not an alias's own line) covers its leaves. The original added every prefix of a spelled path
  to the read set, so one id read covered its siblings, against its own control (`planted.a.b` read,
  `planted.a.c` unread). At the build side's port this may find ids the old gate let pass: told to eagle-dev.
  Red and green on sources never put on disk (5 cases).

- Stage 5 task 3, aHelperServesTwoTiers (mailing-automation's at 56a47d46: zod over its vitest config, `@/` by
  hand): the tests' own group in the scope, `helpers: { root, tiers, exemptions } | { none: why }`
  (`shared/testTiers.ts`), the tiers computed by the product's scope through `tiersOf(vitestConfig)` (type
  guards, no zod) plus its browser tier's root; an import resolved as the repository's tsconfig resolves it
  (`ts.resolveModuleName`), so an alias needs no rule of ours. The way of working and the design side say none
  (one tier each). The row stays the build side's (`dev/rules/tests.ts`, its paths); the shared gate holds it.
  Its control in the gate's file, always run. Task 3 closes: half 1 (flows by the registry), the roles, the test
  ids, the registry's leaves, the helpers; F3's gate fix lands with the build side's port.

- E19 (eagle-design, 9 Nov evening), my calls beside the PM's picks (the picks are in `roadmaps/E19/E19Notes.ts`):
  criterion 10 from the second pass over E10's notebook (point 4: one engine, the preview in the browser and the
  hand-over on the server), the renderer's own version (E10 3d) left to E10 · five reader clauses of the checklist
  written (grep, snapshot, verbatim, scans, wireframe), block-library's row naming the drawing's Stack as Section ·
  criterion 15 (subject as title, preheader padded) from FD4 and legacy's preheaderBlock · the code pointer names
  both legacies' files without extensions, which the pack would try to read as design files · undo: each is one
  criterion and its edge, or one row. Releases 5 (f803bdc) and 5.1 (12bde50, tag release-2026-11-09-4) and the
  send were the PM's word; start-T-E19-00 sent 9 Nov evening, no reconStop, the run consults by message.
- Proposed to eagle-dev, agent-facing: rule:feature-run-never-stops gains "consults eagle-design by message, never
  waits" for every feature run; settled in its recon, written on the sheet after.

- Port, 9 Nov evening: main moved under port.patch (E19, releases 5 and 5.1, yarn backup) and wow's push failed
  verify. Re-saved by script: partViews.ts keeps main's line (Stack gone), package.json is the patch on its old base
  plus main's backup script (JSON), atomsText.ts formatted by wow's prettier (C10's rows came wrapped for
  eagle-design's), the scope's PM words gain 'otestowane' (C15's quote, as typed). Verify green (1d50616). Lesson:
  any commit on eagle-design main can move the patch; verify before every wow push, and no eagle-design edit while
  wow's verify runs (it copies the product's tree).
- answers-T-E19-00 (eagle-dev's first questions, not waiting): E10's model rides the release (D6, one sha), model
  only; its three payloads agree with deliveryEvents.ts's prose; c3 was wrong on the sheet (a Stack is 400
  malformed once it leaves BlockType) and is corrected on main (2e2860f), its release the PM's word.

- Night, 9 Nov · release 5.3.1 sent (b6caffd, tag release-2026-11-09-7); eagle-dev took it, digests matched. c9:
  Batch's composer token is its drag-and-drop composer's alone, an HTML email takes an anchor marked
  data-msys-unsubscribe; RT3b already says the syntax is copied from the tool's documentation, so agreed, a note line
  (e76c08e). c17 (eagle-dev's Q3): the repository holds no S3; the PM's "repo's bucket" is legacy/config/cdn.json's
  (deblock-blog, crm/, cdn1.deblock.com, aws login): b, an S3 store behind the asset port, the target later by its
  address alone; a (Postgres, route opened) lost, it leaves the target a new adapter. Note line in E19Notes.
- Night · wow's push refused by verify, one unexplained: dist features.js. Cause: release 5.3 changed
  rule:feature-run-never-stops in eagle-design's deliveryRules.ts, a wow file, and wow kept the old line. Ported by
  script (the line by its id). A sweep of every wow file eagle-design changed since 6 Nov found one more:
  journeysPart.ts's FEATURED gained E19 on main (3b797dd), ported the same way. Verify missed it: part g prints a
  summary line only. Lesson: until the port lands, a product edit to a wow file reaches wow by hand; after it, the
  take refuses such an edit.
- Finding, wow (D28): journeysPart.ts holds the product's epics, EPICS (E00-E10, E18), FEATURED, 'E18' for the
  case ids and an 'E14' exemption. Measured: E14 and E19 have journeys and are not in EPICS, so part g never checks
  their dangling cases. Fix at the port's cut: the epics read from the backlog, FEATURED from the tickets
  (T-EXX-00), the exemption a field of the journey rows (E14's are Claude Code flows, no browser test).
- Stage 6 task 1, consulted with eagle-dev (B decided by the PM): A · wow is a git dependency pinned to a tag
  (yarn.lock holds the sha; wow's package.json gains a version, yarn 1 refuses one without), a postinstall take
  copies the homes the product names (package.json wow.takes) to its paths, records them in .git/info/wow-taken
  and excludes them in .git/info/exclude; nothing of wow enters a product's history. Measured: node strips no type
  under node_modules, so the take runs from a copy of its folder (no jiti: no second loader, eagle-dev). eagle-dev
  takes dev/ and shared/; its condition: the take is idempotent and refuses, never overwrites, a file edited since
  the take (the install stops with the path); its tree.ts reads the record into NOT_OURS at its port.

- Night · snapshot-T-E19-00 read and approved. The sheet caught up: ?version=vN (VersionTag), an older version
  keeps the document's own facts (seat among them) and no languages, the api convention's 404 names version
  (product and wow's endpointShape.ts alike), the e2e criterion names J1 to J6.
- Night · C17 taken out by the PM in eagle-dev's chat ("na razie pomińmy ten bucket", "ogarniemy to w innym
  epicu", "na razie wszystko robimy u nas w edytorze"): c17 goes, the picker's criterion 18 becomes 17, R7 open
  again; eagle-dev reverted its c17 work (route behind the session, cache private). Main moved, pack re-cut, the
  release held for the PM.

- Night · stage 6 task 1 built in wow: shared/take/ (takeHomes: the homes' map, now repos.ts's too, one map;
  takePlan: write, keep, remove or refuse from the tag's, the record's and the disk's digests; takeRecord:
  .git/info/wow-taken and the exclude block; takeWow: the run, --check, --from). A test, 8 cases, red on a take that
  overwrites an edited file (mutation tried). wow's package.json gains version 0.1.0 (yarn 1 needs one); knip
  takes takeWow as an entry wherever shared/ is held. The copy's cspell: 'msys' (Batch's attribute) to the sheet's
  domain words, 'epicu' to the PM's own. Next: eagle-design's side (package.json's wow.takes, the dependency at a
  tag, postinstall), on a branch off main, with the tag cut when task 2 lands.

- Night · the port's worktree took v0.1.0 (512 files written, git blind to them, --check green) and showed the
  take wrote its record and exclude block in eagle-design's common .git/info: in a linked worktree git names the
  common folder for info/. Fixed: the record per worktree (--git-dir), a named block per worktree in the one
  exclude file; a test with two worktrees. The v0.1.0 block and record in eagle-design's .git moved out by hand
  (the record kept in the scratchpad to migrate the port's worktree).
- Night · mistake: v0.1.1 points at 42cec82, v0.1.0's commit. The fix's commit failed its pre-commit and the chain
  went on to tag, because a pipe (| grep | tail) hid the commit's exit. Not deleted (nothing is), never used: the
  fix is v0.1.2, and wow's package.json version now moves with the tag (0.1.2). Lesson: a commit is never piped
  in a chain that tags or pushes after it.

- Night · stage 6 task 2 on eagle-design's branch port/wow (a worktree, ../eagle-design-port, off main 8e031ff):
  the 371 files of the WOW set leave its git, port.patch applies, package.json takes wow at a tag (wow.takes: design,
  dev, shared, design-system; postinstall yarn -s wow). Its tree matched the rehearsal copy byte for byte but
  package.json, yarn.lock and husky's own folder. Two things the copy could not show, its node_modules being wow's:
  the product lacked @ls-lint/ls-lint (lint:files), and knip reads .git/info/exclude, so it saw none of the taken
  files and called ten product checks unused. Fixed: ls-lint listed, knip --no-gitignore, knip ignores the wow
  package and ls-lint (both run by path): wow 0.1.3, 0.1.4. On v0.1.4 the branch's feature tier is green, checks
  ALL GREEN (diff), build, spec-check and the gate 0, ds-scan 1 as on main. guard-map.json left as main has it:
  its retake is task 5, the PM's word. The wiring is in port.patch (package.json, yarn.lock), so the branch is
  main less the WOW set plus the patch, rebuilt the same way whenever main moves.

- Night · stage 6 task 3 built in wow, as agreed with eagle-dev: the build side runs two modules, measure and
  spec-check (buildReads.modules cut to them). The build writes each file their imports reach that a take wrote
  under vendor/wow/ at its own path (tools/build/vendored.ts, its generator tools/vendorInto.ts), so one commit
  holds every read; the release record names a read file not vendored as taken; the build side looks a path up
  and falls back to vendor/wow/<path>. The design system stays out: neither module reads it. app/styles/tokens.ts
  gains faces (design-system/fonts.ts), so a reader of the theme needs no stylesheet for its fonts. takeRecord
  reads git's folders off the files (gitdir, commondir), no child git: a generator runs under node --permission.
  The fresh-emit test counts files only (a ** glob names folders too). On the copy: 27 of the 526 files the two
  modules read are taken.
- Night · mistake: v0.1.5 (ee372db) is a local tag on a commit whose push verify refused, never pushed, not
  moved, never used: the fix is v0.1.6. The copy's yarn test failed: the generator listed the sources by git
  ls-files, a child process node --permission forbids; its yarn lint failed on a comment naming a date; and wow's
  knip called an export only design/ used unused. Fixed: the sources under the homes are read off the disk, the
  taken files with the product's (git ls-files would miss them on the branch, where they are untracked), the read
  set the same, 67 modules and 526 files. Lesson: before a wow tag, the copy runs yarn lint and yarn test whole,
  not its commit tier alone.
- Night · v0.1.6 taken on the branch: its feature tier refused 'unvendored', a word of recordText.ts; the copy's
  commit tier reads the words of changed files only. Renamed staleCopies: v0.1.7. The lesson, whole: before a wow
  tag the copy runs its feature tier.
- Night · the branch port/wow at a95cc34 (pushed) takes v0.1.7: vendor/wow/ 27 files tracked, tokens.ts with
  faces, buildReads.modules the two. Its tree is the copy's but package.json, yarn.lock, husky's folder,
  guard-map.json (main's, task 5) and vendor/, which its build writes from the take's record (the copy links and
  never takes, so it has none). Feature tier green, checks ALL GREEN (diff), wow --check 514 files the tag's.
  port.patch pins v0.1.7. eagle-dev told; asked whether any read of its own reaches a taken file outside the 27.
- Night · eagle-dev answered: outside the two modules it opens docs/process/ticket-pipeline.md by path, the
  product's own emit (tracked; its sources are taken): the set stays 27. Its ds-scan and tokens.css reads leave at
  its port, as settled.
- Night · wow's pushes of 796fccc: verify took 66, 38 and 35 min under the machine's night load (system indexing,
  load 8 to 21) and git's SSH connection dropped while the pre-push hook ran, three times. Pushed over HTTPS (git
  connects after the hook there), verify whole, 208 s once the load fell.
- Night · stage 6 task 4 on the rehearsal (PM 9 Nov · A, unify the repository in the port's release; legacy pages'
  script paths · A): scripts/moveProduct.ts moves files at a product's paths, its own in the copy and a linked one
  here too, and every reader follows: relative imports, exact paths, a bundle's name (`gate-rules.js`), its parts'
  folder, a regex's escaped name, a legacy page's script src alone. Records, notes, closed notebooks and snapshots
  stay as they were. 38 rows (the 36 kebab entries, block-model's module and JSON): 256 files moved, 64 of them
  wow's, 375 rewritten in the copy, 26 legacy pages' scripts. The whole map, old → new at the product's paths,
  is ports/eagle-design/moves.tsv: it rides the port's release for the build side.
- Night · what the rename asked beyond the mover, my calls: an entry is camelCase in the scope and the rules (the
  "until a release renames it" exception gone); a types file is `*Types.ts` but an entry, whatever its noun
  (`contentTypes.ts` holds the types' tree); the lint's glob lists read a `!` glob as the scope's do (minimatch
  alone read `!x` as every other path: a latent fault, none hit yet), one implementation; the closed notebooks'
  paths are history (namedPaths.docs); a record before the rename names blockModel.json as it was then. The
  mover's first pass rewrote wow's own legacy/ and a rule test's example path: restored, and the mover reads
  wow's own files by exact path only.
- Night · held for the PM: checks part c (Content type logic, 8 keys moved) is the content-type snapshot naming
  files by their old names in the requirements' notes: following them is its retake, task 5, your word.
- 10 Nov · PM · A: the sheet's own pages stay (Board, Feature: React already, their .html a shell the build writes);
  the drawings of the product go. plan-Measure.html is a page of HTML, so it leaves with legacy/ (a React page of it
  would be new work, not asked).
- 10 Nov · the rename's checks, mine: a parts' folder named by itself (`content-types/destinations.ts`) was missed;
  the mover now follows it, and a folder's name leads a path in movePaths.mentioned. The content-type snapshot's 8
  moved keys: 7 are the names alone once followed, `files` the same once its lists are sorted (the new names sort
  otherwise): its retake is the names and their order. My night's line "84 dist differences, the rename alone,
  byte for byte" said too much: 40 files were compared byte for byte; the renamed bundles also carry the port's
  earlier changes, which their old names' rows already explained.
- 10 Nov · eagle-dev, on the port now: block-model read as the module (`blockModel`, plain node loads it, deep-equal
  to the JSON); components.spec.json and modes.json are read by nothing there; its two CSS reads (tokens.css, the
  export's colors_and_type.css) swap for app/styles/tokens.ts once it holds what they gave: it holds the 264
  properties and the 10 faces, and gains `elements` (the element and class styles) and `reducedMotion` (my call: the
  design system's own TS, as faces were); guards/ds-scan.ts retires (it scanned the drawings against those two).
- 10 Nov · stage 6 task 8: 21 files to legacy/, 15 the product's (poc/, checks part d with its legacy world, page
  shims and its list snapshot) and 6 of wow to wow's legacy/design/ (the Wireframes page, its view and test); the
  build publishes legacy/ no more (its .dc.html drawings, the export's stylesheets, tokens.css, plan-Measure.html).
- 10 Nov · eagle-dev: nothing there reads agentFlow.ts `later` or `neverRest` (not in its sheetReads, E14's CONSENT
  reads the rows off commands.ts). Both stop being exports; `later` stays inside the agent check. `neverRest` was
  read by the consent drawing alone: its sentence ("Everything else a person decides") goes to E14's notebook,
  Carried in, the words of that row E14's to write (ask-only-visible-effect: nothing built shows it).
- 10 Nov · the ratchet's 5 "file without a sentence" were the drawings a requirement's `replaces` names
  (ManageApprovals, ApproveOnBehalf, ContextBar, ApprovalsPill, ApprovalBarRoles): gone from the build, read as
  empty. aboutCheck reads a JSON only now; the guard's other page branches (codeScan, fileUses, pageWords,
  sourceLayers, textKinds) retire with the JSON pass, the next task.
- 10 Nov · stage 6 task 7 (PM: "pozbądźmy się jsonow - wszystko ts"), what stays JSON: package.json, the tsconfigs,
  .claude/settings.json and eslint-suppressions.json, each read by a tool that takes JSON alone.
- 10 Nov · eagle-dev, on task 7: it reads public/assets/manifest.json (assetsMatchTheManifest, a copy by hand); no
  snapshot, no other JSON; it runs neither measure.ts nor specCheck.ts (an older JS copy, its sync off, N40), and
  keeps both on its reads as buildReads.modules names them. The manifest is public/assets/manifest.ts, export
  `manifest`, the same `{ note, takenAt, files }` (told it so); the JSON to legacy/.
- 10 Nov · prettier's options are prettier.config.ts, read off the scope as eslint.config.ts is (prettier 3.9 loads
  a TS config); writeFormatterFiles writes .prettierignore alone; .prettierrc.json to legacy/, in wow and the product.
- 10 Nov · a check's snapshot is a module: guards/__snapshots__/<name>.ts, one export, `unknown`, printed by
  design/guards/checks/snapshotModule.ts under the repository's `// GENERATED by` head (the scans leave a file a
  tool writes aside, as tokens.ts), each deep-equal to its JSON, the JSON to legacy/; a part imports its snapshot;
  scope.ignores holds them (data as taken: no lint, words or knip). sentences-snapshot-19-oct is sentencesSnapshot
  (a name holds no date); say-snapshot was read by nothing, to legacy/ alone.
- 10 Nov · the guard map carries no time now: it moves only when the map does, so the port saves it as any file
  (portSave's and digests' exceptions for it gone). Its retake rides that: the PM's B on task 5.

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

- Stage 5 task 3, first gate: `wow/time-is-moved-not-waited` (c9cd155, its row 471183e): the wait shapes left
  TEST_SHAPES for a rule of their own; `scope.namedWaits` ({file, name, why}) passes a wait whose declaration
  stays in its file unexported; on tests and shared/e2e/. The first push of a669077..678b845 failed verify on my
  own unfinished files in the tree (a rewrite of testShapes.ts mid-run): the pushed commits were green; never edit
  the tree while a pre-push verify runs. Pushed 5861192..471183e, verify green; probe asked, none probed yet.
- Eagle-dev QUESTION, 9 Nov (Dom wants P1 end to end now, relayed): when 7a's rows reach it, a P1 release alone,
  KINDS_OF or a field. Answered: not written (stage 6 task 1), a P1 release alone is the PM's word (asked), and the
  kindedness read off channels.ts's rows; my call for the row form at 7a: a kindless channel has no `kinds` field
  (absent, never `{}`), presence the one fact, Channel a union as ContentType is (no visible effect, not the PM's).
  7a touches 15 files; one, catalogRail.ts, is in the port's patch: rows on main now cost rehearse.ts a `--3way`.

- Stage 7 closed: release 4.1 (feb6056, record 09c0ab9, tag release-2026-11-09-2) taken by eagle-dev. Its library
  line was wrong for In-app ("none on a type with no kind"): fixed on main as the nav cards (6caf5cc, views 1a/1b
  retaken, the PM's word on 4.1's retake), not released, rides the next release; merged into restructure (5582ad5,
  the snapshot moved 1a/1b only), the port rebased (1ec3346) and rehearsed clean on it.
- Eagle-dev's C10, answered from the sheet: QueryParamOf yes, no spec impact · navPlaceOf throws, yes · NavCard is
  already a union on the sheet, it takes it · `place: 'list' | 'ownPage'`, its words, in its next spec patch · the
  word is "nav card". Its patch (folder-row, folder-list, choice-card-group's note) comes with a sha256 and rides
  the next release on the PM's word.
- Stage 5 task 4 · B (eagle-dev's answer): the e2e skills are written from TS data, `shared/skills/e2e/` the shared
  half, the scope's browser tier the names (never repeated in the data), `skill` the product's half: its folder,
  its rules numbered on after the shared twelve, a line after a shared step (`{page}.{step}`) or closing an input
  (`{page}.input`, my call: the build side's roster line belongs in Input, not after a step). A token nothing gives,
  a rule key twice or a line at no step throws. Its condition: mailing-automation's `.claude/skills/e2e` stays hand
  edited until its port; the dev half's data, `dev/claude/skills/e2e/e2eSkillPart.ts`, imports nothing (my call:
  `dev/claude/` sits one folder deeper here than `.claude/` there, so an import would break on one side; the
  scope that reads it checks its shape). The writer is a generator (`--out`, as the formatter's): once a product
  names it in `scope.generators` with its three files, `aGeneratedFileIsAFreshEmit` holds them.
  My calls on the way: a token cites a skill's rule or step as `{{ruleNumber:key}}` / `{{stepNumber:key}}`, never
  `{{rule:key}}`, since `rule:{key}` is the citation of a rules row (`aCitedRowExists` read it as one); the writer is
  an entry of every scope's knip beside the browser tier's face; the port's scope holds `dev/claude/**` as a product
  tree (the build side's `.claude/`, checked in its product), `dev/rules` and `dev/map` staying its own emits.

- Morning, 10 Nov: R6 (three spec changes the PM made in the repo's copies, parked to 9 Nov) is still open: the app
  banner's bannerConfig, the bottom sheet's verticalSpacing gone (Box read as Layout landed with E19 C1). Releases
  5 and 5.1 left it out; eagle-dev's digest gate stays red on it until a release carries it.
- Morning, 10 Nov · stage 6 task 1 (the plan's README, "decided at the port with the PM"): how wow's files stand
  in eagle-design's git. A · committed links to a sibling checkout (visible in git; wow's version unpinned; a clone
  needs wow beside it) · B · written by a script from a pinned wow tag (`yarn wow`, postinstall) and ignored (the
  product's sha names wow's version; nothing of wow in its history). My pick B: it is the PM's 8 Nov A ("take wow
  by version, a tag"). Task 2 (the patch on main) waits on it; tasks 3 and 4 go on in the rehearsal.
- Morning · release 5.2: c3 corrected (2e2860f); eagle-dev builds to the corrected text already.
- Morning, visible: from E19's merge the chips read READY TO PUBLISH and PUBLISHED (E10's model rides release 5.1,
  D6), before Publish exists. The merge is the PM's word anyway; said here so it is no surprise.
- Morning · stage 6 task 4, measured 9 Nov evening on the rehearsal: of the 71 entries, 36 carry a kebab name, all
  product files, with 29 part folders beside them and `fixtures/data/block-model.json`; 333 live files name them
  (the mover rewrites those), 20 records and frozen notes keep the old names (history). 34 legacy pages
  (`legacy/*.dc.html`) load their bundles by the old name (`gate-rules.js`) and part r runs them. A · the mover
  rewrites the legacy pages' script paths too (a live pointer; their drawings untouched) · B · the build also writes
  each renamed bundle under its old name for the legacy pages alone (legacy byte-frozen; two names per bundle in
  dist). My pick A: one name per bundle (SSoT); a page's script path is a pointer, not its history.
- So the port waits on three morning words: links (task 1), legacy pages (task 4), and then the port's release with
  its snapshots (tasks 5, 6). Task 3 (`vendor/wow/`) is built once task 1 is answered: under B the links are not
  tracked, and the record's sources (`git ls-files`) must count them.
- **PM, 9 Nov night, the list answered:** 1 · release 5.2 now (A, done: 0a5b672, tag release-2026-11-09-5) ·
  2 · the email preview's version picker reads any version: E19 adds GetDocument ?version=N (A) · 3 · an asset
  public under its unguessable key in E19's run, the repo's S3 bucket for tests, the target bucket later by its
  address in the environment (A) · 4 · wow's files in eagle-design written by a script from a pinned wow tag and
  ignored by its git (B) · 5 · the rename rewrites the 34 legacy pages' script paths (A) · 6 · R6 already on the
  sheet since release 4: closed, no decision · 7 · release 5.3 mine once every check passes (A).
- **Morning, 10 Nov · the bucket's epic:** C17 is out of E19 by your word; R7 (public asset files, U3) is open
  for "another epic". Proposed: E10, where Publish hands an email's HTML to Batch and Postmark and its images must
  load in a reader's client. A · E10 · B · an epic of its own.
  Visible until then (no question): an HTML exported from E19 names each image by a url under the app's origin,
  behind its sign-in (R7), so pasted into a reader's Gmail or Outlook its images do not load; the wordmark loads
  only if the build side hands the client an image it reads (C14 left that to it: Gmail reads no SVG).
- **PM, 10 Nov morning · B:** "Teraz w trakcie i pozbądźmy się jsonow - wszystko ts , każdy HTML i CSS leci do
  legacy - jak coś to sobie je stamtąd podejrzymy bo za widok teraz odpowiada dev". The port's release goes now,
  during E19, with its two retakes (guard-map, content-type). Stage 6 gains two tasks: 7 · no JSON of data, all
  TypeScript (the emitted fixtures/data/*.json, the checks' snapshots, the assets' manifest; a file a tool reads only
  as JSON stays: package.json, tsconfig, .claude/settings.json, eslint-suppressions.json) · 8 · every HTML and CSS
  to legacy/, neither built, published nor checked (the 49 .dc.html drawings, the design system's export and its
  stylesheets, tokens.css, poc/). Asked: whether the design side's own pages (Board, Feature, plan-Measure) go too.
- **Morning, 10 Nov · the port's snapshots (task 5), for your word with the port's release:** the rename (task 4) is
  built on the rehearsal and in wow, untagged. Its one red is checks part c: the content-type snapshot's
  requirements' notes name files by their old names (`content-types.ts` → `contentTypes.ts`, 8 keys). Task 5 so
  retakes two snapshots, guard-map and content-type; nothing else waits.
- **Morning, 10 Nov · release 5.3.2:** main holds the snapshot's catch-up and C17's withdrawal, pack re-cut, checks
  green; eagle-dev builds to it already. Release it? A · now · B · with E19's report.
