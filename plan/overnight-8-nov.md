# Overnight, 8 Nov: the way of working's run to the end, with eagle-dev

The PM, 8 Nov evening: "lec autonomicznie z eagle dev calosc, rob notatki … leccie do konca zapisuj decyzje i
pytania, rano odpowiem na wszystko, dzialajcie wspolnie i wypracujcie najlepsze rozwiazania, po kazdej czesci
przypominaj sobie nasze zasady, SRP SSoT i wszystkie zasady projektowe ktore wypracowalismy".

## The rules, re-read after each part

- One source of truth: one home per fact, rule, word and sentence; a second copy is the point to fix first.
- One responsibility: one question per function, one kind of fact per file; a file states its job in 1–3 bullets.
- The long term wins over the work of today; code already built is no reason; every option valid.
- Product-agnostic: the way of working names no product; a product's facts live in its `scope.ts`.
- Nothing by hand: every move, rename and regeneration by script; generated files never edited.
- eagle-design untouched (its changes live in `ports/eagle-design/port.patch`); mailing-automation read-only.
- docs/rules in full: header bullets ≤80 characters, a `//` comment one line and an invariant, past two
  parameters one object, names that say their purpose, no placeholder names, sizes (200 lines, 40 a function).
- Correct over fast: verify whole and fresh every part; a red proof for every new check.
- Every part: consult eagle-dev, its cross-check of the diff and its probe of the design copy before the commit.
- From code, not copies: a package gives what it holds; nothing hand-copied.
- After the commit: the progress bar; notes in `plan/eagle-notes.md` and `plan/dev-notes.md`.
- Dependency inversion: the way of working depends on the `RepoScope` contract, never on a product.
- Ratchet: known fails only shrink, one mechanism a kind (ESLint suppressions, a test's baseline).
- Explicit over implicit: a baseline starts by its own act, a generator names what it writes, a renderer is
  named; nothing happens by default.
- Least privilege: a generator writes its own folder alone (`--permission`); eagle-dev reads only.
- One-way dependencies: the tiers, a renderer never back into its app, layers read downward.
- The way of working keeps the rules it defines (PM, 8 Nov): its own code takes no switch, suppression or
  exemption from them.

## Heartbeat

A session cron every 10 minutes (job `1577e92f`, PM 8 Nov): a stuck verify or test is killed and re-run, eagle-dev's
messages read, the next part resumed. When the run is done: `CronDelete 1577e92f` (the PM's word), then a last line here.

## Calls (what · why · how to undo)

- eagle-dev's limits for the night (its message, 8 Nov): read-only in design-ways-of-work, the copy and
  mailing-automation; a choice that sets its scope or changes its code (suppress, rename, move, drop at its
  port) is Dom's: its recommendation with numbers goes to the morning list, never decided by the two sessions.
- 7a: `TESTS` holds `${SHARED_TESTS}/**` (its delta probe's suggestion): a helper beside a shared test is test
  code. Undo: drop the line in `shared/repoScope.ts`.

- 7c before 7b: the shared tests carry a baseline, so one baseline format comes first. Undo: the parts' order
  in `plan/progress.md`.
- 7c, the PM's answer (8 Nov): an emptied baseline is removed, never kept as `[]`; `BASELINES=write` prints
  the removal, and the commit that carries it says so (git is the record; rules carry no history).
- 7c, settled with eagle-dev under the PM's "jeżeli wg zasad tak jest lepiej to lećmy": removal alone let a
  cleaned scan refill on the next write, and `[]` kept it only where a file existed. So `BASELINES=write` never
  creates a baseline, only shrinks or removes one; a baseline starts by `BASELINES=start:{scan}`, refused
  when its file exists. "Clean" has one spelling, no file. Undo: the shared helper's start branch.

- 6f, the PM's catch (8 Nov): the way of working's organisms broke the component shape, 48 parts not named for
  their organism, because 6d set `componentShape: false` for the design side (my call, wrong: one way of
  working for both sides). Fix after 7c: renames by script, the switch removed. Undo: the rename map reversed.

- 6g, the PM's audit (8 Nov), nothing changed yet: (1) 48 organism parts unnamed, `componentShape: false` for
  the design side; (2) 2 breaches of the way of working's own organisms held in ESLint's suppressions (a
  height); (3) the design side's ls-lint gets `folders: {}`, so its own folders hold no layout rule; (4)
  `dev/claude`, 75 files no check reads in the way of working. Todos 6f and 6g in `plan/progress.md`.

- 6f, the plain prefix (eagle-dev's consult): a part's name is `{Component}{its stem}`, never collapsed, so
  `BoardPageBoardColumn` and `FeaturePageFeatureHead` stand; a collapse clashed (`ColumnsPanelColumns` →
  `ColumnsPanel`) and cut words. Undo: rename.ts with a map of shorter names, a person's choice each.
- 6f, a part's name moves from ls-lint to ESLint: one TypeScript function (`carriesItsName`,
  `shared/lint/partNames.ts`) that the product's lint and the way of working's script both read, where an
  ls-lint regex beside a script's copy was two homes and a shared export the product never reads (knip).
  ls-lint keeps the folders. Undo: `named(n)` back in `componentFolders.ts`.
- 6f, the two height suppressions (6g's first item) went now: the moves orphaned them. The day bars and the
  screen frame take `aspectRatio` (5 / 1, 16 / 9) for a height. Undo: a theme size, if the PM wants one.
- 6f, `port-save` leaves out a path the last rehearsal linked: after `move.ts` it saved the old names' edits
  as product edits and the patch failed. Red proof: with the line 0 such files, without it 3.

- 6f, eagle-dev's cross-check: the shared drawer-word row asked a purpose in `constants/` too, which fails
  88 files of the build side (`{component}Constants`, `{component}Words`, its row 12) and none here. The
  row asks a purpose in `utils/` alone, true on both sides; more is the PM's. Its build exceptions read
  "—" (its list is empty). `componentOf` reads the scope's roots, never a tier folder anywhere. Undo:
  `PURPOSED` in `shared/lint/partNames.ts`.

- 6g, the repository's own folders (tools, tests, .claude, .husky, design-system, notes) are named in
  `tools/layout/folderRules.ts`, not added to the layout's homes: a home's files are what the scans and the
  build read, and these hold none of them. Free below: a home that bundles nothing, an own folder, a module's
  folder. Undo: `folders: {}` in `tools/lint-files.ts`.
- 6g, "a way of working's file holds no suppression" is a script of its own (`keeps-its-rules.ts`, run by
  check:chunk), never part of verify: verify compares the product, this asks another question.

- 7b, a lesson: `git stash` in this repository rewrites the files it touches, so 11 links to the copy broke;
  port-save, then rehearse, mended them (`rehearse --check` clean). Never stash here.

- 7b, 23:11: the verify past 30 minutes (usually 3) was slow, not stuck: its steps kept starting and ending,
  the machine at load 7 with the antivirus scanning (XprotectService, Bitdefender). Left to run; the
  heartbeat's 30 minutes means a step that stops moving.

- 7b part 2, eagle-dev's H4' (5 headers over 80 in test code, `tests/lint/*`, a shared test): the shared
  row says "a production file", tests its design exception, so they break no rule; wrapped in part 2b for
  one tree, and whether the header rule reaches test code is on the morning list (both sides' scope).

- 7b part 2b, a product's tree (design/, dev/, shared/rules/) held in the way of working: skipped by its
  lint and exports as before, read by a glob that starts inside it (`RepoScope.productTrees`). A broad glob
  never walks in, so a check over `**/*.md` here never reads a product's facts (eagle-dev's hole). Undo:
  the three back in `ignores`, wow's sentences without design/, dev/, shared/rules/.
- 7b part 2b, the shared reasons' gate is a throw in `ruleFileFor`, run by every build: held where it can
  fail, its only check (eagle-dev: acceptable so). Undo: the function's first two lines.

- 7b part 3, what runs is read off every file ESLint lints, not one per kind (eagle-dev: its planted path
  missed a rule on for `packages/domain` alone; the union is 2532 files, 363 ms on its tree). Undo: a
  sample per glob.

- 7b part 4, 02:11: the verify past 30 minutes again, one step 17 minutes, then the next started: slow (load
  5.5), not stuck, left to run, as at 23:11.

## Morning: for the PM

- The five patterns beside SSoT and SRP (dependency inversion, ratchet, explicit over implicit, least privilege,
  one-way dependencies) ran as the night's checklist (PM, 8 Nov · A): rows in `shared/rules`, with gates, or not?

- 6g, the build side's own holes (its count, read-only, HEAD 2f0aab95; its scope, so Dom's): 0 entries in its
  ESLint suppressions; 10 inline `eslint-disable` (app 6, packages 3, `e2e/framework/runCategorisedTests.ts:120`
  `no-empty-pattern` for Playwright's fixtures); 364 of its 856 folders hold no file-name rule (196
  `__tests__`/`__fixtures__` inside app/ and packages/; 168 outside: roadmaps 59, knowledge 37, .claude 30, e2e
  20, tests 11, scripts 3, db 3, public 2, docs 2, .husky 1); no gate reads a file name's case. Its
  recommendation: scripts/, tests/ and e2e/ first (34 folders), then .claude/ and docs/, roadmaps/ and
  knowledge/ last. Question: which of them its ls-lint holds at its port, and in that order?
- 6f, the long part names (`BoardPagePageHead`, `FeaturePageFeatureSteps`): keep them, or name each by hand
  through rename.ts? And the two aspect ratios: a look to check on the page.
- 6f, a purpose in a `constants/` file's name too (`approvalBarLabelWords`, not `approvalBarWords`)? Today
  only in `utils/`; yes renames 88 build-side files by script, the build side recommends no.
- 6g, the shared checks row says "a file's name or path by ls-lint", while a name's pattern is ESLint's
  (`file-names-its-purpose`: a scope's `names`, a drawer, now a part's name, one file deciding each). Reword
  the row (A: a folder and a path by ls-lint, a file's name by ESLint), or move the names to ls-lint (B)?
- 6g, a file's case outside the homes that bundle is held by nothing (tools/, tests/, app/pages, docs/rules,
  dev/: measured, mixed kebab, lower and camel), and assets keep their source's names (`ic_de_color_flag.svg`).
  A rule for them is a new convention: the PM's.
- 6g, `// prettier-ignore` (eagle-dev's count: 93 in 90 of the way of working's files, the tokens' and the rule
  tables' aligned rows) is an exemption from a rule it keeps, the format. A: a shape the formatter keeps, no
  comment; B: one override in the prettier config, its one home; C: `keeps-its-rules` names ESLint and
  TypeScript alone, and says so. 0 of istanbul, c8, v8, Stryker or knip tags.
- 7b, this side's `onDemand` names `docs/rules/*.md` alone; its CLAUDE.md and skills also send a reader to
  `docs/process/ticket-pipeline.md` (1035 lines, no Contents) and `sheet/contract/api-convention.md` (137),
  both generated and released. A: list them, a 2-entry list started; B: their generator opens them with
  Contents (a release's change); C: leave them out, as today.
- 7b, the build side's "ticket skills keep their pipeline's 100 lines" is held by nothing since D8: drop it,
  or a test of its own (its scope: Dom's).
- 7b, the build side's own one-home row "A sentence the domain holds is read from the domain" keeps the why
  "Two copies of a sentence are two places for it to differ.", a near-copy of the shared row's: a why of its
  own (what the domain adds: one glossary the screens and the tests read), or none (its text: Dom's).
- 7b, the header rule reaches production files alone (the shared responsibility row; tests the design
  side's exception, so the build side's too at its port). Reach test code too (A: one rule, every file), or
  keep tests out (B: as written)? A widens both sides' gate: Dom's for the build side.
- 7b, the rule files' near-copies the sentence test cannot see (the one-home and tests intros, the comments',
  constants' and styling openings): A, a shared opening each side extends (rewords both sides' text); B,
  exact copies alone, as tonight. Eagle-dev's view: B tonight, A a wording call, Dom's for its side.
- 7b, a rule file is held at 200 lines, while a row can hold many words (the build side's tests.md: 1232
  words in 68 lines), and if `docs/rules` joins the agent's on-demand reading, the skills' "past 100 lines,
  Contents" reads the same files: one file, two size rules. Words, as the skills (D8)? Eagle-dev: not tonight.
- 7b part 4 (eagle-dev's measure of its docs, its scope so Dom's): its README.md names 3 paths gone
  (`app/components/organisms/UserProfile/`, `app/config/authConfig.ts`, `app/dashboard/page.tsx`): mend it, or
  leave it out of the docs read? `knowledge/**` (89 source articles, 0 missing): in or out? Its pipeline md,
  generated from our `ticket-pipeline.md`, name 1 path gone (`packages/domain/commands/createDocument.ts`,
  `_shared.md` line 100): read them in its docs (eagle-dev: yes, nobody else can check them) with that one
  listed until our source changes, which moves the digest its fixture pins (a re-pin: Dom's).
- For our sheet later (eagle-dev's find): `app/styles/components.spec.json` names 8 wrappers the build side's
  tree no longer holds (AgentToggle, NamePopover, PersonRow, RoleRow, SidebarRow, TodoPill; DocumentPage,
  ScreenHeader): the spec to mend on our side, eagle-design untouched tonight.
