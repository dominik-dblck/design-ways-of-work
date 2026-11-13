/**
 * - `Label` · a short name over a thing (a field, a section, a card), on a tone
 * - one look, the type scale's overline; a required one ends in a red asterisk
 */
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { toneInk } from '../../../styles/tones.ts';
import type { Tone } from '../../../styles/tones.ts';

export type LabelProps = {
  readonly children: React.ReactNode;
  readonly id?: string | undefined;
  readonly tone?: Tone;
  readonly required?: boolean;
  // one line, cut with an ellipsis
  readonly line?: boolean;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Label({
  children,
  id,
  tone = 'inherit',
  required = false,
  line = false,
  sx,
  testId,
}: LabelProps): React.ReactElement {
  return (
    <Typography
      id={id}
      sx={sx}
      data-testid={testId}
      variant="overline"
      component="span"
      noWrap={line}
      color={toneInk[tone]}
    >
      {children}
      {required ? (
        <Box
          component="span"
          aria-hidden
          sx={{ color: 'text.danger', marginLeft: 0.5 }}
        >
          *
        </Box>
      ) : null}
    </Typography>
  );
}
