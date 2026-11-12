# Run WoW · 11 Nov · a clean way of working for the design side

The PM, 11 Nov: "ok, rob robote iteracyjnie po kazdym chunku wypisuj progress w hooku" and "teraz cel zrobienie
WoW zeby wyspawnowac nowy projekt designu juz na czysto tak zeby eagle design i argus design mieli to samo zrodlo
prawdy WoW-a". The plan in force is `plan/argus-first.md`; its build side (the plan's stage 4) is parked.

The PM, 11 Nov, on the pace: first "A tak poprosze" (one task, then a stop with the progress, then the PM's word);
then, after task 5, "lec do konca 1 foundation, 6 i 7 bez stopu i cale design (2)": tasks 6 and 7 of stage 1,
the release of v0.2.0 with them, and stage 2 run without a stop. v1.0.0 stays the PM's word.

The PM, 11 Nov, later: "A moze byc" on a release between v0.2.0 and v1.0.0 (v0.3.0, W23), and "jak skonczysz 4
to zatrzymaj sie prosze": the run stops when task 4 of stage 2 is closed.

The PM, 12 Nov: "pomimo formularza kontynnuj robote", "czyli pokaz formularz ale pozniej go usun i kontynnuuj":
the run goes on past task 4. A stop that asks the PM leaves a Slack DM of status and a push, and the work goes
on meanwhile on the pick, written here with its why and undo; what is held for the PM still waits for them.

Held for the PM: the first push and every tag (a release), a merge, a snapshot retaken, a message to eagle-dev,
Argus's stack, the spawn of `argus-design`. The product repositories are read only from here.

## Progress

Printed by `~/.claude/hooks/runBars.py` (show · close <stage> <words>), never counted by hand in a reply.

| stage | what | done | of |
| 1 | Foundation | 7 | 7 |
| 2 | Design clean | 6 | 10 |
| 3 | Spawn design | 0 | 3 |
| 4 | Eagle-design | 0 | 2 |

Stage 1, the plan's stage 1: 1 · the repositories that take the way of working named in `ports/`, the paths out
of the scripts · 2 · the gate `yarn consumers`, run for real: "no difference" on a clone of eagle-design's
`port/wow` · 3 · the gate replaces `verify` at the feature end, the extraction's scaffolding to `legacy/` ·
4 · `yarn release` and the changelog, the package holds the four homes alone · 5 · the deletion guard, tests for
the gate, the release and the three hooks · 6 · `CLAUDE.md`, `README.md`, one state file, the decisions as data ·
7 · v0.2.0 out through the new gate, the PM's word (the first push and tag).

Stage 2, the plan's stage 2: 1 · the contract table, row by row with eagle-design · 2 · `product.ts` typed here ·
3 · the gate on eagle-design's newest `main`, its migration rehearsed there (the plan's last task, first by the
PM's word, 11 Nov · A) · 4 · the first slice: the frozen notebooks, the featured epics, the epics · 5 · the
registry readers through the contract, the files that read more split · 6 · the facts in the 33 files leave ·
7 · the stack a parameter of the product · 8 · `examples/sample-product` and the way of working's own checks
on `design/` there · 9 · the no-product test over every home · 10 · v1.0.0 (the PM's word).

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
- 14:33 · stage 1 · 7 of 7 · v0.2.0 out by yarn release: main pushed past the feature tier and the gate, then its tag (232b141)
- 14:49 · stage 2 · 1 of 10 · the contract table settled with eagle-design, the gate holds each product to its paths by git's names (5d77a15, 7e84a2a)
- 15:10 · stage 2 · 2 of 10 · product.ts typed here, the checks' own parts through it; the gate migrates the clone that takes the commit; NO DIFFERENCE on eagle-design (b5b6c4c, 8223828)
- 17:00 · stage 2 · 3 of 10 · the gate on eagle-design's newest main, the trunk taken by the port's script; eleven differences, each a row of the release in hand; verified by eagle-design (52bf59f, 66d30f2, a8bdcc0, 7c9dbb2)
- 17:51 · stage 2 · 4 of 10 · the first slice: the build side's read list out of the home into the product's registry, the merge keeps two changes that touch, a repository's migration by one command; v0.3.0 out; verified by eagle-design (a53a832, 3d1a872, c82439e, 272bceb)
- 08:48 · stage 2 · 5 of 10 · task 5 · plugs and registries through the product: no home reads a product's logic, model or samples by path; the gate's 23 differences each expected; verified by eagle-design (d162c06, 69c453d, 3419ef0, 5555716, 4fc5f4f, 1bfe21a)
- 10:15 · stage 2 · 6 of 10 · Feature and Board read a product only through its contract: the plan, the slots, the eras; 840ec79 carried; gate 79 of 79 expected; verified by eagle-design (71a83b4, 391504f, e6d0b3d, 5c1b7d0, 3f930aa, b9bf980, 6e359a2, 8660446, d593f8d, d205409, c2ea74f, 594f453)

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
  rehearsed on a fresh clone of its `main`. The PM's word now, no longer a relayed one.
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
  as rows in eagle-design's shape (id, title, held, says) and `from`, the note that holds the PM's words; a test
  holds the numbers, the notes and what a row replaces. The extraction's logs and maps moved to `plan/log/`
  (git mv), as written: `plan/` keeps the plan in force, the review, this run and the build side's sketch.
- What the register leaves out, on purpose: the rules of `CLAUDE.md`. They reached this session relayed in
  the handover of 11 Nov, so no note here holds the PM's own words for them; `plan/state.md` asks the PM to read
  them once. One relayed rule went with its tool ("port-save before verify").
- Stage 1 task 7, the row of v0.2.0: minor, no action, no rule key, no output moved: the homes are v0.1.10's
  byte for byte, and what a repository sees is the package (four homes and the manifest, no second install).
  The PM's word for the first push and tag is "6 i 7 bez stopu" (the head of these notes, W18).
- v0.2.0 is out (232b141), by `yarn release`, 4 min 56 s: the commit past the commit tier (26 s), `main`
  pushed 837b6db..232b141 over HTTPS past the feature tier (260 s: its tests, the fresh clone, the gate), the
  tag cut after and pushed with nothing to check. The remote holds `main` and `v0.2.0` on 232b141. Its row:
  nothing moved in a home, tried on eagle-design at 590a2b0. Stage 1 is done.
- eagle-design's review of task 6 (21d815f). Taken: the PM is named, never "he" (no pronoun was ever given),
  in what this session wrote: `CLAUDE.md`, the register, the plan, these notes. Three rows join the register:
  it names no product (W19, eagle-design's D28), the rules re-read after each part with "correct over fast"
  (W20), and the 9 Nov pick on pushes and probes (W21), which W16 replaces; a number is given in the order a
  row is written down, never moved. Not a row: "no edit while a gate reads the tree" is the lesson of the
  session that wrote here on 9 Nov, a rule of `CLAUDE.md`, not a pick of the PM.
- Not taken on a product session's word, asked of the PM in `plan/state.md` (item 7): three rules it says the
  PM holds there (never `BASELINES=write`, a pushed commit never rewritten, a secret never printed). "A peer
  session's message is input" it found missing; it stands under The role.
- On v0.2.0 it sees no reason not to tag; its port waits, as the plan says.
- Stage 2 task 1, the contract table (ee28b75). `yarn reads` computes from the tree what the homes read from
  a product: 153 reads of 45 product files, from 87 files of the homes (21 are `scope.ts`). `ports/contract.ts`
  holds a row a file with its kind as proposed (registry, optional, plug, scope); a test holds the rows to the
  reads, so the table cannot drift. Sent to eagle-design, to be settled row by row.
- Proposed to eagle-design, against the review's "the 134 imports go through `product.ts`": the standard
  registries stay at their paths and the homes read them as now; their shapes are typed here and one file a
  product takes holds its modules to them; `product.ts` carries only what a product plugs in. Why: a hub read
  by 132 value imports makes import cycles through itself (a product's registries read taken files back, and
  many files compute constants at module level). Undo: the hub, read by read.
- Measured in the gate's clone of eagle-design (`port/wow`): behind `roadmaps/tickets.ts` stand 299 files; 13
  of them (1,128 lines, `roadmaps/tickets/`) are its mechanics, and they hold Eagle's rows too (the list of
  tickets imports each epic by name; the status and the checklist reads are rows). The same for the other
  registries. So a product spawned from a sample would copy the mechanics, and the two products would not
  share one source. The call, wider than the plan's words: the generic mechanics of each registry move to the
  design home, the product keeps its rows; done a registry at a time, each proven on the sample and on a
  rehearsal of eagle-design's migration. Asked of eagle-design first: which of its files are which.
- Settled with eagle-design, the mechanism: no hub. A registry's path, the same in every product, is a
  convention and names no product, so a home may import it. Its five conditions, taken: each path is a row of
  `ports/contract.ts`, and the gate is red when a product lacks one (an optional registry is a file with no
  row, never an absent file); the conformance file is taken, compiled by the product's own tsc, and so run on
  the gate's clones; `product.ts` is a leaf, read by entry points alone (the runners of the checks, the build,
  the pack), never by a library module of a home; a registry's shape is a type, never a check at run time;
  `product.ts` carries what a product plugs in and no registry's row. What follows: a product moves a registry
  to another path only with a release from here.
- Settled with eagle-design, the rows it doubted. `sheet/project.ts` stays a registry: data with no import, so
  a library module of a home may read it (the pack reads its build paths); the names and the build reads stand
  there alone, and `product.ts` carries code a product plugs in, nothing else. `roadmaps/tickets/ticketStatus.ts`
  is a registry (the board's one field written by hand), `sheet/words/messagesContent.ts` a plug (the words of
  its own content types and their check). The wireframes and their snapshot are optional, the two held
  together. `rulesParts` is a plug whole. Two parts split when the readers go through the contract (task 4):
  of the sentences' part the harness (the compare with the snapshot, the keys changed, the log, the retake)
  comes to the home and the surfaces stay the product's, the sentences' snapshot then a registry's row here;
  of Measure the count of the standard registries comes to the home and the product keeps its own lines. Asked
  by it of the harness: every part takes a retake, none holds `diff` fixed. The retake itself stays the PM's
  word in the product. Left for the split of mechanics from rows: the block model's emit, which reads generic.
- The pair of the wireframes (no snapshot where there is no wireframe) is a rule of data: the wireframes' part
  holds it, in the home; the gate holds the contract alone, a file being there. Agreed by eagle-design.
- Settled with eagle-design, mechanics against rows, the tickets (5d77a15 sent to it). To the home: the
  tickets' types and kinds, the ticket of a command, the receipt flags, the board, the views, the context, the
  expand, and `roadmaps/tickets.ts` itself. To the product, as rows: the commands' states, the checklist
  reads, the status. Split: of the list, the building comes here and the epics imported by name stay, as an
  index a product holds (a registry's row, written by its new-epic as the edges and the receipts are); of the
  pointer, the grammar comes here and the two imports of the product's own rules go, such a pointer resolved
  as a section of a file, the way the pack reads one. That last is what cuts the 299 files behind the tickets.
- The same for the block model. To the home: the model's type, the parts put together in the order of their
  keys, `tools/emit.ts`, and the pack's read of the emitted file. To the product: the parts, the model put
  together, and the list of the modules it emits, a registry's row.
- eagle-design's review of 5d77a15, mended. The gate asked the disk whether a registry is there, and a disk
  that folds case (this machine's) answers yes for `componentsSpec.ts` where the product holds
  `ComponentsSpec.ts`: green here, red on Linux. It reads the clone's tracked files now, by their exact names;
  the red proof renames a registry by case alone. The kinds of the 45 rows agree with its tree, each file
  tracked on `port/wow`. Rows to come when the mechanics land here, each a registry: the checklist reads, the
  commands' states, the index of the tickets' parts, the list of the emitted modules.
- Stage 2 task 2, `product.ts` typed here. `design/tools/productTypes.ts` holds `Product`: code a product plugs
  in, nothing else. Its first field is the checks' own parts: `tools/checks.ts` runs the standard parts (a, g,
  w) and takes the rest from `product.ts`, where it imported four of eagle-design's files by path. The type
  grows a field with each file split in task 4, never ahead of its reader. A test holds `product.ts` a leaf: no
  file of a home imports a file that reads it. Its row in the contract is of a kind of its own, `product`.
- `checkOrder`, a field a product may leave out: the order a full run takes the parts in. Why: eagle-design's
  run is a, e, f, g, b, c, w, and the gate compares the whole output of `yarn checks`; with the order kept that
  output stays byte for byte, so the gate stays strict on it through the stage. A product that names none runs
  the standard parts first. Undo: drop the field, and write the moved order as a row of the release.
- The gate migrates the clone that takes the commit. A release that asks a repository for more than its pin
  names a `Migration` in `ports/`: files removed, files moved, and a folder `tree/` whose files are written at
  the same paths. `scripts/migrated.ts` does it through git's index and never commits: the product's hooks and
  its history stay its own, and no commit is made past a hook. The contract reads the index, so a file the
  migration adds is held. Undo: `migration: null` in `ports/consumers.ts`.
- What the runs wrote is measured from the clone as it stood before the first run, where it was measured from
  the commit: a file the migration staged is not a file a run wrote; one a run rewrites, or puts back as
  committed, still is. `writtenIn` had no test; it has one now, with `since` and `migrated`.
- `ports/*/tree/**` joins the scope's product trees: a product's files on their way to it, checked in that
  product by the gate's clone, as `design/` is. No rule is off for this repository's own code by it.
- The row of the release in hand is a major now: a repository does its migration to take it.
- The gate on b5b6c4c, eagle-design's `port/wow` migrated: no difference in thirteen of its fourteen scripts;
  `yarn lint:exports` red. Its knip read no `product.ts`: the shared config names the root's tool configs and
  `scope.ts` as the project, so the parts reached through `product.ts` read as unused. `product.ts` stands
  beside `scope.ts` there now. eagle-design's finding on the same commit: its `product.ts` opens with the
  block header its rules ask of a file, where it carried the one line a config does.
- eagle-design's X1, and the call. The gate's repository is `port/wow`, frozen; its `main` stands 28 commits
  past their common base (8e031ff). Measured, read only: 98 files, 81 changed and 17 new, nearly all rows
  (`sheet/`, `roadmaps/E*`, snapshots, packs). Of what this stage touches: three files of `roadmaps/tickets/`
  (the list, the status, the checklist reads), the frozen notebooks' test, five of the components' spec, two
  documents. It proposes the gate take a fresh clone of `main` now. The call: the plan's order stands, `port/wow`
  to task 10, where the rehearsal on `main` is built (W17). Why: that rehearsal is the port itself done by
  script on a moving tree, a task of its own size, and nothing of tasks 3 to 9 needs it if one rule is kept
  from here: a migration never writes whole a file that holds rows. It writes a new file, moves one, removes
  one, or edits one by script, so `main`'s newer rows survive it. Undo: task 10 first. For the PM: its proposal.
- On `main` the checks run three parts more (d, r, h: the list, the pages, the props). The port took them out
  with the pages (W2, W11); the rehearsal on `main` will name them as differences the port means. Whether a
  product's board, pages and props get a part again, in TypeScript, is the PM's: listed for the return.
- Settled with eagle-design, the files that read a plug (its T4). The guard's part keeps its standard lines and
  takes its tail from `Product.guardLines`; the moves of the architecture map are a plug, the layers' names
  come from the source guard's rows. The assembly findings are `Product.guardFindings`. The wireframes' part
  takes `Product.screens` (sweep, editor view). The pack reads the emitted block model, no module. The states
  an epic names and the counters are plugs, `statesOf` and `counters`, handed by the entry point as an
  argument to a library module, which never reads `product.ts`. The requirements are a registry at a neutral
  path, `sheet/requirements.ts`: a row that names the code a decision retires is every product's. The feature
  view's fields go whole to the product, a view part, their test with them. The source guard stays here, an
  engine; its rows (the map, the scope, the layers) are a registry, `guards/sourceRows.ts`.
- The gate on 8223828: NO DIFFERENCE, each of the fourteen scripts of eagle-design's `port/wow`, migrated,
  against its pinned tag. A run before it tried b5b6c4c again and was stopped: a commit that failed its hook
  had been chained before the gate in one command, so the gate read the commit before. A gate is run alone.
- The PM, 11 Nov, asked why the work stands 28 commits behind eagle-design's `main`, and chose A of three: the
  rehearsal on `main` now, before the rest of the stage (W22). The stage's tasks are numbered again above.
- eagle-design on the epics of the journeys' part, done on its `main` (e0a4939): the epics are the backlog's,
  in its order; a cases-met line for each with a feature ticket and a journey; a journey row carries
  `waits: 'refinement'` where the part named E14; the case ids are read with no epic. Its `port/wow` holds
  none of it. The notebook's path is the product's shape, so it stands in the registry beside the pins.
- Measured for the rehearsal, in a clone under `.consumers/trial-main`: `port/wow` merged into `main`
  (e0a4939) without a commit conflicts in ten files. Five are files a home holds now that `main` changed since
  the base: the journeys' part, the frozen notebooks' test, a rule's README, a document of the API convention,
  and the components' spec, which the port renamed. One is a file `main` added in a folder the port renamed.
  Four are rows both sides moved: an organism of the components' spec, its JSON in `legacy/`, an epic of the
  backlog, a command of E04.
- Stage 2 task 3, the gate on eagle-design's newest `main`. The four conflicts of rows are eagle-design's to
  settle, so the port is not replayed here: its branch takes `main` (a merge there, on a working branch, the
  PM's word on its side, asked of the PM), and the gate holds the branch to it. Two checks, `scripts/
  consumerPort.ts`, by a `port` a repository of `ports/` names: the branch tried stands behind the branch its
  work lands on, by how many commits; and a change of that trunk's to a file the port took out of the branch
  (as git reads the port, a move followed, with the moves' map for a file rewritten as it moved) is carried
  into its home and named in `ports/eagle-design/carried.ts` by the file and its blob, so a later change is
  asked for again. Why: `main` still runs its own copies of what a home holds now, and a fix made there
  (e0a4939 is one) would be lost at the catch-up with no word. Today it reads: 29 commits behind, four files
  to carry. Undo: `port: null`. The gate is red from here until the branch takes `main`: no push before that.
- At the end the catch-up is a fast-forward: the branch holds `main` whole, so `main` moves to it with no
  conflict, then the migration. That is why a merge kept current beats a replay by script at the end.
- eagle-design: the merge is the PM's word on its side too, held by its work-mode hook; it asks the PM for
  one standing word for `main` into `port/wow` (forward only, nothing rewritten, `main` untouched). Since the
  gate is red after each commit of its `main`, the merge has to be a script, not handwork: asked of this
  session, as the moves' map and the pass of names are this repository's.
- `node scripts/portMerge.ts <name> <checkout>`, run by the product's session on its port branch. The merge is
  left uncommitted. A conflict is ruled by the port's data in `ports/`: a file a home holds stays out, and its
  row for `carried` is printed with the trunk's blob; a file the port moved and rewrote, or one both sides
  hold, takes the trunk's change laid on it three ways, the base and the trunk's side named as after the port
  first, so the port's renames are no change (where one place still meets, the trunk's side is taken and the
  file is listed to read); a file the trunk added in a moved folder follows the folder; `legacy/` stays as the
  port left it. Then each snapshot the port holds as a module is written again from the trunk's JSON by the
  writer the checks use, each file the merge brought has its paths, its imports and its bare file names named
  as after the port, and the product's own take runs again: the merge writes the trunk's copy over a file the
  take holds, and ruling it removes the file. Tests: the names (`portNames`), the rules on a scratch port and
  trunk (`portSettle`). Why here: nothing of a product's rows is held in this repository by it. Undo: the
  files go to `legacy/` once the product's work lands on the branch that takes the way of working.
- Carried into the homes, the four changes of `main` the port's checks named: the journeys' part reads the
  backlog's epics and a journey that waits (e0a4939); the API convention's sixth check, word for word; the
  rules' README names the build repository by its role; the frozen notebooks' pins and the notebook's path
  are the product's registry `roadmaps/notes/frozenNotebooks.ts`, written by the migration with E19's pin,
  and the test no longer asks for more than five notebooks. Each is a row of `ports/eagle-design/carried.ts`.
- Held for the build side, from eagle-design: it reads by a commit's blob `fixtures/data/block-model.json`,
  `components.spec.json` and `modes.json`, `fixtures/packs/` and `fixtures/screens/`. The port emits none of
  the three data files today (the home's list of emitted modules holds documents alone): a gap of the port.
  They come back at the same paths with the emitted modules' registry (task 5), before the catch-up, so the
  build side sees no change and no word to it is needed. Those paths and that way of reading stay.
- The merge rehearsed, in `.consumers/trial-main` (its `port/wow` 590a2b0, its `main` e0a4939): ten conflicts
  read, none left; one file listed to read, an epic of the backlog where both changed one place. Four
  snapshots written again; with the port's one name beyond a move (`block-model.json`, a module now) the
  content types' part fell from three differences to one. The product's own scripts on the merged tree: the
  take's check, tsc, the file names and the unused exports green. Red, each the product's to mend in its
  merge: one name its lint refuses in a row `main` added, seventeen words its spelling lacks, one file to
  format, the emitted files to build again, and one key of the content types' snapshot (the map of the files'
  links, which differs between the two trees: a retake, its side and the PM's word). One test is red there by
  design: E19's pin, which the home's test of the tag lacks and this release's registry holds.
- Open, both the PM's: the word for eagle-design's merge of `main` into `port/wow`, asked on both sides; and
  the gate stays red until that merge, so task 3 closes after it, on a gate that reads the differences this
  release means (the frozen notebooks' test, the journeys' lines) and no other.
- eagle-design's review of 9b13661, mended. Where the trunk's side is taken over a place both changed, the
  port's own change there was dropped with no word: it is printed now, as a diff of the base named as after
  the port against the branch's file, and the script ends red while one stands (a place where the port
  changed names alone drops nothing and passes). A blob was read as text and trimmed: it is laid byte for
  byte, and a file that is no text (a NUL in its first 8000 bytes, git's measure) is never laid, the trunk's
  bytes taken and the file listed. A snapshot was written whole from the trunk's JSON, over a key the port
  had moved and the PM accepted there: it is written key by key, three ways, a key the trunk left as the
  base keeping the port's value. With the bytes kept, the one place listed to read in the rehearsal merges.
- eagle-design reports the PM's standing word for its merge, given on its side: forward only, nothing
  rewritten, `main` untouched, each run reported to the PM; a snapshot that still differs after it and the
  catch-up of `main` stay the PM's each time. It is the product session's act in its repository; nothing
  held on this side moves by that report.
- The PM, 11 Nov, here: "tak dalem zgode - robcie tak zeby sie zsyncowac w koncu". The standing word for
  eagle-design's merge is the PM's own, said to both sessions.
- A snapshot of one text (Measure's) was read as a snapshot of keys and written empty: found by the product's
  own checks on the rehearsed merge, mended in `scripts/portSnapshots.ts`, tested. A snapshot of keys is
  taken key by key, one of a single text whole.
- eagle-design's first run of the merge, on its `port/wow`: every conflict settled, and its own commit tier
  red on one test, the frozen notebooks'. The tag it pins (v0.1.10) holds the pins in the home's test, five of
  them, and its `main` has closed E19 since: the port cannot be green on that tag once it holds `main`, the
  take refuses an edited file, and it commits past no hook. So the branch can take `main` only together with
  a release that reads the pins from the product. And the gate held the release to a branch that holds
  `main`: each waited on the other.
- The call that opens it: the gate takes the trunk itself. Each of its two clones merges the trunk by the
  port's script, uncommitted, before anything else (`trunkTaken`); what the script could not settle is the
  fault. A branch that stands behind its trunk is no fault any more: the trial is of the product as it stands
  today whatever the branch holds, which is what W22 asks, and it waits on no commit of the product's
  session. The carried check stays. Undo: the `behind` fault of b42d5a2. The product's own merge commit
  comes with the next release: the merge, its pin moved, its migration, one commit, green by what the gate
  tried.
- `main` moved again (390b1a8): a 502 row in the API convention, carried word for word into
  `design/docs/documents/api-convention/endpointShape.ts`; its row in `carried` holds the new blob.
- The gate read twelve differences on 52bf59f; one was the migration's own fault. The product's lint refused
  the pins' registry as this repository wrote it: a ticket's name as a key, a header bullet past 80
  characters. The registry is rows of epic and digest now (66d30f2), tried by hand in the gate's clone with
  the product's own eslint, test, prettier and tsc before the gate ran. Undo: revert it; a keyed record.
- `main` moved again (3414810): one row more in `READ_BY_THE_BUILD_SIDE`, in the export test a home holds,
  carried at the port's path (a8bdcc0), its row in `carried`. That list is a product's fact the home still
  holds, and the product's work moves it: each move blocks the gate until it is carried here. It leaves the
  home first in task 4, into a registry of the product's, the path asked of eagle-design.
- The gate on 7c9dbb2, the product's `main` at 3414810: eleven differences, each a row of the release in
  hand, none broken. The pins' test green where the tag fails it; the journeys' part reading the backlog's
  epics (the cases met of E10 and E14, the journeys of E14 and E19); the API convention as `main` holds it,
  in the page, the build's copy, the pack and the build's line; the pins' registry one file more of its
  module, in the module entries and the release record. Red and equal on both sides, the product's to mend
  in its merge commit: its lint, its format, its spelling, its unused exports, the pack's uncommitted files.
- Open, the PM's: a release between v0.2.0 and v1.0.0. The product's one commit (the merge, its pin, its
  migration) needs a tag that holds the contract; the release in hand is of the kind that asks an action,
  which the script numbers 1.0.0, and v1.0.0 is the end of the design side by the plan. The pick here: 0.3.0,
  the script raising the minor for an action while the version stands below 1.0, as semver reads 0.x.
- eagle-design verified task 3 at 7c9dbb2, read only: each of the eleven is its own `main`'s output (the
  pin of E19 equals its test's and the sha256 of the notebook; part g's lines are `main`'s, in its order);
  the registry as rows suits it; the five reds equal on both sides are its own, mended by script in its merge
  commit. The build side's read list goes, by its word, into `sheet/project.ts` as `buildReads.names`: one
  home for what the build side reads, no new file.
- The release script numbers an action below 1.0 as a minor (0.2.0 to 0.3.0), as semver reads 0.x; the row
  keeps its kind, so a repository still reads that the release asks an action. Why: a release that lets the
  product's branch take its `main` is not the end of the design side, and v1.0.0 is that end by the PM's
  word. The script reaches 1.0.0 by no count now: its naming is written with task 10. Whether and when the
  release goes out stays the PM's. Undo: revert the commit; an action is numbered 1.0.0 again.
- Asked of eagle-design for task 4: the read list moves on its own `main`, by its session (the field in
  `sheet/project.ts`, its test reading it), and the gate's trunk brings it; the home's test then takes that
  change as a carry. A migration writes no file that holds rows, so the field is not this repository's to add.
- Task 4, the first slice. The pins and the epics left with task 3's carries; what stood was the build
  side's read list. eagle-design moved it on its `main` (98deb53): `sheet/project.ts` · `buildReads.names`,
  its test reading it. The home's test reads it there too, its own list gone (a53a832), the carried row on
  the new blob. Undo: revert a53a832; the list stands in the home again.
- That move met the port's own cut of the same object, line to line: git's merge reads two changes with no
  line between them as one place, the script took the trunk's side and held the file, and the feature tier's
  gate was red on a merge that loses nothing. After git's merge refuses, the script now reads each side's
  changes by the base's lines they replace and keeps both where none shares a line and no two add at one
  gap (`scripts/portBeside.ts`, 3d1a872); it says so by the file and holds nothing. Two changes that share
  a line stay a person's. Why not held: the gate runs the product's own checks on the merged tree, and a
  held file is a red gate on every such move. Undo: revert 3d1a872. On the trial clone the merge of 98deb53
  ends green, the object holding the port's two fields and the trunk's names, named as after the port.
- A repository's session had no command for its migration: the gate alone ran it, on its clone.
  `node scripts/migrate.ts <name> <checkout>` (c82439e) runs it on the repository's own checkout, on the
  branch that takes the way of working alone, with no commit; the release row's action names it.
- The gate on a53a832, the product's `main` at 98deb53: the same eleven differences, each expected.
- The real tools' tests (prettier, cspell, ESLint as installed) stood under a unit test's limit and went red
  once on a busy machine: thirty seconds now (4a4c8dc). Undo: revert it.
- The first run of the release wrote its commit (4d4c0a4) and its push was refused, no tag cut, nothing
  sent: the release moves its rows from the release in hand to the releases put out, and the gate read the
  release in hand alone, so at the release's own commit the eleven differences had no row. v0.2.0 moved no
  output and never met it. The gate now reads, beside the release in hand, the rows of each release put out
  since the one the repository pins (the version of the package its clone installed): they explain a
  difference as this release's do, each under its version, and are never stale, since a row put out is not
  mended. Tested on the rows and on a scratch product that pins an older tag. Undo: revert the commit; a
  release that moves an output cannot pass its own push.
- v0.3.0 is out, on the PM's word: `main` pushed past the feature tier, the fresh clone and the gate, then
  its tag, both at 272bceb. The release's own commit is 4d4c0a4; the tag stands one commit after it, on the
  mend the refused push asked for. eagle-design is told the order the gate tried: the merge by script, the
  pin, the migration by its command, its own mends, one commit.
- eagle-design verified task 4 on its own checkout at v0.3.0, the order kept, nothing committed: the merge
  ends green with none held and `sheet/project.ts` kept whole (the port's fields, its names at the port's
  paths, every key on the tree); the pin and the take; the migration's two files; the two tests and its
  commit tier green whole. Its commit of them waits on the PM's word on its side.
- Its findings, none of them a fault of the release. For task 5: its scope names the files the build side
  reads by name as starts for knip, a line every product would write; the knip config here can take them
  from the contract. For the PM's open question on pages (state, 8): the pack of E19 points at two pages
  the port's tree no longer holds, so cutting it is refused there. Its own, on its `main`: a hook that
  writes into `.git` as a folder, which a worktree does not have.
- eagle-design's commit landed on its `port/wow` on the PM's word there (88f5d3e, local): the merge of its
  `main` 98deb53, the pin to v0.3.0, the migration. The migration is spent: its file and its tree go to
  `legacy/`, and the gate runs none (`migration: null`). Why: run again, it would write the pins as they stood
  at v0.3.0 over the product's own, which change as it closes epics. Undo: move them back, name it again.
- The run goes on, on the PM's word of 12 Nov, with task 5; the pick on "leć" or "tylko porządki" is the
  first, "leć" (undo: stop after this tidying).
- The gate on the product's merged branch (88f5d3e, its trunk at 30d978a) read three snapshots as carries:
  the merge gave their legacy copies the trunk's values, git no longer reads them as moved, and the check took
  them for files the port took out. The port holds each as a module the merge writes; such a snapshot is no
  carry now (9e5e4e9, red proof on a scratch port). Undo: revert it. Then NO DIFFERENCE, nothing broken.
- The PM, 12 Nov: "odpowiadaj do mnie prosze w stylu bullet points z emocji, tabele porownawcze z emoji itp,
  rownowazniki zdan, tak techniczie - same konkrety", and "dodaj to do claude.md tak zeby wszystkie proejkty
  tak odpisywaly (w jezyku usera) nie definiuj na ten moemnt". Written in this repository's `CLAUDE.md`, the
  chat's language the PM's own; and, for every project on the PM's machine, in the user-level
  `~/.claude/CLAUDE.md`, outside every repository. A design repository spawned in stage 3 carries the same
  lines in the `CLAUDE.md` its spawn writes.
- The PM, 12 Nov: "lec do konca design caly i wtedy wrzuc mi formularz": the rest of stage 2 runs with no stop,
  and its end raises the PM's form; v1.0.0 is asked there.
- Task 5 goes in four pieces, each through the gate: (a) parts a and w take the product's code from its entry
  point; (b) the states an epic names and the counters; (c) the rows that move to the product's registries,
  moved by eagle-design on its `main` and carried here; (d) the pack reads the emitted block model.
- 5a. `Product` gains four optional fields: `guardLines` (part a's last lines, the product's own),
  `guardFindings` (the guard's findings over its own logic), `mapMoves` (the facts the map draws moving),
  `screens` (part w's sweep and editor view). `tools/checks.ts`, the entry point, hands them to `guardPart`,
  `guardRun` and `wireframesPart`, which read no file of the product's for them any more; a product with no
  screens runs no line of part w. The five plug rows nothing reads leave the contract. The product's side is
  the migration: its `product.ts` wires the four, and two files of its own hold what left the homes (the
  tail of part a; the assembly's findings), new files, no rows. `guards/sourceCheck.ts` exports its finding
  and map-move types, so a product reads them through the entry. Tried by hand in the gate's clone first:
  its tsc and ESLint clean, `yarn checks` the same output line for line. Undo: revert the commit.
- The gate on 5a read nine differences, each mended but one: the product's prettier formats `design/`, which
  this repository's ignores, so a home's file is formatted here with no ignore file; the guard's header kept
  as it was (the map and the bundle record a header); the two screen types stay inside their file (the
  product's knip read them as unused exports); the export test counts `product.ts` a reader, as it counts
  the tools' configs. The one meant: the pack counts the migration's two new files as not committed yet.
- 5b. The states an epic names and the combinations' counters. `product.ts` reaches the disk (the checks'
  world reads it), so a page cannot bundle it: a second file a product plugs in, `productView.ts`, of pure
  code a browser runs, typed `ProductView` here (`statesOf`, `counters`), a row of kind `product` in the
  contract. The Feature page's entry reads it and hands it to `featureOf`; the view carries `countOf`, so the
  count's hook takes it from the view, never from a file. The pack's entry hands `statesOf` to the refine
  check through its cut; with none, a criterion's DONE count is not held against a count. The leaf test holds
  every file of kind `product`; knip starts from both. The rows of the scenes and the role combinations
  leave the contract. Undo: revert the commit. Why not one file: the page's bundle would pull in `node:fs`.
- The gate on 5b: four of the product's bundles differ, each meant (the feature view and the refine check
  import no scenes and no role combinations), written on the release in hand. eagle-design's review of 5a:
  the two new files' headers split a sentence across bullets, mended; the assembly's copy of V8's message
  stays for parity, a message of its own later.
- 5c. Three plug rows leave the contract. The seven layers' names: the home's, beside the layers
  (`LAYER_NAMES`), the map draws them with no read of the product. The fields an epic decided:
  `ProductView.fieldsOf`, typed `ProductFields` here; the feature view splits their code into lines, the
  product's `productView/productFields.ts` builds them (moved there by `scripts/move.ts`), with a test of its
  own; the home's test draws a stub. The product's types read the field view types through the feature
  view's entry: a cycle of types alone, which the import rule lets pass. Undo: revert the commit.
- The gate on 5c, mended: an entry of its own for the field types built an empty script, so they went back
  behind their entry; the product's `productView/` folder is one of the folders beside the homes, as
  `notes` is, else the file names' lint refuses it; the guard's built file is nine lines longer (the
  layers' names), the map's lines there move with it, written on the release in hand. eagle-design's
  review of 5c: the fields' header split a sentence, mended.
- 5c2, the requirements. eagle-design's call: the rows move inside the migration of the release that reads
  them, not on its `main` first, so no commit holds them twice and its `main` is ported once. A migration
  learns two things, both any repository's: its moves carry every relative import with them (the code
  files it tracks, but what it keeps as it was: `legacy/`, `records/`, `notes/`), and its edits write a
  text of a file again, the text found exactly once after the imports followed, else the migration stops.
  eagle-design's rows: the rows and their cut to `sheet/requirements.ts` and its folder, their two types cut
  from the logic's into the registry's folder (the tree), the logic's export and header, the registry's
  export named `requirements`. The home reads the registry; the requirements' built file is their prose,
  every line of it exempt; its text is of the sheet's kind (eagle-design's catch). Undo: revert the commit.
- The gate on 5c2: the migration whole on a fresh clone (2 moved, 3 following, 9 edited, 7 written); eleven
  differences, each meant and written on the release in hand: the requirements a module of their own (one
  script, an entry, a module of the release record), the approval logic without their rows, the Source
  page's guard reading the registry, and the content types' snapshot, whose files key holds the map: one link
  fewer, retaken on the product's side at its take, on the PM's word there (eagle-design's reading, the same).
- 5d. The block model is data (`as const`): its contract row is a registry, no code moves. The gap of the
  port named on 11 Nov closes: the three JSON files the build side reads by blob (`fixtures/data/`
  block-model, components.spec, modes) come back, listed in the product's `sheet/project.ts` ·
  `buildReads.json` (module, export, path). The release record holds the block model's digest, as main's
  does; the other two wait: eagle-design asked for all three, but every record already written would then
  lack two files, and the record test's eras are a product's facts in a home (task 6 moves them). The home
  prints them as JSON, two spaces and a newline; the folder they land in holds each file by the name its
  row gives. The migration edits the product's project, its emitter's globs in `scope.ts` and the
  `.prettierignore` that scope writes. Printed on the
  gate's clone, each differs from main's blob at 03ea42c by the port's renames in prose alone (26, 20 and 8
  lines: `gate-rules.ts` to `gateRules.ts` and the like). Undo: revert the commit.
- The gate on 5d: the migration whole (13 edits); four differences, each meant and written on the release
  in hand: the project's built file, and the three JSON files written. The record holds the block model's
  JSON among the files read whole. eagle-design accepted both departures (the record's two files wait for
  its own era; the prose renames are met by the build side at the release that lands its port, said in
  that record's head, no word to eagle-dev now).
- 5e. What a read starts from for knip, beside the entries (each page, each module printed as data, each
  module the build side reads by name), was a line every product's `scope.ts` would write: it is the home's,
  `tools/readStarts.ts`, and the product's scope calls it (the migration's two edits there). Tried on the
  gate's clone: tsc, ESLint, knip, file names, 144 tests green. Undo: revert the commit.
- The gate on 5e (1bfe21a): the migration whole (2 moved, 3 following, 15 edited, 7 written); 23 differences,
  each expected, none unexplained. eagle-design reviewed every piece (5a to 5e) and accepted each. Task 5
  closes: no home reads a product's logic, model or samples by path; what a product plugs in comes through
  `product.ts` and `productView.ts`, and its rows through registries.
- Task 6, measured: 40 files of the homes name Eagle, its repositories, or an epic's or ticket's id; beside
  them, Eagle's file names stand in the source guard and the layout's homes. My reading, a call: "Deblock" in
  `design-system/` is the company that owns the design system, not a product, and stays; Eagle's name, its
  repositories' names, its ids as a lesson's reason or a label, and its file names leave. A generic example
  names the sample product's first epic, `E01` (task 8 gives it that id). Pieces, each through the gate and
  eagle-design: 6a the few lines and the sheet's standing words; 6b the process data's examples; 6c the
  documents' slots (the repository's path, a lesson's reason, the convention's examples); 6d the tests; the
  source guard's facts go with the views task's point 1 (the PM's word asked) or, without it, here.
- 6a. The sheet's standing words (`app/workspace/sheetStatus.ts`: `MOVES IN E18`, `E10`) are read by the
  product's content type logic alone: the file moves to the product by `scripts/move.ts`, the migration
  writes it at the same path. "Eagle reads the DS scale" reads "the tool"; the pack's usage names
  `<ticket id>`; the names rule's examples are a home's module and `E01.ts`, its markdown written by the
  product's emitter on the gate's clone and brought back. Undo: revert the commit.
- 6b. The spec's files, the first read, the fact combinations, the drift guards and the decided points are
  eagle-design's (its tickets, its files, its greps): they leave `docs/process/plans.ts` for a registry of
  the product's, `docs/process/projectPlan.ts` (eagle-design's name, beside its `sheet/project.ts`), their
  parts moved by `scripts/move.ts` into the migration's tree with their types. The Feature view reads the
  combinations from it; the ticket context reads the first read from it (two migration edits); the refine
  and start skills, the agent's instructions and the new project's list name it. Undo: revert the commit.
- Two of the PM's words for stage 4, relayed by eagle-design (12 Nov): `import-x/extensions` stays `always`
  in WoW with no scope exception, and the build side's imports get their extension in one scripted commit
  of their own at the port (A); `knowledge/ux` moves to WoW as the UX check's reference, `ux-eval.md`
  repointed, and `knowledge/ai` goes to `legacy/` with step 0c of `architecture-review.md` (B).
- The gate on 6b stopped at the migration: 6a's tree file stood at `app/workspace/sheetStatus.ts`, inside a
  home's folder, which the pinned take lists in `.git/info/exclude`; `git add` refused it. A product's file
  never stands in a home's folder: it moves to `sheet/logic/assembly/sheetStatus.ts`, an entry beside
  `contentTypeLogic.ts`, its one reader, so its module keeps the name `sheetStatus.js` the source guard reads;
  its two parts' imports follow by migration edits. Undo: revert the commit.
- eagle-design's ask on 6b, taken: the spec's map names `projectPlan.js` as this file and `plans.js` as how
  we work, and the first read opens on `projectPlan.js`; written in the tree's file, so it lands with the move.
- The PM's word on mutation tests for stage 4, relayed by eagle-design (12 Nov · B, "wedle uznania"): WoW ships
  Stryker as a shared preset and run script, the product naming its folders, each folder's score a baseline
  that only rises; an epic that touched a folder's logic runs that folder before it closes, each survivor
  killed or listed with its why. Measured on Eagle: 54 folders, 11.2 h a full pass, 10 s to 14 min a folder.
- The gate on 391504f: the migration whole; two faults. (1) The plans' types, formatted by WoW's prettier, broke
  a line the product's prettier keeps whole: a home's file takes the product's format, so the line is whole
  again. (2) `anExportIsRead` found the product's plan's `guards` and `spec` unread: the product's tickets,
  edges, receipts and backlog point at them as `plans.js · GUARDS` and the like. A pointer follows what it
  points at, as an import follows a move: a migration edit may now ask for every place its text stands, and
  the product's ten code files name `projectPlan.js` (its pinned notebooks, prose of their day, stay). The
  migration's edits for the plan stand in a part of it, `migration/planEdits.ts`. Undo: revert the commit.
- eagle-design's ask on the build side's module line in `sheet/project.ts`: the port's branch holds no such
  line (its modules are the measure and the spec check), so no edit is written; an edit would stop the
  migration on a text that stands nowhere.
- The PM's words for later stages, relayed by eagle-design (12 Nov): Argus is built on Eagle's stack, which
  WoW defines as its stack part (the S rules and gates) and a product's `product.ts` names, the spawn writing
  it (A); nothing of eagle-dev's port starts before Argus-design is spawned, then C0 first, the rest beside
  Argus-design against v1.0.0 (B). eagle-design's derivations: E and S rules reach eagle-dev by its take of
  WoW's tag; the flip is the port's step 5, after the spawn and C0; the coarse count runs first in stage 4.
- The gate on e6d0b3d: every command ends as it did; 23 built modules differ only by a pointer renamed to the
  product's plan (most bundle the schema's decision note), written on the release in hand.
  `docs/rules/responsibility.ts`, named by eagle-design, is a home's in the product: the take prints WoW's
  rule, which holds no pointer, so no edit is written.
- 6d. The home's tests name no epic: the Feature view's and page's cases read every feature `features()`
  gives, each against what its registries hold (journeys, commands, `refineSteps`, the plan's combinations),
  the product's states through a plug; the planted ids are `E01`. The record test's eras are eagle-design's:
  `sheet/project.ts` · `recordEras`, written by migration edits from the test's lists as they stood, a
  required export (data with no import, read as a typed namespace; a product with no history writes four empty
  lists), agreed by eagle-design. Tried on the gate's clone: format, tsc, ESLint, the six tests green.
  Undo: revert the commit.
- 6c, agreed by eagle-design: a product's facts in the home's documents leave by two roads. A document that is
  the product's whole leaves whole; a home's document keeps its process and asks the product for its own
  texts by key (`docs/process/documentSlots.ts`), a key the product does not hold printing nothing. Every
  printed file of eagle-design's stays byte for byte, the gate the proof.
- 6c-1. The API convention (Eagle's routes and refusals, the PM's decisions for its API) and the agent's
  instructions (what Eagle is, its six first reads, its domain's rules) are eagle-design's whole: moved by
  `scripts/move.ts` into the tree, `sheet/contract/apiConvention.ts` and `docs/process/agentInstructions.ts`,
  printed at the same paths from `sheet/project.ts` · `buildReads.documents`, and no entry of their own, as a
  home's document is none. My call over eagle-design's slots for the instructions: nine in ten of its lines
  are the product's. The sheet skill says where printed files come from. Tried on the gate's clone: tsc,
  ESLint, prettier, file names, knip, 145 tests; `api-convention.md` byte for byte, `agent-instructions.md`
  differs by 6b's line alone. Undo: revert the commit.
- A correction to the note on 6a's fix: a product's file may stand in a folder that holds a home's files
  (`docs/process/` holds its decisions and its plan beside the home's plans); what it never takes is a path a
  home's file held at the pinned take, which the take lists in the clone's exclude.
- The gate on 6c-1 (6e359a2): one difference, meant (the sheet skill's line on printed files), written on the
  release in hand with 6c-2.
- 6c-2. The pipeline's lessons cite Eagle's tickets and the PM's dates (118 places in 12 files, a
  `why: T-…` with its story, a bracket holding an id or a date), and the modes' page Eagle's history and its
  example ticket (12). A home's document asks for each by key, `cite('sharedSkill.4')` inline or
  `...citeLines('reconSkill.5+')` for a story's lines, from eagle-design's `docs/process/documentSlots.ts`
  (nine parts, written by script from the texts as they stood); a key a product does not hold prints
  nothing, the example ticket `T-E01-00`. The build branch reads `sheet/project.ts` · `buildBranch`. A home
  test fails on a row no document asks for. Tried on the gate's clone: tsc, ESLint, prettier, file names,
  knip, the tests; `ticket-pipeline.md` and `modes.json` print byte for byte. Undo: revert the commit.
- The gate on 8660446 stopped at the take: eagle-design's `main` (840ec79, the board's epic list and the API
  contract page, the PM's word for its artifact) changed a home's file, and the port's merge laid that change
  on the home's copy, which a take never overwrites. A change a home holds is carried there in the home's
  form, not the trunk's bytes: the merge now leaves a trunk's change whose `{ file, blob }` has a `CARRIED` row
  to its home (not laid, and a file the trunk added dropped). Undo: revert the commit. eagle-design holds its
  next batch until this one is carried.
- 840ec79 carried (d205409): the board's epic list and the contract page rebuilt in the homes' form, 25
  `CARRIED` rows at `main` 8acdda4's blobs. The lint asked for four calls: `CodeBlock` draws the `CodePieces`
  atom, so it is a molecule (an atom composes nothing); the page's type is `ContractPageView` (one name, one
  home); the legend's samples are the model's first two aliases (GroupId, DocumentId: eagle-design agreed);
  the alias split searches for `//` without backtracking. Undo: revert d205409, and the take stops again.
- answer-cc (c2ea74f): a lesson lands in two places, the rule in the pipeline's data, the cite in the
  product's slots. Undo: revert it.
- The gate on c2ea74f passed the take: 12 differences unexplained, 0 stale, 0 broken. Each is written in
  `NEXT` now: the contract page, its view, the board's list, the slots' module, the modes' parts, the
  answer-cc skill. The test row counts the slot test (pinned 46 files and 151 tests, now 48 and 155).
  Undo: revert the rows.
- 8acdda4..50cd593 carried (d64f9dd): every epic its Feature page, the pages folded, the board's pick kept in
  the browser, 51 `CARRIED` rows. Calls: `FoldSection` a molecule; `ContractBody` an organism both pages mount,
  its parts moved and renamed by script; the five tones in `design/app/theme/tones.ts`; the pick a namespace,
  `boardView` · `pickedEpic`, its key product-free; the wireframe sections stay out (870987c), a product slot
  `ProductView.sections` brings them back at the flip. The home's notebook test found a bold span cut at a
  middle dot; a point no longer ends inside one (eagle-design fixed its copy, 5a72932). Undo: revert d64f9dd.
- The gate on d64f9dd: the tag's board reads the backlog's open list, which eagle-design's main retired, so
  the tag's build, tsc, spec check and tests fail and this commit's pass; seven rows say so, two `exit · checks`
  rows went stale (both sides fail the snapshot now) and leave. Undo: revert the rows.
- The gate reads a halted tag (this commit): when a run fails on the tag's side and passes on the commit's,
  each file the tag's side never wrote explains itself; a row naming one still says more and is never stale
  for it. Why: the tag's build halts part way with its bundles built side by side, so which modules it wrote
  varies run to run, and a row per module went stale on the next gate (072e22f). The halted run's own exit
  stays a difference a row must explain. Undo: revert the commit and row each module again.
- 50cd593..b153673 carried (this commit): the endpoints and the cases folded, the refine standing retired, 19
  `CARRIED` rows at `main` b153673's blobs. Calls: one `Fold` atom holds the rounded frame and its mark, so
  `FoldSection` and the new `FoldList` molecule share it (one name, one home); `EndpointFolds` an organism,
  since the contract body and the Feature page both draw it, its head moved and renamed by script from
  `ContractBodyEndpointCard`; `FeaturePageEndpointItem` and `FeaturePageSteps` retire to legacy/; the
  contract's registry row for `roadmaps/features.ts` leaves, as the trunk retired that file. Undo: revert it.
- The gate on c7098cd: 3 differences unexplained. The tag's feature view reads `roadmaps/features.ts`, which
  eagle-design's main retired, so the tag's export lint fails and this commit's passes; the publish skill's new
  sentence writes its SKILL.md again. Rows say so, and the pages' rows name the folds. Undo: revert the rows.
- `move.ts` led a retired file's importer twice (this commit): moving a file to `legacy/` wrote its importer's
  path `legacy/legacy/…`, as the mention pass met the old path inside the import already rewritten. A path whose
  new lead already stands before it is left as moved; a test holds the case. Seen in c7098cd, where the import
  left with the retired part. Undo: revert it.
- b153673..1683f09 carried (this commit), on eagle-design's views/feature before its main takes it, by the
  order agreed with it: the epics listed closed first, deferred last; the board's numbers in two cards, the
  project counted from the spec and the repository from the receipts; a line cut at middle dots keeps its
  brackets whole (`textPoints.ts`, read by the notes and the contract's bodies); the ids typed, written by
  `tools/ids.ts` at the build; the frontend epic's prototype reader to legacy/. 23 `CARRIED` rows at
  1683f09's blobs. The contract gains `sheet/contract/events.ts`. Tried on the gate's clone: lint, format,
  file names, the app tests; tsc lacks only the findings' `open`, which the trunk brings. Undo: revert it.
- The gate on fb2bb0a stopped in the migration (this commit fixes the stop): port/wow could not take main
  1683f09 by the port's script, five of its own files left to lay (`.prettierignore`, `eslint.config.ts`,
  `roadmaps/backlog/backlogTypes.ts`, two files main removed under E15), and the migration then threw on a text
  the half-taken tree no longer held. Now a branch that did not take its trunk is tried no further: its
  migration is skipped and what the script left is the trial's BROKEN lines. eagle-design lays the five on
  port/wow. Open: the scratch tests hold no port with a trunk yet, so this path has no mechanism test; one
  is a task of its own. Undo: revert it.
- 7a, the stack (this commit), on the PM's A (12 Nov, W24): `shared/stack/` defines the one stack by key,
  `web`, each part's name and its packages; a product's `sheet/project.ts` names it (`stack`), a migration edit
  writing it for eagle-design; the home's documents and the journey grammar read the part's name through
  `docs/process/productStack.ts` instead of writing MUI and Playwright. My call, over the relayed "product.ts
  names it": names stand in `sheet/project.ts`, pure data a page may bundle, as the product's type says;
  `product.ts` holds code. The build side's scope names it in stage 4. Every printed text stays byte for byte
  for eagle-design. Undo: revert it.
- 7b, the atoms (PM, 12 Nov · A, by the form, W25): a probe copied eagle's 25 atoms and their theme into the
  gate's clone: 11 tsc errors, 47 lint findings under this side's rules (eagle runs its own config). Sent to
  eagle-dev on the PM's word, nine points with file and line; the sync script waits for its sha. The sheet's
  `Button` and `Badge` types rename on eagle-design's side (cf4530c), the atoms keep the design system's names.
- Gate, the halt narrowed (eagle-design's note on 8fbf131): a file the tag's side never wrote was explained
  whenever any run of its failed. Now the commit's side reads what each run left, and only a file first written
  by a run that failed on the tag and passed here is explained. My call, over a coarse line in HALTED: a coarse
  explanation would let an unrelated new file through. Cost: one folder digest and one git status per run on
  one side. Undo: revert it.
- Gate on d65144c, port/wow 29fdc87: the tag's side red as the merge left it, the commit's side red on three
  points of this side's own. `STACK` stands in an entry, so its name is camelCase: `productStack`, renamed by
  script. `StackPart` was exported and read by no one. The migrated `sheet/project.ts` went to 203 counted
  lines: the json and documents reads share one local `PrintedRead`, and `stack` takes no import (the
  contract says data alone; `STACKS[stack]` still checks the key). The product's scope did not list
  `roadmaps/ids.ts` under the emit that now writes it: a migration edit lists it. Undo: revert it.
- Gate on 7ca0dcc: two left on the commit's side. The sheet held 11 comment lines of 10: `stack` goes without
  its comment, the header names it. The product's `.prettierignore` is written from its scope, and the scope
  now lists `roadmaps/ids.ts` under the emit: a migration edit writes the same line. Undo: revert it.
- Gate on 984865d green, port/wow 29fdc87: 129 differences, each expected. The release's rows say the board's
  numbers, the ids the build writes and the stack, five new files each with its row, and the tag's exits by
  what main retired. Two gaps written in `plan/state.md`: a port takes its trunk's generated copies; a halt's
  grain is the command. Undo: revert it.
- Release v0.4.0, on the PM's A: its row and version committed (4977923), the push refused by pre-push. The
  mechanism test still read the migration's summary of before its moves and edits; knip here found
  `shared/stack/` read by nothing, its one reader in `design/`, which it reads in a product. Mended: the test
  reads the summary as it stands; a test here holds each stack to a home's design system and its packages, so
  the files are read here too. My call, over leaving knip an exception: the repository takes none. Undo:
  revert it; the release runs again from its written row.
- v0.4.0 out (e10877f, its tag on the remote), on the PM's A. eagle-design moves its pin when it chooses.
- 7b, the atoms re-probed at eagle-dev's fe07f6e4 (`git archive`, read only): its nine points hold; tsc 11 → 4,
  lint 47 → 8, none of them eagle-dev's. This side's: the theme's MUI augmentations (a badge's count, an
  input's large size), lucide-react, the tokens file as the generator writes it, three names this side holds
  already (radiusOf, LAYERS, text). eagle-design's: the sheet's Badge and Button, renamed on its main
  (cf4530c, in a99e6b1), reaching port/wow when it takes that main.
  The sync script waits for the atoms on the build side's branch.
- The next view batch, carried (eagle-design main 1683f09..a99e6b1): the board's numbers fold, each a tile with
  its words, its bar and its note (D87–D91), the repository now at its commit and at close, read from the
  receipts' `RepositoryState`; the contract's SHARED folds (D95); every report ends on the repository (pipeline
  6b, the receipt's line, answer-cc's close). Main's files merged by `git merge-file` onto the homes, the pages
  translated into the organism's parts. The stack names the browser tests' tool in the board's words. One row
  per file in `ports/`, a row that stood moved to the new blob; `LINE` retired to `legacy/`. E10's frozen pin is
  the product's registry's. Undo: revert it.
- Gate on b1a38d5: the carried pages broke this side's rules in the product (two headers, a function of 41
  lines, two GRIDs, `value` and an unprefixed flag, a written height) and the product's prettier; mended, the
  numbers' lines read in `utils/`, the share bar stretched in its own height as the stacked bar. The release's
  row: v0.5.0, the product's receipts export `RepositoryState`. Undo: revert it.
- Gate on ddc9b7d against port/wow ac084f1, which took v0.4.0: it crashed running v0.4.0's migration a second
  time (`git mv` of a file the first run moved). A migration now names the release that asks it, and the gate
  and `migrate.ts` skip it on a pin at that release or later. Before anything moves, `migrated` asks that every
  file it removes or moves stands in git and on disk, and refuses naming the absent ones (eagle-design's note,
  after its first migrate stopped half way). Undo: revert it.
- Eagle-design's review of 7a3d04d: its half-run migrate stopped in the imports' rewrite, on a tracked file its
  build had deleted that the migration never names. `migrated` now refuses a checkout missing any tracked file
  (`git ls-files --deleted`), before anything moves; a version is numbers and dots, a missing part reads 0.
  Undo: revert it.
- W26, one theme (the PM's word, 12 Nov: "mamy tylko jeden motyw bo produkt jest projektowany pod internal
  apps", "wiec beda wygladaly tak samo", "a pozniej eagle ma uzywac tego motywu"): the theme the build side runs
  is held here with its atoms and draws the design pages; the build side takes it back once its port turns.
  The plan, in steps: the build side frees its theme of its own app (the preference attribute out of the
  cookie and domain code, the content states' chip families out of the shared ones); a script copies the
  theme and the atoms here at a named sha; this side's names that clash leave (the source check's `LAYERS`,
  the measure's `text`); this side's thin theme retires to `legacy/`, the pages read the copied one, the token
  variables at each page's root; the tokens type `TokenHex`; the products add lucide-react. Undo: revert it.
- Eagle-design's note on the port's E10 hash: a migration rewrote an epic's notebook's imports, so its frozen
  pin moved. What a move never rewrites in a product has one home, `scripts/keptWords.ts`: a legacy copy, a
  record, a note, an epic's notebook (`roadmaps/E*/E*Notes.ts`); the migration, the move and the port's merge
  read it. Undo: revert it.
- Eagle-design's review of c6ee654: a closed notebook may be markdown (five frozen pins are), and a kept
  notebook that imports a moved file leaves the product's checks red, mended only by moving its pin. Where a
  notebook stands is the product's fact, in the registry the contract names (`roadmaps/notes/frozenNotebooks.ts`
  · `A_NOTEBOOK`): `keptIn(root)` reads it in a node of its own, so the move, the port's merge and the migration
  keep both shapes. The migration refuses, before anything moves, a move of what a notebook imports, and names
  the notebook. Undo: revert it.
- W26 step 1, the names the theme takes: the source check's `LAYERS` is `SOURCE_LAYERS` (its export `layers`
  stays) and the expected files' `text` is `expectedText`, renamed by `scripts/rename.ts` on the gate's clone.
  eagle-design's own `roadmaps/tickets/ticketExpand.ts` imports `text`, so v0.5.0 asks a migration of it. The
  call: a repository holds a list of migrations, each run when its pin is before its release, in release
  order, so v0.4.0's stays for a checkout pinned before it and nothing retires. Undo: revert it.
- Gate on a48f904: the product's prettier wrapped three renamed source-check files (format:check red), and
  nine bundles and written homes moved by the renames alone; formatted on the clone, each a row of NEXT.
  Eagle-design's finding: T18's pointer in its requirement homes follows by a third edit of the migration.
  Undo: revert it.
- W26 step 2: the tokens module the build writes types a colour as `TokenHex`, the type the build side's
  module exports, so the theme copied here reads the same module. A product's committed `tokens.ts` takes the
  line at its build. Undo: revert it.
- The PM's pick (12 Nov, form · A): task 7's step 3 waits on the build side, which asks the PM's yes in its
  own session after its audit fix; meanwhile task 8's skeleton starts (`examples/sample-product`: its package,
  scope, `product.ts`, the contract's registries, its stack), its pages after the theme lands. Undo: the
  skeleton's commits reverted, task 8 starts after task 7 closes.
- Eagle-design approved the sample's way, with two guards. A migration names the files a home holds from its
  release on (`homed`): untracked, left on disk, the take writes them back; refused, naming the file, when a
  copy's text is not the home's, so an edit is never lost. The readiness checks leave `migrated.ts` for
  `migrationReady.ts`. Undo: revert it.
- Task 8, step 1: the roadmap's eight type files are homes at the paths eagle-design held them (copied by
  `git show` from its port's head, the same bytes as its `main`); its v0.5.0 migration `ROADMAP_TYPES` names
  them homed. The build writes `roadmaps/ids.ts`, which they read, so it is a row of the contract. Eagle-design's
  answers stand in `plan/sample-product.md`, with stage 4's step for the eight. Undo: revert it.
- Gate on 85845c5: green, 36 differences each said; eagle-design's v0.5.0 migrations: 3 edited, 8 homed. Task 8
  step 1 closed. The PM's word (12 Nov, chat): autonomy, decisions here, questions on `plan/state.md`.
