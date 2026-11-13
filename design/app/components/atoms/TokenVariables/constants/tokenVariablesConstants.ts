/**
 * - `TOKEN_SHEET` · every token as its CSS variable, light the floor, dark on top
 */
import { tokenSheetOf } from '../../../../styles/theme.ts';
import { tokens } from '../../../../styles/tokens.ts';

export const TOKEN_SHEET = tokenSheetOf(tokens.light, tokens.dark);
