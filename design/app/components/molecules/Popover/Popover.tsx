/**
 * - `Popover` · prose a reader hovers, anchored under its trigger
 * - `flush` drops the paper's padding for a body that draws its own
 * - `side` lines it up with its trigger's left edge, or its right one by a corner
 */
import MuiPopover from '@mui/material/Popover';

export type PopoverProps = {
  readonly anchorEl: HTMLElement | null;
  readonly onClose?: () => void;
  readonly flush?: boolean;
  readonly side?: 'left' | 'right';
  readonly children: React.ReactNode;
};

export function Popover({
  anchorEl,
  onClose,
  flush = false,
  side = 'left',
  children,
}: PopoverProps): React.ReactElement {
  return (
    <MuiPopover
      open={anchorEl !== null}
      anchorEl={anchorEl}
      container={anchorEl?.closest('.MuiDialog-root') ?? null}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: side }}
      transformOrigin={{ vertical: 'top', horizontal: side }}
      slotProps={{
        paper: { variant: 'popover', sx: flush ? { padding: 0 } : undefined },
      }}
    >
      {children}
    </MuiPopover>
  );
}
