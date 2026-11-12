/**
 * - `PRODUCT_READERS` · a product rule's refusal, read where the rule lives
 * - `WIREFRAME`, `SHORT_NAMES` · where events are drawn, modules named short
 */
import type { Resolved } from './ticketsTypes.ts';

type Reader = (found: RegExpMatchArray, ref: string) => Resolved | null;

const WIREFRAME = '';

const PRODUCT_READERS: readonly (readonly [RegExp, Reader])[] = [];

const SHORT_NAMES: readonly string[] = [];

export { PRODUCT_READERS, SHORT_NAMES, WIREFRAME };
