/**
 * - every role the scope's tier names meets every screen: a flow of the screen
 *   takes it, or its status file says why that role is no variant there
 */
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { rolesMissingOf } from './browserGates.ts';
import { catalogOf, screensOf, statusOf, tierAt } from './browserScreens.ts';

const at = tierAt(scope);
const screens = at === null ? [] : screensOf(at);

describe('every role meets every screen', () => {
  // a repository without a browser tier says why, and the gate skips under that sentence
  it.skipIf('none' in scope.browser)(
    `no browser tier · ${'none' in scope.browser ? scope.browser.none : 'held'}`,
    () => {
      expect(
        at?.tier.roles.length,
        'control · the tier names its roles',
      ).toBeGreaterThan(0);
    },
  );

  it.each(screens)(
    '%s · a flow for every role, or a line saying why',
    async (screen) => {
      if (at === null) return;
      expect(
        rolesMissingOf({
          roles: at.tier.roles,
          catalog: await catalogOf(at, screen),
          status: statusOf(at, screen) ?? '',
        }),
      ).toEqual([]);
    },
  );
});
