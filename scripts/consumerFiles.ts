/**
 * - `standing` · each clone against its commit, before the runs
 * - `standingOn` · after a run, the differences one clone could show
 * - `differencesOf` · the package, the runs and the files compared; what a halt left
 */
import path from 'node:path';
import {
  haltedOnTag,
  mapDifferences,
  runDifferences,
  unwrittenOnTag,
} from './consumerDiff.ts';
import type { Run, Sides } from './consumerDiff.ts';
import type { Consumer } from './consumerTypes.ts';
import { hashes, since, writtenIn } from './digests.ts';

type Standing = Sides<ReadonlyMap<string, string>>;

// each clone as it stands against its commit: before the runs, what a migration staged
const standing = ({ pinned, next }: Sides<string>): Standing => ({
  pinned: writtenIn(pinned),
  next: writtenIn(next),
});

type Files = readonly (readonly [string, Standing])[];

// one clone's folders and its writes, keyed as a difference names them
function standingOn({
  consumer,
  root,
  before,
}: {
  readonly consumer: Consumer;
  readonly root: string;
  readonly before: ReadonlyMap<string, string>;
}): ReadonlySet<string> {
  return new Set([
    ...consumer.folders.flatMap((folder) =>
      [...hashes(path.join(root, folder)).keys()].map(
        (file) => `${folder} · ${file}`,
      ),
    ),
    ...[...since(before, writtenIn(root)).keys()].map(
      (file) => `written · ${file}`,
    ),
  ]);
}

// each folder's files and what the runs wrote, on both sides
function filesOf({
  consumer,
  sides: { pinned, next },
  before,
}: {
  readonly consumer: Consumer;
  readonly sides: Sides<string>;
  readonly before: Standing;
}): Files {
  return [
    ...consumer.folders.map((folder): readonly [string, Standing] => [
      folder,
      {
        pinned: hashes(path.join(pinned, folder)),
        next: hashes(path.join(next, folder)),
      },
    ]),
    [
      'written',
      {
        pinned: since(before.pinned, writtenIn(pinned)),
        next: since(before.next, writtenIn(next)),
      },
    ],
  ];
}

function differencesOf({
  consumer,
  sides,
  before,
  runs,
  resolved,
}: {
  readonly consumer: Consumer;
  readonly sides: Sides<string>;
  readonly before: Standing;
  readonly runs: Sides<readonly Run[]>;
  readonly resolved: Standing;
}): {
  readonly found: readonly string[];
  readonly halted: ReadonlySet<string>;
} {
  const files = filesOf({ consumer, sides, before });
  const found = [
    ...mapDifferences('package', resolved),
    ...runDifferences(runs),
    ...files.flatMap(([name, both]) => mapDifferences(name, both)),
  ];
  const unwritten = files.flatMap(([name, both]) => unwrittenOnTag(name, both));
  return { found, halted: new Set(haltedOnTag(runs, unwritten)) };
}

export { differencesOf, standing, standingOn };
