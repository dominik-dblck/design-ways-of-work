/**
 * - `hashes` · a folder's files, each by its bytes
 * - `writtenIn` · what a run wrote in a clone, as git sees it: a taken file never
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

function contentOf(file: string): string {
  if (!fs.existsSync(file)) return '<gone>';
  return fs.readFileSync(file).toString('latin1');
}

export { hashes, writtenIn };
