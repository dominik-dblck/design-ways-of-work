/**
 * - `CONSUMERS` · each repository that takes the way of working, tried by the gate
 * - `BUILD_SOURCE` · the build repository `dev/` is taken from, by script
 */
import type { Consumer } from '../scripts/consumerTypes.ts';

// one at least: a release is tried on a repository, never on none
const CONSUMERS: readonly [Consumer, ...Consumer[]] = [
  {
    name: 'eagle-design',
    path: '../eagle-design',
    ref: 'port/wow',
    commands: [
      ['build'],
      ['checks'],
      ['spec-check'],
      ['checks:gate'],
      ['tsc'],
      ['lint'],
      ['test'],
      ['format:check'],
      ['lint:files'],
      ['lint:words'],
      ['lint:deps'],
      ['lint:exports'],
    ],
    folders: ['dist'],
  },
];

// it takes nothing yet: its skills and its map come here by script
const BUILD_SOURCE = '../eagle';

export { BUILD_SOURCE, CONSUMERS };
