/**
 * - `AppShell` · the frame a screen mounts in: the rail handed in, the content
 * - the content's header keeps its row; main scrolls under it
 */
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { AppShellContent } from './components/AppShellContent.tsx';
import { APP_SHELL_TEST_IDS } from './constants/appShellIdConstants.ts';
import { APP_SHELL_SX } from './constants/appShellConstants.ts';
import type { AppShellTestIds } from './types/appShellTypes.ts';

export type AppShellProps = {
  // the rail · a SideNav, or none
  readonly nav?: ReactNode;
  readonly header?: ReactNode;
  readonly children?: ReactNode;
  readonly testIds?: AppShellTestIds | undefined;
};

export function AppShell({
  nav,
  header,
  children,
  testIds = APP_SHELL_TEST_IDS,
}: AppShellProps): React.ReactElement {
  return (
    <Box sx={APP_SHELL_SX}>
      {nav}
      <AppShellContent header={header} testIds={testIds}>
        {children}
      </AppShellContent>
    </Box>
  );
}
