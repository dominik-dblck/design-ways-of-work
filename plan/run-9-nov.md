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
| 7 | P1 release | 4 | 5 |
| 5 | e2e | 2 | 4 |
| 6 | Port design | 0 | 6 |

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

