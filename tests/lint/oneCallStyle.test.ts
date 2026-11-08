import { oneCallStyle } from '../../shared/lint/rules/oneCallStyle.ts';
import { ruleTester } from './ruleTester.ts';

const AT = 'sheet/plantedSteps.ts';

ruleTester.run('one-call-style', oneCallStyle, {
  valid: [
    {
      name: 'one object everywhere',
      filename: AT,
      code: 'export function step(at: Step) {}\nexport const next = ({ id }: Step) => id;',
    },
    {
      name: 'positions everywhere',
      filename: AT,
      code: 'export function step(id: string, row: number) {}\nexport const next = (id: string, row: number) => id;',
    },
    {
      name: 'one argument beside one object',
      filename: AT,
      code: 'export function step(at: { readonly id: string }) {}\nexport function idOf(row: Row) {}',
    },
  ],
  invalid: [
    {
      name: 'positions beside one object',
      filename: AT,
      code: 'export function step(at: Step) {}\nexport const next = (id: string, row: number) => id;',
      errors: [
        {
          messageId: 'positions',
          data: { name: 'next', object: 'step' },
          line: 2,
        },
      ],
    },
  ],
});
