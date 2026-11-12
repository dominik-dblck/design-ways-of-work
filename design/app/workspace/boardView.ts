/**
 * - `words`, `stats`, `nextUp`, `velocity` · words, numbers, what to take, the pace
 * - `columns`, `progress`, `epicOf`, `ticketDetailOf` · by column, the list, one
 * - `ideas`, `ports`, `open`, `kinds` · ideas, the ports, open points, ticket kinds
 */
export { kinds, open, ports } from './boardView/boardAside.ts';
export { columns, epicOf } from './boardView/boardEpics.ts';
export { progress } from './boardView/boardProgress.ts';
export { ideas } from './boardView/boardIdeas.ts';
export { nextUp, stats } from './boardView/boardNumbers.ts';
export { ticketDetailOf } from './boardView/boardTicket.ts';
export { velocity } from './boardView/boardVelocity.ts';
export { BOARD_WORDS as words } from './boardView/boardWords.ts';
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
} from './boardView/boardTypes.ts';
export type {
  Progress,
  ProgressRow,
  TicketCounts,
} from './boardView/boardProgressTypes.ts';
