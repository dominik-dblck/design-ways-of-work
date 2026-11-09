/**
 * - `inkOf` · a count's colour against its base
 */
import type { KindStanding } from '../../../../workspace/source-view.ts';

// a count over its base rises, under it fell, at it holds
const inkOf = ({ n, base }: KindStanding): string => {
  if (n > base) return 'error.main';
  return n < base ? 'success.main' : 'text.secondary';
};

export { inkOf };
