/**
 * - `WOW_FILES` · eagle-design's take of its way-of-working files: homes now
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// the tools' configs, the session's hooks, three registry types and the rules' checks page leave its index, each the home's text; the backup takes the home's version
const WOW_FILES: Migration = {
  release: '0.12.0',
  removes: ['tools/zipRepo.sh'],
  moves: [],
  homed: [
    'commitlint.config.ts',
    'syncpack.config.ts',
    'eslint.config.ts',
    'prettier.config.ts',
    'knip.config.ts',
    'cspell.config.ts',
    'vitest.config.mts',
    '.claude/settings.json',
    'roadmaps/findings/findingTypes.ts',
    'docs/process/decisions/decisionTypes.ts',
    'docs/process/projectPlan/projectPlanTypes.ts',
    'docs/rules/checks.md',
  ],
  tree: null,
};

export { WOW_FILES };
