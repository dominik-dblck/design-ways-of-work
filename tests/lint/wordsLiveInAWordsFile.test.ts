import fs from 'node:fs';
import path from 'node:path';
import { wordsLiveInAWordsFile } from '../../shared/lint/rules/wordsLiveInAWordsFile.ts';
import { FIXTURES, ruleTester, typedTester } from './ruleTester.ts';

const PART = 'app/components/organisms/Board/constants/boardConstants.ts';
const VIEW = 'app/components/organisms/Board/components/BoardRow.tsx';
const at = (code: string, filename = PART) => ({ filename, code });
const words = (count: number) =>
  Array.from({ length: count }, () => ({ messageId: 'word' as const }));
const fixture = (file: string) => ({
  filename: file,
  code: fs.readFileSync(path.join(FIXTURES, file), 'utf8'),
});

ruleTester.run('words-live-in-a-words-file', wordsLiveInAWordsFile, {
  valid: [
    ...[
      [
        "a key compared: `'Enter'`",
        "export const isEnter = (key: string): boolean => key === 'Enter';",
      ],
      [
        "a case: `'Escape'`",
        "export const kindOf = (key: string): number => { switch (key) { case 'Escape': return 1; default: return 0; } };",
      ],
      [
        "a map's key: `'Delete'`",
        "export const KEYS = new Map<string, string>([['Delete', 'remove']]);",
      ],
      [
        "a set's member: `'Enter'`",
        "export const KEYS = new Set(['Enter', 'Escape']);",
      ],
      [
        "a list looked up: `'Enter'`",
        "export const isKey = (key: string): boolean => ['Enter', 'Escape'].includes(key);",
      ],
      [
        "a lookup's argument: `'Enter'`",
        "export const isKey = (keys: Set<string>): boolean => keys.has('Enter');",
      ],
      [
        "a property's own name: `'Content align'`",
        "export const ROWS = { 'Content align': 1 };",
      ],
      [
        "a command's name, one word joined: `'RenameDocument'`",
        "export const SENT = { name: 'RenameDocument' };",
      ],
      [
        "a shortcut: `'Mod-k'`, `'Mod-Shift-s'`",
        "export const SHORTCUTS = ['Mod-k', 'Mod-Shift-s'];",
      ],
      [
        'a style: a length, a value, a selector',
        "export const LOOK = { outline: '1.5px dashed', align: 'flex-start', at: '& .MuiChip-label' };",
      ],
      [
        "a style's object: `PANEL_SX`, `sx`",
        "export const PANEL_SX = { fontFamily: 'Basis Grotesque Pro' };\nexport const ROW = { sx: { fontFamily: 'Inter' } };",
      ],
      [
        'a directive, an import, a type',
        "'use client';\nimport { X } from './Board.tsx';\nexport type Scheme = 'Light' | 'Dark';\nexport const Y = X;",
      ],
      ["one capital: an axis's `'X'`", "export const AXIS = 'X';"],
      [
        'a template with a hole and no space',
        'export const classOf = (name: string): string => `Mui${name}`;',
      ],
    ].map(([name = '', code = '']) => ({ name, ...at(code) })),
    {
      name: "markup's own: an attribute, a child (`wow/markup-syntax`)",
      ...at(
        'export const Save = (): JSX.Element => <Button label="Save">{\'Save\'}</Button>;',
        VIEW,
      ),
    },
  ],
  invalid: [
    ...[
      [
        'a label: `Preview settings`',
        "export const SETTINGS_LABEL = 'Preview settings';",
        1,
      ],
      [
        "a table's labels: `Light`, `Dark`",
        "export const SCHEMES = [{ label: 'Light' }, { label: 'Dark' }];",
        2,
      ],
      [
        "an adapter's button: `Create`",
        "export const toDialog = () => ({ primary: 'Create' });",
        1,
      ],
      [
        'a sentence opening on one letter: `A template is never sent`',
        "export const HINT = 'A template is never sent';",
        1,
      ],
      [
        'a sentence apart: `Not on a template · a template is never sent`',
        "export const TABS = { template: 'Not on a template · a template is never sent' };",
        1,
      ],
      [
        'a template with a hole: `Delete ${name}?`',
        'export const askOf = (name: string): string => `Delete ${name}?`;',
        1,
      ],
      [
        'a word frozen: `Coming soon` as const',
        "export const SOON = 'Coming soon' as const;",
        1,
      ],
    ].map(([name = '', code = '', count = 0]) => ({
      name: String(name),
      ...at(String(code)),
      errors: words(Number(count)),
    })),
    {
      name: "a label inside a prop's object, past markup's reach: `Layout`",
      ...at(
        "export const Tabs = (): JSX.Element => <Bar items={[{ label: 'Layout' }]} />;",
        VIEW,
      ),
      errors: words(1),
    },
  ],
});

typedTester.run('words-live-in-a-words-file, typed', wordsLiveInAWordsFile, {
  valid: [],
  invalid: [
    {
      name: "a command's name its type closes passes; its label does not",
      ...fixture('app/components/organisms/Board/utils/boardSendAdapters.ts'),
      errors: [{ messageId: 'word', data: { text: 'Assign a person' } }],
    },
    {
      name: "a style's type passes (`csstype`); a title does not",
      ...fixture(
        'app/components/organisms/Board/constants/boardLookConstants.ts',
      ),
      errors: [{ messageId: 'word', data: { text: 'Board look' } }],
    },
  ],
});
