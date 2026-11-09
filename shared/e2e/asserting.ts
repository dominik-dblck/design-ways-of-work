/**
 * - `expectUrl` · the page's address, as a person reads it: a path or a pattern
 */
import { expect, type Page } from '@playwright/test';

export const expectUrl = async (
  page: Page,
  {
    url,
    timeout,
  }: { readonly url: string | RegExp; readonly timeout?: number },
): Promise<void> => {
  await expect(page).toHaveURL(url, timeout === undefined ? {} : { timeout });
};
