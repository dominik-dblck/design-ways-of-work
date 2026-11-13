/**
 * - `TokenVariables` · every token as its CSS variable, per mode, on the page
 */
import GlobalStyles from '@mui/material/GlobalStyles';
import { TOKEN_SHEET } from './constants/tokenVariablesConstants.ts';

/** Drawn once under the theme · an override's `var()` then follows the mode, not its light floor. */
export function TokenVariables(): React.ReactElement {
  return <GlobalStyles styles={TOKEN_SHEET} />;
}
