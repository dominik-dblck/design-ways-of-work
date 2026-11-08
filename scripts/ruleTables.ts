/**
 * - `RuleTableRow`, `RuleTable`, `ruleTableOf` · a printed rule file read back, row by row
 */
const CELL_BREAK = /(?<!\\) \| /;

interface RuleTableRow {
  readonly rule: string;
  readonly gate: string;
  readonly exceptions: string;
  readonly why: string;
}

interface RuleTable {
  readonly title: string;
  readonly intro: string;
  readonly rows: readonly RuleTableRow[];
  readonly outro: string;
}

function rowOf(line: string): RuleTableRow {
  const [rule = '', gate = '', exceptions = '', why = ''] = line
    .replace(/^\| /, '')
    .replace(/ \|$/, '')
    .split(CELL_BREAK)
    .map((cell) => cell.trimEnd());
  return { rule, gate, exceptions, why };
}

function ruleTableOf(text: string): RuleTable {
  const lines = text.split('\n');
  const head = lines.findIndex((line) => line.startsWith('| Rule'));
  let end = head + 2;
  while (lines[end]?.startsWith('|')) end += 1;
  return {
    title: (lines[0] ?? '').replace(/^# /, ''),
    intro: lines.slice(1, head).join('\n'),
    rows: lines.slice(head + 2, end).map(rowOf),
    outro: lines.slice(end).join('\n'),
  };
}

export { ruleTableOf };
export type { RuleTable, RuleTableRow };
