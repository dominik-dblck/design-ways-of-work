/**
 * - `testRules` · what a test takes: its shapes, SonarJS's own, its time moved
 * - and a browser tier's flows: an element reached by the registry alone
 */
import type { Linter } from 'eslint';
import { testsOf } from '../repoScope.ts';
import type { RepoScope } from '../repoScope.ts';
import { FLOW_SHAPES } from './flowShapes.ts';
import { restricted } from './restricted.ts';
import { SONAR_IN_TESTS } from './sonarRules.ts';
import { TEST_SHAPES } from './testShapes.ts';

// a product's flows, the files under its screens; none without a browser tier
const flowsOf = ({ browser }: RepoScope): readonly string[] =>
  'none' in browser ? [] : [`${browser.screensRoot}/**/*.ts`];

// the registry is data: a flow's list holds a test's shapes and the registry's reach
const flowRules = (scope: RepoScope): readonly Linter.Config[] =>
  'none' in scope.browser
    ? []
    : [
        {
          files: [...flowsOf(scope)],
          ignores: [`${scope.browser.registry}/**`],
          rules: restricted(TEST_SHAPES, FLOW_SHAPES),
        },
      ];

const testRules = (scope: RepoScope): readonly Linter.Config[] => [
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
      ...SONAR_IN_TESTS,
      '@typescript-eslint/consistent-type-assertions': 'off',
      'wow/no-mock-of-its-subject': 'error',
    },
  },
  {
    // the browser tier's framework and its flows run as tests do: their time is moved as theirs is
    files: [...testsOf(scope), 'shared/e2e/**', ...flowsOf(scope)],
    rules: {
      'wow/time-is-moved-not-waited': ['error', { named: scope.namedWaits }],
    },
  },
  ...flowRules(scope),
];

export { testRules };
