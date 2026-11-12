/**
 * - `receiptFlags` · what a receipt leaves unsaid, or a load error once it is done
 * - `dueAt`, `caveatsOf` · what others left for a ticket, what it left that holds
 */
import { TICKET_BY_ID, CAVEATS, RECEIPTS } from './ticketList.ts';
import { STATUS } from './ticketStatus.ts';
import type { TicketReceipt, Ticket } from './ticketsTypes.ts';

// STATUS and RECEIPTS are written in the same edit, or the file does not load
function loadErrors(ticket: Ticket, receipt: TicketReceipt | undefined): void {
  if (ticket.status !== 'done') return;
  if (!receipt)
    throw new Error(
      `tickets.js · ${ticket.id} is done and has no receipt — write RECEIPTS[${ticket.id}] in the same edit as STATUS`,
    );
  if (!receipt.at || !/^\d{4}-\d{2}-\d{2}$/.test(receipt.at))
    throw new Error(
      `tickets.js · ${ticket.id} is done and its receipt has no date — at is the day the report landed, YYYY-MM-DD`,
    );
}

// short of its criteria: the retired and the measured ones are withdrawn or answered, not unproven
function shortLines(receipt: TicketReceipt): readonly string[] {
  const retired = receipt.retired ?? [];
  const measured = receipt.measured ?? [];
  return [
    ...(retired.length
      ? [
          `${retired.length} retired by a later ticket · ${retired.join(', ')} · withdrawn, not unproven`,
        ]
      : []),
    ...(measured.length
      ? [
          `${measured.length} answered by a dated measurement, not a test · c${measured.join(', c')} (rule:every-test-seen-red)`,
        ]
      : []),
  ];
}

// a measured criterion is answered by a dated measurement: neither unproven nor extra
function greenLines(receipt: TicketReceipt): readonly string[] {
  const { tests, criteria } = receipt;
  if (tests === null || tests === undefined)
    return ['the report did not state a green total'];
  if (!criteria) return [];
  const accounted =
    tests + (receipt.retired ?? []).length + (receipt.measured ?? []).length;
  if (accounted < criteria)
    return [
      `${tests} green against ${criteria} criteria · at one test per criterion, ${criteria - tests - (receipt.retired ?? []).length} are unproven`,
    ];
  if (tests < criteria) return shortLines(receipt);
  if (tests > criteria)
    return [
      `${tests} green against ${criteria} criteria · the extra ${tests - criteria} are tests no criterion asked for, which is a decision rather than a fault`,
    ];
  return [];
}

function criteriaLine(
  ticket: Ticket,
  receipt: TicketReceipt,
): readonly string[] {
  const held = ticket.acceptance.length;
  if (receipt.criteria === null || receipt.criteria === undefined)
    return [
      `the report did not say what it was built against · the ticket holds ${held}, and whether all of them were read is unknown`,
    ];
  if (receipt.criteria !== held)
    return [
      `built against ${receipt.criteria} criteria · the ticket now holds ${held} · the ${held - receipt.criteria} added since were not built to`,
    ];
  return [];
}

function coverageLines({
  uncovered,
  skipped,
}: TicketReceipt): readonly string[] {
  const named =
    uncovered === null || uncovered === undefined
      ? [
          'the report did not say which criteria have no test named against them',
        ]
      : [];
  const open = uncovered?.length
    ? [`no test named against: ${uncovered.join(' · ')}`]
    : [];
  const declared = skipped?.length
    ? [`declared and not exercised: ${skipped.join(' · ')}`]
    : [];
  return [...named, ...open, ...declared];
}

function receiptFlags(ticket: Ticket): readonly string[] {
  const receipt = RECEIPTS[ticket.id];
  loadErrors(ticket, receipt);
  if (ticket.status !== 'done' && ticket.status !== 'doing')
    return receipt
      ? [
          'a receipt exists for a ticket that is not in hand · one of the two is wrong',
        ]
      : [];
  if (!receipt) return ['no receipt yet · doing, the report has not landed'];
  return [
    ...greenLines(receipt),
    ...criteriaLine(ticket, receipt),
    ...coverageLines(receipt),
  ];
}

const settled = (id: string): boolean =>
  STATUS[id] === 'done' || STATUS[id] === 'dropped';

// what other tickets left for this one, the same table read backwards; empty once it is done
function dueAt(
  id: string,
): readonly { readonly from: string; readonly text: string }[] {
  if (!TICKET_BY_ID[id])
    throw new Error(`tickets.js · dueAt · unknown ticket ${id}`);
  if (settled(id)) return [];
  return Object.entries(CAVEATS).flatMap(([from, caveats]) =>
    caveats
      .filter((caveat) => caveat.until === id)
      .map((caveat) => ({ from, text: caveat.text })),
  );
}

// a caveat holds until the ticket that answers it is done
function caveatsOf(ticket: Ticket): readonly string[] {
  return (CAVEATS[ticket.id] ?? [])
    .filter((caveat) => {
      if (!caveat.until) return true;
      if (!TICKET_BY_ID[caveat.until])
        throw new Error(
          `tickets.js · ${ticket.id} has a caveat until unknown ${caveat.until}`,
        );
      return !settled(caveat.until);
    })
    .map((caveat) => caveat.text);
}

export { caveatsOf, dueAt, receiptFlags };
