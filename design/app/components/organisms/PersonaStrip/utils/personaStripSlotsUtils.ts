/**
 * - `actionSlotsOf` · one roster row's label and fab, the reader's own ringed
 */
import type { SpeedDialActionProps } from '@mui/material/SpeedDialAction';
import {
  ACTION_FAB_SX,
  STATIC_LABEL_SX,
} from '../constants/personaStripConstants.ts';

/** The label is the tooltip slot's title, kept open, so the fab is named by what it shows. */
export const actionSlotsOf = (at: {
  readonly label: string;
  readonly me: boolean;
}): SpeedDialActionProps['slotProps'] => ({
  tooltip: { open: true, title: at.label },
  staticTooltipLabel: { sx: STATIC_LABEL_SX },
  fab: {
    sx: {
      ...ACTION_FAB_SX,
      fontWeight: at.me ? 'fontWeightBold' : 'fontWeightRegular',
      outline: at.me ? '2px solid' : 'none',
    },
  },
});
