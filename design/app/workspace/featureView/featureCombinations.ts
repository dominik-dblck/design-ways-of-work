/**
 * - `combinationsOf`, `statesNamed` · an epic's fact combination files, its states
 * - `countLine` · a file's rows counted by kind, or why they cannot be
 */
import { combinations as COMBINATIONS } from '../../../docs/process/projectPlan.ts';
import type { ProductView } from '../../../tools/productTypes.ts';
import type { CombinationView } from './featureTypes.ts';

const combinationsOf = (epic: string): readonly CombinationView[] =>
  COMBINATIONS.filter((one) => one.epic === epic).map((one) => ({
    file: one.file,
    call: one.call,
    criteria: one.criteria,
    what: one.what,
  }));

// the states and the counters are the product's, handed in by the page that runs the view
const statesNamed = (epic: string, statesOf: ProductView['statesOf']): number =>
  statesOf?.(epic) ?? 0;

function countLine(file: string, counters: ProductView['counters']): string {
  const counter = counters?.[file];
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
