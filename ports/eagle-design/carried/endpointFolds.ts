/**
 * - `ENDPOINT_FOLDS` · the endpoints and cases folded, the refine standing retired
 */
import type { Carried } from '../../../scripts/portTypes.ts';

const ENDPOINT_FOLDS: readonly Carried[] = [
  {
    file: 'app/pages/common/FoldList.tsx',
    blob: 'c3f971771bfe430d18943e3e4fb1035c0ea3c89c',
    how: 'design/app/components/molecules/FoldList: each fold the Fold atom, which are open in hooks/useFoldListOpened.ts; its words in contractWords.ts · folds',
  },
  {
    file: 'app/pages/common/FoldSection.tsx',
    blob: '3800e0f1846109bf39369f8b215a3536b84e0eb6',
    how: 'design/app/components/molecules/FoldSection: a molecule drawing the Fold atom, its hook in its folder',
  },
  {
    file: 'app/pages/common/foldLook.tsx',
    blob: '65d38ac1e2a45d153fe1b990b6693cfdf1c17717',
    how: 'design/app/components/atoms/Fold: the rounded frame in constants/foldRoundedConstants.ts, the mark in Fold.tsx, read by FoldSection and FoldList',
  },
  {
    file: 'app/pages/contract/ContractBody.tsx',
    blob: '11f4525b6a658248a793741e51049c6ab891a138',
    how: 'design/app/components/organisms/ContractBody/ContractBody.tsx, an organism the contract page and the board mount; its endpoints the EndpointFolds organism',
  },
  {
    file: 'app/pages/contract/EndpointFolds.tsx',
    blob: 'f6bd0d16f4a69e8d02181e44fd9ff40c6117aaf9',
    how: 'design/app/components/organisms/EndpointFolds: the FoldList molecule, its head components/EndpointFoldsHead.tsx moved from ContractBodyEndpointCard, its tones in constants/',
  },
  {
    file: 'app/pages/feature/ApiSection.tsx',
    blob: '20b1034e08ea74a1f13224b7455c8b2eccc3e928',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageApiSection.tsx, folded with its count, its endpoints the EndpointFolds organism; FeaturePageEndpointItem retired to legacy/',
  },
  {
    file: 'app/pages/feature/CaseTable.tsx',
    blob: 'ce6e5c0c1dc11c56d7e742d4cc3bf5a3b42db02f',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageCaseTable.tsx, its kind and reach in FeaturePageCaseChips; the endpoint’s name in FeaturePageCaseHead',
  },
  {
    file: 'app/pages/feature/CasesSection.tsx',
    blob: '7924c1af098a7304223addf483e3fc00f36897a7',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageCasesSection.tsx, folded with its count, each endpoint’s cases a fold of the FoldList molecule under FeaturePageCaseHead',
  },
  {
    file: 'app/pages/feature/FeatureHead.tsx',
    blob: '9efd168e15f8ea70a5f2238e1577dcdb059bb74b',
    how: 'design/app/components/organisms/FeaturePage/components/FeaturePageHead.tsx: the way back, FeaturePageEpicTabs, the source check folded; the jumps and FeaturePageSteps retired to legacy/',
  },
  {
    file: 'app/pages/feature/FeaturePage.tsx',
    blob: '1f416d8066076f396cfcfcac49eae86949b4fb36',
    how: 'design/app/components/organisms/FeaturePage/FeaturePage.tsx: the epic opened by hooks/useFeaturePageEpic.ts, from the address, then the pick; journeys, test cases, then the API',
  },
  {
    file: 'app/workspace/contract-view/contractWords.ts',
    blob: '5ad8d7ff7df42efaa0b6cb164f38b5a74aacc4d7',
    how: 'design/app/workspace/contractView/contractWords.ts names blockModel.ts, holds no sample, and words the folds',
  },
  {
    file: 'app/workspace/feature-view/featureTypes.ts',
    blob: 'e0c418266e4b9fb8dc0a83ba83124ba1d69826f3',
    how: 'design/app/workspace/featureView/featureTypes.ts, the notebook’s types, no steps',
  },
  {
    file: 'app/workspace/feature-view/featureWords.ts',
    blob: '8966d610efddf868bd118ae30b318303bda6173d',
    how: 'design/app/workspace/featureView/featureWords.ts, word for word',
  },
  {
    file: 'docs/documents/new-project.ts',
    blob: '6cc91337d9dc86aede522b54ff632c73b21bb605',
    how: 'design/docs/documents/new-project.ts, word for word: the features’ rows no longer a registry to cut',
  },
  {
    file: 'docs/skills/publish.ts',
    blob: '82d099db13348264025659fabc9503d1d3a25957',
    how: 'design/docs/skills/publish.ts, word for word: the module maps go with any bundle',
  },
  {
    file: 'tests/app/featureView.test.ts',
    blob: '3231eb35489959aa91b35d4b2fd815586a5e3947',
    how: 'design/tests/app/featureView.test.ts reads every epic’s notebook: no star left, a source unbracketed; the refine standing’s case retired with it',
  },
];

export { ENDPOINT_FOLDS };
