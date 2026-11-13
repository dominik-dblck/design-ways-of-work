/**
 * - `ChoiceCardGroupName` · what names the group: its eyebrow, or its own words
 */
export type ChoiceCardGroupName =
  | { readonly labelledBy: string; readonly label?: never }
  | { readonly label: string; readonly labelledBy?: never };
