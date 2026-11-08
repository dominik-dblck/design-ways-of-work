// eslint.config.ts · the gates of the rules ESLint holds, over this repository's scripts; design/ is linted in a product
import js from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// a file a tool writes is exempt from the size rules (docs/rules/size.md · generated files)
const GENERATED: string[] = [];

const TESTS = ['tests/**', '**/*.test.{ts,tsx}', '**/*.test-d.ts'];

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.rehearsal/**',
      'design/**',
      'dev/**',
      'shared/**',
      'poc/**',
      '.artifact/**',
      '**/*.js',
      '**/*.mjs',
      '**/*.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: true, tsconfigRootDir: import.meta.dirname },
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      'no-undef': 'off',
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
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': true },
      ],
      'id-length': [
        'error',
        { min: 2, exceptions: ['_'], properties: 'never' },
      ],
    },
  },
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
  {
    files: [
      'sheet/**/*.ts',
      'roadmaps/**/*.ts',
      'docs/**/*.ts',
      'guards/**/*.ts',
      'app/**/*.{ts,tsx}',
      'tools/**/*.ts',
    ],
    ignores: [...TESTS, ...GENERATED],
    rules: {
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
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    plugins: { '@eslint-community/eslint-comments': comments },
    rules: { '@eslint-community/eslint-comments/require-description': 'error' },
  },
];
