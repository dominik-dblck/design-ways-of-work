/**
 * - `SCOPE_PRESET_CUT` · eagle-design's scope, cut to what differs from the preset
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const SCOPE = 'scope.ts';

// its head: the layout's reads give way to the preset
const HEAD_BEFORE = `// scope.ts · what the design project names once: its ESLint config, its shared tests and its tools read it
import type { RepoScope } from './shared/repoScope.ts';
import {
  BY_DOCUMENT_ID,
  CAMPAIGNS,
} from './sheet/model/catalog/catalogCampaigns.ts';
import { PEOPLE } from './sheet/model/directory/people.ts';
import { entryOfPart, filesOf, isEntry } from './tools/layout.ts';
import { readStarts } from './tools/readStarts.ts';

// the modules' files, as tools/layout.ts places them: an entry's API and a part's values take their own case
const MODULE_FILES = filesOf().filter(
  (file) => file.endsWith('.ts') && !/\\.(d|test)\\.ts$/.test(file),
);

const ENTRIES = MODULE_FILES.filter(isEntry);
const PARTS = MODULE_FILES.filter(
  (file) => !isEntry(file) && entryOfPart(file) !== null,
);

// each skill, which the build writes from docs/skills/
const SKILLS = '.claude/skills/*/SKILL.md';

`;

const HEAD_AFTER = `// scope.ts · the way of working's preset, and what this design project names of its own
import type { RepoScope } from './shared/repoScope.ts';
import {
  BY_DOCUMENT_ID,
  CAMPAIGNS,
} from './sheet/model/catalog/catalogCampaigns.ts';
import { PEOPLE } from './sheet/model/directory/people.ts';
import { SCOPE_PRESET } from './tools/scopePreset.ts';

`;

// its object up to its words on purpose: what the preset holds leaves, what is its own stays
const BODY_BEFORE = `const scope: RepoScope = {
  root: import.meta.dirname,
  // each commit bundled under ~/backups and its branch pushed here, by the post-commit hook
  backup: { remote: 'https://github.com/dominik-dblck/eagle-design.git' },
  // its TypeScript beyond the design layout: the assets' manifest
  extraRoots: ['public'],
  // no browser tier (PM, 9 Nov · Q2 A): held by its lints, tsc and branded types
  browser: {
    none: 'its app is for the PM and the team to look at; the build side runs the full suite (PM, 9 Nov)',
  },
  // legacy/ is kept as it was (D24), never checked; vendor/wow/ the taken files as the take wrote them; a check's snapshot as its run took it
  ignores: [
    'dist/**',
    'node_modules/**',
    '.artifact/**',
    'vendor/**',
    'legacy/**',
    'guards/__snapshots__/**',
  ],
  // the build side's .claude/, held for it: its scope reads the data, its product checks the tree
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
  // a file a tool writes is exempt from the size rules (docs/rules/size.md · generated files)
  generated: ['app/styles/tokens.ts', 'roadmaps/ids.ts'],
  react: ['app/**/*.tsx', 'app/components/**/*.ts'],
  entries: ENTRIES,
  parts: PARTS,
  // a tally a scan fills as it runs, mutated by design
  mutable: {
    'guards/expectedFiles/packReads.ts': ['EndpointFacts'],
    'sheet/samples/payloads/payloadsTypes.ts': ['WalkState'],
    'sheet/logic/approval/roleCombinations/combinationRows.ts': ['ClassTally'],
    'sheet/screens/screenView/screenViewTypes.ts': ['Gaps'],
    'guards/checks/checkWorld.ts': ['World'],
  },
  // each file of a family exports one name, and its loader reads every file
  families: [
    { files: 'docs/rules/*.ts', names: ['rules'] },
    { files: 'docs/skills/*.ts', names: ['skill'] },
    { files: 'shared/rules/*.ts', names: ['shared'] },
    { files: 'dev/rules/*.ts', names: ['rules'] },
  ],
  // no brand is minted here: the sheet carries no zod
  brands: [],
  // the sheet's words home, besides each \`{name}Words.ts\`
  words: ['sheet/words/**'],
  // what a person reads is drawn in TSX
  markup: ['app/**/*.tsx'],
  // barrels besides the entries and each \`index.ts\`: none
  barrels: [],
  // its tests are the convention's
  tests: [],
  namedWaits: [],
  helpers: {
    none: 'its tests are one tier, tests/ under one vitest config: no helper serves two',
  },
  // each part with the entry it serves, as tools/layout.ts places them
  owners: Object.fromEntries(
    MODULE_FILES.flatMap((file) => {
      const entry = isEntry(file) ? null : entryOfPart(file);
      return entry === null ? [] : [[file, entry]];
    }),
  ),
  // what a read starts from, beside the entries: each page the build bundles, each module it writes as data, each the build side reads by name
  starts: readStarts(),
  // the one component tree, its atomic tiers (docs/rules/components.md)
  components: ['app/components'],
  // no renderer: no app drawn inside the app (docs/rules/components.md)
  renderers: [],
  // what the build writes from a module: the emitted JSON, rule files, skills, documents, tokens
  generators: [
    {
      script: 'shared/lint/writeFormatterFiles.ts',
      args: [],
      writes: ['.prettierignore'],
    },
    {
      script: 'tools/writeTsconfig.ts',
      args: [],
      writes: ['tsconfig.json'],
    },
    {
      script: 'tools/emitInto.ts',
      args: [],
      writes: [
        'docs/rules/*.md',
        '!docs/rules/README.md',
        'dev/rules/*.md',
        'dev/map.md',
        'docs/process/*.md',
        'sheet/contract/*.md',
        'fixtures/data/*.json',
        SKILLS,
        'app/styles/tokens.ts',
        'roadmaps/ids.ts',
      ],
    },
    // the taken files the build side's modules read, copied so one commit holds every read
    {
      script: 'tools/vendorInto.ts',
      args: [],
      writes: ['vendor/wow/**'],
    },
  ],
  // its own checks beside the shared tiers: at a commit the architecture tests and the sheet's checks on a fresh
  // build (~25 s together), at a feature's end every test
  checks: {
    commit: ['test:architecture', 'checks:gate'],
    featureEnd: ['test'],
  },
  // a check that runs code the project built, as its page runs it: SonarJS's \`code-eval\` is off there alone
  runsCode: {
    'guards/checks/checkWorld.ts':
      'a bundle the build wrote, run in the world a page gives it',
  },
  // the tables whose rows are objects (rules, plans, tokens, words): a row one line however long (shared/lint/prettierConfig.ts)
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
    'legacy/**': 'kept as it was (D24)',
    'records/**': "a release's record, as it was written",
    'fixtures/**': 'packs as cut, data as emitted, screens as taken',
    'public/**': 'assets as their source gives them',
    '.claude/**': "a session's settings, and the skills the build writes",
    'eslint-suppressions.json':
      'ESLint writes its known fails (\`--suppress-rule\`, \`--prune-suppressions\`)',
  },
  // a skill is read whole when it loads, the rule files when a skill or CLAUDE.md sends a reader there
  // the process's prose: a sentence of it written once (its UI's have their home, sheet/words/messages.ts)
  sentences: { code: [], prose: ['CLAUDE.md', SKILLS, 'docs/rules/*.md'] },
  // the rule tables, the folder's index aside
  ruleFiles: ['docs/rules/*.md', '!docs/rules/README.md'],
  namedPaths: {
    docs: [
      '**/*.md',
      // an archive, a log or generated output: its paths are history
      '!records/**',
      '!legacy/**',
      '!notes/**',
      '!fixtures/**',
      // a closed epic's notebook, frozen as it closed (aClosedNotebookIsFrozen)
      '!roadmaps/*/feature-*.md',
      // the build side's process and way of working: their paths are the build repository's
      '!docs/process/ticket-pipeline.md',
      '!docs/process/agent-instructions.md',
      '!dev/**',
    ],
    roots: [
      'sheet',
      'roadmaps',
      'docs',
      'guards',
      'app',
      'records',
      'legacy',
      'public',
      'fixtures',
      'tools',
      'tests',
      'notes',
    ],
  },
  instructions: {
    skills: [SKILLS],
    whole: [SKILLS],
    // the rules, and the long documents the build side reads in part
    onDemand: [
      'docs/rules/*.md',
      'docs/process/ticket-pipeline.md',
      'sheet/contract/api-convention.md',
    ],
    everyTurn: ['CLAUDE.md'],
  },
  // a types file holds types alone; an entry is a module whatever its noun, \`contentTypes.ts\` (docs/rules/names.md)
  typesOnly: ['**/*Types.ts', ...ENTRIES.map((entry) => \`!\${entry}\`)],
  // a module's file takes its kind's case, and never \`index\` (docs/rules/names.md)
  names: [
    {
      files: ENTRIES,
      stem: '^(?!index$)[a-z][A-Za-z0-9]*$',
      why: 'an entry is camelCase (docs/rules/names.md).',
    },
    {
      files: PARTS,
      stem: '^(?!index$)(?:[a-z][A-Za-z0-9]*|E\\\\d{2}[A-Za-z]*)$',
      why: 'a part is camelCase or its epic (docs/rules/names.md).',
    },
  ],
  // a name beyond its kind's case, each by its why (shared/lint/fileRules.ts)
  nameCases: [
    {
      folders: ['design-system/fonts'],
      kinds: { '.ttf': 'regex:^[A-Z][A-Za-z]+-[A-Z][A-Za-z]+$' },
      why: "a font keeps its foundry's name (\`BasisGrotesquePro-Bold.ttf\`), as its licence and the stylesheet name it",
    },
    {
      folders: [
        'docs/rules',
        'docs/skills',
        'docs/documents',
        'dev/rules',
        'shared/rules',
      ],
      kinds: { '.ts': 'kebab-case' },
      why: 'a source is named by the key of what it holds or writes: a rule group (D29), a skill, a document',
    },
    {
      folders: ['**'],
      kinds: {
        '.dir': 'regex:^E\\\\d{2}$ | regex:^T-E\\\\d{2}-\\\\d{2}$',
        '.ts': 'regex:^E\\\\d{2}[A-Za-z0-9]*$',
        '.md': 'regex:^(?:[a-z]+-)?E\\\\d{2}$ | regex:^T-E\\\\d{2}-\\\\d{2}$',
      },
      why: 'a record is named by its id: an epic (\`E04Tickets.ts\`, \`feature-E04.md\`), a ticket (\`T-E18-00.md\`)',
    },
    {
      folders: ['public/assets/icons', 'fixtures/screens'],
      kinds: { '.svg': 'snake_case', '.md': 'regex:^SOURCE$' },
      why: "an icon keeps its source's name (\`ic_de_color_flag.svg\`, the Deblock design system's), its folder's \`SOURCE.md\` saying where each came from; a screen's record holds the copies it was drawn with",
    },
  ],
  spelling: {
    files: [
      'sheet/**/*.ts',
      'roadmaps/**/*.ts',
      'docs/**/*.ts',
      'guards/**/*.ts',
      'app/**/*.{ts,tsx}',
      'tools/**/*.ts',
      'shared/**/*.ts',
      '**/*.md',
      // an archive, a log, a trial: their words are history
      '!records/**',
      '!legacy/**',
      '!notes/**',
      // the build side's tree, spelled in its product, in its words
      '!dev/**',
      // what tools wrote and the record keeps: packs as cut, data as emitted
      '!fixtures/**',
      // a sample in the languages a document is translated to: no dictionary of theirs is bundled
      '!sheet/samples/blocks/localeRows.ts',
      '!sheet/samples/payloads/runFacts.ts',
      '!sheet/words/messages/screenThree.ts',
    ],
    // the people's names and the catalog's ids, from the sheet's data
    computed: lettersOf([
      ...PEOPLE.map((person) => person.name),
      ...CAMPAIGNS.map((campaign) => campaign.id),
      ...Object.keys(BY_DOCUMENT_ID),
    ]),
    reviewed: SHEET_WORDS,
`;

const BODY_AFTER = `const scope: RepoScope = {
  ...SCOPE_PRESET,
  // each commit bundled under ~/backups and its branch pushed here, by the post-commit hook
  backup: { remote: 'https://github.com/dominik-dblck/eagle-design.git' },
  // its TypeScript beyond the design layout: the assets' manifest
  extraRoots: ['public'],
  // no browser tier (PM, 9 Nov · Q2 A): held by its lints, tsc and branded types
  browser: {
    none: 'its app is for the PM and the team to look at; the build side runs the full suite (PM, 9 Nov)',
  },
  // a tally a scan fills as it runs, mutated by design
  mutable: {
    ...SCOPE_PRESET.mutable,
    'sheet/samples/payloads/payloadsTypes.ts': ['WalkState'],
    'sheet/logic/approval/roleCombinations/combinationRows.ts': ['ClassTally'],
    'sheet/screens/screenView/screenViewTypes.ts': ['Gaps'],
  },
  unformatted: {
    '**/*.md': 'prose keeps the layout its writer gave it',
    'legacy/**': 'kept as it was (D24)',
    'records/**': "a release's record, as it was written",
    'fixtures/**': 'packs as cut, data as emitted, screens as taken',
    'public/**': 'assets as their source gives them',
    '.claude/**': "a session's settings, and the skills the build writes",
    'eslint-suppressions.json':
      'ESLint writes its known fails (\`--suppress-rule\`, \`--prune-suppressions\`)',
  },
  namedPaths: {
    docs: [...SCOPE_PRESET.namedPaths.docs, '!docs/process/agent-instructions.md'],
    roots: [...SCOPE_PRESET.namedPaths.roots, 'public'],
  },
  instructions: {
    ...SCOPE_PRESET.instructions,
    onDemand: [
      ...SCOPE_PRESET.instructions.onDemand,
      'sheet/contract/api-convention.md',
    ],
  },
  nameCases: [
    ...SCOPE_PRESET.nameCases,
    {
      folders: ['public/assets/icons', 'fixtures/screens'],
      kinds: { '.svg': 'snake_case', '.md': 'regex:^SOURCE$' },
      why: "an icon keeps its source's name (\`ic_de_color_flag.svg\`, the Deblock design system's), its folder's \`SOURCE.md\` saying where each came from; a screen's record holds the copies it was drawn with",
    },
  ],
  spelling: {
    files: [
      ...SCOPE_PRESET.spelling.files,
      // a sample in the languages a document is translated to: no dictionary of theirs is bundled
      '!sheet/samples/blocks/localeRows.ts',
      '!sheet/samples/payloads/runFacts.ts',
      '!sheet/words/messages/screenThree.ts',
    ],
    // the people's names and the catalog's ids, from the sheet's data
    computed: lettersOf([
      ...PEOPLE.map((person) => person.name),
      ...CAMPAIGNS.map((campaign) => campaign.id),
      ...Object.keys(BY_DOCUMENT_ID),
    ]),
    reviewed: SHEET_WORDS,
`;

const SCOPE_PRESET_CUT: Migration = {
  release: '0.15.0',
  removes: [],
  moves: [],
  edits: [
    { file: SCOPE, from: HEAD_BEFORE, to: HEAD_AFTER },
    { file: SCOPE, from: BODY_BEFORE, to: BODY_AFTER },
  ],
  tree: null,
};

export { SCOPE_PRESET_CUT };
