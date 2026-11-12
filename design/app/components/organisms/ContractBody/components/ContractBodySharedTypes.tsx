/**
 * - `ContractBodySharedTypes` · what every endpoint uses, the model's notes asked
 */
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';
import type { ContractPageView } from '../../../../workspace/contractView.ts';
import { CodeBlock } from '../../../molecules/CodeBlock/index.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';

interface ContractBodySharedTypesProps {
  readonly shared: ContractPageView['shared'];
}

function ContractBodySharedTypes({
  shared,
}: ContractBodySharedTypesProps): ReactElement {
  const [hasNotes, setHasNotes] = useState(false);
  return (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
      >
        <SectionHead label={words.shared.label} note={words.shared.note} />
        <Button size="small" onClick={() => setHasNotes(!hasNotes)}>
          {hasNotes ? words.shared.hideNotes : words.shared.showNotes}
        </Button>
      </Stack>
      <CodeBlock lines={hasNotes ? shared.notes : shared.bare} />
    </Stack>
  );
}

export { ContractBodySharedTypes };
