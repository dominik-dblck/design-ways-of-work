/**
 * - `RepoScope` · what a repository names once, for its ESLint, shared tests, tools
 * - `testsOf` · the files read as tests: the convention (`TESTS`), and a scope's own
 */
import type { Family } from './lint/rules/oneHomePerName.ts';

interface RepoScope {
  readonly root: string;
  readonly ignores: readonly string[];
  readonly production: readonly string[];
  readonly generated: readonly string[];
  readonly react: readonly string[];
  readonly entries: readonly string[];
  readonly parts: readonly string[];
  readonly mutable: Readonly<Record<string, readonly string[]>>;
  readonly families: readonly Family[];
  readonly brands: readonly string[];
  readonly words: readonly string[];
  readonly markup: readonly string[];
  readonly barrels: readonly string[];
  readonly tests: readonly string[];
  readonly owners: Readonly<Record<string, string>>;
}

const TESTS = [
  'tests/**',
  '**/__tests__/**',
  '**/*.test.{ts,tsx}',
  '**/*.test-d.ts',
];

// a scope's own tests besides the convention: a repository's e2e folder
const testsOf = (scope: RepoScope): readonly string[] => [
  ...TESTS,
  ...scope.tests,
];

export { testsOf };
export type { RepoScope };
