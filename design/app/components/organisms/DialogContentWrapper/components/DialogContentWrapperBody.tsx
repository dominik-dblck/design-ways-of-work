'use client';

/**
 * - `DialogContentWrapperBody` · the head, the scrolling content and what is pinned
 */
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import { useScrollFade } from '../../../../hooks/useScrollFade.ts';
import { DIALOG_PINNED_SX } from '../constants/dialogContentWrapperConstants.ts';
import type { DialogContentWrapperProps } from '../types/dialogContentWrapperTypes.ts';
import {
  dialogBodySxOf,
  dialogContentSxOf,
} from '../utils/dialogContentWrapperSxUtils.ts';
import { DialogContentWrapperHead } from './DialogContentWrapperHead.tsx';

/** No body, no content band · the head keeps its foot room. */
export function DialogContentWrapperBody({
  dialog,
  closeLabel,
  closeTestId,
}: {
  readonly dialog: DialogContentWrapperProps;
  readonly closeLabel: string;
  readonly closeTestId: string;
}): React.ReactElement {
  const { children, pinned } = dialog;
  const isBare = children === undefined || children === null;
  const fade = useScrollFade();
  return (
    <Box sx={dialogBodySxOf(isBare)}>
      <DialogContentWrapperHead
        title={dialog.title}
        icon={dialog.icon}
        subtitle={dialog.subtitle}
        onClose={dialog.onClose}
        closeLabel={closeLabel}
        closeTestId={closeTestId}
      />
      {isBare ? null : (
        <DialogContent ref={fade.ref} sx={dialogContentSxOf(fade.maskImage)}>
          {children}
        </DialogContent>
      )}
      {pinned === undefined ? null : <Box sx={DIALOG_PINNED_SX}>{pinned}</Box>}
    </Box>
  );
}
