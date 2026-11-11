/**
 * - `migrated` · a checkout of a repository made ready for the release in hand
 * - its removes and its moves through git, the files of its tree written and added
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import type { Migration } from './migrationTypes.ts';
import { childEnv } from './scratch.ts';

interface Migrating {
  // the checkout, and this repository: a migration's tree is a folder of it
  readonly root: string;
  readonly wow: string;
  readonly migration: Migration;
}

const treeFiles = (folder: string): readonly string[] =>
  fs
    .readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path.relative(folder, path.join(entry.parentPath, entry.name)),
    );

// through git's index and never a commit: the repository's hooks and its history stay its own
function migrated({ root, wow, migration }: Migrating): string {
  const git = (args: readonly string[]): void => {
    execFileSync('git', args, {
      cwd: root,
      env: childEnv(),
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  };
  const { removes, moves, tree } = migration;
  for (const file of removes) git(['rm', '-q', '--', file]);
  for (const [from, to] of moves) {
    fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true });
    git(['mv', '--', from, to]);
  }
  const from = tree === null ? '' : path.join(wow, tree);
  const written = tree === null ? [] : treeFiles(from);
  for (const file of written) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.copyFileSync(path.join(from, file), path.join(root, file));
  }
  if (written.length > 0) git(['add', '--', ...written]);
  return `${String(removes.length)} removed, ${String(moves.length)} moved, ${String(written.length)} written`;
}

export { migrated };
