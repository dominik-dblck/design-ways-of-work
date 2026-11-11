/**
 * - `cloned` · two fresh clones of a repository, each installed at its pinned tag
 * - `packageOf`, `nextTaken` · the commit in hand as a package, taken by a clone
 * - `holdsItsTake`, `suppressedTaken` · the take as a run left it; a rule off
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { takenFiles } from '../shared/take/takeRecord.ts';
import type { Sides } from './consumerDiff.ts';
import type { Consumer } from './consumerTypes.ts';
import { emptied } from './scratch.ts';

const PACKAGE = 'design-ways-of-work';
const BUFFER = 1 << 28;

// a child's output is read when it fails alone: its error carries it
const quietly = (
  root: string,
  [bin = '', ...args]: readonly string[],
): void => {
  execFileSync(bin, args, {
    cwd: root,
    maxBuffer: BUFFER,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
};

// built from nothing each run: a clone of the branch, then the install its lockfile names
function cloned({
  consumer,
  wow,
  scratch,
}: {
  readonly consumer: Consumer;
  readonly wow: string;
  readonly scratch: string;
}): Sides<string> {
  const source = path.resolve(wow, consumer.path);
  const sideAt = (side: string): string => {
    const root = emptied({
      scratch,
      folder: path.join(scratch, consumer.name, side),
    });
    const branch = ['--branch', consumer.ref, '--single-branch'];
    quietly(wow, ['git', 'clone', '-q', ...branch, source, root]);
    quietly(root, ['yarn', 'install', '--frozen-lockfile']);
    return root;
  };
  return { pinned: sideAt('pinned'), next: sideAt('next') };
}

// the commit as git archives it: what an install unpacks when the package runs no prepare script
const packageOf = (wow: string): Buffer =>
  execFileSync('git', ['archive', '--format=tar', 'HEAD'], {
    cwd: wow,
    maxBuffer: BUFFER,
  });

// the installed package replaced by the commit's, then the repository's own take
function nextTaken({
  root,
  archive,
}: {
  readonly root: string;
  readonly archive: Buffer;
}): void {
  const at = emptied({
    scratch: root,
    folder: path.join(root, 'node_modules', PACKAGE),
  });
  execFileSync('tar', ['-x', '-C', at], { input: archive });
  quietly(root, ['yarn', '-s', 'wow']);
}

const holdsItsTake = (root: string): boolean =>
  spawnSync('yarn', ['-s', 'wow', '--check'], { cwd: root }).status === 0;

// a repository turns no rule off in a file it took: that file is mended here
function suppressedTaken(root: string): readonly string[] {
  const at = path.join(root, 'eslint-suppressions.json');
  if (!fs.existsSync(at)) return [];
  const held: Readonly<Record<string, unknown>> = JSON.parse(
    fs.readFileSync(at, 'utf8'),
  );
  const taken = takenFiles(root);
  return Object.keys(held).filter((file) => taken.has(file));
}

export { cloned, holdsItsTake, nextTaken, packageOf, suppressedTaken };
