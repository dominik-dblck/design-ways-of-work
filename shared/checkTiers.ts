/**
 * - `COMMIT`, `COMMIT_BUDGET_SECONDS`, `FEATURE_END` · each tier, both sides
 * - `TierCheck`, `CheckTiers` · a check by its script; a repository's own, by tier
 * - `TYPESCRIPT`, `rootEslintConfig` · what ESLint reads, and by which config
 */
import fs from 'node:fs';
import path from 'node:path';

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

// ESLint's own names for a config, in the order it tries them
const ESLINT_CONFIGS = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
  'eslint.config.ts',
  'eslint.config.mts',
  'eslint.config.cts',
] as const;

// every file by the root's config, never a nearer one: a home's config under design/ is its product's
const rootEslintConfig = (root: string): string | undefined =>
  ESLINT_CONFIGS.map((name) => path.join(root, name)).find((file) =>
    fs.existsSync(file),
  );

// a commit's checks in all, past which one moves to the feature end
const COMMIT_BUDGET_SECONDS = 180;

// a tool handed no file reads none: a change that holds no file runs none
const onSome =
  (command: (files: readonly string[]) => readonly string[]) =>
  (files: readonly string[]): readonly string[] =>
    files.length ? command(files) : [];

// what a commit waits for: the files it touches, and the tree where a check costs seconds
const COMMIT: readonly TierCheck[] = [
  { script: 'lint:files' },
  { script: 'lint:deps' },
  {
    script: 'format:check',
    onFiles: onSome((files) => [
      'prettier',
      '--check',
      '--ignore-unknown',
      '--log-level',
      'warn',
      ...files,
    ]),
  },
  {
    script: 'lint:words',
    onFiles: onSome((files) => [
      'cspell',
      '--no-progress',
      '--no-summary',
      '--no-must-find-files',
      ...files.flatMap((file) => ['--file', file]),
    ]),
  },
  {
    script: 'lint',
    onFiles: (files: readonly string[]): readonly string[] => {
      const typescript = files.filter((file) => TYPESCRIPT.test(file));
      const config = rootEslintConfig(process.cwd());
      const named = config === undefined ? [] : ['-c', config];
      return typescript.length
        ? ['eslint', '--no-warn-ignored', ...named, ...typescript]
        : [];
    },
  },
  // a break in a file the change never touched shows only in the whole program
  { script: 'tsc' },
];

// what a feature's end adds to the commit's checks, run on the whole tree: what reads the program at once
const FEATURE_END: readonly TierCheck[] = [{ script: 'lint:exports' }];

export {
  COMMIT,
  COMMIT_BUDGET_SECONDS,
  FEATURE_END,
  rootEslintConfig,
  TYPESCRIPT,
};
export type { TierCheck, CheckTiers };
