/**
 * - `Heading` · a page's or a section's title, at its level of the type ramp
 * - the level is the outline's too: level 2 draws an h2, never a styled span
 * - quiet, a section's title in the small label's face; a note may stand beside it
 */
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { toneInk } from '../../../styles/tones.ts';
import type { Tone } from '../../../styles/tones.ts';
import { sxListOf } from '../../../utils/sxListUtils.ts';
import { NOTE_ROW } from './constants/headingConstants.ts';

export type HeadingProps = {
  readonly children: React.ReactNode;
  readonly level: 1 | 2 | 3;
  // the small label's face, for a section inside a panel: the level stays the outline's
  readonly quiet?: boolean;
  // a line beside the title, on its baseline, in the secondary ink
  readonly note?: string;
  readonly tone?: Tone;
  readonly id?: string;
  readonly testId?: string | undefined;
  readonly sx?: SxProps<Theme> | undefined;
};

/** One per level the page's outline needs · the size follows the level, so a level is never picked for its size. */
export function Heading({
  children,
  level,
  quiet = false,
  note,
  tone = 'inherit',
  id,
  testId,
  sx,
}: HeadingProps): React.ReactElement {
  const title = (
    <Typography
      id={id}
      data-testid={testId}
      variant={quiet ? 'overline' : `h${level}`}
      component={`h${level}`}
      color={toneInk[tone]}
      sx={note === undefined ? sx : undefined}
    >
      {children}
    </Typography>
  );
  if (note === undefined) return title;
  return (
    <Stack
      direction="row"
      spacing={1.5}
      useFlexGap
      sx={[NOTE_ROW, ...sxListOf(sx)]}
    >
      {title}
      <Typography variant="body2" color="textSecondary">
        {note}
      </Typography>
    </Stack>
  );
}
