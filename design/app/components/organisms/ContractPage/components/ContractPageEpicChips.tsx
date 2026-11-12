/**
 * - `ContractPageEpicChips` · one epic picked, or all of them
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';
import type { Picked } from '../utils/contractPagePickedUtils.ts';

interface ContractPageEpicChipsProps {
  readonly epics: readonly string[];
  readonly picked: Picked;
  readonly onPick: (picked: Picked) => void;
}

function ContractPageEpicChips({
  epics,
  picked,
  onPick,
}: ContractPageEpicChipsProps): ReactElement {
  return (
    <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {[null, ...epics].map((epic) => (
        <Chip
          key={epic ?? 'all'}
          size="small"
          label={epic ?? words.allEpics}
          color={picked.epic === epic ? 'primary' : 'default'}
          onClick={() => onPick({ ...picked, epic })}
        />
      ))}
    </Stack>
  );
}

export { ContractPageEpicChips };
