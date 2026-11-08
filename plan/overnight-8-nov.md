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
