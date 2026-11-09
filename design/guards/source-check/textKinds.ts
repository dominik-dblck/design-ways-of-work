/**
 * - `STATUS_KEYS` · the words a status map holds as its keys
 * - `TEXT`, `kindOf`, `stringKeyOf` · what a file's strings are, by the key before
 */
import type { TextKinds } from './sourceCheckTypes.ts';

const STATUS_KEYS =
  'none|warn|ok|proxy|stale|withdrawn|missing|na|drafted|agent|written|pool|locked|edited|waiting|free|absent|signed|review|confirmed|progress';

const SCENE_SHEET: readonly string[] = [
  'means',
  'array',
  'line',
  'note',
  'when',
  'cond',
  'call(has)',
];
const NAMED_KEYS: readonly string[] = ['title', 'short', 'label'];

// screen: a sentence a person sees, messages.js' · sheet: prose for the design side · content: a document's own text · typed: a value the sheet derives, typed by hand
const TEXT: Readonly<Record<string, TextKinds | undefined>> = {
  'scenes.js': {
    is: 'screen',
    sheet: SCENE_SHEET,
    content: ['withdrawReason'],
    sheetIn: {
      decl: [
        'MANAGER_SCENES',
        'APPROVER_SCENES',
        'REVIEWER_SCENES',
        'DIALOG_ROWS',
      ],
      keys: NAMED_KEYS,
    },
  },
  'gate-rules.js': {
    is: 'screen',
    sheet: SCENE_SHEET,
    content: ['withdrawReason'],
    sheetIn: {
      decl: ['CM_STATES', 'AP_STATES', 'LO_STATES', 'P_STATES'],
      keys: NAMED_KEYS,
    },
    expectedIn: ['MANAGE_CTA'],
    sheetDecl: ['stateChip', 'DOC'],
  },
  'translation-flow.js': { is: 'screen', sheet: ['array', 'when'] },
  'flow-check.js': { is: 'sheet' },
  'block-rules.js': {
    is: 'screen',
    sheet: ['means', 'array', 'by'],
    sheetIn: { decl: ['BLOCK_STATES', 'LOCALE_STATES'], keys: NAMED_KEYS },
  },
  'content-assembly.js': {
    is: 'screen',
    sheet: ['call(push)', 'other', 'array'],
  },
  'blocks.js': {
    is: 'content',
    sheet: ['cause', 'other', 'call(push)', 'expr'],
    screen: ['minBlocks'],
  },
  'content-modules.js': { is: 'screen', content: ['description'] },
  'catalog.js': {
    is: 'screen',
    sheet: ['means'],
    content: ['array'],
    sheetDecl: ['STATE'],
  },
  'gate-states.js': { is: 'screen' },
  'approval-logic.js': { is: 'sheet' },
  'role-combinations.js': { is: 'sheet' },
  'directory.js': { is: 'sheet' },
  'content-samples.js': { is: 'typed', content: ['array'] },
  'field-kinds.js': { is: 'sheet', screen: ['says'] },
  'screen-view.js': { is: 'screen', sheet: ['why', 'says'] },
  'content-check.js': { is: 'sheet' },
  'EditorScreen.dc.html': { is: 'screen', sheetDecl: ['DIFF_SAMPLE'] },
  'commands.js': { is: 'sheet', expectedIn: ['COMMANDS'] },
  'refusals.js': { is: 'sheet' },
  'queries.js': { is: 'sheet' },
  'sample-run.js': { is: 'content' },
  'messages-content.js': { is: 'sheet' },
  'content-type-logic.js': { is: 'sheet' },
  'payloads.js': { is: 'content' },
  'threads.js': { is: 'content' },
  'signatures.js': { is: 'content' },
  'projections.js': { is: 'sheet' },
  'shared-cases.js': { is: 'sheet' },
  'db-schema.js': { is: 'sheet' },
  'agent-flow.js': { is: 'sheet' },
  'agent-access.js': { is: 'sheet' },
  'events.js': { is: 'sheet' },
  'wireframes.js': { is: 'sheet' },
  'glossary.js': { is: 'sheet' },
  'sheet-status.js': { is: 'sheet' },
  'block-model.json': { is: 'sheet' },
  'test-cases.js': { is: 'sheet' },
  'journeys.js': { is: 'sheet' },
};

// a named declaration's keys first, then a key a kind's list names, else the file's default
function kindOf(
  file: string,
  { key, decl }: { readonly key: string; readonly decl: string },
): string {
  const kinds = TEXT[file] ?? { is: 'screen' };
  if (kinds.sheetIn?.decl.includes(decl) && kinds.sheetIn.keys.includes(key))
    return 'sheet';
  if ((kinds.sheetDecl ?? []).includes(decl)) return 'sheet';
  const lists: Readonly<Record<string, readonly string[] | undefined>> = {
    screen: kinds.screen,
    sheet: kinds.sheet,
    content: kinds.content,
    typed: kinds.typed,
  };
  return (
    Object.entries(lists).find(([, kindWords]) =>
      (kindWords ?? []).includes(key),
    )?.[0] ?? kinds.is
  );
}

// a string's key: the property it is set on, the call it is handed to, else where it stands
function stringKeyOf(before: string): string {
  const key = /\b(\w+)\s*:\s*$/.exec(before)?.[1];
  if (key) return key;
  const call = /\b(\w+)\s*\(\s*$/.exec(before);
  if (call) return `call(${String(call[1])})`;
  if (/\[\s*$|,\s*$|^\s*$/.test(before)) return 'array';
  if (/return\s*$|\?\s*$|:\s*$/.test(before)) return 'expr';
  return 'other';
}

export { stringKeyOf, kindOf, STATUS_KEYS, TEXT };
