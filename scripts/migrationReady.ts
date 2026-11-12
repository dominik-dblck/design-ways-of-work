/**
 * - `assertReady` · a checkout refused before anything moves, each reason named
 * - `rewrites`, `Git`, `Following` · the imports the moves would write again
 */
import fs from 'node:fs';
import path from 'node:path';
import { HOMES } from '../shared/take/takeHomes.ts';
import { importsMoved } from './movePaths.ts';
import type { Migration } from './migrationTypes.ts';

type Git = (args: readonly string[]) => string;

const CODE = /\.(ts|tsx|mts)$/;

interface Following {
  readonly git: Git;
  readonly moves: Migration['moves'];
}

interface Rewrite {
  readonly now: string;
  readonly after: string;
}

// each code file whose relative imports read otherwise around the moves, read where it stands now
function rewrites(root: string, { git, moves }: Following): readonly Rewrite[] {
  if (moves.length === 0) return [];
  const forward = new Map(moves.map(([from, to]) => [from, to]));
  const back = new Map(moves.map(([from, to]) => [to, from]));
  const isBarrelled = (folder: string): boolean =>
    fs.existsSync(path.join(root, folder, 'index.ts'));
  return git(['ls-files', '-z'])
    .split('\0')
    .filter((now) => CODE.test(now))
    .flatMap((now) => {
      const text = fs.readFileSync(path.join(root, now), 'utf8');
      const file = back.get(now) ?? now;
      const after = importsMoved(text, { file, moves: forward, isBarrelled });
      return after === text ? [] : [{ now, after }];
    });
}

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
    ...(migration.homed ?? []),
  ].filter(
    (file) => !tracked.has(file) || !fs.existsSync(path.join(root, file)),
  );
  return [...new Set([...deleted.filter(Boolean), ...taken])];
}

// where a product's file stands here: a home landing in a folder of its name, else design/
function homeOf(file: string): string {
  const [home, at] = Object.entries(HOMES).find(
    ([, folder]) => folder !== '' && file.startsWith(`${folder}/`),
  ) ?? ['design', ''];
  return path.join(home, at === '' ? file : file.slice(at.length + 1));
}

// a file a home now holds, whose text is not the home's: taking it out of git would lose an edit
const isHomedApart = (file: string, { root, wow }: Sides): boolean => {
  const home = path.join(wow, homeOf(file));
  return (
    !fs.existsSync(home) ||
    !fs.readFileSync(home).equals(fs.readFileSync(path.join(root, file)))
  );
};

interface Sides {
  readonly root: string;
  readonly wow: string;
}

// before anything moves: the checkout whole, no notebook importing what moves, each homed file the home's
function assertReady({
  root,
  wow,
  git,
  migration,
  isNotebook,
}: Sides & {
  readonly git: Git;
  readonly migration: Migration;
  readonly isNotebook: (file: string) => boolean;
}): void {
  const absent = absentIn(root, { git, migration });
  if (absent.length > 0)
    throw new Error(
      `the checkout lacks what the migration takes, so nothing moved: ${absent.join(', ')}`,
    );
  const pinning = rewrites(root, { git, moves: migration.moves })
    .map(({ now }) => now)
    .filter(isNotebook);
  if (pinning.length > 0)
    throw new Error(
      `a notebook keeps its words and imports what the migration moves, so nothing moved: ${pinning.join(', ')}`,
    );
  const apart = (migration.homed ?? []).filter((file) =>
    isHomedApart(file, { root, wow }),
  );
  if (apart.length > 0)
    throw new Error(
      `a file a home now holds differs from the home, so nothing moved: ${apart.join(', ')}`,
    );
}

export { assertReady, rewrites };
export type { Following, Git };
