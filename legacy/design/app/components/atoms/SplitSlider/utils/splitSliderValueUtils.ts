/**
 * - `thumbsOf` · the cuts MUI reports, as a list whatever their count
 */

export const thumbsOf = (
  reported: number | readonly number[],
): readonly number[] => (typeof reported === 'number' ? [reported] : reported);
