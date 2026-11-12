/**
 * - `features`, `firstEpic`, `featureOf` · the tabs, the one opened, one epic
 * - `featureOf` takes the product's view from the page that runs it
 * - `featureWords` · the page's own words; the view's types
 */
import { all as TICKETS } from '../../roadmaps/tickets.ts';
import { byId as EPICS } from '../../roadmaps/backlog.ts';
import { stepsOf } from '../../roadmaps/features.ts';
import { notesOf } from '../../roadmaps/notes.ts';
import { casesOfEpic, flat, named } from '../../sheet/cases/testCases.ts';
import { ticketDetailOf } from './boardView.ts';
import { endpointsOf, piecesOf } from './contractView.ts';
import { caseGroupsOf, caseKindsOf } from './featureView/featureCases.ts';
import { coverOf } from './featureView/featureCover.ts';
import { journeysOf } from './featureView/featureJourneys.ts';
import {
  combinationsOf,
  countLine,
  statesNamed,
} from './featureView/featureCombinations.ts';
import { FEATURE_WORDS } from './featureView/featureWords.ts';
import type { ProductFields, ProductView } from '../../tools/productTypes.ts';
import type { FeatureTab, FeatureView } from './featureView/featureTypes.ts';

// a feature is an epic's one ticket, numbered 00
const A_FEATURE = /-00$/;

const featureTickets = (): ReturnType<typeof TICKETS> =>
  TICKETS().filter((one) => one.kind === 'feature' && A_FEATURE.test(one.id));

function features(): readonly FeatureTab[] {
  return featureTickets().map((one) => ({
    epic: one.epic,
    label: `${one.epic} · ${one.status}`,
  }));
}

// the first feature not done yet is the one the page opens on
function firstEpic(): string | null {
  const all = featureTickets();
  return (all.find((one) => one.status !== 'done') ?? all.at(-1))?.epic ?? null;
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

function featureOf(epic: string, plugs: ProductView = {}): FeatureView {
  const ticket = TICKETS().find((one) => one.id === `T-${epic}-00`);
  const read = readOf(ticket);
  const groups = casesOfEpic(epic, named(read));
  const caseGroups = caseGroupsOf(groups);
  return {
    epic,
    title: `${epic} · ${EPICS[epic]?.name ?? ticket?.title ?? ''}`,
    status: ticket?.status ?? '—',
    steps: stepsOf(epic),
    journeys: journeysOf(epic, flat(groups)),
    cover: coverOf(epic, groups),
    endpoints: endpointsOf(epic, read),
    caseGroups,
    caseKinds: caseKindsOf(caseGroups),
    ...fieldsView(plugs.fieldsOf?.(epic)),
    decisions: ticket ? (ticketDetailOf(ticket.id)?.edgeSections ?? []) : [],
    notes: notesOf(epic),
    combinations: combinationsOf(epic),
    statesNamed: statesNamed(epic, plugs.statesOf),
    countOf: (file) => countLine(file, plugs.counters),
  };
}

export type * from './featureView/featureTypes.ts';
export { featureOf, features, FEATURE_WORDS as featureWords, firstEpic };
