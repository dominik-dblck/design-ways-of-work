/**
 * - `takenFiles` · what the last take wrote, by digest: not the product’s own
 * - `LOCK`, `writeRecord` · committed in `wow.lock`, or hidden in the git folder
 * - `writeExclude` · git’s exclude block, each worktree its own; none committed
 */
import fs from 'node:fs';
import path from 'node:path';

const HEAD = '# design-ways-of-work';
const LOCK = 'wow.lock';

// read off the files, never by running git: a generator reads the record with no child process
function gitDirOf(root: string): string {
  const dot = path.join(root, '.git');
  if (fs.statSync(dot).isDirectory()) return dot;
  const named = /^gitdir: (.+)$/m.exec(fs.readFileSync(dot, 'utf8'))?.[1];
  if (named === undefined) throw new Error(`${dot} names no git folder`);
  return path.resolve(root, named.trim());
}

// a worktree's folder names the folder all of them share; the main worktree's is its own
function commonDirOf(gitDir: string): string {
  const named = path.join(gitDir, 'commondir');
  return fs.existsSync(named)
    ? path.resolve(gitDir, fs.readFileSync(named, 'utf8').trim())
    : gitDir;
}

// the record sits in the worktree's own git folder: a second worktree may hold another tag
const recordOf = (root: string): string =>
  path.join(gitDirOf(root), 'wow-taken');

// git reads one exclude file for every worktree, so each keeps its own block in it, named
function blockMarks(root: string): {
  readonly mark: string;
  readonly end: string;
} {
  const own = gitDirOf(root);
  const name =
    own === commonDirOf(own) ? 'the main worktree' : path.basename(own);
  return {
    mark: `${HEAD} · ${name} · the files its take wrote, replaced at each take`,
    end: `${HEAD} · ${name} · end`,
  };
}

// a lock in the tree is the committed take's; a tree with no git folder took nothing hidden
function recordIn(root: string): string | undefined {
  const lock = path.join(root, LOCK);
  if (fs.existsSync(lock)) return lock;
  return fs.existsSync(path.join(root, '.git')) ? recordOf(root) : undefined;
}

// no record is a product that never took: nothing of it is wow's
function takenFiles(root: string): ReadonlyMap<string, string> {
  const at = recordIn(root);
  if (at === undefined || !fs.existsSync(at)) return new Map();
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
  isCommitted,
}: {
  readonly root: string;
  readonly version: string;
  readonly digests: ReadonlyMap<string, string>;
  readonly isCommitted: boolean;
}): void {
  const lines = [...digests]
    .sort(([one], [other]) => one.localeCompare(other))
    .map(([file, digest]) => `${file}\t${digest}`);
  fs.writeFileSync(
    isCommitted ? path.join(root, LOCK) : recordOf(root),
    `${HEAD} ${version}\n${lines.join('\n')}\n`,
  );
}

// anchored at the root, every pattern character escaped: a path is one file, never a glob
const pattern = (file: string): string =>
  `/${file
    .split(path.sep)
    .join('/')
    .replaceAll(/[\\*?[\]!# ]/g, '\\$&')}`;

// this worktree's block alone: the product's lines and every other worktree's stay; no file, no block
function writeExclude({
  root,
  files,
}: {
  readonly root: string;
  readonly files: readonly string[];
}): void {
  const at = path.join(commonDirOf(gitDirOf(root)), 'info', 'exclude');
  const { mark, end } = blockMarks(root);
  const before = fs.existsSync(at) ? fs.readFileSync(at, 'utf8') : '';
  const start = before.indexOf(mark);
  const kept =
    start === -1
      ? before
      : before.slice(0, start) +
        before.slice(before.indexOf(end, start) + end.length + 1);
  if (files.length === 0) {
    if (start !== -1) fs.writeFileSync(at, kept);
    return;
  }
  const block = [mark, ...[...files].sort().map(pattern), end].join('\n');
  fs.mkdirSync(path.dirname(at), { recursive: true });
  fs.writeFileSync(
    at,
    `${kept}${kept === '' || kept.endsWith('\n') ? '' : '\n'}${block}\n`,
  );
}

export { LOCK, takenFiles, writeExclude, writeRecord };
