/**
 * - `NEXT` · the release in hand: what it is, what it asks, each output it moves
 * - `RELEASES` · each release put out, the newest first, as the release wrote it
 */
import type { Release, Unreleased } from '../scripts/changelogTypes.ts';

const NEXT: Unreleased = {
  kind: 'major',
  what: 'a product plugs its own code in through its `product.ts` alone: the checks’ parts a and w take its lines, findings, map moves and screens from the entry point, and no home reads those files',
  action:
    'the migration `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag; the pin to the tag in the same commit',
  rules: { added: [], changed: [], removed: [] },
  outputs: {
    'eagle-design': {
      'output · yarn cut-pack T-E19-00':
        'the migration’s two new files of the product’s own, under guards/, wait to be committed with the pack',
    },
  },
};

const RELEASES: readonly Release[] = [
  {
    version: '0.3.0',
    date: '2026-11-11',
    kind: 'major',
    what: 'the design home reads a product through a contract: its registries at their paths, its own parts through its `product.ts`',
    action:
      'the migration `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag; the pin to the tag in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the api convention’s module holds the sixth check and the 502 row its `main` wrote: the build finds the page written already',
        'output · yarn checks':
          'the journeys’ part reads its epics off the backlog: the cases met of E10 and E14, the journeys of E14 and E19',
        'output · yarn cut-pack T-E19-00':
          'the pack carries the api convention as its `main` holds it; the pins’ registry is one file more to commit',
        'output · yarn test':
          'the closed notebooks’ test reads the pins off the product’s registry, the newest epic’s among them',
        'exit · yarn test · 1 → 0':
          'the pins’ test fails on the tag, which holds five pins of its own; the product’s registry holds the sixth',
        'dist · project/api-convention.md':
          'the sixth check and the 502 row, word for word as its `main` holds them',
        'dist · project/module-entries.json':
          'the pins’ registry is a file of the module roadmaps/notes.ts',
        'dist · project/packs/T-E19-00.md':
          'the pack carries the api convention, the 502 row and the sixth check in it',
        'written · fixtures/packs/T-E19-00.md':
          'the pack carries the api convention, the 502 row and the sixth check in it',
        'written · records/release-5-3-1.md':
          'the module roadmaps/notes.ts counts the pins’ registry: one file more, its digest moved',
        'written · sheet/contract/api-convention.md':
          'the sixth check and the 502 row, word for word as its `main` holds them',
      },
    },
    moved: {},
    tried: { 'eagle-design': '590a2b0' },
  },
  {
    version: '0.2.0',
    date: '2026-11-11',
    kind: 'minor',
    what: 'an install unpacks the four homes and the manifest alone and runs no second install; the homes are byte for byte those of v0.1.10',
    action: 'none: move the pin to the tag',
    rules: { added: [], changed: [], removed: [] },
    outputs: {},
    moved: {},
    tried: { 'eagle-design': '590a2b0' },
  },
];

export { NEXT, RELEASES };
