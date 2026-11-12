/**
 * - `Receipt` · what a closed ticket reported, in fields the board asserts against
 * - `Caveat` · what a landed ticket left unsettled, and the ticket that settles it
 * - a person pastes the agent's receipt · a field it left out is null, never a guess
 */
import type { TicketId } from '../ids.ts';
import type { RepositoryState } from './repositoryState.ts';

interface Receipt {
  // the criteria the ticket held when the agent read it
  readonly criteria: number | null;
  // green acceptance tests, asserted one per criterion
  readonly tests: number | null;
  // tests declared and not exercised, with what they wait on
  readonly skipped: readonly string[];
  // criteria no test names · empty is the claim, not the default
  readonly uncovered: readonly string[];
  // when the run started, and when it was reported
  readonly from?: string;
  readonly at: string;
  readonly reported?: readonly string[];
  // the ticket and the rows it was built and counted under
  readonly folded?: string;
  // criteria proven by a measurement, not a test
  readonly measured?: readonly string[];
  // criteria a later ticket withdrew, as 'n · ticket': neither unproven nor uncovered
  readonly retired?: readonly string[];
  readonly caveats?: readonly string[];
  // the repository at the report's commit, from the reports that carry it
  readonly repository?: RepositoryState;
}

interface Caveat {
  readonly text: string;
  // the ticket that makes the caveat untrue, so a caveat naming one retires itself
  readonly until?: TicketId | null;
}

export type { Caveat, Receipt };
