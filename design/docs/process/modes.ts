/**
 * - `modesPage` · the ticket modes' page as data, its parts in key order
 * - the build writes modes.json from it (`tools/emit.ts`): edit here
 */
import { ABOUT_TO_HOLDS_NOTE } from './modes/aboutToHoldsNote.ts';
import { HOLDS_TO_LEGEND } from './modes/holdsToLegend.ts';
import { RUNS_FEATURE } from './modes/runsFeature.ts';
import { RUNS_STANDARD } from './modes/runsStandard.ts';

const modesPage = {
  ...ABOUT_TO_HOLDS_NOTE,
  ...HOLDS_TO_LEGEND,
  runs: [...RUNS_FEATURE, ...RUNS_STANDARD],
} as const;

export { modesPage };
