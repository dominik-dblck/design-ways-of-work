/**
 * - `Hint` · prose a reader hovers, one sentence on the Popover paper
 */
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';
import { HINT_BARE_SLOT } from './constants/hintConstants.ts';

export type HintProps = {
  // an empty sentence or none shows nothing · none leaves the child's own name alone
  readonly title: string | React.ReactElement | null;
  readonly children: React.ReactElement;
  // in ms · the theme's when absent
  readonly delay?: number | undefined;
  // shows nothing, and closes one already open
  readonly quiet?: boolean | undefined;
  // the title draws its own surface; the tooltip's paper goes
  readonly bare?: boolean;
  // the theme's, under the child, when absent
  readonly placement?: TooltipProps['placement'];
  readonly testId?: string | undefined;
  readonly sx?: SxProps<Theme>;
  // what a group that clones its children hands this one, passed on
  readonly className?: string;
};

export function Hint({
  title,
  children,
  delay,
  quiet = false,
  bare = false,
  placement,
  sx,
  testId,
  ...handed
}: HintProps): React.ReactElement {
  return (
    <Tooltip
      {...handed}
      sx={sx}
      data-testid={testId}
      title={quiet ? '' : title}
      placement={placement}
      enterDelay={delay}
      enterNextDelay={delay}
      slotProps={bare ? HINT_BARE_SLOT : undefined}
    >
      {children}
    </Tooltip>
  );
}
