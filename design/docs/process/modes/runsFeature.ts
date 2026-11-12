/**
 * - `RUNS_FEATURE` · runs of the ticket modes' page
 * - feature, in its order
 */
import { RUNS_FEATURE_FIRST_ROWS } from './runsFeatureFirstRows.ts';
import { RUNS_FEATURE_LAST_ROWS } from './runsFeatureLastRows.ts';
import { RUNS_FEATURE_LOADS } from './runsFeatureLoads.ts';
import { EXAMPLE_TICKET } from './modeExample.ts';

const RUNS_FEATURE = [
  {
    id: 'feature',
    emoji: '🧩',
    name: 'feature',
    note: `every epic · ${EXAMPLE_TICKET} as the example`,
    rows: [...RUNS_FEATURE_FIRST_ROWS, ...RUNS_FEATURE_LAST_ROWS],
    loads: RUNS_FEATURE_LOADS,
  },
] as const;

export { RUNS_FEATURE };
