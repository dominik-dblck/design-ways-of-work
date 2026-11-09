# Run D · 9 Nov · the way of working's steps 1–5, then the design port

The PM, 9 Nov: "leccie zatem z eagle dev, tak jak nocny run, podejmujcie decyzje, jezeli macie pytania zapisujcie,
dzialajcie autonomicznie, macie odpowiedzi" · progress after every finished part ("zebym mial historie progressu"),
held by the run hook (`.claude/run.json`). Held for the PM: a release, a page deleted, a snapshot retaken, the
product repositories (eagle-design through its port only, mailing-automation read only).

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

## Questions for the PM

- At the build side's port (eagle-dev's measure, 9 Nov): its 23 merges carry written subjects of 115–196
  characters (`Merge T-E18-00 · …`), and commitlint lets through only git's own merge forms. From its port a merge
  takes git's form with its summary in the body, or a written subject within 72: the PM's act (`git merge -F -`),
  so the PM's word, asked at that port. Its history is untouched (commit-msg reads new commits only).
