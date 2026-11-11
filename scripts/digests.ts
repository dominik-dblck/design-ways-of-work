/**
 * - `hashes` · a folder's files, each by its bytes
 * - `writtenIn` · what differs from the commit in a clone, as git sees it
 * - `since` · of that, what the runs wrote: what stood before them left out
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { childEnv } from './scratch.ts';

function hashes(folder: string): ReadonlyMap<string, string> {
  const out = new Map<string, string>();
  if (!fs.existsSync(folder)) return out;
  for (const entry of fs.readdirSync(folder, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!entry.isFile()) continue;
    const full = path.join(entry.parentPath, entry.name);
    out.set(
      path.relative(folder, full),
      crypto.createHash('sha256').update(contentOf(full)).digest('hex'),
    );
  }
  return out;
}

// git's names with -z: split on NUL, never quoted, a rename two entries
function writtenIn(root: string): ReadonlyMap<string, string> {
  const status = ['status', '--porcelain', '-z', '--no-renames'];
  const entries = execFileSync('git', [...status, '--untracked-files=all'], {
    cwd: root,
    encoding: 'utf8',
    env: childEnv(),
  });
  return new Map(
    entries
      .split('\0')
      .filter(Boolean)
      .map((entry) => entry.slice(3))
      .map((file) => [file, contentOf(path.join(root, file))]),
  );
}

// a file a migration staged stood so before the first run: it counts when a run moved it again, or put it back
const since = (
  before: ReadonlyMap<string, string>,
  after: ReadonlyMap<string, string>,
): ReadonlyMap<string, string> =>
  new Map([
    ...[...after].filter(([file, content]) => before.get(file) !== content),
    ...[...before.keys()]
      .filter((file) => !after.has(file))
      .map((file) => [file, '<as committed>'] as const),
  ]);

function contentOf(file: string): string {
  if (!fs.existsSync(file)) return '<gone>';
  return fs.readFileSync(file).toString('latin1');
}

export { hashes, since, writtenIn };
