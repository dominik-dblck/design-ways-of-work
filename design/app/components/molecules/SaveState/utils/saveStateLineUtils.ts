/**
 * - `saveStateLineOf` · the foot's words for the save as it stands
 * - `saveLineSxOf` · the foot's look: a danger rule once it failed, else quiet
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type {
  SaveStateShown,
  SaveStateWords,
} from '../types/saveStateTypes.ts';

/** A saved draft with no time is one not saved yet. */
export const saveStateLineOf = (
  shown: SaveStateShown,
  words: SaveStateWords,
): string => {
  switch (shown.state) {
    case 'saved':
      return shown.at === undefined ? words.unsaved : words.saved(shown.at);
    case 'saving':
      return words.saving;
    case 'retrying':
      return words.retrying;
    case 'taken':
      return words.taken(shown.takenLine);
    case 'lost':
      return words.lost;
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
