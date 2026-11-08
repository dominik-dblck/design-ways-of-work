/**
 * - `RuleFile`, `RuleRow` · a file of rules: its title, its text, its rows
 */
interface RuleRow {
  readonly rule: string;
  readonly gate: string;
  readonly exceptions: string;
  readonly why: string;
}

interface RuleFile {
  readonly title: string;
  readonly intro: string;
  readonly rows: readonly RuleRow[];
  readonly outro: string;
}

export type { RuleFile, RuleRow };
