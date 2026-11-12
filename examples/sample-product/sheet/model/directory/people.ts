/**
 * - `PEOPLE`, `ROSTER_ROLES`, `RULES_INITIALS` · every person, each role, aliases
 * - `PersonId`, `ApprovalGate` · the cast's ids, an approval gate's key
 */
import type { Person, Role } from './directoryTypes.ts';

const RULES_INITIALS: Readonly<Record<string, string | undefined>> = {};

const ROSTER_ROLES = {
  editor: { label: 'Editor', gate: null, author: true, actor: 'editor' },
} as const satisfies Readonly<Record<string, Role>>;

type ApprovalGate = never;

const ROWS = [['ED', 'An Editor', null, [], []]] as const;

type PersonId = (typeof ROWS)[number][0];

const PEOPLE: readonly Person[] = ROWS.map(
  ([id, name, avatar, own, subjects]) => ({ id, name, avatar, own, subjects }),
);

export { PEOPLE, ROSTER_ROLES, RULES_INITIALS };
export type { ApprovalGate, PersonId };
