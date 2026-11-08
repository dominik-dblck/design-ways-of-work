/**
 * - `endpointsOf`, `specRowsOf` · the endpoints and spec rows a ticket's run touches
 */
import type { SpecRow } from '../spec-check.ts';
import { named } from '../../sheet/cases/test-cases.ts';
import type { ReadEndpoint } from '../../sheet/cases/test-cases.ts';
import type { ComponentsSpec, TicketRow } from './expectedFilesTypes.ts';

const TIERS = ['atoms', 'molecules', 'organisms'] as const;

function endpointsOf(
  ticket: TicketRow,
  rows: readonly ReadEndpoint[],
): ReadEndpoint[] {
  const names = named(ticket.touches || ticket.read);
  return rows.filter(
    (row) =>
      row.epic === ticket.epic ||
      names.includes(row.id) ||
      (row.cases ?? []).some((testCase) => testCase[3] === ticket.epic),
  );
}

function specRowsOf(spec: ComponentsSpec): SpecRow[] {
  return TIERS.flatMap((tier) => spec[tier] ?? []);
}

export { endpointsOf, specRowsOf };
