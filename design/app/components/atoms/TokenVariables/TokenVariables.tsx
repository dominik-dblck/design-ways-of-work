/**
 * - `TokenVariables` · every token as its CSS variable, per mode, on the page
 */
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { muiDarkOf, tokenSheetOf } from '../../../styles/theme.ts';
import { tokens } from '../../../styles/tokens.ts';

/** Drawn once under the theme it reads · an override's `var()` then follows the mode, and so does MUI's own. */
export function TokenVariables(): React.ReactElement {
  const theme = useTheme();
  const sheet = useMemo(
    () =>
      tokenSheetOf({
        light: tokens.light,
        dark: tokens.dark,
        muiDark: muiDarkOf(theme),
      }),
    [theme],
  );
  return <GlobalStyles styles={sheet} />;
}
