/**
 * - `SCOPE_PRESET` · the scope the way of working gives a design product
 * - a product's `scope.ts` spreads it, naming its backup, browser and what differs
 */
import type { RepoScope } from '../shared/repoScope.ts';
import { entryOfPart, filesOf, isEntry } from './layout.ts';
import { readStarts } from './readStarts.ts';
import { ROOT } from './root.ts';
import {
  GENERATORS,
  NAME_CASES,
  NAMED_DOCS,
  SKILLS,
  SPELLED,
} from './scopePreset/presetGlobs.ts';

type Preset = Omit<RepoScope, 'backup' | 'browser'>;

// the modules' files, as tools/layout.ts places them: an entry's API and a part's values take their own case
const MODULE_FILES = filesOf().filter(
  (file) => file.endsWith('.ts') && !/\.(d|test)\.ts$/.test(file),
);
const ENTRIES = MODULE_FILES.filter(isEntry);
const PARTS = MODULE_FILES.filter(
  (file) => !isEntry(file) && entryOfPart(file) !== null,
);

const SCOPE_PRESET: Preset = {
  root: ROOT,
  extraRoots: [],
  ignores: [
    'dist/**',
    'node_modules/**',
    '.artifact/**',
    'vendor/**',
    'legacy/**',
    'guards/__snapshots__/**',
  ],
  productTrees: ['dev/claude/**'],
  production: [
    'sheet/**/*.ts',
    'roadmaps/**/*.ts',
    'docs/**/*.ts',
    'guards/**/*.ts',
    'app/**/*.{ts,tsx}',
    'tools/**/*.ts',
    'shared/**/*.ts',
    'dev/**/*.ts',
  ],
  generated: ['app/styles/tokens.ts', 'roadmaps/ids.ts'],
  react: ['app/**/*.tsx', 'app/components/**/*.ts'],
  entries: ENTRIES,
  parts: PARTS,
  // a tally a scan fills as it runs, mutated by design
  mutable: {
    'guards/expectedFiles/packReads.ts': ['EndpointFacts'],
    'guards/checks/checkWorld.ts': ['World'],
  },
  families: [
    { files: 'docs/rules/*.ts', names: ['rules'] },
    { files: 'docs/skills/*.ts', names: ['skill'] },
    { files: 'shared/rules/*.ts', names: ['shared'] },
    { files: 'dev/rules/*.ts', names: ['rules'] },
  ],
  brands: [],
  words: ['sheet/words/**'],
  markup: ['app/**/*.tsx'],
  barrels: [],
  tests: [],
  namedWaits: [],
  helpers: {
    none: 'its tests are one tier, tests/ under one vitest config: no helper serves two',
  },
  owners: Object.fromEntries(
    MODULE_FILES.flatMap((file) => {
      const entry = isEntry(file) ? null : entryOfPart(file);
      return entry === null ? [] : [[file, entry]];
    }),
  ),
  starts: readStarts(),
  components: ['app/components'],
  renderers: [],
  generators: GENERATORS,
  checks: {
    commit: ['test:architecture', 'checks:gate'],
    featureEnd: ['test'],
    cloning: [],
  },
  runsCode: {
    'guards/checks/checkWorld.ts':
      'a bundle the build wrote, run in the world a page gives it',
  },
  tables: [
    'docs/rules/*.ts',
    'dev/rules/*.ts',
    'shared/rules/*.ts',
    '!shared/rules/ruleFileFor.ts',
    'docs/process/plans/*.ts',
    'design-system/tokens/*.ts',
    'design-system/elements.ts',
    'design-system/fonts.ts',
    'app/workspace/boardView/boardWords.ts',
  ],
  unformatted: {
    '**/*.md': 'prose keeps the layout its writer gave it',
    'legacy/**': 'kept as it was',
    'records/**': "a release's record, as it was written",
    'fixtures/**': 'packs as cut, data as emitted, screens as taken',
    '.claude/**': "a session's settings, and the skills the build writes",
  },
  sentences: { code: [], prose: ['CLAUDE.md', SKILLS, 'docs/rules/*.md'] },
  ruleFiles: ['docs/rules/*.md', '!docs/rules/README.md'],
  namedPaths: {
    docs: NAMED_DOCS,
    roots: [
      'sheet',
      'roadmaps',
      'docs',
      'guards',
      'app',
      'records',
      'legacy',
      'fixtures',
      'tools',
      'tests',
      'notes',
    ],
  },
  instructions: {
    skills: [SKILLS],
    whole: [SKILLS],
    onDemand: ['docs/rules/*.md', 'docs/process/ticket-pipeline.md'],
    everyTurn: ['CLAUDE.md'],
  },
  typesOnly: ['**/*Types.ts', ...ENTRIES.map((entry) => `!${entry}`)],
  names: [
    {
      files: ENTRIES,
      stem: '^(?!index$)[a-z][A-Za-z0-9]*$',
      why: 'an entry is camelCase (docs/rules/names.md).',
    },
    {
      files: PARTS,
      stem: '^(?!index$)(?:[a-z][A-Za-z0-9]*|E\\d{2}[A-Za-z]*)$',
      why: 'a part is camelCase or its epic (docs/rules/names.md).',
    },
  ],
  nameCases: NAME_CASES,
  spelling: {
    files: SPELLED,
    computed: [],
    reviewed: [],
    onPurpose: [],
    // the run's progress words, in the PM's language
    alsoIn: [
      { language: 'pl', files: ['tools/runKeepsTheTurn.ts'], words: [] },
    ],
  },
};

export { SCOPE_PRESET };
