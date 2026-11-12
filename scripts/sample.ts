/**
 * - `node scripts/sample.ts [script…]` · the sample, the homes in hand taken in
 * - built in `.consumers/sample` from nothing; its scripts, or its feature tier
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE } from './repos.ts';
import { childEnv, emptied, SCRATCH } from './scratch.ts';

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
const named = process.argv.slice(2);
for (const script of named.length === 0 ? ['check:feature'] : named)
  ran('yarn', ['-s', script]);
console.log('sample · green');
