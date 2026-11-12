/**
 * - `CASE_READERS` · eagle-design's take of the cases' readers, homes from now
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// split from the rows it gathers on its own tree first: the readers, at the paths the product held them
const CASE_READERS: Migration = {
  release: '0.7.0',
  removes: [],
  moves: [],
  homed: [
    'sheet/cases/journeys.ts',
    'sheet/cases/journeys/journeyCheck.ts',
    'sheet/cases/journeys/journeyReads.ts',
    'sheet/cases/journeys/journeyTypes.ts',
    'sheet/cases/journeys/journeyWords.ts',
    'sheet/cases/sharedCases.ts',
    'sheet/cases/sharedCases/sharedCasesTypes.ts',
    'sheet/cases/testCases.ts',
    'sheet/cases/testCases/caseBaseline.ts',
    'sheet/cases/testCases/caseReach.ts',
    'sheet/cases/testCases/caseText.ts',
    'sheet/cases/testCases/endpointCases.ts',
    'sheet/cases/testCases/testCasesTypes.ts',
  ],
  tree: null,
};

export { CASE_READERS };
