/**
 * - `MAP`, `homesOfRow`, `mapRowOf` · one row, one home: where each fact lives
 * - `SCOPE` · the files the guard reads
 * - `isCode` · a line that is code, not a comment
 */
import type { MapRow } from './sourceCheckTypes.ts';

const MAP: readonly MapRow[] = [
  { row: 'facts of a document, the API’s shape', home: ['catalog.js'] },
  { row: 'who may act, a gate’s state', home: ['gateRules.js'] },
  {
    row: 'a language: its status and what an act does to it',
    home: ['translationFlow.js'],
  },
  {
    row: 'a delivery: its state and where a move takes it',
    home: ['deliveryFlow.js'],
  },
  {
    row: 'a module a type attaches, and its variants',
    home: ['contentModules.js'],
  },
  {
    row: 'how a type is assembled from its modules, its people',
    home: ['contentAssembly.js'],
  },
  {
    row: 'a type’s list and a group’s page, as data: groups, rows, their two chips (E18 · the migration off ContentAppConcept)',
    home: ['contentList.js'],
  },
  {
    row: 'the simulated run, one document from creation to send: a test’s example (E18 step 5c · rule:layers-read-downward)',
    home: ['sampleRun.js'],
  },
  {
    row: 'the checks of the modules and the delivery',
    home: ['contentCheck.js'],
  },
  { row: 'the walk of the whole document', home: ['flowCheck.js'] },
  { row: 'sentences a person sees', home: ['messages.js'] },
  { row: 'screen words', home: ['glossary.js'] },
  { row: 'colours', home: ['gateStates.js', 'tokens.js'] },
  { row: 'the view of it all', home: ['Feature.html', 'Board.html'] },
];

// the files the approval bar and the translations read; a doc file is prose for the sheet, not a copy
const SCOPE: readonly string[] = [
  'gateRules.js',
  'scenes.js',
  'translationFlow.js',
  'deliveryFlow.js',
  'contentModules.js',
  'contentAssembly.js',
  'contentCheck.js',
  'languages.js',
  'contentTypes.js',
  'contentList.js',
  'sampleRun.js',
  'messagesContent.js',
  'contentTypeLogic.js',
  'flowCheck.js',
  'blockRules.js',
  'blocks.js',
  'catalog.js',
  'gateStates.js',
  'approvalLogic.js',
  'roleCombinations.js',
  'directory.js',
  'fieldKinds.js',
  'screenView.js',
  'signatures.js',
  'projections.js',
  'sharedCases.js',
  'dbSchema.js',
  'events.js',
  'wireframes.js',
  'queries.js',
  'journeys.js',
];

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

export { homesOfRow, isCode, MAP, mapRowOf, SCOPE };
