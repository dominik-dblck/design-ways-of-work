/**
 * - `ruledOn` · one conflict of a port taking its trunk, settled by the port's rules
 * - `unmerged` · the conflicts git left, each with the sides that hold the file
 * - `gitAt` · git run in a checkout, its output read
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { Move } from './movePaths.ts';
import { importsAnew, movedTo, namedAnew } from './portNames.ts';
import type { Port } from './portTypes.ts';
import { childEnv } from './scratch.ts';

type Git = (
  args: readonly string[],
  how?: { readonly mayFail: boolean },
) => string;

interface Conflict {
  readonly file: string;
  // the blob each side holds: the base, the branch, the trunk
  readonly base?: string;
  readonly ours?: string;
  readonly theirs?: string;
}

interface Settling {
  readonly conflict: Conflict;
  readonly git: Git;
  readonly root: string;
  readonly port: Port;
  readonly moves: readonly Move[];
}

const BUFFER = 1 << 28;
const SIDES = ['', 'base', 'ours', 'theirs'] as const;

const gitAt =
  (root: string): Git =>
  (args, how) => {
    const ran = spawnSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      env: childEnv(),
      maxBuffer: BUFFER,
    });
    if (ran.status !== 0 && how?.mayFail !== true)
      throw new Error(`git ${args.join(' ')} · ${ran.stderr}`);
    return ran.stdout.trim();
  };

// git's stages: one line a side that holds the file
function unmerged(git: Git): readonly Conflict[] {
  const files = new Map<string, Conflict>();
  for (const entry of git(['ls-files', '-u', '-z']).split('\0')) {
    const [head = '', file = ''] = entry.split('\t');
    const [, blob = '', stage = '0'] = head.split(' ');
    const side = SIDES[Number(stage)];
    if (file !== '' && side !== undefined && side !== '')
      files.set(file, { ...files.get(file), file, [side]: blob });
  }
  return [...files.values()];
}

interface Laid {
  readonly text: string;
  readonly isClean: boolean;
}

// the trunk's change laid on the branch's file, three ways: the base and the trunk's side named as after the port first, so its renames are no change
function laid(
  { conflict, git, root, port, moves }: Settling,
  target: string,
): Laid {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'port-merge-'));
  const exists = (one: string): boolean => fs.existsSync(path.join(root, one));
  const named = (text: string): string =>
    namedAnew(importsAnew(text, { file: target, moves, exists }), {
      moves,
      names: port.names,
    });
  const sideAt = (name: string, blob: string | undefined): string => {
    const file = path.join(folder, name);
    const text = blob === undefined ? '' : git(['cat-file', 'blob', blob]);
    fs.writeFileSync(file, named(`${text}\n`));
    return file;
  };
  const args = [
    'merge-file',
    '-p',
    path.join(root, target),
    sideAt('base', conflict.base),
    sideAt('theirs', conflict.theirs),
  ];
  const merged = spawnSync('git', args, {
    encoding: 'utf8',
    maxBuffer: BUFFER,
  });
  const theirs = fs.readFileSync(path.join(folder, 'theirs'), 'utf8');
  for (const side of ['base', 'theirs']) fs.rmSync(path.join(folder, side));
  fs.rmdirSync(folder);
  return merged.status === 0
    ? { text: merged.stdout, isClean: true }
    : { text: theirs, isClean: false };
}

// the port took the file out, the trunk changed it: the port moved it, or a home holds it now
function takenOut(settling: Settling): string {
  const { conflict, git, root, moves } = settling;
  const target = movedTo(conflict.file, moves);
  git(['rm', '-q', '--cached', '--', conflict.file]);
  fs.rmSync(path.join(root, conflict.file), { force: true });
  if (target === conflict.file || !fs.existsSync(path.join(root, target)))
    return `CARRY · ${conflict.file} · blob ${conflict.theirs ?? ''} · a home holds it: its change goes there, its row to ports/`;
  const { text, isClean } = laid(settling, target);
  fs.writeFileSync(path.join(root, target), text);
  git(['add', '--', target]);
  return isClean
    ? `MOVED · ${conflict.file} · the trunk's change laid on ${target}`
    : `READ · ${target} · the trunk's ${conflict.file} taken whole: the port's own change to it is to lay again`;
}

// both sides hold the file: the port's folders stay its own; elsewhere the trunk's change is laid on the branch's
function bothHold(settling: Settling): string {
  const { conflict, git, root } = settling;
  const { file } = conflict;
  git(['checkout', '--ours', '--', file]);
  const { text, isClean } = laid(settling, file);
  fs.writeFileSync(path.join(root, file), text);
  git(['add', '--', file]);
  return isClean
    ? `MERGED · ${file} · the trunk's change beside the port's names`
    : `READ · ${file} · both changed one place: the trunk's side taken, its names as after the port`;
}

function ruledOn(settling: Settling): string {
  const { conflict, git, port } = settling;
  const { file, ours, theirs } = conflict;
  if (port.kept.some((folder) => file.startsWith(folder))) {
    git(
      ours === undefined
        ? ['rm', '-q', '--', file]
        : ['checkout', '--ours', '--', file],
    );
    if (ours !== undefined) git(['add', '--', file]);
    return `KEPT · ${file} · as the port left it`;
  }
  if (theirs === undefined)
    return `LEFT · ${file} · the trunk removed what the port changed`;
  if (ours !== undefined) return bothHold(settling);
  if (conflict.base !== undefined) return takenOut(settling);
  git(['checkout', '--theirs', '--', file]);
  git(['add', '--', file]);
  return `ADDED · ${file} · the trunk's, where the port's moves put it`;
}

export { gitAt, ruledOn, unmerged };
