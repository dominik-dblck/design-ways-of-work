/**
 * - `say` · a refusal's sentence as a caller receives it, every brace filled
 */
import { BY_KEY, bracesOf, line, wordsOf } from './refusalCatalog.ts';
import { GENERIC_WORDS } from './refusalRows.ts';
import type { RefusalFills } from './refusalsTypes.ts';
import * as MESSAGES from '../../words/messages.ts';

interface Draft {
  readonly key: string;
  readonly text: string;
  readonly fills?: RefusalFills | null | undefined;
}

// a line for one reader or one case; a file the field does not take reads its validator's sentence
function variantOf({ key, text, fills }: Draft): string {
  const variant = fills?.['variant'];
  if (!variant) return text;
  const name = String(variant);
  const words = wordsOf(key);
  const chosen = words.variants?.[name] || text;
  const says = words.fromValidator
    ? MESSAGES.validators[name]?.says
    : undefined;
  return typeof says === 'string' ? says : chosen;
}

function emptyOf({ key, text, fills }: Draft): string {
  const empty = BY_KEY[key]?._empty ?? {};
  let out = text;
  for (const [name, sentence] of Object.entries(empty)) {
    const given = fills?.[name];
    if (given === '' || (Array.isArray(given) && given.length === 0))
      out = sentence;
  }
  return out;
}

// a count of 1 reads the line's one variant, as every screen line does
function countOf(text: string, fills?: RefusalFills | null): string {
  const fill = MESSAGES.fill;
  if (!fills || Number(fills['count']) !== 1 || !fill) return text;
  return fill(text, { count: fills['count'] }) ?? text;
}

// a template with nothing to fill it is a bug, never a fallback: it would print braces at somebody
function fillBraces({ key, text, fills }: Draft): string {
  let out = text;
  for (const name of bracesOf(text)) {
    const given = fills?.[name] ?? GENERIC_WORDS[name];
    if (given === undefined || given === null)
      throw new Error(`refusals.ts · ${key} needs {${name}}`);
    out = out.split(`{${name}}`).join(String(given));
  }
  return out;
}

function say(key: string, fills?: RefusalFills | null): string {
  const chosen = variantOf({ key, text: line(key), fills });
  const filled = countOf(emptyOf({ key, text: chosen, fills }), fills);
  return fillBraces({ key, text: filled, fills });
}

export { say };
