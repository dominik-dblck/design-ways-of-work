/**
 * - `node scripts/split-rules.ts` · the two rule sets split by plan/rule-split.tsv, once
 * - a rule both sides keep goes to shared/rules/, each side's gate beside it; the rest stays on its side
 * - each side's file reads the shared rows first, then its own; the printed markdown follows
 */
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const DESIGN = path.join(HERE, 'design', 'docs', 'rules');
const DEV = path.join(HERE, 'dev', 'rules');
const SHARED = path.join(HERE, 'shared', 'rules');
const CELL_BREAK = /(?<!\\) \| /;

interface Row {
  readonly rule: string;
  readonly gate: string;
  readonly exceptions: string;
  readonly why: string;
}

interface Printed {
  readonly title: string;
  readonly intro: string;
  readonly rows: readonly Row[];
  readonly outro: string;
}

type Split = readonly [file: string, home: string, design: string, dev: string, wording: string];

const quoted = (text: string): string =>
  `'${text.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', '\\n')}'`;

function printedOf(file: string): Printed {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const head = lines.findIndex((line) => line.startsWith('| Rule'));
  let end = head + 2;
  while (lines[end]?.startsWith('|')) end += 1;
  const rows = lines.slice(head + 2, end).map((line) => {
    const [rule = '', gate = '', exceptions = '', why = ''] = line
      .replace(/^\| /, '')
      .replace(/ \|$/, '')
      .split(CELL_BREAK)
      .map((cell) => cell.trimEnd());
    return { rule, gate, exceptions, why };
  });
  return {
    title: (lines[0] ?? '').replace(/^# /, ''),
    intro: lines.slice(1, head).join('\n'),
    rows,
    outro: lines.slice(end).join('\n'),
  };
}

const rowLine = (row: Row): string =>
  `    { rule: ${quoted(row.rule)}, gate: ${quoted(row.gate)}, exceptions: ${quoted(row.exceptions)}, why: ${quoted(row.why)} },`;

function sideFile(
  { name, printed, own, side }: { readonly name: string; readonly printed: Printed; readonly own: readonly Row[]; readonly side: 'design' | 'build' },
  shared: boolean,
): string {
  const up = '../..';
  const types = side === 'design' ? './ruleTypes.ts' : '../../docs/rules/ruleTypes.ts';
  return [
    '/**',
    ` * - \`rules\` · ${printed.title.toLowerCase()}: ${shared ? 'the shared rules, then this side’s own' : 'this side’s rules'}`,
    ' */',
    ...(shared
      ? [`import { rowsFor } from '${up}/shared/rules/rowsFor.ts';`, `import { shared } from '${up}/shared/rules/${name}.ts';`]
      : []),
    `import type { RuleFile } from '${types}';`,
    '',
    '// prettier-ignore',
    'const rules: RuleFile = {',
    `  title: ${quoted(printed.title)},`,
    `  intro: ${quoted(printed.intro)},`,
    '  rows: [',
    ...(shared ? [`    ...rowsFor('${side}', shared),`] : []),
    ...own.map(rowLine),
    '  ],',
    `  outro: ${quoted(printed.outro)},`,
    '};',
    '',
    'export { rules };',
    '',
  ].join('\n');
}

function sharedFile(title: string, pairs: readonly { readonly words: Row; readonly design: Row; readonly dev: Row }[]): string {
  return [
    '/**',
    ` * - \`shared\` · ${title.toLowerCase()}: the rules both sides keep, each side's gate beside it`,
    ' */',
    "import type { SharedRule } from './sharedRuleTypes.ts';",
    '',
    '// prettier-ignore',
    'const shared: readonly SharedRule[] = [',
    ...pairs.map(
      ({ words, design, dev }) =>
        `  { rule: ${quoted(words.rule)}, why: ${quoted(words.why)}, design: { gate: ${quoted(design.gate)}, exceptions: ${quoted(design.exceptions)} }, build: { gate: ${quoted(dev.gate)}, exceptions: ${quoted(dev.exceptions)} } },`,
    ),
    '];',
    '',
    'export { shared };',
    '',
  ].join('\n');
}

function splitOne(file: string, splits: readonly Split[]): number {
  const name = file.replace(/\.md$/, '');
  const design = printedOf(path.join(DESIGN, file));
  const dev = printedOf(path.join(DEV, file));
  const at = (printed: Printed, index: string): Row => {
    const row = printed.rows[Number(index) - 1];
    if (row === undefined) throw new Error(`${file} has no row ${index}`);
    return row;
  };
  const pairs = splits
    .filter(([, home]) => home === 'shared')
    .map(([, , one, other, wording]) => {
      const [designRow, devRow] = [at(design, one), at(dev, other)];
      return { words: wording === 'design' ? designRow : devRow, design: designRow, dev: devRow };
    });
  const own = (home: string, printed: Printed, column: 2 | 3): readonly Row[] =>
    splits.filter((split) => split[1] === home).map((split) => at(printed, split[column]));
  if (pairs.length) fs.writeFileSync(path.join(SHARED, `${name}.ts`), sharedFile(design.title, pairs));
  fs.writeFileSync(path.join(DESIGN, `${name}.ts`), sideFile({ name, printed: design, own: own('design', design, 2), side: 'design' }, pairs.length > 0));
  fs.writeFileSync(path.join(DEV, `${name}.ts`), sideFile({ name, printed: dev, own: own('dev', dev, 3), side: 'build' }, pairs.length > 0));
  return pairs.length;
}

function main(): void {
  if (fs.existsSync(path.join(SHARED, 'rowsFor.ts'))) {
    console.error('shared/rules/ exists: the split ran once; edit the rule files, never run it again');
    process.exit(1);
  }
  fs.mkdirSync(SHARED, { recursive: true });
  const splits = fs
    .readFileSync(path.join(HERE, 'plan', 'rule-split.tsv'), 'utf8')
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => line.split('\t') as unknown as Split);
  let shared = 0;
  for (const file of [...new Set(splits.map(([one]) => one))])
    shared += splitOne(file, splits.filter(([one]) => one === file));
  fs.writeFileSync(
    path.join(SHARED, 'sharedRuleTypes.ts'),
    [
      '/**',
      ' * - `SharedRule`, `Side` · a rule both sides keep, and each side’s gate for it',
      ' */',
      "import type { RuleRow } from '../../docs/rules/ruleTypes.ts';",
      '',
      "type Side = 'design' | 'build';",
      '',
      "type SideGate = Pick<RuleRow, 'gate' | 'exceptions'>;",
      '',
      'interface SharedRule {',
      '  readonly rule: string;',
      '  readonly why: string;',
      '  readonly design: SideGate;',
      '  readonly build: SideGate;',
      '}',
      '',
      'export type { SharedRule, Side };',
      '',
    ].join('\n'),
  );
  fs.writeFileSync(
    path.join(SHARED, 'rowsFor.ts'),
    [
      '/**',
      ' * - `rowsFor` · the shared rules as one side’s rows: its gate, its exceptions',
      ' */',
      "import type { RuleRow } from '../../docs/rules/ruleTypes.ts';",
      "import type { SharedRule, Side } from './sharedRuleTypes.ts';",
      '',
      'const rowsFor = (side: Side, shared: readonly SharedRule[]): readonly RuleRow[] =>',
      '  shared.map((one) => ({',
      '    rule: one.rule,',
      '    gate: one[side].gate,',
      '    exceptions: one[side].exceptions,',
      '    why: one.why,',
      '  }));',
      '',
      'export { rowsFor };',
      '',
    ].join('\n'),
  );
  console.log(`shared/rules · ${shared} rules both sides keep, each once`);
}

main();
