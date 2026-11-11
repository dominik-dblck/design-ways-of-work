/**
 * - `Migration` · what a repository does to take the release in hand, as data
 */

interface Migration {
  // its files that leave its tree: a home holds them from this release on
  readonly removes: readonly string[];
  // its files that move, each from and to, at its paths
  readonly moves: readonly (readonly [string, string])[];
  // a folder here whose files are written there at the same paths, or none
  readonly tree: string | null;
}

export type { Migration };
