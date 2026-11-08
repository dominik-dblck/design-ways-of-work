/**
 * - `runFaults` · a list's ids are its prefix numbered 1 to n: each once, no gap
 * - a decision or a finding is cited by its id: D25, O17, R3
 */

// each id that stands where another should: a gap, a repeat or a row out of order
function runFaults(ids: readonly string[], prefix: string): readonly string[] {
  return ids.flatMap((id, at) =>
    id === `${prefix}${at + 1}`
      ? []
      : [`${id} stands where ${prefix}${at + 1} should`],
  );
}

export { runFaults };
