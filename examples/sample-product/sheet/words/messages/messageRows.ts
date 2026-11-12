/**
 * - `ROWS`, `READERS`, `FILLS`, `SAY`, `SCREEN` · the rows, who reads, the fills
 * - `REFUSAL`, `OUTCOME`, `PILL`, `VALIDATOR`, `VALIDATOR_WORD_KEYS` · the lines
 * - `USAGE_TABLES`, `WALKED_TABLES`, `WORD_FORMS`, `excusesWord`, `LOG` · tables
 */
import type { Cell, Refusal, Validator } from './messagesTypes.ts';

type MessageRow = readonly [
  situation: string,
  group: string,
  state: Cell,
  ...readers: readonly Cell[],
];

interface LogWord {
  readonly name: string;
  readonly mention?: string;
  readonly by?: Readonly<Record<string, string | undefined>>;
}

const ROWS: readonly MessageRow[] = [];
const READERS: readonly string[] = [];
const FILLS: readonly string[] = [];
const SAY: Readonly<Record<string, string>> = {};
const SCREEN: Readonly<Record<string, string>> = {};
const REFUSAL: Readonly<Record<string, Refusal>> = {};
const OUTCOME: Readonly<Record<string, string>> = {};
const PILL: Readonly<Record<string, string>> = {};
const VALIDATOR: Readonly<Record<string, Validator>> = {};
const VALIDATOR_WORD_KEYS: readonly ('says' | 'saysLanguage')[] = [];
const LOG: Readonly<Record<string, LogWord | undefined>> = {};
const USAGE_TABLES: Readonly<Record<string, object>> = {};
const WALKED_TABLES: Readonly<Record<string, object>> = {};
const WORD_FORMS: ReadonlyMap<string, string> = new Map();
const excusesWord = (_word: string, _line: string): boolean => false;

export {
  FILLS,
  LOG,
  OUTCOME,
  PILL,
  READERS,
  REFUSAL,
  ROWS,
  SAY,
  SCREEN,
  USAGE_TABLES,
  VALIDATOR,
  VALIDATOR_WORD_KEYS,
  WALKED_TABLES,
  WORD_FORMS,
  excusesWord,
};
