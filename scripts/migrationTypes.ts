/**
 * - `Migration`, `MigrationEdit` · what a repository does to take a release
 */

// a text of a file of its own, found exactly once or, when every place is asked, at least once, and what it becomes
interface MigrationEdit {
  readonly file: string;
  readonly from: string;
  readonly to: string;
  readonly isEveryPlace?: true;
}

interface Migration {
  // the release that asks it: a repository pinned there or later took it already
  readonly release: string;
  // its files that leave its tree: a home holds them from this release on
  readonly removes: readonly string[];
  // its files that move, each from and to, at its paths: every relative import follows
  readonly moves: readonly (readonly [string, string])[];
  // its texts written again, read after the imports followed the moves
  readonly edits?: readonly MigrationEdit[];
  // a folder here whose files are written there at the same paths, or none
  readonly tree: string | null;
}

export type { Migration, MigrationEdit };
