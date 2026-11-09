/**
 * - a drag in a product's flows goes through `shared/e2e/dragging.ts`, never an
 *   event its own code dispatches; read off the code, its comments blanked
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { dragsIn } from './browserGates.ts';
import { tierAt } from './browserScreens.ts';

const at = tierAt(scope);
const HELD = path.join(scope.root, 'shared', 'e2e', 'dragHold.ts');

describe('a drag goes through the framework', () => {
  it('control · a dispatched dragstart and a DragEvent are found, a comment and the helper are not', () => {
    expect(
      dragsIn(
        [
          "await row.dispatchEvent('dragstart');",
          "await page.evaluate(() => target.dispatchEvent(new DragEvent('drop')));",
          '// never new DragEvent here',
          'await pickUp(page, row);',
        ].join('\n'),
      ),
    ).toEqual([1, 2]);
    expect(
      dragsIn(fs.readFileSync(HELD, 'utf8')),
      'the framework’s own',
    ).not.toEqual([]);
  });

  // a repository without a browser tier says why, and the gate skips under that sentence
  it.skipIf(at === null)(
    `no flow of the product dispatches a drag itself${at === null && 'none' in scope.browser ? ` · no browser tier: ${scope.browser.none}` : ''}`,
    () => {
      const root =
        at === null ? scope.root : path.join(at.root, at.tier.screensRoot);
      const files = fs
        .readdirSync(root, { recursive: true, encoding: 'utf8' })
        .filter((file) => file.endsWith('.ts'));
      expect(
        files.flatMap((file) =>
          dragsIn(fs.readFileSync(path.join(root, file), 'utf8')).map(
            (line) => `${file}:${line}`,
          ),
        ),
      ).toEqual([]);
    },
  );
});
