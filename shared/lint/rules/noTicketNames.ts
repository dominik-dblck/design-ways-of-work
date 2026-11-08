/**
 * - `noTicketNames` · no identifier names a ticket, a date or another epic
 * - a name imported from a part named for an epic keeps that epic
 */
import { epicOfFile, MONTHS } from '../traces.ts';
import { createRule } from './ruleKit.ts';

const A_TICKET = /T_?E\d{2}_?\d{2}/i;
const AN_EPIC = /(?<![A-Za-z0-9])E\d{2}(?!\d)/;
const A_DATE = new RegExp(`\\d{1,2}_?(?:${MONTHS})\\b`);

const noTicketNames = createRule({
  name: 'no-ticket-names',
  meta: {
    type: 'suggestion',
    docs: { description: 'An identifier names no ticket, date or other epic' },
    messages: {
      trace:
        '`{{name}}` names a ticket, a date or another epic: a name says what it holds (docs/rules/names.md).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const own = epicOfFile(context.filename);
    const imported = new Map<string, string>();
    const seen = new Set<string>();
    return {
      ImportDeclaration(node) {
        const from = epicOfFile(node.source.value);
        if (from !== null)
          for (const one of node.specifiers)
            if (one.type === 'ImportSpecifier')
              imported.set(one.local.name, from);
      },
      Identifier(node) {
        const { name } = node;
        const epic = AN_EPIC.exec(name)?.[0];
        const isTraced =
          A_TICKET.test(name) ||
          A_DATE.test(name) ||
          (epic !== undefined && epic !== own && epic !== imported.get(name));
        if (!isTraced || seen.has(name)) return;
        seen.add(name);
        context.report({ node, messageId: 'trace', data: { name } });
      },
    };
  },
});

export { noTicketNames };
