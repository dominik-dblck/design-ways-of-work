/**
 * - `cite`, `citeLines` · a product's own text a home's document asks for by key
 * - a key the product does not hold prints its fallback, or nothing, or no line
 */
import { cites } from '../process/documentSlots.ts';

const cite = (key: string, fallback = ''): string => cites[key] ?? fallback;

const citeLines = (key: string): readonly string[] =>
  cites[key]?.split('\n') ?? [];

export { cite, citeLines };
