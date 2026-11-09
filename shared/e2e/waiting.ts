/**
 * - `SETTLES_WITHIN`, `isVisibleWithin` · a deadline a screen settles within
 */
import type { Locator } from '@playwright/test';

// how long a screen may take to settle under a dev server: a deadline, never a wait
export const SETTLES_WITHIN = 15_000;

export const isVisibleWithin = (
  locator: Locator,
  timeoutMs: number,
): Promise<boolean> =>
  locator
    .waitFor({ state: 'visible', timeout: timeoutMs })
    .then(() => true)
    .catch(() => false);
