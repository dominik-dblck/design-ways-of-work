/**
 * - `DesignDecision` · a decision on how the design project works, as the PM took it
 */
interface DesignDecision {
  readonly id: string;
  // the way of working's row that holds it now (`W44`): this row keeps its words of the day
  readonly heldBy?: string;
  readonly title: string;
  readonly held: string;
  readonly says: string;
}

export type { DesignDecision };
