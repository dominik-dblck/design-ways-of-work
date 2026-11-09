/**
 * - `takenFiles` · what the last take wrote, by digest: not the product’s own
 * - `writeRecord`, `writeExclude` · the record and git’s exclude block
 * - both kept per clone, so nothing of wow enters a product’s history
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const HEAD = '# design-ways-of-work';
const MARK = `${HEAD} · the files its take wrote, replaced at each take`;
const END = `${HEAD} · end`;

// a worktree's .git is a file: git names the path
const gitPath = ({ root, name }: { root: string; name: string }): string =>
  path.resolve(
    root,
    execFileSync('git', ['rev-parse', '--git-path', `info/${name}`], {
      cwd: root,
      encoding: 'utf8',
    }).trim(),
  );

// no record is a product that never took: nothing of it is wow's
function takenFiles(root: string): ReadonlyMap<string, string> {
  const at = gitPath({ root, name: 'wow-taken' });
  if (!fs.existsSync(at)) return new Map();
  return new Map(
    fs
      .readFileSync(at, 'utf8')
      .split('\n')
      .filter((line) => line !== '' && !line.startsWith('#'))
      .map((line) => {
        const [file = '', digest = ''] = line.split('\t');
        return [file, digest] as const;
      }),
  );
}

function writeRecord({
  root,
  version,
  digests,
}: {
  readonly root: string;
  readonly version: string;
  readonly digests: ReadonlyMap<string, string>;
}): void {
  const at = gitPath({ root, name: 'wow-taken' });
  fs.mkdirSync(path.dirname(at), { recursive: true });
  const lines = [...digests]
    .sort(([one], [other]) => one.localeCompare(other))
    .map(([file, digest]) => `${file}\t${digest}`);
  fs.writeFileSync(at, `${HEAD} ${version}\n${lines.join('\n')}\n`);
}

// anchored at the root, every pattern character escaped: a path is one file, never a glob
const pattern = (file: string): string =>
  `/${file
    .split(path.sep)
    .join('/')
    .replaceAll(/[\\*?[\]!# ]/g, '\\$&')}`;

// the block is the take's alone: lines the product wrote above or below it stay
function writeExclude({
  root,
  files,
}: {
  readonly root: string;
  readonly files: readonly string[];
}): void {
  const at = gitPath({ root, name: 'exclude' });
  const before = fs.existsSync(at) ? fs.readFileSync(at, 'utf8') : '';
  const start = before.indexOf(MARK);
  const end = before.indexOf(END);
  const kept =
    start === -1
      ? before
      : before.slice(0, start) + before.slice(end + END.length + 1);
  const block = [MARK, ...[...files].sort().map(pattern), END].join('\n');
  fs.mkdirSync(path.dirname(at), { recursive: true });
  fs.writeFileSync(
    at,
    `${kept}${kept === '' || kept.endsWith('\n') ? '' : '\n'}${block}\n`,
  );
}

export { takenFiles, writeExclude, writeRecord };
