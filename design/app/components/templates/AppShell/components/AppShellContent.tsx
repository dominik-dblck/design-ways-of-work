/**
 * - `AppShellContent` · the header keeps its row, and main scrolls under it
 */
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import {
  APP_SHELL_CONTENT_SX,
  APP_SHELL_HEADER_SX,
  APP_SHELL_MAIN_SX,
} from '../constants/appShellConstants.ts';
import type { AppShellTestIds } from '../types/appShellTypes.ts';

export type AppShellContentProps = {
  readonly header?: ReactNode;
  readonly children?: ReactNode;
  readonly testIds: AppShellTestIds;
};

/** The header row stands with nothing in it · the screen's header, or nothing. */
export function AppShellContent({
  header,
  children,
  testIds,
}: AppShellContentProps): React.ReactElement {
  return (
    <Box sx={APP_SHELL_CONTENT_SX}>
      <Box
        component="header"
        data-testid={testIds.header}
        sx={APP_SHELL_HEADER_SX}
      >
        {header}
      </Box>
      <Box component="main" sx={APP_SHELL_MAIN_SX}>
        {children}
      </Box>
    </Box>
  );
}
