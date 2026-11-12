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
