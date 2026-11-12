/**
 * - `people`, `roles`, `byId`, `person`, `personBySubject` · who exists: one roster
 * - `gates`, `gateName` · the gates a person may hold, in a fixed order
 * - `tuple`, `byInitials` · a person in the shape gateRules.ts speaks
 */
import type {
  Gate,
  GateKey,
  Person,
  Role,
  Tuple,
} from './directory/directoryTypes.ts';
import type { PersonId } from './directory/people.ts';
import { PEOPLE, ROSTER_ROLES, RULES_INITIALS } from './directory/people.ts';
import { name, offered } from './languages.ts';
import type { LanguageCode } from './languages.ts';

const BY_ID: Readonly<Record<string, Person | undefined>> = Object.fromEntries(
  PEOPLE.map((person) => [person.id, person]),
);

// a subject on two rows is a roster error, not a lookup that picks one: checked once, at load
const seen = new Map<string, string>();
for (const one of PEOPLE) {
  for (const subject of one.subjects) {
    const first = seen.get(subject);
    if (first)
      throw new Error(
        `directory.ts · subject ${subject} is on two rows: ${first} and ${one.id}`,
      );
    seen.set(subject, one.id);
  }
}

function localeGate(code: LanguageCode): Gate {
  return {
    key: code,
    get name() {
      return name(code);
    },
    kind: 'locale',
  };
}

// fixed order: position is identity wherever a gate line is read or drawn
const GATES: readonly Gate[] = [
  ...Object.values(ROSTER_ROLES).flatMap((role): Gate[] =>
    role.gate && role.gate !== 'locale'
      ? [{ key: role.gate, name: role.label, kind: 'approval' }]
      : [],
  ),
  ...offered().map(localeGate),
];

function gateName(key: string): string {
  return GATES.find((gate) => gate.key === key)?.name ?? key;
}

function person(id: string): Person | null {
  return BY_ID[id] ?? null;
}

function personBySubject(subject: string): Person | null {
  return PEOPLE.find((one) => one.subjects.includes(subject)) ?? null;
}

function tuple(id: string): Tuple {
  const found = BY_ID[id];
  return found ? [found.name, found.avatar, found.id] : ['', '', id];
}

// a person the rules module spells otherwise is keyed as it spells them
function byInitials(): Readonly<Record<string, Tuple>> {
  return Object.fromEntries(
    PEOPLE.map((one) => [RULES_INITIALS[one.id] ?? one.id, tuple(one.id)]),
  );
}

export {
  PEOPLE as people,
  ROSTER_ROLES as roles,
  GATES as gates,
  BY_ID as byId,
  person,
  personBySubject,
  gateName,
  tuple,
  byInitials,
};
export type { GateKey, PersonId, Role };
