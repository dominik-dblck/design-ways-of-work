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
import { restricted } from './restricted.ts';
import { ENTRY_SHAPES, PART_SHAPES } from './shapes.ts';
import { SONAR } from './sonarRules.ts';
import { testRules } from './testRules.ts';
import { wowPlugin } from './wowPlugin.ts';

const TYPES: Linter.RulesRecord = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  // ESLint's `builtinRules` alone: the one door to a core rule's module, marked deprecated with no successor
  '@typescript-eslint/no-deprecated': [
    'error',
    {
      allow: [
        {
          from: 'file',
          path: 'node_modules/eslint/lib/types/use-at-your-own-risk.d.ts',
          name: 'builtinRules',
        },
      ],
    },
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    { assertionStyle: 'never' },
  ],
  '@typescript-eslint/no-non-null-assertion': 'error',
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

// a table's rows print at full width (shared/lint/prettierConfig.ts): code in one would never wrap
const tableRules = (scope: RepoScope): readonly Linter.Config[] => {
  const files = scope.tables.filter((glob) => !glob.startsWith('!'));
  const ignores = scope.tables
    .filter((glob) => glob.startsWith('!'))
    .map((glob) => glob.slice(1));
  const selector =
    'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression, ClassDeclaration';
  const message =
    "A table's file holds data alone: its rows print at full width, so its code moves to a file of its own (docs/rules/checks.md).";
  return files.length === 0
    ? []
    : [
        {
          files,
          ignores,
          rules: { 'wow/table-syntax': ['error', { selector, message }] },
        },
      ];
};

const DISABLES: Linter.Config = {
  linterOptions: { reportUnusedDisableDirectives: 'error' },
  plugins: { '@eslint-community/eslint-comments': comments },
  rules: { '@eslint-community/eslint-comments/require-description': 'error' },
};

// a file the scope names as running code the project built: SonarJS's `code-eval` off there, by the scope's why
const runsCodeRules = (scope: RepoScope): readonly Linter.Config[] =>
  Object.keys(scope.runsCode).length
    ? [
        {
          files: Object.keys(scope.runsCode),
          rules: { 'sonarjs/code-eval': 'off' },
        },
      ]
    : [];

const eslintConfig = (scope: RepoScope): Linter.Config[] =>
  defineConfig(
    {
      ignores: [
        '**/*.js',
        '**/*.mjs',
        '**/*.d.ts',
        ...scope.ignores,
        ...scope.productTrees,
      ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    WOW,
    sourceRules(scope.root),
    { ...SONAR, files: ['**/*.{ts,tsx}'] },
    ...runsCodeRules(scope),
    ...scopedRules(scope),
    ...tableRules(scope),
    ...testRules(scope),
    ...productionRules(scope),
    {
      ...componentTiers(scope),
      files: [...scope.production],
      ignores: [...testsOf(scope), ...scope.generated],
    },
    DISABLES,
  );

export { eslintConfig };
