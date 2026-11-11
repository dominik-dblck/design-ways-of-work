/**
 * - `ruledOn`, `Ruled` · a conflict of a port taking its trunk, by the port's rules
 * - `unmerged` · the conflicts git left, each with the sides that hold the file
 * - `gitAt` · git run in a checkout, its output read
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import type { Move } from './movePaths.ts';
import { bytesOf, isBinary, laid } from './portLaid.ts';
import type { Laid } from './portLaid.ts';
import { movedTo } from './portNames.ts';
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

interface Ruled {
  readonly says: string;
  // a person reads it before the merge is committed: the script ends red
  readonly isHeld: boolean;
}

const said = (says: string): Ruled => ({ says, isHeld: false });

const indented = (text: string): string =>
  text
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');

// the trunk's change on the branch's file: both kept, or the trunk's side with what of the port's it lacks
function laidOn(
  { root, port, moves, conflict }: Settling,
  target: string,
): Ruled {
  const { text, isMerged, dropped }: Laid = laid({
    root,
    target,
    base: conflict.base,
    theirs: conflict.theirs,
    port,
    moves,
  });
  fs.writeFileSync(path.join(root, target), text);
  if (isMerged)
    return said(`MERGED · ${target} · the trunk's change beside the port's`);
  return dropped === ''
    ? said(
        `TAKEN · ${target} · the trunk's side: the port changed names alone there`,
      )
    : {
        says: `READ · ${target} · the trunk's side taken: the port's own change, left out, is to lay again\n${indented(dropped)}`,
        isHeld: true,
      };
}

// a file that is no text is never laid: the trunk's bytes, and a word when the port had its own
function bytesTaken({ git, conflict }: Settling): Ruled {
  const { file, base, ours } = conflict;
  git(['checkout', '--theirs', '--', file]);
  git(['add', '--', file]);
  return {
    says: `READ · ${file} · no text: the trunk's bytes taken`,
    isHeld: ours !== base,
  };
}

// the port took the file out, the trunk changed it: the port moved it, or a home holds it now
function takenOut(settling: Settling): Ruled {
  const { conflict, git, root, moves } = settling;
  const { file, theirs } = conflict;
  const target = movedTo(file, moves);
  git(['rm', '-q', '--cached', '--', file]);
  fs.rmSync(path.join(root, file), { force: true });
  if (target === file || !fs.existsSync(path.join(root, target)))
    return said(
      `CARRY · ${file} · blob ${theirs ?? ''} · a home holds it: its change goes there, its row to ports/`,
    );
  const bytes = bytesOf(root, theirs);
  if (isBinary(bytes)) {
    fs.writeFileSync(path.join(root, target), bytes);
    git(['add', '--', target]);
    return {
      says: `READ · ${target} · no text: the trunk's bytes`,
      isHeld: true,
    };
  }
  const ruled = laidOn(settling, target);
  git(['add', '--', target]);
  return ruled;
}

// both sides hold the file: the trunk's change is laid on the branch's
function bothHold(settling: Settling): Ruled {
  const { conflict, git, root } = settling;
  const { file, ours, theirs } = conflict;
  if ([ours, theirs].some((blob) => isBinary(bytesOf(root, blob))))
    return bytesTaken(settling);
  git(['checkout', '--ours', '--', file]);
  const ruled = laidOn(settling, file);
  git(['add', '--', file]);
  return ruled;
}

function ruledOn(settling: Settling): Ruled {
  const { conflict, git, port } = settling;
  const { file, ours, theirs } = conflict;
  if (port.kept.some((folder) => file.startsWith(folder))) {
    git(
      ours === undefined
        ? ['rm', '-q', '--', file]
        : ['checkout', '--ours', '--', file],
    );
    if (ours !== undefined) git(['add', '--', file]);
    return said(`KEPT · ${file} · as the port left it`);
  }
  if (theirs === undefined)
    return {
      says: `LEFT · ${file} · the trunk removed what the port changed`,
      isHeld: true,
    };
  if (ours !== undefined) return bothHold(settling);
  if (conflict.base !== undefined) return takenOut(settling);
  git(['checkout', '--theirs', '--', file]);
  git(['add', '--', file]);
  return said(`ADDED · ${file} · the trunk's, where the port's moves put it`);
}

export { gitAt, ruledOn, unmerged };
export type { Ruled };
