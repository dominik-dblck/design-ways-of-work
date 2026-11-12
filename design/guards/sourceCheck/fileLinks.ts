/**
 * - `tallied`, `totalOf` · each copy counted on its file and on its file-home pair
 * - `linksOf` · a read, an embedded component, a copy to its home, a fact's move
 */
import { SOURCE_LAYERS } from './sourceLayers.ts';
import type {
  CopyTally,
  DrawnFiles,
  FileLink,
  SourceFinding,
  MapOptions,
  NodeBase,
} from './sourceCheckTypes.ts';

function bumped(
  counts: Map<string, Map<string, number>>,
  { key, kind }: { readonly key: string; readonly kind: string },
): void {
  const tally = counts.get(key) ?? new Map<string, number>();
  counts.set(key, tally);
  tally.set(kind, (tally.get(kind) ?? 0) + 1);
}

function totalOf(counts?: ReadonlyMap<string, number>): number {
  return [...(counts ?? new Map<string, number>()).values()].reduce(
    (sum, one) => sum + one,
    0,
  );
}

// a copy with a home of its own is drawn as a link from its file to its home
function tallied(
  found: readonly SourceFinding[],
  add: (file: string) => void,
): {
  readonly byFile: ReadonlyMap<string, ReadonlyMap<string, number>>;
  readonly pairs: readonly CopyTally[];
} {
  const byFile = new Map<string, Map<string, number>>();
  const byPair = new Map<string, Map<string, number>>();
  const ends = new Map<string, Pick<CopyTally, 'from' | 'to'>>();
  for (const one of found.filter((each) => each.file)) {
    add(one.file);
    bumped(byFile, { key: one.file, kind: one.kind });
    if (!one.home || one.home === one.file) continue;
    add(one.home);
    const key = `${one.file}\u0001${one.home}`;
    if (!ends.has(key)) ends.set(key, { from: one.file, to: one.home });
    bumped(byPair, { key, kind: one.kind });
  }
  const pairs = [...ends].map(([key, end]) => ({
    ...end,
    kinds: byPair.get(key) ?? new Map<string, number>(),
  }));
  return { byFile, pairs };
}

function readLinks(
  drawn: DrawnFiles,
  known: ReadonlyMap<string, NodeBase>,
): readonly FileLink[] {
  return Object.entries(drawn.reads).flatMap(([file, { reads }]) =>
    reads
      .filter((read) => read.file !== file && known.has(read.file))
      .map((read) => ({
        from: file,
        to: read.file,
        kind: 'read',
        against: !(
          (SOURCE_LAYERS[read.file] ?? NaN) < (SOURCE_LAYERS[file] ?? NaN)
        ),
      })),
  );
}

function embedLinks(
  drawn: DrawnFiles,
  known: ReadonlyMap<string, NodeBase>,
): readonly FileLink[] {
  return [...drawn.uses].flatMap(([file, used]) =>
    used
      .filter(
        (one) =>
          /<dc-import/.test(one.code) && known.has(one.file) && known.has(file),
      )
      .map((one) => ({ from: one.file, to: file, kind: 'embed' })),
  );
}

function linksOf(
  drawn: DrawnFiles,
  {
    known,
    pairs,
    moves,
  }: {
    readonly known: ReadonlyMap<string, NodeBase>;
    readonly pairs: readonly CopyTally[];
    readonly moves: MapOptions['moves'];
  },
): readonly FileLink[] {
  const copied = pairs.map((pair) => ({
    from: pair.from,
    to: pair.to,
    kind: 'copy',
    n: totalOf(pair.kinds),
    kinds: Object.fromEntries(pair.kinds),
  }));
  const moved = (moves ?? [])
    .filter((move) => known.has(move.from) && known.has(move.to))
    .map((move) => ({
      from: move.from,
      to: move.to,
      kind: 'move',
      fact: move.fact,
      by: move.by,
    }));
  return [
    ...readLinks(drawn, known),
    ...embedLinks(drawn, known),
    ...copied,
    ...moved,
  ];
}

export { linksOf, tallied, totalOf };
