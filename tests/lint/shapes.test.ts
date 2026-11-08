import { SHAPES } from '../../shared/lint/shapes.ts';
import { refusal, restrictedSyntax, shapeTester } from './shapeTester.ts';

const OPTIONS = [...SHAPES];
const placeholder = refusal(SHAPES, 'placeholder');

shapeTester.run('the shapes every file refuses', restrictedSyntax, {
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
      errors: [refusal(SHAPES, 'how many')],
    },
    {
      name: 'a brand written by hand',
      code: "type Id = string & { readonly __brand: 'Id' };",
      options: OPTIONS,
      errors: [refusal(SHAPES, '__brand')],
    },
  ],
});
