'use client';

/**
 * - `themeWith`, `AppLayer` · the one theme, an app's layer added to it
 * - both schemes under `data-theme`, every value read off `tokens.ts`
 */
import {
  createTheme,
  type PaletteOptions,
  type Theme,
} from '@mui/material/styles';
import { preferenceAttribute } from './preference.ts';
import { CONTROL_OVERRIDES } from './theme/controlOverrides.ts';
import {
  chipPairsWith,
  type AppStatePairs,
  type ChipFamily,
} from './theme/chipFamilies.ts';
import { markOverridesWith, type ChipVariants } from './theme/markOverrides.ts';
import { paletteFor } from './theme/palette.ts';
import { spacingPx } from './scales.ts';
import { MIXINS, SHADOWS, Z_INDEX } from './theme/mixins.ts';
import { SELECTION_OVERRIDES } from './theme/selectionOverrides.ts';
import { SURFACE_OVERRIDES } from './theme/surfaceOverrides.ts';
import type { Mode } from './tokens.ts';
import { darkColour, length, lightColour } from './tokenReads.ts';
import { TYPOGRAPHY } from './theme/typeScale.ts';

/** What an app adds · its states' pairs, every chip it draws, and palette slots of its own. */
export interface AppLayer {
  readonly statePairs: AppStatePairs;
  readonly chips: ChipFamily;
  readonly chipVariants: ChipVariants;
  readonly palette: PaletteOptions;
}

const READS = { light: lightColour, dark: darkColour } as const;

const paletteOf = (layer: AppLayer, mode: Mode): PaletteOptions => ({
  ...paletteFor(mode, READS[mode]),
  ...chipPairsWith(layer.statePairs),
  ...layer.palette,
});

/** The theme with an app's layer · the shared parts never name the app's own words. */
export const themeWith = (layer: AppLayer): Theme =>
  createTheme({
    mixins: MIXINS,
    zIndex: Z_INDEX,
    // one theme under the attribute · two in a provider would re-render the tree on every switch
    cssVariables: { colorSchemeSelector: preferenceAttribute },
    colorSchemes: {
      light: {
        palette: paletteOf(layer, 'light'),
      },
      dark: { palette: paletteOf(layer, 'dark') },
    },
    palette: paletteOf(layer, 'light'),
    typography: TYPOGRAPHY,
    shape: { borderRadius: length('uiRControl') },
    spacing: spacingPx,
    shadows: SHADOWS,
    components: {
      ...CONTROL_OVERRIDES,
      ...SURFACE_OVERRIDES,
      ...SELECTION_OVERRIDES,
      ...markOverridesWith(layer.chips, layer.chipVariants),
    },
  });

declare module '@mui/material/styles' {
  interface CssThemeVariables {
    enabled: true;
  }
}
