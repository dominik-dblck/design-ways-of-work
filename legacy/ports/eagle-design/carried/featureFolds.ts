/**
 * - `FEATURE_FOLDS` · every epic its Feature page, the pages folded, the pick kept
 */
import type { Carried } from '../../../scripts/portTypes.ts';

const FEATURE_FOLDS: readonly Carried[] = [
  {
    file: 'app/pages/board/BarLegend.tsx',
    blob: 'c3ad7ae52132d4ad6a287b3ee8438e8925c7b4e6',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageBarLegend.tsx reads barColourOf from design/app/theme/tones.ts',
  },
  {
    file: 'app/pages/board/EpicProgress.tsx',
    blob: '21556927db6545dcbc58cea37ec457b317f705de',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageEpicProgress.tsx: no handler, each row a link',
  },
  {
    file: 'app/pages/board/EpicProgressRow.tsx',
    blob: '25b270cf9bd5ea2364440e4b17fef8a6c92a880c',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageEpicProgressRow.tsx links to the Feature page, its name in BoardPageEpicProgressName',
  },
  {
    file: 'app/pages/board/EpicTile.tsx',
    blob: '2d219bcab75236b6873d9a99cbf7fbe5e73c15a3',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageEpicTile.tsx reads badgeToneOf from design/app/theme/tones.ts',
  },
  {
    file: 'app/pages/board/PageHead.tsx',
    blob: '031bcefe28e12781d34e6fa09f70b0da7500e214',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageHead.tsx: the title alone',
  },
  {
    file: 'app/pages/board/PortsSection.tsx',
    blob: 'daad9357fe544437fc4f92c43a38c877fc6339d6',
    how: 'design/app/components/organisms/BoardPage/components/BoardPagePortsSection.tsx folds BoardPagePortGrid',
  },
  {
    file: 'app/pages/board/StackedBar.tsx',
    blob: '422b1b0c88b175de0f6bd161770161fb1b84de80',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageStackedBar.tsx reads barColourOf from design/app/theme/tones.ts',
  },
  {
    file: 'app/pages/board/TicketPanel.tsx',
    blob: 'cfec5f9996497bad186dd0e0f43becf1847f456a',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageTicketPanel.tsx reads toneOf from design/app/theme/tones.ts',
  },
  {
    file: 'app/pages/board/TicketRow.tsx',
    blob: '2bdf0b2303194b66731ba9fa7d6e2f23642b9ddd',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageTicketRow.tsx reads toneOf from design/app/theme/tones.ts',
  },
  {
    file: 'app/pages/common/CodePieces.tsx',
    blob: '2f515927764f80f8d250d6f58f3420435e18a9e5',
    how: 'design/app/components/atoms/CodePieces/constants/codePiecesInkConstants.ts: the theme’s code inks',
  },
  {
    file: 'app/pages/common/pickedEpic.ts',
    blob: 'bdc8dee414d7320146b7f88b401144df933afa13',
    how: 'design/app/workspace/boardView/boardPick.ts, exported as boardView · pickedEpic (remember, remembered, onRemembered); its key names no product',
  },
  {
    file: 'app/pages/common/tones.ts',
    blob: '8e60a12499afff2de8d48d38075ea29a7148ff37',
    how: 'design/app/theme/tones.ts, every tone with reachToneOf and caseKindToneOf',
  },
  {
    file: 'app/pages/contract/ContractHead.tsx',
    blob: 'ae74deb3204e4d72f0e9dcaca497b0a213e6d547',
    how: 'design/app/components/organisms/ContractPage/components/ContractPageHead.tsx: the eyebrow, the title, the intro',
  },
  {
    file: 'app/pages/contract/ContractPage.tsx',
    blob: '87251cbcedb5af50c35cfc665a798e9d469beabc',
    how: 'design/app/components/organisms/ContractPage/ContractPage.tsx: its head, then the ContractBody organism',
  },
  {
    file: 'app/pages/contract/ContractStats.tsx',
    blob: 'b0697f33649d254f5fa6ed382d7ec01b42ef2f2c',
    how: 'design/app/components/organisms/ContractBody/components/ContractBodyStats.tsx',
  },
  {
    file: 'app/pages/feature/CombinationsSection.tsx',
    blob: '7556e30163d9f1dd4a0fbc6fcaa438cb7986cb2d',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageCombinationsSection.tsx, folded with its count',
  },
  {
    file: 'app/pages/feature/ComponentsSection.tsx',
    blob: '4a818417f02d4a8f45dc7ec5bd57d07b0dd6cb4a',
    how: 'the home draws no wireframe section: the .dc.html wireframes left the way of working (870987c)',
  },
  {
    file: 'app/pages/feature/DecisionsSection.tsx',
    blob: '9af5897399201cc4c758c9c47ed3112e20734fae',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageDecisionsSection.tsx, folded with its count',
  },
  {
    file: 'app/pages/feature/FieldsSection.tsx',
    blob: '741c30f2fefe7b6a1a722d784fb9d81d71de0753',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageFieldsSection.tsx, folded with its count',
  },
  {
    file: 'app/pages/feature/JourneyItem.tsx',
    blob: '7d9f060294047c1f58e9f8ba276a2d3386e888d0',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageJourneyItem.tsx, its chips in FeaturePageJourneyChips',
  },
  {
    file: 'app/pages/feature/JourneyStep.tsx',
    blob: '8c0b5045afe7103c3a5b62b301cc93906d0c0fcf',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageJourneyStepItem.tsx, its cases in FeaturePageStepCovers',
  },
  {
    file: 'app/pages/feature/JourneysSection.tsx',
    blob: '25ee112cf572552a4648a109d7b6ef8ec8df08cf',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageJourneysSection.tsx, folded with its count',
  },
  {
    file: 'app/pages/feature/NoteItem.tsx',
    blob: 'c409a182b59af291c7e10d8e7bc0a5b863faccd7',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageNoteItem.tsx, its points in FeaturePageNotePoints',
  },
  {
    file: 'app/pages/feature/NotesSection.tsx',
    blob: 'd3dbdfd9315bc152e1b60e34f443ea2f53a94670',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageNotesSection.tsx, each section a FeaturePageNoteSectionCard',
  },
  {
    file: 'app/pages/feature/ScreensSection.tsx',
    blob: '93e46e179bd1c9eb7ede639103a06a4112bfcf1b',
    how: 'the home draws no wireframe section: the .dc.html wireframes left the way of working (870987c)',
  },
  {
    file: 'app/pages/feature/SourceSection.tsx',
    blob: 'a9e9a96fe1760e202b09d04b797d6fc7c8565e0b',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageSourceSection.tsx, folded, under the title',
  },
  {
    file: 'app/theme/palette.ts',
    blob: 'ba951d25fadb45b4b34b0d188773d692b0405b7a',
    how: 'design/app/theme/palette.ts, word for word',
  },
  {
    file: 'app/theme/theme.ts',
    blob: 'b12a73e4797a0a53ca9cca0aecd4667d4d055eb8',
    how: 'design/app/theme/theme.ts, word for word',
  },
  {
    file: 'app/workspace/board-view/boardAside.ts',
    blob: '0b79305916c675ec0941dae4e548ec1eebb06d3d',
    how: 'design/app/workspace/boardView/boardAside.ts, word for word',
  },
  {
    file: 'app/workspace/board-view/boardProgressTypes.ts',
    blob: '8f245932ecd967ec199f9410f9a9c6496282a279',
    how: 'design/app/workspace/boardView/boardProgressTypes.ts, word for word',
  },
  {
    file: 'app/workspace/feature-view/featureJourneys.ts',
    blob: '63fd6f848b28934ef95cebbe8dc2f8f1c2a3d699',
    how: 'design/app/workspace/featureView/featureJourneys.ts, word for word',
  },
];

export { FEATURE_FOLDS };
