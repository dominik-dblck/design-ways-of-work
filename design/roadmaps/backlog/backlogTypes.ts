/**
 * - `EpicRow`, `Epic`, `Story` · an epic as written, as read, and a capability in it
 * - `EpicGroup`, `BacklogCounts` · a group of epics, and the counts
 * - `Port` · a port, what only the other side can answer
 */
import type { EpicId, EpicNum } from '../ids.ts';

type GroupId = 'foundation' | 'core' | 'shell' | 'closing' | 'deferred';

// [title, criterion] · a story takes its id from its epic and its place
type StoryRow = readonly [title: string, criterion: string];

interface EpicRow {
  readonly num: string;
  readonly name: string;
  readonly group: GroupId;
  readonly mvp: boolean;
  // the epics this one was merged into
  readonly merged?: readonly EpicNum[];
  // what the epic is, in one line
  readonly sub: string;
  readonly stories: readonly StoryRow[];
  // the acceptance test for the whole epic
  readonly done: string;
  // the epics it cannot start without
  readonly deps: readonly EpicNum[];
  // external dependencies, each behind an interface with a mock
  readonly ports: readonly string[];
  // what is ported from the prototype instead of being written again
  readonly code: string;
  // the screens in the register this epic starts serving
  readonly screens: readonly string[];
  // its stories wait for epics of their own: no ticket is asked of them
  readonly storiesWait?: true;
}

interface Story {
  readonly id: string;
  readonly title: string;
  readonly criterion: string;
}

type Epic = Omit<EpicRow, 'stories'> & {
  readonly stories: readonly Story[];
  readonly id: string;
};

interface EpicGroup {
  readonly id: GroupId;
  readonly label: string;
  readonly note: string;
}

interface Port {
  readonly name: string;
  readonly epic: EpicId;
  readonly questions: readonly string[];
}

interface BacklogCounts {
  readonly epics: number;
  readonly mvpEpics: number;
  readonly stories: number;
  readonly mvpStories: number;
  readonly ports: readonly string[];
}

export type { BacklogCounts, Epic, EpicGroup, EpicRow, Port };
