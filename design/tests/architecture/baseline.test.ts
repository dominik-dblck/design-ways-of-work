/**
 * - `docs/rules/tests.md`: a baseline only shrinks · a new offender and a fixed one still listed are drift
 */
import { describe, expect, it } from 'vitest';
import { driftFrom } from './baseline.ts';

describe('a baseline only shrinks', () => {
  it('a new offender and a fixed one still listed are both drift; the same list is none', () => {
    expect(driftFrom(['a', 'b'], ['b', 'c'])).toEqual({
      added: ['c'],
      fixed: ['a'],
    });
    expect(driftFrom(['a'], ['a'])).toEqual({ added: [], fixed: [] });
  });
});
