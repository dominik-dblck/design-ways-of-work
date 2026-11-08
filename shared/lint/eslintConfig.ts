/**
 * - `eslintConfig` · one ESLint for every repository, each naming its own scope
 * - a scope names its React code, entries and parts; each kind takes its own shapes
 * - and the types mutable by design, and the families whose files share one name
 */
import js from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX from 'eslint-plugin-import-x';
import { defineConfig } from 'eslint/config';
import type { Linter } from 'eslint';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { namingRules } from './naming.ts';
import { productionRules } from './productionRules.ts';
import { testsOf } from '../repoScope.ts';
import type { RepoScope } from '../repoScope.ts';
import { componentTiers } from './componentTiers.ts';
import { resolutionOf } from './resolution.ts';
import { MARKUP_SHAPES, REACT_SHAPES } from './reactShapes.ts';
import { ENTRY_SHAPES, PART_SHAPES, SHAPES } from './shapes.ts';
import type { Shape } from './shapes.ts';
import { TEST_SHAPES } from './testShapes.ts';
import { wowPlugin } from './wowPlugin.ts';

const TYPES: Linter.RulesRecord = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    { assertionStyle: 'never' },
  ],
  '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': true }],
  'id-length': ['error', { min: 2, exceptions: ['_'], properties: 'never' }],
};

const IMPORTS: Linter.RulesRecord = {
  'import-x/no-cycle': ['error', { ignoreExternal: true }],
  'import-x/no-empty-named-blocks': 'error',
  'import-x/extensions': [
    'error',
    'always',
    { ignorePackages: true, checkTypeImports: true },
  ],
};

// every TypeScript file: the parser on the repository's tsconfig, the types, the shapes and the imports
const sourceRules = (root: string): Linter.Config => ({
  files: ['**/*.{ts,tsx}'],
  plugins: { 'import-x': importX },
  settings: {
    'import-x/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    // the repository's own resolution: its aliases, its extensions
    'import-x/resolver-next': [
      createTypeScriptImportResolver(resolutionOf(root)),
    ],
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { project: true, tsconfigRootDir: root },
    globals: { ...globals.node, ...globals.browser },
  },
  rules: {
    'no-undef': 'off',
    ...restricted(),
    ...namingRules({ react: false }),
    ...TYPES,
    ...IMPORTS,
  },
});

// the shapes every file refuses, and those its kind refuses besides
const restricted = (
  ...kinds: readonly (readonly Shape[])[]
): Linter.RulesRecord => ({
  'no-restricted-syntax': ['error', ...SHAPES, ...kinds.flat()],
});

// React code, entries and parts are three sets no file is in twice; markup takes a key of its own
const scopedRules = (scope: RepoScope): Linter.Config[] =>
  [
    {
      files: scope.react,
      rules: { ...restricted(REACT_SHAPES), ...namingRules({ react: true }) },
    },
    {
      files: scope.entries,
      rules: { ...restricted(ENTRY_SHAPES), ...AT_LOAD },
    },
    { files: scope.parts, rules: { ...restricted(PART_SHAPES), ...AT_LOAD } },
    {
      files: scope.markup,
      rules: MARKUP,
    },
  ]
    .filter((one) => one.files.length > 0)
    .map((one) => ({
      ...one,
      files: [...one.files],
      ignores: [...testsOf(scope), ...scope.generated],
    }));

const WOW: Linter.Config = { plugins: { wow: wowPlugin } };

const MARKUP: Linter.RulesRecord = {
  'wow/markup-syntax': ['error', ...MARKUP_SHAPES],
};

const AT_LOAD: Linter.RulesRecord = { 'wow/reads-nothing-at-load': 'error' };

const testRules = (scope: RepoScope): Linter.Config[] => [
  {
    files: ['**/*.test-d.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
    },
  },
  {
    files: [...testsOf(scope)],
    rules: {
      ...restricted(TEST_SHAPES),
      '@typescript-eslint/consistent-type-assertions': 'off',
      'wow/no-mock-of-its-subject': 'error',
    },
  },
];

const DISABLES: Linter.Config = {
  linterOptions: { reportUnusedDisableDirectives: 'error' },
  plugins: { '@eslint-community/eslint-comments': comments },
  rules: { '@eslint-community/eslint-comments/require-description': 'error' },
};

const eslintConfig = (scope: RepoScope): Linter.Config[] =>
  defineConfig(
    { ignores: ['**/*.js', '**/*.mjs', '**/*.d.ts', ...scope.ignores] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    WOW,
    sourceRules(scope.root),
    ...scopedRules(scope),
    ...testRules(scope),
    ...productionRules(scope),
    {
      ...componentTiers(scope.root),
      files: [...scope.production],
      ignores: [...testsOf(scope), ...scope.generated],
    },
    DISABLES,
  );

export { eslintConfig };
