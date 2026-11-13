/**
 * - `Label` · a field's name over its control, as written, on a tone
 * - a required label ends in a red asterisk
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
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Label({
  children,
  id,
  tone = 'inherit',
  required = false,
  sx,
  testId,
}: LabelProps): React.ReactElement {
  return (
    <Typography
      id={id}
      sx={sx}
      data-testid={testId}
      variant="subtitle2"
      component="span"
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
