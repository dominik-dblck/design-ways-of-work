/**
 * - `tokenSheetOf`, `muiDarkOf` · a page's sheet of every token, MUI's dark in it
 */
import type { Theme } from '@mui/material/styles';
import {
  DARK_SELECTOR,
  LIGHT_SELECTOR,
  SYSTEM_DARK_SCOPE,
  SYSTEM_DARK_SELECTOR,
  variablesOf,
  type TokenBlock,
} from './cssVariables.ts';

/** MUI's own dark palette variables, as the theme wrote them under the chosen dark. */
export const muiDarkOf = (theme: Theme): Readonly<Record<string, string>> => {
  const sheets: readonly Record<string, unknown>[] =
    theme.generateStyleSheets();
  const block = sheets.find((sheet) => DARK_SELECTOR in sheet)?.[DARK_SELECTOR];
  return typeof block === 'object' && block !== null
    ? Object.fromEntries(
        Object.entries(block).map(([name, written]) => [name, String(written)]),
      )
    : {};
};

/** Light on `:root` as the floor, dark where chosen · a dark OS with no choice gets MUI's dark too. */
export const tokenSheetOf = ({
  light,
  dark,
  muiDark,
}: {
  readonly light: TokenBlock;
  readonly dark: TokenBlock;
  readonly muiDark: Readonly<Record<string, string>>;
}): Record<
  string,
  Record<string, string> | Record<string, Record<string, string>>
> => ({
  ':root': variablesOf(light),
  [DARK_SELECTOR]: variablesOf(dark),
  [LIGHT_SELECTOR]: variablesOf(light),
  [SYSTEM_DARK_SELECTOR]: {
    [SYSTEM_DARK_SCOPE]: { ...muiDark, ...variablesOf(dark) },
  },
});
