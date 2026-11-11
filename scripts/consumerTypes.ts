/**
 * - `Consumer` · a repository that takes the way of working at a tag
 */
import type { Migration } from './migrationTypes.ts';
import type { Port } from './portTypes.ts';

interface Consumer {
  // its folder in the gate's scratch, its name in a changelog row
  readonly name: string;
  // where its clone comes from, from this repository's root
  readonly path: string;
  // the branch that takes the way of working
  readonly ref: string;
  // its package scripts the gate runs on both clones, in order
  readonly commands: readonly (readonly string[])[];
  // the folders git ignores that a run writes, compared file by file
  readonly folders: readonly string[];
  // what it does to take the release in hand, done on the clone that takes it; none when the release asks nothing
  readonly migration: Migration | null;
  // none once its own work lands on the branch that takes the way of working
  readonly port: Port | null;
}

export type { Consumer };
