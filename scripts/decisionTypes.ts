/**
 * - `Decision` · a decision of the PM on how this repository works, as taken
 */

interface Decision {
  readonly id: string;
  readonly title: string;
  // the day it was taken, the pick where options were named, the decision it replaces: `<day> · A, replaces W6`
  readonly held: string;
  readonly says: string;
  // the note that holds the PM's words, or the row of a product it was taken from: `<product> D<n>`
  readonly from: string;
}

export type { Decision };
