/**
 * - `BADGE_BESIDE` · a count drawn after its label, in the line
 */
/** A count drawn after its label, in the line · a corner would cover the label's last letters. */
export const BADGE_BESIDE = {
  alignItems: 'center',
  gap: 1,
  '& .MuiBadge-badge': { position: 'static', transform: 'none' },
  '& .MuiBadge-invisible': { display: 'none' },
} as const;
