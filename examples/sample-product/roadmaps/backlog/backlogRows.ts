/**
 * - `EPIC_ROWS` · every epic as written, top to bottom
 * - `GROUPS`, `PORTS` · the backlog's groups, and the ports' open questions
 */
import type { EpicGroup, EpicRow, Port } from './backlogTypes.ts';

const EPIC_ROWS: readonly EpicRow[] = [
  {
    num: '01',
    name: 'First epic',
    group: 'foundation',
    mvp: true,
    sub: 'the first thing the product does',
    stories: [['A first story', 'what it is accepted by']],
    done: 'the first story is accepted',
    deps: [],
    ports: [],
    code: '',
    screens: [],
  },
];

const GROUPS: readonly EpicGroup[] = [
  {
    id: 'foundation',
    label: 'FOUNDATION',
    note: 'what every later epic stands on',
  },
  { id: 'core', label: 'CORE', note: 'what the product is for' },
  { id: 'shell', label: 'SHELL', note: 'what holds the core together' },
  { id: 'closing', label: 'CLOSING', note: 'what closes the first release' },
  { id: 'deferred', label: 'DEFERRED', note: 'what waits for a later release' },
];

const PORTS: readonly Port[] = [];

export { EPIC_ROWS, GROUPS, PORTS };
