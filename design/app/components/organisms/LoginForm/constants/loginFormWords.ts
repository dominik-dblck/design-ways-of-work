/**
 * - `LOGIN_FORM_WORDS` · the sign-in card's words by default, top to bottom
 */
import type { LoginFormWords } from '../types/loginFormTypes.ts';

export const LOGIN_FORM_WORDS = {
  tagline: 'Sign in to continue',
  restricted: 'Restricted to your organisation’s accounts',
} as const satisfies LoginFormWords;
