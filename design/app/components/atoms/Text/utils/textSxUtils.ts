/**
 * - `textSxOf` · the caller's sx after the weight a strong line takes
 */
import type { SxProps, Theme } from '@mui/material/styles';

const STRONG_SX = { fontWeight: 'fontWeightMedium' } as const;

export const textSxOf = (at: {
  readonly strong: boolean;
  readonly sx: SxProps<Theme> | undefined;
}): SxProps<Theme> => [
  at.strong ? STRONG_SX : {},
  ...(Array.isArray(at.sx) ? at.sx : [at.sx]),
];
