/**
 * - `SIDE_NAV_MODES`, `MODE_GLYPH` · the three modes in the menu's order, each glyph
 * - `APPEARANCE_SX`, `APPEARANCE_HEAD_SX`, `OPTION_SX` · APPEARANCE and its options
 */
import type { GlyphName } from '../../../atoms/Glyph/index.ts';
import type { SideNavMode } from '../types/sideNavTypes.ts';

export const SIDE_NAV_MODES = [
  'light',
  'dark',
  'system',
] as const satisfies readonly SideNavMode[];

export const MODE_GLYPH: Readonly<Record<SideNavMode, GlyphName>> = {
  light: 'sun',
  dark: 'moon',
  system: 'sunMoon',
};

export const APPEARANCE_SX = { px: 1.25, pt: 0.5, pb: 1.5 } as const;

export const APPEARANCE_HEAD_SX = { display: 'block', pb: 0.5 } as const;

export const OPTION_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
} as const;
