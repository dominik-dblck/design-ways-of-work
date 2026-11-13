/**
 * - `Radio` · Checkbox's six states and its in-row rule, a pill with a 6px dot
 */
import MuiRadio from '@mui/material/Radio';
import type { ChoiceProps } from '../../../utils/choiceControlUtils.ts';
import { choicePropsOf } from '../../../utils/choiceControlUtils.ts';

export type RadioProps = ChoiceProps;

export function Radio(props: RadioProps): React.ReactElement {
  return <MuiRadio {...choicePropsOf(props)} />;
}
