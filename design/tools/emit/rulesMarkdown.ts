/**
 * - `rulesMarkdown` · a rule file as its table, each cell padded to its column
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

const HEAD = ['Rule', 'Gate', 'Exceptions', 'Why'] as const;

// the table padded to its widest cell per column, as the rule files were written
function rulesMarkdown(file: RuleFile): string {
  const rows = file.rows.map((row) => [
    row.rule,
    row.gate,
    row.exceptions,
    row.why,
  ]);
  const widths = HEAD.map((head, at) =>
    Math.max(head.length, ...rows.map((row) => String(row[at]).length)),
  );
  const line = (cells: readonly string[]): string =>
    `| ${cells.map((cell, at) => cell.padEnd(widths[at] ?? 0)).join(' | ')} |`;
  const rule = `| ${widths.map((width) => '-'.repeat(width)).join(' | ')} |`;
  return [
    `# ${file.title}`,
    file.intro,
    line(HEAD),
    rule,
    ...rows.map(line),
    file.outro,
  ].join('\n');
}

export { rulesMarkdown };
