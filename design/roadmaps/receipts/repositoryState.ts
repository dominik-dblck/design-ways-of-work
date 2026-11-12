/**
 * - `RepositoryState` · the build repository whole at a report's commit
 * - each number as the repository's own tools gave it · one they cannot give is null
 */
interface RepositoryState {
  readonly commit: string;
  // the suite's passed and skipped tests, and every Playwright test listed
  readonly tests: number | null;
  readonly skipped: number | null;
  readonly e2e: number | null;
  // the last coverage run's percents, at the commit it ran on
  readonly coverage: {
    readonly commit: string;
    readonly lines: number | null;
    readonly branches: number | null;
    readonly functions: number | null;
    readonly statements: number | null;
  } | null;
}

export type { RepositoryState };
