/**
 * - `timeIsMovedNotWaited` · a test moves time with fake timers, never waits it out
 * - `NamedWait` · a wait a scope names: a declaration its file keeps unexported
 */
import type { TSESTree } from '@typescript-eslint/utils';
import { createRule, pathOf } from './ruleKit.ts';

interface NamedWait {
  readonly file: string;
  readonly name: string;
  readonly why: string;
}

// a promise its timer settles: the executor hands `setTimeout` its settle, or a call of it; a deadline rejects
const SETTLED_BY_A_TIMER =
  "CallExpression[callee.name='setTimeout']:matches([arguments.0.type='Identifier'][arguments.0.name!=/^reject/], [arguments.0.body.type='CallExpression'][arguments.0.body.callee.name!=/^reject/])";
const A_WAIT = [
  `NewExpression[callee.name='Promise'] > :function > ${SETTLED_BY_A_TIMER}`,
  `NewExpression[callee.name='Promise'] > :function > BlockStatement > ExpressionStatement > ${SETTLED_BY_A_TIMER}`,
  "CallExpression[callee.property.name='waitForTimeout']",
].join(', ');
const TIMERS =
  'ImportDeclaration[source.value=/^(?:node:)?timers\\/promises$/]';

type Holder = TSESTree.VariableDeclarator | TSESTree.FunctionDeclaration;

// the nearest declaration a wait sits in
function holderOf(node: TSESTree.Node): Holder | null {
  if (node.type === 'VariableDeclarator') return node;
  if (node.type === 'FunctionDeclaration' && node.id !== null) return node;
  return node.type === 'Program' ? null : holderOf(node.parent);
}

const nameOf = (holder: Holder): string =>
  holder.id?.type === 'Identifier' ? holder.id.name : '';

// exported where it is declared, or by name in an export list
function isExported(holder: Holder, program: TSESTree.Program): boolean {
  const statement =
    holder.type === 'VariableDeclarator' ? holder.parent : holder;
  return (
    statement.parent?.type === 'ExportNamedDeclaration' ||
    program.body.some(
      (one) =>
        one.type === 'ExportNamedDeclaration' &&
        one.specifiers.some(
          (specifier) =>
            specifier.local.type === 'Identifier' &&
            specifier.local.name === nameOf(holder),
        ),
    )
  );
}

const timeIsMovedNotWaited = createRule<
  [{ readonly named: readonly NamedWait[] }],
  'waited' | 'timers'
>({
  name: 'time-is-moved-not-waited',
  meta: {
    type: 'problem',
    docs: { description: 'A test moves time, never waits it out' },
    messages: {
      waited:
        'A test moves time with fake timers (`vi.useFakeTimers`, `page.clock`), never waits it out; a race against a real service is a wait its scope names, kept in its file (docs/rules/tests.md).',
      timers:
        'A test moves time with fake timers (`vi.useFakeTimers`, `page.clock`): timers as promises wait it out (docs/rules/tests.md).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          named: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                file: { type: 'string' },
                name: { type: 'string' },
                why: { type: 'string' },
              },
              required: ['file', 'name', 'why'],
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ named: [] }],
  create(context, [{ named }]) {
    const file = pathOf(context);
    const kept = new Set(
      named.filter((one) => one.file === file).map((one) => one.name),
    );
    return {
      [A_WAIT](node: TSESTree.Node) {
        const holder = holderOf(node);
        const isNamed =
          holder !== null &&
          kept.has(nameOf(holder)) &&
          !isExported(holder, context.sourceCode.ast);
        if (!isNamed) context.report({ node, messageId: 'waited' });
      },
      [TIMERS](node: TSESTree.ImportDeclaration) {
        context.report({ node, messageId: 'timers' });
      },
    };
  },
});

export { timeIsMovedNotWaited };
export type { NamedWait };
