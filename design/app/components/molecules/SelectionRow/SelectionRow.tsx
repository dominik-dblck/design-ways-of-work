/**
 * - `SelectionRow` · the row is the target, the control is not
 */
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '../../atoms/ListItem/index.ts';
import { Checkbox } from '../../atoms/Checkbox/index.ts';
import { Radio } from '../../atoms/Radio/index.ts';
import { Divider } from '../../atoms/Divider/index.ts';

export type SelectionRowProps = {
  readonly primary: string;
  readonly secondary?: string;
  readonly multiple?: boolean;
  readonly checked?: boolean;
  readonly disabled?: boolean;
  readonly last?: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly testId?: string;
};

export function SelectionRow({
  primary,
  secondary,
  multiple = false,
  checked = false,
  disabled = false,
  last = false,
  onChange,
  testId,
}: SelectionRowProps): React.ReactElement {
  const Control = multiple ? Checkbox : Radio;
  return (
    <>
      <ListItem
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        testId={testId}
      >
        <Control checked={checked} disabled={disabled} inRow />
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
      {last ? null : <Divider />}
    </>
  );
}
