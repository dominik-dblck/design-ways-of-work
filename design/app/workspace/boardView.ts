/**
 * - `words`, `stats`, `project`, `repository`, `nextUp`, `velocity` · the numbers
 * - `listed`, `columns`, `progress`, `epicOf`, `ticketDetailOf` · epics, list, one
 * - `ideas`, `ports`, `kinds`, `featureHrefOf`, `boardHref`, `pickedEpic` · links
 */
export { kinds, ports } from './boardView/boardAside.ts';
export { columns, epicOf, listed } from './boardView/boardEpics.ts';
export { progress } from './boardView/boardProgress.ts';
export { project } from './boardView/boardProject.ts';
export { repository } from './boardView/boardRepository.ts';
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
  ProjectStat,
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
