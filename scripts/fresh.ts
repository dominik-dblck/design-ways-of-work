/**
 * - `node scripts/fresh.ts` · this repository's own checks, on a fresh clone
 * - the commit in hand, installed from nothing: red on a file no clone holds
 * - a check that clones is not run again inside the clone
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { scope } from '../scope.ts';
import { COMMIT, FEATURE_END } from '../shared/checkTiers.ts';
import { ranIn } from './consumerRuns.ts';
import { HERE } from './repos.ts';
import { childEnv, emptied, SCRATCH } from './scratch.ts';

const CLONING = new Set(['fresh', 'consumers']);
const BUFFER = 1 << 28;

const run = (root: string, [bin = '', ...args]: readonly string[]): string =>
  execFileSync(bin, args, {
    cwd: root,
    encoding: 'utf8',
    env: childEnv(),
    maxBuffer: BUFFER,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();

// the commit itself, not the branch it stands on: what a push of it sends
function cloned(): string {
  const commit = run(HERE, ['git', 'rev-parse', 'HEAD']);
  const root = emptied({
    within: SCRATCH,
    folder: path.join(SCRATCH, 'own', 'clone'),
  });
  run(HERE, ['git', 'clone', '-q', '--no-checkout', HERE, root]);
  run(root, ['git', 'checkout', '-q', '--detach', commit]);
  run(root, ['yarn', 'install', '--frozen-lockfile']);
  console.log(`a fresh clone of ${commit.slice(0, 7)}, installed`);
  return root;
}

// the feature tier whole, as its scripts run on a tree
const scripts = [
  ...[...COMMIT, ...FEATURE_END].map(({ script }) => script),
  ...scope.checks.commit,
  ...scope.checks.featureEnd,
].filter((script) => !CLONING.has(script));

const runs = await ranIn({
  root: cloned(),
  commands: scripts.map((script) => [script]),
});
const red = runs.filter(({ status }) => status !== 0);
for (const { command, status } of runs)
  console.log(`  ${status === 0 ? '✓' : '✗'} ${command}`);
for (const { command, output } of red) console.log(`\n${command}:\n${output}`);
console.log(
  red.length === 0
    ? `${String(runs.length)} checks green on the clone`
    : `${String(red.length)} of ${String(runs.length)} checks red on the clone, green or not here`,
);
process.exitCode = red.length === 0 ? 0 : 1;
