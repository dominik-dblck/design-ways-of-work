/**
 * - `SONAR`, `SONAR_IN_TESTS` · Sonar's recommended rules, less each one turned off
 * - each rule off names its reason: `OFF` everywhere, `OFF_IN_TESTS` in tests
 */
import type { Linter } from 'eslint';
import sonarjs, { configs } from 'eslint-plugin-sonarjs';

// a rule off everywhere, by its reason: false here, a gate held twice, style no rule names, or its cost
const OFF: Readonly<Record<string, string>> = {
  'sonarjs/different-types-comparison':
    'false here: noUncheckedIndexedAccess is off, and an AST node type compares as its string',
  'sonarjs/no-empty-test-file':
    'false here: RuleTester and a flow runner declare the tests',
  'sonarjs/assertions-in-tests': 'false here: expectTypeOf asserts types',
  'sonarjs/todo-tag': 'false here: the domain names a to-do',
  'sonarjs/redundant-type-aliases':
    'false here: a named alias is a rung of the types ladder',
  'sonarjs/no-alphabetical-sort':
    "false here: code-unit order is the one wanted, never a locale's",
  'sonarjs/no-os-command-from-path':
    "false here: a script runs the developer's own tools",
  'sonarjs/void-use':
    'false here: `void` is the discard no-floating-promises asks for',
  'sonarjs/no-unused-vars': "held twice: typescript-eslint's no-unused-vars",
  'sonarjs/no-identical-functions': 'held twice: jscpd',
  'sonarjs/argument-type': 'held twice: tsc',
  'sonarjs/deprecation': "held twice: typescript-eslint's no-deprecated",
  'sonarjs/no-nested-template-literals': 'style no rule of ours names',
  'sonarjs/function-return-type': 'style no rule of ours names',
  'sonarjs/regex-complexity': 'style no rule of ours names',
  'sonarjs/no-inverted-boolean-check': 'style no rule of ours names',
  'sonarjs/use-type-alias': 'style no rule of ours names',
  'sonarjs/prefer-regexp-exec': 'style no rule of ours names',
  'sonarjs/prefer-specific-assertions': 'style no rule of ours names',
  'sonarjs/single-char-in-character-classes': 'style no rule of ours names',
  'sonarjs/concise-regex': 'style no rule of ours names',
  'sonarjs/single-character-alternation': 'style no rule of ours names',
  'sonarjs/no-nested-functions': 'style no rule of ours names',
  'sonarjs/no-redundant-assignments':
    'its cost: on one tree, 958 of 966 s of rule time over an eighth of its files linted together; 0 found on any',
  'sonarjs/no-redundant-optional':
    'waits on exactOptionalPropertyTypes in the shared tsconfig base',
};

// a rule off in tests alone: it guards production, and a test's fixtures are what it flags
const OFF_IN_TESTS: Readonly<Record<string, string>> = {
  'sonarjs/cognitive-complexity': "a test's cases are a table read row by row",
  'sonarjs/super-linear-regex': 'a test reads short planted text',
  'sonarjs/no-clear-text-protocols': "a fixture's URL is never fetched",
  'sonarjs/pseudo-random': 'random data for a test, no secret',
  'sonarjs/publicly-writable-directories':
    "a test's scratch folder under the system's temporary one",
  'sonarjs/hashing': 'a digest to compare, never a password',
};

const offOf = (table: Readonly<Record<string, string>>): Linter.RulesRecord =>
  Object.fromEntries(Object.keys(table).map((rule) => [rule, 'off']));

// the AWS CDK's rules, read off the set: no code of a way of working's repository builds AWS infrastructure
const AWS: Linter.RulesRecord = Object.fromEntries(
  Object.keys(configs.recommended.rules ?? {})
    .filter((rule) => rule.startsWith('sonarjs/aws-'))
    .map((rule) => [rule, 'off']),
);

const SONAR: Linter.Config = {
  plugins: { sonarjs },
  rules: { ...configs.recommended.rules, ...offOf(OFF), ...AWS },
};

const SONAR_IN_TESTS: Linter.RulesRecord = offOf(OFF_IN_TESTS);

export { SONAR, SONAR_IN_TESTS };
