/**
 * - `MIGRATION` · what eagle-design does to take the release in hand
 * - `tree/` beside it · its own files the release asks for, at its paths
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const MIGRATION: Migration = {
  removes: [],
  moves: [],
  tree: 'ports/eagle-design/tree',
};

export { MIGRATION };
