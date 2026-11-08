/**
 * - `features`, `firstEpic`, `featureOf` · the tabs, the one opened, one epic
 * - `countLine` · a combinations file counted, seconds long, so run when asked
 * - `featureWords` · the page's own words; the view's types
 */
import { all as TICKETS } from '../../roadmaps/tickets.ts';
import { byId as EPICS } from '../../roadmaps/backlog.ts';
import { stepsOf } from '../../roadmaps/features.ts';
import { notesOf } from '../../roadmaps/notes.ts';
import { casesOfEpic, flat, named } from '../../sheet/cases/test-cases.ts';
import { ticketOf } from './board-view.ts';
import { endpointsOf } from './contract-view.ts';
import { caseGroupsOf, caseKindsOf } from './feature-view/featureCases.ts';
import { coverOf } from './feature-view/featureCover.ts';
import {
  docTypesOf,
  fieldKindsOf,
  fieldOptionsOf,
  fieldsCodeOf,
} from './feature-view/featureFields.ts';
import { journeysOf } from './feature-view/featureJourneys.ts';
import {
  combinationsOf,
  countLine,
  statesNamed,
} from './feature-view/featureCombinations.ts';
import { FEATURE_WORDS } from './feature-view/featureWords.ts';
import type { FeatureTab, FeatureView } from './feature-view/featureTypes.ts';

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

const readOf = (ticket: ReturnType<typeof TICKETS>[number] | undefined): readonly string[] =>
  ticket?.read ?? [];

function featureOf(epic: string): FeatureView {
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
    fieldKinds: fieldKindsOf(epic),
    fieldOptions: fieldOptionsOf(epic),
    fieldsCode: fieldsCodeOf(epic),
    docTypes: docTypesOf(epic),
    decisions: ticket ? (ticketOf(ticket.id)?.edgeSections ?? []) : [],
    notes: notesOf(epic),
    combinations: combinationsOf(epic),
    statesNamed: statesNamed(epic),
  };
}

export type * from './feature-view/featureTypes.ts';
export type * from './feature-view/featureFieldTypes.ts';
export {
  countLine,
  featureOf,
  features,
  FEATURE_WORDS as featureWords,
  firstEpic,
};
