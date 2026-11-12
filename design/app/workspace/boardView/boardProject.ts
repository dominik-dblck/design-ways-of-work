/**
 * - `project` · what the spec holds, counted, and the page each count opens on
 */
import { all as DECISIONS } from '../../../docs/process/decisions.ts';
import { epics as EPICS } from '../../../roadmaps/backlog.ts';
import { open as FINDINGS } from '../../../roadmaps/findings.ts';
import { all as TICKETS } from '../../../roadmaps/tickets.ts';
import { journeysOfEpic } from '../../../sheet/cases/journeys.ts';
import { casesOfEpic, flat } from '../../../sheet/cases/testCases.ts';
import { all as EVENTS } from '../../../sheet/contract/events.ts';
import { refusalRows } from '../../../sheet/contract/refusals.ts';
import { contractPage } from '../contractView.ts';
import { CONTRACT_HREF, FEATURE_HREF } from './boardLinks.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { ProjectStat } from './boardTypes.ts';

type Counted = Exclude<
  keyof typeof BOARD_WORDS.project,
  'label' | 'note' | 'endpoints' | 'typed'
>;

// the contract page's own count of its endpoints, and of the typed ones
function endpointCounts(): { readonly all: number; readonly typed: number } {
  const { stats } = contractPage();
  const count = (id: string): number =>
    Number(stats.find((one) => one.id === id)?.value ?? 0);
  return { all: count('endpoints'), typed: count('typed') };
}

// each test case and journey counted once, on the epic whose row holds it
const perEpic = (count: (epic: string) => number): number =>
  EPICS.reduce((sum, epic) => sum + count(epic.id), 0);

// what each chip counts, in the order the board reads them
const COUNTS: readonly (readonly [Counted, () => number])[] = [
  ['cases', () => perEpic((epic) => flat(casesOfEpic(epic, [])).length)],
  ['journeys', () => perEpic((epic) => journeysOfEpic(epic).length)],
  [
    'criteria',
    () => TICKETS().reduce((sum, ticket) => sum + ticket.acceptance.length, 0),
  ],
  ['refusals', () => refusalRows().length],
  ['events', () => EVENTS.length],
  ['decisions', () => DECISIONS.length],
  ['findings', () => FINDINGS.length],
];

const OPENS: Readonly<Partial<Record<Counted, string>>> = {
  cases: FEATURE_HREF,
  journeys: FEATURE_HREF,
};

function project(): readonly ProjectStat[] {
  const words = BOARD_WORDS.project;
  const endpoints = endpointCounts();
  const counted = COUNTS.map(([id, count]) => ({
    id,
    value: String(count()),
    label: words[id],
    href: OPENS[id] ?? null,
  }));
  return [
    {
      id: 'endpoints',
      value: `${endpoints.all} · ${endpoints.typed} ${words.typed}`,
      label: words.endpoints,
      href: CONTRACT_HREF,
    },
    ...counted,
  ];
}

export { project };
