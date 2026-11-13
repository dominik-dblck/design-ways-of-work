/**
 * - `Button` · a button with words: contained, outlined or text, in three heights
 */
import MuiButton from '@mui/material/Button';
import type { ButtonProps } from './types/buttonTypes.ts';
import {
  buttonFaceOf,
  buttonPressOf,
  buttonSplitOf,
} from './utils/buttonAttrsUtils.tsx';

/** A key press on a greyed one finds no handler; a pressed one keeps the focus while it spins. */
export function Button({
  describedBy,
  labelledBy,
  description,
  popup,
  expanded,
  pressed,
  children,
  testId,
  sx,
  ...rest
}: ButtonProps): React.ReactElement {
  const { look, handed } = buttonSplitOf(rest);
  return (
    <MuiButton
      {...handed}
      aria-label={undefined}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      aria-description={description}
      aria-haspopup={popup}
      aria-expanded={expanded}
      aria-pressed={pressed}
      data-testid={testId}
      sx={sx}
      {...buttonFaceOf(look)}
      {...buttonPressOf(look)}
    >
      {children}
    </MuiButton>
  );
}
