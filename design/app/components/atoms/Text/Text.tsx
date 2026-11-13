/**
 * - `Text` · a line on a tone, in a size of the type scale
 * - `alert` is said as it appears, never when it stood from the start
 */
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { toneInk } from '../../../styles/tones.ts';
import type { Tone } from '../../../styles/tones.ts';
import { textSxOf } from './utils/textSxUtils.ts';

export type TextProps = {
  readonly children: React.ReactNode;
  readonly tone?: Tone;
  readonly variant?: 'caption' | 'body2' | 'body1' | 'overline';
  readonly strong?: boolean;
  // one line, cut with an ellipsis
  readonly line?: boolean;
  // a block of its own, where a span would run on beside the line before it
  readonly block?: boolean;
  // said as it appears: a line that arrived after the screen was drawn
  readonly alert?: boolean;
  readonly id?: string;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Text({
  children,
  tone = 'inherit',
  variant = 'caption',
  strong = false,
  line = false,
  block = false,
  alert = false,
  id,
  testId,
  sx,
}: TextProps): React.ReactElement {
  return (
    <Typography
      id={id}
      data-testid={testId}
      role={alert ? 'alert' : undefined}
      variant={variant}
      variantMapping={block ? { [variant]: 'div' } : undefined}
      noWrap={line}
      color={toneInk[tone]}
      sx={textSxOf({ strong, sx })}
    >
      {children}
    </Typography>
  );
}
