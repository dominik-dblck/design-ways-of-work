/**
 * - `CommandRow`, `CommandCase` · a command as its epic writes it, its edge cases
 * - `Command` · a row read by everyone: its lists filled, its flags and agent set
 * - `Derived`, `CommandCounts` · a turn nobody asks for, and the catalog counted
 */
import type { EpicId, StoryId } from '../../../roadmaps/ids.ts';

type Where = 'api' | 'guarded' | 'shown';

type CommandCase =
  | readonly [when: string, answer: string]
  | readonly [when: string, answer: string, where: Where]
  | readonly [when: string, answer: string, where: Where, epic: EpicId];

interface CommandRow {
  readonly id: string;
  readonly no: number;
  readonly name: string;
  readonly epic: EpicId;
  readonly story: StoryId;
  readonly actor: readonly string[];
  readonly assigns?: readonly string[];
  readonly agentOnly?: boolean;
  readonly route: string;
  readonly body: string;
  readonly writes?: string;
  readonly refuses: readonly string[];
  readonly refusesSince?: Readonly<Record<string, string>>;
  readonly omits?: readonly string[];
  readonly emits: readonly string[];
  readonly languageEmits?: Readonly<Record<string, string>>;
  readonly languageActor?: readonly string[];
  readonly mention: string | null;
  readonly confirm?: boolean;
  readonly idempotent?: boolean;
  readonly answer?: string;
  readonly checks?: Readonly<Record<string, string>>;
  readonly cases?: readonly CommandCase[];
  readonly note?: string;
  readonly gap?: boolean;
}

interface Command extends CommandRow {
  readonly confirm: boolean;
  readonly idempotent: boolean;
  readonly agent?: string;
}

interface Derived {
  readonly key: string;
  readonly name: string;
  readonly when: string;
  readonly note: string;
}

interface CommandCounts {
  readonly total: number;
  readonly gaps: number;
  readonly confirms: number;
  readonly mentions: number;
  readonly derived: number;
  readonly rules: number;
}

export type { Command, CommandCounts, CommandRow, Derived };
