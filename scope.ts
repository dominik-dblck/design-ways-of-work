// scope.ts · what this repository names once: its ESLint config, its shared tests and its tools read it
import type { RepoScope } from './shared/repoScope.ts';

const scope: RepoScope = {
  root: import.meta.dirname,
  ignores: [
    'node_modules/**',
    '.rehearsal/**',
    'design/**',
    'dev/**',
    'shared/rules/**',
    'legacy/**',
    // the files a rule's tests read as a program, wrong on purpose
    'tests/lint/fixtures/**',
  ],
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
  // what runs with no script naming it: each script, each hook, the design system's face
  starts: ['scripts/*.ts', 'shared/hooks/*.ts', 'design-system/index.ts'],
  // its file names are the convention's alone
  names: [],
  // a types file holds types alone, as the design side's (docs/rules/names.md)
  typesOnly: ['**/*Types.ts'],
  // no component tree of its own: design-system's atoms come by script
  components: [],
  // with no component tree, no folder shape to keep
  componentShape: false,
  // and no renderer drawn inside it
  renderers: [],
  // no file it writes from a source of its own
  generators: [],
};

export { scope };
