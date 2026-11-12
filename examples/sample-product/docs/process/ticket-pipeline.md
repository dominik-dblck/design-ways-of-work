# Ticket pipeline · three modes, seven skills, two shared files

> **Source of truth.** This file lives in the design project and is edited there, in conversation.
> The repository's `.claude/skills/ticket-*/SKILL.md`, `ticket/_shared.md`, `ticket/_code.md` and
> `roadmaps/templates/ticket-*.md` are derived from it — CC syncs them when this file changes and
> reports the diff; a lesson found on the repo side (`ticket-report` step 7) comes here first as a
> proposed line, and lands in the skill only after it landed here. Never edit a SKILL.md directly.
>
> **How the generator cuts this file.** A level-one heading whose whole text is a
> backticked repo path — `# \`.claude/skills/ticket-recon/SKILL.md\`` — names an output file; its
> section runs to the next `---` or the next path heading, and is written byte for byte, minus the
> heading line. A skill section opens with a fenced block holding `name:` and `description:`;
> the generator turns that block into frontmatter. A heading without a path (this one, *The flow*,
> *Templates*, *What the old skill held*) is prose and generates nothing. A template's section is
> one fenced `markdown` block; the fence is stripped. Fourteen outputs: 2 shared, 7 skills, 5
> templates (sync 6: three modes — ticket-contract, ticket-red, ticket-green and ticket-snapshot
> are gone, their rules that still hold moved into `_shared.md` and the modes).

Replaces `.claude/skills/ticket/SKILL.md` (632 lines, four actions). Three skills are modes — they
run a ticket and decide where it stops; four are blocks a mode calls. Every skill holds purpose, input,
steps, output, stop, and is measured in words: an entry at most 2000, a description says what and when in at most 1024 characters. Rules that hold at every stage
live once, in `_shared.md`, and every skill's first task is to read it; the rules for writing and reviewing
code live once, in `_code.md`. History lives in the ticket's
own documents; a skill carries a lesson only as a one-line rule tagged `why: {ticket-id}`. This source never
spells a retired command: the old actions are described by name, never as `/ticket …` (the repo's
`theOldTicketSkillIsGone` scan walks it).

```
.claude/skills/
  ticket/_shared.md            every stage
  ticket/_code.md              the stages that write or review code
  ticket-feature/SKILL.md      mode
  ticket-standard/SKILL.md     mode
  ticket-fast/SKILL.md         mode
  ticket-recon/SKILL.md        block
  ticket-arch-review/SKILL.md  block
  ticket-regression/SKILL.md   block
  ticket-report/SKILL.md       block
```

## Contents

- Sync · before every ticket
- The flow
- `.claude/skills/ticket/_shared.md`
- `.claude/skills/ticket/_code.md`
- `.claude/skills/ticket-recon/SKILL.md`
- `.claude/skills/ticket-arch-review/SKILL.md`
- `.claude/skills/ticket-regression/SKILL.md`
- `.claude/skills/ticket-report/SKILL.md`
- `.claude/skills/ticket-standard/SKILL.md`
- `.claude/skills/ticket-fast/SKILL.md`
- `.claude/skills/ticket-feature/SKILL.md`
- Templates · `roadmaps/templates/`
- `roadmaps/templates/ticket-recon.md`
- `roadmaps/templates/ticket-contract-snapshot.md`
- `roadmaps/templates/ticket-arch-review.md`
- `roadmaps/templates/ticket-regression.md`
- `roadmaps/templates/ticket-report.md`

## Sync · before every ticket

Lessons from ticket N land in this file after N's report and reach the repository before N+1's

- **An epic's own rows, cases and fields.** The sheet holds later epics' contract in the same files. Emit the types of every row; build route, decide and test only for rows of your epic and earlier; take the log's events and fields up to your epic — rows by `epic`, cases by `since`, payload fields by `Payloads.all({ upTo })` (`Payloads.fieldSince` lists them). A later epic's field inside your payload is never cut by hand: say so and the sheet marks it.
recon: the design side edits the source once (one digest), the build side re-copies the fixture,
runs `yarn skills`, and the byte-for-byte test is green before `ticket-recon` starts. The sync
rides in N+1's commit. No ticket starts on skills that are behind the source. The source changes
mid-ticket only for a gate's question, a red test or a PM requirement (rule:mid-build-change-is-a-requirement) — never
"while I am here" — and those changes are batched into one digest.

## The flow

Three modes. The pack names the mode on its second line (`track:`), and the build side runs that skill.
A stop is a review, never a question: in every mode a question is decided and written “did X because Y”
(rule:feature-run-never-stops); only `reconStop` turns the recon into questions.

| Mode | When | Steps | Stops |
|---|---|---|---|
| **feature** | every epic, one ticket `T-EXX-00` — chosen by being an epic, not by points | sync · recon (five passes, one at a time) · endpoint tests red + contract snapshot · domain and routes · screens · journeys · arch-review · regression · report | contract snapshot, report · with `reconStop` also after recon |
| **standard** | outside an epic, on a pattern that exists, 2 points or more | recon + contract table · red → green · arch-review + regression · report | after the recon, after the report |
| **fast** | 0–1 point: a token, a copy line, one field, a UI fix inside a row that exists | build from the pack · report | after the report |

**A mode only goes up.** A clause the repository contradicts moves fast to standard; nothing moves
standard further — full is gone. `reconStop` is set on the ticket where a guess
about rules or permissions costs most: the recon ends with a STOP and `## Questions` holds questions.
Arch-review runs before regression in every mode: it changes code, regression measures it.
— eight stages and five stops per ticket took 35–50% of the effort

**Stage 0 is the design side's and happens before the pack exists.** `refineCheck.ts` runs the
checklist lines a regex can read (1, 3, 4, 15, 17, 18, 20, 24, 28, 31, 32, 33) and `tools/pack.ts` cuts no
pack for a `todo` ticket with a finding — so a pack in `fixtures/packs/` is a ticket that passed them. The pack
carries `## Checklist, read` — every line the regex does not read (2, 5–14, 16, 19, 21–23, 25–27, 30), one clause each,
written by the design side at refinement. Recon **checks those clauses against the repository**
instead of answering the checklist from scratch; a clause recon cannot confirm is a **finding**, and
a finding on a checklist line is reported with the pick taken (rule:feature-run-never-stops) — or, under `reconStop`, sent as a
question; the sheet moves first and the pack is re-cut.

---

# `.claude/skills/ticket/_shared.md`

Rules that hold at every stage. Every skill's first task is to read this file; a stage that writes or
reviews code then reads `ticket/_code.md`.

## Contents

- The repository never writes to the design project
- How the sheet is read
- Every number is parsed, never read
- A question one side has the data for is answered there
- The pack is verified before every stage
- The line between the two sides
- When something does not work, say so
- A note is the current truth, never a chronicle
- No document repeats another
- One pass at a time
- Spellings that hold everywhere
- Decisions are written, design-side files compared
- The message shape

## The repository never writes to the design project

The design project is the git repository, a file named by its path from its root, read at
the commit the design session names — `release <full sha>`, tagged `release-<yyyy-mm-dd>-<n>`, never HEAD;
`git rev-parse release-<…>^{commit}` must equal it, or the run stops. A file comes through
`yarn sheet:cache {file} --commit <sha>` (`cat-file blob <sha>:{file}`), a list or a size from `ls-tree`. Only read
commands run there (`cat-file`, `ls-tree`, `rev-parse`; `log` or `diff --stat` between two named shas); a
PreToolUse hook refuses the rest. The claude.ai artifact is the PM's render, not read here.
The design session is the project's one writer (rule:build-side-never-writes-spec): `status` and `RECEIPTS` are set there, from the
report. What has to change there is sent to it with `SendMessage`, never as a file; a decision only the PM
can take goes to the PM.

## How the sheet is read

0. **The pack first.** `fixtures/packs/{id}.md` on the design side is the ticket row, its edges, its
   dependencies' receipts and the whole checklist in one file, with the module digest of `roadmaps/tickets.ts`
   it was cut from (its entry and parts, as the release's record gives it). One read; when the record's digest
   differs, window the ticket's epic part, `roadmaps/EXX/EXXTickets.ts`, alone. A pack may come in
   parts (`fixtures/packs/{id}.2.md` on): the first names them all, and the run reads every one before recon.
   `.sheet-cache/` is gitignored, so each stage reads the pack at the named commit with
   `yarn sheet:cache fixtures/packs/{id}.md --commit <sha>` before `yarn ticket:read`, which exits 1 naming
   the file when it is missing.
1. **The section, never the file.** A read-list entry is `module · section`, the module named by its
   short name and found at its path in the pack's table, The modules. Price a file by its size in
   `ls-tree -l`, then window the saved copy.
2. **Never re-read what you hold.** A file is read at the named commit, then its sha256 is checked
   against the digest you hold: equal, take the disk copy; different, it is a newer sheet. At a newer named
   commit, `git rev-parse <sha>:{path}` gives the blob id: a stage stops only when a file it holds
   differs. Each stage opens by comparing the pack's digest with the one last sent; a mismatch stops.
   `tickets.ts` is its entry and its parts: a ticket's row is in its epic's part, `roadmaps/EXX/EXXTickets.ts`.
3. **A ticket is read with the script.** `yarn ticket:read {id} <file>` finds the row,
   prints `acceptance.length`, diffs criteria against the pack the run started from, exits 1 when
   the pack is behind. Nothing else reads the sheet.
4. **Zero is not a count.** Before a negative result becomes a finding, make the same query find
   something that must be there.
5. **The design project is read once per stage**, at one named commit, through `yarn sheet:cache`
   into `.sheet-cache/`; every later read takes the disk copy. One commit is one digest: no reader meets a
   newer sheet halfway through a run

## Every number is parsed, never read

A count a test or a contract depends on is extracted mechanically — `acceptance.length`, a parsed
JSON grouped by kind, a fixture's own length — and checked against the criterion's literal. Nothing
sent is a number read from prose or a sentence quoted from memory; both are asserted by containment
against the file first.

## A question one side has the data for is answered there

A count over the tree, an import, a git log — if this repository holds it, the question is a
measurement made here, not sent.

## The pack is verified before every stage

The read list and EXPECTED FILES are derived from the sheet’s data; EXPECTED
FILES is a proposal recon confirms path by path. A pointer that does not resolve fails the cut on the design side.
The design side re-cuts the pack in the same move as any sheet edit and sends the digest with the answer.

## The line between the two sides

The design side says what — values as tokens, states, parts, a layout line, what is forbidden. This
side decides how — file, tier, props, DOM, MUI slot — from the repository's conventions. A test asserts
a value or a mechanism; a shape is checked by a reader at arch-review and snapshot, never parsed. A
criterion that says how is a finding at recon.

## When something does not work, say so

"I could not read X" is a fact about a tool call; "X cannot be read" is a claim about the world and
needs proof. Never route around a failure through the next-best source as if it were the named one.

## A note is the current truth, never a chronicle

When a later decision changes a fact an earlier note or D-row states, edit that row — never append a
superseding entry. Git holds the history; the reader holds one document.

## No document repeats another

Reading lives in the recon. Criteria and criterion → test live in the contract table (standard) or the
contract snapshot (feature). Counts live in the report. A section that appears in two of them is fixed with a pointer, not a copy. A code comment
follows `docs/rules/comments.md`.

## One pass at a time

Work that splits — the recon by area, the endpoint tests by row, the arch-review by step, the regression by
slice — runs as passes, one after another, in the main thread; no sub-agents for now. A pass is one aspect: it starts
from the pack's path, its aspect and the pass files before it, writes
`roadmaps/{epic}/{id}/passes/{stage}-{n}-{aspect}.md`, and only then does the next start. A pass sends nothing to
the design side. The stage's document is written from the pass files and points at them, never repeats them;
they go into the commit with it.

## Spellings that hold everywhere

- **A story quote is verbatim from backlog.ts.** If the story does not describe the ticket, quote it
  and add "placed here by the PM" — never paraphrase in a blockquote.
- **A file is named from the repo root** — `app/api/documents/createDocumentRoute.ts`, never `createDocumentRoute.ts`; scans and
  indexes match on the path (`tests/architecture/theDocsNameRealPaths.test.ts`).

## Decisions are written, design-side files compared

- **A file the design side authors is compared, never described.** Where a criterion names one, it is read
  at the release, hashed, and every count stated about it is parsed off the file
  (`tests/architecture/everyFixtureRootIsHeld.test.ts`).
- **A criterion that reads "X, or Y" is decided, never taken in silence:** the pick and why the other
  lost go into the report as “did X because Y”.
- **The decisions no criterion asked for** — every value, branch or shape chosen because the sheet was
  silent, one line each with `file:line` — open the report (feature: the contract snapshot for the
  contract's).

## The message shape

Whenever anything goes back, it is written as the message itself — English, fenced, sent whole to the design session with `SendMessage`,
with one line outside saying which gate it came from and whether it blocks. The block is
`roadmaps/templates/ticket-recon.md · ## Questions`: `{id} · {stage} · {n} question(s)`, then per
question — one line saying what cannot be decided, the sentence quoted with its file, what fires and
why both readings survive, a table (shape · against it · cost in code) over A and B, **Recommended**
with a check somebody can verify, **If it goes the other way**. Then, when non-empty: **Narrowings**
(decisions already taken, "say if wrong") and **Findings** (wrong in the sheet — one touching a
landed ticket names it: it costs a re-port). "Cleaner" is not a check.

---

# `.claude/skills/ticket/_code.md`

Rules for writing and reviewing code and tests, read after `ticket/_shared.md` by feature, standard, fast,
arch-review, regression and report. Recon does not read it.

## Tests

- **The test clause's kind decides when a test is red.** `test (domain)`, `(endpoint)` and `(architecture)`
  are written before the code and fail on their assertion first — not on an import or a type. `(app)` and
  `(browser)` are written after the code and run once against a planted fault. `(measured, date)` is no
  test: the report quotes the measurement. A test green before any code counts as red only through a control
  in the same test that fails on a planted input, and that red is quoted.
- **An app or browser test is trusted once it has been red.** The fault — the id removed, the branch
  inverted — and the red are quoted in the report before the fault is taken out.
- **A criterion's worked example is measured before a test is written to it.** An example is an
  assertion.
- **A test over the shared database runs five times under `--sequence.shuffle`** before it is called
  green, and the runs are quoted in the report.
- **A test on a span or a range asserts both ends.**
- **An inverse is emitted by whatever performed the transform, never inferred from its output.**
- **A body schema is emitted, never written** (`tests/architecture/theBodiesAreEmitted.test.ts`).
- **A check that only a hook runs is not a check.** A fixture root's own verifier is called by a test in the
  suite (`tests/architecture/everyFixtureRootIsHeld.test.ts`).

## Code

- **A name says what, never how many** (`tests/architecture/aNameSaysWhatNotHowMany.test.ts`).
- **A file a script generates goes into `scope.generated` the moment it exists.**
- **No comment describes the stage** (`tests/architecture/commentsAreInvariants.test.ts`).
- **A value a delayed read refreshes has a settling state the screen reads**, and its test asserts the
  screen after the write lands and before the read.

## Browser flows

- **A drag in the browser tier goes through `e2e/framework/dragging.ts`**
  (`tests/architecture/aDragGoesThroughTheFramework.test.ts`); a drag flow that stays green with its guard
  out leaves the catalogue.
- **A flow reads a refusal's sentence through `say(key, facts)`**
  (`tests/architecture/aFlowSaysARefusal.test.ts`).
- **When a ticket moves where a press lands, every flow that makes that press asserts the new landing.**
 

---

# `.claude/skills/ticket-recon/SKILL.md`

```
name: ticket-recon
description: Block, called by feature and standard. Cut the branch, read the sheet, write the reading. The calling mode decides whether it stops.
```

**Purpose.** Write down what the sheet was read to mean, and send back every place two readings
survive — before any criterion is transcribed, any test named, any code written. Questions come from
writing the fields out, not from reading sentences.

**Input.** `{ticket-id}`. Ticket is `ready`, not `blocked`; its `depends` are done.

**Tasks.**

1. Read `ticket/_shared.md`; before the first ticket of a session also `agent-instructions.md`,
   `plans.ts`, `glossary.ts`, `blockModel.ts`, `backlog.ts` (header), `commands.ts` (header),
   `events.ts` (the RUN)
2. Branch — `git switch acme-build && git pull --ff-only; git switch -c feature/{id}`
3. Read the ticket with `yarn ticket:read`, then every read-list entry, section by section
   A command ticket's body row is typed (`field: Type` on every field, `writes` named); a prose body
   is a Finding, never a schema to write.
   A UI component is its row in `componentsSpec.ts` (as the pack carries it): tokens, `parts`,
   `layout`, `muiPath`, `wrapper`. Nothing is inferred from prose or built without a row; a missing
   row is a question.
   The row is read, never synced: no test asserts it, counts it or scans a wrapper against it, and the
   copy is never edited to pass one; the look is the repo's and the PM checks screens by hand.
  
   A grouping or count the sheet may already hold is looked up first: `Object.keys` of every spec
   module the ticket reads, printed into the recon, before one is derived here.
3a. Read in passes where the read list splits, one at a time (`_shared.md` · One pass at a time): a pass per
   area, from the pack's path, its area and the pass files before it — packages/domain, app/api and
   app/services, the screens and components, the tests and fixtures, and the pack against the repository (the CHECKLIST_READ lines). Each
   writes `passes/recon-{n}-{area}.md` in one shape: confirmed · contradicted · question, each with file:line.
   The main agent writes the recon from the pass files; a pass sends nothing to the design side. A read list
   of under six files is read alone.
4. Write `roadmaps/{epic}/{id}/recon-{id}.md` from `roadmaps/templates/ticket-recon.md`. Its
   headings, in order, each filled:
   - `## The reading` — one row per thing the ticket builds (type, payload, operation, rule) and
     what the sheet was read to mean for it; where a field's source is not the criterion, name it
   - `## What the repository already holds` — the actual lines, with paths. The reader cannot see
     this repository; "or keep the current shape" is unanswerable there
   - `## What has been measured` — behaviour established by running it, not reading a doc
   - `## Questions` — message shape from `_shared.md`, each with its cost in code
   - `## Narrowings` — decisions already taken because one reading was the only one left
   - `## Findings` — wrong in the sheet; a finding on a landed ticket names it
   - `## What this ticket does not do` — what a reader would expect, and the ticket that has it
   - `## What the checklist asks` — the pack's `## Checklist, read` clauses, each **confirmed or
     contradicted against the repository**, one line each; the regex lines are the pack's own
     receipt (`refine-check · clean`) and are not re-answered. A contradicted clause is a finding.
     Lines 18 and 19 are listed as due at red and snapshot.
5. Count: how many criteria name a key the reading table holds, and how many rows no criterion
   names.
5a. A criterion that forbids a shape is grepped against the landed tests that build that shape; each
   hit is a question under `## Questions`.
5b. A criterion that reads every row of a table is run against `content_test` here, and each row
   shape it meets is named under `## What has been measured` with a count.
5c. An ordering word in a journey ("newest first", "last") names the stored field that orders it; a word
   with no field is a question under `## Questions`.
6. Present the recon to the calling mode

**Does not.** Name a test or write code (standard appends its contract table to this file).

**Stop.** The calling mode decides: standard and a `reconStop` feature stop here; a feature without it goes on.

**After the answer.** Answers arrive as edits to the sheet or as new criteria on the ticket — never
as edits to the recon. The recon is not rewritten; the next step reads the sheet again and a
reading-table row the answer contradicted becomes a finding there. An answer that opens a new
question → one more message, same shape, before the next step.

---

# `.claude/skills/ticket-arch-review/SKILL.md`

```
name: ticket-arch-review
description: Block, called by every mode that reviews. Is the code built the way this repository builds things. A finding that is a choice is decided and reported.
```

**Purpose.** Read the diff against the patterns, not against the specification — that is the
report's reader's question. This stage may change code; regression follows it because of that.

**Input.** The ticket's tests green.

**Tasks.**

1. Read `ticket/_shared.md`, then `ticket/_code.md`
2. Run `/architecture-review` on `git diff acme-build` — its own steps in
   `.claude/commands/architecture-review.md` (layers touched → patterns for those layers only →
   types-tightening sweep first → patterns → rest of types-eval → tests-eval → ux-eval on UI diffs →
   cross-cutting smells → findings with citations → decision table)
   The rule files it reads are the repository's map, `docs/rules/README.md`: the pipeline names none
3. Sort every finding into one of three:
   - **fix** — the pattern is clear and one answer survives → fixed here, `## Notes`
   - **keep** — the pattern does not apply and the reason is a check → kept, `## Notes` with why
   - **decided** — two readings survive, or the fix moves a criterion or a landed ticket's port →
     the pick taken, written “did X because Y” with the cost in code of each option, for the report (rule:feature-run-never-stops)
3a. **A value with two writers is a finding.** A value the server renders and the client also writes
   has two owners, and the later write wins in silence — name the one owner (plans.ts · RULES, one
   owner per value).
3b. **A fix that changes what an endpoint answers is a contract row**, or it goes back as a question
   naming the row it needs.
4. Re-run the ticket's own tests after fixes
5. Write `roadmaps/{epic}/{id}/arch-review-{id}.md` from `roadmaps/templates/ticket-arch-review.md`.
   The file is what the design project reviews, so it carries the command's output whole, not a
   summary. Its headings, in order, each filled:
   - `## Architecture Summary` — layers touched, patterns loaded, context gaps, as the command emits it
   - `## Findings` — every one as the command emits it: Source `[file → Section]`, Severity
     (`CRITICAL` / `HIGH` / `UNCERTAIN`), File `path:line`, Rule, Why, Fix hint. English. Max 25,
     or "No violations found"
   - `## Decision table` — always, in the language of the repository (English), not of the
     conversation: `#` (`⛔` CRITICAL only,
     `❓` UNCERTAIN) · What it is · How it is now (measured number where there is one) · How it will
     be. One line under it: which findings collapse into one change, which are decisions
   - `## Disposition` — per finding: fix / keep + why / question, each pointing at its Decisions or
     Notes entry. `UNCERTAIN` is always decided and named in the report
   - `## Decided` — one “did X because Y” each, or "none"
   - `## Files changed by this stage` — path, and which finding
   - `## Tests after` — the ticket's count, from the runner
   Every count in the file (rows, criteria, assertions, tests) is read from
   the runner's output, never typed.
6a. **The row → `it(…)` grep runs here, not only at the report.** This stage renames tests; the
   report is four stages later. After the fixes, every contract row's title is grepped against the
   suite and a stale one is fixed in the same turn.
6b. **The fixes run before the stage is presented:** `yarn tsc`, the architecture project and one
   `yarn e2e`; a type import counts as a door.
6c. **A component moved between tiers moves its spec row in the same change:** `spec-check` over
   `app/styles/componentsSpec.ts` reads 0 before the stage is presented.
7. Hand the file to the calling mode; the report names it

**Stop.** None of its own — the calling mode decides. The file travels with the report: the code
differs from the first green by exactly what this step changed. The whole file is in the repository's
language; a half-Polish table is two documents.

A gate that cites a section of a doc is read against that section; a cited heading the doc no longer
holds is a finding (grep the heading).

The row → title grep of 6a reads a browser row against the catalogue's `name`, not only `it(…)`. Check: every e2e row's title equals one catalogue name.

**Template.** `roadmaps/templates/ticket-arch-review.md`, below under Templates.

---

# `.claude/skills/ticket-regression/SKILL.md`

```
name: ticket-regression
description: Block, called after arch-review. Did the sheet move, did the suite stay green, did this ticket change what a landed ticket does. Every section goes to the report.
```

**Purpose.** Three measurements. The third is the one a green suite cannot give: a landed ticket's
behaviour that nobody tested and this ticket touched.

**Input.** Arch-review complete.

**Tasks.**

1. Read `ticket/_shared.md`, then `ticket/_code.md`
2. **Spec drift** — `yarn ticket:read` against the pack the run started from. Exit 1 → list which criteria moved and what
   it means for tests already written
3. **Suite** — full `vitest`, all projects. Any red outside this ticket's own tests → listed with the
   owning ticket from `receipts.ts` · a test file the suite excludes is run once here and its result written: every entry of the projects’ `exclude` stands in the pass file with its result.
   · **coverage** reads the criteria of every part the pack merges, not the ticket’s alone: each meets a passed test by file and title, or stands in that part’s `uncovered`.
4. **Touched outside scope** — `git diff --name-only acme-build`; a ticket row has no
   file list, so scope is derived: a file is inside if a criterion or a contract row names it, outside
   otherwise. Every outside file → `git log` names the ticket branch that last wrote it → that
   ticket's criteria on the file re-read against the new code. Each: unchanged / changed (how) /
   needs re-port.
4a. **A scan found skipping a file kind or a folder is fixed with every scan that walks the same
   way:** each architecture scan's roots and endings are grepped, and each that lacks the kind is
   named in §3.
4b. **A scan over a set the code declares reads the set off its declaration** and asserts each member is
   caught; a hand-typed list of names a source file declares is named in §3.
5. Write `roadmaps/{epic}/{id}/regression-{id}.md` from `roadmaps/templates/ticket-regression.md`.
   Its headings, in order, each a count or `0`:
   - `## 1 · Spec drift` — step 2
   - `## 2 · Suite` — step 3
   - `## 3 · Touched outside scope` — step 4
   - `## Re-ports needed` — the count, the causes as a legend and the path of `re-ports-{id}.json`, or
     `none`. One row per re-port, `{ ticket, file, where, cause, find, replace }`: `find` copied from
     `.sheet-cache/{file}`, never typed, found once in that ticket's row; `file` is the path from the root,
     a row's epic part `roadmaps/EXX/EXXTickets.ts` — `yarn reports:check`
     checks every row before the report.
   - `## 4 · Beyond the suite (when the ticket moved a rendered value)` — the A/B shape
6. Present: `{id} · regression · drift {n} · suite {n} red · touched {n} files, {n} re-ports`

**Stop.** None of its own — the calling mode decides. A non-zero section goes to the report with
the re-ports file: the design side applies it by script (`tools/applyReports.ts`), and receipts are the design project's.

The criteria §3 re-reads are the sheet's at the release's commit (`git cat-file blob <sha>:{path}`), never a cached copy. Check: the digests named in §1.

A word the ticket renames is grepped in every scan's own word list, and a list behind it is fixed in the same pass. Check: the old word in `tests/architecture/` stands only in quoted criteria.

---

# `.claude/skills/ticket-report/SKILL.md`

```
name: ticket-report
description: Block, the last step of every mode. One of three shapes, the receipt, the lessons. Stages and stops — never commits, merges or pushes.
```

**Purpose.** A claim sent once, in a shape the board can check. Then three separate approvals —
commit, merge, push — each reversible on its own.

**Input.** The mode's last step before the report done.

**Tasks.**

1. Read `ticket/_shared.md`, then `ticket/_code.md`
2. Open with the decisions no criterion asked for (`_shared.md` · Decisions are written), one line
   each with `file:line`
3. `yarn ticket:read` — criteria diffed against the pack one last time.
4. Grep every contract row against the `it(…)` titles the suite holds.
5. Write the report, one shape only:

   ```
   {id} · done            {id} · blocked                  {id} · spec wrong
   tests: {n} green       found: …                        criterion: "…"
   notes: —               where: file · section           contradiction: …
                          need: a decision on …
   ```

6. Receipt — parsed, never estimated, never copied from a placeholder:
   `'{id}': { criteria, tests, skipped: ['n · why · waits on'], uncovered: [], at: 'YYYY-MM-DD' }`.
   `criteria` is how many the ticket held when read, not how many were built to
6b. **The repository.** Every report, any shape, ends on the repository whole at its commit, each number
   from the repository’s own tools, never estimated; one its tools cannot give is `—`:
   `repository: {sha} · tests {n} ({m} skipped) · e2e {n} · coverage at {sha}: lines {n}% branches {n}% functions {n}% statements {n}%`.
   `tests` is `yarn test`’s passed and skipped, `e2e` the total `yarn e2e --list` gives; coverage is the last row
   of `roadmaps/coverage/history.jsonl` and names its own sha, a fresh `yarn test:coverage` taken at a feature’s end.
   The receipt carries the line as `repository`.
6a. **The spec copy.** A run that moved a component — a new one, a tier, a wrapper, what a row composes —
   attaches `app/styles/componentsSpec.ts`, written on the sheet’s spec as fetched for the run, never on
   an older copy here. The tree writes what it holds: tier and wrapper from the folder, each part’s kind,
   what a row composes from its imports, and a component the run built from its code (MUI imports, props,
   layout). Every field the tree cannot see stays as the sheet wrote it: words, notes, tokens, `wireframe`,
   `live`, `fingerprints`, `tests`, `changedIn`. Every row added, moved or renamed is named; the sheet
   takes the file whole (SP1).
7. **Lessons** — for every `## Notes` entry that names a stage: can it be one rule with a check?
   Yes → one proposed line for that stage, tagged `why: {id}`, in the report under `## Lessons` —
   it goes to the design project's `ticket-pipeline.md` first and reaches SKILL.md by sync, never
   directly. No → it stays in Notes; it is a story. Zero entries → "no lessons"
7a. **The track** — the one the pack names and the one the ticket ended on, each with its points.
  
8. Write `roadmaps/{epic}/{id}/report-{id}.md` from `roadmaps/templates/ticket-report.md` — the
   report shape verbatim at the top, then its headings, in order, each filled:
   - `## Receipt` — step 6, and what the count is made of
   - `## Decisions no criterion asked for` — step 2
   - `## Re-ports` — `re-ports-{id}.json` from the regression's `## Re-ports needed`, or `none`
   - `## Lessons` — step 7
   - `## Cost` — per step, what the session showed: context tokens at the stage's end, minutes,
     reads of the sheet. A measurement, not a budget — nothing here fails on a number
   - `## Commit` — branch, staged count, message
   Update `epic-notes.md`
9. `git add -A`, show what is staged, present the commit message
   (`{id}: {one line} · {n} tests green`, at most 72 characters with the id and the count: `checks.md`) and
   the branch. Every test file the receipt counts is staged —
   a test the report names and the commit leaves out is a criterion with no test in the tree.
   Repo-wide changes — skills, docs, patterns
   — ride with this ticket
10. **STOP.** No `git commit`, no `--amend`, no `--no-verify`. Commit, merge into
    `acme-build`, push are three separate yeses, and nothing is pushed mid-ticket

**Stop.** Always.

**After the answer.** `done` → wait for the commit yes, then the merge yes, then the push yes; each
arrives on its own. `blocked` → wait for the decision, then back to the stage the block names
(usually the build step). `spec wrong` → the sheet is fixed there; back to the mode's build step for
the affected rows, each test seen red again. Never a second report until the first is answered.

---

# `.claude/skills/ticket-standard/SKILL.md`

```
name: ticket-standard
description: Mode, outside an epic on a pattern that exists. Four steps, two stops: after the recon and its contract table, after the report.
```

**Purpose.** A ticket whose pattern a landed ticket set, in four steps. Nothing the old stages checked
is dropped; the rules they held are in `_code.md`.

**Input.** `{ticket-id}` with `track: standard` on its pack.

**Tasks.**

1. Read `ticket/_shared.md`, then `ticket/_code.md`
2. **Recon and contract table, one message.** `ticket-recon`, then `## Contract` appended to the same
   file: criteria **verbatim**, criterion → test → file, one row each, test names as `it(…)` will say
   them; every criterion owns a row, every row one criterion; one Counts line under the table, the only
   place a count lives. A pipe in a criterion is `&#124;`. A gap is decided and written “did X because Y”
   beside its row. Present and **STOP** — the design side reads the table before code.
3. **Red → green, no stop.** Every test seen red once, by its kind (`_code.md`); the report lists each
   red run. A question is decided and written for the report (rule:feature-run-never-stops).
4. **Arch-review and regression, one pass.** `ticket-arch-review`, then `ticket-regression`.
5. **Report.** `ticket-report`. **STOP**.

**Does not.** Change its own mode down, or move to another mode for a question — it decides.

**Stop.** After task 2 and after task 5.

---

# `.claude/skills/ticket-fast/SKILL.md`

```
name: ticket-fast
description: Mode, 0–1 point. A small ticket, no recon. Build from the pack, then report. One stop, plus any question.
```

**Purpose.** A token, a copy line, one field, a command generated off the sheet, a UI fix inside a
spec row that exists. The pack is the whole reading.

**Input.** `{ticket-id}` with `track: fast` on its pack.

**Tasks.**

1. Read `ticket/_shared.md`, then `ticket/_code.md`
2. Branch as `ticket-recon` task 2, read the ticket with `yarn ticket:read`
3. **Build.** Tests for every criterion, each seen red once; the whole suite and every scan at zero.
   A clause the repository contradicts, or a criterion that reads two ways, stops here: write it as a
   question and the ticket moves to standard.
4. **Report.** `ticket-report`, with the criterion → test table as a section. **STOP** — merge waits for the design side's yes on the report.

**Does not.** Write a recon or a contract table, or merge before the yes.

**Stop.** After task 4, and on any question.

---

# `.claude/skills/ticket-feature/SKILL.md`

```
name: ticket-feature
description: Mode, every epic. A whole epic in one run — recon in passes, endpoint tests red from the contract’s cases and a contract snapshot for review, routes, screens, browser flows, arch-review and regression in passes, one at a time, one report. Never stops for a question — decides and says why. Stops for a digest that differs, the contract snapshot and the report — and after recon when the pack carries reconStop.
```

**Purpose.** Build every part of a feature ticket on one branch without stopping between stages. The
contract is the sheet: the `commands.ts` and `queries.ts` rows with their `checks` and `cases`, and
`api-convention.md` for what every endpoint shares. The ticket’s scenario criteria are the browser tests.
Every reply opens with two progress lines: the run's and the part in
hand's (`endpoint tests · 12 z 12 ▓▓▓▓▓▓▓▓▓▓▓▓`), and a turn ends only on `⏸️ stop:` naming one of the
stops above, or `⏸️ e2e:` while a browser run holds the machine (the repository's Stop hook holds the rest).

**Input.** `{ticket-id}` of kind `feature`, track `feature`; its `depends` are done.

**Tasks.**

1. Read `ticket/_shared.md`, `ticket/_code.md`, the pack with `yarn ticket:read`, `api-convention.md`, and every row the read list names
2. Branch — `git switch acme-build && git pull --ff-only; git switch -c feature/{id}`
2a. Sync the contract before recon reads it: re-copy every sheet file the pack names that the repo holds as a
   fixture (`commands.ts`, `queries.ts`, `refusals.ts`, `events.ts` …) verbatim at the pack’s digests, update
   `hashes.json`, run the emitter (`commandBodies.ts`, `queryIds.ts`, `queryParams.ts`) and add the test that
   compares the emitted files with a fresh emit. A copy that differs from its digest stops
   the run. The types the emitter writes are the ones the snapshot shows
3. Recon in passes: `ticket-recon`’s steps 3–5b and its template, five passes by area, one at a time (its 3a) —
   packages/domain · app/api and app/services · the screens and components · the tests and fixtures · the
   pack against the repository (the CHECKLIST_READ lines) — each reading its area once and answering per
   part. Write `roadmaps/{epic}/{id}/recon-{id}.md`. What differs in a feature run: its step 6 (STOP) does
   not apply; `## Questions` holds each one as “decided X because Y”, and a decision on the contract goes
   into the snapshot (rule:feature-run-never-stops); a shape no row names follows step 6 here, not its step 3 (rule:unnamed-shape-built-not-stopped); a
   contradicted checklist clause is decided and reported, it blocks nothing.
3a. **`reconStop`.** When the pack carries it, the recon ends here with a **STOP**:
   `## Questions` holds questions in the message shape, not decisions, and the run waits for the answers
   on the sheet.
4. Endpoint tests first: one test per test case of every row the ticket names — `<Endpoint>.case.<slug>` and
   `<Endpoint>.refusal.<key>` as `testCases.ts` names them, the id in the test’s title — plus the shared edge
   cases of `sharedCases.ts` (`.shared.<id>`; `api-convention.md` gives each its reason), written a pass per endpoint, one at a time; then run once, every one red.
   Then the one stop of the run that is not a question: write `roadmaps/{epic}/{id}/contract-snapshot-{id}.md`
   from `roadmaps/templates/ticket-contract-snapshot.md` — `## Types` · `## Endpoints` · `## Decided` ·
   `## Differs from the sheet` — and send it to the design session with `SendMessage`:
   - the types written, verbatim TypeScript, each with its file: brands, bodies, answers, refusal keys
   - per endpoint: method and path, who may call it, the body type, the answer as a union of every case,
     the refusal keys with their lines, and the titles of its red tests, one per case
   - every decision the sheet did not make, as “did X because Y”: a case, a field, a refusal, a query
     parameter; a new event or payload key marked NEW EVENT, because the log keeps it once merged
   - what differs from the sheet and why
   - **The snapshot gives every criterion of every merged part a row:** its test by file and title, or
     `not built` and why · check: the rows’ criteria equal each merged part’s `acceptance`, read off its
     shard.
   Wait for the review's answer; a moved row comes back with its digest and the tests move with it
5. Domain and routes, part by part in the ticket’s order; green per part
6. Screens from their `componentsSpec.ts` rows, read beside the wireframes; the row is read, not synced
   (rule:the-look-is-the-repos). A shape no row names: inside one organism, compose it from the atoms and molecules that
   exist, by the wireframes and the repo’s conventions, and list it under what was guessed. A new global
   atom or molecule is built the same way and reported on its own — what it is, where it lives, why no
   existing one served; the design side writes its row after the report. Neither stops the run (rule:unnamed-shape-built-not-stopped).
   No test is written before a screen — the journeys follow it
7. Browser flows through the e2e skills, without their stops: `e2e-discovery` extends each screen’s
   catalogue from the ticket’s journeys — one entry per journey, its `expectedResult` the journey’s check. A
   journey is a row of `journeys.ts` in the pack: steps `[where, does, sees, covers]`, one Playwright flow per
   journey under `e2e/`, the file named by the repository’s own rule, its title opening with the journey’s id; `covers` names the test cases a step
   makes happen and stays in `journeys.ts`, the flow’s catalogue entry listing the journey’s cases whole; a case the
   sheet does not hold, met while writing the flow, goes on the entry as `added: [{ step, case, why }]` and in the report,
   and the sheet writes it after the report; `{refusal:key}` is that refusal’s line from `refusals.ts`, never copied, and `{say:key}` the screen’s word from `messages.ts` (a label, else a screen line) —
   groups them into categories and runs its own check (step 7), what it changed going to the report; then
   `e2e-category`, one category at a time, the gate listed and run, each flow seen red once on a planted
   fault (3d) and then green. A category still red after the skill’s retry is `blocked` in
   `roadmaps/e2e/{screen}-status.md` and goes to the report; the run does not stop for it
   The matrix: `e2e-discovery` builds each screen’s matrix — every press ×
   every role × every kind of path (the main path, each refusal, the ways out, a lost answer, signed out) —
   and the journeys are cells of it · the step is done when the four e2e gates are green:
   everyRoleHasAFlow, everyPathIsWalked, theStatusFileHolds, e2eReachesByTheRegistry · why: the catalogue
   built from the journeys alone left legal, reviewer, signed-out, the ways out and a lost answer untested.
8. Arch-review in passes: `.claude/commands/architecture-review.md` split by its steps, one pass per
   step, each over the whole diff against `acme-build` plus the working tree. The main agent
   runs STEP 0 once (the layers touched, the context gaps) and hands its answer to each of the five, in turn:
   - STEP 1 · can the types be tighter — `types-eval.md`, the first pass
   - STEP 2 · the loaded patterns (only the touched layers') and the cross-cutting smells
   - STEP 3 · the rest of `types-eval.md`
   - STEP 4 · the tests — `tests-eval.md`
   - STEP 5 · the UI — `ux-eval.md`, the 12 checks, read beside the wireframes the pack names; skipped in
     one line when no UI moved. Where a check and the sheet disagree, a PM decision with its edge holds and
     the finding cites the edge: Move to trash asks nothing because Restore stays on the row
   Each answers in the command's finding format, with its citation. The skill restates none of the
   command. The main agent merges the five pass files into one
   `roadmaps/{epic}/{id}/arch-review-{id}.md` from `roadmaps/templates/ticket-arch-review.md`, in the command's output format —
   one Architecture Summary, at most 25 findings with duplicates across steps folded, one decision table —
   applies the fixes the sheet's rules decide, re-runs the suite; an UNCERTAIN or a finding that
   needs the PM goes to the report, and the run does not stop for it
9. Regression in passes (ticket-regression), one pass per slice, one at a time: the suite and `tsc`; drift of the
   pack’s digests; the files touched outside scope, grouped by owning ticket, each verdict with file:line
   (unchanged · changed, criterion holds · re-port); the architecture scans that still run (spec sync is
   off, N40). The main agent checks the verdicts against the diffs and writes
   `roadmaps/{epic}/{id}/regression-{id}.md` from `roadmaps/templates/ticket-regression.md`
10. Report on `roadmaps/templates/ticket-report.md`: a receipt per part (criteria, green), what differs
   from the contract and why, every decision the sheet did not make as “did X because Y”, re-ports, cost, and the spec copy (`ticket-report` 6a). The run makes no commit; the PM approves one commit at the end, then the push and the merge

Arch-review runs before regression: it changes code, regression measures it.

**Rules.** Events and payload keys come from `events.ts`; a new one is decided like any gap and marked NEW EVENT in the snapshot, because the log
keeps it forever. A pass reads, tests and writes its pass file; the main agent writes the stage documents and the
report from them. Keep the context small: one aspect per pass, never two passes at once.

---

# Templates · `roadmaps/templates/`

One per document that leaves the repository. Each mirrors its skill's steps; a section the skill does
not ask for does not appear. Lessons are `why:` tags, never paragraphs.

Five files, each its own section below, each a heading that is its path.

---

# `roadmaps/templates/ticket-recon.md`

```markdown
# {TICKET-ID} — recon

> Epic: {epic id} {epic name} · Story: {story id} {story title} · Kind: {kind}
> Read at: {date} · read {n} of the ticket · {n} criteria (acceptance.length)
> Branch: feature/{id}, cut from acme-build @ {sha}
> Status: read, before any code

> Not a contract: no criterion transcribed, no test named, no line coded. Written for a reader who
> cannot see this repository — lines quoted with paths, every question priced in code.

## Contents

- The reading
- What the repository already holds
- What has been measured
- Questions
- Narrowings
- Findings
- What this ticket does not do
- What the checklist asks

## The reading

One row per thing the ticket builds. **S** = the sentence or line the criteria point at ·
**B** = a second source the criteria name, if the ticket has one · **R** = the rule computed it.

| What it builds | What it holds | Not named by the first source |
| -------------- | ------------- | ----------------------------- |
| {name}         | {fields}      | {field} · **B** / **R**       |

The third column is the point of the table. A field with no source is either a question below or a
thing this ticket is inventing, and inventing is what recon exists to catch while it is still text.

## What the repository already holds

The code this ticket touches, contradicts or has to keep working — quoted, so the reader can decide
against it rather than against a description of it.

### `{path/to/file.ts}` · {what it is, in one line}

```ts
{the actual lines}
```

{What it does today, and what this ticket would do to it.}

## What has been measured

Behaviour established by running it rather than by reading a doc — a library's real answer, a type
that does not narrow, a cycle that does not resolve. Written down because the alternative is a
guess, and the design project has no way to check one.

| Measured       | Result                     |
| -------------- | -------------------------- |
| {what was run} | {what came back, verbatim} |

## Questions

One per place two readings survive. A question with no recommendation is work handed back; a
recommendation with no reason is a guess wearing a suit.

### Q1 · {one line saying what cannot be decided}

> "{the sentence, quoted, with the file it is in}"

{What fires, and why both readings survive.}

|              | A · {name}                                                                      | B · {name}      |
| ------------ | ------------------------------------------------------------------------------- | --------------- |
| shape        | {fields}                                                                        | {fields}        |
| against it   | {what it costs}                                                                 | {what it costs} |
| cost in code | {which file changes, which landed ticket's port moves, which test is rewritten} | {same}          |

**Recommended: {A or B}**, for reasons that are checks rather than preferences: {reason}.

**If it goes the other way:** {the field, test or type elsewhere that changes}.

## Narrowings

Not questions — decisions already taken because one reading was the only one left. Cheap to reverse
now, expensive after code is written against them. Say if either is wrong.

1. **{what was narrowed}.** {The reading taken, and why the other did not survive.}

## Findings

Not questions — things that are wrong in the sheet rather than ambiguous. They go back whether or
not this ticket needs them answered.

1. **{what}.** {The evidence: where it is named, where it is produced, and which of the two is
   missing.} {If it touches a ticket already landed, name it — that one costs a re-port.}

## What this ticket does not do

Settled here rather than in the contract, because a reader who expects something should have that
expectation settled before the criteria are agreed, not after.

| A reader might expect | Where it actually is |
| --------------------- | -------------------- |
| {thing}               | {ticket}             |

## What the checklist asks

`plans.ts · TICKET_CHECKLIST` — every line, each one a mistake an earlier ticket made; the count is
read off the file, never typed here. Answered here, because nothing on this side read
them before and every one of them is cheaper now than later.

**The pack already answered the regex lines** (1, 3, 4, 15, 17, 18, 20, 24, 28 — `refineCheck.ts`,
rule:regex-lines-run-as-code); its header says so and this table copies that line, it does not re-answer them.
**The reader's lines are the pack's `## Checklist, read` clauses**, and this table confirms or
contradicts each one against the repository. **A contradicted clause is a finding, decided and
reported (rule:feature-run-never-stops) — or, under `reconStop`, a question.** Two fall due later and are still written here, with the stage that gates them: **line
18 before the first red**, **line 19 at the report**. Line 20 is answered at every stage that decides something.

| #   | Must                                                                                                                                                                                                                                                                      | This ticket                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1   | every criterion is one test                                                                                                                                                                                                                                               | {yes / which criterion is two}                                |
| 2   | every roster is written in the criterion, not read off the code                                                                                                                                                                                                           | {yes / which}                                                 |
| 3   | a count in a criterion was counted, with the date                                                                                                                                                                                                                         | {the count, and the date it was made}                         |
| 4   | the read list names every file that names the same things                                                                                                                                                                                                                 | {yes / which file is missing}                                 |
| 5   | what the ticket does NOT do is written down, with the ticket that does it                                                                                                                                                                                                 | {yes}                                                         |
| 6   | a criterion that says "refused" says by what, and names the ticket that owns the caller                                                                                                                                                                                   | {yes / which}                                                 |
| 7   | a schema ticket says whether its types are exercised or only registered                                                                                                                                                                                                   | {which}                                                       |
| 8   | every decision taken in the sheet since the last ticket is in the criteria by name                                                                                                                                                                                        | {which, or none}                                              |
| 9   | no word the glossary retired appears — grepped                                                                                                                                                                                                                            | {the words grepped}                                           |
| 10  | one concrete object for the hardest shape is written before READY                                                                                                                                                                                                         | {the object, and which shape}                                 |
| 11  | every type ported is grepped in `commands.ts · body` and `events.ts · carries`                                                                                                                                                                                            | {yes / what it turned up}                                     |
| 12  | a policy two tickets would both need is a rule in `plans.ts`, not one contract's answer                                                                                                                                                                                   | {which questions are policies}                                |
| 13  | the ticket after this one is refined before this one is picked up                                                                                                                                                                                                         | {which ticket, and where that stands}                         |
| 14  | every criterion saying what a field contains is grepped against the prose describing the same field — glossary `means`, backlog stories, block-model comments — by the contents, not the type name                                                                        | {the phrases grepped, and what they turned up}                |
| 15  | a criterion is what the test asserts and nothing else — shape, value, file, tier; the why is in the note                                                                                                                                                                  | {yes / which criterion carries prose}                         |
| 16  | every number a criterion quotes about the sheet is `Measure.run()`'s, taken with every module in `Measure.load` loaded, and the criterion says `Measure.run(), <date>`                                                                                                    | {the numbers, and the date}                                   |
| 17  | a criterion names a file or a port by what it must hold, never by whether it exists                                                                                                                                                                                       | {yes / which criterion says "exists"}                         |
| 18  | **before the first red** · every `EDGES` entry on the ticket is answered — in the contract, by a test, or by one sentence saying why it needs neither                                                                                                                               | {one line per edge, or "the ticket has none"}                 |
| 19  | **at the report** · it opens with "Decisions no criterion asked for", one line per choice with its `file:line`, before the file list                                                                                                                                    | {taken at the report, not here}                                 |
| 20  | every criterion and every edge is decided one point at a time — options on a named axis, one question asked of each, the pick and why the others lost, written twice: into the criterion and into `EDGES` — **and then the criterion is read once more against the pick** | {the edges, and any criterion still carrying a losing option} |
| 21  | a criterion is verbatim in the contract table or snapshot and escaped before a formatter sees it; each appears exactly once | {taken at the contract step, not here} |
| 22  | rule and decision wording written on the sheet travels into repo prose that scans read — a number word or a name in a sentence is a count or a roster to a regex | {which sentences this ticket adds to docs, and what a scan makes of them} |
| 23  | every wireframe and screen that shows what the ticket builds is read against the spec; where the wireframe says more, the wireframe moves | {which wireframes, or "none shows this ticket"} |
| 24  | the ticket carries why · today / after / unlocks / not / oneLine, product words, no paths | {yes / which line is missing} |
| 25  | a PM change mid-build is a requirement: built, written up at stage end as REPLACE / WITH, in the sheet before the report closes | {taken as it happens, not here} |
| …   | any line the file holds beyond these — the file is the count, this table follows it | |

**And one the checklist does not ask.** Count the reading table against the criteria. A row the
criteria delegate to the table has to be answered here; a row still carrying a question mark is a
branch nobody specified.

| Rows in the reading table | Named by a criterion | Delegated to the table | Still carrying a question |
| ------------------------- | -------------------- | ---------------------- | ------------------------- |
| {n}                       | {n}                  | {n}                    | {the rows, or none}       |
```

---

# `roadmaps/templates/ticket-contract-snapshot.md`

```markdown
# contract-snapshot-{id} · {date}

> endpoint tests {n}, all red · sent before any domain code

## Types
{verbatim TypeScript, each block headed by its file: brands, bodies, answers, refusal keys}

## Endpoints
| Method and path | Who may call | Body | Answer (every case) | Refusal keys | Red tests |
|---|---|---|---|---|---|

## Decided
{one “did X because Y” each: a case, a field, a refusal, a query parameter · NEW EVENT marked}

## Differs from the sheet
{row · what · why — or "none"}
```

---

# `roadmaps/templates/ticket-arch-review.md`

```markdown
# arch-review-{id} · {date}

> against `acme-build` + working tree · {n} findings · {n} fix · {n} keep · {n} decided

## Architecture Summary
- **Layers touched:**
- **Patterns loaded:**
- **Context gaps:**

## Findings
### F1
- **Source:** `[{rule file} → {section}]`
- **Severity:** CRITICAL | HIGH | UNCERTAIN
- **File:** `path:line`
- **Rule:**
- **Why:**
- **Fix hint:**

## Decision table
| # | What it is | How it is now | How it will be |
|---|---|---|---|

{one line: which collapse into one change, which are decisions}

## Disposition
| # | fix / keep / decided | why | Notes |
|---|---|---|---|

## Decided
{one “did X because Y” each — or "none"}

## Files changed by this stage
- `path` — which finding

## Tests after
{n} green · ticket suite
```

---

# `roadmaps/templates/ticket-regression.md`

```markdown
# regression-{id} · {date}

> against `acme-build` · drift {n} · suite {n} red · touched {n} files · re-ports {n}

## 1 · Spec drift

`yarn ticket:read {id}` against the pack the run started from · exit {0|1}

| Criterion | Was | Is now | Tests affected |
|---|---|---|---|

or `0 — the pack matches the sheet`

## 2 · Suite

`vitest` · {n} projects · {n} passed · {n} skipped · {n} failed

| Failing test | Owning ticket (receipts.ts) | Cause |
|---|---|---|

or `0 red outside this ticket`

## 3 · Touched outside scope

`git diff --name-only acme-build` minus this ticket's `touches`

| File | Owned by | Criterion re-read | unchanged / changed (how) / needs re-port |
|---|---|---|---|

or `0 files outside touches`

## Re-ports needed

{n} rows in `re-ports-{id}.json` over {n} landed tickets · causes: {letter} {what moved} … — or `none`

## 4 · Beyond the suite (when the ticket moved a rendered value)

What a green suite cannot show. The worked shape: restore the replaced code beside the new,
render every screen under both, fingerprint the computed properties per element, diff, and trace
every difference to the criterion that ordered it — or list it in §3.

| Screen | Elements | Differ | Every diff traced to a criterion? |
|---|---|---|---|
```

---

# `roadmaps/templates/ticket-report.md`

```markdown
# report-{id} · {date sent}

```
{id} · done | blocked | spec wrong
{the shape, verbatim, as sent}
```

## Receipt

```js
'{id}': { criteria: {n}, tests: {n}, skipped: [], uncovered: [], at: '{YYYY-MM-DD}',
  repository: { commit: '{sha}', tests: {n}, skipped: {n}, e2e: {n}, coverage: { commit: '{sha}', lines: {n}, branches: {n}, functions: {n}, statements: {n} } } }
```

criteria = `acceptance.length` at the read of {date} · tests = {how the count is made: which files, which `it` titles}

## Decisions no criterion asked for

- `{file:line}` · {what was chosen} · {why}

## Re-ports

`re-ports-{id}.json` · {n} rows over {n} landed tickets · the PM uploads it with this report — or `none`

## Lessons

| Notes entry | Skill | Rule (one line, with check) | Landed in |
|---|---|---|---|
| N{n} | {skill} | {rule} · `why: {id}` | `ticket-{skill}/SKILL.md` |

or `no lessons` · SKILL.md line counts: {skill} {n} … — any over 100 named here

## Cost

What the session showed, not a limit.

| Step | Context at end (k tokens) | Minutes | Sheet reads |
|---|---|---|---|
| {one row per step of the mode} | | | |

## Commit

branch `feature/{id}` · staged {n} files · message: `{id}: {one line} · {n} tests green`
```

---

## What the old skill held that no skill holds now

- `start` alias — dead since recon became stage 1
- `check` action — folded into regression step 2 and report step 3
- the "Then: red, green, verify, snapshot" section — each is a skill
- worked examples in prose — each is a `why:` tag pointing at the ticket's own documents
- TaskCreate boilerplate — every skill's task list is its steps; the first task is always
  `_shared.md`
