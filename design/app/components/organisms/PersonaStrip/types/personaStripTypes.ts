/**
 * - `PersonaStripPerson` · one person the reader may be: id, name, face, initials
 * - `PersonaStripProps` · the roster, who reads, the switch, words and ids
 * - `PersonaStripWords`, `PersonaStripTestIds` · the dial's name, the ids it writes
 */
/** `initials` is what a fab shows with no face, and what a face is described by. */
export type PersonaStripPerson<Id extends string = string> = {
  readonly id: Id;
  readonly name: string;
  readonly face: string | null;
  readonly initials: string;
};

export type PersonaStripWords = {
  readonly dial: string;
};

/** A person's id is built from theirs, so a test reaches one row by who it is. */
export type PersonaStripTestIds = {
  readonly dial: string;
  readonly person: (id: string) => string;
};

/** `pending` greys the dial while a switch is in flight · a pick hands back the id as typed. */
export type PersonaStripProps<Id extends string = string> = {
  readonly people: readonly PersonaStripPerson<Id>[];
  readonly current: PersonaStripPerson<Id>;
  readonly onSwitch: (id: Id) => void;
  readonly pending?: boolean | undefined;
  readonly words?: PersonaStripWords | undefined;
  readonly testIds?: PersonaStripTestIds | undefined;
};
