/**
 * - `SKILLS`, `GENERATORS` · the skills the build writes; each script that writes
 * - `NAME_CASES`, `NAMED_DOCS`, `SPELLED` · names, docs' paths, the files spelled
 */
import type { Generator } from '../../shared/repoScope.ts';
import type { NameCase } from '../../shared/lint/fileRules.ts';

const SKILLS = '.claude/skills/*/SKILL.md';

// what the build writes from a module: the formatter's files, tsc's config, the documents, the taken files the build side reads
const GENERATORS: readonly Generator[] = [
  {
    script: 'shared/lint/writeFormatterFiles.ts',
    args: [],
    writes: ['.prettierignore'],
  },
  { script: 'tools/writeTsconfig.ts', args: [], writes: ['tsconfig.json'] },
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
  { script: 'tools/vendorInto.ts', args: [], writes: ['vendor/wow/**'] },
];

const NAME_CASES: readonly NameCase[] = [
  {
    folders: ['design-system/fonts'],
    kinds: { '.ttf': 'regex:^[A-Z][A-Za-z]+-[A-Z][A-Za-z]+$' },
    why: "a font keeps its foundry's name (`BasisGrotesquePro-Bold.ttf`), as its licence and the stylesheet name it",
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
    why: 'a source is named by the key of what it holds or writes: a rule group, a skill, a document',
  },
  {
    folders: ['**'],
    kinds: {
      '.dir': 'regex:^E\\d{2}$ | regex:^T-E\\d{2}-\\d{2}$',
      '.ts': 'regex:^E\\d{2}[A-Za-z0-9]*$',
      '.md': 'regex:^(?:[a-z]+-)?E\\d{2}$ | regex:^T-E\\d{2}-\\d{2}$',
    },
    why: 'a record is named by its id: an epic (`E04Tickets.ts`, `feature-E04.md`), a ticket (`T-E18-00.md`)',
  },
];

const NAMED_DOCS: readonly string[] = [
  '**/*.md',
  // an archive, a log or generated output: its paths are history
  '!records/**',
  '!legacy/**',
  '!notes/**',
  '!fixtures/**',
  '!roadmaps/*/feature-*.md',
  // the build side's process and way of working: their paths are the build repository's
  '!docs/process/ticket-pipeline.md',
  '!dev/**',
];

const SPELLED: readonly string[] = [
  'sheet/**/*.ts',
  'roadmaps/**/*.ts',
  'docs/**/*.ts',
  'guards/**/*.ts',
  'app/**/*.{ts,tsx}',
  'tools/**/*.ts',
  'shared/**/*.ts',
  '**/*.md',
  // an archive, a log, a trial, the build side's tree, what tools wrote: their words are another's
  '!records/**',
  '!legacy/**',
  '!notes/**',
  '!dev/**',
  '!fixtures/**',
];

export { GENERATORS, NAME_CASES, NAMED_DOCS, SKILLS, SPELLED };
