/**
 * - `namingRules` · `naming-convention`: the case of a type, a value, a function
 * - a boolean says it is one (is, has, can…); React code's components PascalCase
 */
import type { Linter } from 'eslint';

const IS = ['is', 'has', 'can', 'should', 'was', 'will', 'did'];

const namingRules = ({
  react,
}: {
  readonly react: boolean;
}): Linter.RulesRecord => ({
  '@typescript-eslint/naming-convention': [
    'error',
    { selector: 'typeLike', format: ['PascalCase'] },
    {
      selector: 'typeParameter',
      format: ['PascalCase'],
      leadingUnderscore: 'allow',
    },
    {
      selector: 'variable',
      format: react
        ? ['camelCase', 'UPPER_CASE', 'PascalCase']
        : ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
    },
    {
      selector: 'function',
      format: react ? ['camelCase', 'PascalCase'] : ['camelCase'],
    },
    {
      selector: 'parameter',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    },
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase', 'UPPER_CASE'],
      prefix: [...IS, ...IS.map((one) => `${one.toUpperCase()}_`)],
    },
    // a destructured name is its source's: a prop, a field, a library's argument
    { selector: 'variable', modifiers: ['destructured'], format: null },
    { selector: 'parameter', modifiers: ['destructured'], format: null },
  ],
});

export { namingRules };
