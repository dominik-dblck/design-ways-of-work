/**
 * - `DIALOG_CONTENT_WRAPPER_WORDS` · the frame's words by default: Cancel, the x
 */
import type { DialogContentWrapperWords } from '../types/dialogContentWrapperTypes.ts';

export const DIALOG_CONTENT_WRAPPER_WORDS = {
  cancel: 'Cancel',
  close: 'Close',
} as const satisfies DialogContentWrapperWords;
