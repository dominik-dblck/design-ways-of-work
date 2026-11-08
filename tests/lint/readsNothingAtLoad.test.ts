import { readsNothingAtLoad } from '../../shared/lint/rules/readsNothingAtLoad.ts';
import { ruleTester } from './ruleTester.ts';

ruleTester.run('reads-nothing-at-load', readsNothingAtLoad, {
  valid: [
    {
      name: 'a directive is the prologue, never an act',
      filename: 'sheet/planted.ts',
      code: "'use client';\nconst rows = 1;",
    },
    {
      name: 'a read in a function or a type, and a key named for a global',
      filename: 'sheet/planted.ts',
      code: [
        'type Flow = typeof globalThis.DeliveryFlow;',
        'const later = () => globalThis.Edges;',
        "const keys = { document: 'Document', window: 'in a window' };",
      ].join('\n'),
    },
  ],
  invalid: [
    {
      name: 'the environment read at load',
      filename: 'sheet/planted.ts',
      code: 'const mode = process.env.MODE;',
      errors: [{ messageId: 'reads', data: { name: 'process' } }],
    },
    {
      name: 'a global read at load, and a statement that acts',
      filename: 'sheet/planted.ts',
      code: 'const edges = globalThis.Edges;\nglobalThis.Planted = {};',
      errors: [
        { messageId: 'reads', data: { name: 'globalThis' }, line: 1 },
        { messageId: 'acts', line: 2 },
      ],
    },
  ],
});
