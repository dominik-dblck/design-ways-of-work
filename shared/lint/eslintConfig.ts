/**
 * - `eslintConfig` · one ESLint for every repository, each naming its own scope
 */
import js from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments';
import importX, { createNodeResolver } from 'eslint-plugin-import-x';
import { defineConfig } from 'eslint/config';
import type { Linter } from 'eslint';
import globals from 'globals';
import tseslint from 'typescript-eslint';

interface RepoScope {
  readonly root: string;
  readonly ignores: readonly string[];
  readonly production: readonly string[];
  readonly generated: readonly string[];
}

const TESTS = ['tests/**', '**/*.test.{ts,tsx}', '**/*.test-d.ts'];

// shapes no-restricted-syntax refuses, each with the rule row it holds
const SHAPES = [
  {
    selector:
      ':function[params.length>2]:not(CallExpression > :function, NewExpression > :function)',
    message:
      'Past two parameters a function takes one object (docs/rules/functions.md); a callback keeps its caller’s shape.',
  },
  {
    selector:
      'ConditionalExpression > ConditionalExpression > ConditionalExpression',
    message:
      'No ternary chain three deep (docs/rules/functions.md): name the branches, or a lookup.',
  },
  {
    selector: 'ExportNamedDeclaration[source][specifiers.length=0]',
    message:
      'An export names what it takes, never an empty clause (docs/rules/names.md).',
  },
];

const SIZE: Linter.RulesRecord = {
  'max-lines': [
    'error',
    { max: 200, skipBlankLines: true, skipComments: true },
  ],
  'max-lines-per-function': [
    'error',
    { max: 40, skipBlankLines: true, skipComments: true },
  ],
  complexity: ['error', 10],
  'max-depth': ['error', 3],
};

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
    'import-x/resolver-next': [
      createNodeResolver({ extensions: ['.ts', '.tsx', '.json'] }),
    ],
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { project: true, tsconfigRootDir: root },
    globals: { ...globals.node, ...globals.browser },
  },
  rules: {
    'no-undef': 'off',
    'no-restricted-syntax': ['error', ...SHAPES],
    ...TYPES,
    ...IMPORTS,
  },
});

const TEST_RULES: Linter.Config[] = [
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
    files: TESTS,
    rules: { '@typescript-eslint/consistent-type-assertions': 'off' },
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
    sourceRules(scope.root),
    ...TEST_RULES,
    {
      files: [...scope.production],
      ignores: [...TESTS, ...scope.generated],
      rules: SIZE,
    },
    DISABLES,
  );

export { eslintConfig };
