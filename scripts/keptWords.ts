/**
 * - `KEPT_IN_A_PRODUCT` · a product's files no move rewrites, kept as written
 */

// a legacy copy, a release's record, a note, an epic's notebook while it is open and once it closed
const KEPT_IN_A_PRODUCT =
  /^(?:(?:legacy|records|notes)\/|roadmaps\/E\d+\/E\d+Notes\.ts$)/;

export { KEPT_IN_A_PRODUCT };
