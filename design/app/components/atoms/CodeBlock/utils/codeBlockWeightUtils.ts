/**
 * - `weightOf` · a piece's weight: a route and a warning most
 */
import type { CodeLine } from '../../../../workspace/contract-view.ts';

// a route and a warning stand out most, a type a little
const weightOf = (piece: CodeLine[number]): number => {
  if (piece.strong) return 600;
  return piece.kind === 'type' ? 500 : 400;
};

export { weightOf };
