/**
 * - `colour`, `length`, `text` · a light token read as the kind it has to be
 * - `lightColour`, `darkColour` · a palette slot's colour, an alias followed through
 * - `asVariable` · the CSS variable a token key is emitted as
 */
import { TOKEN_NAMES, tokens, type LightToken } from './tokens.ts';

const light = tokens.light;

const darkBlock: Record<LightToken, string | number> = {
  ...tokens.light,
  ...tokens.dark,
};

// a value that is one reference and nothing else
const ALIAS = /^var\(\s*(--[\w-]+)\s*\)$/;

const KEY_FOR: Record<string, string> = Object.fromEntries(
  Object.entries(TOKEN_NAMES).map(([key, name]) => [name, key]),
);

const keyFor = (name: string): string => KEY_FOR[name] ?? name;

/** `bgPrimary` → `--bg-primary` · a key with no CSS name throws, naming it. */
export const asVariable = (key: LightToken): string => {
  const name = TOKEN_NAMES[key];
  if (name === undefined)
    throw new Error(`${key} · tokens.ts holds no CSS name for it`);
  return name;
};

// MUI computes channels from a palette slot, so a `var()` there is followed to its value
const resolved = (
  block: Record<string, string | number>,
  key: string,
): string => {
  const seen: string[] = [];
  let written = String(block[key] ?? '');
  let alias = ALIAS.exec(written.trim());
  while (alias !== null) {
    const name = alias[1];
    if (name === undefined) throw new Error(`${key} · a var() names nothing`);
    if (seen.includes(name)) throw new Error(`${key} · a var() cycle`);
    seen.push(name);
    written = String(block[keyFor(name)] ?? '');
    alias = ALIAS.exec(written.trim());
  }
  return written;
};

/** The light value behind a key, for a palette slot. */
export const lightColour = (key: LightToken): string => {
  if (typeof light[key] !== 'string')
    throw new Error(`tokens.light.${key} · a colour was expected`);
  return resolved(light, key);
};

/** The dark value behind a key · a role `tokens.dark` leaves out is the light one. */
export const darkColour = (key: LightToken): string => {
  if (typeof darkBlock[key] !== 'string')
    throw new Error(`tokens.dark.${key} · a colour was expected`);
  return resolved(darkBlock, key);
};

/** `var(--bg-primary, #000000)` · the variable follows `data-theme`, the light value is its floor. */
export const colour = (key: LightToken): string =>
  `var(${asVariable(key)}, ${lightColour(key)})`;

/** `8` · a token that has to be a length. */
export const length = (key: LightToken): number => {
  const measure = light[key];
  if (typeof measure !== 'number')
    throw new Error(`tokens.light.${key} · a length was expected`);
  return measure;
};

/** `1px solid #e3e5e8` · a border, a shadow or a pad, written as the token holds it. */
export const text = (key: LightToken): string => {
  const written = light[key];
  if (typeof written !== 'string')
    throw new Error(`tokens.light.${key} · a string was expected`);
  return written;
};
