/**
 * - `cloned` · two fresh clones of a repository, each installed at its pinned tag
 * - `packageOf`, `nextTaken` · the commit as a package, taken; what it resolves
 * - `holdsItsTake`, `suppressedTaken`, `strays`, `lacking` · a take's faults
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { CONTRACT } from '../ports/contract.ts';
import { HOMES } from '../shared/take/takeHomes.ts';
import { takenFiles } from '../shared/take/takeRecord.ts';
import type { Sides } from './consumerDiff.ts';
import type { Consumer } from './consumerTypes.ts';
import { childEnv, emptied } from './scratch.ts';

const PACKAGE = 'design-ways-of-work';
const BUFFER = 1 << 28;

// a child's output is read when it fails alone: its error carries it
const quietly = (
  root: string,
  [bin = '', ...args]: readonly string[],
): void => {
  execFileSync(bin, args, {
    cwd: root,
    env: childEnv(),
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
      within: scratch,
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
    env: childEnv(),
    maxBuffer: BUFFER,
  });

// what a repository's install resolves through the package: its dependencies and its peers
function resolvedBy(folder: string): ReadonlyMap<string, string> {
  const manifest: Readonly<Record<string, unknown>> = JSON.parse(
    fs.readFileSync(path.join(folder, 'package.json'), 'utf8'),
  );
  return new Map(
    ['dependencies', 'peerDependencies'].flatMap((kind) =>
      Object.entries(Object(manifest[kind])).map(
        ([name, range]) => [`${kind} · ${name}`, String(range)] as const,
      ),
    ),
  );
}

// the installed package replaced by the commit's, then the repository's own take: its lockfile stays the tag's
function nextTaken({
  root,
  archive,
}: {
  readonly root: string;
  readonly archive: Buffer;
}): Sides<ReadonlyMap<string, string>> {
  const folder = path.join(root, 'node_modules', PACKAGE);
  const pinned = resolvedBy(folder);
  emptied({ within: root, folder });
  execFileSync('tar', ['-x', '-C', folder], { input: archive });
  quietly(root, ['yarn', '-s', 'wow']);
  return { pinned, next: resolvedBy(folder) };
}

const holdsItsTake = (root: string): boolean =>
  spawnSync('yarn', ['-s', 'wow', '--check'], { cwd: root, env: childEnv() })
    .status === 0;

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

// the package is the four homes and the manifest: anything more an install unpacks is a stray
const strays = (root: string): readonly string[] =>
  fs
    .readdirSync(path.join(root, 'node_modules', PACKAGE))
    .filter(
      (entry) => entry !== 'package.json' && !Object.hasOwn(HOMES, entry),
    );

// a file the homes read by its path is there in every product, with no row or with many: a plug alone may be absent
const lacking = (root: string): readonly string[] =>
  CONTRACT.filter(
    ({ file, kind }) =>
      kind !== 'plug' && !fs.existsSync(path.join(root, file)),
  ).map(({ file }) => file);

export {
  cloned,
  holdsItsTake,
  lacking,
  nextTaken,
  packageOf,
  strays,
  suppressedTaken,
};
