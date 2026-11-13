/**
 * - `CONSUMERS` · each repository that takes the way of working, tried by the gate
 * - `BUILD_SOURCE` · the build repository `dev/` is taken from, by script
 */
import type { Consumer } from '../scripts/consumerTypes.ts';
import { CASE_READERS } from './eagle-design/caseReaders.ts';
import { CONTRACT_READERS } from './eagle-design/contractReaders.ts';
import { COUNT_FORMS } from './eagle-design/countForms.ts';
import { HOME_FACTS } from './eagle-design/homeFacts.ts';
import { WOW_FILES } from './eagle-design/wowFiles.ts';
import { BACKUP_HOOK } from './eagle-design/backupHook.ts';
import { BUILD_THEME_TAKEN } from './eagle-design/buildTheme.ts';
import { GENERATED_FILES } from './eagle-design/generatedFiles.ts';
import { HELD_BY } from './eagle-design/heldBy.ts';
import { SCOPE_PRESET_CUT } from './eagle-design/scopePresetCut.ts';
import { ICON_PACKAGE } from './eagle-design/iconPackage.ts';
import { MIGRATION } from './eagle-design/migration.ts';
import { PRODUCT_HALVES } from './eagle-design/productHalves.ts';
import { ROADMAP_READERS } from './eagle-design/roadmapReaders.ts';
import { ROADMAP_TYPES } from './eagle-design/roadmapTypes.ts';
import { THEME_NAMES } from './eagle-design/themeNames.ts';
import { WORD_READERS } from './eagle-design/wordReaders.ts';

// one at least: a release is tried on a repository, never on none
const CONSUMERS: readonly [Consumer, ...Consumer[]] = [
  {
    name: 'eagle-design',
    path: '../eagle-design',
    ref: 'main',
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
      SCOPE_PRESET_CUT,
      PRODUCT_HALVES,
      BUILD_THEME_TAKEN,
      ICON_PACKAGE,
    ],
    // its `main` takes the tags itself: no branch stands between it and the gate
    port: null,
  },
];

// it takes nothing yet: its skills and its map come here by script
const BUILD_SOURCE = '../eagle';

export { BUILD_SOURCE, CONSUMERS };
