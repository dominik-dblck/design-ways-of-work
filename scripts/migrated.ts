/**
 * - `migrated` · a checkout of a repository made ready for the release in hand
 * - its removes and moves through git, imports following; its edits; its tree
 * - `isDue`, `migratedDue` · a pin before a migration's release has not taken it
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { keptIn } from './keptWords.ts';
import { assertReady, rewrites } from './migrationReady.ts';
import type { Following, Git } from './migrationReady.ts';
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

// the files whose imports follow the moves, written; what a product keeps as written is left
function followed(
  root: string,
  {
    git,
    moves,
    isKept,
  }: Following & { readonly isKept: (file: string) => boolean },
): readonly string[] {
  return rewrites(root, { git, moves })
    .filter(({ now }) => !isKept(now))
    .map(({ now, after }) => {
      fs.writeFileSync(path.join(root, now), after);
      return now;
    });
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

// a package the release's homes read, added as yarn adds it: its manifest and its lock, no script of the repository run
function addedTo(
  root: string,
  dependencies: Readonly<Record<string, string>> = {},
): number {
  const added = Object.entries(dependencies).map(
    ([name, version]) => `${name}@${version}`,
  );
  if (added.length > 0)
    execFileSync(
      'yarn',
      ['add', '--exact', '--ignore-scripts', '--silent', ...added],
      { cwd: root, env: childEnv(), stdio: ['ignore', 'pipe', 'pipe'] },
    );
  return added.length;
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
  const { removes, moves, tree, homed = [] } = migration;
  const { isKept, isNotebook } = keptIn(root);
  assertReady({ root, wow, git, migration, isNotebook });
  for (const file of removes) git(['rm', '-q', '--', file]);
  for (const file of homed) git(['rm', '-q', '--cached', '--', file]);
  for (const [from, to] of moves) {
    fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true });
    git(['mv', '--', from, to]);
  }
  const rewritten = followed(root, { git, moves, isKept });
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
  const added = addedTo(root, migration.dependencies);
  if (added > 0) git(['add', '--', 'package.json', 'yarn.lock']);
  const summary = `${String(removes.length)} removed, ${String(moves.length)} moved, ${String(rewritten.length)} following, ${String(migration.edits?.length ?? 0)} edited, ${String(written.length)} written, ${String(homed.length)} homed`;
  return added > 0 ? `${summary}, ${String(added)} added` : summary;
}

interface Due {
  readonly root: string;
  readonly wow: string;
  readonly migrations: readonly Migration[];
  readonly pinned: string;
}

// each migration in release order, run when the pin is before it: a line each
function migratedDue({
  root,
  wow,
  migrations,
  pinned,
}: Due): readonly string[] {
  if (migrations.length === 0)
    return ['migrated · nothing: the release in hand asks none'];
  return [...migrations]
    .sort((one, other) => (isBefore(one.release, other.release) ? -1 : 1))
    .map((migration) =>
      isDue(migration, pinned)
        ? `migrated · ${migrated({ root, wow, migration })}, for v${migration.release}`
        : `migrated · nothing: its pin, v${pinned}, took v${migration.release}'s`,
    );
}

export { isDue, migrated, migratedDue };
