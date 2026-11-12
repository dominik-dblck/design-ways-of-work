# Plan · Argus starts from a clean way of working

Written by the `WoW` session on 11 Nov 2026, after `plan/review-11-nov.md` and two rounds with eagle-design.
A plan only: nothing is built until the PM accepts it.

The PM, 11 Nov: "celem jest zaczęcie argusa już z WoW-a z poprawnie skonfigurowanym i stabilnym WoWem a później
będziemy dogrywać eagle dev i design, ale WoW już ma być czysty bez eagle, jeżeli coś trzeba w trakcie przenieść
do eagle-design dogaduj z nimi".

**Accepted by the PM on 11 Nov, the design side alone for now** ("sam design na razie, tak żebyśmy mieli czysto
już w WoWie do designu"): stages 1 to 3 run; stage 4, the build side, is parked until the PM asks for it.

**The goal, said again by the PM on 11 Nov** ("teraz cel zrobienie WoW żeby wyspawnować nowy projekt designu już
na czysto tak żeby eagle design i argus design mieli to samo źródło prawdy WoW-a"): the design side is done when
both design repositories take the same tag. So the design half of stage 5, eagle-design taking v1 by its
rehearsed migration, belongs to this run, on the PM's word; the run's notes are `plan/run-11-nov.md`.

## Contents

1. What "ready for Argus" means
2. What was measured for this plan
3. The stages
4. What leaves for eagle-design
5. The build side, said plainly
6. Risks
7. For the PM
8. Settled with eagle-design, 11 Nov

## 1 · What "ready for Argus" means

Each line is a check, not a judgement.

1. A blank design product written by `spawn` passes every check on its first commit.
2. A blank build repository written by `spawn` passes every shared check on its first commit.
3. No name, id or path of Eagle stands in any home of the way of working: a test reads every home.
4. The way of working checks all of its own code with no Eagle beside it, and tries each release on a clone of
   every repository that takes it.
5. A release is one command and one changelog row. A repository pinned to a tag is never moved by a later one;
   a breaking release carries its migration script, already run on a clone.
6. The owner's guide and the new-project guide say what is true now.

## 2 · What was measured for this plan

- `design/` reads 44 product files from 66 of its files (134 imports). 52 of the 66 read only the standard
  registries; 14 read Eagle's own logic, model, samples, screens or check parts (24 imports).
- Eagle's ids, names and paths stand in 33 files (27 of `design/`, 5 of `dev/`, 1 of `design-system/`).
- The build side: `dev/rules` and the build gates of `shared/rules` hold 211 rule rows. 140 of them are held by
  133 tests that exist only in the build repository; 12 by a test here; 16 by a tool configured here; 32 by review.
- The build repository moved today: `~/projects/eagle` (1,830 files under `app/`, 197 architecture tests,
  95 files under `scripts/`). `scripts/repos.ts` still names `../mailing-automation`, so `takeDevClaude` and
  `takeDevMap` fail by default now.
- `argus-web` is an empty folder; no Argus repository exists.

## 3 · The stages

Costs are estimates of this session's working time. ✋ marks the PM's word.

### Stage 1 · The foundation · 12–16 h

- The gate reads a repository, not a patch: `yarn consumers` clones each one named in `ports/`, takes the way of
  working from the working tree, runs that repository's own feature tier and outputs, and compares them with the
  same clone on its pinned tag. A difference is a row of the release's changelog or a failure. Both clones are
  built from nothing, no cache.
- `yarn release`: the commit tier, the gate, the version, the changelog row, the tag, the push.
- The package a repository installs holds the four homes alone and runs no second install (`prepare` leaves the
  manifest; `.gitattributes` cuts the archive: yarn 1 reads `files` only on the path `prepare` opens).
- Its first repository is a clone of eagle-design's branch `port/wow`, pinned to v0.1.10: stage 1 breaks nothing,
  so the gate must read "no difference" there. That is the gate's own proof.
- The extraction's scaffolding retires to `legacy/`: `verify`, `rehearse`, `port.patch`, the inventory, the hard
  links. The branch `port/wow` holds the port; `ports/eagle-design/moves.tsv` stays, its migration reads it.
- The repositories' paths come from `ports/`, not from a script; a script that deletes a folder refuses one
  outside its own scratch folder.
- The gate, the release and the three hooks get tests, each on a scratch repository.
- `CLAUDE.md` for the owner, `README.md` on the live mechanism, one current state file, the decisions as data.
- Done when: `yarn release` puts out v0.2.0 through the new gate.

### Stage 2 · The design side without Eagle · 3–5 days

- The contract table: each of the 134 reads is a standard registry, a part the product plugs in, or gone.
  Agreed with eagle-design row by row.
- `product.ts`, typed here: the layout's homes, the registries, the product's own check parts and view parts,
  its names, what its build side reads.
- The first slice, small: Eagle's pins and lists leave. `FROZEN` to eagle-design's
  `roadmaps/notes/frozenNotebooks.ts`, the featured epics computed from the feature tickets, the epics from the
  contract's rows.
- The files that read only registries read them through the contract. Of the 14 that read more, about nine are
  split: the generic core stays, the product's half becomes eagle-design's file (section 4).
- The facts in the 33 files leave: each to its home in eagle-design, or to a slot a product fills (a lesson's
  `why`, the repository's path, an example of the API convention).
- The stack the build side builds on (its framework, its component library, its design system) is a parameter of
  the product: the ticket pipeline's documents read it, they no longer write Eagle's.
- `examples/sample-product`: the smallest product every generic check passes on, found by adding one entry at a
  time and writing down which check asked for it. That list is the contract.
- The way of working's own tsc, ESLint, knip, prettier, tests, build and checks run `design/` on the sample.
  The 302 files nothing checks here today are checked here.
- The no-product test reads every home: the names from `ports/`, the ids anything but the sample's own.
- The migration for eagle-design: a map and a script, run at every release from here on, on a fresh clone of its
  `main` (its moves from `ports/eagle-design/moves.tsv` by script, the JSON to TypeScript changes from `port/wow`,
  then the take), so its catch-up later is the same script on the same tree. That clone joins `ports/consumers.ts`;
  `port/wow` is the gate's repository until it does, and the source of the JSON to TypeScript changes after.
- Done when: v1.0.0 is out, the sample is green in the gate, the test of line 3 is green.

### Stage 3 · Spawn, the design side · 0.5–1 day

- `yarn spawn design <path> <name>` writes a repository from the sample: `package.json` at the pinned versions,
  `scope.ts`, the root configs, the hooks' wiring, `CLAUDE.md` from a template, an empty `product.ts`, the first epic.
- The new-project guide is rewritten around it (today it says: copy eagle-design and cut Eagle by hand).
- A spawned repository is named in `ports/`, so the gate tries every later release on it.
- ✋ Done when: the PM says spawn, and `argus-design` is green on its first commit.

### Stage 4 · The build side: a road and a clean `dev/` · 4–7 days, the least certain · parked

- ✋ A conversation with eagle-dev (cowork: a message to it is the PM's word).
- The rows of `dev/rules` are split three ways: every build repository's; the stack's (Next, React, MUI, TanStack
  Query); Eagle's application (its domain log, its session, its entities). The third leaves for eagle-dev's own rules.
- Each row that stays gets a gate shipped from here, an ESLint rule or a shared test reading the scope, in order
  of worth; until its gate ships a row reads `review` with its until. Not all 133 before Argus-dev starts.
- The road: `dev` lands on a build repository's own paths; its rule files are printed there; one channel carries
  the design side's documents; a build scope.
- The process tools come from the build repository by script, their product facts turned into scope fields:
  `sheet:take`, `sheet:cache`, `skills`, `reports:check`, `snapshot`, `ticket:read`, `e2e:pick`, coverage,
  the hooks that keep a ticket run's turn.
- `examples/sample-build`, a blank build repository green on every shared check, in the gate; `spawn build`.
- ✋ Done when: the PM says spawn, and `argus-dev` is green on its first commit.

### Stage 5 · Eagle catches up · its design half before stage 3, the rest later · on the PM's word

- eagle-design takes v1 by the migration script rehearsed since stage 2.
- eagle-dev's port: its `scope.ts`, the take, a baseline for every new rule's findings, the code mended by script
  in chunks.

### The order, and why

1 → 2 → eagle-design takes v1 (5, its design half) → 3 → Argus-design starts → 4 → Argus-dev starts → eagle-dev's
port (5, the rest). The design side goes first because it writes what the build side builds: Argus-dev has nothing
to build until Argus-design has cut a ticket. eagle-design takes v1 before the spawn (the PM, 12 Nov): v1 meets a
real product first, and what it finds is mended before a new one is made from it.

Before Argus-design: stages 1 to 3, 5–8 days. Before Argus-dev: stage 4 more, 9–15 days in all.

## 4 · What leaves for eagle-design

Agreed with eagle-design on 11 Nov (section 8); each row is settled again, by its file, when stage 2 reaches it.

| what | where it stands here | where it goes |
|---|---|---|
| closed notebooks' pins | `design/tests/architecture/aClosedNotebookIsFrozen.test.ts` | `roadmaps/notes/frozenNotebooks.ts` · `FROZEN_NOTEBOOKS` |
| the epics, the featured ones, the `E14` exemption | `design/guards/checks/journeysPart.ts` | computed from the contract's rows and the feature tickets; the exemption a field of a journey row |
| the capability folders | `design/tools/layout.ts` | the product's `product.ts` · homes |
| status labels (`MOVES IN E18`, `E10`) | `design/app/workspace/sheetStatus.ts` | the product's words |
| the repository's path, the lessons' tickets, the convention's examples | `design/docs/documents/` | slots the product fills, or neutral examples |
| Eagle's logic read by a generic file | `approval/roleCombinations`, `scenes`, `approvalLogic`, `model/fieldKinds`, `samples/blocks`, `contract/blockModel`, `parsePools`, `contentTypeLogic`, `contentCheck`, `contentTypePart` | eagle-design's own files, plugged in through `product.ts`; `featureCombinations` keeps a generic table, Eagle fills it |
| "Eagle reads the DS scale" | `design-system/tokens/typography.ts` | reworded: no product |

**Every product's, by eagle-design's reading**, so they stay reads of a registry: the directory (people and
roles), the capabilities, the screens and wireframes, the refusals and messages, the sentences, the rules, and
the part of Measure that counts the standard registries.

**The standard registries a product holds**, empty at its start: `roadmaps/` (tickets and their status, backlog,
edges, receipts, notes, ideas, features, templates, findings, a folder an epic), `sheet/project`, `sheet/rules`,
`sheet/cases` (test cases, journeys), `sheet/contract` (commands, queries, refusals), `sheet/words` (messages,
their content, glossary), `sheet/model/directory`, `sheet/logic/capabilities`, the screens and wireframes,
`app/styles` (tokens, the components' spec), `docs/rules`, `docs/process/decisions`. Optional: the product's own
tokens, the contract's ports, the tracks.

## 5 · The build side, said plainly

The design half of the way of working is whole here: its rules, their gates, its tools. The build half is not.
Here are the build rules' words; most of their gates (133 tests), the scripts a ticket run needs and the turn
hooks are still only in the build repository, and `dev/rules` mixes every build repository's rules with Eagle's
application. A build repository spawned today would hold rules that name tests it does not have.

So stage 4 is the larger half of "eagle-dev into the way of working", done for Argus's sake, and it is why
Argus-dev comes after Argus-design. What it leaves in eagle-dev is Eagle's own application and its rules.

## 6 · Risks

- Stage 4's size depends on Argus's stack (question 1) and on how many gates must ship before Argus-dev starts.
- eagle-design's port waits (section 8), so its `main` keeps its own copies of the way of working's files: 98 of
  the 119 that share a path already differ. A change it makes to such a copy is told here, and the gate lists
  the copies that moved at every release, so nothing is lost when the take replaces them.
- While stages 2 and 4 change what the homes hold, eagle-design is not moved; its migration is rehearsed at
  every release, so the catch-up is known before it is asked for.
- One session writes here: the stages run one after another, never side by side.

## 7 · For the PM

One at a time.

1. **The plan and stage 1.** Answered 11 Nov: accepted, the design side alone; the first push and tag wait for
   the PM's word.
2. **Before stage 3: Argus's stack.** The same as Eagle's (Next, React, MUI, TanStack Query, Postgres), or not.
   The spawn writes it into Argus's `product.ts`; it also decides how much of stage 4 Argus needs.
3. **Before stage 4: a conversation with eagle-dev.**
4. **When the hooks come here: the work-mode hook**, its source here or only named in the `CLAUDE.md` template;
   installed by the PM either way.

No question, said so it is no surprise: eagle-design's port does not land now. The release of the port that
waited for the PM's word waits for stage 5.

## 8 · Settled with eagle-design, 11 Nov

- **Its port waits and is made once, onto the clean way of working** (its pick, taken: the PM said Eagle follows
  later). One migration, not two, and no state pinned to a tag about to break. Its 256 moves are a script it runs
  again on the clean contract; the JSON to TypeScript changes come from `port/wow` by cherry-pick; the branch stays.
  Its `main` runs on its own tools meanwhile and is green.
- **Which reads are every product's and which are Eagle's**: section 4.
- **The standard registries**: section 4, with what it added (the directory, the capabilities, the screens,
  `docs/rules`, an epic's folder) and what it made optional (the product's tokens, the ports, the tracks).
- **Its documents for the build side**: `agent-instructions` is nearly clean (one name, the paths);
  `api-convention` keeps its skeleton and loses Eagle's examples; `ticket-pipeline` carries the stack (Payload,
  MUI, the Deblock design system) and the approval flow: the stack becomes the product's parameter, the process
  stays.
- **Its tools since 8 Nov**: the backup at a commit (a request already taken, review section 9); `yarn backup`,
  here already; `journeysPart.ts` differs from the copy here by this repository's own renames alone; the E19 pin
  goes to `FROZEN_NOTEBOOKS`. The work mode is a line of its `CLAUDE.md` and a hook outside every repository.

- **Asked by eagle-design after its review of the gate, 11 Nov** (relayed as the PM's "tak, poproś go o
  poprawki"): the migration is rehearsed on its `main`, 18 commits ahead of `port/wow` that day, never on the
  frozen branch; stage 2's migration line says so. The files where the moves do not land cleanly on `main` are
  the first list it gets, settled row by row.
