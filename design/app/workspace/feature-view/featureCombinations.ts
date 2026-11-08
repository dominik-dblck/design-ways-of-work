/**
 * - `combinationsOf`, `statesNamed` · an epic's fact combination files, its states
 * - `countLine` · a file's rows counted by kind, or why they cannot be
 */
import { combinations as COMBINATIONS } from '../../../docs/process/plans.ts';
import { count as roleCount } from '../../../sheet/logic/approval/role-combinations.ts';
import { stateIndex } from '../../../sheet/logic/approval/scenes.ts';
import type { CombinationView } from './featureTypes.ts';

interface Tally {
  readonly total: number;
  readonly byKind: Readonly<Record<string, number>>;
}

// the row names its counter as a call for the build side; the page reaches it by the file
const COUNTERS: Readonly<Record<string, () => Tally>> = {
  'role-combinations.ts': roleCount,
};

const combinationsOf = (epic: string): readonly CombinationView[] =>
  COMBINATIONS.filter((one) => one.epic === epic).map((one) => ({
    file: one.file,
    call: one.call,
    criteria: one.criteria,
    what: one.what,
  }));

const statesNamed = (epic: string): number =>
  stateIndex().filter((one) => one.epic === epic).length;

function countLine(file: string): string {
  const counter = COUNTERS[file];
  if (!counter) return `No counter reaches ${file}`;
  try {
    const { total, byKind } = counter();
    const kinds = Object.entries(byKind).map(
      ([kind, rows]) => `${kind} ${rows}`,
    );
    return [`${total} rows`, ...kinds].join(' · ');
  } catch (error) {
    return `Cannot count · ${error instanceof Error ? error.message : String(error)}`;
  }
}

export { combinationsOf, countLine, statesNamed };
