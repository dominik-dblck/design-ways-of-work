/**
 * - `node scripts/take-dev.ts [build repo]` · its code rules as data: docs/rules/{name}.md → dev/rules/{name}.ts
 * - each table read row by row; the markdown is kept beside it as the build will print it back
 * - ran once: the rules are split since (split-rules.ts) and this repository is their source; it refuses
 */
import fs from 'node:fs';
import path from 'node:path';
import { BUILD_REPO, HERE, repoAt } from './repos.ts';
import { ruleTableOf } from './ruleTables.ts';
import { quoted } from './tsLiteral.ts';

const FROM = path.join(repoAt(BUILD_REPO), 'docs', 'rules');
const TO = path.join(HERE, 'dev', 'rules');

function dataOf(text: string): string {
  const table = ruleTableOf(text);
  return [
    '/**',
    ` * - \`rules\` · ${table.title.toLowerCase()}: each rule, its gate, its exceptions and why`,
    ' */',
    "import type { RuleFile } from '../../docs/rules/ruleTypes.ts';",
    '',
    '// prettier-ignore',
    'const rules: RuleFile = {',
    `  title: ${quoted(table.title)},`,
    `  intro: ${quoted(table.intro)},`,
    '  rows: [',
    ...table.rows.map(
      (row) =>
        `    { rule: ${quoted(row.rule)}, gate: ${quoted(row.gate)}, exceptions: ${quoted(row.exceptions)}, why: ${quoted(row.why)} },`,
    ),
    '  ],',
    `  outro: ${quoted(table.outro)},`,
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
    fs.writeFileSync(path.join(TO, `${name}.ts`), dataOf(text));
    fs.writeFileSync(path.join(TO, file), text);
  }
  console.log(
    `dev/rules · ${ruleFiles().length} rule files taken from ${path.relative(HERE, FROM)}`,
  );
}

take();
