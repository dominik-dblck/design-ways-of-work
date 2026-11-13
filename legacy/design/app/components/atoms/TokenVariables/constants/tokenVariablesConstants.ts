/**
 * - `TOKEN_SHEET` · every token as its CSS variable, light the floor, dark on top
 */
import { tokenSheetOf } from '../../../../../../../design/app/styles/theme.ts';
import { tokens } from '../../../../../../../design/app/styles/tokens.ts';

export const TOKEN_SHEET = tokenSheetOf(tokens.light, tokens.dark);
