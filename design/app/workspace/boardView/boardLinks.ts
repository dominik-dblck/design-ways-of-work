/**
 * - `featureHrefOf`, `FEATURE_HREF` · the Feature page, on one epic or as it is
 * - `BOARD_HREF`, `CONTRACT_HREF` · the board, the contract page
 */

// a page's shell is its file's name in capitals (tools/layout.ts · pageOf)
const FEATURE_HREF = 'Feature.html';
const BOARD_HREF = 'Board.html';
const CONTRACT_HREF = 'Contract.html';

const featureHrefOf = (epic: string): string =>
  `${FEATURE_HREF}?epic=${encodeURIComponent(epic)}`;

export { BOARD_HREF, CONTRACT_HREF, FEATURE_HREF, featureHrefOf };
