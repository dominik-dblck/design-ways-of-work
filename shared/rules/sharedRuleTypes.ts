/**
 * - `SharedRule`, `Side` · a rule both sides keep, and each side’s gate for it
 */
import type { CodeRuleRow } from '../../docs/rules/ruleTypes.ts';

type Side = 'design' | 'build';

type SideGate = Pick<CodeRuleRow, 'gate' | 'exceptions'>;

interface SharedRule {
  readonly rule: string;
  readonly why: string;
  readonly design: SideGate;
  readonly build: SideGate;
}

export type { SharedRule, Side };
