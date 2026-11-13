/**
 * - `PERSONA_STRIP_TEST_IDS` · the ids the dial writes unless it is handed its own
 */
import type { PersonaStripTestIds } from '../types/personaStripTypes.ts';

export const PERSONA_STRIP_TEST_IDS: PersonaStripTestIds = {
  dial: 'persona-strip-dial',
  person: (id) => `persona-strip-person-${id}`,
};
