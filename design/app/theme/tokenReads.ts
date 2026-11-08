/**
 * - `colourOf`, `lengthOf`, `tokenTextOf` · one token read off `tokens.ts`, by mode
 * - `radiusOf` · a radius role in an sx's units, the control's own corner
 * - a dark read falls back to the light block: the dark block flips only some roles
 */
import { tokens } from '../styles/tokens.ts';
import type { LightToken, Mode } from '../styles/tokens.ts';

function valueOf(key: LightToken, mode: Mode): string | number {
  const dark: unknown =
    mode === 'dark' ? Reflect.get(tokens.dark, key) : undefined;
  return typeof dark === 'string' || typeof dark === 'number'
    ? dark
    : tokens.light[key];
}

const tokenTextOf = (key: LightToken, mode: Mode = 'light'): string =>
  String(valueOf(key, mode));

const colourOf = tokenTextOf;

function lengthOf(key: LightToken): number {
  const size = valueOf(key, 'light');
  if (typeof size !== 'number') throw new Error(`${key} is no length`);
  return size;
}

type RadiusToken = Extract<LightToken, `uiR${string}`>;

// an sx radius counts in `shape.borderRadius`, the control's own: `uiRPopover` reads 1.5
const radiusOf = (key: RadiusToken): number =>
  lengthOf(key) / lengthOf('uiRControl');

export { colourOf, lengthOf, radiusOf, tokenTextOf };
