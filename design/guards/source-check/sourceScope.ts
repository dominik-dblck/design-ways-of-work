/**
 * - `MAP`, `homesOfRow`, `mapRowOf` · one row, one home: where each fact lives
 * - `SCOPE` · the files the guard reads
 * - `LOGIC_PAGE`, `SHEET_PAGE`, `isCode` · pages by kind, code
 */
import type { MapRow } from './sourceCheckTypes.ts';

const MAP: readonly MapRow[] = [
  { row: 'facts of a document, the API’s shape', home: ['catalog.js'] },
  { row: 'who may act, a gate’s state', home: ['gate-rules.js'] },
  {
    row: 'a language: its status and what an act does to it',
    home: ['translation-flow.js'],
  },
  {
    row: 'a delivery: its state and where a move takes it',
    home: ['delivery-flow.js'],
  },
  {
    row: 'a module a type attaches, and its variants',
    home: ['content-modules.js'],
  },
  {
    row: 'how a type is assembled from its modules, its people',
    home: ['content-assembly.js'],
  },
  {
    row: 'a type’s list and a group’s page, as data: groups, rows, their two chips (E18 · the migration off ContentAppConcept)',
    home: ['content-list.js'],
  },
  {
    row: 'the simulated run, one document from creation to send: a test’s example (E18 step 5c · rule:layers-read-downward)',
    home: ['sample-run.js'],
  },
  {
    row: 'the checks of the modules and the delivery',
    home: ['content-check.js'],
  },
  { row: 'the walk of the whole document', home: ['flow-check.js'] },
  { row: 'sentences a person sees', home: ['messages.js'] },
  { row: 'screen words', home: ['glossary.js'] },
  { row: 'colours', home: ['gate-states.js', 'tokens.js'] },
  { row: 'the view of it all', home: ['Feature.html', 'Board.html'] },
];

// the files the approval bar and the translations read; a doc file is prose for the sheet, not a copy
const SCOPE: readonly string[] = [
  'gate-rules.js',
  'scenes.js',
  'translation-flow.js',
  'delivery-flow.js',
  'content-modules.js',
  'content-assembly.js',
  'content-check.js',
  'languages.js',
  'content-types.js',
  'content-list.js',
  'sample-run.js',
  'messages-content.js',
  'content-type-logic.js',
  'flow-check.js',
  'block-rules.js',
  'blocks.js',
  'catalog.js',
  'gate-states.js',
  'approval-logic.js',
  'role-combinations.js',
  'directory.js',
  'field-kinds.js',
  'screen-view.js',
  'signatures.js',
  'projections.js',
  'shared-cases.js',
  'db-schema.js',
  'events.js',
  'wireframes.js',
  'queries.js',
  'journeys.js',
];

const LOGIC_PAGE = /^(rules-|Translation statuses)/;

// the design side's own pages: their words are the sheet's, never a screen's
const SHEET_PAGE =
  /^(plan-|Feature drawings\.dc|rules-|Wireframes\.dc|E\d+ .* UI spec|ContextBar languages|TimeTravelBar|Columns paint grid|Translation statuses)/;

function homesOfRow(row: string): readonly string[] {
  return MAP.find((one) => one.row === row)?.home ?? [];
}

function mapRowOf(file: string): string {
  return (
    MAP.find((one) => one.home.includes(file))?.row ?? 'sentences a person sees'
  );
}

function isCode(line: string): boolean {
  return !/^\s*(\/\/|\*|<!--)/.test(line);
}

export { homesOfRow, isCode, LOGIC_PAGE, MAP, mapRowOf, SCOPE, SHEET_PAGE };
