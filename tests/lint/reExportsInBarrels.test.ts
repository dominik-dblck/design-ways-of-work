import { reExportsInBarrels } from '../../shared/lint/rules/reExportsInBarrels.ts';
import { ruleTester } from './ruleTester.ts';

const BARRELS = [{ barrels: ['**/index.ts', 'sheet/words.ts'] }] as const;

ruleTester.run('re-exports-in-barrels', reExportsInBarrels, {
  valid: [
    {
      name: 'a barrel re-exports its own folder',
      filename: 'app/planted/index.ts',
      code: "export { rows } from './rows.ts';\nexport type { Row } from './rowTypes.ts';",
      options: BARRELS,
    },
    {
      name: "an entry passes its part's names on",
      filename: 'sheet/words.ts',
      code: "export { SCREEN_WORDS } from './words/screenWords.ts';",
      options: BARRELS,
    },
    {
      name: 'a file exports its own',
      filename: 'app/planted/rows.ts',
      code: 'const rows = [];\nexport { rows };',
      options: BARRELS,
    },
  ],
  invalid: [
    {
      name: 'a re-export outside a barrel',
      filename: 'app/planted/rows.ts',
      code: "export { other } from './other.ts';",
      options: BARRELS,
      errors: [{ messageId: 'outside' }],
    },
    {
      name: 'a barrel reaching out of its folder, and into another barrel',
      filename: 'app/planted/index.ts',
      code: "export { far } from '../far/far.ts';\nexport * from './inner/index.ts';",
      options: BARRELS,
      errors: [{ messageId: 'away' }, { messageId: 'barrel' }],
    },
  ],
});
