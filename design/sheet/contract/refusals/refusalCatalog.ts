/**
 * - `REFUSALS`, `BY_KEY`, `wordsOf` · every refusal by key, its words messages.ts'
 * - `line`, `takes`, `bracesOf` · a refusal's sentence, the braces it still needs
 */
import { REFUSAL_ROWS } from './refusalRows.ts';
import type { RefusalEntry, RefusalRow } from './refusalsTypes.ts';
import * as MESSAGES from '../../words/messages.ts';

type RefusalWords = ReturnType<typeof MESSAGES.refusal>;

function wordsOf(key: string): RefusalWords {
  return MESSAGES.refusal(key);
}

function refusalOf([key, note]: RefusalRow): RefusalEntry {
  return {
    key,
    subject: key.split('.')[0] ?? key,
    from: 'messages.ts · REFUSAL',
    note: note ?? '',
    get fix() {
      return wordsOf(key).fix ?? null;
    },
    get _empty() {
      return wordsOf(key).empty ?? null;
    },
  };
}

// the order is the rows', so bySubject and every page list the subjects as written
const REFUSALS: readonly RefusalEntry[] = REFUSAL_ROWS.map(refusalOf);

const BY_KEY: Readonly<Record<string, RefusalEntry | undefined>> =
  Object.fromEntries(REFUSALS.map((refusal) => [refusal.key, refusal]));

const twice = REFUSALS.find(
  (refusal, at) =>
    REFUSALS.findIndex((other) => other.key === refusal.key) !== at,
);
if (twice) throw new Error(`refusals.ts · duplicate key ${twice.key}`);

// an unknown key throws instead of resolving to nothing
function line(key: string): string {
  if (!BY_KEY[key])
    throw new Error(`refusals.ts · unknown refusal key: ${key}`);
  return wordsOf(key).line;
}

// read off the sentence, so a template that gains a brace needs nobody to list it
function bracesOf(text: string): readonly string[] {
  return [
    ...new Set([...text.matchAll(/\{(\w+)\}/g)].map((found) => found[1] ?? '')),
  ];
}

function takes(key: string): readonly string[] {
  return bracesOf(line(key));
}

export { BY_KEY, REFUSALS, bracesOf, line, takes, wordsOf };
