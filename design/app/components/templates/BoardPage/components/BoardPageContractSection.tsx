/**
 * - `BoardPageContractSection` · the whole API contract, folded under its head
 */
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import { contractWords } from '../../../../workspace/contractView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { ContractBody } from '../../../organisms/ContractBody/index.ts';

function BoardPageContractSection(): ReactElement {
  return (
    <FoldSection
      id="contract"
      label={words.contract.label}
      note={contractWords.title}
    >
      <ContractBody />
    </FoldSection>
  );
}

export { BoardPageContractSection };
