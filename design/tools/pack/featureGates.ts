/**
 * - `featureFails` · a feature's journeys walked whole, no state moved since its
 * - walk; the epic's refusals in order; every row the data names in its reads
 */
import type { ticketOf } from './packText.ts';
import * as EXPECTED_FILES from '../../guards/expectedFiles.ts';
import * as JOURNEYS from '../../sheet/cases/journeys.ts';
import * as REFUSALS from '../../sheet/contract/refusals.ts';
import * as TEST_CASES from '../../sheet/cases/testCases.ts';
import { componentsSpec } from '../../app/styles/componentsSpec.ts';

type Ticket = ReturnType<typeof ticketOf>;
type Said = (line: string) => void;

const shown = (found: unknown): string => JSON.stringify(found).slice(0, 300);

// the Feature page's scope: the epic's rows and every row the read list names
function journeysFails(
  ticket: Ticket,
  { log }: { readonly log: Said },
): readonly string[] {
  const journeys = JOURNEYS;
  const cases = TEST_CASES;
  if (!journeys || !cases)
    return [
      `${ticket.id} · journeys not checked: journeys.js or testCases.js not loaded`,
    ];
  const checked = journeys.check(
    ticket.epic,
    cases.casesOfEpic(ticket.epic, cases.named(ticket.touches || [])),
  );
  const states = checked.states ?? {
    uncovered: [],
    dangling: [],
    changed: [],
    unwalked: [],
    covered: 0,
    need: 0,
  };
  const found: readonly (readonly [string, readonly unknown[]])[] = [
    ['uncovered', checked.uncovered],
    ['dangling', checked.dangling],
    ['people', checked.people],
    ['refusal keys', checked.keys],
    ['states uncovered', states.uncovered],
    ['states gone', states.dangling],
    ['states moved since their walk', states.changed],
    ['states never walked', states.unwalked],
  ];
  log(
    `${ticket.id} · journeys checked · ${checked.covered} of ${checked.need} cases · ${states.covered} of ${states.need} states, none moved since its walk`,
  );
  return found.flatMap(([what, ids]) =>
    ids.length ? [`${ticket.id} · journeys · ${what}: ${shown(ids)}`] : [],
  );
}

// a feature ticket carries every row, endpoint, refusal and journey the data names for it
function readsFails(ticket: Ticket): readonly string[] {
  const expected = EXPECTED_FILES;
  const spec = componentsSpec;
  if (
    !expected ||
    !spec ||
    ticket.status === 'doing' ||
    ticket.status === 'done'
  )
    return [];
  const heads = (ticket.read || []).map((ref) =>
    String(ref.split(/(?<!\s)\s+—\s+/)[0]).trim(),
  );
  const lack = expected
    .reads(ticket, spec)
    .filter((one) => !heads.includes(one));
  return lack.length
    ? [
        `${ticket.id} · the data names what the read list lacks: ${lack.join(', ')}`,
      ]
    : [];
}

function featureFails(
  ticket: Ticket,
  { log }: { readonly log: Said },
): readonly string[] {
  const order = REFUSALS.orderCheck(ticket.epic) ?? [];
  const refusals = order.length
    ? [
        `${ticket.id} · refusals out of order (api-convention · RO1): ${order.join(' ‖ ')}`,
      ]
    : [];
  if (ticket.kind !== 'feature') return refusals;
  return [
    ...journeysFails(ticket, { log }),
    ...refusals,
    ...readsFails(ticket),
  ];
}

export { featureFails };
