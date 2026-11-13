/**
 * - `takeCommitted` · `--tag` at the commit a reviewer saw, or `--check` on the lock
 * - the tag cloned aside, its own take run from it, the clone gone after
 * - a tag is a name that moves: a clone off the commit named writes nothing
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { emptied } from '../emptied.ts';
import { checkLock, commitOf } from './takeLock.ts';
import { takenHead } from './takeRecord.ts';

// a release's tag and a full commit alone: a name git could read as an option never reaches it
const A_TAG = /^v\d+\.\d+\.\d+$/;
const A_COMMIT = /^[0-9a-f]{40}$/;

interface Asked {
  readonly tag: string | undefined;
  readonly sha: string | undefined;
  readonly isCheck: boolean;
}

// the commit named beside the tag, or the lock's own when it took this tag before
function pinnedOf({
  root,
  tag,
  sha,
}: {
  readonly root: string;
  readonly tag: string;
  readonly sha: string | undefined;
}): string {
  if (sha !== undefined) {
    if (!A_COMMIT.test(sha)) throw new Error(`--sha ${sha} is no full commit`);
    return sha;
  }
  const head = takenHead(root);
  if (head?.commit !== undefined && `v${head.version}` === tag)
    return head.commit;
  throw new Error(`--tag ${tag} names no commit: --sha <the tag's commit>`);
}

function cloneTag({
  tag,
  remote,
  clone,
}: {
  readonly tag: string;
  readonly remote: string;
  readonly clone: string;
}): void {
  execFileSync(
    'git',
    [
      ...['-c', 'advice.detachedHead=false', 'clone', '-q', '--depth', '1'],
      ...['--branch', tag, '--', remote, clone],
    ],
    { stdio: 'inherit' },
  );
}

function takeAtTag({
  root,
  tag,
  pinned,
  remote,
  isCheck,
}: Omit<Asked, 'sha' | 'tag'> & {
  readonly root: string;
  readonly tag: string;
  readonly pinned: string;
  readonly remote: string;
}): number {
  const aside = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-tag-'));
  const clone = path.join(aside, 'tag');
  try {
    cloneTag({ tag, remote, clone });
    const head = commitOf(clone);
    if (head !== pinned) {
      console.log(`${tag} stands on ${head}, not ${pinned}: nothing taken`);
      return 1;
    }
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

// a committed take names its tag; with none asked, only its check runs, on the lock alone
function takeCommitted({
  root,
  asked,
  remote,
}: {
  readonly root: string;
  readonly asked: Asked;
  readonly remote: unknown;
}): number {
  const { tag, sha, isCheck } = asked;
  if (tag === undefined) {
    if (isCheck) return checkLock(root) ? 0 : 1;
    throw new Error(
      'a committed take names its tag: --tag v1.2.3 --sha <commit>',
    );
  }
  if (!A_TAG.test(tag))
    throw new Error(`--tag ${tag} is no release's tag: v1.2.3`);
  if (typeof remote !== 'string' || remote === '')
    throw new Error(
      'package.json · wow.remote names no repository to take from',
    );
  const pinned = pinnedOf({ root, tag, sha });
  return takeAtTag({ root, tag, pinned, remote, isCheck });
}

export { takeCommitted };
