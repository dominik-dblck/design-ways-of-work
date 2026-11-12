/**
 * - `ContractBodySharedTypes` · what every endpoint uses, folded; the notes asked
 */
import Button from '@mui/material/Button';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';
import type { ContractPageView } from '../../../../workspace/contractView.ts';
import { CodeBlock } from '../../../molecules/CodeBlock/index.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';

interface ContractBodySharedTypesProps {
  readonly shared: ContractPageView['shared'];
}

function ContractBodySharedTypes({
  shared,
}: ContractBodySharedTypesProps): ReactElement {
  const [hasNotes, setHasNotes] = useState(false);
  return (
    <FoldSection
      id="shared"
      label={words.shared.label}
      note={words.shared.note}
    >
      <Button
        size="small"
        sx={{ alignSelf: 'flex-end' }}
        onClick={() => setHasNotes(!hasNotes)}
      >
        {hasNotes ? words.shared.hideNotes : words.shared.showNotes}
      </Button>
      <CodeBlock lines={hasNotes ? shared.notes : shared.bare} />
    </FoldSection>
  );
}

export { ContractBodySharedTypes };
