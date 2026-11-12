# Task 8 · the sample product

The way of working's own product: the homes taken by a product that names no real one, so this repository
runs its checks on `design/` without a clone, and stage 3 spawns a new project from it.

## What the contract pulls in

Measured on eagle-design's `port/wow` (ab0d69c): the 37 files `ports/contract.ts` names import, transitively,
532 files of the product, about 53,000 lines (`sheet/logic` alone 14,000). A copy is no sample. The registries
take their types from about 20 files of the product:

- `roadmaps/`: `backlogTypes`, `edgeTypes`, `ideasTypes`, `notesTypes`, `receiptsTypes`, `repositoryState`,
  `templatesTypes`, `tracksTypes`. Types alone, no product's fact; they import only `roadmaps/ids.ts`, which the
  build writes from the backlog and the tickets.
- `sheet/`: the contract's (`commands`, `events`, `queries`, `refusals`, `ports`), the test cases', the
  capabilities', the requirements', the directory's, the glossary's. Several reach the product's domain
  (`directoryTypes` → `people`, `languages`; the content types and field kinds).

## The way

1. The roadmap's eight type files become homes at the same paths: the way of working's process, held once.
   A migration removes eagle-design's copies and its take writes them back; no import moves.
2. The sheet's types stay each product's. The sample writes its own, the smallest the homes read; where a
   home reads more of a registry than a small product holds, that home names a product's fact, a finding for
   task 9.
3. `examples/sample-product`: its package (`wow.takes`), tsconfig, `scope.ts`, `product.ts`, `productView.ts`,
   the contract's files, small, and `sheet/project.ts` naming its stack. It names no real product.
4. A check of the feature tier: the sample copied to a scratch folder, the homes of the tree in hand taken in,
   then tsc, ESLint, the homes' tests and the build. Its red proof: a home reading a field the sample lacks.

## Order

1. The roadmap's types to the homes, eagle-design's migration with them (a major release).
2. The sample's skeleton: package, scope, the product's two entry points, the registries.
3. The check in the feature tier.
4. Its pages, once the build side's theme lands (task 7).

## Step 2's finding: the registries hold readers

A probe took the homes alone into a bare folder: 366 tsc errors, 181 of them the contract's files missing.
The homes call about 80 functions through the registries, not rows alone: 37 of eagle-design's files export
them (the tickets' views and context, the notes, the templates, the tracks, the journeys and test cases, the
commands', events', queries' and refusals' readers, the directory, the screens, the glossary, the messages'
checks). Nearly every one imports the product's row files by name (`E06Journeys`, `E10Notes`, …), so none is
a home as it stands, and a sample writing its own would copy logic a second product copies again.

The way, step 2 widened:

1. Eagle-design marks each of the 37: the way of working's reader, the product's own, or mixed.
2. A reader of the way of working is split from its rows: the product keeps one file that gathers its rows,
   the reader becomes a home at its path and reads that file through the contract.
3. A mixed file is split first, on eagle-design's tree; its rows stay.
4. The sample then writes rows alone. Area by area, each its release: the roadmap, the cases, the
   contract, the words.

### The 37 marked (eagle-design's reading, checked here on the parse: 13 W, 3 E, 21 M)

- W, a reader holding no rows: `roadmaps/templates.ts` (with `templates/epicFiles.ts`), `roadmaps/tracks.ts`
  (its factors are the method), `roadmaps/tickets/` `receiptFlags`, `ticketBoard`, `ticketContext`,
  `ticketExpand`, `ticketViews`; `sheet/cases/journeys/journeyCheck.ts` (once its walked prints come through
  the contract), `sheet/cases/testCases.ts`, `testCases/caseBaseline.ts`, `caseText.ts`, `endpointCases.ts`;
  `sheet/words/messages/liveWords.ts`, `sayWord.ts`.
- E, the product's own: `sheet/contract/refusals/refusalActors.ts`, `sheet/screens/wireframes/screenContracts.ts`,
  `sheet/words/messages/modules.ts`. The homes call them (`actorKey`, `editorScreenOf`, `deliveryWord`): task 9's
  findings, through `product.ts` or no longer called.
- M, rows | readers: `roadmaps/backlog.ts`, `notes.ts`, `tickets/pointerResolve.ts`; `sheet/cases/journeys/
  journeyReads.ts`, `testCases/caseReach.ts`; `sheet/contract/commands.ts`, `events.ts`, `queries.ts`,
  `refusals.ts`, `refusals/refusalCatalog.ts`, `refusalOrder.ts`, `refusalSentences.ts`; `sheet/model/
  directory.ts`; `sheet/screens/wireframes/screenRows.ts`; `sheet/words/glossary.ts`, `messages/messageCells.ts`,
  `messageChecks.ts`, `messageUsage.ts`, `refusals.ts`, `situations.ts`, `words.ts`. Each split line stands in
  eagle-design's message of 12 Nov; three marks moved from W on the parse (`caseReach`, `refusalSentences`,
  `messageUsage` hold the product's keys and tables).
- First area: the roadmap.

## Eagle-design's review (10bf0ef)

- The eight are the way of working's: shape alone. Two fields carry a product's history, the backlog's `code`
  and `screens`; they stay, optional, as written, and task 9 reads them again. The groups' five ids are the
  process's; their labels and notes stay the product's rows.
- The line for the sheet's types: a row's grammar, filled only by unions the build writes from the product's
  rows, is the way of working's; a type that lists the product's values is the product's. The way of working's
  grammar: the command and query rows, the refusal row, the event row, the test case, a capability's pointers,
  a requirement with what it replaces, a person's shape, the journey's (`journeyTypes`). The mixed ones, task 9's
  findings: the journey's grammar reads the product's `PersonId`; the shared cases' `then` names its refusals.
- The eight keep their paths for good: the notebooks import `../notes/notesTypes.ts`, so a later move of it is
  refused by the notebook guard. No plan moves them.
- A migration that takes a product's copy out of git refuses a copy whose text is not the home's, naming it.

## For stage 4

- eagle-design's `main` still holds the eight in git. When it fast-forwards to the port, git takes them out of
  its working tree, tracked before and not after; the take runs on `main`'s checkout in the same step, as it
  does for every home, and writes them back. `.git/info/exclude` is one for every worktree of it.
