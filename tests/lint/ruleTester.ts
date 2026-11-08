/**
 * - `ruleTester` · ESLint's RuleTester on vitest, each case parsed alone
 * - `typedTester`, `FIXTURES` · on the fixtures' one program, for a typed rule
 */
import { RuleTester } from '@typescript-eslint/rule-tester';
import path from 'node:path';
import { afterAll, describe, it } from 'vitest';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const FIXTURES = path.join(import.meta.dirname, 'fixtures');

const ruleTester = new RuleTester();

const typedTester = new RuleTester({
  languageOptions: {
    parserOptions: { project: './tsconfig.json', tsconfigRootDir: FIXTURES },
  },
});

export { FIXTURES, ruleTester, typedTester };
