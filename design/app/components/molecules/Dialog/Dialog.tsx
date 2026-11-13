'use client';

/**
 * - `Dialog` · the frame only; each body draws its own title and actions
 */
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import MuiDialog from '@mui/material/Dialog';

export type DialogProps = {
  readonly open: boolean;
  readonly onClose: () => void;
  // 470 for a form, 704 for the image library's grid
  readonly width?: 470 | 704;
  // the id of the title that names it, read on open
  readonly labelledBy?: string;
  // where a caller portals its own content · the frame then draws no children
  readonly slotRef?: (element: HTMLDivElement | null) => void;
  readonly children?: ReactNode;
  readonly testId?: string;
};

export const Dialog = ({
  open,
  onClose,
  width = 470,
  labelledBy,
  slotRef,
  children,
  testId,
}: DialogProps): React.ReactElement => {
  return (
    <MuiDialog
      data-testid={testId}
      open={open}
      onClose={onClose}
      aria-labelledby={labelledBy}
      fullWidth
      maxWidth={false}
      slotProps={{ paper: { variant: 'dialog', sx: { maxWidth: width } } }}
    >
      {slotRef === undefined ? (
        children
      ) : (
        <Box ref={slotRef} sx={{ display: 'contents' }} />
      )}
    </MuiDialog>
  );
};
