/**
 * - `reads` · a pack's read list: rows, refusals, events, types, journeys, specs
 */
import type { ComponentsSpec, ExpectedTicket } from './expectedFilesTypes.ts';
import type { ReadEndpoint } from '../../sheet/cases/test-cases.ts';
import { endpointsOf, specRowsOf } from './ticketEndpoints.ts';
import { modelTypes } from '../../sheet/contract/block-model.ts';
import * as COMMANDS from '../../sheet/contract/commands.ts';
import * as JOURNEYS from '../../sheet/cases/journeys.ts';
import * as QUERIES from '../../sheet/contract/queries.ts';

const ALWAYS = [
  'test-cases.ts',
  'api-convention.md',
  'shared-cases.ts',
  'field-kinds.ts',
];

// a type named in a body or an answer, and every type its own src names, transitively
function modelTypesOf(texts: readonly string[]): string[] {
  const typed = modelTypes.filter((type) => type.src);
  const byName = new Map(typed.map((type) => [type.name, type]));
  const queue: string[] = [];
  const scan = (text: string): void => {
    for (const type of typed) {
      if (
        !queue.includes(type.name) &&
        new RegExp(`\\b${type.name}\\b`).test(text)
      ) {
        queue.push(type.name);
      }
    }
  };
  texts.forEach(scan);
  // a name found on the way is read in its turn: the loop sees the queue grow
  for (const name of queue) {
    scan([byName.get(name)?.src ?? []].flat().join(' '));
  }
  return queue;
}

interface EndpointFacts {
  readonly ids: string[];
  readonly keys: string[];
  readonly emits: string[];
  readonly texts: string[];
  mention: boolean;
  contentManagerOnly: boolean;
}

function pushNew(into: string[], incoming: readonly string[]): void {
  for (const file of incoming) if (!into.includes(file)) into.push(file);
}

function takeRow(
  facts: EndpointFacts,
  { row, file }: { readonly row: ReadEndpoint; readonly file: string },
): void {
  facts.ids.push(`${file} · ${row.id}`);
  pushNew(facts.keys, row.refuses ?? []);
  pushNew(facts.emits, row.emits ?? []);
  facts.mention ||= Boolean(row.mention);
  facts.texts.push(`${String(row.body || '')} ${String(row.answer || '')}`);
  const actor = row.actor ?? [];
  facts.contentManagerOnly ||= actor.length === 1 && actor[0] === 'cm';
}

// the events the epic's commands emit, their refusals, their mention table and the text of their bodies and answers
function factsOf(ticket: ExpectedTicket): EndpointFacts {
  const facts: EndpointFacts = {
    ids: [],
    keys: [],
    emits: [],
    texts: [],
    mention: false,
    contentManagerOnly: false,
  };
  const sources = [
    [COMMANDS.all, 'commands.ts'],
    [QUERIES.all, 'queries.ts'],
  ] as const;
  for (const [rows, file] of sources)
    for (const row of endpointsOf(ticket, rows)) takeRow(facts, { row, file });
  if (facts.contentManagerOnly)
    pushNew(facts.keys, ['actor.not_content_manager']);
  return facts;
}

function reads(ticket: ExpectedTicket, spec: ComponentsSpec): string[] {
  const facts = factsOf(ticket);
  const journeys = JOURNEYS.journeysOfEpic(ticket.epic);
  const specReads = specRowsOf(spec)
    .filter(
      (row) =>
        row.ownedBy === ticket.id || (row.changedIn ?? []).includes(ticket.id),
    )
    .map((row) => `components.spec.json · ${row.id}`);
  const all = [
    ...facts.ids,
    ...facts.keys.map((key) => `refusals.ts · ${key}`),
    ...facts.emits.map((key) => `events.ts · ${key}`),
    ...(facts.mention ? ['events.ts · TARGET'] : []),
    ...modelTypesOf(facts.texts).map((name) => `block-model.json · ${name}`),
    ...journeys.map(
      (journey) => `journeys.ts · ${journey.id} (${ticket.epic})`,
    ),
    ...specReads,
    ...ALWAYS,
  ];
  return all.filter((file, index) => file && all.indexOf(file) === index);
}

export { reads };
