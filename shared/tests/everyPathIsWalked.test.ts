/**
 * - every kind of path a screen can put a person on has a flow, or a waiver in
 *   its status file naming the test in another tier that walks it, or nowhere
 */
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { unwalkedOf } from './browserGates.ts';
import { catalogOf, screensOf, statusOf, tierAt } from './browserScreens.ts';

const at = tierAt(scope);
const screens = at === null ? [] : screensOf(at);

describe('every kind of path is walked on every screen', () => {
  // a repository without a browser tier says why, and the gate skips under that sentence
  it.skipIf('none' in scope.browser)(
    `no browser tier · ${'none' in scope.browser ? scope.browser.none : 'held'}`,
    () => undefined,
  );

  it.each(screens)('%s · every kind has a flow or a waiver', async (screen) => {
    if (at === null) return;
    expect(
      unwalkedOf(await catalogOf(at, screen), statusOf(at, screen) ?? ''),
    ).toEqual([]);
  });
});
