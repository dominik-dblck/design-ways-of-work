import { dataIsReadonly } from '../../shared/lint/rules/dataIsReadonly.ts';
import { ruleTester } from './ruleTester.ts';

const FILE = 'sheet/words/a/aTypes.ts';
const writable = (owner: string, what: string) => ({
  messageId: 'writable' as const,
  data: { owner, what },
});

ruleTester.run('data-is-readonly', dataIsReadonly, {
  valid: [
    {
      name: 'readonly fields, lists, tuples and a Readonly record',
      filename: FILE,
      code: [
        'interface Row { readonly id: string; readonly tags: readonly string[] }',
        'type Pair = readonly [string, number];',
        'export const KEPT: Readonly<Record<string, readonly Row[]>> = {};',
        'const local: string[] = [];',
        'export const LIST = [] as string[];',
        'type Partly = Readonly<Partial<Record<string, number>>>;',
        'type Some = readonly [string, ...string[]];',
        'type Kept = ReadonlyArray<string>;',
      ].join('\n'),
    },
    {
      name: 'a type its repository names mutable by design',
      filename: FILE,
      options: [{ mutable: ['Tally'] }],
      code: 'interface Tally { count: number; seen: string[] }',
    },
  ],
  invalid: [
    {
      name: 'an Array is a writable list',
      filename: FILE,
      code: 'type Rows = Array<string>;',
      errors: [writable('Rows', 'Array<string>')],
    },
    {
      name: 'a writable field, a writable list and a bare Record',
      filename: FILE,
      code: [
        'interface Row { readonly id: string; note: string; readonly tags: string[] }',
        'export const TABLE: Record<string, readonly string[]> = {};',
      ].join('\n'),
      errors: [
        writable('Row', 'note: string;'),
        writable('Row', 'string[]'),
        writable('TABLE', 'Record<string, readonly string[]>'),
      ],
    },
  ],
});
