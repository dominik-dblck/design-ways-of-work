/**
 * - `SLIDER_INSIDE_SX` · a slider held inside its own box, a thumb at either end too
 */
import { unitsOf } from '../styles/scales.ts';

// a small thumb is 12px · half of it either side keeps a thumb at either end inside the box
export const SLIDER_INSIDE_SX = {
  width: 'calc(100% - 12px)',
  mx: unitsOf(6),
} as const;
