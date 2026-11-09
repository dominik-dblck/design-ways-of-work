/**
 * - `restricted` · `no-restricted-syntax`: every file's shapes, and a kind's besides
 */
import type { Linter } from 'eslint';
import { SHAPES } from './shapes.ts';
import type { Shape } from './shapes.ts';

// one rule key holds one option list a file: a kind's list carries every file's shapes with it
const restricted = (
  ...kinds: readonly (readonly Shape[])[]
): Linter.RulesRecord => ({
  'no-restricted-syntax': ['error', ...SHAPES, ...kinds.flat()],
});

export { restricted };
