/**
 * - each glob of the scope's `spelling` names a file: a typo spells nothing
 */
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { globsNamingNothing } from './globs.ts';

describe('the spelling names files', () => {
  it('every glob it spells, and every file of another language, names a file', () => {
    expect({
      files: globsNamingNothing(scope, scope.spelling.files),
      alsoIn: scope.spelling.alsoIn.flatMap((one) =>
        globsNamingNothing(scope, one.files),
      ),
    }).toEqual({ files: [], alsoIn: [] });
  });
});
