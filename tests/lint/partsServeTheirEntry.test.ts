import { partsServeTheirEntry } from '../../shared/lint/rules/partsServeTheirEntry.ts';
import { ruleTester } from './ruleTester.ts';

const OWNERS = [
  {
    owners: {
      'sheet/words/a/x.ts': 'sheet/words/a.ts',
      'sheet/words/a/z.ts': 'sheet/words/a.ts',
      'sheet/words/b/y.ts': 'sheet/words/b.ts',
    },
  },
] as const;

ruleTester.run('parts-serve-their-entry', partsServeTheirEntry, {
  valid: [
    {
      name: 'an entry reads its own part and another entry',
      filename: 'sheet/words/a.ts',
      code: "import { X } from './a/x.ts';\nimport { b } from './b.ts';",
      options: OWNERS,
    },
    {
      name: 'a part reads its sibling',
      filename: 'sheet/words/a/z.ts',
      code: "import { X } from './x.ts';",
      options: OWNERS,
    },
  ],
  invalid: [
    {
      name: "an entry reads another entry's part",
      filename: 'sheet/words/a.ts',
      code: "import { Y } from './b/y.ts';\nexport { Y2 } from './b/y.ts';",
      options: OWNERS,
      errors: [{ messageId: 'part' }, { messageId: 'part' }],
    },
  ],
});
