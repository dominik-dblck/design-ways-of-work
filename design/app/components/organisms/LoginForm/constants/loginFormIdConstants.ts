/**
 * - `LOGIN_FORM_TEST_IDS` · the ids the card writes unless it is handed its own
 */
import type { LoginFormTestIds } from '../types/loginFormTypes.ts';

export const LOGIN_FORM_TEST_IDS = {
  card: 'login-form-card',
  error: 'login-form-error',
} as const satisfies LoginFormTestIds;
