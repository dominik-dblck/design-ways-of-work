/**
 * - `FLOW_PATHS`, `FlowPath` · every kind of path a screen can put a person on
 */
export const FLOW_PATHS = [
  'happy',
  'refusal',
  'role',
  'cancel',
  'empty',
  'loading',
  'error',
  'edge',
] as const;

export type FlowPath = (typeof FLOW_PATHS)[number];
