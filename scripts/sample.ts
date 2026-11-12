/**
 * - `node scripts/sample.ts [--emit] [script…]` · the sample on the homes in hand
 * - from nothing; its generated files current (`--emit` writes them); its scripts
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE } from './repos.ts';
import { emptied } from '../shared/emptied.ts';
import { childEnv, SCRATCH } from './scratch.ts';

const SAMPLE = path.join(HERE, 'examples', 'sample-product');
const ROOT = path.join(SCRATCH, 'sample');
// git's names for the sample's one commit: no person's
const AUTHOR = ['-c', 'user.name=sample', '-c', 'user.email=sample@invalid'];

// a step that fails stops the run: what follows reads what it left
function ran(command: string, args: readonly string[]): void {
  const done = spawnSync(command, args, {
    cwd: ROOT,
    env: childEnv(),
    stdio: 'inherit',
  });
  if (done.status !== 0) {
    console.log(`sample · ${[command, ...args].join(' ')} · failed`);
    process.exit(done.status ?? 1);
  }
}

// what the generators changed or added: the taken files are git's excluded ones
const changedFiles = (): readonly string[] =>
  execFileSync(
    'git',
    ['status', '--porcelain', '-z', '--untracked-files=all'],
    { cwd: ROOT, encoding: 'utf8', env: childEnv() },
  )
    .split('\0')
    .filter(Boolean)
    .map((line) => line.slice(3));

emptied({ within: SCRATCH, folder: ROOT });
fs.cpSync(SAMPLE, ROOT, { recursive: true });
ran('git', ['init', '-q']);
ran('git', ['add', '-A']);
ran('git', [...AUTHOR, 'commit', '-q', '--no-gpg-sign', '-m', 'the sample']);
ran('yarn', [
  'install',
  '--frozen-lockfile',
  '--ignore-scripts',
  '--prefer-offline',
  '--silent',
]);
ran(process.execPath, [
  path.join(HERE, 'shared', 'take', 'takeWow.ts'),
  '--from',
  HERE,
]);
ran(process.execPath, ['tools/writeGenerated.ts']);
const changed = changedFiles();
const isEmit = process.argv.includes('--emit');
for (const file of changed) {
  if (isEmit)
    fs.cpSync(path.join(ROOT, file), path.join(SAMPLE, file), {
      recursive: true,
    });
  console.log(`sample · ${isEmit ? 'written' : 'stale'} · ${file}`);
}
if (isEmit) process.exit(0);
if (changed.length > 0) {
  console.log('sample · its generated files are stale: yarn sample --emit');
  process.exit(1);
}
const named = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
for (const script of named.length === 0 ? ['check:feature'] : named)
  ran('yarn', ['-s', script]);
console.log('sample · green');
