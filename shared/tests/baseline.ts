/**
 * - `heldToItsBaseline`, `heldToItsCount`, `heldIn` · a scan's offenders, its list
 * - `driftFrom`, `countDriftFrom` · what moved: new, or fixed but still listed
 * - a counted scan's entry, `{key} · {count}`, may fall and never rise
 */
import fs from 'node:fs';
import path from 'node:path';
import { scope } from '../../scope.ts';

interface Drift {
  readonly added: readonly string[];
  readonly fixed: readonly string[];
}

interface Held {
  readonly folder: string;
  readonly scan: string;
  readonly offenders: readonly string[];
  readonly asked: string | undefined;
  readonly counted: boolean;
}

// a list per scan, which `BASELINES=start:{scan}` starts once and `BASELINES=write` only shrinks
const BASELINES = 'tests/architecture/baselines';

const isAString = (one: unknown): one is string => typeof one === 'string';

const listedOf = (offenders: readonly string[]): string =>
  `${JSON.stringify([...new Set(offenders)].sort(), null, 2)}\n`;

// a baseline's JSON, its scan named when it does not parse
function parsedOf(file: string, scan: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`${scan}: its baseline is no JSON`, { cause: error });
  }
}

// a baseline's list, refused, never coerced, when it holds anything but strings
function baselineOf(file: string, scan: string): readonly string[] {
  if (!fs.existsSync(file)) return [];
  const listed = parsedOf(file, scan);
  if (!Array.isArray(listed))
    throw new Error(`${scan}: a baseline is a list of strings`);
  const strings = listed.filter(isAString);
  const bad: unknown = listed.find((one) => !isAString(one));
  if (strings.length !== listed.length)
    throw new Error(
      `${scan}: a baseline holds strings, not ${JSON.stringify(bad)}`,
    );
  return strings;
}

const A_COUNT = /^(.*) · (\d+)$/;

// an entry's key and count: a plain one is its own key, a counted one is `{key} · {count}`
type Reading = (entry: string) => readonly [string, number];
const plain: Reading = (entry) => [entry, 0];
const counted: Reading = (entry) => {
  const [, key, count] = A_COUNT.exec(entry) ?? [];
  if (key === undefined)
    throw new Error(`a counted entry is "{key} · {count}": ${entry}`);
  return [key, Number(count)];
};

// an offender is new, or counted higher than its listed entry; a listed one is gone, or counted lower now
const driftBy =
  (read: Reading) =>
  (baseline: readonly string[], offenders: readonly string[]): Drift => {
    const listed = new Map(baseline.map((entry) => [read(entry)[0], entry]));
    const found = new Map(offenders.map((entry) => [read(entry)[0], entry]));
    const rose = (entry: string, than: string | undefined): boolean =>
      than === undefined || read(entry)[1] > read(than)[1];
    return {
      added: [...found.values()]
        .filter((entry) => rose(entry, listed.get(read(entry)[0])))
        .sort(),
      fixed: [...listed.values()]
        .filter((entry) => {
          const now = found.get(read(entry)[0]);
          return now === undefined || read(now)[1] < read(entry)[1];
        })
        .sort(),
    };
  };

const driftFrom = driftBy(plain);
const countDriftFrom = driftBy(counted);

// a list starts once, from offenders the code already holds
function start(file: string, { scan, offenders }: Held): void {
  if (fs.existsSync(file))
    throw new Error(`${scan}: its baseline exists, and a list starts once`);
  if (offenders.length === 0)
    throw new Error(`${scan}: no offender, so no list to start`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, listedOf(offenders));
  // a start says so, as an emptied list does: a mistyped scan's start prints nothing
  console.log(
    `${scan} · started: ${String(new Set(offenders).size)} offenders`,
  );
}

// a list only shrinks, and goes when it empties: a scan with no list holds every offender red
function shrink(file: string, held: Held): void {
  const { scan, offenders } = held;
  if (!fs.existsSync(file)) return;
  const { added } = (held.counted ? countDriftFrom : driftFrom)(
    baselineOf(file, scan),
    offenders,
  );
  if (added.length > 0)
    throw new Error(`${scan}: a baseline never grows · ${added.join(', ')}`);
  if (offenders.length > 0) {
    fs.writeFileSync(file, listedOf(offenders));
    return;
  }
  fs.rmSync(file);
  console.log(`${scan} · emptied: its baseline removed`);
}

// the drift of a scan's offenders from its list, the list started or shrunk first when asked
function heldIn(held: Held): Drift {
  const file = path.join(held.folder, `${held.scan}.json`);
  if (held.asked === `start:${held.scan}`) start(file, held);
  if (held.asked === 'write') shrink(file, held);
  return (held.counted ? countDriftFrom : driftFrom)(
    baselineOf(file, held.scan),
    held.offenders,
  );
}

const heldToItsBaseline = (scan: string, offenders: readonly string[]): Drift =>
  heldIn({
    folder: path.join(scope.root, BASELINES),
    scan,
    offenders,
    asked: process.env['BASELINES'],
    counted: false,
  });

// a scan of counts, one per key: an offender is a key over its limit, with how far
const heldToItsCount = (
  scan: string,
  counts: ReadonlyMap<string, number>,
): Drift =>
  heldIn({
    folder: path.join(scope.root, BASELINES),
    scan,
    offenders: [...counts].map(([key, count]) => `${key} · ${String(count)}`),
    asked: process.env['BASELINES'],
    counted: true,
  });

export { countDriftFrom, driftFrom, heldIn, heldToItsBaseline, heldToItsCount };
