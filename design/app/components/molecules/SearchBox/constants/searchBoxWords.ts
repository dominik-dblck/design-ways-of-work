/**
 * - `SEARCH_BOX_WORDS` · what the search box says while a search is on its way
 */
import type { SearchBoxWords } from '../types/searchBoxTypes.ts';

export const SEARCH_BOX_WORDS = {
  pending: 'Searching',
} as const satisfies SearchBoxWords;
