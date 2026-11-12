/**
 * - `spec`, `projectContext`, `combinations` · the spec files, the first read
 * - `guards`, `decisions` · the guards against drift, and the decided points
 */
import { DECISIONS, GUARDS } from './projectPlan/driftGuards.ts';
import {
  COMBINATIONS,
  PROJECT_CONTEXT,
  SPEC,
} from './projectPlan/specFiles.ts';

export {
  COMBINATIONS as combinations,
  DECISIONS as decisions,
  GUARDS as guards,
  PROJECT_CONTEXT as projectContext,
  SPEC as spec,
};
