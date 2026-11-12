/**
 * - `ContractPageStateToggle` · one state picked, or all of them
 */
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { ReactElement } from 'react';
import type { ContractPageView } from '../../../../workspace/contractView.ts';
import type { Picked } from '../utils/contractPagePickedUtils.ts';

interface ContractPageStateToggleProps {
  readonly states: ContractPageView['states'];
  readonly picked: Picked;
  readonly onPick: (picked: Picked) => void;
}

function ContractPageStateToggle({
  states,
  picked,
  onPick,
}: ContractPageStateToggleProps): ReactElement {
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={picked.state ?? 'all'}
      onChange={(_, asked: unknown) =>
        onPick({
          ...picked,
          state: states.find((one) => one.id === asked)?.id ?? null,
        })
      }
    >
      {states.map((one) => (
        <ToggleButton key={one.label} value={one.id ?? 'all'}>
          {one.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export { ContractPageStateToggle };
