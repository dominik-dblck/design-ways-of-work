/**
 * - `commandFields`, `queryFields` · a body's or params' fields, how typed
 * - a field typed on the sheet is its own; a prose one drafts, or is untyped
 */
import { bodyDrafts } from '../../../sheet/contract/commands.ts';
import type * as QUERIES from '../../../sheet/contract/queries.ts';
import { pointsOf } from '../textPoints.ts';
import { DRAFT_CLOSE, DRAFT_OPEN, UNTYPED } from './codeLines.ts';
import type { EndpointState, BodyField } from './contractTypes.ts';

type Param = (typeof QUERIES.all)[number]['params'][number];

interface Fields {
  readonly state: EndpointState;
  readonly fields: readonly BodyField[];
}

const drafted = (type: string): string => `${DRAFT_OPEN}${type}${DRAFT_CLOSE}`;

const stateOf = (fields: readonly BodyField[]): EndpointState => {
  if (fields.some(([, type]) => type === UNTYPED)) return 'todo';
  return fields.some(([, type]) => type.startsWith(DRAFT_OPEN))
    ? 'draft'
    : 'typed';
};

function commandField(part: string): BodyField {
  const at = part.indexOf(':');
  if (at > 0) return [part.slice(0, at).trim(), part.slice(at + 1).trim()];
  const draft = bodyDrafts[part.trim()];
  if (draft === undefined) return [part.trim(), UNTYPED];
  return typeof draft === 'string'
    ? [part.trim(), drafted(draft)]
    : [draft[0], drafted(draft[1])];
}

function commandFields(body: string): Fields {
  const text = body.trim();
  const fields = text === '—' ? [] : pointsOf(text).map(commandField);
  return { state: stateOf(fields), fields };
}

const LANGUAGES = ['FR', 'PT', 'ES', 'DE', 'IT'];
const GATES = ['Product', 'LGL', ...LANGUAGES];
// a param named here may be left out
const OPTIONAL = /omitted|absent|optional/;
const LEFT_OUT = ['as', 'to', 'locale', 'type', 'pane'];

function unionOf(head: string): string {
  const parts = head
    .split('|')
    .map((one) => one.trim())
    .filter(Boolean);
  if (parts.some((one) => one.includes('…')))
    return `${parts
      .filter((one) => !one.includes('…') && !LANGUAGES.includes(one))
      .map((one) => `'${one}'`)
      .join(' | ')} | Lang`;
  if (parts.every((one) => GATES.includes(one))) return 'Gate';
  return parts.map((one) => `'${one.replace(/(?<!\s)\s.*$/, '')}'`).join(' | ');
}

// a param's prose, `person id · …` or `a | b`, read as the type it drafts to
function draftOf(prose: string): string | null {
  const head = prose.split(' · ')[0]?.trim() ?? '';
  if (head.includes('person id')) return 'UserId';
  if (head.startsWith('v{n}')) return "`v${number}` | 'draft'";
  return head.includes('|') ? unionOf(head) : null;
}

function queryField([name, prose]: Param): BodyField {
  const typed = /^(\w+\??)\s*:\s*(\S.*)$/.exec(prose);
  if (typed) return [typed[1] ?? name, typed[2] ?? UNTYPED];
  const draft = draftOf(prose);
  if (!draft) return [name, UNTYPED];
  const isOptional = OPTIONAL.test(prose) || LEFT_OUT.includes(name);
  return [`${name}${isOptional ? '?' : ''}`, drafted(draft)];
}

function queryFields(params: readonly Param[], answered: boolean): Fields {
  const fields = params.map(queryField);
  const state = stateOf(fields);
  return { state: answered ? state : 'todo', fields };
}

export { commandFields, queryFields };
