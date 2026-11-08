/**
 * - `weightOf` · a piece's weight: a route and a warning most
 */
import type { CodeLine } from '../../../../workspace/contract-view.ts';

// a route and a warning stand out most, a type a little
const weightOf = (piece: CodeLine[number]): number =>
  piece.strong ? 600 : piece.kind === 'type' ? 500 : 400;

export { weightOf };
