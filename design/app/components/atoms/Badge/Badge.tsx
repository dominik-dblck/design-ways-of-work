/**
 * - `Badge` · a mark on the corner of what it wraps, or beside its label
 * - invisible at zero, the wrapper decides; its dot is BadgeDot's dot, on a tone
 */
import type { SxProps, Theme } from '@mui/material/styles';
import MuiBadge from '@mui/material/Badge';
import { BADGE_BESIDE } from './constants/badgeConstants.ts';
import type { BadgeDotTone } from './types/badgeDotTypes.ts';
import { dotFaceOf } from './utils/badgeDotFaceUtils.ts';
import { sxListOf } from '../../../utils/sxListUtils.ts';

/** A mark on the corner of what it wraps, or beside a label that a corner would cover. */
export type BadgeProps = {
  readonly variant?: 'dot' | 'count';
  readonly count?: number;
  readonly place?: 'corner' | 'beside';
  // the dot's colour; a count keeps its own
  readonly tone?: BadgeDotTone;
  readonly children: React.ReactNode;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Badge({
  variant = 'dot',
  count,
  place = 'corner',
  tone = 'error',
  children,
  testId,
  sx,
}: BadgeProps): React.ReactElement {
  const at = place === 'corner' ? 'corner' : 'inline';
  // one dot: the face BadgeDot draws, on MUI's own dot
  const dot: SxProps<Theme> = (theme) => ({
    '& .MuiBadge-dot': dotFaceOf({ theme, tone, at }),
  });
  return (
    <MuiBadge
      data-testid={testId}
      sx={[
        place === 'beside' ? BADGE_BESIDE : {},
        variant === 'dot' ? dot : {},
        ...sxListOf(sx),
      ]}
      variant={variant}
      badgeContent={variant === 'count' ? count : undefined}
      invisible={count === 0}
      overlap="circular"
    >
      {children}
    </MuiBadge>
  );
}
