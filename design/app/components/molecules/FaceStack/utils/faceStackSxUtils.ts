/**
 * - `faceStackSxOf` · the stack's look: small faces, fainter while nobody holds it
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { fades } from '../../../../styles/fades.ts';

// faded, initials keep their ink on a paler disc (7.73 light, 11.22 dark) · only a photo dims
const FADED_SX = {
  '& .MuiAvatar-colorDefault': {
    bgcolor: 'background.container',
    color: 'text.micro',
  },
  '& .MuiAvatar-img': { opacity: fades.idle },
} as const;

/** Faded, it reads fainter · people who may hold it, nobody holding it yet. */
export const faceStackSxOf = (faded: boolean): SxProps<Theme> => ({
  flexShrink: 0,
  '& .MuiAvatar-root': {
    width: (theme) => theme.spacing(2.75),
    height: (theme) => theme.spacing(2.75),
    fontSize: 9,
  },
  ...(faded ? FADED_SX : {}),
});
