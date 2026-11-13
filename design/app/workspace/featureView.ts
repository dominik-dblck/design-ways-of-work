/**
 * - `features`, `firstEpic`, `featureOf` · the tabs, the one opened, one epic
 * - `featureOf` takes the product's view from the page that runs it
 * - `featureWords` · the page's own words; the view's types
 */
import { all as TICKETS } from '../../roadmaps/tickets.ts';
import { byId as EPICS } from '../../roadmaps/backlog.ts';
import { casesOfEpic, flat, named } from '../../sheet/cases/testCases.ts';
import { listed, ticketDetailOf } from './boardView.ts';
import { endpointsOf, piecesOf } from './contractView.ts';
import {
  caseGroupsOf,
  caseKindsOf,
  criterionGroupsOf,
} from './featureView/featureCases.ts';
import { coverOf } from './featureView/featureCover.ts';
import { journeysOf } from './featureView/featureJourneys.ts';
import {
  combinationsOf,
  countLine,
  statesNamed,
} from './featureView/featureCombinations.ts';
import { notesViewOf } from './featureView/featureNotes.ts';
import { FEATURE_WORDS } from './featureView/featureWords.ts';
import type { ProductFields, ProductView } from '../../tools/productTypes.ts';
import type { FeatureTab, FeatureView } from './featureView/featureTypes.ts';
import type { Section } from './boardView.ts';

// every epic has its page, in the board list's order, its status the board's column
function features(): readonly FeatureTab[] {
  return listed().map((card) => ({ epic: card.id, status: card.column }));
}

// the page opens on the epic in hand, else the first not done yet
function firstEpic(): string | null {
  const all = features();
  const opened =
    all.find((one) => one.status === 'doing') ??
    all.find((one) => one.status !== 'done') ??
    all.at(-1);
  return opened?.epic ?? null;
}

const readOf = (
  ticket: ReturnType<typeof TICKETS>[number] | undefined,
): readonly string[] => ticket?.read ?? [];

type FieldsView = Pick<
  FeatureView,
  'docTypes' | 'fieldKinds' | 'fieldOptions' | 'fieldsCode'
>;

// the fields the product hands in for the epic, its code split into lines to draw
function fieldsView(fields: ProductFields | undefined): FieldsView {
  if (!fields)
    return { fieldKinds: [], fieldOptions: [], fieldsCode: [], docTypes: [] };
  return {
    fieldKinds: fields.kinds,
    fieldOptions: fields.options,
    fieldsCode: fields.code.split('\n').map(piecesOf),
    docTypes: fields.docTypes,
  };
}

// an epic with no feature ticket is built ticket by ticket: its tickets are its page
const builtOf = (
  epic: string,
  ticket: ReturnType<typeof TICKETS>[number] | undefined,
): ReturnType<typeof TICKETS> =>
  ticket ? [] : TICKETS().filter((one) => one.epic === epic);

// each ticket's edges, its id before each section
const edgesOf = (tickets: ReturnType<typeof TICKETS>): readonly Section[] =>
  tickets.flatMap((one) =>
    (ticketDetailOf(one.id)?.edgeSections ?? []).map((section) => ({
      ...section,
      label: `${one.id} · ${section.label}`,
    })),
  );

function featureOf(epic: string, plugs: ProductView = {}): FeatureView {
  const ticket = TICKETS().find((one) => one.id === `T-${epic}-00`);
  const built = builtOf(epic, ticket);
  const read = readOf(ticket);
  const groups = casesOfEpic(epic, named(read));
  const caseGroups = [...caseGroupsOf(groups), ...criterionGroupsOf(built)];
  return {
    epic,
    title: `${epic} · ${EPICS[epic]?.name ?? ticket?.title ?? ''}`,
    status:
      ticket?.status ??
      features().find((one) => one.epic === epic)?.status ??
      '—',
    journeys: journeysOf(epic, flat(groups)),
    cover: coverOf(epic, groups),
    endpoints: endpointsOf(epic, read),
    caseGroups,
    caseKinds: caseKindsOf(caseGroups),
    ...fieldsView(plugs.fieldsOf?.(epic)),
    decisions: ticket
      ? (ticketDetailOf(ticket.id)?.edgeSections ?? [])
      : edgesOf(built),
    notes: notesViewOf(epic),
    combinations: combinationsOf(epic),
    statesNamed: statesNamed(epic, plugs.statesOf),
    countOf: (file) => countLine(file, plugs.counters),
  };
}

export type * from './featureView/featureTypes.ts';
export type * from './featureView/featureFieldTypes.ts';
export { featureOf, features, FEATURE_WORDS as featureWords, firstEpic };
