/**
 * - `CONSUMERS` · each repository that takes the way of working, tried by the gate
 * - `BUILD_SOURCE` · the build repository `dev/` is taken from, by script
 */
import type { Consumer } from '../scripts/consumerTypes.ts';
import { CARRIED } from './eagle-design/carried.ts';
import { CASE_READERS } from './eagle-design/caseReaders.ts';
import { CONTRACT_READERS } from './eagle-design/contractReaders.ts';
import { COUNT_FORMS } from './eagle-design/countForms.ts';
import { HOME_FACTS } from './eagle-design/homeFacts.ts';
import { WOW_FILES } from './eagle-design/wowFiles.ts';
import { BACKUP_HOOK } from './eagle-design/backupHook.ts';
import { GENERATED_FILES } from './eagle-design/generatedFiles.ts';
import { HELD_BY } from './eagle-design/heldBy.ts';
import { REWRITTEN } from './eagle-design/rewritten.ts';
import { MIGRATION } from './eagle-design/migration.ts';
import { ROADMAP_READERS } from './eagle-design/roadmapReaders.ts';
import { ROADMAP_TYPES } from './eagle-design/roadmapTypes.ts';
import { THEME_NAMES } from './eagle-design/themeNames.ts';
import { WORD_READERS } from './eagle-design/wordReaders.ts';

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
      ['cut-pack', 'T-E19-00'],
      ['release:record', '5.3.1'],
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
    migrations: [
      MIGRATION,
      THEME_NAMES,
      ROADMAP_TYPES,
      ROADMAP_READERS,
      CASE_READERS,
      CONTRACT_READERS,
      WORD_READERS,
      HOME_FACTS,
      COUNT_FORMS,
      WOW_FILES,
      BACKUP_HOOK,
      GENERATED_FILES,
      HELD_BY,
    ],
    // its own work lands on `main`, which takes nothing yet: the branch holds `main` whole, or the gate is red
    port: {
      trunk: 'main',
      base: '8e031ff6f80c8a25127c9fc214c5859f84477f03',
      moves: 'ports/eagle-design/moves.tsv',
      carried: CARRIED,
      kept: ['legacy/'],
      rewritten: REWRITTEN,
      // the block model's data became a module: a row names it so
      names: [['block-model.json', 'blockModel.ts']],
    },
  },
];

// it takes nothing yet: its skills and its map come here by script
const BUILD_SOURCE = '../eagle';

export { BUILD_SOURCE, CONSUMERS };
