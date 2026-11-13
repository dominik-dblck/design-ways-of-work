/**
 * - `ORDER` · a bar's parts by column, done first
 */
import type { TicketCounts } from '../../../../workspace/boardView.ts';

// done first, as the original reads: what is built, in hand, ready, then what waits
const ORDER: readonly (keyof TicketCounts)[] = [
  'done',
  'doing',
  'ready',
  'blocked',
];

export { ORDER };
