/**
 * - `themes`, `colourIn`, `ratio` · the token graph in both modes, a pair's contrast
 * - a role differs by mode, so both blocks are read and both are checked
 */
import type { Theme, Themes } from './dsScanTypes.ts';

function blocksOf(cssText: string): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};
  for (const block of cssText.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const selector = block[1].trim();
    const isDark = /data-theme="dark"|\.dbk-dark/.test(selector);
    const isRoot = /:root|html, body/.test(selector);
    if (!isRoot && !isDark) continue;
    const bag = isDark ? dark : light;
    for (const decl of block[2].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
      bag[decl[1]] = decl[2].trim();
    }
  }
  return { light, dark };
}

// a value that is one var() is followed to what it names, eight steps at most
function flat(map: Readonly<Record<string, string>>): Theme {
  const done: Record<string, string | undefined> = {};
  for (const [key, start] of Object.entries(map)) {
    let value: string | undefined = start;
    for (
      let guard = 0;
      value && /^var\(--[a-z0-9-]+\)$/.test(value) && guard < 8;
      guard += 1
    ) {
      value = map[value.slice(6, -1)];
    }
    done[key] = value;
  }
  return done;
}

function themes(cssText: string): Themes {
  const { light, dark } = blocksOf(cssText);
  return { light: flat(light), dark: flat({ ...light, ...dark }) };
}

function lumOf(hex: string | null | undefined): number | null {
  if (!hex || !hex.startsWith('#')) return null;
  let digits = hex.slice(1);
  if (digits.length === 3) {
    digits = [...digits].map((digit) => digit + digit).join('');
  }
  if (digits.length !== 6) return null;
  const [red, green, blue] = [0, 2, 4].map((at) => {
    const channel = parseInt(digits.slice(at, at + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function ratio(
  ink: string | null | undefined,
  fill: string | null | undefined,
): number | null {
  const first = lumOf(ink);
  const second = lumOf(fill);
  if (first === null || second === null) return null;
  const raw =
    (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
  return Math.round(raw * 100) / 100;
}

// a role resolves through the mode's theme, a literal hex stands for itself, anything else is unknown
function colourIn(value: string, theme: Theme): string | null | undefined {
  const token = value.match(/var\(--([a-z0-9-]+)\)/);
  if (token) return theme[token[1]];
  return /^#[0-9a-fA-F]{3,6}$/.test(value.trim()) ? value.trim() : null;
}

export { colourIn, ratio, themes };
