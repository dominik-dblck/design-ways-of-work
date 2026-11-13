/**
 * - `DRAWER_WORDS` · the default word for the close button
 */
import { CONTROL_LABELS } from '../../../../constants/controlLabelsConstants.ts';
import type { DrawerWords } from '../types/drawerTypes.ts';

export const DRAWER_WORDS = {
  close: CONTROL_LABELS.close,
} as const satisfies DrawerWords;
