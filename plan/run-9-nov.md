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
| 3 | Names | 0 | 6 |
| 4 | Tools | 0 | 8 |
| 5 | e2e | 0 | 4 |
| 6 | Port design | 0 | 4 |

## History
- 09:38 · stage 2 · 9 of 10 · R1-R3 runner fixes: strict flags, NUL names, eslint --fix on files staged whole (38d402e)
- 09:38 · stage 2 · 10 of 10 · step 2 verified ALL SAME, 50 expected; committed 38d402e

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

## Questions for the PM

- At the build side's port (eagle-dev's measure, 9 Nov): its 23 merges carry written subjects of 115–196
  characters (`Merge T-E18-00 · …`), and commitlint lets through only git's own merge forms. From its port a merge
  takes git's form with its summary in the body, or a written subject within 72: the PM's act (`git merge -F -`),
  so the PM's word, asked at that port. Its history is untouched (commit-msg reads new commits only).
