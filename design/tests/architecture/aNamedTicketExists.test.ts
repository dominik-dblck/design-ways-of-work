/**
 * - `roadmaps/ids.ts` in prose: a ticket the live text names is one the board holds
 * - the live text: an open ticket's fields, the sheet, the documents and the skills
 */
import { describe, expect, it } from 'vitest';
import { all as allTickets } from '../../roadmaps/tickets.ts';
import { textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const A_TICKET = /\bT-E[0-9A-Z]+-\d{2}\b/g;
// a template's ticket, `T-EXX-00`, names no ticket
const A_TEMPLATE = /XX/;
// a closed ticket, a notebook and a decision keep the words of their day
const CLOSED = new Set(['done', 'dropped']);
const LIVE = ['sheet', 'docs/documents', 'docs/skills'];

const namedIn = (text: string): readonly string[] =>
  [...text.matchAll(A_TICKET)]
    .map(([id]) => id)
    .filter((id) => !A_TEMPLATE.test(id));

const faultsIn = (
  sources: readonly Source[],
  ids: ReadonlySet<string>,
): readonly string[] =>
  sources.flatMap((source) =>
    namedIn(source.text)
      .filter((id) => !ids.has(id))
      .map((id) => `${source.path} · ${id}`),
  );

describe('a named ticket exists', () => {
  const tickets = allTickets();
  const ids = new Set(tickets.map((ticket) => ticket.id));

  it('reads each ticket a text names, a template aside', () => {
    expect(namedIn('T-E02-03 and `T-E10-00`, never T-EXX-00')).toEqual([
      'T-E02-03',
      'T-E10-00',
    ]);
    const planted = ['T-E', '99-01'].join('');
    expect(faultsIn([{ path: 'planted.ts', text: planted }], ids)).toEqual([
      `planted.ts · ${planted}`,
    ]);
  });

  it('every ticket an open ticket names is on the board', () => {
    const open = tickets
      .filter((ticket) => !CLOSED.has(ticket.status))
      .map((ticket) => ({
        path: ticket.id,
        text: JSON.stringify([
          ticket.acceptance,
          ticket.touches,
          ticket.note,
          ticket.why,
        ]),
      }));
    expect(open.length).toBeGreaterThan(0);
    expect(faultsIn(open, ids)).toEqual([]);
  });

  it('every ticket the sheet, the documents and the skills name is on the board', () => {
    const live = LIVE.flatMap((root) => textsUnder(root, ['.ts']));
    expect(faultsIn(live, ids)).toEqual([]);
  });
});
