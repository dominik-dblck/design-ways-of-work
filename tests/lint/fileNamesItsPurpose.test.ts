import { fileNamesItsPurpose } from '../../shared/lint/rules/fileNamesItsPurpose.ts';
import { ruleTester } from './ruleTester.ts';

// a design side's names: an entry kebab-case, a part camelCase or its epic's, never `index`
const NAMES = [
  {
    files: ['sheet/*.ts'],
    stem: '^(?!index$)[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
    why: 'an entry is kebab-case (docs/rules/names.md)',
  },
  {
    files: ['sheet/words/**', 'roadmaps/E04/**'],
    stem: '^(?!index$)(?:[a-z][A-Za-z0-9]*|E\\d{2}[A-Za-z]*)$',
    why: 'a part is camelCase or its epic (docs/rules/names.md)',
  },
];
const at = (filename: string, code = 'export const READ = 1;') => ({
  filename,
  code,
  options: [{ names: NAMES, typesOnly: ['**/*Types.ts'] }] as const,
});

ruleTester.run('file-names-its-purpose', fileNamesItsPurpose, {
  valid: [
    { name: 'an entry, kebab-case', ...at('sheet/plan-pages.ts') },
    { name: 'a part, camelCase', ...at('sheet/words/rowsOfPlans.ts') },
    { name: "a part, its epic's", ...at('roadmaps/E04/E04Run.ts') },
    {
      name: 'a types file of types, imported as types',
      ...at(
        'sheet/words/wordTypes.ts',
        "import type { Row } from './rows.ts';\ninterface Word { readonly row: Row }\ntype Words = readonly Word[];\nexport type { Word, Words };",
      ),
    },
    {
      name: 'an index that re-exports',
      ...at(
        'app/components/atoms/Mark/index.ts',
        "// the mark\nexport { Mark } from './Mark.tsx';\nexport type { MarkProps } from './Mark.tsx';\nexport * from './markWords.ts';",
      ),
    },
    { name: 'a declaration file', ...at('app/env.d.ts') },
    {
      name: '`types` and `content-types` are no `*Types` file: a glob keeps its case',
      ...at('docs/rules/types.ts'),
    },
    { name: 'a kebab entry ending in types', ...at('sheet/content-types.ts') },
    ...[
      'sha256',
      'base64',
      'utf8',
      'int32',
      'md5',
      'es2017',
      'contentSha256',
      'imageBase64',
      'uint8',
    ].map((stem) => ({
      name: `a term's digits, \`${stem}\``,
      ...at(`tools/${stem}.ts`),
    })),
    {
      name: 'a types file the scope does not keep to types, holding a schema',
      ...at('app/types/documentTypes.ts'),
      options: [{ names: [], typesOnly: [] }] as const,
    },
    { name: 'a component and its test', ...at('app/Board.test.tsx') },
  ],
  invalid: [
    {
      name: "a drawer's name",
      ...at('app/board/utils.ts'),
      errors: [{ messageId: 'drawer' }],
    },
    {
      name: 'named by a number, as a word and as a digit',
      ...at('sheet/words/rowsTwo.ts'),
      errors: [{ messageId: 'number' }],
    },
    ...[
      'settledFrom1',
      'settledFrom25',
      'part3',
      'step2',
      'index2',
      'rules2',
      'changed2',
      'matrix3',
      'box2',
    ].map((stem) => ({
      name: `a split's count, \`${stem}\``,
      ...at(`sheet/words/${stem}.ts`),
      errors: [{ messageId: 'number' as const }],
    })),
    {
      name: 'a types file holding a value',
      ...at(
        'docs/plans/plansTypes.ts',
        "import type { Row } from './rows.ts';\ntype Rows = readonly Row[];\nexport const A = 1;\nexport type { Rows };",
      ),
      errors: [{ messageId: 'types', line: 3 }],
    },
    {
      name: 'an index holding its own code',
      ...at(
        'app/components/atoms/Mark/index.ts',
        "export { Mark } from './Mark.tsx';\nexport const MARK = 1;",
      ),
      errors: [{ messageId: 'index', line: 2 }],
    },
    {
      name: 'a part in kebab-case',
      ...at('sheet/words/plan-pages.ts'),
      errors: [{ messageId: 'named' }],
    },
    {
      name: 'an entry in camelCase',
      ...at('sheet/planPages.ts'),
      errors: [{ messageId: 'named' }],
    },
  ],
});
