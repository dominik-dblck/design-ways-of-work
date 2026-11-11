/**
 * - `CARRIED` · each change of eagle-design's `main` to a file a home holds now,
 * - carried into that home: the file there, its blob there, where the change stands
 */
import type { Carried } from '../../scripts/portTypes.ts';

const CARRIED: readonly Carried[] = [
  {
    file: 'docs/documents/api-convention/apiConventionOne.ts',
    blob: '3a2af9e0eeec9748ba8d559d60e493cbed8b505c',
    how: 'word for word in design/docs/documents/api-convention: the sixth check of endpointChecks.ts, the 502 row of endpointShape.ts',
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
  {
    file: 'tests/architecture/anExportIsRead.test.ts',
    blob: 'ce273b208e75b06980a71a61d630d60dc267f515',
    how: 'design/tests/architecture/anExportIsRead.test.ts reads the names off the product’s sheet/project.ts · buildReads.names: the list left the home',
  },
];

export { CARRIED };
