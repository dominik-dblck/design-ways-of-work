/**
 * - `LoginFormWayButton` · one way in, a spinner for its icon while it waits
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { Button } from '../../../atoms/Button/index.ts';
import { sxListOf } from '../../../../utils/sxListUtils.ts';
import { LOGIN_WAY_SX } from '../constants/loginFormConstants.ts';
import type { LoginFormWay as Way } from '../types/loginFormTypes.ts';

type LoginFormWayButtonProps = {
  readonly way: Way;
  readonly isWaiting: boolean;
  readonly onPress: () => void;
  // where it stands in the card's entrance
  readonly sx: SxProps<Theme>;
};

/** Pressed once, it waits until the page leaves. */
export function LoginFormWayButton({
  way,
  isWaiting,
  onPress,
  sx,
}: LoginFormWayButtonProps): React.ReactElement {
  return (
    <Button
      testId={way.testId}
      variant="outlined"
      size="lg"
      startIcon={way.icon}
      loading={isWaiting}
      onClick={onPress}
      sx={[LOGIN_WAY_SX, ...sxListOf(sx)]}
    >
      {way.label}
    </Button>
  );
}
