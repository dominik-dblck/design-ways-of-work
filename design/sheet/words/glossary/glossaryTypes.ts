/**
 * - `Term`, `ScreenWord`, `ScreenWordRow` · a term, and the screen words it gives
 * - `GlossaryPoint` · a contradiction, or a point decided as not now
 */
interface ScreenWord {
  readonly use: string;
  readonly not: readonly string[];
  readonly except: readonly string[];
  readonly note?: string;
}

interface Term {
  readonly term: string;
  readonly means: string;
  readonly ui?: readonly ScreenWord[];
  readonly replaces: readonly string[];
  readonly where: string;
  readonly note?: string;
}

interface ScreenWordRow {
  readonly term: string;
  readonly use: string;
  readonly not: readonly string[];
  readonly except: readonly string[];
  readonly note: string;
}

interface GlossaryPoint {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly touches: string;
}

export type { GlossaryPoint, ScreenWordRow, Term };
