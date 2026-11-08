import importX from 'eslint-plugin-import-x';
import path from 'node:path';
import { eslintConfig } from '../../shared/lint/eslintConfig.ts';
import { FIXTURES, ruleTester } from './ruleTester.ts';
import { scopeAt } from './scopeAt.ts';

// the shared config's own settings, on the fixtures' tsconfig and its alias
const settings = eslintConfig(scopeAt(FIXTURES)).find(
  (one) => one.settings?.['import-x/resolver-next'] !== undefined,
)?.settings;

ruleTester.run('an import read through its alias', importX.rules['no-cycle'], {
  valid: [
    {
      name: 'a file outside the cycle',
      filename: path.join(FIXTURES, 'alias/alone.ts'),
      code: "import { B } from '@fixtures/alias/cycleB.ts';",
      settings,
    },
  ],
  invalid: [
    {
      name: 'a cycle closed through the alias',
      filename: path.join(FIXTURES, 'alias/cycleA.ts'),
      code: "import { B } from '@fixtures/alias/cycleB.ts';",
      settings,
      errors: [{ messageId: 'cycle' }],
    },
  ],
});
