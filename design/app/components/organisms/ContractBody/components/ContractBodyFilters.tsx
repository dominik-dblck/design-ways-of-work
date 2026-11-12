/**
 * - `ContractBodyFilters` · the endpoints narrowed by state and by epic
 */
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import type { ContractPageView } from '../../../../workspace/contractView.ts';
import type { Picked } from '../utils/contractBodyPickedUtils.ts';
import { ContractBodyEpicChips } from './ContractBodyEpicChips.tsx';
import { ContractBodyStateToggle } from './ContractBodyStateToggle.tsx';

interface ContractBodyFiltersProps {
  readonly page: ContractPageView;
  readonly picked: Picked;
  readonly onPick: (picked: Picked) => void;
}

function ContractBodyFilters({
  page,
  picked,
  onPick,
}: ContractBodyFiltersProps): ReactElement {
  return (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{ flexWrap: 'wrap', alignItems: 'center' }}
    >
      <ContractBodyStateToggle
        states={page.states}
        picked={picked}
        onPick={onPick}
      />
      <ContractBodyEpicChips
        epics={page.epics}
        picked={picked}
        onPick={onPick}
      />
    </Stack>
  );
}

export { ContractBodyFilters };
