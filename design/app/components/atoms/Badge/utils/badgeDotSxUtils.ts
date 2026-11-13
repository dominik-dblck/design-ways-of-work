/**
 * - `badgeDotSxOf` · a dot on its own: the one dot's face, on its box's corner
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { BadgeDotAt, BadgeDotTone } from '../types/badgeDotTypes.ts';
import { dotFaceOf } from './badgeDotFaceUtils.ts';

/** On a corner it is ringed off what it sits on; the caller's box places it. */
export const badgeDotSxOf =
  (tone: BadgeDotTone, at: BadgeDotAt): SxProps<Theme> =>
  (theme) => ({
    ...dotFaceOf({ theme, tone, at }),
    ...(at === 'corner'
      ? {
          position: 'absolute',
          top: theme.spacing(0.5),
          right: theme.spacing(0.5),
        }
      : {}),
  });
