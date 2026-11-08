/**
 * - `ruleTester` · ESLint's RuleTester on vitest, each case's TypeScript parsed alone
 * - `typedTester`, `FIXTURES` · one on the fixtures' program, for a rule reading every file
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
