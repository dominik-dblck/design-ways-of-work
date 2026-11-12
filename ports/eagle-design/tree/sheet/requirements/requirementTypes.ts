/**
 * - `RequirementRow`, `Requirement` · a requirement as written and as read
 */

// [id, text, who said it, when, how it stands against the sheet, the note, the code it retires]
type RequirementRow = readonly [
  id: string,
  text: string,
  from: string,
  ref?: string,
  sheet?: string,
  note?: string,
  replaces?: readonly string[],
];

interface Requirement {
  readonly id: string;
  readonly text: string;
  readonly from: string;
  readonly ref: string;
  readonly sheet: string;
  readonly note: string;
  readonly replaces: readonly string[];
}

export type { Requirement, RequirementRow };
