/**
 * - `run`, `report` · the ticket checklist's mechanical half, by script
 * - a ticket with findings is not READY, and the pack generator refuses its pack
 * - a line no pattern reads stays the reader's
 */
import {
  criterionFindings,
  edgeFindings,
  whyFindings,
} from './refine-check/criterionFindings.ts';
import type {
  Finding,
  SheetEdge,
  SheetTicket,
  SheetTickets,
} from './refine-check/refineCheckTypes.ts';
import {
  closingFindings,
  journeyFindings,
  notebookFindings,
  routeFindings,
} from './refine-check/sheetFindings.ts';
import * as EDGES from '../roadmaps/edges.ts';
import * as TICKETS from '../roadmaps/tickets.ts';

const FOLDED = /^FOLDED into (T-E\d\d-\d\d)/;

// a folded ticket is refined where it was folded: read that one, and fail only if it is missing or not clean
function foldedFindings(tickets: SheetTickets, into: string): Finding[] {
  if (!tickets.byId[into]) {
    return [
      {
        rule: 'ticket-id-is-a-name',
        where: 'c1',
        text: `folded into ${into}, which is not on the board`,
      },
    ];
  }
  return run(into).map((finding) => ({
    ...finding,
    where: `${into} · ${finding.where}`,
  }));
}

// the criteria as the pack prints them: the journeys expanded
function ticketOf(tickets: SheetTickets, id: string): SheetTicket {
  const row = tickets.byId[id];
  if (!row) throw new Error(`refine-check · unknown ticket ${id}`);
  return tickets.expand
    ? { ...row, acceptance: tickets.expand(row.acceptance) }
    : row;
}

function findingsOf(
  ticket: SheetTicket,
  edges: readonly SheetEdge[],
): Finding[] {
  const read = ticket.touches;
  const isPlaceholder = /^PLACEHOLDER/.test(ticket.acceptance[0] || '');
  return [
    ...criterionFindings(ticket, { edges, placeholder: isPlaceholder }),
    ...edges.flatMap((edge, index) =>
      edgeFindings(edge, {
        where: `E${index + 1}`,
        criteria: ticket.acceptance.length,
      }),
    ),
    ...whyFindings(ticket),
    ...(isPlaceholder ? [] : routeFindings(ticket)),
    ...journeyFindings(ticket),
    ...notebookFindings(ticket, { edges, read }),
    ...closingFindings(ticket, read),
  ];
}

function run(id: string): Finding[] {
  const ticket = ticketOf(TICKETS, id);
  const fold = FOLDED.exec(ticket.acceptance[0] || '')?.[1];
  if (fold !== undefined) return foldedFindings(TICKETS, fold);
  return findingsOf(ticket, EDGES.byTicket[id] ?? []);
}

function report(ids: readonly string[]): string {
  return ids
    .flatMap((id) => {
      const findings = run(id);
      return [
        `${id} · ${findings.length ? `${findings.length} findings` : 'clean'}`,
        ...findings.map(
          (finding) => `  ${finding.rule} · ${finding.where} · ${finding.text}`,
        ),
      ];
    })
    .join('\n');
}

export { report, run };
export type { Finding };
