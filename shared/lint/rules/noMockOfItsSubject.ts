/**
 * - `noMockOfItsSubject` · a test never mocks the module its name says it tests
 */
import type { TSESTree } from '@typescript-eslint/utils';
import path from 'node:path';
import { createRule } from './ruleKit.ts';

const A_TEST = /(?:\.[A-Za-z]+)?\.test\.tsx?$/;

// a folder's module is its `index`: the folder's name is the module's
function moduleOf(specifier: string): string {
  const base = path.posix.basename(specifier).replace(/\.(?:tsx?|mjs)$/, '');
  return base === 'index'
    ? path.posix.basename(path.posix.dirname(specifier))
    : base;
}

const noMockOfItsSubject = createRule<[], 'subject'>({
  name: 'no-mock-of-its-subject',
  meta: {
    type: 'problem',
    docs: { description: 'A test never mocks the module under test' },
    messages: {
      subject:
        'A test never mocks the module under test: {{specifier}} is what its name says it tests (docs/rules/tests.md).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const base = path.posix.basename(context.filename);
    if (!A_TEST.test(base)) return {};
    const subject = base.replace(A_TEST, '');
    return {
      "CallExpression[callee.object.name='vi'][callee.property.name=/^(?:mock|doMock)$/]"(
        node: TSESTree.CallExpression,
      ) {
        const [first] = node.arguments;
        if (first?.type !== 'Literal' || typeof first.value !== 'string')
          return;
        if (moduleOf(first.value) === subject)
          context.report({
            node: first,
            messageId: 'subject',
            data: { specifier: first.value },
          });
      },
    };
  },
});

export { noMockOfItsSubject };
