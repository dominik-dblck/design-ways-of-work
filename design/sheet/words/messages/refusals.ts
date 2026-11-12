/**
 * - `REFUSAL`, `refusal` · every refusal's lines, and one by its key
 * - `fill` · a line with its data in place, its one variant when the count is 1
 */
import { REFUSAL } from './messageRows.ts';
import type { Fills, Refusal } from './messagesTypes.ts';

function refusal(key: string): Refusal {
  const row = REFUSAL[key];
  if (!row) throw new Error(`messages.ts · no line for refusal ${key}`);
  return row;
}

// a line whose count is 1 reads its one variant, built off the refusals, never typed twice
const SINGULAR: Readonly<Record<string, string>> = Object.fromEntries(
  Object.values(REFUSAL).flatMap((row) =>
    row.variants?.['one'] ? [[row.line, row.variants['one']]] : [],
  ),
);

function fill(
  line: string | null | undefined,
  fills?: Fills | null,
): string | null {
  const one =
    line != null && fills && Number(fills['count']) === 1
      ? SINGULAR[String(line)]
      : undefined;
  const text = one || line;
  return text == null
    ? null
    : String(text).replace(/\{(\w+)\}/g, (found, key: string) =>
        fills?.[key] != null ? String(fills[key]) : found,
      );
}

export { fill, REFUSAL, refusal };
