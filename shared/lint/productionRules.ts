/**
 * - `productionRules` · production's own rules: size, the plugin's, its shapes
 * - a words table, a brand: each refused outside its home
 */
import type { Linter } from 'eslint';
import {
  BRAND_SHAPE,
  PRODUCTION_SHAPES,
  WORDS_SHAPE,
} from './productionShapes.ts';
import { testsOf } from '../repoScope.ts';
import type { RepoScope } from '../repoScope.ts';
import type { Shape } from './shapes.ts';

const SIZE: Linter.RulesRecord = {
  'max-lines': [
    'error',
    { max: 200, skipBlankLines: true, skipComments: true },
  ],
  'max-lines-per-function': [
    'error',
    { max: 40, skipBlankLines: true, skipComments: true },
  ],
  'max-depth': ['error', 3],
};

// a words file is `{name}Words.ts`, and any home a scope names besides
const WORDS_FILES = '**/*Words.ts';

const syntax = (...shapes: readonly Shape[]): Linter.RulesRecord => ({
  'wow/production-syntax': ['error', ...PRODUCTION_SHAPES, ...shapes],
});

// a home is a production file its glob names too: an inner list is every glob at once
const homes = (
  scope: RepoScope,
  globs: readonly string[],
): readonly (readonly string[])[] =>
  globs.flatMap((home) => scope.production.map((glob) => [glob, home]));

// the component roots' own rules: a file's one component, its tiers' counts, a renderer
const componentRules = (scope: RepoScope): Linter.RulesRecord => ({
  'wow/component-file-holds-its-component': [
    'error',
    { components: scope.components },
  ],
  'wow/molecules-compose-one-molecule': [
    'error',
    {
      tests: testsOf(scope),
      components: scope.components,
      renderers: scope.renderers,
    },
  ],
  'wow/renderer-stands-alone': [
    'error',
    { components: scope.components, renderers: scope.renderers },
  ],
});

const pluginRules = (
  scope: RepoScope,
  ignores: readonly string[],
): Linter.RulesRecord => ({
  'wow/no-ticket-names': 'error',
  'wow/comments-are-invariants': 'error',
  'wow/data-is-readonly': 'error',
  'wow/file-states-its-job': ['error', { entries: scope.entries }],
  'wow/file-names-its-purpose': [
    'error',
    {
      names: scope.names,
      typesOnly: scope.typesOnly,
      components: scope.components,
    },
  ],
  'wow/one-home-per-name': [
    'error',
    {
      files: scope.production,
      ignores: [...scope.ignores, ...scope.productTrees, ...ignores],
      entries: scope.entries,
      families: scope.families,
    },
  ],
  'wow/re-exports-in-barrels': [
    'error',
    { barrels: [...scope.entries, '**/index.ts', ...scope.barrels] },
  ],
  'wow/hooks-named-for-their-file': 'error',
  'wow/one-call-style': 'error',
  'wow/parts-serve-their-entry': ['error', { owners: scope.owners }],
  ...componentRules(scope),
});

// a type a scan fills as it runs is named, mutable by design
const productionRules = (scope: RepoScope): Linter.Config[] => {
  const ignores = [...testsOf(scope), ...scope.generated];
  return [
    {
      files: [...scope.production],
      ignores,
      rules: {
        ...SIZE,
        ...pluginRules(scope, ignores),
        ...syntax(WORDS_SHAPE, BRAND_SHAPE),
      },
    },
    ...[
      {
        files: homes(scope, [WORDS_FILES, ...scope.words]),
        rules: syntax(BRAND_SHAPE),
      },
      { files: homes(scope, scope.brands), rules: syntax(WORDS_SHAPE) },
    ]
      .filter((one) => one.files.length > 0)
      .map((one) => ({
        ...one,
        files: one.files.map((both) => [...both]),
        ignores,
      })),
    ...Object.entries(scope.mutable).map(([file, mutable]): Linter.Config => ({
      files: [file],
      rules: { 'wow/data-is-readonly': ['error', { mutable }] },
    })),
  ];
};

export { productionRules };
