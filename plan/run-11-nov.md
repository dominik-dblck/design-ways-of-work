# Run WoW · 11 Nov · a clean way of working for the design side

The PM, 11 Nov: "ok, rob robote iteracyjnie po kazdym chunku wypisuj progress w hooku" and "teraz cel zrobienie
WoW zeby wyspawnowac nowy projekt designu juz na czysto tak zeby eagle design i argus design mieli to samo zrodlo
prawdy WoW-a". The plan in force is `plan/argus-first.md`; its build side (the plan's stage 4) is parked.

The PM, 11 Nov, on the pace: first "A tak poprosze" (one task, then a stop with the progress, then his word);
then, after task 5, "lec do konca 1 foundation, 6 i 7 bez stopu i cale design (2)": tasks 6 and 7 of stage 1,
the release of v0.2.0 with them, and stage 2 run without a stop. v1.0.0 stays his word.

Held for the PM: the first push and every tag (a release), a merge, a snapshot retaken, a message to eagle-dev,
Argus's stack, the spawn of `argus-design`. The product repositories are read only from here.

## Progress

Printed by `~/.claude/hooks/runBars.py` (show · close <stage> <words>), never counted by hand in a reply.

| stage | what | done | of |
| 1 | Foundation | 6 | 7 |
| 2 | Design clean | 0 | 10 |
| 3 | Spawn design | 0 | 3 |
| 4 | Eagle-design | 0 | 2 |

Stage 1, the plan's stage 1: 1 · the repositories that take the way of working named in `ports/`, the paths out
of the scripts · 2 · the gate `yarn consumers`, run for real: "no difference" on a clone of eagle-design's
`port/wow` · 3 · the gate replaces `verify` at the feature end, the extraction's scaffolding to `legacy/` ·
4 · `yarn release` and the changelog, the package holds the four homes alone · 5 · the deletion guard, tests for
the gate, the release and the three hooks · 6 · `CLAUDE.md`, `README.md`, one state file, the decisions as data ·
7 · v0.2.0 out through the new gate, the PM's word (the first push and tag).

Stage 2, the plan's stage 2: 1 · the contract table, row by row with eagle-design · 2 · `product.ts` typed here ·
3 · the first slice: the frozen notebooks, the featured epics, the epics · 4 · the registry readers through the
contract, the files that read more split · 5 · the facts in the 33 files leave · 6 · the stack a parameter of the
product · 7 · `examples/sample-product` · 8 · the way of working checks all of `design/` on the sample · 9 · the
no-product test over every home · 10 · the migration for eagle-design rehearsed, v1.0.0 (the PM's word).

Stage 3, the plan's stage 3: 1 · `yarn spawn design <path> <name>` · 2 · the new-project guide · 3 · `argus-design`
spawned and green on its first commit, the PM's word.

Stage 4, the design half of the plan's stage 5: 1 · eagle-design takes v1 by the rehearsed migration, the PM's
word · 2 · both design repositories pinned to one tag, the gate green on both.

## History
- 12:25 · stage 1 · 1 of 7 · ports/consumers.ts names the repositories; build path mended to ../eagle (c4c82da)
- 12:35 · stage 1 · 2 of 7 · yarn consumers: NO DIFFERENCE on eagle-design port/wow in 2 min 30 s, red on a mutated commit (8540d56)
- 12:52 · stage 1 · 3 of 7 · gate at the feature end, scaffolding to legacy/; eagle-design's review mended; 3 runs NO DIFFERENCE (90dbed7, 8d141c0, a4c22de)
- 13:14 · stage 1 · 4 of 7 · package of four homes, yarn release and pre-push; release rehearsed whole on a local remote (ffa1f64, 96273a9, 912724b)
- 14:06 · stage 1 · 5 of 7 · own checks on a fresh clone, the deletion guard, tests for the gate, the release and the three hooks on scratch repositories (01d386b, 7b13daf)
- 14:27 · stage 1 · 6 of 7 · CLAUDE.md for the owner, README on the live mechanism, plan/state.md, the decisions as data, the logs to plan/log (21d815f)

## Calls

Each call: what, why, how to undo. None changes what the PM sees.

- Stage 1 task 2, the gate tries the commit in hand, not the working tree (the plan said the tree). Why: a push
  carries commits; a gate on uncommitted work proves something no one receives. It says so when the homes hold
  uncommitted work. Undo: `packageOf` reads the tree instead of `git archive HEAD`.
- The next side is not installed from a URL: its clone installs the pinned tag as its lockfile says, then the
  installed package's folder is replaced by `git archive HEAD` and its own `yarn wow` takes it. Why: the
  repository's manifest and lockfile stay as committed, so its own checks read the same files on both sides, and
  the archive is what an install unpacks once the package runs no `prepare` (task 4). Not seen by it: a change
  of this package's own `dependencies`. Undo: write the dependency into the clone's manifest and install.
- Both clones run their scripts at once; the scripts of one clone run in order. Measured on eagle-design's
  `port/wow`, 13 scripts: 2 min 30 s, "NO DIFFERENCE". Proven red on a scratch clone of this repository with one
  export nothing reads added to a taken file: `output · yarn lint:exports`, `exit · yarn lint:exports · 0 → 1`,
  2 unexplained.
- The differences a release means are rows of `releases/changelog.ts` · `NEXT.outputs`, by repository, each with
  its why; `plan/expected-differences.tsv` was the extraction's and retires with it (task 3).
- The take's own check (`yarn wow --check`) is asked of both clones after their runs, not compared as an output:
  its line prints the version, which every release moves.
- Stage 1 task 3, what retired to `legacy/` (git mv, as it ran): `verify`, `rehearse`, `portSave`, `moveProduct`,
  the port's patch, the inventory, the differences verify expected. `moveProduct` went with them: it moved a file
  in a linked copy and here at once, and a repository that takes its files tracks none of them; the migration
  (stage 2 task 10) is its successor. `move` follows a product's checkout only when one is handed in; `rename`
  works here unless a tree is. Undo: `git mv` back, the package scripts restored.
- `keepsItsRules` reads this repository alone; the gate holds the other half, as a fault no changelog row
  excuses: a repository's `eslint-suppressions.json` naming a file it took, and a run that rewrites a taken file.
- `.rehearsal/` (191 MB, the rehearsal copies, their files hard-linked to this repository's) is left on this
  machine's disk, still ignored by git and the scope; it holds eagle-design's `CLAUDE.md`, which a session opened
  there loads. Its removal is asked of the PM.
- The PM, 11 Nov: "przegaduj to z eagle-design zeby miec weryfikacje po kazdym zadaniu". Its first review, of
  tasks 1 and 2, by commit: six findings taken (8d141c0): `cut-pack` and `release:record` join its scripts; a
  hook's git variables never reach a child; timings are cut where a tool prints one; the package's dependencies
  and peers are compared; uncommitted `ports/` and `releases/` are said. Not taken: its own `check:chunk` as one
  more script (each check of that tier already runs by its own name).
- Its control for two clones run at once: this repository's homes are byte for byte v0.1.10's (`git diff v0.1.10
  HEAD -- design dev shared design-system` is empty), so every run so far compared a tag with itself: three in a
  row read NO DIFFERENCE (8540d56 12 scripts; 90dbed7 inside `check:feature`, 199.8 s in all; 8d141c0 14 scripts,
  2 min 53 s, under `GIT_DIR` and `GIT_INDEX_FILE` as a hook sets them, with the narrowed timings).
  `cut-pack T-E19-00` exits 1 on both sides (its self-check misses two `.dc.html` pointers the branch dropped);
  the pack is written first and compared.
- Its request for the plan (relayed as the PM's word, so said to the PM at this stop): the migration is rehearsed
  on a fresh clone of its `main`, not on `port/wow`. Taken as a technical call: stage 2's line and section 8.
- eagle-design's review of task 3 (90dbed7, 8d141c0): nothing in its repository reads a retired file; the hard
  fault on a suppressed taken file agrees with the rule of 8 Nov; one finding, mended: vitest's isolate hint
  (`Isolate  N workers spawned · ~99ms startup each`, `at least ~258ms faster with isolate: false`) is printed
  only when a run was slow enough, so one clone could print it and the other not: both lines are cut, and the
  blank lines a cut leaves read as one. Unit-tested; the gate runs whole again at task 4.
- The PM, 11 Nov, on eagle-design's request for the plan: "rob tak jak eagle design prosil": the migration is
  rehearsed on a fresh clone of its `main`. His word now, no longer a relayed one.
- Stage 1 task 4, the package: `.gitattributes` marks everything at the root `export-ignore` but the four homes
  and `package.json`, so what git archives, and yarn 1 unpacks for a git dependency with no `prepare`, is those
  alone (3.6 MB, was 7.5). `prepare` leaves the manifest: with it, yarn 1 clones this repository, installs all
  of it and packs it inside every repository's install. Nothing installs git's hooks any more, so `yarn hooks`
  does (once a clone), and `yarn release` refuses a clone where git runs none of them. The gate holds
  the package to it: an entry past the homes and the manifest in what the next side unpacks is a fault.
  Undo: the `prepare` line back, the attributes file gone.
- Stage 1 task 4, `yarn release`, its order: the row and the version written and committed, `main` pushed, the
  tag cut once the remote holds the commit, the tag pushed. The plan listed the gate as a step of its own; it
  runs where every push meets it, in pre-push, once and from nothing. Why: a tag is never cut on a commit a
  gate refused (9 Nov, v0.1.1 and v0.1.5 were), and the gate's three and a half minutes are not paid twice.
  A refused push leaves the release commit here, untagged: mended by a commit, `yarn release` again sends the
  same release. Undo: run `check:feature` in the script before the tag.
- pre-push (`scripts/prePush.ts`) runs the feature tier only when the push carries a commit its remote lacks,
  asked of the remote itself (`git ls-remote`), never of a ref kept here: no cache. A remote that does not
  answer holds nothing, so everything is checked. Without it the tag's push would run the tier again on the
  commit just pushed. Undo: `.husky/pre-push` back to `yarn -s check:feature`.
- The push goes over HTTPS, the URL read off `origin`, signed in by `gh` (the PM's rule: a long pre-push drops
  an SSH connection).
- A release's row, against what was settled with eagle-design: version, kind, action, outputs and rule keys
  are written by hand in `NEXT`; the paths that moved or left each home and the commit of each repository are
  computed. "Whether a snapshot moves" has no field: it is a row of `outputs` (`written · guards/__snapshots__/…`).
  `tried` is where each repository's branch stood as the row was written; the gate clones the branch at the push.
- `releases/changelog.ts` is held at 200 lines like any file, about a dozen releases; older ones then move to a
  file of their own. The release does not refresh `origin/main` here: pre-push asks the remote.
- Found by rehearsing `yarn release` in a scratch clone against a local remote: this repository's own
  `test:rules` was red on any clone but this machine's. `tests/lint/fixtures/.claude/settings.local.json`, which
  `knipConfig.test.ts` reads, was never committed: the machine's global git ignore holds
  `**/.claude/settings.local.json`. Added by force; once tracked, no ignore touches it. The class of fault (a
  check green here on a file no clone holds) gets its gate in task 5: this repository's own tier run on a fresh
  clone of the commit.
- The same rehearsal: a commit the checks refused left the manifest and the changelog written, and the next
  run refused a dirty tree. The script now puts both back (the tree was clean before it wrote them).
- Task 4 proven three ways. The package through yarn's own git path, in a scratch project depending on a bare
  clone at ffa1f64: `node_modules/design-ways-of-work` holds `design`, `dev`, `shared`, `design-system`,
  `package.json`, 4.5 MB, installed in 4 s with no second install. The feature tier on that commit: green, the
  gate 195 s. `yarn release` whole, in a scratch clone of 912724b with its hooks installed and a bare remote
  beside it: the commit past the commit tier, `main` pushed past the feature tier and the gate (172.8 s), the
  tag's push "carries no commit its remote lacks", "v0.2.0 is out", 3 min 44 s in all. This repository and
  GitHub hold no v0.2.0: the real one is the PM's word (task 7).
- eagle-design's review of task 4 (ffa1f64, 96273a9, 912724b): seven findings, all taken (cdf483d).
  A release's `rules` are keys `added`, `changed` and `removed`: a removed key leaves a sheet row that points
  at no rule. A manifest whose text does not hold `"version": "<the last>"` stops the release before a file is
  written (it was left as it was, in silence: a tag on the version before). An `ssh://` origin goes over HTTPS
  as a `git@host:` one does. A release that went out whole is not sent again: the remote is asked for its tag,
  and `NEXT` says nothing (it pushed `main` with all that came since and said the release was out).
- The same review, pre-push. It measured a push against every ref the remote holds, so a commit that reached
  the remote unchecked (a clone with no hooks, `--no-verify`, a merge on GitHub) and was then pushed to `main`
  read "nothing to check". Now a ref the remote has is measured against what it holds there, as git hands it
  to the hook; a new ref against the remote's `main`. One step past its proposal (it kept every ref for a new
  one): against `main` alone, a tag cut by hand on a commit only a side branch holds is checked too. Not
  closed, and no hook can: a commit pushed straight to `main` from a clone with no hooks.
  Undo: `heldByRemote` back, every ref after `--not`.
- The same review: the checks read the checkout, not the commit pushed. A push whose commit is not `HEAD`, or
  from a tree with uncommitted work (untracked too), is refused with its reason, before the tier runs. The
  tier on a fresh clone of the commit (task 5) may replace the refusal. Undo: `misread` out of `prePush.ts`.
- The same review: `lint:hooks` leaves the commit tier. The hook that runs the tier is the thing it checked,
  so it was green whenever it ran and red only where the tier is run by hand: a fresh clone, which task 5
  runs. `hooksInstalled` is one module; `yarn release` asks it, and the README names `yarn hooks`.
- The mends proven in a scratch clone of cdf483d, hooks installed, a bare remote beside it. `yarn release`
  whole: "v0.2.0 is out", 3 min 52 s (the commit tier 15.4 s, the feature tier 209.9 s). `yarn release` again:
  "NEXT says nothing", exit 1, nothing pushed. A push from a tree with an untracked file: refused. A push of a
  branch whose commit is not the one checked out: refused. A commit sent with no hook to a side branch, then
  pushed to `main`: the feature tier runs (195.2 s), where it read "nothing to check"; a tag cut by hand on it
  after: nothing to check. 74 tests in `tests/scripts` (56 before). This repository and GitHub hold no v0.2.0.
- eagle-design read cdf483d: a new ref measured against `main` breaks nothing there (it pushes nothing here;
  its pin is a tag, which stands on a commit of `main`). No finding. Its note, no change asked: an untracked
  file git does not ignore (a `.DS_Store`) refuses a push, as meant, and the refusal says so.
- Stage 1 task 5, this repository's own checks on a fresh clone: `yarn fresh` (`scripts/fresh.ts`). The commit
  in hand is cloned into the gate's scratch (`.consumers/own/clone`), installed from its lockfile, and every
  script of the feature tier runs on the clone, but the two that clone (`fresh`, `consumers`). It runs at the
  feature end, before the gate. Why: the release's rehearsal found a test green here on a file no clone held.
  Cost: 53 s of the feature tier. Undo: `fresh` out of `scope.checks.featureEnd`.
- Its proof, in a scratch clone of 7b13daf: the fixture of task 4 leaves the commit and stays on the disk,
  ignored. The tests there: 268 passed. `yarn fresh` there: "1 of 13 checks red on the clone", `test:rules`,
  the same `knipConfig` test. On the commit as it is: 13 green.
- The deletion guard (the plan: a script that deletes a folder refuses one outside the folder it is held in).
  `emptied` names its bound `within`; `takeDevClaude` empties `dev/claude` through it; the backup moves its
  bundle into the zip and removes its temp folder with `rmdir`, which takes an empty folder alone;
  `tests/scripts/removals.test.ts` reads every script and hook: none but the guard removes a folder with all
  it holds. Not covered, a home and so stage 2's: `design/tools/build.ts` removes its `dist` so.
- Tests on scratch repositories (the plan: the gate, the release and the three hooks, each on one). The hooks,
  `tests/hooks`, 28 tests in the commit tier: `checkTier`, `chunkCheck` and `editCheck` run as a repository
  that took `shared/` runs them, the tools stubs that write down each call. The release and the gate,
  `tests/mechanism`, 16 tests at the feature end (9 s): `scripts/` copied into a scratch way of working with a
  bare remote, its hooks, and a product pinned to its tag; `yarn release` whole, again, a commit refused, a
  push refused then mended, three states it does not start from, a manifest it cannot move; `yarn consumers`
  with no difference, a difference no row expects beside two faults, the same difference expected.
- Each mechanism broken once to see its test red, then put back byte for byte: 11 of 13 caught. The two not
  caught change nothing a caller sees (`--diff-filter=d` beside a check that the file exists; a second push
  of `main` that carries nothing). The homes are still v0.1.10's, byte for byte.
- The scratch product pins the tag on a local remote (`git+file://…#v0.1.10`), as a product does. A folder
  (`file:`) cannot: yarn writes its path relative in the lockfile, and a clone elsewhere fails
  `--frozen-lockfile`.
- Seen on the way, a home, not changed: a change that holds no file still runs `format:check` and
  `lint:words` with no file named; prettier prints an error and exits 0, so a commit of removals alone is
  green by that. Stage 2 reads it.
- What task 5 costs: the commit tier 15 s → 26 s (the hooks' tests); the feature tier 3 min 20 s → 4 min 24 s
  (`test:mechanism` 9 s, `fresh` 53 s, the gate 171 s). All 15 checks green on 7b13daf.
- eagle-design's review of task 5 (01d386b, 7b13daf): no fault in `fresh.ts` or the guard; `tests/mechanism`
  it read by its tests' names alone. Four notes, taken (09419e1). A stub proves which call a hook makes,
  never that the tool takes it: `tests/hooks/realTools.test.ts` runs the commit tier once with prettier,
  cspell and ESLint as installed. Its product sets `ESLINT_FLAGS` for a config written in TypeScript: a
  hook's environment reaches ESLint as a command and as a library (a flag ESLint does not know stops it by
  name). A Stop that says nothing of itself is read as the first. The checks that clone are a list in
  `scripts/scratch.ts`, held by a test to the feature end's scripts that name the scratch; its proposal, a
  field of the scope, would change a home's type, so it waits for stage 2.
- Its answer on the empty change (`format:check` with no file): not seen there, and worth mending in the
  home, by not calling a tool with no file. Stage 2, with the other home changes. On `design/tools/build.ts`
  it agrees: stage 2. What skips the gate's scratch, asked by it and read: `.prettierignore`, the scope's
  ignores (ESLint, cspell, knip), vitest's exclude, `tsconfig.json`'s include, git's ignore.
- The feature tier whole on 09419e1: 15 checks green, 4 min 12 s (`fresh` 50 s, the gate 165 s, NO DIFFERENCE).
- Stage 1 task 6 (21d815f), the review's item 3. `CLAUDE.md`: the role, the PM's rules, git and the shell, the
  modes, the commands, how a change goes out; the scope names it as read every turn, so the shared test holds
  it to 1000 words (893). `README.md` on the live mechanism. `plan/state.md`, the one current state, its
  backticked paths checked like the README's. `decisions/register.ts`: the PM's decisions on this repository
  as rows in eagle-design's shape (id, title, held, says) and `from`, the note that holds his words; a test
  holds the numbers, the notes and what a row replaces. The extraction's logs and maps moved to `plan/log/`
  (git mv), as written: `plan/` keeps the plan in force, the review, this run and the build side's sketch.
- What the register leaves out, on purpose: the rules of `CLAUDE.md`. They reached this session relayed in
  the handover of 11 Nov, so no note here holds the PM's own words for them; `plan/state.md` asks him to read
  them once. One relayed rule went with its tool ("port-save before verify").
- Stage 1 task 7, the row of v0.2.0: minor, no action, no rule key, no output moved: the homes are v0.1.10's
  byte for byte, and what a repository sees is the package (four homes and the manifest, no second install).
  The PM's word for the first push and tag is his "6 i 7 bez stopu" (the head of these notes, W18).
