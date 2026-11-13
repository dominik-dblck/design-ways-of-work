/**
 * - `badgeDotSxOf` · a dot's look: ringed on a corner, small and plain inline
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { BadgeDotAt, BadgeDotTone } from '../types/badgeDotTypes.ts';

const DOT_STEP = { corner: 1, inline: 0.75 } as const satisfies Record<
  BadgeDotAt,
  number
>;

/** On a corner it is ringed off what it sits on; the caller's box places it. */
export const badgeDotSxOf =
  (tone: BadgeDotTone, at: BadgeDotAt): SxProps<Theme> =>
  (theme) => ({
    // both sides written, never one and a ratio · a row that runs out of room squeezes a ratio flat
    width: theme.spacing(DOT_STEP[at]),
    height: theme.spacing(DOT_STEP[at]),
    flex: 'none',
    borderRadius: '50%',
    backgroundColor: theme.vars.palette[tone].main,
    ...(at === 'corner'
      ? {
          position: 'absolute',
          top: theme.spacing(0.5),
          right: theme.spacing(0.5),
          boxShadow: `0 0 0 ${theme.spacing(0.25)} ${theme.vars.palette.background.paper}`,
        }
      : {}),
  });
