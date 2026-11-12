/**
 * - `words`, `stats`, `nextUp`, `velocity`, `ideas`, `ports`, `kinds` · the parts
 * - `cards`, `columns`, `progress`, `epicOf`, `ticketDetailOf` · epics, list, one
 * - `featureHrefOf`, `boardHref`, `pickedEpic` · the links, the epic last picked
 */
export { kinds, ports } from './boardView/boardAside.ts';
export { cards, columns, epicOf } from './boardView/boardEpics.ts';
export { progress } from './boardView/boardProgress.ts';
export { ideas } from './boardView/boardIdeas.ts';
export {
  BOARD_HREF as boardHref,
  featureHrefOf,
} from './boardView/boardLinks.ts';
export { nextUp, stats } from './boardView/boardNumbers.ts';
export * as pickedEpic from './boardView/boardPick.ts';
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
