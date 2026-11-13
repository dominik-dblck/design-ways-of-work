/**
 * - `Surface` · five named layouts, each with its own radius, padding, shadow
 */
import type { SxProps, Theme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import type { SurfaceVariant } from './types/surfaceTypes.ts';

export type SurfaceProps = {
  readonly variant?: SurfaceVariant;
  readonly children?: React.ReactNode;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Surface({
  variant = 'container',
  children,
  testId,
  sx,
}: SurfaceProps): React.ReactElement {
  return (
    <Paper sx={sx} data-testid={testId} variant={variant} elevation={0}>
      {children}
    </Paper>
  );
}
