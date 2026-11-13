/**
 * - `controlHeight`, `muiSizeOf`, `ControlStep`, `controlGlyph` · control sizes
 * - `radiusOf`, `unitsOf`, `spacingPx` · a radius or a px length in sx units
 * - `layers` · the four layers a surface sits on
 */
import type { LightToken } from './tokens.ts';
import { length } from './tokenReads.ts';

/** The one height scale, under the one size prop. */
export const controlHeight = {
  small: length('uiHSm'),
  medium: length('uiHMd'),
  large: length('uiHLg'),
} as const;

/** A control's three heights as its prop spells them, beside the theme's own name for each. */
export const muiSizeOf = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
} as const satisfies Readonly<Record<string, keyof typeof controlHeight>>;

export type ControlStep = keyof typeof muiSizeOf;

/** The glyph inside the square · half the box on the 2px grid. */
export const controlGlyph = {
  small: length('uiGlyphSm'),
  medium: length('uiGlyphMd'),
  large: length('uiGlyphLg'),
} as const;

type RadiusToken = Extract<LightToken, `uiR${string}`>;

/** One `sx` space unit in px. */
export const spacingPx = 8;

/** A length measured in px, in the units an `sx` space counts. */
export const unitsOf = (px: number): number => px / spacingPx;

/** `uiRPopover` reads 1.5 · an `sx` radius counts in `shape.borderRadius`, the control's own. */
export const radiusOf = (key: RadiusToken): number =>
  length(key) / length('uiRControl');

/** The four layers · sticky, menu, overlay, dialog. */
export const layers = {
  sticky: length('uiZSticky'),
  menu: length('uiZMenu'),
  overlay: length('uiZOverlay'),
  dialog: length('uiZDialog'),
} as const;
