/**
 * - `all`, `open`, `sides` · every finding, those still open, their two sides
 */
import type { FindingRow, FindingSide } from './findings/findingTypes.ts';

const all: readonly FindingRow[] = [];
const open: readonly FindingRow[] = [];

const sides: readonly FindingSide[] = [
  { side: 'design', title: 'Open · design side', note: null },
  { side: 'repo', title: 'Open · build side', note: null },
];

export { all, open, sides };
