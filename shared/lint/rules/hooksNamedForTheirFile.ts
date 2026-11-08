/**
 * - `hooksNamedForTheirFile` · a hook is its file's name
 * - a query hook is `…Query`, a mutation `…Mutation`; a provider's hooks are its own
 */
import type { TSESTree } from '@typescript-eslint/utils';
import path from 'node:path';
import { declaredNamesOf } from '../exportedNames.ts';
import { createRule, syntaxOf } from './ruleKit.ts';

const A_HOOK = /^use[A-Z]/;
// a call into TanStack Query's reading or writing hooks
const A_QUERY_HOOK = /^use(?:Suspense)?(?:Query|Queries|InfiniteQuery)$/;
const A_MUTATION_HOOK = /^useMutation$/;

type Shortfall = 'stray' | 'empty' | 'query' | 'mutation';

const calleeOf = (node: TSESTree.CallExpression): string | null => {
  const { callee } = node;
  if (callee.type === 'Identifier') return callee.name;
  return callee.type === 'MemberExpression' &&
    callee.property.type === 'Identifier'
    ? callee.property.name
    : null;
};

const hooksNamedForTheirFile = createRule<[], Shortfall>({
  name: 'hooks-named-for-their-file',
  meta: {
    type: 'suggestion',
    docs: { description: 'A hook is its file’s name' },
    messages: {
      stray:
        '`{{hook}}` is not its file’s name: a hook is `use{What}.ts(x)`, one a file (docs/rules/names.md).',
      empty: 'A `use…` file exports its hook (docs/rules/names.md).',
      query:
        'A file that reads a query is `use{What}Query` (docs/rules/names.md).',
      mutation:
        'A file that writes a mutation is `use{What}Mutation` (docs/rules/names.md).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const stem = path.basename(context.filename).replace(/\.tsx?$/, '');
    const called = new Set<string>();
    const at = { line: 1, column: 0 };
    return {
      CallExpression(node) {
        const name = calleeOf(node);
        if (name !== null) called.add(name);
      },
      'Program:exit'() {
        // a re-export declares nothing: a barrel passes a provider's hook on
        const hooks = declaredNamesOf(syntaxOf(context))
          .map((name) => name.text)
          .filter((name) => A_HOOK.test(name));
        if (!stem.endsWith('Provider'))
          for (const hook of hooks.filter((one) => one !== stem))
            context.report({ loc: at, messageId: 'stray', data: { hook } });
        if (A_HOOK.test(stem) && hooks.length === 0)
          context.report({ loc: at, messageId: 'empty' });
        const calls = [...called];
        if (
          calls.some((one) => A_QUERY_HOOK.test(one)) &&
          !stem.endsWith('Query')
        )
          context.report({ loc: at, messageId: 'query' });
        if (
          calls.some((one) => A_MUTATION_HOOK.test(one)) &&
          !stem.endsWith('Mutation')
        )
          context.report({ loc: at, messageId: 'mutation' });
      },
    };
  },
});

export { hooksNamedForTheirFile };
