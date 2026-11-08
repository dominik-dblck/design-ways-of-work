/**
 * - `SharedRules` · what both sides' rule files on a concern share
 * - `Side`, `SideRow` · a side, and a row of its own, its why maybe a shared one
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

// what both sides' rule files on one concern print alike: its title, its opening, its rows, their reasons
interface SharedRules<W extends string> {
  readonly title: string;
  // the sentences both sides' intros open with, '' where they share none
  readonly opening: string;
  readonly rows: readonly SharedRule[];
  // a reason rows of both sides give, each named by its key
  readonly whys: Readonly<Record<W, string>>;
}

// a side's own row: its why in its own words, or a shared reason named by its key
interface SideRow<W extends string> extends Omit<CodeRuleRow, 'why'> {
  readonly why: string | { readonly shared: W };
}

export type { SharedRules, Side, SideRow };
