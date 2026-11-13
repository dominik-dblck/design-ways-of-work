/**
 * - `ChipKey` · the keys `color` selects between, as the theme names them on Chip
 * - `StateChipFace` · what a part hands to draw a chip: its chip, word and glyph
 */
import type { ChipPropsColorOverrides } from '@mui/material/Chip';
import type { StateChipProps } from '../StateChip.tsx';

/** The keys `color` selects between · a wrapper names these and not MUI's own union. */
export type ChipKey = Extract<keyof ChipPropsColorOverrides, string>;

export type StateChipFace = Pick<
  StateChipProps,
  'state' | 'label' | 'icon' | 'trail'
>;
