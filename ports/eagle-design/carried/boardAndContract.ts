/**
 * - `BOARD_AND_CONTRACT` · the board's epic list and the API contract page, carried
 */
import type { Carried } from '../../../scripts/portTypes.ts';

const BOARD_AND_CONTRACT: readonly Carried[] = [
  {
    file: 'app/pages/board/BarLegend.tsx',
    blob: 'faddfad62f15b39bfe19868fb900983ef05cc55a',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageBarLegend.tsx, its swatch a radius role',
  },
  {
    file: 'app/pages/board/EpicProgress.tsx',
    blob: '50fd9a520224baa2bfe2b618f8cc15b8edc76905',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageEpicProgress.tsx, its corner a radius role',
  },
  {
    file: 'app/pages/board/EpicProgressRow.tsx',
    blob: '06924f44b10ede97ef4d04b51eabfdfbe21132fa',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageEpicProgressRow.tsx, its grid in constants/',
  },
  {
    file: 'app/pages/board/StackedBar.tsx',
    blob: 'de5775a64048ab3084101561cce344bfd62d2efe',
    how: 'design/app/components/organisms/BoardPage/components/BoardPageStackedBar.tsx, its order in constants/',
  },
  {
    file: 'app/pages/board/tones.ts',
    blob: '0cdb5db1d4b1b690b359c5007218aae57726956e',
    how: 'design/app/components/organisms/BoardPage/utils/boardPageTonesUtils.ts · barColourOf',
  },
  {
    file: 'app/pages/common/CodeBlock.tsx',
    blob: '3f69c666f2d3307dae7206d71c7223494a7c8916',
    how: 'design/app/components/molecules/CodeBlock: a molecule now, it draws the CodePieces atom',
  },
  {
    file: 'app/pages/common/CodePieces.tsx',
    blob: '966770ceb6194198d8f9fe8833ffc84cb2fb90be',
    how: 'design/app/components/atoms/CodePieces, with the ink and the weight CodeBlock held',
  },
  {
    file: 'app/pages/contract.tsx',
    blob: '973287fb5b7f753d3175b0d526a1dd81aeb5d3cf',
    how: 'design/app/pages/contract.tsx draws the ContractPage organism',
  },
  {
    file: 'app/pages/contract/ContractFilters.tsx',
    blob: '196c20537346c6e40ff9aa71725d143dccf52325',
    how: 'design/app/components/organisms/ContractPage/components/ContractPageFilters.tsx, split in ContractPageStateToggle and ContractPageEpicChips',
  },
  {
    file: 'app/pages/contract/ContractHead.tsx',
    blob: 'd8a017e2cba4e9c54edbb59c69d00ee91f38c9bd',
    how: 'design/app/components/organisms/ContractPage/components/ContractPageHead.tsx, its tiles in constants/',
  },
  {
    file: 'app/pages/contract/ContractLegend.tsx',
    blob: 'df751e0c052399e7c5837f7556eb885b32cddeb0',
    how: 'design/app/components/organisms/ContractPage/components/ContractPageLegend.tsx',
  },
  {
    file: 'app/pages/contract/ContractPage.tsx',
    blob: 'f01dc0e1ca3bc5dba3290aa41236764a3f931fa9',
    how: 'design/app/components/organisms/ContractPage/ContractPage.tsx, the filters read by utils/contractPagePickedUtils.ts',
  },
  {
    file: 'app/pages/contract/EndpointCard.tsx',
    blob: '1a8e5871b00901c21009c0fc746ced0dbd60b0de',
    how: 'design/app/components/organisms/ContractPage/components/ContractPageEndpointCard.tsx, its tones in constants/',
  },
  {
    file: 'app/pages/contract/SharedTypes.tsx',
    blob: '414f7790ca0629c5ad9c8785bf1fb19d76695e54',
    how: 'design/app/components/organisms/ContractPage/components/ContractPageSharedTypes.tsx',
  },
  {
    file: 'app/workspace/board-view/boardProgressTypes.ts',
    blob: 'f386968743441264ba18dbb879c2d0966aec98dc',
    how: 'design/app/workspace/boardView/boardProgressTypes.ts, word for word',
  },
  {
    file: 'app/workspace/contract-view.ts',
    blob: 'af0c5ec0d1bd8ff88b90793e7de0368e5876e3dc',
    how: 'design/app/workspace/contractView.ts exports contractPage, contractWords and the page’s types; the page’s type is ContractPageView',
  },
  {
    file: 'app/workspace/contract-view/contractPage.ts',
    blob: '5bfcd06e5c9dffb945c9f5c1b68327a4041416b8',
    how: 'design/app/workspace/contractView/contractPage.ts: the legend’s samples are the model’s first two aliases',
  },
  {
    file: 'app/workspace/contract-view/contractPageTypes.ts',
    blob: '61fa48acc2c75b8037fd4ff47bfc9592f0689068',
    how: 'design/app/workspace/contractView/contractPageTypes.ts, the page’s type named ContractPageView',
  },
  {
    file: 'app/workspace/contract-view/sharedCode.ts',
    blob: '7affde9c9726fde682519bf8354549ea8267ea42',
    how: 'design/app/workspace/contractView/sharedCode.ts reads blockModel.ts, the aliases’ names by aliasNames',
  },
];

export { BOARD_AND_CONTRACT };
