/**
 * - `Cell` · one line of a situation: its State, or a Move for one reader
 * - `Situation` · a row read by name: its State, and its Move by reader
 * - `Refusal`, `Validator`, `Fills` · a refusal's lines, a validator's, the data
 */
type Cell = string | null;

interface Situation {
  readonly situation: string;
  readonly group: string;
  readonly state: Cell;
  readonly move: Readonly<Record<string, Cell>>;
}

interface Refusal {
  readonly line: string;
  readonly fix?: string | null;
  readonly variants?: Readonly<Record<string, string>>;
  readonly empty?: Readonly<Record<string, string>>;
  readonly fromValidator?: boolean;
}

interface Validator {
  readonly says: string | Readonly<Record<string, string>>;
  readonly saysLanguage?: string;
}

type Fills = Readonly<Record<string, unknown>>;

export type { Cell, Fills, Refusal, Situation, Validator };
