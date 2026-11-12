/**
 * - `rows` · the product's own rules, cited as rule:{id} like a generic rule
 */
import type { RuleRow } from '../docs/process/plans.ts';

const rows: readonly RuleRow[] = [
  {
    id: 'one-source-per-fact',
    says: 'Each fact of the product is written in one file, and every other file reads it there.',
    why: 'A fact written twice drifts apart.',
  },
];

export { rows };
