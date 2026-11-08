/**
 * - `rulesLine` · each rule and checklist line has a key that says what it does
 * - one key per row across both, kebab-case, a why of one sentence (D27, D29)
 */
import { lineOf } from './checkWorld.ts';
import * as PLANS from '../../docs/process/plans.ts';
import * as RULES from '../../sheet/rules.ts';

const A_KEY = /^[a-z0-9]+(?:-[a-z0-9]+){1,5}$/;
const A_SECOND_SENTENCE = /[.!?]\s+[A-Z]/;

interface Row {
  readonly id: string;
  readonly says: string;
  readonly why: string;
}

// what is wrong with one row, as `key · fault`
function rowFaults(row: Row, seen: ReadonlySet<string>): readonly string[] {
  return [
    ...(A_KEY.test(row.id) ? [] : [`${row.id} · not a key of 2–6 words`]),
    ...(seen.has(row.id) ? [`${row.id} · twice`] : []),
    ...(row.says.trim() ? [] : [`${row.id} · says nothing`]),
    ...(row.why.trim() && !A_SECOND_SENTENCE.test(row.why.trim())
      ? []
      : [`${row.id} · why is not one sentence`]),
  ];
}

// the rows the sheet names: the generic rules, the checklist and the product’s slots
function rulesLine(): string {
  const rules: readonly Row[] = PLANS.rules;
  const lines: readonly Row[] = PLANS.ticketChecklist;
  const product: readonly Row[] = RULES.rows;
  const seen = new Set<string>();
  const faults = [...rules, ...lines, ...product].flatMap((row) => {
    const found = rowFaults(row, seen);
    seen.add(row.id);
    return found;
  });
  return lineOf('rules and checklist', {
    ok:
      rules.length > 0 &&
      lines.length > 0 &&
      product.length > 0 &&
      !faults.length,
    text: faults.length
      ? faults.slice(0, 6).join(' | ')
      : `${rules.length} generic rules · ${lines.length} checklist lines · ${product.length} product rules · each a key of its own, a why of one sentence`,
  });
}

export { rulesLine };
