/**
 * - `IconButton` · a square button with a glyph in it; its label is its name
 */
import MuiIconButton from '@mui/material/IconButton';
import type { IconButtonProps } from './types/iconButtonTypes.ts';
import { iconButtonAttrsOf } from './utils/iconButtonAttrsUtils.ts';

/** It has no words of its own · the label names it to a screen reader. */
export function IconButton({
  label,
  variant,
  size,
  disabled,
  greyed,
  describedBy,
  pressed,
  expanded,
  onClick,
  children,
  testId,
  sx,
  ...handed
}: IconButtonProps): React.ReactElement {
  const look = { variant, size, disabled, greyed, pressed, onClick, sx };
  return (
    <MuiIconButton
      {...handed}
      data-testid={testId}
      aria-label={label}
      aria-describedby={describedBy}
      aria-pressed={pressed}
      aria-expanded={expanded}
      {...iconButtonAttrsOf(look)}
    >
      {children}
    </MuiIconButton>
  );
}
