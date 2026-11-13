'use client';

/**
 * - `SideNavModePicker` · the appearance: light, dark, or the system's
 */
import Box from '@mui/material/Box';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { Label } from '../../../atoms/Label/index.ts';
import { Segmented } from '../../../molecules/Segmented/index.ts';
import {
  APPEARANCE_HEAD_SX,
  APPEARANCE_SX,
  MODE_GLYPH,
  OPTION_SX,
  SIDE_NAV_MODES,
} from '../constants/sideNavAppearanceConstants.ts';
import type { SideNavAppearance, SideNavWords } from '../types/sideNavTypes.ts';

/** The pick is the caller's to store and apply. */
export function SideNavModePicker({
  appearance,
  headId,
  words,
}: {
  readonly appearance: SideNavAppearance;
  readonly headId: string;
  readonly words: SideNavWords;
}): React.ReactElement {
  return (
    <Box sx={APPEARANCE_SX}>
      <Label id={headId} sx={APPEARANCE_HEAD_SX}>
        {words.appearance}
      </Label>
      <Segmented
        labelledBy={headId}
        size="sm"
        value={appearance.value}
        onPick={appearance.onPick}
        options={SIDE_NAV_MODES.map((mode) => ({
          value: mode,
          label: (
            <Box component="span" sx={OPTION_SX}>
              <Glyph name={MODE_GLYPH[mode]} size="inline" />
              {words.modes[mode]}
            </Box>
          ),
        }))}
      />
    </Box>
  );
}
