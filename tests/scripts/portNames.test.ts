import { describe, expect, it } from 'vitest';
import {
  importsAnew,
  movedFrom,
  movedTo,
  namedAnew,
  standingMoves,
} from '../../scripts/portNames.ts';

const moves = [
  { from: 'sheet/logic/gate-rules.ts', to: 'sheet/logic/gateRules.ts' },
  { from: 'app/styles/components.spec.ts', to: 'app/styles/componentsSpec.ts' },
  {
    from: 'app/styles/components.spec/atomsChip.ts',
    to: 'app/styles/componentsSpec/atomsChip.ts',
  },
  { from: 'app/view/index-page.ts', to: 'app/view/indexPage.ts' },
  { from: 'app/board/index-page.ts', to: 'app/board/boardIndex.ts' },
];

describe('a path of before the port, as after it', () => {
  it('a file takes its own row; one the trunk adds in a moved folder follows the folder', () => {
    expect(movedTo('sheet/logic/gate-rules.ts', moves)).toBe(
      'sheet/logic/gateRules.ts',
    );
    expect(movedTo('app/styles/components.spec/moleculesTag.ts', moves)).toBe(
      'app/styles/componentsSpec/moleculesTag.ts',
    );
    expect(movedTo('sheet/logic/kept.ts', moves)).toBe('sheet/logic/kept.ts');
  });

  it('a move the tree has undone since names nothing; one it stands on, or one that left, still does', () => {
    const undone = {
      from: 'fixtures/data/block-model.json',
      to: 'fixtures/data/blockModel.json',
    };
    const kept = {
      from: 'sheet/logic/gate-rules.ts',
      to: 'sheet/logic/gateRules.ts',
    };
    const left = {
      from: 'app/view/index-page.ts',
      to: 'app/view/indexPage.ts',
    };
    const tree = new Set([
      'fixtures/data/block-model.json',
      'sheet/logic/gateRules.ts',
    ]);
    const held = standingMoves([undone, kept, left], (file) => tree.has(file));
    expect(held).toStrictEqual([kept, left]);
    expect(
      namedAnew("fixture: 'fixtures/data/block-model.json'", { moves: held }),
    ).toBe("fixture: 'fixtures/data/block-model.json'");
  });

  it('and back', () => {
    expect(movedFrom('app/styles/componentsSpec/moleculesTag.ts', moves)).toBe(
      'app/styles/components.spec/moleculesTag.ts',
    );
  });
});

describe('a text of before the port, named as after it', () => {
  it('a whole path, a folder, and a bare file name as source and as built', () => {
    const before = [
      "home: 'sheet/logic/gate-rules.ts · RIGHTS'",
      "reads: ['gate-rules.ts · RIGHTS', 'gate-rules.js']",
      'see app/styles/components.spec/atomsChip.ts',
    ].join('\n');
    expect(namedAnew(before, { moves })).toBe(
      [
        "home: 'sheet/logic/gateRules.ts · RIGHTS'",
        "reads: ['gateRules.ts · RIGHTS', 'gateRules.js']",
        'see app/styles/componentsSpec/atomsChip.ts',
      ].join('\n'),
    );
  });

  it('a name two files moved off to two names is left: nothing is guessed', () => {
    expect(namedAnew("'index-page.ts'", { moves })).toBe("'index-page.ts'");
  });

  it('a name the port changed beyond a move is read where it stands bare, never at the end of a path', () => {
    const names = [['block-model.json', 'blockModel.ts']] as const;
    expect(
      namedAnew(
        "'block-model.json · Document' fixtures/data/block-model.json",
        {
          moves,
          names,
        },
      ),
    ).toBe("'blockModel.ts · Document' fixtures/data/block-model.json");
  });

  it('a longer name that holds one is another name', () => {
    expect(namedAnew('the-gate-rules.ts gate-rules.tsv', { moves })).toBe(
      'the-gate-rules.ts gate-rules.tsv',
    );
  });
});

describe('a file of the trunk, its imports from where it stands after the port', () => {
  const held = new Set([
    'app/styles/componentsSpec.ts',
    'app/styles/componentsSpec/atomsChip.ts',
    'app/styles/componentsSpec/moleculesTag.ts',
    'sheet/logic/gateRules.ts',
  ]);
  const exists = (file: string): boolean => held.has(file);

  it('an import of a moved file is written to where it stands; one that resolves is left', () => {
    const before = [
      "import { chip } from './components.spec/atomsChip.ts';",
      "import { tag } from './componentsSpec/moleculesTag.ts';",
      "import { rules } from '../../sheet/logic/gate-rules.ts';",
      "import { gone } from './nowhere.ts';",
    ].join('\n');
    expect(
      importsAnew(before, {
        file: 'app/styles/componentsSpec.ts',
        moves,
        exists,
      }),
    ).toBe(
      [
        "import { chip } from './componentsSpec/atomsChip.ts';",
        "import { tag } from './componentsSpec/moleculesTag.ts';",
        "import { rules } from '../../sheet/logic/gateRules.ts';",
        "import { gone } from './nowhere.ts';",
      ].join('\n'),
    );
  });

  it('a file in a moved folder reads its neighbour from the folder it stood in', () => {
    expect(
      importsAnew("export { chip } from '../components.spec/atomsChip.ts';", {
        file: 'app/styles/componentsSpec/moleculesTag.ts',
        moves,
        exists,
      }),
    ).toBe("export { chip } from './atomsChip.ts';");
  });
});
