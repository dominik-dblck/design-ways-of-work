'use client';

/**
 * - `DialogContentWrapperActions` · the foot: summary, Cancel (or its word), primary
 */
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '../../../atoms/Button/index.ts';
import {
  DIALOG_ACTIONS_SX,
  DIALOG_SUMMARY_SX,
} from '../constants/dialogContentWrapperConstants.ts';
import type {
  DialogContentWrapperProps,
  DialogContentWrapperTestIds,
  DialogContentWrapperWords,
} from '../types/dialogContentWrapperTypes.ts';
import { DialogContentWrapperPrimary } from './DialogContentWrapperPrimary.tsx';

/** While the primary is out, Cancel waits with it; the x and the backdrop still leave. */
export function DialogContentWrapperActions({
  dialog,
  words,
  testIds,
}: {
  readonly dialog: DialogContentWrapperProps;
  readonly words: DialogContentWrapperWords;
  readonly testIds: DialogContentWrapperTestIds;
}): React.ReactElement {
  return (
    <DialogActions disableSpacing sx={DIALOG_ACTIONS_SX}>
      <Box sx={DIALOG_SUMMARY_SX}>{dialog.summary}</Box>
      <Button
        variant="outlined"
        disabled={dialog.pending ?? false}
        onClick={dialog.onClose}
        testId={testIds.cancel}
      >
        {dialog.cancelLabel ?? words.cancel}
      </Button>
      <DialogContentWrapperPrimary dialog={dialog} />
    </DialogActions>
  );
}
