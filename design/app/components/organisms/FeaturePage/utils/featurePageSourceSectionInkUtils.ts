/**
 * - `inkOf` · a count's colour against its base
 */
import type { KindStanding } from '../../../../workspace/sourceView.ts';

// a count over its base rises, under it fell, at it holds · text inks, each ≥ 4.5
const inkOf = ({ n, base }: KindStanding): string => {
  if (n > base) return 'text.danger';
  return n < base ? 'text.ready' : 'text.secondary';
};

export { inkOf };
