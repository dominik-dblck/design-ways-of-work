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
  versionTaken,
} from './consumerClones.ts';
import { explained } from './consumerDiff.ts';
import type { Run, Sides } from './consumerDiff.ts';
import { portFaults, trunkTaken } from './consumerPort.ts';
import { differencesOf, standing, standingOn } from './consumerFiles.ts';
import { ranIn } from './consumerRuns.ts';
import type { Consumer } from './consumerTypes.ts';
import { migrated } from './migrated.ts';
import { rowsSince } from './releasedRows.ts';
import type { Released } from './releasedRows.ts';

interface Trial {
  readonly consumer: Consumer;
  readonly wow: string;
  readonly scratch: string;
  // each difference this release means in the repository, and why
  readonly expected: Readonly<Record<string, string>>;
  // each release put out, the newest first, with its rows for the repository
  readonly released: readonly Released[];
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

// what no row of a release excuses in a clone: a take a run undid, a rule off in a taken file, a package past its homes, a registry not there
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
  rows,
}: {
  readonly consumer: Consumer;
  readonly found: readonly string[];
  readonly broken: readonly string[];
  readonly rows: Omit<Parameters<typeof explained>[0], 'found'>;
}): boolean {
  const { lines, unexplained, stale } = explained({ found, ...rows });
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

// a branch that did not take its trunk is tried no further: what the script left is the trial's fault
const untakenOnly = (consumer: Consumer, untaken: readonly string[]): boolean =>
  reported({
    consumer,
    found: [],
    broken: untaken,
    rows: { expected: {}, allowed: {} },
  });

interface Readied {
  readonly sides: Sides<string>;
  // what the port's script could not settle when a clone took the trunk
  readonly untaken: readonly string[];
  // what the package resolves, on the tag and on the commit in hand
  readonly resolved: Sides<ReadonlyMap<string, string>>;
}

// two clones made ready: each takes its trunk where the repository has a port, the one that takes the commit is migrated first
function readied({
  consumer,
  wow,
  scratch,
}: Pick<Trial, 'consumer' | 'wow' | 'scratch'>): Readied {
  const sides = cloned({ consumer, wow, scratch });
  const untaken = [sides.pinned, sides.next].flatMap((root) =>
    trunkTaken({ consumer, wow, root }),
  );
  if (consumer.port !== null)
    console.log(`  taken · ${consumer.port.trunk}, by the port's script`);
  if (consumer.migration !== null && untaken.length === 0) {
    const { migration } = consumer;
    console.log(
      `  migrated · ${migrated({ root: sides.next, wow, migration })}`,
    );
  }
  const resolved = nextTaken({ root: sides.next, archive: packageOf(wow) });
  return { sides, untaken, resolved };
}

// both at once, each its own tree; the commit's side keeps what each run left, for a halt
async function ranBoth({
  consumer,
  sides,
  before,
}: {
  readonly consumer: Consumer;
  readonly sides: Sides<string>;
  readonly before: Sides<ReadonlyMap<string, string>>;
}): Promise<Sides<readonly Run[]>> {
  const { commands } = consumer;
  const root = sides.next;
  const after = (): ReadonlySet<string> =>
    standingOn({ consumer, root, before: before.next });
  const [pinned, next] = await Promise.all([
    ranIn({ root: sides.pinned, commands }),
    ranIn({ root, commands, after }),
  ]);
  for (const run of pinned)
    console.log(`  ran · yarn ${run.command} · exit ${String(run.status)}`);
  return { pinned, next };
}

async function tried({
  consumer,
  wow,
  scratch,
  expected,
  released,
}: Trial): Promise<boolean> {
  const { sides, untaken, resolved } = readied({ consumer, wow, scratch });
  if (untaken.length > 0) return untakenOnly(consumer, untaken);
  // a repository that pins an older tag meets each release since: their rows explain as this one's do
  const allowed = rowsSince(released, versionTaken(sides.pinned));
  const before = standing(sides);
  const runs = await ranBoth({ consumer, sides, before });
  const { found, halted } = differencesOf({
    consumer,
    sides,
    before,
    runs,
    resolved,
  });
  const out = path.join(scratch, consumer.name, 'out');
  kept(out, runs);
  const broken = [
    ...untaken,
    ...faults(sides),
    ...portFaults({ consumer, wow }),
  ];
  fs.writeFileSync(
    path.join(out, 'differences.txt'),
    `${[...found, ...broken].join('\n')}\n`,
  );
  return reported({
    consumer,
    found,
    broken,
    rows: { expected, allowed, halted },
  });
}

export { tried };
