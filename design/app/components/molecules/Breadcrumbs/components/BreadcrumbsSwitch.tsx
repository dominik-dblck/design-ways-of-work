/**
 * - `BreadcrumbsSwitch` · a crumb that opens the menu its caller holds
 */
import ButtonBase from '@mui/material/ButtonBase';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import type { GlyphName } from '../../../atoms/Glyph/index.ts';
import { CRUMB_SWITCH_SX } from '../constants/breadcrumbsConstants.ts';
import { crumbInkOf } from '../utils/breadcrumbsLabelUtils.tsx';

type BreadcrumbsSwitchProps = {
  readonly label: string;
  readonly glyph?: GlyphName | undefined;
  readonly expanded: boolean;
  readonly muted?: boolean | undefined;
  readonly onSwitch: (anchor: HTMLElement) => void;
  readonly testId?: string | undefined;
};

/** The menu opens under the crumb that was pressed. */
export function BreadcrumbsSwitch({
  label,
  glyph,
  expanded,
  muted,
  onSwitch,
  testId,
}: BreadcrumbsSwitchProps): React.ReactElement {
  return (
    <ButtonBase
      data-testid={testId}
      aria-haspopup="menu"
      aria-expanded={expanded}
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        onSwitch(event.currentTarget)
      }
      sx={{ ...CRUMB_SWITCH_SX, color: crumbInkOf(muted) }}
    >
      {glyph === undefined ? null : <Glyph name={glyph} size="small" />}
      {label}
      <Glyph name="chevronDown" size="small" />
    </ButtonBase>
  );
}
