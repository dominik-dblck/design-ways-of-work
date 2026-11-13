/**
 * - `lengthOf`, `tokenTextOf` · one token read off `tokens.ts`, by mode
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

function lengthOf(key: LightToken): number {
  const size = valueOf(key, 'light');
  if (typeof size !== 'number') throw new Error(`${key} is no length`);
  return size;
}

export { lengthOf, tokenTextOf };
