/**
 * - `epics`, `byId`, `groups`, `counts` · what gets built, in its order
 * - `ports` · the ports' questions, what only the other side can answer
 * - tests first, then agents drive the API as users: a refusal must read on its own
 */
import type { BacklogCounts, Epic, EpicRow } from './backlog/backlogTypes.ts';
import { EPIC_ROWS, GROUPS, PORTS } from './backlog/backlogRows.ts';

// a story takes its id from its epic and its place, `-S2` · dependencies live on epics
function epicOf(row: EpicRow): Epic {
  const id =
    row.num === '—'
      ? `E${(row.name.split(' ')[0] ?? '').toUpperCase()}`
      : `E${row.num}`;
  const stories = row.stories.map(([title, criterion], index) => ({
    id: `${id}-S${index + 1}`,
    title,
    criterion,
  }));
  return { ...row, stories, id };
}

const epics: readonly Epic[] = EPIC_ROWS.map(epicOf);

const byId: Readonly<Record<string, Epic>> = Object.fromEntries(
  epics.map((epic) => [epic.id, epic]),
);

function storiesOf(counted: readonly Epic[]): number {
  return counted.reduce((total, epic) => total + epic.stories.length, 0);
}

function counts(): BacklogCounts {
  const live = epics.filter((epic) => epic.group !== 'deferred');
  const mvp = epics.filter((epic) => epic.mvp);
  return {
    epics: live.length,
    mvpEpics: mvp.length,
    stories: storiesOf(live),
    mvpStories: storiesOf(mvp),
    ports: [...new Set(epics.flatMap((epic) => epic.ports))],
  };
}

export { byId, counts, epics, GROUPS as groups, PORTS as ports };
