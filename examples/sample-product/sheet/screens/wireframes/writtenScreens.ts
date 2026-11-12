/**
 * - `WRITTEN` · every wireframe as written: one screen in one state
 * - `FAMILY` · a digit per track, as the nav reads them
 */
import type { Written } from './screenTypes.ts';

const WRITTEN: readonly Written[] = [];

const FAMILY: Readonly<Record<string, string | undefined>> = {};

export { FAMILY, WRITTEN };
