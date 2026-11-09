/**
 * - `takenFiles` · what the last take wrote, by digest: not the product’s own
 * - `writeRecord`, `writeExclude` · the record and git’s exclude block
 * - each worktree its own, so nothing of wow enters a product’s history
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const HEAD = '# design-ways-of-work';

const git = ({ root, args }: { root: string; args: readonly string[] }) =>
  path.resolve(
    root,
    execFileSync('git', ['rev-parse', ...args], {
      cwd: root,
      encoding: 'utf8',
    }).trim(),
  );

// the record sits in the worktree's own git folder: a second worktree may hold another tag
const recordOf = (root: string): string =>
  path.join(git({ root, args: ['--git-dir'] }), 'wow-taken');

// git reads one exclude file for every worktree, so each keeps its own block in it, named
function blockMarks(root: string): {
  readonly mark: string;
  readonly end: string;
} {
  const own = git({ root, args: ['--git-dir'] });
  const common = git({ root, args: ['--git-common-dir'] });
  const name = own === common ? 'the main worktree' : path.basename(own);
  return {
    mark: `${HEAD} · ${name} · the files its take wrote, replaced at each take`,
    end: `${HEAD} · ${name} · end`,
  };
}

// no record is a product that never took: nothing of it is wow's
function takenFiles(root: string): ReadonlyMap<string, string> {
  const at = recordOf(root);
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
  const lines = [...digests]
    .sort(([one], [other]) => one.localeCompare(other))
    .map(([file, digest]) => `${file}\t${digest}`);
  fs.writeFileSync(recordOf(root), `${HEAD} ${version}\n${lines.join('\n')}\n`);
}

// anchored at the root, every pattern character escaped: a path is one file, never a glob
const pattern = (file: string): string =>
  `/${file
    .split(path.sep)
    .join('/')
    .replaceAll(/[\\*?[\]!# ]/g, '\\$&')}`;

// the block is this worktree's alone: lines the product wrote, and every other worktree's block, stay
function writeExclude({
  root,
  files,
}: {
  readonly root: string;
  readonly files: readonly string[];
}): void {
  const at = git({ root, args: ['--git-path', 'info/exclude'] });
  const { mark, end } = blockMarks(root);
  const before = fs.existsSync(at) ? fs.readFileSync(at, 'utf8') : '';
  const start = before.indexOf(mark);
  const kept =
    start === -1
      ? before
      : before.slice(0, start) +
        before.slice(before.indexOf(end, start) + end.length + 1);
  const block = [mark, ...[...files].sort().map(pattern), end].join('\n');
  fs.mkdirSync(path.dirname(at), { recursive: true });
  fs.writeFileSync(
    at,
    `${kept}${kept === '' || kept.endsWith('\n') ? '' : '\n'}${block}\n`,
  );
}

export { takenFiles, writeExclude, writeRecord };
