/**
 * - `docs/rules/styling.md`: a spacing or radius in React code is in theme units, never a px string
 * - `A_PX_SPACE` finds a spacing key spelled in px; `A_PX_RETURNED` a px length a helper hands back
 */
import { describe, expect, it } from 'vitest';
import { reactSources } from './components.ts';

const SPACE_KEYS = [
  'p',
  'px',
  'py',
  'pt',
  'pb',
  'pl',
  'pr',
  'm',
  'mx',
  'my',
  'mt',
  'mb',
  'ml',
  'mr',
  'gap',
  'rowGap',
  'columnGap',
  'padding(?:Top|Bottom|Left|Right)?',
  'margin(?:Top|Bottom|Left|Right)?',
  'borderRadius',
].join('|');
const A_PX_SPACE = new RegExp(
  `\\b(?:${SPACE_KEYS})\\s*:[^,;{}\\n]*?['"\`][^'"\`\\n]*(?:\\d|\\})px`,
  'g',
);
const A_PX_RETURNED =
  /(?:\breturn\b|=>)[^;\n]*?['"`](?:0|[\d.]+px)(?: (?:0|[\d.]+px)){0,3}['"`]/g;

const pxSpacesIn = (text: string): number =>
  [...text.matchAll(A_PX_SPACE)].length +
  [...text.matchAll(A_PX_RETURNED)].length;

describe('a space is in theme units', () => {
  it('finds a padding, a ternary and a radius in px; units, a width and a top pass', () => {
    expect(
      pxSpacesIn(
        'const a = { borderRadius: (theme) => `${theme.shape.borderRadius}px` };',
      ),
    ).toBe(1);
    expect(
      pxSpacesIn(
        "const pad = (on: boolean): string => {\n  if (on) return '0 11px 0 9px';\n  return on ? '0 3px' : '0 11px 0 3px';\n};",
      ),
    ).toBe(2);
    expect(pxSpacesIn("const a = { p: '8px 18px' };")).toBe(1);
    expect(pxSpacesIn("const a = { pl: on ? '30px' : '38px' };")).toBe(1);
    expect(
      pxSpacesIn("const a = { borderRadius: '999px', padding: '0 11px' };"),
    ).toBe(2);
    expect(
      pxSpacesIn(
        "const a = { py: 1, px: 2.25, width: '40px', top: '4px', '& p': { mt: 0.5 } };",
      ),
    ).toBe(0);
  });

  it('no React code writes a space in px · `p: 1.75` is 14px', () => {
    expect(
      reactSources()
        .filter((source) => pxSpacesIn(source.text) > 0)
        .map((source) => `${source.path} · ${pxSpacesIn(source.text)}`),
    ).toEqual([]);
  });
});
