/**
 * - `Port` · a repository whose own work lands on a branch that takes nothing yet
 * - `Carried` · a change of that branch's to a file a home holds, carried there
 */

interface Carried {
  // the file on the trunk, and its blob there: a later change of the trunk's is carried again
  readonly file: string;
  readonly blob: string;
  // where the change stands now
  readonly how: string;
}

interface Port {
  // the branch its own work lands on: the branch tried holds its newest commit, or the gate is red
  readonly trunk: string;
  // the commit the two branches share from before the port
  readonly base: string;
  // the map of the files it moved when it took the way of working, from this repository's root
  readonly moves: string;
  // each change of the trunk's to a file a home holds now, carried into that home
  readonly carried: readonly Carried[];
}

export type { Carried, Port };
