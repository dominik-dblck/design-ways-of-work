import { RuleTester } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import tseslint from 'typescript-eslint';
import { afterAll, describe, it } from 'vitest';
import { SHAPES } from '../../shared/lint/shapes.ts';

// a core rule is tested by ESLint's own RuleTester, its types the core's
Object.assign(RuleTester, { afterAll, describe, it });
const ruleTester = new RuleTester({
  languageOptions: { parser: tseslint.parser },
});

const restricted = builtinRules.get('no-restricted-syntax');
if (restricted === undefined)
  throw new Error('ESLint lost no-restricted-syntax');
const OPTIONS = [...SHAPES];
const placeholder = { message: SHAPES[1]?.message ?? '' };

ruleTester.run('the shapes every file refuses', restricted, {
  valid: [
    {
      name: "a shorthand keeps its source's name",
      code: 'const { data } = load();',
      options: OPTIONS,
    },
    {
      name: 'a name that says what',
      code: 'const rates = [1];\nconst FOUR_EYES = 2;',
      options: OPTIONS,
    },
  ],
  invalid: [
    {
      name: 'a renamed binding',
      code: 'const { rows: data } = load();',
      options: OPTIONS,
      errors: [placeholder],
    },
    {
      name: 'a rest',
      code: 'const [first, ...items] = load();',
      options: OPTIONS,
      errors: [placeholder],
    },
    {
      name: 'a parameter',
      code: 'const average = (list: number[]) => list;',
      options: OPTIONS,
      errors: [placeholder],
    },
    {
      name: 'a count alone',
      code: 'const THE_SEVEN = 7;',
      options: OPTIONS,
      errors: [{ message: SHAPES[0]?.message ?? '' }],
    },
  ],
});
