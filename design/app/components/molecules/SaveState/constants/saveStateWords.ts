/**
 * - `SAVE_STATE_WORDS` · what the foot says in each state, and the retry's word
 */
import { CONTROL_LABELS } from '../../../../constants/controlLabelsConstants.ts';
import type { SaveStateWords } from '../types/saveStateTypes.ts';

export const SAVE_STATE_WORDS = {
  saved: (at: string) => `Autosaved ${at}`,
  unsaved: 'Not saved yet',
  saving: 'Saving…',
  retrying: 'Not saved. Retrying…',
  lost: 'Your changes are not saved. Check your connection.',
  retry: CONTROL_LABELS.retry,
  taken: (line: string) => `Not saved · ${line}`,
} as const satisfies SaveStateWords;
