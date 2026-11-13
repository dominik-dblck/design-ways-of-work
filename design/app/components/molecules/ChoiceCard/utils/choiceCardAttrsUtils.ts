/**
 * - `choiceCardAttrsOf` · a card's radio attributes: checked, refused, described
 */
export type ChoiceCardAttrs = {
  readonly role: 'radio';
  readonly 'aria-checked': boolean;
  readonly 'aria-disabled'?: true | undefined;
  readonly 'aria-describedby'?: string | undefined;
  readonly onClick?: (() => void) | undefined;
};

/** A refused card keeps its tab stop and says why · a press goes nowhere. */
export const choiceCardAttrsOf = (at: {
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly describedBy: string | undefined;
  readonly onPick: () => void;
}): ChoiceCardAttrs => ({
  role: 'radio',
  'aria-checked': at.selected,
  'aria-disabled': at.disabled ? true : undefined,
  'aria-describedby': at.describedBy,
  onClick: at.disabled ? undefined : at.onPick,
});
