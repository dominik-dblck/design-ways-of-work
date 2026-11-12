/**
 * - `progress` · every epic's tickets by column, the MVP's whole, the line on top
 */
import { columns as COLUMNS } from '../../../roadmaps/tickets.ts';
import { cards } from './boardEpics.ts';
import { featureHrefOf } from './boardLinks.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { ColumnId, EpicCard } from './boardTypes.ts';
import type {
  Progress,
  ProgressRow,
  TicketCounts,
} from './boardProgressTypes.ts';

const NONE: TicketCounts = { blocked: 0, ready: 0, doing: 0, done: 0 };

const isColumn = (column: string): column is ColumnId => column in NONE;

const add = (one: TicketCounts, other: TicketCounts): TicketCounts => ({
  blocked: one.blocked + other.blocked,
  ready: one.ready + other.ready,
  doing: one.doing + other.doing,
  done: one.done + other.done,
});

// how many of an epic's tickets stand in each column
function countsOf(card: EpicCard): TicketCounts {
  return card.tickets.reduce<TicketCounts>(
    (counts, ticket) =>
      isColumn(ticket.column)
        ? { ...counts, [ticket.column]: counts[ticket.column] + 1 }
        : counts,
    NONE,
  );
}

const rowOf = (card: EpicCard): ProgressRow => ({
  id: card.id,
  name: card.name,
  mvp: card.badge.tone === 'mvp',
  badge: card.badge.label,
  column: card.column,
  feature: featureHrefOf(card.id),
  counts: countsOf(card),
  total: card.tickets.length,
});

function progress(): Progress {
  const rows = cards().map(rowOf);
  const mvp = rows.filter((row) => row.mvp);
  const counts = mvp.map((row) => row.counts).reduce(add, NONE);
  const total = mvp.reduce((sum, row) => sum + row.total, 0);
  const epicsIn = (column: ColumnId): number =>
    mvp.filter((row) => row.column === column).length;
  const words = BOARD_WORDS.progress;
  return {
    label: words.label,
    note: [
      `${epicsIn('done')} ${BOARD_WORDS.epic.of} ${mvp.length} ${words.closed}`,
      `${epicsIn('doing')} ${words.doing}`,
      `${epicsIn('ready')} ${words.ready}`,
    ].join(' · '),
    mvp: {
      label: `${BOARD_WORDS.badges.mvp} · ${mvp.length} ${words.epics}`,
      counts,
      total,
      percent: `${total ? Math.round((100 * counts.done) / total) : 0}%`,
      tickets: `${counts.done} / ${total} ${words.tickets}`,
    },
    // in the bar's order, done first: the board's columns read right to left
    legend: [...COLUMNS]
      .reverse()
      .map((column) => ({ id: column.id, label: column.label })),
    rows,
  };
}

export { progress };
