/**
 * - `DesignDecision` · a decision on how the design project works, as the PM took it
 */
interface DesignDecision {
  readonly id: string;
  readonly title: string;
  readonly held: string;
  readonly says: string;
}

export type { DesignDecision };
