/**
 * - `scopeFindings`, `ownerFindings`, `changedFindings` · a row's scope and tickets
 */
import { TICKET } from './rowChecks.ts';
import type { TieredRow } from './specCheckTypes.ts';
import * as TICKETS from '../../roadmaps/tickets.ts';

function onBoard(id: string): boolean {
  return Boolean(TICKETS.byId[id]);
}

// a row scoped to an organism is named after it: '<organism>-…'
function scopeFindings(
  row: TieredRow,
  organisms: ReadonlySet<string>,
): string[] {
  if (!row.scope)
    return [`9 · ${row.id} has no scope — global or an organism id`];
  if (row.scope === 'global') return [];
  if (!organisms.has(row.scope))
    return [
      `9 · ${row.id} scope "${row.scope}" is neither global nor an organism id`,
    ];
  if (row.id !== row.scope && row.id.indexOf(`${row.scope}-`) !== 0) {
    return [
      `9 · ${row.id} is scoped to ${row.scope} and its id does not start with ${row.scope}-`,
    ];
  }
  return [];
}

// every row names the ticket that builds it, a ticket on the board
function ownerFindings(row: TieredRow): string[] {
  if (!TICKET.test(row.ownedBy || ''))
    return [`10 · ${row.id} ownedBy "${row.ownedBy || ''}" is not a ticket id`];
  return onBoard(row.ownedBy ?? '')
    ? []
    : [`10 · ${row.id} ownedBy ${row.ownedBy} is not on the board`];
}

// optional; each entry a ticket id on the board, never the row's own ownedBy
function changedFindings(row: TieredRow): string[] {
  const changed: unknown = row.changedIn;
  if (changed === undefined) return [];
  if (!Array.isArray(changed) || !changed.length)
    return [`11 · ${row.id} changedIn is not a list of ticket ids`];
  return changed.flatMap((id: unknown) => {
    if (typeof id !== 'string' || !TICKET.test(id))
      return [`11 · ${row.id} changedIn "${String(id)}" is not a ticket id`];
    if (id === row.ownedBy) return [`11 · ${row.id} changedIn repeats ownedBy`];
    return onBoard(id)
      ? []
      : [`11 · ${row.id} changedIn ${id} is not on the board`];
  });
}

export { changedFindings, ownerFindings, scopeFindings };
