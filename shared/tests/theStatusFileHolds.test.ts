/**
 * - each screen's status file is measured, not narrated: a line names the test
 *   covering it or nowhere, and every flow stands red once or not yet
 */
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { statusFaultsOf } from './browserGates.ts';
import {
  catalogOf,
  screensOf,
  statusFileOf,
  statusOf,
  tierAt,
} from './browserScreens.ts';

const at = tierAt(scope);
const screens = at === null ? [] : screensOf(at);

describe('the status file is measured, not narrated', () => {
  // a repository without a browser tier says why, and the gate skips under that sentence
  it.skipIf('none' in scope.browser)(
    `no browser tier · ${'none' in scope.browser ? scope.browser.none : 'held'}`,
    () => undefined,
  );

  it.each(screens)('%s · its status file stands and holds', async (screen) => {
    if (at === null) return;
    const status = statusOf(at, screen);
    expect(status, statusFileOf(at, screen)).not.toBeNull();
    expect(
      statusFaultsOf({
        catalog: await catalogOf(at, screen),
        status: status ?? '',
        root: at.root,
      }),
    ).toEqual([]);
  });
});
