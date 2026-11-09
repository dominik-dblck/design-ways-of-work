// scope.ts · what this repository names once: its ESLint config, its shared tests and its tools read it
import type { RepoScope } from './shared/repoScope.ts';

const scope: RepoScope = {
  root: import.meta.dirname,
  ignores: [
    'node_modules/**',
    '.rehearsal/**',
    'legacy/**',
    // the files a rule's tests read as a program, wrong on purpose
    'tests/lint/fixtures/**',
  ],
  // the design side's tree, the build side's, and the rule files both read: each checked in its product
  productTrees: ['design/**', 'dev/**', 'shared/rules/**'],
  production: ['scripts/**/*.ts', 'shared/**/*.ts', 'design-system/**/*.ts'],
  generated: [],
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
  // a types file holds types alone, as the design side's (docs/rules/names.md)
  typesOnly: ['**/*Types.ts'],
  // no component tree of its own: design-system's atoms come by script
  components: [],
  // and no renderer drawn inside it
  renderers: [],
  // no file it writes from a source of its own
  generators: [],
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
    // PLAN.md out: the files it plans are to come; plan/ out: notes, naming what moved since
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
