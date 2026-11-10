/**
 * - `caseLines`, `typeLines`, `okLines`, `docLines` · every endpoint's lines
 * - `UNTYPED`, `DRAFT_OPEN`, `DRAFT_CLOSE` · an untyped type, a drafted one's marks
 */
import { shapeLines } from './codeTokens.ts';
import type { BodyField } from './contractTypes.ts';

const UNTYPED = 'ToType';
const DRAFT_OPEN = '⟦';
const DRAFT_CLOSE = '⟧';
const WIDTH = 88;

function wrapped(text: string, lead: string): readonly string[] {
  const out: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if (`${line} ${word}`.length > WIDTH) {
      out.push(lead + line.trim());
      line = '';
    }
    line += ` ${word}`;
  }
  if (line.trim()) out.push(lead + line.trim());
  return out;
}

function docLines(text: string, pad: string): readonly string[] {
  const lines = wrapped(text, `${pad} * `);
  return lines.length === 1
    ? [`${pad}/** ${text} */`]
    : [`${pad}/**`, ...lines, `${pad} */`];
}

function caseLines(
  id: string,
  cases: readonly (readonly string[])[] | undefined,
): readonly string[] {
  if (!cases?.length) return [];
  const rows = cases.map(
    ([when, answer]) =>
      `  { when: ${JSON.stringify(when)}, answer: ${JSON.stringify(answer)} },`,
  );
  return ['', `const ${id}Cases = [`, ...rows, '] as const'];
}

interface Typed {
  readonly fields: readonly BodyField[];
  readonly checks: Readonly<Record<string, string>>;
}

function typeLines(name: string, { fields, checks }: Typed): readonly string[] {
  if (!fields.length) return [`type ${name} = {}`];
  const inner = fields.flatMap(([key, type]) => {
    const check = checks[key.replace('?', '')];
    return [...(check ? docLines(check, '  ') : []), `  ${key}: ${type};`];
  });
  return [`type ${name} = {`, ...inner, '}'];
}

// an answer typed as one line, `{ a: A }`, laid out as the first `Ok` of the union
function okLines(answer: string): readonly string[] {
  const shape = shapeLines(answer, '    ');
  const ok = [`  | Ok<${(shape[0] ?? '').trim()}`, ...shape.slice(1)];
  ok[ok.length - 1] = `${ok[ok.length - 1] ?? ''}>`;
  return ok;
}

export {
  DRAFT_CLOSE,
  DRAFT_OPEN,
  UNTYPED,
  caseLines,
  docLines,
  okLines,
  typeLines,
};
