/**
 * - `isNamedBy` · a path a list of globs names, a `!` glob not
 * - `filesNamedBy` · the tree's files a list names, as the disk spells them
 * - `globsNamingNothing` · a scope's glob that names no file: a typo checks nothing
 */
import fs from 'node:fs';
import path from 'node:path';
import { minimatch } from 'minimatch';
import type { RepoScope } from '../repoScope.ts';

type Tree = Pick<RepoScope, 'root' | 'ignores'>;

const isNamedBy = (file: string, globs: readonly string[]): boolean =>
  globs.some((glob) => !glob.startsWith('!') && minimatch(file, glob)) &&
  !globs.some((glob) => glob.startsWith('!') && minimatch(file, glob.slice(1)));

// a path as each folder spells it: a disk that ignores case echoes a glob's, and a link resolves away
const isSpelledAsOnDisk = (root: string, file: string): boolean => {
  const steps = file.split(/[\\/]/);
  return steps.every((step, at) =>
    fs.readdirSync(path.join(root, ...steps.slice(0, at))).includes(step),
  );
};

// the files under a scope's root its globs name, its ignored folders aside, as posix paths
const filesNamedBy = (
  tree: Tree,
  globs: readonly string[],
): readonly string[] =>
  fs
    .globSync(
      globs.filter((glob) => !glob.startsWith('!')),
      { cwd: tree.root, exclude: tree.ignores },
    )
    .filter((file) => isSpelledAsOnDisk(tree.root, file))
    .map((file) => file.split(path.sep).join('/'))
    .filter((file) => isNamedBy(file, globs))
    .sort();

const globsNamingNothing = (
  tree: Tree,
  globs: readonly string[],
): readonly string[] =>
  globs.filter(
    (glob) => !glob.startsWith('!') && filesNamedBy(tree, [glob]).length === 0,
  );

export { filesNamedBy, globsNamingNothing, isNamedBy };
