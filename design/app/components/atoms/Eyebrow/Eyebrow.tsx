/**
 * - `Eyebrow` · the mono uppercase label over a thing, in a span, on a tone
 */
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { toneInk } from '../../../styles/tones.ts';
import type { Tone } from '../../../styles/tones.ts';

export type EyebrowProps = {
  readonly children: React.ReactNode;
  readonly id?: string;
  readonly tone?: Tone;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Eyebrow({
  children,
  id,
  tone = 'inherit',
  sx,
  testId,
}: EyebrowProps): React.ReactElement {
  return (
    <Typography
      id={id}
      sx={sx}
      data-testid={testId}
      variant="overline"
      color={toneInk[tone]}
    >
      {children}
    </Typography>
  );
}
