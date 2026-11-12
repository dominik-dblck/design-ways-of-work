/**
 * - `HOLDS_TO_LEGEND` · the head fields of the ticket modes' page
 * - holds, runsNote, legend
 */
import { cite } from '../../documents/cited.ts';
const HOLDS_TO_LEGEND = {
  holds: [
    {
      emoji: '❓',
      title: 'A question never stops the run',
      rule: 'rule:feature-run-never-stops',
      bullets: [
        'CC decides → “did X because Y”',
        'Contract decisions → the snapshot (feature) or the recon message (standard)',
        'Everything else → the report',
        'A new event or payload key → marked NEW EVENT (the log keeps it once merged)',
        'The one exception: reconStop',
      ],
    },
    {
      emoji: '🛑',
      title: 'A stop is a review',
      bullets: [
        'feature: contract snapshot · report',
        'standard: recon with its contract table · report',
        'fast: report',
        'reconStop: + one after recon',
        'Any mode: a copy that differs from its digest',
      ],
    },
    {
      emoji: '🔨',
      title: 'A shape no row names is built',
      rule: 'rule:unnamed-shape-built-not-stopped',
      bullets: [
        'Inside one organism: composed from existing atoms and molecules, reported as guessed',
        'A new global atom or molecule: reported with what, where, why',
        'Its row: written by the design side after the report',
      ],
    },
    {
      emoji: '👀',
      title: 'The look is the repo’s',
      rule: 'rule:the-look-is-the-repos',
      bullets: [
        'No test syncs componentsSpec.ts with the code',
        'A row: read, never synced',
        'Screens: checked by the PM, by hand',
        'Behaviour: kept by the journeys',
      ],
    },
    {
      emoji: '🔴',
      title: 'Every test is seen red once',
      rule: 'rule:every-test-seen-red',
      bullets: [
        'Endpoint tests: before the code, from every contract case',
        'Journeys: after the screens, red once on a planted fault, then green',
      ],
    },
    {
      emoji: '📦',
      title: 'No commits in the run',
      bullets: [
        'CC writes code, no commits',
        'At the report: one commit, approved by the PM',
        'Then the push, then the merge · three approvals',
      ],
    },
    {
      emoji: '🔌',
      title: 'Only the main agent reads the sheet',
      bullets: [
        'Once per stage, through the MCP',
        'Cached in .sheet-cache/',
        'Sub-agents: the repository + the cache only',
      ],
    },
    {
      emoji: '👥',
      title: 'Sub-agents where the reading splits',
      bullets: [
        'Recon: five by area · domain · routes and services · screens and components · tests and fixtures · the pack against the repo',
        'Arch-review: one per step of architecture-review.md · STEP 0 by the main agent',
        'Regression: one per slice',
        'A read list under six files: read alone',
      ],
    },
    {
      emoji: '🔄',
      title: 'The contract is synced first',
      bullets: [
        'Before recon: the pack’s fixtures re-copied at its digests',
        'Then the emitter',
        'A test: the emitted files vs a fresh emit',
      ],
    },
  ],
  runsNote:
    'a row = one step · a column = who acts in it' + cite('modes.runsHistory'),
  legend: [
    { sample: 'STOP', kind: 'stop', text: 'the run waits for the design side' },
    { sample: 'STOP · IF', kind: 'if', text: 'only when its condition holds' },
    { sample: '×5', kind: 'count', text: 'sub-agents in parallel' },
    {
      sample: 'skill',
      kind: 'chip',
      text: 'the skill or command the step runs',
    },
  ],
} as const;

export { HOLDS_TO_LEGEND };
