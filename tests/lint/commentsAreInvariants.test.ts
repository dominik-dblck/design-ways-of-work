import { commentsAreInvariants } from '../../shared/lint/rules/commentsAreInvariants.ts';
import { ruleTester } from './ruleTester.ts';

const FILE = 'sheet/words/planted.ts';
const HEADER = "/**\n * - `a` · the planted file\n */\nimport x from 'x';\n";
const headed = (text: string) =>
  `/**\n * - \`a\` · ${text}\n */\nconst a = 1;\n`;

const TRACES = [
  ['a date', 'moved 18 Sep'],
  ['a ticket', ['T', 'E01', '07'].join('-')],
  ['an epic', `built in ${'E'}04`],
  ['a criterion', 'criterion 3 asks it'],
  ['a decision', 'as the (PM) said'],
  ['a stage', 'a stub until GREEN'],
  ['a stage', 'as the recon · Q1 asked'],
  ['a row, an edge or a finding', 'read on row 9a'],
] as const;

ruleTester.run('comments-are-invariants', commentsAreInvariants, {
  valid: [
    {
      name: 'a header under a directive and a shebang; comments after code are no block',
      filename: FILE,
      code: [
        '#!/usr/bin/env node',
        "'use client';",
        '/**',
        ' * - `a` · the planted file',
        ' */',
        'const a = { b: 1, // the first',
        '  c: 2, // the second',
        '};',
      ].join('\n'),
    },
    {
      name: 'a one-line JSDoc above an export, a one-line //, a directive; a string is no comment',
      filename: FILE,
      code: [
        HEADER,
        '/** Null when nobody has signed. */',
        'export const b = 2;',
        '// the queue keeps the order the reader typed in',
        '// prettier-ignore',
        "const c = 'built in E04 on 18 Sep // not a comment';",
      ].join('\n'),
    },
    {
      name: 'a part named for its epic names that epic',
      filename: 'roadmaps/receipts/E04Run.ts',
      code: headed('what the E04 run reported'),
    },
  ],
  invalid: [
    {
      name: 'a comment after code still names no chronicle',
      filename: FILE,
      code: `${HEADER}const b = 2; // moved 18 Sep\n`,
      errors: [{ messageId: 'trace', data: { trace: 'a date' } }],
    },
    {
      name: 'a two-line JSDoc',
      filename: FILE,
      code: `${HEADER}/**\n * Two lines.\n */\nexport const b = 2;\n`,
      errors: [{ messageId: 'jsdoc' }],
    },
    {
      name: 'a JSDoc above no export',
      filename: FILE,
      code: `${HEADER}/** Above no export. */\nconst b = 2;\n`,
      errors: [{ messageId: 'jsdoc' }],
    },
    {
      name: 'a two-line //',
      filename: FILE,
      code: `${HEADER}// one\n// two\nconst b = 2;\n`,
      errors: [{ messageId: 'oneLine' }],
    },
    {
      name: 'eleven asides',
      filename: FILE,
      code: `${HEADER}${'// one\nconst b = 2;\n'.repeat(11)}`,
      errors: [{ messageId: 'asides', data: { count: 11 } }],
    },
    ...TRACES.map(([trace, text]) => ({
      name: `${trace}: ${text}, in the header too`,
      filename: FILE,
      code: headed(text),
      errors: [{ messageId: 'trace' as const, data: { trace } }],
    })),
    {
      name: 'a part names another epic',
      filename: 'roadmaps/receipts/E04Run.ts',
      code: headed('read by E05'),
      errors: [{ messageId: 'trace', data: { trace: 'an epic' } }],
    },
  ],
});
