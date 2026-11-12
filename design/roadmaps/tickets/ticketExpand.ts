/**
 * - `expand`, `expandNote`, `expandTouches` · a marker read as the data it names
 */
import { componentsSpec as SPEC } from '../../app/styles/componentsSpec.ts';
import { reads, expectedText } from '../../guards/expectedFiles.ts';
import { criteria } from '../../sheet/cases/journeys.ts';
import type { Ticket } from './ticketsTypes.ts';

const JOURNEYS = /^\{journeys:(E\d\d)(?:@(T-E\d\d-\d\d))?\}$/;

// a journeys marker is that epic's journeys, one criterion each
function expand(
  acceptance: readonly string[] | null | undefined,
): readonly string[] {
  return (acceptance ?? []).flatMap((criterion) => {
    const found = JOURNEYS.exec(criterion);
    return found ? criteria(String(found[1]), found[2]) : [criterion];
  });
}

// {expected-files} in a note is the files the run touches, read off the data at load
function expandNote(ticket: Ticket): string {
  if (!ticket.note || ticket.note.indexOf('{expected-files}') < 0)
    return ticket.note;
  return ticket.note.split('{expected-files}').join(expectedText(ticket, SPEC));
}

// {read:derived} in a row's touches is the pointers the data names, each kept once
function expandTouches(ticket: Ticket): readonly string[] {
  const touches = ticket.touches;
  if (!touches.includes('{read:derived}')) return touches;
  const head = (pointer: string): string =>
    pointer.split(/\s—\s/)[0]?.trim() ?? '';
  const have = touches
    .filter((pointer) => pointer !== '{read:derived}')
    .map(head);
  const derived = reads(ticket, SPEC).filter(
    (pointer) => !have.includes(pointer),
  );
  return touches.flatMap((pointer) =>
    pointer === '{read:derived}' ? derived : [pointer],
  );
}

export { expand, expandNote, expandTouches };
