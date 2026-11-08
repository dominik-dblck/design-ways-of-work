import { describe, expect, it } from 'vitest';
import { componentFolders } from '../../shared/lint/componentFolders.ts';
import { lintedTree } from './lintedTree.ts';

// two component trees, as the build side keeps a mobile renderer's beside its app's
const RULES = componentFolders([
  'app/components',
  'app/renderers/mobile/components',
]);
const COMPONENTS = 'app/components';

describe('a component folder has its shape', () => {
  it('its file, its barrel, its parts at any depth, its tests, a dotfile', () => {
    expect(
      lintedTree(
        [
          `${COMPONENTS}/atoms/Dot/Dot.tsx`,
          `${COMPONENTS}/atoms/Dot/index.ts`,
          `${COMPONENTS}/atoms/Dot/utils/dotSizeUtils.ts`,
          `${COMPONENTS}/organisms/EditorScreen/EditorScreen.tsx`,
          `${COMPONENTS}/organisms/EditorScreen/index.ts`,
          `${COMPONENTS}/organisms/EditorScreen/.DS_Store`,
          `${COMPONENTS}/organisms/EditorScreen/hooks/useEditorScreenSave.ts`,
          `${COMPONENTS}/organisms/EditorScreen/components/state-views/EditorScreenReadyView.tsx`,
          `${COMPONENTS}/organisms/EditorScreen/__tests__/aLineTakesItsStep.test.tsx`,
          `${COMPONENTS}/organisms/__tests__/theTiers.test.ts`,
          'app/renderers/mobile/components/organisms/MobileHome/MobileHome.tsx',
        ],
        RULES,
      ),
    ).toEqual([]);
  });

  it('a loose file, a stray folder, an atom with parts, under either root', () => {
    expect(
      lintedTree(
        [
          `${COMPONENTS}/molecules/Planted/Planted.tsx`,
          `${COMPONENTS}/molecules/Planted/index.ts`,
          `${COMPONENTS}/molecules/Planted/plantedWords.ts`,
          `${COMPONENTS}/molecules/Planted/queries/plantedQuery.ts`,
          `${COMPONENTS}/molecules/Planted/Extra/Extra.tsx`,
          `${COMPONENTS}/molecules/Planted/components/PlantedRow.tsx`,
          `${COMPONENTS}/molecules/Planted/components/Row.tsx`,
          `${COMPONENTS}/organisms/EditorScreen/components/state-views/ReadyView.tsx`,
          `${COMPONENTS}/atoms/Dot/components/DotPart.tsx`,
          'app/renderers/mobile/components/organisms/MobileHome/homeWords.ts',
        ],
        RULES,
      ),
    ).toEqual([
      `${COMPONENTS}/atoms/Dot/components`,
      `${COMPONENTS}/atoms/Dot/components`,
      `${COMPONENTS}/molecules/Planted/Extra`,
      `${COMPONENTS}/molecules/Planted/Extra`,
      `${COMPONENTS}/molecules/Planted/plantedWords.ts`,
      `${COMPONENTS}/molecules/Planted/queries`,
      `${COMPONENTS}/molecules/Planted/queries/plantedQuery.ts`,
      'app/renderers/mobile/components/organisms/MobileHome/homeWords.ts',
    ]);
  });
});
