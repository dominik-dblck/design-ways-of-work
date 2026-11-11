/**
 * - `CARRIED` · each change of eagle-design's `main` to a file a home holds now,
 * - carried into that home: the file there, its blob there, where the change stands
 */
import type { Carried } from '../../scripts/portTypes.ts';

const CARRIED: readonly Carried[] = [
  {
    file: 'docs/documents/api-convention/apiConventionOne.ts',
    blob: '2607f8e9c281156ad47b3db2bd41324dc6e87f01',
    how: 'the sixth check of design/docs/documents/api-convention/endpointChecks.ts, word for word',
  },
  {
    file: 'docs/rules/README.md',
    blob: '45c3c6a6ee868da5767ff14bfac8980b1649894f',
    how: 'design/docs/rules/README.md names the build repository by its role, no name',
  },
  {
    file: 'guards/checks/journeysPart.ts',
    blob: 'df6a58d9ed9b95c593a7ef713837bbaf9eee3686',
    how: 'design/guards/checks/journeysPart.ts: the epics off the backlog, a journey that waits',
  },
  {
    file: 'tests/architecture/aClosedNotebookIsFrozen.test.ts',
    blob: '14591e9d875ab117e2a69fe545527b6768aed39b',
    how: 'the pins stand in the migration’s roadmaps/notes/frozenNotebooks.ts, the newest among them',
  },
];

export { CARRIED };
