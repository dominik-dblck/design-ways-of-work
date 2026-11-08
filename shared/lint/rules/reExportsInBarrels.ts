/**
 * - `reExportsInBarrels` · `export … from` stands only in a barrel or an entry
 * - a barrel re-exports its own folder, never another barrel
 */
import type { TSESTree } from '@typescript-eslint/utils';
import path from 'node:path';
import { createRule, matchesAny, moduleOf, pathOf } from './ruleKit.ts';
import type { Context } from './ruleKit.ts';

type Stray = 'outside' | 'away' | 'barrel';

function strayOf(
  context: Context,
  {
    specifier,
    barrels,
  }: { readonly specifier: string; readonly barrels: readonly string[] },
): Stray | null {
  const file = pathOf(context);
  if (!matchesAny(file, barrels)) return 'outside';
  const module = moduleOf(context, specifier);
  if (module === null || !module.startsWith(`${path.posix.dirname(file)}/`))
    return 'away';
  return matchesAny(module, barrels) ? 'barrel' : null;
}

const reExportsInBarrels = createRule<
  [{ readonly barrels: readonly string[] }],
  Stray
>({
  name: 're-exports-in-barrels',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'A re-export stands in a barrel, of its own folder',
    },
    messages: {
      outside:
        '`export … from {{specifier}}` stands only in a barrel (docs/rules/one-home.md).',
      away: 'A barrel re-exports its own folder: {{specifier}} is outside it (docs/rules/one-home.md).',
      barrel:
        'A barrel re-exports its own folder, never another barrel: {{specifier}} (docs/rules/one-home.md).',
    },
    schema: [
      {
        type: 'object',
        properties: { barrels: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ barrels: [] }],
  create(context, [{ barrels }]) {
    const check = (
      node: TSESTree.ExportAllDeclaration | TSESTree.ExportNamedDeclaration,
    ): void => {
      if (node.source === null) return;
      const specifier = node.source.value;
      const stray = strayOf(context, { specifier, barrels });
      if (stray !== null)
        context.report({ node, messageId: stray, data: { specifier } });
    };
    return { ExportAllDeclaration: check, ExportNamedDeclaration: check };
  },
});

export { reExportsInBarrels };
