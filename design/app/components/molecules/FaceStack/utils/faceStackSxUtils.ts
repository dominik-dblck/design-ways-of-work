/**
 * - `faceStackSxOf` · the stack's look: small faces, fainter while nobody holds it
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { fades } from '../../../../styles/fades.ts';

/** Faded, it reads fainter · people who may hold it, nobody holding it yet. */
export const faceStackSxOf = (faded: boolean): SxProps<Theme> => ({
  flexShrink: 0,
  opacity: faded ? fades.idle : 1,
  '& .MuiAvatar-root': {
    width: (theme) => theme.spacing(2.75),
    height: (theme) => theme.spacing(2.75),
    fontSize: 9,
  },
});
