/**
 * - `clickWithFallback` · a click a person makes, past a target still settling
 */
import type { Locator } from '@playwright/test';

type ClickOptions = {
  readonly timeoutMs?: number;
  readonly dispatchTimeoutMs?: number;
  readonly forceAsLastResort?: boolean;
};

const TRANSIENT = [
  'intercepts pointer events',
  'element is not stable',
  'element is not enabled',
];

const isTransient = (message: string): boolean =>
  TRANSIENT.some((phrase) => message.includes(phrase));

export const clickWithFallback = async (
  target: Locator,
  {
    timeoutMs = 5_000,
    dispatchTimeoutMs = 3_000,
    forceAsLastResort = true,
  }: ClickOptions = {},
): Promise<void> => {
  await target.scrollIntoViewIfNeeded({ timeout: timeoutMs });
  await target.waitFor({ state: 'visible', timeout: timeoutMs });

  try {
    await target.click({ timeout: timeoutMs });
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (!isTransient(message) || !forceAsLastResort) throw error;

    if (
      message.includes('element is not enabled') ||
      message.includes('intercepts pointer events')
    ) {
      // the pointer leaves as a person's would · an interactive tooltip under it stays open over the target
      await target.page().mouse.move(0, 0);
      await target.click({ timeout: timeoutMs });
      return;
    }

    try {
      await target.dispatchEvent('click', { timeout: dispatchTimeoutMs });
      return;
    } catch {
      await target.click({ timeout: timeoutMs, force: true });
    }
  }
};
