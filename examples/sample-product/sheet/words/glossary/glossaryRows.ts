/**
 * - `TERMS` · every term, in the order a reader meets them on the glossary page
 * - `OPEN`, `DEFERRED` · contradictions standing, and points decided as not now
 */
import type { GlossaryPoint, Term } from './glossaryTypes.ts';

const TERMS: readonly Term[] = [];

const OPEN: readonly GlossaryPoint[] = [];

const DEFERRED: readonly GlossaryPoint[] = [];

export { DEFERRED, OPEN, TERMS };
