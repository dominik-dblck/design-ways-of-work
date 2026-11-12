/**
 * - `Role` · a role: its label, its gate, the catalog's word for it
 * - `Person`, `PersonRow`, `Gate`, `GateKey` · a person as written and read; a gate
 * - `Tuple` · a person in the shape gateRules.ts speaks: name, avatar, id
 */
import type { LanguageCode } from '../languages.ts';
import type { ApprovalGate, PersonId } from './people.ts';

interface Role {
  readonly label: string;
  readonly gate: string | null;
  readonly author?: boolean;
  readonly person?: boolean;
  readonly actor: string | null;
  readonly key?: string;
}

type PersonRow = readonly [
  id: string,
  name: string,
  avatar: string | null,
  own: readonly string[],
  subjects: readonly string[],
];

interface Person {
  readonly id: PersonId;
  readonly name: string;
  readonly avatar: string | null;
  readonly own: readonly string[];
  readonly subjects: readonly string[];
}

// a gate's key: an approval role's, or a language's
type GateKey = ApprovalGate | LanguageCode;

interface Gate {
  readonly key: GateKey;
  readonly name: string;
  readonly kind: 'approval' | 'locale';
}

type Tuple = readonly [name: string, avatar: string | null, id: string];

export type { Gate, GateKey, Person, PersonRow, Role, Tuple };
