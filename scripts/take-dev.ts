/**
 * - `node scripts/take-dev.ts [build repo]` · its code rules as data: docs/rules/{name}.md → dev/rules/{name}.ts
 * - each table read row by row; the markdown is kept beside it as the build will print it back
 * - ran once: the rules are split since (split-rules.ts) and this repository is their source; it refuses
 */
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const SOURCE = path.resolve(
  process.argv.slice(2).find((arg) => !arg.startsWith('--')) ??
    path.join(HERE, '..', 'mailing-automation'),
);
const FROM = path.join(SOURCE, 'docs', 'rules');
const TO = path.join(HERE, 'dev', 'rules');
const CELL_BREAK = /(?<!\\) \| /;

interface Row {
  readonly rule: string;
  readonly gate: string;
  readonly exceptions: string;
  readonly why: string;
}

const quoted = (text: string): string =>
  `'${text.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', '\\n')}'`;

function rowOf(line: string): Row {
  const [rule = '', gate = '', exceptions = '', why = ''] = line
    .replace(/^\| /, '')
    .replace(/ \|$/, '')
    .split(CELL_BREAK)
    .map((cell) => cell.trimEnd());
  return { rule, gate, exceptions, why };
}

function dataOf(name: string, text: string): string {
  const lines = text.split('\n');
  const head = lines.findIndex((line) => line.startsWith('| Rule'));
  let end = head + 2;
  while (lines[end]?.startsWith('|')) end += 1;
  const title = (lines[0] ?? '').replace(/^# /, '');
  const rows = lines.slice(head + 2, end).map(rowOf);
  return [
    '/**',
    ` * - \`rules\` · ${title.toLowerCase()}: each rule, its gate, its exceptions and why`,
    ' */',
    "import type { RuleFile } from '../../docs/rules/ruleTypes.ts';",
    '',
    '// prettier-ignore',
    'const rules: RuleFile = {',
    `  title: ${quoted(title)},`,
    `  intro: ${quoted(lines.slice(1, head).join('\n'))},`,
    '  rows: [',
    ...rows.map(
      (row) =>
        `    { rule: ${quoted(row.rule)}, gate: ${quoted(row.gate)}, exceptions: ${quoted(row.exceptions)}, why: ${quoted(row.why)} },`,
    ),
    '  ],',
    `  outro: ${quoted(lines.slice(end).join('\n'))},`,
    '};',
    '',
    `export { rules };`,
    '',
  ].join('\n');
}

const ruleFiles = (): readonly string[] =>
  fs
    .readdirSync(FROM)
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .sort();

function take(): void {
  if (fs.existsSync(TO)) {
    console.error(
      "dev/rules exists: this repository is the rules' source now, never take them again",
    );
    process.exit(1);
  }
  fs.mkdirSync(TO, { recursive: true });
  for (const file of ruleFiles()) {
    const text = fs.readFileSync(path.join(FROM, file), 'utf8');
    const name = file.replace(/\.md$/, '');
    fs.writeFileSync(path.join(TO, `${name}.ts`), dataOf(name, text));
    fs.writeFileSync(path.join(TO, file), text);
  }
  console.log(
    `dev/rules · ${ruleFiles().length} rule files taken from ${path.relative(HERE, FROM)}`,
  );
}

take();
