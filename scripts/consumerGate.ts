/**
 * - `tried` · a repository on its pinned tag and on the commit in hand, compared
 * - the clone that takes the commit migrated first; each script, folder and file
 * - red on a difference the release does not expect, and on a broken take
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  cloned,
  holdsItsTake,
  lacking,
  nextTaken,
  packageOf,
  strays,
  suppressedTaken,
} from './consumerClones.ts';
import { explained, mapDifferences, runDifferences } from './consumerDiff.ts';
import type { Run, Sides } from './consumerDiff.ts';
import { ranIn } from './consumerRuns.ts';
import type { Consumer } from './consumerTypes.ts';
import { hashes, since, writtenIn } from './digests.ts';
import { migrated } from './migrated.ts';

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

type Standing = Sides<ReadonlyMap<string, string>>;

// each clone as it stands against its commit: before the runs, what a migration staged
const standing = ({ pinned, next }: Sides<string>): Standing => ({
  pinned: writtenIn(pinned),
  next: writtenIn(next),
});

function fileDifferences({
  consumer,
  sides: { pinned, next },
  before,
}: {
  readonly consumer: Consumer;
  readonly sides: Sides<string>;
  readonly before: Standing;
}): readonly string[] {
  return [
    ...consumer.folders.flatMap((folder) =>
      mapDifferences(folder, {
        pinned: hashes(path.join(pinned, folder)),
        next: hashes(path.join(next, folder)),
      }),
    ),
    ...mapDifferences('written', {
      pinned: since(before.pinned, writtenIn(pinned)),
      next: since(before.next, writtenIn(next)),
    }),
  ];
}

// what no row of a release excuses: a take a run undid, a rule off in a taken file, a package past its homes, a registry not there
function faults({ pinned, next }: Sides<string>): readonly string[] {
  const undone = (side: string, root: string): readonly string[] =>
    holdsItsTake(root) ? [] : [`${side} · a run rewrote a file the take wrote`];
  return [
    ...undone('pinned', pinned),
    ...undone('next', next),
    ...suppressedTaken(next).map(
      (file) => `eslint-suppressions.json · ${file} is a taken file`,
    ),
    ...strays(next).map(
      (entry) => `the package holds ${entry}: the homes and the manifest alone`,
    ),
    ...lacking(next).map(
      (file) => `the contract · ${file} is not there: every product holds it`,
    ),
  ];
}

function reported({
  consumer,
  found,
  broken,
  expected,
}: {
  readonly consumer: Consumer;
  readonly found: readonly string[];
  readonly broken: readonly string[];
  readonly expected: Readonly<Record<string, string>>;
}): boolean {
  const { lines, unexplained, stale } = explained({ found, expected });
  for (const line of lines) console.log(`  ${line}`);
  for (const line of broken) console.log(`  BROKEN · ${line}`);
  const isClean =
    unexplained.length === 0 && stale.length === 0 && broken.length === 0;
  const same =
    found.length === 0
      ? 'NO DIFFERENCE'
      : `${found.length} differences, each expected`;
  console.log(
    isClean
      ? `${same} · ${consumer.name} on the commit in hand, against its pinned tag`
      : `${consumer.name} · ${unexplained.length} unexplained, ${stale.length} stale, ${broken.length} broken`,
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
  const { commands, migration } = consumer;
  if (migration !== null)
    console.log(
      `  migrated · ${migrated({ root: sides.next, wow, migration })}`,
    );
  const resolved = nextTaken({ root: sides.next, archive: packageOf(wow) });
  const before = standing(sides);
  const [pinned, next] = await Promise.all([
    ranIn({ root: sides.pinned, commands }),
    ranIn({ root: sides.next, commands }),
  ]);
  const runs = { pinned, next };
  for (const run of pinned)
    console.log(`  ran · yarn ${run.command} · exit ${String(run.status)}`);
  const found = [
    ...mapDifferences('package', resolved),
    ...runDifferences(runs),
    ...fileDifferences({ consumer, sides, before }),
  ];
  const out = path.join(scratch, consumer.name, 'out');
  kept(out, runs);
  const broken = faults(sides);
  fs.writeFileSync(
    path.join(out, 'differences.txt'),
    `${[...found, ...broken].join('\n')}\n`,
  );
  return reported({ consumer, found, broken, expected });
}

export { tried };
