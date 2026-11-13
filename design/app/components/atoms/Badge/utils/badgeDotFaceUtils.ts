/**
 * - `dotFaceOf` · the one dot's face: its size, its tone, ringed on a corner
 */
import type { CSSObject, Theme } from '@mui/material/styles';
import type { BadgeDotAt, BadgeDotTone } from '../types/badgeDotTypes.ts';

const DOT_STEP = { corner: 1, inline: 0.75 } as const satisfies Record<
  BadgeDotAt,
  number
>;

/** Badge's dot and BadgeDot both read it: one size, one ring, one place to change them. */
export const dotFaceOf = ({
  theme,
  tone,
  at,
}: {
  readonly theme: Theme;
  readonly tone: BadgeDotTone;
  readonly at: BadgeDotAt;
}): CSSObject => ({
  // both sides written, never one and a ratio · a row that runs out of room squeezes a ratio flat
  width: theme.spacing(DOT_STEP[at]),
  minWidth: theme.spacing(DOT_STEP[at]),
  height: theme.spacing(DOT_STEP[at]),
  padding: 0,
  border: 'none',
  flex: 'none',
  borderRadius: '50%',
  backgroundColor: theme.vars.palette[tone].main,
  ...(at === 'corner'
    ? {
        boxShadow: `0 0 0 ${theme.spacing(0.25)} ${theme.vars.palette.background.paper}`,
      }
    : {}),
});
