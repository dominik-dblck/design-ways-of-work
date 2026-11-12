/**
 * - `SHARED_CASES` · what every endpoint of a kind answers, whatever its row says
 * - `ROLES_ALL` · the actor words a command holds when it leaves no role out
 */
import type { SharedCase } from './sharedCasesTypes.ts';

const ROLES_ALL = 1;

const SHARED_CASES: readonly SharedCase[] = [];

export { ROLES_ALL, SHARED_CASES };
