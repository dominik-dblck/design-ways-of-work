/**
 * - `Run`, `Sides` · a script's exit and output; a thing held once a clone
 * - `runDifferences`, `mapDifferences` · the two clones' runs and files, compared
 * - `explained`, `isHalted`, `unwrittenOnTag` · each difference with its row; a halt
 */

interface Run {
  readonly command: string;
  readonly status: number | null;
  readonly output: string;
}

// pinned: the repository on its tag; next: the same with the commit in hand taken
interface Sides<T> {
  readonly pinned: T;
  readonly next: T;
}

interface Explained {
  readonly lines: readonly string[];
  readonly unexplained: readonly string[];
  readonly stale: readonly string[];
}

// an exit that moved is its own difference: a row on a run's output never explains a failing run
function runDifferences({
  pinned,
  next,
}: Sides<readonly Run[]>): readonly string[] {
  return pinned.flatMap((run, at) => {
    const other = next[at];
    if (other === undefined) return [`missing run · yarn ${run.command}`];
    return [
      ...(run.output === other.output ? [] : [`output · yarn ${run.command}`]),
      ...(run.status === other.status
        ? []
        : [
            `exit · yarn ${run.command} · ${String(run.status)} → ${String(other.status)}`,
          ]),
    ];
  });
}

function mapDifferences<T>(
  name: string,
  { pinned, next }: Sides<ReadonlyMap<string, T>>,
): readonly string[] {
  const keys = new Set([...pinned.keys(), ...next.keys()]);
  return [...keys]
    .filter((key) => pinned.get(key) !== next.get(key))
    .sort((one, other) => one.localeCompare(other))
    .map((key) => `${name} · ${key}`);
}

// a run the tag's side failed and the commit's passed: what the tag's side never wrote is that halt's
const isHalted = ({ pinned, next }: Sides<readonly Run[]>): boolean =>
  pinned.some((run, at) => run.status !== 0 && next[at]?.status === 0);

function unwrittenOnTag<T>(
  name: string,
  { pinned, next }: Sides<ReadonlyMap<string, T>>,
): readonly string[] {
  return [...next.keys()]
    .filter((key) => !pinned.has(key))
    .map((key) => `${name} · ${key}`);
}

const HALTED =
  'the tag’s side never wrote it: a run of its failed where this one passed';

// a row ending in `*` expects every difference it opens
const isExpectedBy = (row: string, difference: string): boolean =>
  row.endsWith('*')
    ? difference.startsWith(row.slice(0, -1))
    : difference === row;

function explained({
  found,
  expected,
  allowed,
  halted,
}: {
  readonly found: readonly string[];
  readonly expected: Readonly<Record<string, string>>;
  // rows of the releases put out since the repository's pin: each explains, none is stale
  readonly allowed: Readonly<Record<string, string>>;
  // what the tag's side never wrote while a run of its halted: a row may still say more
  readonly halted?: ReadonlySet<string>;
}): Explained {
  const rows = Object.entries(expected);
  const every = [...rows, ...Object.entries(allowed)];
  const whyOf = (difference: string): string | undefined =>
    every.find(([row]) => isExpectedBy(row, difference))?.[1] ??
    (halted?.has(difference) === true ? HALTED : undefined);
  const stale = rows
    .map(([row]) => row)
    .filter(
      (row) => !found.some((difference) => isExpectedBy(row, difference)),
    );
  return {
    lines: [
      ...found.map((difference) => {
        const why = whyOf(difference);
        return why === undefined
          ? `DIFF · ${difference}`
          : `EXPECTED · ${difference} · ${why}`;
      }),
      ...stale.map((row) => `STALE · ${row} · expected, and the same now`),
    ],
    unexplained: found.filter((difference) => whyOf(difference) === undefined),
    stale,
  };
}

export { explained, isHalted, mapDifferences, runDifferences, unwrittenOnTag };
export type { Run, Sides };
