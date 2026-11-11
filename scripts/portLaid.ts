/**
 * - `laid`, `Laid` · the trunk's change laid on the branch's file, three ways
 * - `bytesOf`, `isBinary` · a blob as git holds it; one that is no text
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { Move } from './movePaths.ts';
import { importsAnew, namedAnew } from './portNames.ts';
import type { Port } from './portTypes.ts';
import { childEnv } from './scratch.ts';

const BUFFER = 1 << 28;
// git's own measure of a file that is no text
const READ_FOR_A_NUL = 8000;

interface Laying {
  readonly root: string;
  // the branch's file the change lands on, at its path now
  readonly target: string;
  // the blob of before, and the trunk's
  readonly base: string | undefined;
  readonly theirs: string | undefined;
  readonly port: Port;
  readonly moves: readonly Move[];
}

interface Laid {
  readonly text: string;
  // the two met in no one place: the result holds both
  readonly isMerged: boolean;
  // else the trunk's side is the text, and this is the port's own change it lacks: none when the port changed names alone
  readonly dropped: string;
}

const bytesOf = (root: string, blob: string | undefined): Buffer =>
  blob === undefined
    ? Buffer.alloc(0)
    : spawnSync('git', ['cat-file', 'blob', blob], {
        cwd: root,
        env: childEnv(),
        maxBuffer: BUFFER,
      }).stdout;

const isBinary = (bytes: Buffer): boolean =>
  bytes.subarray(0, READ_FOR_A_NUL).includes(0);

// what the branch's file holds beyond the base named as after the port: a diff's lines, its head left out
function droppedFrom(base: string, ours: string): string {
  const args = ['diff', '--no-index', '--no-color', '-U0', base, ours];
  return spawnSync('git', args, { encoding: 'utf8', maxBuffer: BUFFER })
    .stdout.split('\n')
    .filter((line) => /^[-+@]/.test(line) && !/^(?:---|\+\+\+) /.test(line))
    .join('\n');
}

// the base and the trunk's side are named as after the port first, so the port's renames are no change
function laid({ root, target, base, theirs, port, moves }: Laying): Laid {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'port-merge-'));
  const exists = (one: string): boolean => fs.existsSync(path.join(root, one));
  const sideAt = (name: string, blob: string | undefined): string => {
    const file = path.join(folder, name);
    const text = bytesOf(root, blob).toString('utf8');
    fs.writeFileSync(
      file,
      namedAnew(importsAnew(text, { file: target, moves, exists }), {
        moves,
        names: port.names,
      }),
    );
    return file;
  };
  const ours = path.join(root, target);
  const [was, trunk] = [sideAt('base', base), sideAt('theirs', theirs)];
  const merged = spawnSync('git', ['merge-file', '-p', ours, was, trunk], {
    encoding: 'utf8',
    maxBuffer: BUFFER,
  });
  const laidOut =
    merged.status === 0
      ? { text: merged.stdout, isMerged: true, dropped: '' }
      : {
          text: fs.readFileSync(trunk, 'utf8'),
          isMerged: false,
          dropped: droppedFrom(was, ours),
        };
  for (const side of [was, trunk]) fs.rmSync(side);
  fs.rmdirSync(folder);
  return laidOut;
}

export { bytesOf, isBinary, laid };
export type { Laid };
