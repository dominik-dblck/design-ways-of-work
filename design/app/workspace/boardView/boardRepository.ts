/**
 * - `repository` · what the build side reported, summed over the board's tickets
 */
import { receipts as RECEIPTS } from '../../../roadmaps/receipts.ts';
import { all as TICKETS } from '../../../roadmaps/tickets.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { ProjectStat } from './boardTypes.ts';

// a receipt counts while its ticket stands on the board
function reported(): readonly { readonly tests: number | null }[] {
  return TICKETS().flatMap((ticket) => {
    const receipt = RECEIPTS[ticket.id];
    return receipt ? [receipt] : [];
  });
}

function repository(): readonly ProjectStat[] {
  const words = BOARD_WORDS.repository;
  const receipts = reported();
  return [
    {
      id: 'tests',
      value: String(receipts.reduce((sum, one) => sum + (one.tests ?? 0), 0)),
      label: words.tests,
      href: null,
    },
    {
      id: 'tickets',
      value: String(receipts.length),
      label: words.tickets,
      href: null,
    },
  ];
}

export { repository };
