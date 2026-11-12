/**
 * - `ContractPageFilters` · the endpoints narrowed by state and by epic
 */
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import type { ContractPageView } from '../../../../workspace/contractView.ts';
import type { Picked } from '../utils/contractPagePickedUtils.ts';
import { ContractPageEpicChips } from './ContractPageEpicChips.tsx';
import { ContractPageStateToggle } from './ContractPageStateToggle.tsx';

interface ContractPageFiltersProps {
  readonly page: ContractPageView;
  readonly picked: Picked;
  readonly onPick: (picked: Picked) => void;
}

function ContractPageFilters({
  page,
  picked,
  onPick,
}: ContractPageFiltersProps): ReactElement {
  return (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{ flexWrap: 'wrap', alignItems: 'center' }}
    >
      <ContractPageStateToggle
        states={page.states}
        picked={picked}
        onPick={onPick}
      />
      <ContractPageEpicChips
        epics={page.epics}
        picked={picked}
        onPick={onPick}
      />
    </Stack>
  );
}

export { ContractPageFilters };
