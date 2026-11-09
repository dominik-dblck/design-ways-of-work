/**
 * - `node shared/hooks/checkTier.ts commit|feature [--staged [--write]]` · timed
 * - commit: the changed files (staged, or the working tree's) and cheap tree checks
 * - a `spike/*` branch runs neither: a merge commit or the push checks its work
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { COMMIT, COMMIT_BUDGET_SECONDS, FEATURE_END } from '../checkTiers.ts';
import type { TierCheck } from '../checkTiers.ts';
import { scope } from '../../scope.ts';

const ROOT = process.cwd();
const BIN = path.join(ROOT, 'node_modules', '.bin');
const SPIKE = /^spike\//;
const TIERS = new Set(['commit', 'feature']);

interface Ran {
  readonly script: string;
  readonly seconds: number;
  readonly output: string;
  readonly isGreen: boolean;
}

const git = (args: readonly string[]): string =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });

const listed = (text: string): readonly string[] =>
  text.split('\n').filter((file) => file !== '');

// a commit's files are the index's; a chunk's, the working tree's with what is new: a deleted one is no file to read
function changedFiles(isStaged: boolean): readonly string[] {
  const files = isStaged
    ? listed(git(['diff', '--cached', '--name-only', '--diff-filter=d']))
    : [
        ...listed(git(['diff', '--name-only', '--diff-filter=d', 'HEAD'])),
        ...listed(git(['ls-files', '--others', '--exclude-standard'])),
      ];
  return [...new Set(files)].filter((file) =>
    fs.existsSync(path.join(ROOT, file)),
  );
}

function ran(script: string, command: readonly string[]): Ran {
  const started = performance.now();
  const [bin = '', ...args] = command;
  const done = spawnSync(bin, args, { cwd: ROOT, encoding: 'utf8' });
  return {
    script,
    seconds: (performance.now() - started) / 1000,
    // a check that never started says why
    output: done.error?.message ?? `${done.stdout}${done.stderr}`.trim(),
    isGreen: done.status === 0,
  };
}

// a check on a change's files when it has that form, else on the tree; none when the change holds nothing it reads
function commandOf(
  check: TierCheck,
  files: readonly string[] | null,
): readonly string[] {
  if (files === null || check.onFiles === undefined)
    return ['yarn', '-s', check.script];
  const [bin, ...args] = check.onFiles(files);
  return bin === undefined ? [] : [path.join(BIN, bin), ...args];
}

// a staged file formatted and staged again, only when it is staged whole: a part left out stays out
function written(staged: readonly string[]): void {
  const partly = new Set(listed(git(['diff', '--name-only'])));
  const whole = staged.filter((file) => !partly.has(file));
  const left = staged.filter((file) => partly.has(file));
  if (whole.length) {
    spawnSync(
      path.join(BIN, 'prettier'),
      ['--write', '--ignore-unknown', '--log-level', 'warn', ...whole],
      { cwd: ROOT },
    );
    git(['add', '--', ...whole]);
  }
  if (left.length)
    console.log(`checked, not formatted (staged in part): ${left.join(', ')}`);
}

const line = ({ script, seconds, isGreen }: Ran): string =>
  `${isGreen ? '✓' : '✗'} ${script} · ${seconds.toFixed(1)} s`;

const [tier = ''] = process.argv.slice(2);
if (!TIERS.has(tier)) {
  console.error('checkTier: commit or feature');
  process.exit(2);
}
const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']).trim();
if (SPIKE.test(branch)) {
  console.log(
    `${branch} is a spike: a merge commit or the push checks its work`,
  );
  process.exit(0);
}
const isCommit = tier === 'commit';
const isStaged = process.argv.includes('--staged');
const files = isCommit ? changedFiles(isStaged) : null;
if (isStaged && process.argv.includes('--write')) written(files ?? []);
const checks: readonly TierCheck[] = [
  ...COMMIT,
  ...(isCommit ? [] : FEATURE_END),
  ...[...scope.checks.commit, ...(isCommit ? [] : scope.checks.featureEnd)].map(
    (script) => ({ script }),
  ),
];
const runs = checks.flatMap((check) => {
  const command = commandOf(check, files);
  return command.length ? [ran(check.script, command)] : [];
});
const total = runs.reduce((sum, one) => sum + one.seconds, 0);
const red = runs.filter((one) => !one.isGreen);
console.log(runs.map(line).join('\n'));
console.log(`${tier} · ${total.toFixed(1)} s`);
if (isCommit && total > COMMIT_BUDGET_SECONDS)
  console.log(
    `past the commit's ${String(COMMIT_BUDGET_SECONDS)} s: a check this slow moves to the feature end`,
  );
for (const one of red) console.log(`\n${one.script}:\n${one.output}`);
process.exit(red.length ? 1 : 0);
