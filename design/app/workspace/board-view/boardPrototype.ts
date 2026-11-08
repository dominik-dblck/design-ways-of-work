/**
 * - `prototypeOf` · how many of an epic's prototype components ship, and why
 */
import type { epics as EPICS } from '../../../roadmaps/backlog.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { Section } from './boardTypes.ts';

type Epic = (typeof EPICS)[number];
type Group = NonNullable<Epic['components']>[number];

// a module is ported code, not components; a group of components says how many ship
function shipsOf([, kind, files, ships]: Group): string {
  const { epic: words } = BOARD_WORDS;
  if (kind === 'module')
    return `${ships} ${words.of} ${files.length} ${words.ported}`;
  return ships === 0
    ? words.none
    : `${ships} ${words.of} ${files.length} ${words.ship}`;
}

function prototypeOf(epic: Epic): readonly Section[] {
  const { epic: words } = BOARD_WORDS;
  const groups = epic.components ?? [];
  if (groups.length === 0) return [];
  const counted = groups.filter(([, kind]) => kind !== 'module');
  const total = counted.reduce((sum, group) => sum + group[2].length, 0);
  const ships = counted.reduce((sum, group) => sum + group[3], 0);
  return [
    {
      label: `${words.components} · ${total} → ${ships} ${words.ship}`,
      lines: groups.map(
        (group) =>
          `${group[0]} · ${shipsOf(group)} · ${group[2].join(', ')} — ${group[4]}`,
      ),
    },
    { label: words.abstractions, lines: epic.abstractions ?? [] },
  ];
}

export { prototypeOf };
