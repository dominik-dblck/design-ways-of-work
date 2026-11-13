/**
 * - `BOARD_NUMBERS` · the board's numbers in two cards, the epics listed, ids typed
 */
import type { Carried } from '../../../scripts/portTypes.ts';

const BOARD_NUMBERS: readonly Carried[] = [
  {
    file: 'app/pages/board/BoardPage.tsx',
    blob: '30e6c2c06589dfc17369d036db02230db17d84a0',
    how: 'design/app/components/organisms/BoardPage/BoardPage.tsx: the columns and kinds folded, BoardPagePortsSection, BoardPageContractSection drawing the ContractBody organism; the numbers read by BoardPageStatRow itself, the page higher',
  },
  {
    file: 'app/pages/board/EpicPanel.tsx',
    blob: 'fbe56a9b27a994c39a7a5f1aeccad7189938c680',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageEpicPanel.tsx: no prototype lists',
  },
  {
    file: 'app/pages/board/StatRow.tsx',
    blob: '47c22572e3de2c545e8a6f5c39b11dced0d7d840',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageStatRow.tsx: two folds, the project and the repository, each a BoardPageNumberGroup on FoldSection; its lines BoardPageNumberLine, their grid in constants/boardPageNumberLineConstants.ts; the repository now at its commit, and at close',
  },
  {
    file: 'app/pages/board/StatTile.tsx',
    blob: '8ac54deb3f4f8aa65b5d5382edecc075647e9468',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageStatTile.tsx: one Stat, its value large, the words beside it, its bar (BoardPageShareBar), its line on hover, a link where it opens a page; its value and a share’s whole in constants/boardPageStatTileConstants.ts',
  },
  {
    file: 'app/workspace/board-view.ts',
    blob: '22901b563fa784737e650251ca9111e215e743db',
    how: 'design/app/workspace/boardView.ts: RepositoryNumbers exported beside repository',
  },
  {
    file: 'app/workspace/board-view/boardEpics.ts',
    blob: '614ad89001009bc1c189cb29e47fbe87930188c2',
    how: 'design/app/workspace/boardView/boardEpics.ts: listed, the closed first and the deferred last; no prototype',
  },
  {
    file: 'app/workspace/board-view/boardLinks.ts',
    blob: '4dc208f68e5a521db5c5be83cf81a7578141e6c8',
    how: 'design/app/workspace/boardView/boardLinks.ts, word for word',
  },
  {
    file: 'app/workspace/board-view/boardProgress.ts',
    blob: 'cf431416c6ca176b15d25128163c86657d1b61b6',
    how: 'design/app/workspace/boardView/boardProgress.ts reads the epics as listed',
  },
  {
    file: 'app/workspace/board-view/boardProject.ts',
    blob: '33eca1a1b82d956ba97b6ea64f2217e25e3e9035',
    how: 'design/app/workspace/boardView/boardProject.ts: each count a Stat with its note; ProjectStat retired from boardTypes.ts',
  },
  {
    file: 'app/workspace/board-view/boardRepository.ts',
    blob: '6ef533e649cefa666a0d0a451c1422916f72dc50',
    how: 'design/app/workspace/boardView/boardRepository.ts: the repository now from the receipts’ RepositoryState, its change since the report before, and at close',
  },
  {
    file: 'app/workspace/board-view/boardTypes.ts',
    blob: 'cda405ac70fc509eca8c5c095578ea276e7d56c9',
    how: 'design/app/workspace/boardView/boardTypes.ts: Stat with its sub, share, note and href; no ProjectStat',
  },
  {
    file: 'app/workspace/board-view/boardWords.ts',
    blob: '4b5dfcbb1305ecd67240e1fd2bb6552b2bbd116b',
    how: 'design/app/workspace/boardView/boardWords.ts: the units, each number’s note; the browser tests’ tool named by the product’s stack (productStack), not written',
  },
  {
    file: 'app/workspace/contract-view/bodyFields.ts',
    blob: 'acea56a3d2f8fa1d1c9d4f4fe9ff69f5d6a22f76',
    how: 'design/app/workspace/contractView/bodyFields.ts cuts a body by pointsOf, design/app/workspace/textPoints.ts',
  },
  {
    file: 'app/workspace/feature-view.ts',
    blob: 'c9889b8b084d96f3870e458373475312ceec55dd',
    how: 'design/app/workspace/featureView.ts: every epic a tab in the board list’s order, the notebook by notesViewOf, no refine standing',
  },
  {
    file: 'app/workspace/feature-view/featureNotes.ts',
    blob: '26a4496f8feb73bf73dbc18be5e6d2838b38d613',
    how: 'design/app/workspace/featureView/featureNotes.ts cuts a line by pointsOf, design/app/workspace/textPoints.ts',
  },
  {
    file: 'app/workspace/text-points.ts',
    blob: '6010bfbf44ab4c667051ddc8f65ad676200c90c3',
    how: 'design/app/workspace/textPoints.ts',
  },
  {
    file: 'docs/process/plans/plansTypes.ts',
    blob: 'b1944726b6c24e073d1093ac508457952ec7f792',
    how: 'CombinationFile left the home for the product’s plan, docs/process/projectPlan/projectPlanTypes.ts: its epic typed EpicId there is the product’s own',
  },
  {
    file: 'docs/skills/refine.ts',
    blob: 'e228c75d87b19bed11ebb4edba07657ece69804b',
    how: 'design/docs/skills/refine.ts, word for word',
  },
  {
    file: 'guards/checks/decisionsCheck.ts',
    blob: '638bae434b06f674896d0c0bc753fb5c1206a60d',
    how: 'design/guards/checks/decisionsCheck.ts counts the open findings',
  },
  {
    file: 'tests/app/boardView.test.ts',
    blob: 'd06d4b42abb861db6c3ee223bd752fa16268d460',
    how: 'design/tests/app/boardView.test.ts: the tickets’ number and its whole read apart, by ticketDetailOf',
  },
  {
    file: 'tests/architecture/aNamedTicketExists.test.ts',
    blob: '2d0183abfc6b0c62f96d3b84b1262839d3c282b5',
    how: 'design/tests/architecture/aNamedTicketExists.test.ts, word for word',
  },
  {
    file: 'tools/emit.ts',
    blob: 'd539970f8a7620ae091e1bb6f74924f988696a0c',
    how: 'design/tools/emit.ts writes roadmaps/ids.ts after the tokens',
  },
  {
    file: 'tools/ids.ts',
    blob: '85a9ed163de534f886ca346f42881f6bbf894b90',
    how: 'design/tools/ids.ts, an epic’s number named epicNum',
  },
];

export { BOARD_NUMBERS };
