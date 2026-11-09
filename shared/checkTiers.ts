/**
 * - `COMMIT`, `COMMIT_BUDGET_SECONDS`, `FEATURE_END` · each tier, both sides
 * - `TierCheck`, `CheckTiers` · a check by its script; a repository's own, by tier
 */

// a check by the package script that runs it on the tree; `onFiles`, its command on a change's files
interface TierCheck {
  readonly script: string;
  readonly onFiles?: (files: readonly string[]) => readonly string[];
}

// a repository's own checks, by the scripts that run them on the tree, beside the shared ones
interface CheckTiers {
  readonly commit: readonly string[];
  readonly featureEnd: readonly string[];
}

const TYPESCRIPT = /\.(ts|tsx|mts)$/;

// a commit's checks in all, past which one moves to the feature end
const COMMIT_BUDGET_SECONDS = 180;

// what a commit waits for: the files it touches, and the tree where a check costs seconds
const COMMIT: readonly TierCheck[] = [
  { script: 'lint:files' },
  { script: 'lint:deps' },
  {
    script: 'format:check',
    onFiles: (files) => [
      'prettier',
      '--check',
      '--ignore-unknown',
      '--log-level',
      'warn',
      ...files,
    ],
  },
  {
    script: 'lint:words',
    onFiles: (files) => [
      'cspell',
      '--no-progress',
      '--no-summary',
      '--no-must-find-files',
      ...files.flatMap((file) => ['--file', file]),
    ],
  },
  {
    script: 'lint',
    onFiles: (files: readonly string[]): readonly string[] => {
      const typescript = files.filter((file) => TYPESCRIPT.test(file));
      return typescript.length
        ? ['eslint', '--no-warn-ignored', ...typescript]
        : [];
    },
  },
  // a break in a file the change never touched shows only in the whole program
  { script: 'tsc' },
];

// what a feature's end adds to the commit's checks, run on the whole tree: what reads the program at once
const FEATURE_END: readonly TierCheck[] = [{ script: 'lint:exports' }];

export { COMMIT, COMMIT_BUDGET_SECONDS, FEATURE_END };
export type { TierCheck, CheckTiers };
