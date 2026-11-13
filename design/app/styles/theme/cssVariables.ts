/**
 * - `variablesOf`, `tokenEntriesOf` · a token block as its CSS variables
 * - `DARK_SELECTOR`, `LIGHT_SELECTOR` · where a chosen mode applies, a part's too
 * - `SYSTEM_DARK_SELECTOR`, `SYSTEM_DARK_SCOPE` · dark when nobody chose a mode
 */
import { TOKEN_NAMES, type LightToken } from '../tokens.ts';
import { asVariable } from '../tokenReads.ts';
import { preferenceAttribute } from '../preference.ts';

export type TokenBlock = Readonly<Partial<Record<LightToken, string | number>>>;

/** Every token key the block holds, with its value. */
export const tokenEntriesOf = (
  block: TokenBlock,
): readonly [LightToken, string | number][] =>
  Object.keys(block)
    .filter((key): key is LightToken => key in TOKEN_NAMES)
    .map((key) => [key, block[key] ?? '']);

// a design-side asset sits under the project's root, as public/ does under the app's
const servedOf = (written: string): string =>
  written.replaceAll('url("assets/', 'url("/assets/');

/** `{ '--bg-primary': '#000000' }` · the spelling every spec row writes. */
export const variablesOf = (block: TokenBlock): Record<string, string> =>
  Object.fromEntries(
    tokenEntriesOf(block).map(([key, written]) => [
      asVariable(key),
      servedOf(String(written)),
    ]),
  );

/** The dark block declares only the roles that flip, so the light block is the floor under it. */
export const DARK_SELECTOR = `[${preferenceAttribute}="dark"]`;

/** A part held light inside a dark page, as the phone's preview is · the whole light block, since no floor is under it. */
export const LIGHT_SELECTOR = `[${preferenceAttribute}="light"]`;

/** `system` is no attribute, so the browser's preference decides before any script runs. */
export const SYSTEM_DARK_SELECTOR = '@media (prefers-color-scheme: dark)';

/** A reader who chose light stays light under a dark OS, and outranks bare `:root`. */
export const SYSTEM_DARK_SCOPE = `:root:not([${preferenceAttribute}="light"])`;
