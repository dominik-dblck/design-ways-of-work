/**
 * - `Heading` · a page's or a section's title, at its level of the type ramp
 * - the level is the outline's too: level 2 draws an h2, never a styled span
 */
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { toneInk } from '../../../styles/tones.ts';
import type { Tone } from '../../../styles/tones.ts';

export type HeadingProps = {
  readonly children: React.ReactNode;
  readonly level: 1 | 2 | 3;
  readonly tone?: Tone;
  readonly id?: string;
  readonly testId?: string | undefined;
  readonly sx?: SxProps<Theme> | undefined;
};

/** One per level the page's outline needs · the size follows the level, so a level is never picked for its size. */
export function Heading({
  children,
  level,
  tone = 'inherit',
  id,
  testId,
  sx,
}: HeadingProps): React.ReactElement {
  return (
    <Typography
      id={id}
      data-testid={testId}
      variant={`h${level}`}
      component={`h${level}`}
      color={toneInk[tone]}
      sx={sx}
    >
      {children}
    </Typography>
  );
}
