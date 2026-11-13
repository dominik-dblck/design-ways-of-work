/**
 * - `ICON_PACKAGE` · eagle-design draws its icons from `lucide-react` alone (W109)
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const ICON_PACKAGE: Migration = {
  release: '1.1.0',
  removes: [],
  moves: [],
  // nothing reads the static package: the build writes no icon file (W109)
  dropped: ['lucide-static'],
  tree: null,
};

export { ICON_PACKAGE };
