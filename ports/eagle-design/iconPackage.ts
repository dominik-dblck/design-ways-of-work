/**
 * - `ICON_PACKAGE` · eagle-design draws its icons from `lucide-react` alone (W109)
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const ICON_PACKAGE: Migration = {
  release: '1.1.0',
  removes: [],
  moves: [],
  // the build writes a named icon's SVG from `lucide-react`'s data: the static package is read by nothing
  dropped: ['lucide-static'],
  tree: null,
};

export { ICON_PACKAGE };
