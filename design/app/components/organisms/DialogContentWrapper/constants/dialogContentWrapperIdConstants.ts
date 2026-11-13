/**
 * - `DIALOG_CONTENT_WRAPPER_TEST_IDS` · the frame's ids unless handed its own
 */
import type { DialogContentWrapperTestIds } from '../types/dialogContentWrapperTypes.ts';

export const DIALOG_CONTENT_WRAPPER_TEST_IDS = {
  cancel: 'dialog-cancel',
  close: 'dialog-close',
} as const satisfies DialogContentWrapperTestIds;
