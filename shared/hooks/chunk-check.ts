/**
 * - a Claude Code Stop hook: a chunk ends green on `yarn check:chunk`, or is fixed
 * - nothing uncommitted, or the same work already checked green: nothing runs
 * - a second refusal in a row only reports: an unfixable check never holds the turn
 */
import { execFileSync, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SHOWN_LINES = 40;

const git = (args: readonly string[]): string =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });

const GREEN = path.resolve(
  ROOT,
  git(['rev-parse', '--git-path', 'chunk-green']).trim(),
);

// the uncommitted work as one hash: what moved, the diff, and every new file's bytes
function workKey(): string | null {
  const entries = git(['status', '--porcelain=v1', '-uall', '-z'])
    .split('\0')
    .filter(Boolean);
  if (entries.length === 0) return null;
  const hash = crypto.createHash('sha256').update(entries.join('\n'));
  hash.update(git(['diff', 'HEAD', '--binary']));
  for (const entry of entries.filter((one) => one.startsWith('?? ')))
    hash.update(fs.readFileSync(path.join(ROOT, entry.slice(3))));
  return hash.digest('hex');
}

const lastGreen = (): string =>
  fs.existsSync(GREEN) ? fs.readFileSync(GREEN, 'utf8') : '';

const said: unknown = JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
const isAgain = Reflect.get(Object(said), 'stop_hook_active') === true;
const key = workKey();
if (key !== null && key !== lastGreen()) {
  const run = spawnSync('yarn', ['-s', 'check:chunk'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  if (run.status === 0) fs.writeFileSync(GREEN, key);
  else {
    const tail = `${run.stdout}${run.stderr}`
      .trim()
      .split('\n')
      .slice(-SHOWN_LINES)
      .join('\n');
    console.log(
      JSON.stringify(
        isAgain
          ? { systemMessage: `check:chunk is still red:\n${tail}` }
          : {
              decision: 'block',
              reason: `check:chunk is red: fix it before the turn ends.\n${tail}`,
            },
      ),
    );
  }
}
