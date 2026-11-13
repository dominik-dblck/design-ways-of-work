/**
 * - `saveStateLineOf` · the foot's words for the save as it stands
 * - `saveLineSxOf` · the foot's look: a danger rule once it failed, else quiet
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { SAVE_STATE_WORDS } from '../constants/saveStateWords.ts';
import type { SaveStateShown } from '../types/saveStateTypes.ts';

/** A saved draft with no time is one not saved yet. */
export const saveStateLineOf = (shown: SaveStateShown): string => {
  switch (shown.state) {
    case 'saved':
      return shown.at === undefined
        ? SAVE_STATE_WORDS.unsaved
        : SAVE_STATE_WORDS.saved(shown.at);
    case 'saving':
      return SAVE_STATE_WORDS.saving;
    case 'retrying':
      return SAVE_STATE_WORDS.retrying;
    case 'taken':
      return SAVE_STATE_WORDS.taken(shown.takenLine);
    case 'lost':
      return SAVE_STATE_WORDS.lost;
  }
};

export const saveLineSxOf = (failed: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  py: 1.25,
  px: 2.25,
  borderTop: 1,
  borderColor: failed ? 'text.danger' : 'divider',
  color: failed ? 'text.danger' : 'text.micro',
});
