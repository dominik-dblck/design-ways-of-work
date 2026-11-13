/**
 * - `PAGINATION_WORDS` · the two ends' names: previous page, next page
 */
import type { PaginationWords } from '../types/paginationTypes.ts';

export const PAGINATION_WORDS = {
  previous: 'Previous page',
  next: 'Next page',
} as const satisfies PaginationWords;
