/**
 * - `Why` · the reason a greyed control carries, never drawn
 * - read through the control's aria-describedby, and by its own id
 */
import Box from '@mui/material/Box';

export type WhyProps = {
  readonly id: string;
  readonly testId?: string;
  readonly children: React.ReactNode;
};

export function Why({ id, testId, children }: WhyProps): React.ReactElement {
  return (
    <Box component="span" id={id} data-testid={testId} hidden>
      {children}
    </Box>
  );
}
