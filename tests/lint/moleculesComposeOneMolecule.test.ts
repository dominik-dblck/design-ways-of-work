import { ESLint } from 'eslint';
import tseslint from 'typescript-eslint';
import { describe, expect, it } from 'vitest';
import { moleculesComposeOneMolecule } from '../../shared/lint/rules/moleculesComposeOneMolecule.ts';
import { wowPlugin } from '../../shared/lint/wowPlugin.ts';
import { FIXTURES, ruleTester } from './ruleTester.ts';

const ROOTS = [
  { tests: [], components: ['app/components'], renderers: [] },
] as const;
// the build side's shape: the app's components, and a phone drawn inside the app
const WITH_A_RENDERER = [
  {
    tests: [],
    components: ['app/components', 'app/renderers/mobile/components'],
    renderers: [{ folder: 'app/renderers/mobile', app: 'app' }],
  },
] as const;

ruleTester.run('molecules-compose-one-molecule', moleculesComposeOneMolecule, {
  valid: [
    {
      name: 'atoms and one molecule',
      filename: 'app/components/molecules/Menu/Menu.ts',
      options: ROOTS,
      code: "import { MARK } from '../../atoms/Mark/index.ts';\nimport { PILL } from '../Pill/index.ts';\nimport { OWN } from './index.ts';",
    },
    {
      name: 'a file outside the molecules',
      filename: 'app/components/organisms/Board/Board.ts',
      options: ROOTS,
      code: "import { PILL } from '../../molecules/Pill/index.ts';\nimport { FIELD } from '../../molecules/Field/index.ts';",
    },
    {
      name: "a renderer's molecule spends none of the app's count",
      filename: 'app/components/molecules/Menu/Menu.ts',
      options: WITH_A_RENDERER,
      code: "import { PILL } from '../Pill/index.ts';\nimport { ROW } from '../../../renderers/mobile/components/molecules/Row/index.ts';",
    },
    {
      name: 'a root the scope does not name is not read',
      filename: 'app/renderers/mobile/components/molecules/Menu/Menu.ts',
      options: ROOTS,
      code: "import { PILL } from '../Pill/index.ts';\nimport { FIELD } from '../Field/index.ts';",
    },
  ],
  invalid: [
    {
      name: "two molecules on a renderer's own ladder",
      filename: 'app/renderers/mobile/components/molecules/Menu/Menu.ts',
      options: WITH_A_RENDERER,
      code: "import { PILL } from '../Pill/index.ts';\nimport { FIELD } from '../Field/index.ts';",
      errors: [{ messageId: 'two' }, { messageId: 'two' }],
    },
    {
      name: 'two roots of the app climb one ladder: their molecules count together',
      filename: 'app/components/molecules/Menu/Menu.ts',
      options: [
        {
          tests: [],
          components: ['app/components', 'app/kit/components'],
          renderers: [],
        },
      ],
      code: "import { PILL } from '../Pill/index.ts';\nimport { ROW } from '../../../kit/components/molecules/Row/index.ts';",
      errors: [{ messageId: 'two' }, { messageId: 'two' }],
    },
    {
      name: 'two molecules in one file',
      filename: 'app/components/molecules/Menu/Menu.ts',
      options: ROOTS,
      code: "import { PILL } from '../Pill/index.ts';\nimport { FIELD } from '../Field/index.ts';",
      errors: [{ messageId: 'two' }, { messageId: 'two' }],
    },
    {
      name: 'two molecules, one exported from, one imported on demand',
      filename: 'app/components/molecules/Menu/Menu.ts',
      options: ROOTS,
      code: "export { PILL } from '../Pill/index.ts';\nexport const loadField = () => import('../Field/index.ts');",
      errors: [{ messageId: 'two' }, { messageId: 'two' }],
    },
    {
      name: 'two molecules, each by its folder',
      filename: 'app/components/molecules/Menu/Menu.ts',
      options: ROOTS,
      code: "import { PILL } from '../Pill';\nimport { FIELD } from '../Field';",
      errors: [{ messageId: 'two' }, { messageId: 'two' }],
    },
  ],
});

// the folder's files counted together, linted from the repository's root as a repository is
const eslint = new ESLint({
  cwd: FIXTURES,
  overrideConfigFile: true,
  overrideConfig: [
    {
      files: ['**/*.ts'],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: FIXTURES,
        },
      },
      plugins: { wow: wowPlugin },
      rules: {
        'wow/molecules-compose-one-molecule': [
          'error',
          {
            tests: ['**/__tests__/**'],
            components: ['app/components'],
            renderers: [],
          },
        ],
      },
    },
  ],
});

describe('molecules-compose-one-molecule, the folder', () => {
  it('a second molecule in another file of the folder', async () => {
    const [index, menu] = await eslint.lintFiles([
      'app/components/molecules/Menu/index.ts',
      'app/components/molecules/Menu/Menu.ts',
    ]);
    const COUNTED = '`Menu` composes 2 molecules (Field, Pill)';
    expect(index?.messages.map((one) => one.message)).toEqual([
      expect.stringContaining(COUNTED),
    ]);
    expect(menu?.messages.map((one) => one.message)).toEqual([
      expect.stringContaining(COUNTED),
    ]);
  });

  it('an export from and an import on demand count, in any file of the folder', async () => {
    const linted = await eslint.lintFiles([
      'app/components/molecules/Chip/index.ts',
      'app/components/molecules/Chip/Chip.ts',
    ]);
    expect(
      linted.map((one) => one.messages.map((message) => message.message)),
    ).toEqual([
      [expect.stringContaining('`Chip` composes 2 molecules (Field, Pill)')],
      [expect.stringContaining('`Chip` composes 2 molecules (Field, Pill)')],
    ]);
  });

  it("a test of the folder is not counted: its import is the test's", async () => {
    const linted = await eslint.lintFiles([
      'app/components/molecules/Tag/Tag.ts',
    ]);
    expect(linted.flatMap((one) => one.messages)).toEqual([]);
  });
});
