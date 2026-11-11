# Run WoW · 11 Nov · a clean way of working for the design side

The PM, 11 Nov: "ok, rob robote iteracyjnie po kazdym chunku wypisuj progress w hooku" and "teraz cel zrobienie
WoW zeby wyspawnowac nowy projekt designu juz na czysto tak zeby eagle design i argus design mieli to samo zrodlo
prawdy WoW-a". The plan in force is `plan/argus-first.md`; its build side (the plan's stage 4) is parked.

Held for the PM: the first push and every tag (a release), a merge, a snapshot retaken, a message to eagle-dev,
Argus's stack, the spawn of `argus-design`. The product repositories are read only from here.

## Progress

Printed by `~/.claude/hooks/runBars.py` (show · close <stage> <words>), never counted by hand in a reply.

| stage | what | done | of |
| 1 | Foundation | 3 | 7 |
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
  does (once a clone) and `lint:hooks`, in the commit tier, is red when git runs none of them. The gate holds
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
