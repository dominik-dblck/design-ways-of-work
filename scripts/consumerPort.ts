/**
 * - `portFaults` · a repository whose work lands on a branch that takes nothing
 * - the branch tried behind that trunk; a change of the trunk's to a file a home
 * - holds now, not carried into the home yet
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import type { Consumer } from './consumerTypes.ts';
import { mapRows } from './mapRows.ts';
import type { Port } from './portTypes.ts';
import { childEnv } from './scratch.ts';

interface Tried {
  // the repository the clones come from, read and never written
  readonly source: string;
  readonly ref: string;
  readonly port: Port;
  readonly wow: string;
}

const BUFFER = 1 << 26;

const gitIn =
  (source: string) =>
  (args: readonly string[]): string =>
    execFileSync('git', args, {
      cwd: source,
      encoding: 'utf8',
      env: childEnv(),
      maxBuffer: BUFFER,
    }).trim();

const namesIn = (listed: string): readonly string[] =>
  listed.split('\0').filter(Boolean);

// the trunk's newest commit is in the branch tried, or the trial is of a product as it stood
function behind({ source, ref, port }: Tried): readonly string[] {
  const count = Number(
    gitIn(source)(['rev-list', '--count', `${ref}..${port.trunk}`]),
  );
  return count === 0
    ? []
    : [
        `${port.trunk} stands ${String(count)} commits past ${ref}: the branch takes them first`,
      ];
}

// the files the port took out of the branch, as git reads it: one it moved, even rewritten a little, is none
function removedBy({ source, ref, port }: Tried): ReadonlySet<string> {
  const listed = namesIn(
    gitIn(source)([
      'diff',
      '-z',
      '--name-status',
      '-M',
      '-l10000',
      '--diff-filter=D',
      port.base,
      ref,
    ]),
  );
  return new Set(listed.filter((_, at) => at % 2 === 1));
}

// a file the trunk changed since the port, which the port took out and its map moved nowhere: a home holds it now
function toCarry(tried: Tried): readonly string[] {
  const { source, ref, port, wow } = tried;
  const git = gitIn(source);
  const moved = new Map(
    mapRows(path.join(wow, port.moves)).map(([from = '', to = '']) => [
      from,
      to,
    ]),
  );
  const held = new Set(
    namesIn(git(['ls-tree', '-r', '-z', '--name-only', ref])),
  );
  const removed = removedBy(tried);
  const changed = namesIn(
    git([
      'diff',
      '-z',
      '--name-only',
      '--no-renames',
      '--diff-filter=M',
      port.base,
      port.trunk,
    ]),
  );
  return changed
    .filter((file) => removed.has(file) && !held.has(moved.get(file) ?? file))
    .filter((file) => {
      const blob = git(['rev-parse', `${port.trunk}:${file}`]);
      return !port.carried.some(
        (row) => row.file === file && row.blob === blob,
      );
    })
    .map(
      (file) =>
        `${port.trunk} changed ${file}, a file the way of working holds now: carry the change into its home, then name it in ports/`,
    );
}

const portFaults = ({
  consumer: { path: from, ref, port },
  wow,
}: {
  readonly consumer: Consumer;
  readonly wow: string;
}): readonly string[] => {
  if (port === null) return [];
  const tried = { source: path.resolve(wow, from), ref, port, wow };
  return [...behind(tried), ...toCarry(tried)];
};

export { portFaults };
