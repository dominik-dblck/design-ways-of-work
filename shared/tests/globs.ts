/**
 * - `isNamedBy`, `filesNamedBy` · a path a list of globs names, a `!` glob not; the tree's
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

// a path as the disk spells it: a glob's case is echoed back by a filesystem that ignores case
const isSpelledAsOnDisk = (root: string, file: string): boolean =>
  fs.realpathSync.native(path.join(root, file)) ===
  path.join(fs.realpathSync.native(root), file);

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
