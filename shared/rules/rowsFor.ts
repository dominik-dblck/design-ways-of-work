/**
 * - `rowsFor` · the shared rules as one side’s rows: its gate, its exceptions
 */
import type { RuleRow } from '../../docs/rules/ruleTypes.ts';
import type { SharedRule, Side } from './sharedRuleTypes.ts';

const rowsFor = (side: Side, shared: readonly SharedRule[]): readonly RuleRow[] =>
  shared.map((one) => ({
    rule: one.rule,
    gate: one[side].gate,
    exceptions: one[side].exceptions,
    why: one.why,
  }));

export { rowsFor };
