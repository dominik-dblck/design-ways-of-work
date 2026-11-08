/**
 * - `colourOf`, `lengthOf`, `textOf` · one token read off `tokens.ts`, by mode
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

const textOf = (key: LightToken, mode: Mode = 'light'): string =>
  String(valueOf(key, mode));

const colourOf = textOf;

function lengthOf(key: LightToken): number {
  const value = valueOf(key, 'light');
  if (typeof value !== 'number') throw new Error(`${key} is no length`);
  return value;
}

export { colourOf, lengthOf, textOf };
