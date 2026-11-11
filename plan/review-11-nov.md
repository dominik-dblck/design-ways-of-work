# Review and improvement plan · 11 Nov 2026

Written by the `WoW` session, the repository's owner since today (PM, 11 Nov · A), at HEAD `837b6db`.
Nothing in the repository or in a consumer changed for it. Every plan item waits for the PM's word (cowork).

The PM's aim (11 Nov): stability, scalability, fast work together, precision after; "we may have done too much
or too little"; and whether more patterns are worth adding. Each finding below is judged against that.

**Since then (11 Nov):** the plan in force is `plan/argus-first.md`, which replaces section 7's order and closes
section 8's first decision (eagle-design's port waits). Two lines here were mended after eagle-design's check:
B5 and E4 on what cuts the installed package, and C1's count of tags.

## Contents

1. The verdict
2. How the way of working works today
3. What holds well
4. Findings, ranked
5. Too much, too little
6. Patterns worth adding
7. The plan, ranked
8. Decisions for the PM
9. The two requests from eagle-design
10. What was measured, and what was not

## 1 · The verdict

- The rule system is the strong part: one rule, one row, one gate, held by a tool. Keep it as it is.
- The delivery around it is still the extraction's scaffolding. It proves one thing (eagle-design's outputs did not
  move) and it is used as the permanent gate. That is where stability and speed are lost.
- Today the gate is red: `port.patch` no longer applies to eagle-design `main`, so nothing can be pushed from here.
- The way of working is not product-agnostic yet: 68 files of `design/` import Eagle's files, and Eagle's facts
  sit in its code and documents. `shared/` is clean, so the build side's port is closer than a second design product.
- What is missing is small and cheap next to what exists: a gate that reads a consumer instead of a patch, a
  release tool, an owner's guide, a product of its own to run on.

## 2 · How the way of working works today

**What it holds** · four homes and one contract.

| home | files | what | where it lands in a product |
|---|---|---|---|
| `design/` | 283 | the design side's tools, checks, pages, skills, documents | the product's own paths (`design/tools/build.ts` is `tools/build.ts`) |
| `dev/` | 57 | the build side's rules as data, its folder map, part of its `.claude/` | `dev/` |
| `shared/` | 131 | what both sides run: the ESLint config and 20 rules of its own, 19 shared tests, the hooks and tiers, the take, the e2e framework, the shared rule rows | `shared/` |
| `design-system/` | 36 | tokens, fonts, the guide; one for both sides | `design-system/` |

A repository says what it is in one file, `scope.ts` (a `RepoScope`, 35 fields). Every tool and shared test reads it.

**How a product gets the files** · three mechanisms were built in three days; one is the product's.

1. Symlinks (8 Nov). Gone, though `README.md` still describes them.
2. Hard links. Only inside this repository's rehearsal copy, `.rehearsal/eagle-design`, for `verify`.
3. The take at a tag (9 Nov night). wow is a git dependency pinned to a tag; the product's `postinstall` copies the
   homes its `package.json · wow.takes` names onto its paths, untracked and excluded from its git; `yarn wow --check`
   says whether they are the tag's. It lives on eagle-design's branch `port/wow` only. `main` still tracks its own
   copy of every wow file.

**How a change is checked** · one ladder, the same on both sides.

```
a file written      edit hook            prettier, ESLint, cspell on that file
a chunk, a commit   check:chunk          the changed files, tsc, the repository's own commit checks   18 s here
a push              check:feature        the whole tree, knip, and here: verify
verify              scripts/verify.ts    a clone of the product against a copy with wow hard-linked and
                                         port.patch applied: 11 commands, dist/ and written files compared;
                                         212 differences listed as expected
```

**How a change reaches a product** · by hand: commit, push (verify), bump the version, tag, bump the product's pin,
install, take, the product's feature tier.

## 3 · What holds well

- A rule is one row naming one gate, and `everyRuleHasAGate` reads that the gate runs. Tools first (ESLint, tsc,
  ls-lint, knip, jscpd, cspell, syncpack), a test only for what crosses files.
- The tiers: each check has one place on one map, the commit tier has a stated budget.
- The take: it plans, refuses and records; it never overwrites an edited file; one record a worktree; tested.
- Generators run under `--permission` and are compared with a fresh emit. Baselines only shrink.
- wow's own code takes no directive and no suppression (`lint:kept`), and it is green today: commit tier 18.4 s;
  ESLint, knip, prettier, cspell, ls-lint, syncpack and tsc clean on the whole tree.
- Everything is TypeScript data; changes across files are made by scripts (`rename`, `move`, `codefix`).

## 4 · Findings, ranked

### A · The gate (stability, speed)

**A1 · wow cannot push today.** `port.patch` fails on eagle-design `main` (952bedf): five files
(`roadmaps/E19/E19Tickets.ts`, `fixtures/data/components.spec.json`, `app/styles/components.spec.ts` and two of its
parts). `verify` is this repository's feature tier, run by pre-push. Seen by rehearsing into a scratch folder.
The cause is the design, not the day: the gate reads a moving product's `main` through a stored patch of 2.3 MB,
16,498 lines, 144 files. The run notes record the same break on 9 Nov evening.

**A2 · The port is written twice.** `ports/eagle-design/port.patch` here, and the branch `port/wow` (590a2b0) in
eagle-design, built from it. The branch is 12 commits behind `main`. Two homes for one change, each going stale alone.

**A3 · `verify` stops working the day the port lands.** Its base is a `git clone` of the product. Once the port is
merged the clone holds no wow file (on `port/wow`, 916 files are tracked against 1,246 on `main`;
`tools/build.ts` is untracked), the patch is already in `main`, and `plan/inventory.tsv`, the static list of
`main` at 266822b that says which files to leave out, is history. No successor is built.

**A4 · wow does not check most of its own code.** Its tsc, ESLint, prettier, knip and ls-lint skip `design/`,
`dev/` and `shared/rules/`: 302 of 558 TypeScript files. They are checked only inside a product, by `verify`.
With A1, a change to `design/` is checked by nothing today. The cause: wow has no product of its own to run on
(`examples/sample-product`, phase 6 of the plan, not built).

**A5 · `verify` compares two different things.** The base is the product's committed HEAD; the copy takes the
product's working tree, and runs on wow's packages while the base runs on the product's. An uncommitted product
edit shows as a wow difference (eagle-design has a staged file now).

### B · Product independence

**B1 · `design/` imports Eagle.** 134 import pairs in 68 files land on files only a product holds: `sheet/contract`
22, `roadmaps/tickets.ts` 18, `sheet/cases` 17, `sheet/project.ts` 8, `sheet/logic` 8, `app/styles` 8 and more.
Phases 3 to 5 of the plan (named exports, `product.ts`) are not started. `shared/` and `dev/` import only the
product's `scope.ts`, which is the contract.

**B2 · Eagle's facts sit in wow.**
- `design/tools/layout.ts` names Eagle's capabilities as homes (`sheet/logic/approval`, `translation`, `delivery`,
  `assembly`, `document`, `agent`).
- `design/guards/checks/journeysPart.ts` lists its epics (`E00`…`E10`, `E18`), its featured ones and an `E14` exemption.
- `design/app/workspace/sheetStatus.ts` holds labels `MOVES IN E18` and `E10`.
- `design/docs/documents/ticket-pipeline/sharedSkill.ts` names `~/projects/eagle-design`, and the pipeline's
  documents cite Eagle's tickets as reasons (`why: T-E01-10`).
- `design-system/tokens/typography.ts` says "Eagle reads the DS scale".
- An epic or ticket id stands in 27 of 283 files of `design/`, 5 of 57 of `dev/`, 1 of `design-system/`, 0 of `shared/`.

**B3 · The test that holds the rule reads a corner of it.** `theWayOfWorkingNamesNoProduct` reads the generic
rules, the checklist and `docs/skills/*.ts`. It does not read `docs/documents/`, `guards/`, `tools/`, `app/`,
`dev/` or `design-system/`, and it takes the product's names from the product's own `sheet/project.ts`.

**B4 · wow's own scripts name the products.** `scripts/repos.ts` holds `../eagle-design` and
`../mailing-automation` (the second is being renamed `eagle`); four more scripts default to
`.rehearsal/eagle-design`; `verify.ts` runs eagle-design's script names (`ds-scan`, `spec-check`…);
`plan/expected-differences.tsv` and `plan/inventory.tsv` are Eagle's and carry no product in their path.

**B5 · A consumer installs the whole repository.** Nothing cuts the package: it is 7.9 MB with `plan/` (the PM's
words, Eagle's notes), `ports/eagle-design/port.patch`, `legacy/`, `tests/`, `scripts/`. A second product would
receive Eagle's port. What cuts it depends on E4: with a `prepare` script yarn 1 packs and reads `files`; without
one it takes `git archive`, which reads `export-ignore` in `.gitattributes` and never `files`.

### C · Rules held by memory, not by tools

**C1 · The release is done by hand.** 11 tags in 16 hours. Five of them fix what the product found in the tag
before (v0.1.2, .3, .4, .7, .9); two are tagging mistakes (v0.1.1 on v0.1.0's commit, v0.1.5 on a commit whose
push was refused, mended by v0.1.6). The lessons (the consumer's feature tier before a tag, never a commit piped before a tag,
push over HTTPS) are in one session's memory. There is no changelog: a consumer reads commit subjects.

**C2 · The owner's rules are not in the repository.** wow has no `CLAUDE.md`. The PM's rules for it (no stash, no
`--no-verify`, port-save before verify, no `sed -i` on linked files, scripts in the background, the modes) came to
me in a message, from another session's memory.

**C3 · Part of the way of working lives outside every repository.** Six Python hooks in `~/.claude/hooks/`
(`workMode`, `runBars`, `designRepoReadOnly`, `reviewRows`, `ticketRunKeepsTheTurn`, `e2eKeepsTheTurn`): not
versioned here, not TypeScript, not tested, not on a second machine.

**C4 · wow's decisions have no register.** The PM's picks of 8 to 11 Nov are lines in run logs; D28, D75 and D76
are rows of eagle-design's `decisions.ts`.

**C5 · What a consumer must hold is checked by nothing.** The eight root config stubs, the hook wiring in
`.claude/settings.json`, the scripts the tiers call and "the packages at the versions this repository pins" are
written by hand in each repository.

### D · One home, one job

- **D1 · `dev/` flows both ways.** `dev/rules` is written here (14 of its 18 rule files differ from
  mailing-automation's `docs/rules`, one is new). `dev/claude` and `dev/map` are copied from the build repository
  by `takeDevClaude` and `takeDevMap` (15 of 17 files still equal). Once the build side takes `dev/` from a tag,
  those copies make a loop. Each part of `dev/` needs one direction.
- **D2 · Two channels are written down for the build side's rules**: through the design product's release (plan,
  phase 9) and through the take (9 Nov night). And `dev` lands at `dev/`, not on the build repository's own paths
  (`docs/rules/`, `.claude/`), where `design` lands on the product's.
- **D3 · `plan/` holds notes and live inputs.** `inventory.tsv` and `expected-differences.tsv` steer the gate, yet
  the scope treats `plan/` as notes: unformatted, unspelled, unchecked.
- **D4 · The state is told in five files** (`plan/README.md`, `progress.md`, `eagle-notes.md`, `dev-notes.md`,
  `run-9-nov.md`), each a log with superseded lines left in. `README.md` describes symlinks; the plan's tree lists
  `design/registries/` and `examples/sample-product/`, which do not exist; `dev-notes.md` 7 and 8 rule out a
  dependency, which the take then became. The handover brief itself described symlinks and a `take-dev.ts` that
  is in `legacy/`.
- **D5 · Smaller:** the four husky hooks are written twice (`.husky/`, `design/.husky/`); `retired.ts` reads the
  presence of files in `legacy/` as its list, though `legacy/` is "frozen, out of every check".

### E · The scripts themselves

- **E1 · `rehearse.ts` deletes the folder its second argument names**, unchecked (`rmSync`, recursive, forced):
  `yarn rehearse ../eagle-design ../eagle-design` removes the product.
- **E2 · The gate has no tests.** 3 of 26 scripts have one (`mapTree`, `movePaths`, `retired`). `rehearse`,
  `verify`, `portSave`, `digests` and the three hooks have none.
- **E3 · A commit-tier check reads unversioned state.** `keepsItsRules` reads
  `.rehearsal/eagle-design/eslint-suppressions.json`; on a fresh clone that half passes without running.
- **E4 · Installing wow runs a second install.** wow's `prepare` script (`husky`) makes yarn 1 clone it and install
  all its devDependencies before packing, at each first fetch of a tag (yarn 1.22.22, `fetchFromInstallAndPack`).
- **E5 · The local `origin/main` is 14 commits behind the remote**: a push to the HTTPS URL moves no tracking ref,
  so `git status` reads "ahead" for work that is pushed.

## 5 · Too much, too little

**Too much**
- `verify` as a permanent gate. Byte equality with the product before the port was the extraction's proof, needed
  once. As a daily gate it costs 3.5 to 5 minutes (66 under load, per the run notes) and breaks on every product commit.
- A tag for every fix: the product is the first place a tag is tried.
- Five logs as documentation.
- Open, for the PM (decision 4): `RepoScope` has 35 required fields and no default; wow's own scope leaves 24
  empty, eagle-design's is 403 lines. It is explicit and it is a cost for every new repository.

**Too little**
- A product of its own (the sample), a typed product contract, a release tool, a changelog, an owner's guide,
  a decision register, tests of the gate.

**Not judged** · the ~300 rule rows and the 20 ESLint rules were not read one by one; their system was.

## 6 · Patterns worth adding

For the way of working itself (each is a plan item below):

1. **Consumer contract, ports and adapters.** wow reads a product through one typed `product.ts`, never by its
   file paths. The plan's phases 3 to 5 under their usual name.
2. **Reference consumer.** A blank product in the repository that passes every shared check; wow's own gate runs
   on it. It also gives the rule "a blank repository passes every shared check" its gate.
3. **Consumer-driven contract tests.** Before a tag, each consumer's own feature tier runs on the candidate, in a
   clone. The successor of `verify`.
4. **A release train.** Versions with a meaning (patch: no consumer action; minor: a new rule arriving with its
   baseline; major: the consumer migrates), a changelog as data, one script that does every step.
5. **Expand, migrate, contract.** A breaking rule ships with its migration script (`rename`, `move`, `codefix`
   exist) and a baseline that only shrinks, never as one cut.
6. **A decision register** as data, wow's own.
7. **A scaffold.** `spawn` writes a new product repository: its stubs, hooks, `scope.ts`, scripts.

For the code both sides write, candidates to measure before any is added:

- `react-hooks/rules-of-hooks` and `exhaustive-deps`: the build repository lints them today, the shared config
  names neither, so its port would lose them, and the design side's React runs without them.
- typescript-eslint's typed presets: the shared config takes `recommended` and a few typed rules by hand
  (`no-floating-promises`, `switch-exhaustiveness-check`, `no-deprecated`); `strictTypeChecked` adds the
  unsafe-any family and misused promises. Count the findings on both trees first.
- An accessibility lint (`jsx-a11y`): accessibility is held by a review today, not by a tool.

Already there, nothing to add: refusals as values, the store as a port, exhaustive switches, readonly data,
brands, barrels and tiers, one home per name, no import cycle, generated files held to a fresh emit.

## 7 · The plan, ranked

Costs are estimates of this session's working time. "Risk" is the risk for a consumer's tree.

| # | item | why | cost | risk | order |
|---|---|---|---|---|---|
| 1 | **The gate reads a consumer, not a patch.** `ports/<consumer>.ts` names its repository, ref and commands; `yarn consumers` clones each at that ref, takes wow from the working tree (`takeWow --from`), runs the consumer's feature tier and its outputs, and compares them with the same clone on its pinned tag; a difference is named in the release's changes. `port.patch`, the inventory and the hard links retire to `legacy/` when `port/wow` merges. `rehearse` refuses a target outside `.rehearsal/` | A1, A2, A3, A5, B4, E1 | 4–6 h | none: read-only clones | first; needs decision 1 |
| 2 | **`yarn release`.** Clean tree, commit tier, consumers, version, changelog row, commit, tag, push over HTTPS, tracking ref moved. The package holds the four homes alone: `prepare` leaves the manifest, `.gitattributes` cuts the archive | C1, B5, E4, E5 | 3–4 h | low: a consumer receives fewer files, the take reads the homes alone; proven by a pack listing and the take's test | before the next tag |
| 3 | **The owner's guide and one current state.** `CLAUDE.md` here (role, the PM's rules, the commands, the modes); `README.md` on the live mechanism; `plan/state.md` current, the logs under `plan/log/`; wow's decisions as data | C2, C4, D3, D4 | 3 h | none | with 1 |
| 4 | **Ready for the build side's port.** One direction for each part of `dev/`; `dev` lands on the build repository's paths; one channel for its rules; `ports/eagle-dev.ts`; the React hooks rules in the shared config; the consumer check on its port branch | D1, D2, B4 | 1 day here, then eagle-dev's port (its estimate: 1–2 days) | medium for eagle-dev: 14 rule files change words, new rules bring findings, each held in a baseline | after 1 and 2 |
| 5 | **A product of its own.** `examples/sample-product`: one epic, a command, a query, a refusal, a journey, a ticket; wow's tsc, ESLint, knip and tests run `design/`, `dev/` and `shared/` on it; `spawn` writes the same tree | A4, C5 | 1–2 days | none | before 6 |
| 6 | **The product contract.** `product.ts` typed here; the 134 imports go through it; Eagle's facts leave (the layout's homes, the epics, the status labels, the path, the ticket ids as reasons); the no-product test reads every home | B1, B2, B3 | 2–3 days | high for eagle-design: 68 files change their reads and the product exports to match; one release with its migration script | after the port lands and after 5 |
| 7 | **The harness in the repository.** The work mode, the run bars and the backup as TypeScript in `shared/hooks/`, tested | C3 | 0.5–1 day | low | after 3; needs decision 3 |
| 8 | **Tests of the gate.** The consumer check, the release script and the three hooks, each on a scratch repository | E2, E3 | 0.5 day | none | with 1 and 2 |
| 9 | **Lint candidates, measured.** Typed presets and accessibility counted on both trees, then decided | section 6 | 2 h to measure | none until adopted | any time |

What `plan/progress.md` leaves open keeps its place: the shared atomic components, the build side's skills as
data, cspell part 2, the stricter flags in the shared base and the e2e framework's port belong to item 4;
the spawn check to item 5; mutation tests wait on the PM.

## 8 · Decisions for the PM

One at a time, the first first.

1. **The port's one home, and wow's gate.**
   - A · the branch `port/wow` is the port; wow's gate becomes the consumer check (item 1) now, read against
     that branch until it merges, against `main` after. wow can push again without touching the product.
   - B · the patch stays the port until its release: it is re-saved on today's `main` now, and again whenever
     `main` moves; item 1 follows the release.
   - My pick: A. B keeps two homes and breaks on the next product commit.
2. **What comes after the gate and the release tool**: A · the build side's port (item 4), then the sample and
   the contract; B · the sample and the contract first. My pick: A: `shared/` is already clean, and a second
   consumer proves the delivery before the larger change to `design/`.
3. **The work-mode hook**: A · its source moves here, tested, and the PM installs it; B · it stays outside.
   No agent edits the installed hook either way (section 9).
4. **`RepoScope`**: A · every field stays required; B · named presets a scope spreads and overrides.

## 9 · The two requests from eagle-design

- **The backup at a commit.** It belongs here: generic, the repository's name read from its folder. The bundle
  half fits every repository now. The push half does not fit wow yet: a push runs pre-push, so every commit would
  start `verify` in the background on a tree still being edited. It fits once the gate reads a clone (item 1).
- **The work-mode flag.** It belongs here too, as TypeScript with tests, its false refusal of a command that only
  quotes the call mended in the source. It is the guard of the agents, so installing or changing the live hook is
  the PM's own act: eagle-design was refused an edit of it, and this session does not make that edit either.

## 10 · What was measured, and what was not

Measured at `837b6db`, eagle-design `main` 952bedf and `port/wow` 590a2b0, mailing-automation 5e2f802a:

- `yarn check:chunk`: green, 18.4 s. `lint`, `lint:exports`, `format:check`, `lint:words`, `lint:files`,
  `lint:deps`, `tsc` on the tree: clean.
- `node scripts/rehearse.ts ../eagle-design <scratch>`: `git apply` refuses five files.
- Imports of `design/`, `dev/`, `shared/`, `design-system/` resolved at their product paths: 134 pairs in 68
  files land on a file wow lacks; 21 more read `scope.ts`.
- Epic and ticket ids by the no-product test's own pattern, tests aside.
- The tags against `package.json`'s version and the remote; the installed package in `eagle-design-port`;
  yarn's source for a git dependency with a `prepare` script.
- `dev/rules/*.md` against mailing-automation's `docs/rules/`, `dev/claude/` against its `.claude/`.

Not done: a full `verify` (the patch does not apply); a line-by-line read of the rules, the ESLint rules, the
checks' parts and the e2e framework; any run inside a consumer. Read from the run notes, not measured here:
verify's times, the design copy's tiers (33 s and 64 s).
