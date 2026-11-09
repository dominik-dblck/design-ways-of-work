import path from 'node:path';
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
// two component trees, as the build side keeps a mobile renderer's beside its app's
const COMPONENTS = ['app/components', 'app/renderers/mobile/components'];
const at = (filename: string, code = 'export const READ = 1;') => ({
  filename,
  code,
  options: [
    { names: NAMES, typesOnly: ['**/*Types.ts'], components: COMPONENTS },
  ] as const,
});

ruleTester.run('file-names-its-purpose', fileNamesItsPurpose, {
  valid: [
    ...[
      'app/components/organisms/BoardPage/components/BoardPageHead.tsx',
      'app/components/organisms/FeaturePage/utils/featurePageHeadJumpUtils.ts',
    ].map((file) => ({
      name: `a part named by what it holds: \`${path.posix.basename(file)}\``,
      ...at(file),
    })),
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
      options: [{ names: [], typesOnly: [], components: [] }] as const,
    },
    { name: 'a component and its test', ...at('app/Board.test.tsx') },
    ...[
      'app/components/organisms/EditorScreen/components/state-views/EditorScreenReadyView.tsx',
      'app/components/organisms/EditorScreen/EditorScreen.tsx',
      'app/components/organisms/EditorScreen/__tests__/aLineTakesItsStep.test.tsx',
      'docs/notes/molecules/Anything/parts/helper.ts',
    ].map((file) => ({
      name: `a part named for its component, its own file, its test, a tier outside the roots: \`${file}\``,
      ...at(file),
    })),
    ...[
      'app/components/organisms/BoardPage/utils/boardPageTonesUtils.ts',
      'app/components/organisms/BoardPage/utils/boardPageRowAdapters.ts',
      'app/components/organisms/Shelf/constants/shelfLabelWords.ts',
      'app/components/organisms/Shelf/constants/shelfWords.ts',
      'app/components/organisms/Shelf/constants/shelfConstants.ts',
      'app/components/organisms/Shelf/types/shelfTypes.ts',
      'app/components/organisms/Shelf/types/shelfAnswers.ts',
      'app/components/organisms/Shelf/providers/ShelfProvider.tsx',
      'app/components/organisms/Shelf/services/loadShelfService.ts',
    ].map((file) => ({
      name: `a drawer's file ends with its word, \`${path.posix.basename(file)}\``,
      ...at(file, 'type Read = 1;\nexport type { Read };'),
    })),
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
    ...[
      [
        'app/components/organisms/BoardPage/utils/boardPageTones.ts',
        'no closing word',
      ],
      [
        'app/components/organisms/BoardPage/utils/boardPageUtils.ts',
        'no purpose before it',
      ],
      ['app/utils/Utils.ts', 'the word alone'],
      ['app/components/organisms/Shelf/types/shelf.ts', 'no closing word'],
      [
        'app/components/organisms/Shelf/providers/ShelfState.tsx',
        'a provider not called one',
      ],
      [
        'app/components/organisms/Shelf/services/loadShelf.ts',
        'a service not called one',
      ],
    ].map(([file = '', why = '']) => ({
      name: `a drawer's file, ${why}: \`${path.posix.basename(file)}\``,
      ...at(file),
      errors: [{ messageId: 'closing' as const }],
    })),
    ...[
      'app/components/molecules/Planted/components/Row.tsx',
      'app/components/organisms/EditorScreen/components/state-views/ReadyView.tsx',
      'app/renderers/mobile/components/organisms/MobileHome/hooks/useHome.ts',
    ].map((file) => ({
      name: `a part not named for its component, at any depth: \`${file}\``,
      ...at(file),
      errors: [{ messageId: 'unnamed' as const }],
    })),
    ...[
      'app/components/organisms/BoardPage/components/BoardPagePageHead.tsx',
      'app/components/organisms/BoardPage/components/BoardPageBoardColumns.tsx',
      'app/components/organisms/FeaturePage/constants/featurePageFeatureStepsConstants.ts',
      'app/components/organisms/FeaturePage/hooks/useFeaturePageFeatureJump.ts',
    ].map((file) => ({
      name: `a part's own name opening with a word of its component's: \`${path.posix.basename(file)}\``,
      ...at(file),
      errors: [{ messageId: 'repeats' as const }],
    })),
    {
      name: 'an entry in camelCase',
      ...at('sheet/planPages.ts'),
      errors: [{ messageId: 'named' }],
    },
  ],
});
