/**
 * - `ChoiceCardGate` · a card can be refused, and only a refused card says why
 */
export type ChoiceCardGate =
  | {
      readonly disabled?: false;
      readonly hint?: never;
      readonly hintTestId?: never;
    }
  | {
      readonly disabled: true;
      readonly hint?: string;
      readonly hintTestId?: string;
    };
