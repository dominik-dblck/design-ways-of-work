/**
 * - `featureHrefOf`, `BOARD_HREF` · the Feature page opened on one epic; the board
 */

// a page's shell is its file's name in capitals (tools/layout.ts · pageOf)
const FEATURE_PAGE = 'Feature.html';
const BOARD_HREF = 'Board.html';

const featureHrefOf = (epic: string): string =>
  `${FEATURE_PAGE}?epic=${encodeURIComponent(epic)}`;

export { BOARD_HREF, featureHrefOf };
