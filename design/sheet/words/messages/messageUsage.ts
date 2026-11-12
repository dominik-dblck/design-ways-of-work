/**
 * - `usage` · who reads a shared sentence: every cell whose line is SAY's
 */
import { SAY, USAGE_TABLES } from './messageRows.ts';

// every cell whose sentence is SAY's, by value: a change to a SAY line reaches each one
function usage(key?: string | null): string[] {
  const sayings: Readonly<Record<string, string>> = SAY;
  const want = key == null ? undefined : sayings[key];
  const said = new Set(Object.values(sayings));
  const out: string[] = [];
  const seen = new Set<object>();
  const walk = (node: unknown, part: string): void => {
    if (typeof node === 'string') {
      if (want == null ? said.has(node) : node === want) out.push(part);
      return;
    }
    if (node === null || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    for (const [inner, next] of Object.entries(node))
      walk(next, `${part}.${inner}`);
  };
  for (const [term, table] of Object.entries(USAGE_TABLES)) walk(table, term);
  return out;
}

export { usage };
