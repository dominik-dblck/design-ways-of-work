/**
 * - `shapeTester`, `restrictedSyntax` · ESLint's RuleTester on vitest, TSX parsed, and the core rule
 * - `refusal` · the error a case expects, by a word of its shape's message
 */
import { RuleTester } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import tseslint from 'typescript-eslint';
import { afterAll, describe, it } from 'vitest';
import type { Shape } from '../../shared/lint/shapes.ts';

// a core rule is tested by ESLint's own RuleTester, its types the core's
Object.assign(RuleTester, { afterAll, describe, it });
const shapeTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

const restricted = builtinRules.get('no-restricted-syntax');
if (restricted === undefined)
  throw new Error('ESLint lost no-restricted-syntax');
const restrictedSyntax: NonNullable<typeof restricted> = restricted;

function refusal(
  shapes: readonly Shape[],
  word: string,
): { readonly message: string } {
  const found = shapes.find((shape) => shape.message.includes(word));
  if (found === undefined) throw new Error(`no shape says ${word}`);
  return { message: found.message };
}

export { refusal, restrictedSyntax, shapeTester };
