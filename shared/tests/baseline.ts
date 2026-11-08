/**
 * - `heldToItsBaseline`, `heldIn` · a scan's offenders against its list
 * - `driftFrom` · what moved: a new offender, and one fixed but still listed
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

function driftFrom(
  baseline: readonly string[],
  offenders: readonly string[],
): Drift {
  const now = new Set(offenders);
  const then = new Set(baseline);
  return {
    added: [...now].filter((offender) => !then.has(offender)).sort(),
    fixed: [...then].filter((offender) => !now.has(offender)).sort(),
  };
}

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
function shrink(file: string, { scan, offenders }: Held): void {
  if (!fs.existsSync(file)) return;
  const { added } = driftFrom(baselineOf(file, scan), offenders);
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
  return driftFrom(baselineOf(file, held.scan), held.offenders);
}

const heldToItsBaseline = (scan: string, offenders: readonly string[]): Drift =>
  heldIn({
    folder: path.join(scope.root, BASELINES),
    scan,
    offenders,
    asked: process.env.BASELINES,
  });

export { driftFrom, heldIn, heldToItsBaseline };
