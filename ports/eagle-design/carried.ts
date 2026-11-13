/**
 * - `CARRIED` · each change of eagle-design's `main` to a file a home holds now,
 * - carried into that home: the file there, its blob there, where the change stands
 */
import type { Carried } from '../../scripts/portTypes.ts';
import { BOARD_AND_CONTRACT } from './carried/boardAndContract.ts';
import { BOARD_NUMBERS } from './carried/boardNumbers.ts';
import { ENDPOINT_FOLDS } from './carried/endpointFolds.ts';
import { FEATURE_FOLDS } from './carried/featureFolds.ts';
import { REPOSITORY_LINE } from './carried/repositoryLine.ts';
import { SPLIT_HOMES } from './carried/splitHomes.ts';

const CARRIED: readonly Carried[] = [
  {
    file: 'eslint.config.ts',
    blob: '5b84668b84bb619586da3979b932ca3471668a77',
    how: 'design/eslint.config.ts reads the scope: roadmaps/ids.ts stands in its `generated`, which the shared config leaves out of the size rules',
  },
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
    file: 'roadmaps/notes.ts',
    blob: '2c8f3b6ff3d476989ac87293fe0b296e3852bcf1',
    how: 'the E22 notebook main lists here stands in the product’s roadmaps/notes/notesRows.ts on its port: the home reads that file, as it was',
  },
  {
    file: 'tests/architecture/aClosedNotebookIsFrozen.test.ts',
    blob: 'a945a952e0939e1c8a93a7a0c8021ae6159baa40',
    how: 'the pins stand in the product’s roadmaps/notes/frozenNotebooks.ts, E10’s and E11’s among them: the home’s test is as it was',
  },
  {
    file: 'tests/architecture/anExportIsRead.test.ts',
    blob: 'ce273b208e75b06980a71a61d630d60dc267f515',
    how: 'design/tests/architecture/anExportIsRead.test.ts reads the names off the product’s sheet/project.ts · buildReads.names: the list left the home',
  },
  ...BOARD_AND_CONTRACT,
  ...FEATURE_FOLDS,
  ...ENDPOINT_FOLDS,
  ...SPLIT_HOMES,
  ...BOARD_NUMBERS,
  ...REPOSITORY_LINE,
];

export { CARRIED };
