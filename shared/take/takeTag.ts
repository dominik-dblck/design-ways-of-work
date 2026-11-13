/**
 * - `takeAtTag` · the tag cloned aside, its own take run from it, the clone gone
 * - the tag's script takes: a take always runs the take of the tag it writes
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { emptied } from '../emptied.ts';

// a release's tag alone: a name git could read as an option never reaches it
const A_TAG = /^v\d+\.\d+\.\d+$/;

function takeAtTag({
  root,
  tag,
  remote,
  isCheck,
}: {
  readonly root: string;
  readonly tag: string;
  readonly remote: string;
  readonly isCheck: boolean;
}): number {
  if (!A_TAG.test(tag))
    throw new Error(`--tag ${tag} is no release's tag: v1.2.3`);
  const aside = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-tag-'));
  const clone = path.join(aside, 'tag');
  try {
    execFileSync(
      'git',
      [
        ...['-c', 'advice.detachedHead=false', 'clone', '-q', '--depth', '1'],
        ...['--branch', tag, '--', remote, clone],
      ],
      { stdio: 'inherit' },
    );
    const ran = spawnSync(
      process.execPath,
      [
        path.join(clone, 'shared', 'take', 'takeWow.ts'),
        ...['--from', clone],
        ...(isCheck ? ['--check'] : []),
      ],
      { cwd: root, stdio: 'inherit' },
    );
    return ran.status ?? 1;
  } finally {
    // the clone emptied through the guard, then the two folders it leaves, each empty
    fs.rmdirSync(emptied({ within: aside, folder: clone }));
    fs.rmdirSync(aside);
  }
}

export { takeAtTag };
