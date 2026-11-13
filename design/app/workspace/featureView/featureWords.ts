/**
 * - `FEATURE_WORDS` · every word the Feature page says that is not the sheet's own
 */
const FEATURE_WORDS = {
  eyebrow: 'Feature · one epic, read whole',
  board: 'Back to the board',
  journeys: {
    label: 'Journeys',
    note: 'one person’s path each, one Playwright flow',
    none: 'No journeys yet · written at step 4 of the refinement',
    test: 'After a reload',
    seeded: 'starts at',
  },
  cover: {
    cases: (found: {
      readonly covered: number;
      readonly need: number;
      readonly byEarlier: number;
    }): string =>
      `${found.covered} of ${found.need} test cases a person meets are covered${found.byEarlier ? ` · ${found.byEarlier} by an earlier epic’s journeys` : ''}`,
    states: (covered: number, need: number): string =>
      `${covered} of ${need} 02a states shown by a journey`,
    allCovered: 'every one covered',
    allShown: 'every one shown, none changed',
  },
  api: {
    label: 'API',
    note: 'the endpoints, as the build side types them',
  },
  cases: {
    label: 'Test cases',
    note: 'one test each: the contract’s rows, and the criteria of an epic built ticket by ticket',
    all: 'All',
    compound: 'two claims in one',
  },
  fields: {
    label: 'Field kinds',
    note: 'what a field of a block or a config is',
    validators: 'validators',
    options: 'Options on any field',
    code: 'TypeScript',
  },
  docTypes: {
    label: 'Document types',
    note: 'the fields of each type, off blocks.ts',
  },
  decisions: {
    label: 'Decisions',
    note: 'the edges of the feature ticket: options, the pick, why',
  },
  source: {
    label: 'One source of truth',
    note: 'every fact, rule, word and sentence has one home; everything else reads it',
    running: 'source-check · running',
    line: (found: {
      readonly copies: number;
      readonly rises: readonly string[];
    }): string =>
      `${found.copies} copies in the scope · ratchet ${found.rises.length ? `rises · ${found.rises.join(', ')}` : 'holds'} · 0 is the goal`,
  },
  notes: {
    label: 'Notebook',
    note: 'the reasoning behind the picks, ours only: never on a read list, never in a pack',
    none: 'No notebook · a closed epic’s stays as markdown, frozen',
  },
  combinations: {
    label: 'Fact combinations',
    note: 'the rows the build side tests the port against, one file per feature, counted here from the file when asked',
    count: 'Count the rows',
    counting: 'Counting…',
    missing: (states: number, epic: string): string =>
      `No combinations yet · the gate rules name ${states} states for ${epic}, and the checklist asks for their fact combinations in a file of their own`,
  },
  nothing: 'Nothing for this epic.',
} as const;

export { FEATURE_WORDS };
