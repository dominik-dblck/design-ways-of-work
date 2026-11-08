/**
 * - `RuleFile`, `CodeRuleRow` · a file of rules: its title, its text, its rows
 */
interface CodeRuleRow {
  readonly rule: string;
  readonly gate: string;
  readonly exceptions: string;
  readonly why: string;
}

interface RuleFile {
  readonly title: string;
  readonly intro: string;
  readonly rows: readonly CodeRuleRow[];
  readonly outro: string;
}

export type { RuleFile, CodeRuleRow };
