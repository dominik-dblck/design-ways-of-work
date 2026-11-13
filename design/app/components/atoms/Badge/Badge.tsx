/**
 * - `Badge` · a mark on the corner of what it wraps, or beside its label
 * - invisible at zero, and the wrapper decides that, not the caller
 */
import type { SxProps, Theme } from '@mui/material/styles';
import MuiBadge from '@mui/material/Badge';
import { BADGE_BESIDE } from './constants/badgeConstants.ts';
import { sxListOf } from '../../../utils/sxListUtils.ts';

/** A mark on the corner of what it wraps, or beside a label that a corner would cover. */
export type BadgeProps = {
  readonly variant?: 'dot' | 'count';
  readonly count?: number;
  readonly place?: 'corner' | 'beside';
  readonly children: React.ReactNode;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Badge({
  variant = 'dot',
  count,
  place = 'corner',
  children,
  testId,
  sx,
}: BadgeProps): React.ReactElement {
  return (
    <MuiBadge
      data-testid={testId}
      sx={[place === 'beside' ? BADGE_BESIDE : {}, ...sxListOf(sx)]}
      variant={variant}
      badgeContent={variant === 'count' ? count : undefined}
      invisible={count === 0}
      overlap="circular"
    >
      {children}
    </MuiBadge>
  );
}
