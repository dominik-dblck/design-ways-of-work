/**
 * - `fontSizeOf`, `inkOf`, `fillOf`, `STYLE` · what a style attribute gives
 * - `isInactive`, `judgePair` · the inactive ink, and a pair judged in both modes
 */
import type { Push, ScanContext } from './dsScanTypes.ts';
import { colourIn, ratio } from './tokenGraph.ts';

const STYLE = /style="([^"]*)"/g;

function fontSizeOf(style: string): RegExpMatchArray | null {
  return (
    style.match(/font-size:\s*(\d+)px/) || style.match(/font:[^;]*?(\d+)px/)
  );
}

function inkOf(style: string): RegExpMatchArray | null {
  return style.match(/(?:^|;)\s*color:\s*([^;]+)/);
}

function fillOf(style: string): RegExpMatchArray | null {
  return style.match(/(?:^|;)\s*background(?:-color)?:\s*([^;]+)/);
}

// an ink of --fg-disabled or --fg-empty is the inactive state by name, which the contrast floor exempts, and the reference page has to be able to draw it
function isInactive(style: string): boolean {
  return /color:\s*var\(--fg-(disabled|empty)\)/.test(style);
}

interface Pair {
  readonly ink: string;
  readonly fill: string;
  readonly size: number;
  readonly need: number;
  readonly at: number;
}

// one pair judged in light and in dark, each mode a finding of its own
function judgePair(
  pair: Pair,
  { ctx, push }: { readonly ctx: ScanContext; readonly push: Push },
): void {
  for (const mode of ['light', 'dark'] as const) {
    const theme = ctx.themes[mode];
    const contrast = ratio(
      colourIn(pair.ink, theme),
      colourIn(pair.fill, theme),
    );
    if (contrast === null || contrast >= pair.need) continue;
    push({
      value: `${mode} · ${pair.ink.trim()} on ${pair.fill.trim()} = ${contrast}`,
      want: `${pair.need}:1 at ${pair.size}px`,
      at: pair.at,
    });
  }
}

export { fillOf, fontSizeOf, inkOf, isInactive, judgePair, STYLE };
export type { Pair };
