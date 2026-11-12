/**
 * - `receipts` · what each closed ticket reported, merged from its epic's part
 * - `caveats` · what a landed ticket left for later, keyed by that ticket
 * - `Receipt`, `Caveat`, `RepositoryState` · their shapes, as the pack prints them
 */
import type { Caveat, Receipt } from './receipts/receiptsTypes.ts';
import type { RepositoryState } from './receipts/repositoryState.ts';

const receipts: Readonly<Record<string, Receipt>> = {};

const caveats: Readonly<Record<string, readonly Caveat[]>> = {};

export { caveats, receipts };
export type { Caveat, Receipt, RepositoryState };
