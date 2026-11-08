/**
 * - `shapeTester`, `restrictedSyntax` · ESLint's RuleTester on vitest, TSX parsed, and the core rule
 * - `refusal` · the error a case expects, by a word of its shape's message
 */
import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import { afterAll, describe, it } from 'vitest';
import { restrictedSyntax } from '../../shared/lint/wowPlugin.ts';
import type { Shape } from '../../shared/lint/shapes.ts';

// a core rule is tested by ESLint's own RuleTester, its types the core's
Object.assign(RuleTester, { afterAll, describe, it });
const shapeTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

function refusal(
  shapes: readonly Shape[],
  word: string,
): { readonly message: string } {
  const found = shapes.find((shape) => shape.message.includes(word));
  if (found === undefined) throw new Error(`no shape says ${word}`);
  return { message: found.message };
}

export { refusal, restrictedSyntax, shapeTester };
