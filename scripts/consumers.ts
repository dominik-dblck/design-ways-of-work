/**
 * - `node scripts/consumers.ts [name]` · the commit in hand on each repository
 * - ports/ names them; each is cloned twice, new, and its own scripts run on both
 * - red on a difference the changelog's next row does not expect
 */
import { execFileSync } from 'node:child_process';
import { CONSUMERS } from '../ports/consumers.ts';
import { NEXT } from '../releases/changelog.ts';
import { tried } from './consumerGate.ts';
import type { Consumer } from './consumerTypes.ts';
import { HERE } from './repos.ts';
import { SCRATCH } from './scratch.ts';

const HOMES_AND_MANIFEST = [
  'design',
  'dev',
  'shared',
  'design-system',
  'package.json',
];

const git = (args: readonly string[]): string =>
  execFileSync('git', args, { cwd: HERE, encoding: 'utf8' }).trim();

// one after another: two repositories' installs and runs at once would only share the machine
const triedAll = (consumers: readonly Consumer[]): Promise<boolean> =>
  consumers.reduce<Promise<boolean>>(async (before, consumer) => {
    const isCleanSoFar = await before;
    console.log(`${consumer.name} · ${consumer.ref}`);
    const isClean = await tried({
      consumer,
      wow: HERE,
      scratch: SCRATCH,
      expected: NEXT.outputs[consumer.name] ?? {},
    });
    return isCleanSoFar && isClean;
  }, Promise.resolve(true));

async function main(): Promise<void> {
  const [named] = process.argv.slice(2);
  const consumers = CONSUMERS.filter(
    ({ name }) => named === undefined || name === named,
  );
  if (consumers.length === 0) {
    console.error(`ports/consumers.ts names no repository ${String(named)}`);
    process.exitCode = 2;
    return;
  }
  const uncommitted = git([
    'status',
    '--porcelain',
    '--',
    ...HOMES_AND_MANIFEST,
  ]);
  console.log(`the commit in hand · ${git(['rev-parse', '--short', 'HEAD'])}`);
  if (uncommitted !== '')
    console.log(
      'the homes hold uncommitted work: the gate tries the commit, not the tree',
    );
  process.exitCode = (await triedAll(consumers)) ? 0 : 1;
}

await main();
