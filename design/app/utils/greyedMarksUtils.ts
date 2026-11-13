/**
 * - `greyedMarksOf` · greyed by aria and MUI's class, never by the attribute
 */
export type GreyedMarks = {
  readonly 'aria-disabled': true | undefined;
  readonly className: 'Mui-disabled' | undefined;
  readonly disableRipple: true | undefined;
};

/** aria-disabled, not the attribute · MUI's class paints it and lets no pointer through. */
export const greyedMarksOf = (greyed: boolean): GreyedMarks => ({
  'aria-disabled': greyed ? true : undefined,
  className: greyed ? 'Mui-disabled' : undefined,
  disableRipple: greyed ? true : undefined,
});
