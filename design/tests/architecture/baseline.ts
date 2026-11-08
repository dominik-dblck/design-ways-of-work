/**
 * - `heldToItsBaseline` reads a scan's offenders against the list it started from
 * - `driftFrom` · what moved: a new offender, and one fixed but still listed
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './tree.ts';

export type Drift = {
  readonly added: readonly string[];
  readonly fixed: readonly string[];
};

const fileOf = (scan: string): string =>
  path.join(ROOT, 'tests/architecture/baselines', `${scan}.json`);

function baselineOf(scan: string): readonly string[] {
  const file = fileOf(scan);
  if (!fs.existsSync(file)) return [];
  const listed: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(listed)) throw new Error(`${scan}: a baseline is a list`);
  return listed.map(String);
}

export function driftFrom(
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

function write(scan: string, offenders: readonly string[]): void {
  const file = fileOf(scan);
  const { added } = driftFrom(baselineOf(scan), offenders);
  if (fs.existsSync(file) && added.length > 0)
    throw new Error(`${scan}: a baseline never grows · ${added.join(', ')}`);
  const listed = [...new Set(offenders)].sort();
  if (listed.length === 0) {
    fs.rmSync(file, { force: true });
    return;
  }
  fs.writeFileSync(file, `${JSON.stringify(listed, null, 2)}\n`);
}

/** The drift of a scan's offenders from its baseline, written first under `BASELINES=write`. */
export function heldToItsBaseline(
  scan: string,
  offenders: readonly string[],
): Drift {
  if (process.env.BASELINES === 'write') write(scan, offenders);
  return driftFrom(baselineOf(scan), offenders);
}
