// scope.ts · what this repository names once: its ESLint config, its shared tests and its tools read it
import type { RepoScope } from './shared/repoScope.ts';

const scope: RepoScope = {
  root: import.meta.dirname,
  // it holds the browser tier's framework and gates; a product runs them
  browser: {
    none: 'the way of working holds the framework, shared/e2e/, and a product runs it',
  },
  ignores: [
    'node_modules/**',
    '.rehearsal/**',
    'legacy/**',
    // the files a rule's tests read as a program, wrong on purpose
    'tests/lint/fixtures/**',
    // a browser tier of one screen, its gates' tests read
    'tests/browser/fixtures/**',
  ],
  // the design side's tree, the build side's, and the rule files both read: each checked in its product
  productTrees: ['design/**', 'dev/**', 'shared/rules/**'],
  production: ['scripts/**/*.ts', 'shared/**/*.ts', 'design-system/**/*.ts'],
  generated: ['design-system/guide.md'],
  react: [],
  entries: [],
  parts: [],
  mutable: {},
  families: [],
  brands: [],
  words: [],
  markup: [],
  barrels: [],
  tests: [],
  owners: {},
  // what runs with no script naming it: each script, each hook, the design system's face, the baseline a product's tests read
  starts: [
    'scripts/*.ts',
    'shared/hooks/*.ts',
    'design-system/index.ts',
    'shared/tests/baseline.ts',
  ],
  // its file names are the convention's alone
  names: [],
  nameCases: [
    {
      folders: ['design-system/fonts'],
      kinds: { '.ttf': 'regex:^[A-Z][A-Za-z]+-[A-Z][A-Za-z]+$' },
      why: "a font keeps its foundry's name (`BasisGrotesquePro-Bold.ttf`), as its licence and the stylesheet name it",
    },
    {
      folders: ['shared/rules'],
      kinds: { '.ts': 'kebab-case' },
      why: "a rule file is named by its group's key, the key its markdown and its readers name (D29)",
    },
    {
      folders: ['tests/lint/fixtures'],
      kinds: { '.dir': 'PascalCase', '.ts': 'PascalCase' },
      why: "a rule's fixture copies a product's tree: a component's folder and own file are PascalCase",
    },
    {
      folders: ['tests/browser/fixtures'],
      kinds: { '.dir': 'camelCase', '.md': 'regex:^[a-z][A-Za-z]+-status$' },
      why: "a browser tier's fixture copies a product's tree: a screen's folder is its catalogue's camelCase name, its status `{screen}-status.md`",
    },
  ],
  // a types file holds types alone, as the design side's (docs/rules/names.md)
  typesOnly: ['**/*Types.ts'],
  // no component tree of its own: design-system's atoms come by script
  components: [],
  // and no renderer drawn inside it
  renderers: [],
  // prettier's two files, from this scope
  generators: [
    {
      script: 'shared/lint/writeFormatterFiles.ts',
      args: [],
      writes: ['.prettierrc.json', '.prettierignore'],
    },
    {
      script: 'design-system/writeGuide.ts',
      args: [],
      writes: ['design-system/guide.md'],
    },
  ],
  // its own checks beside the shared tiers: the copies, its rules' tests, the shared tests, its tools' tests, its kept rules; the products' at the end
  checks: {
    commit: [
      'lint:copies',
      'test:rules',
      'test:shared',
      'test:tools',
      'lint:kept',
    ],
    featureEnd: ['verify'],
  },
  // no file of its own runs code it built
  runsCode: {},
  // the design system's tables: a row one line however long (shared/lint/prettierConfig.ts)
  tables: [
    'design-system/tokens/*.ts',
    'design-system/elements.ts',
    'design-system/fonts.ts',
  ],
  unformatted: {
    '**/*.md': 'prose keeps the layout its writer gave it',
    'plan/**': "a run's notes and maps, as written",
    'ports/**': 'a port, as its script writes it',
  },
  // no skill, and no instruction an agent loads: its sessions read the products'
  instructions: { skills: [], whole: [], onDemand: [], everyTurn: [] },
  // its own code's strings and both sides' trees: a rule's text, a check's finding, each written once
  sentences: {
    code: [
      'scripts/**/*.ts',
      'shared/**/*.ts',
      'design-system/**/*.ts',
      'shared/rules/**/*.ts',
      'design/**/*.{ts,tsx}',
      'dev/**/*.{ts,tsx}',
      '!**/*.test.{ts,tsx}',
      '!**/__fixtures__/**',
    ],
    prose: [],
  },
  // no rule table of its own: the products' rule files, each checked in its product
  ruleFiles: [],
  namedPaths: {
    // plan/ out: its plan names files to come, its notes what moved since
    docs: ['README.md', 'design-system/**/*.md'],
    roots: [
      'scripts',
      'shared',
      'design-system',
      'tests',
      'ports',
      'plan',
      'design',
      'dev',
      'legacy',
    ],
  },
  spelling: {
    files: [
      '**/*.{ts,tsx,md}',
      // notes about the products, in their words, and the PM's own, quoted in Polish
      '!plan/**',
    ],
    // none: the way of working's own words are WOW_WORDS, in every repository
    computed: [],
    reviewed: [],
    onPurpose: [],
    alsoIn: [],
  },
};

export { scope };
