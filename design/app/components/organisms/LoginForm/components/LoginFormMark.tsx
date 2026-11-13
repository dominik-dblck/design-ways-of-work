/**
 * - `LoginFormMark` · the mark over the name, one image named by the brand
 */
import Box from '@mui/material/Box';
import { LOGIN_BRAND_SX } from '../constants/loginFormConstants.ts';
import type { LoginFormBrand } from '../types/loginFormTypes.ts';
import { markRiseSxOf, wordSxOf } from '../utils/loginFormEntranceUtils.ts';

/** The mark rises once the line is written; the name closes up after it. */
export function LoginFormMark({
  brand,
  shown,
}: {
  readonly brand: LoginFormBrand;
  readonly shown: boolean;
}): React.ReactElement {
  return (
    <Box role="img" aria-label={brand.name} sx={LOGIN_BRAND_SX}>
      <Box sx={markRiseSxOf(shown)}>{brand.mark}</Box>
      {brand.word(wordSxOf(shown))}
    </Box>
  );
}
