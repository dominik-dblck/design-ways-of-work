/**
 * - `Link` · ink at rest, the underline arrives on hover
 * - a plain anchor, or the router's link handed in, so a page opens in place
 */
import type { ElementType } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';

export type LinkProps = {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly testId?: string | undefined;
  readonly sx?: SxProps<Theme>;
  readonly component?: ElementType;
};

export function Link({
  href,
  children,
  sx,
  testId,
  component = 'a',
}: LinkProps): React.ReactElement {
  return (
    <MuiLink component={component} sx={sx} data-testid={testId} href={href}>
      {children}
    </MuiLink>
  );
}
