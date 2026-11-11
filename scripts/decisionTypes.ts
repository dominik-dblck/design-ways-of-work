/**
 * - `Decision` · a decision of the PM on how this repository works, as he took it
 */

interface Decision {
  readonly id: string;
  readonly title: string;
  // the day he took it, his pick where options were named, the decision it replaces: `<day> · A, replaces W6`
  readonly held: string;
  readonly says: string;
  // the note that holds his words
  readonly from: string;
}

export type { Decision };
