'use client';

/**
 * - `Drawer` · a sheet from the right, the whole width on a narrow viewport
 */
import type { ReactNode } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { HintIconButton } from '../HintIconButton/index.ts';
import { Glyph } from '../../atoms/Glyph/index.ts';
import { DRAWER_WIDTH } from './constants/drawerConstants.ts';
import { CONTROL_LABELS } from '../../../constants/controlLabelsConstants.ts';

export type DrawerProps = {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children?: ReactNode;
};

export const Drawer = ({
  open,
  onClose,
  children,
}: DrawerProps): React.ReactElement => {
  return (
    <MuiDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { variant: 'dialog' } }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          width: { xs: '100%', sm: DRAWER_WIDTH },
        }}
      >
        <HintIconButton
          label={CONTROL_LABELS.close}
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          <Glyph name="x" size="small" />
        </HintIconButton>
      </Box>
      <Box sx={{ px: 3, pb: 3, flex: 1, overflow: 'auto' }}>{children}</Box>
    </MuiDrawer>
  );
};
