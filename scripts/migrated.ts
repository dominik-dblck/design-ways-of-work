/**
 * - `migrated` · a checkout of a repository made ready for the release in hand
 * - its removes and moves through git, imports following; its edits; its tree
 * - `isDue` · a repository pinned before the migration's release has not taken it
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { KEPT_IN_A_PRODUCT } from './keptWords.ts';
import { importsMoved } from './movePaths.ts';
import type { Migration } from './migrationTypes.ts';
import { childEnv } from './scratch.ts';

interface Migrating {
  // the checkout, and this repository: a migration's tree is a folder of it
  readonly root: string;
  readonly wow: string;
  readonly migration: Migration;
}

type Git = (args: readonly string[]) => string;

const CODE = /\.(ts|tsx|mts)$/;

const treeFiles = (folder: string): readonly string[] =>
  fs
    .readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path.relative(folder, path.join(entry.parentPath, entry.name)),
    );

// each code file's relative imports written again around the moves, read where it stands now
function followed(
  root: string,
  { git, moves }: { readonly git: Git; readonly moves: Migration['moves'] },
): readonly string[] {
  if (moves.length === 0) return [];
  const forward = new Map(moves.map(([from, to]) => [from, to]));
  const back = new Map(moves.map(([from, to]) => [to, from]));
  const isBarrelled = (folder: string): boolean =>
    fs.existsSync(path.join(root, folder, 'index.ts'));
  return git(['ls-files', '-z'])
    .split('\0')
    .filter((file) => CODE.test(file) && !KEPT_IN_A_PRODUCT.test(file))
    .filter((now) => {
      const full = path.join(root, now);
      const text = fs.readFileSync(full, 'utf8');
      const file = back.get(now) ?? now;
      const after = importsMoved(text, { file, moves: forward, isBarrelled });
      if (after !== text) fs.writeFileSync(full, after);
      return after !== text;
    });
}

// a version is numbers and dots: a pre-release would order by nothing
function partsOf(version: string): readonly number[] {
  const parts = version.split('.').map(Number);
  if (parts.some((part) => !Number.isInteger(part)))
    throw new Error(`${version}: a version is numbers and dots`);
  return parts;
}

// read left to right, a part a version lacks being 0: the first that differs orders them
function isBefore(one: string, other: string): boolean {
  const [left, right] = [partsOf(one), partsOf(other)];
  const places = Array.from(
    { length: Math.max(left.length, right.length) },
    (_, at) => [left[at] ?? 0, right[at] ?? 0] as const,
  );
  const differs = places.find(([mine, theirs]) => mine !== theirs);
  return differs !== undefined && differs[0] < differs[1];
}

const isDue = (migration: Migration, pinned: string): boolean =>
  isBefore(pinned, migration.release);

// a tracked file gone from the disk, and each file it removes or moves that git or the disk lacks
function absentIn(
  root: string,
  { git, migration }: { readonly git: Git; readonly migration: Migration },
): readonly string[] {
  const tracked = new Set(git(['ls-files', '-z']).split('\0'));
  const deleted = git(['ls-files', '--deleted', '-z']).split('\0');
  const taken = [
    ...migration.removes,
    ...migration.moves.map(([from]) => from),
  ].filter(
    (file) => !tracked.has(file) || !fs.existsSync(path.join(root, file)),
  );
  return [...new Set([...deleted.filter(Boolean), ...taken])];
}

// a text found exactly once in its file, or every time when asked, written as asked; anything else stops the migration
function edited(root: string, edits: Migration['edits']): readonly string[] {
  for (const { file, from, to, isEveryPlace } of edits ?? []) {
    const full = path.join(root, file);
    const text = fs.readFileSync(full, 'utf8');
    const found = text.split(from).length - 1;
    if (isEveryPlace ? found === 0 : found !== 1)
      throw new Error(`${file}: the edit’s text stands ${String(found)} times`);
    fs.writeFileSync(
      full,
      isEveryPlace
        ? text.replaceAll(from, () => to)
        : text.replace(from, () => to),
    );
  }
  return (edits ?? []).map(({ file }) => file);
}

// through git's index and never a commit: the repository's hooks and its history stay its own
function migrated({ root, wow, migration }: Migrating): string {
  const git: Git = (args) =>
    execFileSync('git', args, {
      cwd: root,
      env: childEnv(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  const { removes, moves, tree } = migration;
  const absent = absentIn(root, { git, migration });
  if (absent.length > 0)
    throw new Error(
      `the checkout lacks what the migration takes, so nothing moved: ${absent.join(', ')}`,
    );
  for (const file of removes) git(['rm', '-q', '--', file]);
  for (const [from, to] of moves) {
    fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true });
    git(['mv', '--', from, to]);
  }
  const rewritten = followed(root, { git, moves });
  const changed = [
    ...new Set([...rewritten, ...edited(root, migration.edits)]),
  ];
  const from = tree === null ? '' : path.join(wow, tree);
  const written = tree === null ? [] : treeFiles(from);
  for (const file of written) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.copyFileSync(path.join(from, file), path.join(root, file));
  }
  if (changed.length + written.length > 0)
    git(['add', '--', ...changed, ...written]);
  return `${String(removes.length)} removed, ${String(moves.length)} moved, ${String(rewritten.length)} following, ${String(migration.edits?.length ?? 0)} edited, ${String(written.length)} written`;
}

export { isDue, migrated };
