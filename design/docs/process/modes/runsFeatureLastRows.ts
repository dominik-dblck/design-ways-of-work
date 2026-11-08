/**
 * - `RUNS_FEATURE_LAST_ROWS` · the feature run’s last rows, in the page’s order
 */
const RUNS_FEATURE_LAST_ROWS = [
  {
    n: '6',
    name: 'Screens',
    cc: {
      title: 'Screens from their spec rows',
      bullets: [
        'components.spec.json: read, never synced (rule:the-look-is-the-repos)',
        'a shape with no row: built, never asked (rule:unnamed-shape-built-not-stopped)',
        'inside one organism → reported as guessed',
        'a new global atom or molecule → reported with what, where, why',
      ],
    },
  },
  {
    n: '7',
    name: 'Journeys',
    cc: {
      title: 'One Playwright flow per journey, a category at a time',
      chips: ['e2e-discovery → e2e-category'],
      bullets: [
        'red once on a planted fault, then green',
        'J1–J10 → {screen}FlowsCatalog.ts',
        'each category’s gate · roadmaps/e2e/{screen}-status.md',
        'a category still red → blocked, into the report',
      ],
    },
  },
  {
    n: '8',
    name: 'Arch-review',
    cc: {
      title:
        'STEP 0 once → five sub-agents → findings merged → the sheet’s fixes applied',
      chips: ['architecture-review', 'types-eval', 'tests-eval', 'ux-eval'],
      bullets: [
        'arch-review-T-E03-00.md: one summary, ≤ 25 findings, one decision table',
        'the suite again',
        'an UNCERTAIN → the report',
      ],
    },
    sub: {
      count: '×5',
      title: 'One per step, over the whole diff',
      bullets: [
        '1 · tighter types?',
        '2 · patterns and smells',
        '3 · the rest of types-eval',
        '4 · the tests, tests-eval',
        '5 · the UI, ux-eval beside the wireframes',
      ],
    },
  },
  {
    n: '9',
    name: 'Regression',
    cc: {
      title: 'Each verdict checked against the diff; regression written',
      chips: ['ticket-regression'],
      bullets: ['regression-T-E03-00.md'],
    },
    sub: {
      count: '×4',
      title: 'One per slice',
      bullets: [
        'the suite and tsc',
        'drift of the pack’s digests',
        'files touched outside scope · owning ticket, file:line',
        'the scans that still run',
      ],
    },
  },
  {
    n: '10',
    name: 'Report and close',
    pm: {
      title: 'Screens checked by hand; commit, push, merge approved',
      bullets: ['three separate approvals'],
    },
    ds: {
      title: 'Receipt taken, epic closed',
      bullets: [
        'receipts.js: receipt, caveats with until, reported lines on landed tickets',
        'tickets.js: done',
      ],
    },
    cc: {
      title: 'One report',
      chips: ['ticket-report'],
      bullets: [
        'report-T-E03-00.md',
        'a receipt per part',
        'what differs from the contract, and why',
        'what was guessed · re-ports · cost',
      ],
      stop: { label: 'STOP · ALWAYS', kind: 'stop' },
    },
  },
] as const;

export { RUNS_FEATURE_LAST_ROWS };
