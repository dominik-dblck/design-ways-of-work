/**
 * - `hashes`, `written` · a run's files: a folder's bytes, what git sees it wrote
 * - `linkedHashes` · the bytes of each file a product links from this repository
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { linkedFiles } from './repos.ts';

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

// what a run wrote in the product: a linked file is this repository's, written through its link
function written(root: string): ReadonlyMap<string, string> {
  const linked = new Set(linkedFiles().map(([, at]) => at));
  const lines = execFileSync(
    'git',
    ['status', '--porcelain', '--untracked-files=all'],
    { cwd: root, encoding: 'utf8' },
  );
  const files = lines
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(3))
    .filter((file) => file !== 'node_modules' && !linked.has(file));
  return new Map(files.map((file) => [file, contentOf(path.join(root, file))]));
}

function contentOf(file: string): string {
  if (!fs.existsSync(file)) return '<gone>';
  return fs.readFileSync(file).toString('latin1');
}

// each linked file's bytes: a run of the copy that changes one has written this repository
const linkedHashes = (): ReadonlyMap<string, string> =>
  new Map(
    linkedFiles().map(([here, at]) => [
      at,
      crypto.createHash('sha256').update(fs.readFileSync(here)).digest('hex'),
    ]),
  );

export { hashes, linkedHashes, written };
