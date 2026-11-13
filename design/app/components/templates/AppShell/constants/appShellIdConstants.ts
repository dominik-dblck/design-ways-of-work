/**
 * - `APP_SHELL_TEST_IDS` · the ids the frame writes unless it is handed its own
 */
import type { AppShellTestIds } from '../types/appShellTypes.ts';

export const APP_SHELL_TEST_IDS = {
  header: 'app-shell-header',
} as const satisfies AppShellTestIds;
