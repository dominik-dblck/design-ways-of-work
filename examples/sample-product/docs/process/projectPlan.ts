/**
 * - `projectContext`, `combinations` · the first read, the fact combinations
 */
import type {
  CombinationFile,
  ContextRead,
} from './projectPlan/projectPlanTypes.ts';

const projectContext: readonly ContextRead[] = [];

const combinations: readonly CombinationFile[] = [];

export { combinations, projectContext };
