/**
 * - `partsServeTheirEntry` · a part is read by its entry and siblings, no other
 */
import type { TSESTree } from '@typescript-eslint/utils';
import { createRule, moduleOf, pathOf } from './ruleKit.ts';

type Owners = Readonly<Record<string, string>>;

const partsServeTheirEntry = createRule<[{ readonly owners: Owners }], 'part'>({
  name: 'parts-serve-their-entry',
  meta: {
    type: 'problem',
    docs: { description: 'A part is read by its entry and its siblings' },
    messages: {
      part: '`{{part}}` serves `{{entry}}`: another entry reads it through its entry (docs/rules/responsibility.md).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          owners: { type: 'object', additionalProperties: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ owners: {} }],
  create(context, [{ owners }]) {
    const file = pathOf(context);
    // an entry is its own owner, and so is a file no entry owns
    const mine = owners[file] ?? file;
    const check = (node: {
      readonly source: TSESTree.StringLiteral | null;
    }): void => {
      if (node.source === null) return;
      const part = moduleOf(context, node.source.value);
      const entry = part === null ? undefined : owners[part];
      if (part !== null && entry !== undefined && entry !== mine)
        context.report({
          node: node.source,
          messageId: 'part',
          data: { part, entry },
        });
    };
    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
      ExportAllDeclaration: check,
    };
  },
});

export { partsServeTheirEntry };
