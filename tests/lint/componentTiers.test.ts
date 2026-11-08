import { ESLint } from 'eslint';
import path from 'node:path';
import tseslint from 'typescript-eslint';
import { describe, expect, it } from 'vitest';
import type { Renderer } from '../../shared/lint/componentLadders.ts';
import { componentTiers } from '../../shared/lint/componentTiers.ts';
import { FIXTURES } from './ruleTester.ts';

// the shared config's own tiers on the fixtures' components, every import resolved on disk
const linterOf = (renderers: readonly Renderer[]): ESLint =>
  new ESLint({
    cwd: FIXTURES,
    overrideConfigFile: true,
    overrideConfig: [
      { files: ['**/*.ts'], languageOptions: { parser: tseslint.parser } },
      componentTiers({
        root: FIXTURES,
        components: ['app/components', 'app/renderers/mobile/components'],
        renderers,
      }),
    ],
  });
// the build side's shape: a phone drawn inside the app
const eslint = linterOf([{ folder: 'app/renderers/mobile', app: 'app' }]);
// the same two roots, read as one app
const oneApp = linterOf([]);

const messagesIn =
  (linter: ESLint) =>
  async (file: string, code: string): Promise<readonly string[]> => {
    const [linted] = await linter.lintText(code, {
      filePath: path.join(FIXTURES, file),
    });
    return (linted?.messages ?? []).map((one) => one.message);
  };
const messagesOf = messagesIn(eslint);

const ATOM = 'app/components/atoms/Mark/Mark.ts';
const MOLECULE = 'app/components/molecules/Field/Field.ts';
const ATOMIC = expect.stringContaining('An atom composes nothing');
const UPWARD = expect.stringContaining('never a tier above it');
const CONTEXT = expect.stringContaining('reads no context');
const PAST_THE_BARREL = expect.stringContaining('through its barrel');
const IN_ITS_HOOKS = expect.stringContaining('`providers/` or `hooks/`');

describe('the component tiers', () => {
  it("a renderer's components are no tier of the app's: any tier draws its template", async () => {
    expect(
      await messagesOf(
        ATOM,
        "import { HOME } from '../../../renderers/mobile/components/templates/Home/index.ts';",
      ),
    ).toEqual([]);
    expect(
      await messagesOf(
        MOLECULE,
        "import { HOME } from '../../../renderers/mobile/components/templates/Home/index.ts';",
      ),
    ).toEqual([]);
  });

  it("a renderer's tiers are held within it: its atom composes nothing of its own", async () => {
    expect(
      await messagesOf(
        'app/renderers/mobile/components/atoms/Dot/Dot.ts',
        "import { ROW } from '../../molecules/Row/index.ts';",
      ),
    ).toEqual([ATOMIC]);
  });

  it('two roots of the app climb one ladder: an atom of one composes nothing of the other', async () => {
    expect(
      await messagesIn(oneApp)(
        'app/renderers/mobile/components/atoms/Dot/Dot.ts',
        "import { MARK } from '../../../../../components/atoms/Mark/index.ts';",
      ),
    ).toEqual([ATOMIC]);
  });

  it('an atom composes no component by any spelling, and passes its own folder and a package', async () => {
    expect(
      await messagesOf(
        ATOM,
        [
          "import { BADGE } from '../Badge';",
          "import { PILL } from '../../molecules/Pill/index.ts';",
          "import { GLYPH } from '../../icons/Glyph.ts';",
          "import { KIT } from '@fixtures/app/components/kit/kit.ts';",
          "import { MARK } from './index.ts';",
          "import { useState } from 'react';",
        ].join('\n'),
      ),
    ).toEqual([ATOMIC, ATOMIC, ATOMIC, ATOMIC]);
  });

  it('a molecule composes atoms and molecules, never an organism nor a context', async () => {
    expect(
      await messagesOf(
        MOLECULE,
        [
          "import { MARK } from '../../atoms/Mark';",
          "import { PILL } from '../Pill';",
          "import { MENU_FIELD } from '../Menu/Menu.ts';",
          "import { BOARD } from '../../organisms/Board/index.ts';",
          "import { useContext, useState } from 'react';",
          "import { use } from 'react';",
          "import type { Context } from 'react';",
        ].join('\n'),
      ),
    ).toEqual([UPWARD, CONTEXT, CONTEXT]);
  });

  it('an organism is mounted through its barrel, from a page and from another organism', async () => {
    expect(
      await messagesOf(
        'app/pages/board.ts',
        [
          "import { BOARD } from '../components/organisms/Board/index.ts';",
          "import { SHELF_WORDS } from '../components/organisms/Shelf';",
          "import { ROW } from '../components/organisms/Board/components/Row.ts';",
          "import { WORDS } from '@fixtures/app/components/organisms/Shelf/constants/shelfWords.ts';",
        ].join('\n'),
      ),
    ).toEqual([PAST_THE_BARREL, PAST_THE_BARREL]);
    expect(
      await messagesOf(
        'app/components/organisms/Board/Board.ts',
        [
          "import { SHELF_WORDS } from '../Shelf';",
          "import { WORDS } from '../Shelf/constants/shelfWords.ts';",
          "import { ROW } from './components/Row.ts';",
        ].join('\n'),
      ),
    ).toEqual([PAST_THE_BARREL]);
  });

  it('an organism reads a context in its providers and hooks alone', async () => {
    expect(
      await messagesOf(
        'app/components/organisms/Board/components/Row.ts',
        "import { useContext } from 'react';\nimport { BOARD } from '../Board.ts';",
      ),
    ).toEqual([IN_ITS_HOOKS]);
    expect(
      await messagesOf(
        'app/components/organisms/Board/Board.ts',
        "import { use } from 'react';",
      ),
    ).toEqual([IN_ITS_HOOKS]);
    expect(
      await messagesOf(
        'app/components/organisms/Board/hooks/useBoard.ts',
        "import { useContext } from 'react';",
      ),
    ).toEqual([]);
    expect(
      await messagesOf(
        'app/components/organisms/Board/providers/BoardProvider.ts',
        "import { useContext } from 'react';",
      ),
    ).toEqual([]);
  });
});
