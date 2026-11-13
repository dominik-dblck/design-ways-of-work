/**
 * - `PERSONA_STRIP_WORDS` · the dial's name by default
 */
import type { PersonaStripWords } from '../types/personaStripTypes.ts';

export const PERSONA_STRIP_WORDS = {
  dial: 'Be anyone on the roster',
} as const satisfies PersonaStripWords;
