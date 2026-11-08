/**
 * - `words`, `stats`, `nextUp`, `velocity` · words, numbers, what to take, the pace
 * - `columns`, `epicOf`, `ticketOf` · the epics by column, one epic, one ticket
 * - `ideas`, `ports`, `open`, `kinds` · ideas, the ports, open points, ticket kinds
 */
export { kinds, open, ports } from './board-view/boardAside.ts';
export { columns, epicOf } from './board-view/boardEpics.ts';
export { ideas } from './board-view/boardIdeas.ts';
export { nextUp, stats } from './board-view/boardNumbers.ts';
export { ticketOf } from './board-view/boardTicket.ts';
export { velocity } from './board-view/boardVelocity.ts';
export { BOARD_WORDS as words } from './board-view/boardWords.ts';
export type {
  Column,
  EpicCard,
  IdeaCard,
  Reading,
  Section,
  Stat,
  TicketDetail,
  TicketLine,
  Velocity,
  VelocityDay,
} from './board-view/boardTypes.ts';
