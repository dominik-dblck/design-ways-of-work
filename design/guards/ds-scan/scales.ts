/**
 * - `scalesFrom`, `cssVars`, `resolve` · the scales off the CSS, var() followed
 * - a scan carrying its own roster would only prove it agrees with itself
 */
import type { Scales } from './dsScanTypes.ts';

// the declared custom properties, the first declaration winning: the light block comes first
function cssVars(cssText: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const match of cssText.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    if (!(match[1] in out)) out[match[1]] = match[2].trim();
  }
  return out;
}

// the shape rule reads a token as its number
function resolve(
  value: string | null | undefined,
  vars: Readonly<Record<string, string>>,
): string {
  let text = String(value || '');
  for (let step = 0; /var\(--[\w-]+\)/.test(text) && step < 8; step += 1) {
    text = text.replace(/var\(--([\w-]+)\)/g, (whole, key: string) =>
      key in vars ? vars[key] : whole,
    );
  }
  return text;
}

function picker(cssText: string): (name: string) => string | null {
  return (name) => {
    const match = cssText.match(new RegExp(`--${name}:\\s*([^;]+);`));
    return match ? match[1].trim() : null;
  };
}

function pxOf(
  pick: (name: string) => string | null,
  names: string[],
): number[] {
  return names
    .map((name) => {
      const value = pick(name);
      const px = value?.match(/(\d+)px/);
      return px ? Number(px[1]) : 0;
    })
    .filter(Boolean);
}

// --ui-h-* and --ui-glyph-* are plain px; --ui-r-* point at the DS ramp, so both files are read
function radiiOf(cssText: string): Record<string, number> {
  const radii: Record<string, number> = {};
  for (const match of cssText.matchAll(
    /--r-(pill|2xl|xl|lg|md|sm|xs|xxs):\s*(\d+)px/g,
  )) {
    radii[match[1]] = Number(match[2]);
  }
  return radii;
}

function namesOf(cssText: string): Record<string, string> {
  const names: Record<string, string> = {};
  for (const match of cssText.matchAll(
    /--((?:n|g|b|r|y|o)-\d+|dbk-[a-z]+|a-[a-z]+):\s*(#[0-9a-fA-F]{3,8})/g,
  )) {
    names[match[2].toLowerCase()] = match[1];
  }
  return names;
}

function scalesFrom(cssText: string): Scales {
  const pick = picker(cssText);
  const radii = radiiOf(cssText);
  return {
    heights: pxOf(pick, ['ui-h-sm', 'ui-h-md', 'ui-h-lg']),
    glyphs: pxOf(pick, ['ui-glyph-sm', 'ui-glyph-md', 'ui-glyph-lg']),
    marks: pxOf(pick, ['ui-mark-dot', 'ui-mark-badge', 'ui-mark-inline']),
    radii,
    radiusValues: Object.values(radii),
    zIndex: ['ui-z-sticky', 'ui-z-menu', 'ui-z-overlay', 'ui-z-dialog']
      .map((name) => pick(name))
      .filter((value): value is string => Boolean(value))
      .map(Number),
    named: namesOf(cssText),
    paperPadMenu: pick('ui-paper-pad-menu'),
    paperPadPopover: pick('ui-paper-pad-popover'),
  };
}

export { cssVars, resolve, scalesFrom };
