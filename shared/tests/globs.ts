/**
 * - `isNamedBy` · a path a list of globs names, a `!` glob not
 * - `filesNamedBy`, `isOnDisk` · the files a list names, a path, as the disk spells them
 * - `globsNamingNothing` · a scope's glob that names no file: a typo checks nothing
 */
import fs from 'node:fs';
import path from 'node:path';
import { matchesAny } from '../lint/rules/ruleKit.ts';
import type { RepoScope } from '../repoScope.ts';

type Tree = Pick<RepoScope, 'root' | 'ignores' | 'productTrees'>;

// the lint's own reading of a list, so a script, a test and a rule name the same files
const isNamedBy = (file: string, globs: readonly string[]): boolean =>
  matchesAny(file, globs);

// a path as each folder spells it: a disk that ignores case echoes a glob's, and a link resolves away
const isSpelledAsOnDisk = (root: string, file: string): boolean => {
  const steps = file.split(/[\\/]/).filter((step) => step !== '');
  return steps.every((step, at) =>
    fs.readdirSync(path.join(root, ...steps.slice(0, at))).includes(step),
  );
};

// a product's tree is read by a glob that starts inside it, never by a broad one walking in
const isEnteredBy = (glob: string, product: string): boolean =>
  glob.startsWith(product.replace(/\/?\*\*$/, '').replace(/\/?$/, '/'));

// the files under a scope's root its globs name, as posix paths: the ignored folders aside
const filesNamedBy = (
  tree: Tree,
  globs: readonly string[],
): readonly string[] =>
  [
    ...new Set(
      globs
        .filter((glob) => !glob.startsWith('!'))
        .flatMap((glob) =>
          fs.globSync(glob, {
            cwd: tree.root,
            exclude: [
              ...tree.ignores,
              ...tree.productTrees.filter(
                (product) => !isEnteredBy(glob, product),
              ),
            ],
          }),
        )
        .filter((file) => isSpelledAsOnDisk(tree.root, file))
        .map((file) => file.split(path.sep).join('/')),
    ),
  ]
    .filter((file) => isNamedBy(file, globs))
    .sort();

const globsNamingNothing = (
  tree: Tree,
  globs: readonly string[],
): readonly string[] =>
  globs.filter(
    (glob) => !glob.startsWith('!') && filesNamedBy(tree, [glob]).length === 0,
  );

// a path there, a folder's too, spelled in each step as the disk spells it
const isOnDisk = (root: string, file: string): boolean =>
  fs.existsSync(path.join(root, file)) && isSpelledAsOnDisk(root, file);

export { filesNamedBy, globsNamingNothing, isNamedBy, isOnDisk };
