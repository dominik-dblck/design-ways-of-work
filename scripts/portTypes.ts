/**
 * - `Port` · a repository whose own work lands on a branch that takes nothing yet
 * - `Carried` · a change of that branch's to a file a home holds, carried there
 * - `Rewritten` · a data file of that branch the port holds as a module
 */

interface Carried {
  // the file on the trunk, and its blob there: a later change of the trunk's is carried again
  readonly file: string;
  readonly blob: string;
  // where the change stands now
  readonly how: string;
}

interface Rewritten {
  // a data file of the trunk, the module the port wrote it as, and that module's one export
  readonly from: string;
  readonly to: string;
  readonly name: string;
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
  // the folders the branch keeps as the port left them, whatever the trunk did there
  readonly kept: readonly string[];
  // the snapshots the port wrote as modules: written again from the trunk's values when it takes the trunk
  readonly rewritten: readonly Rewritten[];
  // a name the port changed beyond a file's move, as a text holds it bare: from and to
  readonly names: readonly (readonly [string, string])[];
}

export type { Carried, Port, Rewritten };
