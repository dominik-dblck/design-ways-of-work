/**
 * - `SAY_TOKEN`, `wordOf` · {say:key|name=value}, and the word it shows
 * - `paramsOf`, `unsaid` · a token's fills, the keys messages.ts lacks per journey
 */
import type { JourneyRow } from './journeyTypes.ts';
import * as MESSAGES from '../../words/messages.ts';

// {say:key|name=value} is a word of the screen, a label or a screen line
const SAY_TOKEN = /\{say:([A-Za-z]+(?:\.[A-Za-z]+)*)((?:\|[^|}]+)*)\}/g;

function sayKeys(text: unknown): readonly string[] {
  return [...String(text).matchAll(SAY_TOKEN)].map((found) => String(found[1]));
}

const paramsOf = (rest: string): Readonly<Record<string, string>> =>
  Object.fromEntries(
    rest
      .split('|')
      .slice(1)
      .map((pair) => [
        pair.slice(0, pair.indexOf('=')),
        pair.slice(pair.indexOf('=') + 1),
      ]),
  );

function wordOf(key: string, rest: string): string {
  const found = MESSAGES.sayWord(key);
  if (found === undefined) return `[${key}]`;
  return MESSAGES.fill(found, paramsOf(rest)) ?? `[${key}]`;
}

// a word key a step or the journey's check names that messages.ts does not hold
function unsaid(
  journeys: readonly JourneyRow[],
): readonly { readonly journey: string; readonly key: string }[] {
  const textOf = (journey: JourneyRow): string =>
    [...journey.steps.flatMap((step) => step.slice(0, 3)), journey.test].join(
      ' ',
    );
  return journeys.flatMap((journey) =>
    sayKeys(textOf(journey))
      .filter((key) => MESSAGES.sayWord(key) === undefined)
      .map((key) => ({ journey: journey.id, key: `say:${key}` })),
  );
}

export { SAY_TOKEN, paramsOf, unsaid, wordOf };
