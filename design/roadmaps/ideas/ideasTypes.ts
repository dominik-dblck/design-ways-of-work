/**
 * - `Idea` · its line, points, an example walked, its links, the questions it leaves
 */
type Pair = readonly [string, string];

interface Card {
  readonly kind: string;
  readonly name: string;
  readonly what?: string;
  readonly why?: string;
}

interface Idea {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly raised: string;
  readonly line: string;
  readonly points: readonly string[];
  readonly example: readonly Pair[];
  readonly map?: {
    readonly document: Card;
    readonly refs: readonly Card[];
    readonly context: string;
  };
  readonly fresh?: {
    readonly moved: Card;
    readonly told: readonly Card[];
    readonly notTold: readonly Card[];
  };
  readonly connects: readonly Pair[];
  readonly questions: readonly string[];
}

export type { Idea };
