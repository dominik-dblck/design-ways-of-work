/**
 * - `module` · how a module stands: its rule works, waits, or needs a variant
 * - `file`, `home` · how a file of the epic's map, and a record of a chain, stand
 * - the design side's own standing words and their wash, never a screen's
 */
interface Standing {
  readonly label: string;
  readonly bg: string;
}

type Standings = Readonly<Record<string, Standing>>;

// how one record of a type's chain stands against the epic's moves (contentTypeLogic.ts · HOMES)
const HOME = {
  done: { label: 'IN ITS HOME', bg: 'var(--st-ready-bg)' },
  moves: { label: 'MOVES IN E18', bg: 'var(--st-review-bg)' },
} as const satisfies Standings;

// how a module stands: its rule works, its rule waits on commands, nothing yet, or a type has to define its variant
const MODULE = {
  mechanics: { label: 'MECHANICS', bg: 'var(--st-ready-bg)' },
  rule: { label: 'RULE ONLY', bg: 'var(--st-review-bg)' },
  placeholder: { label: 'PLACEHOLDER', bg: 'var(--bg-subtle)' },
  define: { label: 'TO DEFINE', bg: 'var(--wash-removed)' },
} as const satisfies Standings;

// how a file of the epic's map stands against today
const FILE = {
  added: { label: 'NEW', bg: 'var(--st-ready-bg)' },
  changes: { label: 'CHANGES', bg: 'var(--st-review-bg)' },
  same: { label: 'AS IS', bg: 'var(--bg-subtle)' },
  later: { label: 'E10', bg: 'var(--wash-removed)' },
} as const satisfies Standings;

export { FILE as file, HOME as home, MODULE as module };
export type { Standing };
