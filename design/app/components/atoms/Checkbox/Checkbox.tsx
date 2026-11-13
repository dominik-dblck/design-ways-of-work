/**
 * - `Checkbox` · a box and its tick
 * - in a selection row the halo is off: the row is the target
 */
import MuiCheckbox from '@mui/material/Checkbox';
import type { ChoiceProps } from '../../../utils/choiceControlUtils.ts';
import { choicePropsOf } from '../../../utils/choiceControlUtils.ts';

export type CheckboxProps = ChoiceProps;

export function Checkbox(props: CheckboxProps): React.ReactElement {
  return <MuiCheckbox {...choicePropsOf(props)} />;
}
