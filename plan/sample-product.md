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

## Open

- Which of eagle-design's sheet types are the product's facts, and which the way of working's shape:
  eagle-design marks them.
