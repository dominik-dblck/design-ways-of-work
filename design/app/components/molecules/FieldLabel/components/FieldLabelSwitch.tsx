/**
 * - `FieldLabelSwitch` · the switch a label row ends in, its glyph and words first
 */
import Box from '@mui/material/Box';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { Switch } from '../../../atoms/Switch/index.ts';
import { Text } from '../../../atoms/Text/index.ts';
import { LABEL_TOGGLE_SX } from '../constants/fieldLabelConstants.ts';
import type { FieldLabelToggle } from '../types/fieldLabelTypes.ts';

type FieldLabelSwitchProps = {
  readonly toggle: FieldLabelToggle;
};

/** The words and the switch are one label, so a press on either flips it. */
export function FieldLabelSwitch({
  toggle,
}: FieldLabelSwitchProps): React.ReactElement {
  return (
    <Box component="label" sx={LABEL_TOGGLE_SX}>
      {toggle.icon === undefined ? null : (
        <Glyph name={toggle.icon} size="inline" />
      )}
      <Text tone="secondary">{toggle.label}</Text>
      <Switch
        checked={toggle.selected}
        label={toggle.label}
        onChange={toggle.onToggle}
        testId={toggle.testId}
      />
    </Box>
  );
}
