/**
 * - `RUNS_STANDARD` · runs of the ticket modes' page
 * - from standard to fast, in its order
 */
const RUNS_STANDARD = [
  {
    id: 'standard',
    emoji: '🔧',
    name: 'standard',
    note: 'outside an epic, on a pattern that exists',
    rows: [
      {
        n: '0',
        name: 'Hand-off',
        pm: { title: 'Sends the block' },
        ds: {
          title: 'Pack cut on track standard',
          bullets: ['digests in the block'],
        },
        cc: {
          title: 'Loads ticket-standard, reads the ticket',
          chips: ['ticket-standard', '_shared.md'],
          bullets: ['the pack via readTicket.mjs', 'the read list'],
        },
      },
      {
        n: '1',
        name: 'Reading and contract',
        pm: { title: 'Reads what touches the product' },
        ds: {
          title: 'Reading and table read',
          bullets: ['a moved row → back with its digest'],
        },
        cc: {
          title: 'Reading + contract table, one message',
          chips: ['ticket-recon 3–5a'],
          bullets: ['every gap decided: “did X because Y”'],
          stop: { label: 'Stop · always', kind: 'stop' },
        },
        sub: {
          count: '×5',
          title: 'By area, from six files on the read list',
          bullets: [
            'confirmed · contradicted · question',
            'questions answered as decisions',
          ],
        },
      },
      {
        n: '2',
        name: 'Red, then green',
        cc: {
          title: 'Every test red once, then the code → green, no stop',
          bullets: ['each red run listed in the report'],
        },
      },
      {
        n: '3',
        name: 'Review and regression',
        cc: {
          title: 'Arch-review + regression, one pass',
          chips: ['architecture-review', 'ticket-regression'],
          bullets: ['the fixes the sheet decides, applied'],
        },
        sub: {
          title: 'As feature, when the diff splits',
          bullets: [
            'one per step of the review',
            'one per slice of the regression',
          ],
        },
      },
      {
        n: '4',
        name: 'Report',
        pm: { title: 'Screens checked by hand; commit, push, merge approved' },
        ds: {
          title: 'Receipt taken',
          bullets: ['receipts.js · tickets.js: done'],
        },
        cc: {
          title: 'One report',
          chips: ['ticket-report'],
          bullets: ['every decision the sheet did not make'],
          stop: { label: 'Stop · always', kind: 'stop' },
        },
      },
    ],
  },
  {
    id: 'fast',
    emoji: '⚡',
    name: 'fast',
    note: 'a small ticket',
    rows: [
      {
        n: '0',
        name: 'Hand-off',
        pm: { title: 'Sends the block' },
        ds: { title: 'Pack cut on track fast' },
        cc: {
          title: 'Loads ticket-fast, reads the ticket',
          chips: ['ticket-fast', '_shared.md'],
        },
      },
      {
        n: '1',
        name: 'Build',
        cc: {
          title: 'Tests for every criterion, each red once',
          bullets: [
            'the suite + every scan at zero',
            'no recon, no contract file: the pack = the whole reading',
          ],
          stop: {
            label: 'Up to standard · if the repo contradicts the pack',
            kind: 'if',
          },
        },
      },
      {
        n: '2',
        name: 'Report',
        pm: { title: 'Screens checked by hand; commit, push, merge approved' },
        ds: { title: 'Receipt taken' },
        cc: {
          title: 'Criterion → test table',
          chips: ['ticket-report'],
          bullets: ['+ decisions no criterion asked for'],
          stop: { label: 'Stop · always', kind: 'stop' },
        },
      },
    ],
  },
] as const;

export { RUNS_STANDARD };
