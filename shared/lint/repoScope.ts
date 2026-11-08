/**
 * - `RepoScope` · what a repository names for the shared ESLint: kinds and homes
 * - `TESTS` · the files every repository reads as tests
 */
import type { Family } from './rules/oneHomePerName.ts';

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
}

const TESTS = [
  'tests/**',
  '**/__tests__/**',
  '**/*.test.{ts,tsx}',
  '**/*.test-d.ts',
];

export { TESTS };
export type { RepoScope };
