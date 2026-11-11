/**
 * - `tried` · a repository on its pinned tag and on the commit in hand, compared
 * - every script's exit and output, the folders it builds, the files it writes
 * - a difference is one the release expects, with why, or the gate is red
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  cloned,
  holdsItsTake,
  nextTaken,
  packageOf,
} from './consumerClones.ts';
import { explained, mapDifferences, runDifferences } from './consumerDiff.ts';
import type { Run, Sides } from './consumerDiff.ts';
import { ranIn } from './consumerRuns.ts';
import type { Consumer } from './consumerTypes.ts';
import { hashes, writtenIn } from './digests.ts';

interface Trial {
  readonly consumer: Consumer;
  readonly wow: string;
  readonly scratch: string;
  // each difference this release means in the repository, and why
  readonly expected: Readonly<Record<string, string>>;
}

// each run's output beside the clones, for the one who reads a difference
function kept(out: string, runs: Sides<readonly Run[]>): void {
  fs.mkdirSync(out, { recursive: true });
  for (const [side, ran] of Object.entries(runs))
    for (const run of ran)
      fs.writeFileSync(
        path.join(out, `${side}-${run.command.replaceAll(/[ :]/g, '-')}.txt`),
        run.output,
      );
}

function fileDifferences(
  consumer: Consumer,
  { pinned, next }: Sides<string>,
): readonly string[] {
  const holds = (side: string, root: string): readonly string[] =>
    holdsItsTake(root) ? [] : [`take · ${side} · a run rewrote a taken file`];
  return [
    ...consumer.folders.flatMap((folder) =>
      mapDifferences(folder, {
        pinned: hashes(path.join(pinned, folder)),
        next: hashes(path.join(next, folder)),
      }),
    ),
    ...mapDifferences('written', {
      pinned: writtenIn(pinned),
      next: writtenIn(next),
    }),
    ...holds('pinned', pinned),
    ...holds('next', next),
  ];
}

function reported({
  consumer,
  found,
  expected,
}: {
  readonly consumer: Consumer;
  readonly found: readonly string[];
  readonly expected: Readonly<Record<string, string>>;
}): boolean {
  const { lines, unexplained, stale } = explained({ found, expected });
  for (const line of lines) console.log(`  ${line}`);
  const isClean = unexplained.length === 0 && stale.length === 0;
  const same =
    found.length === 0
      ? 'NO DIFFERENCE'
      : `${found.length} differences, each expected`;
  console.log(
    isClean
      ? `${same} · ${consumer.name} on the commit in hand, against its pinned tag`
      : `${consumer.name} · ${unexplained.length} unexplained, ${stale.length} stale`,
  );
  return isClean;
}

// both clones run at once: each holds its own tree, and a run waits on nothing of the other's
async function tried({
  consumer,
  wow,
  scratch,
  expected,
}: Trial): Promise<boolean> {
  const sides = cloned({ consumer, wow, scratch });
  nextTaken({ root: sides.next, archive: packageOf(wow) });
  const { commands } = consumer;
  const [pinned, next] = await Promise.all([
    ranIn({ root: sides.pinned, commands }),
    ranIn({ root: sides.next, commands }),
  ]);
  const runs = { pinned, next };
  for (const run of pinned)
    console.log(`  ran · yarn ${run.command} · exit ${String(run.status)}`);
  const found = [...runDifferences(runs), ...fileDifferences(consumer, sides)];
  const out = path.join(scratch, consumer.name, 'out');
  kept(out, runs);
  fs.writeFileSync(path.join(out, 'differences.txt'), `${found.join('\n')}\n`);
  return reported({ consumer, found, expected });
}

export { tried };
