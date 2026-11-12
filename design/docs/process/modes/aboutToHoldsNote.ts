/**
 * - `ABOUT_TO_HOLDS_NOTE` · the head fields of the ticket modes' page
 * - about, eyebrow, source, intro, modesNote, modes, facts, holdsNote
 */
import { cite, citeLines } from '../../documents/cited.ts';
const ABOUT_TO_HOLDS_NOTE = {
  about:
    'The three ticket modes as data' +
    cite('modes.decided') +
    ' · the ticket carries its mode as a chip (D19) · pipeline-cleanup.md moves it into ticket-pipeline.md for the agent',
  eyebrow: cite('modes.eyebrow'),
  source:
    'data · modes.ts · rendered here · in ticket-pipeline.md' +
    cite('modes.since'),
  intro: [
    'An epic → one ticket, one run',
    'Anything smaller → a light path',
    'A mode → where CC stops',
    'A stop → a review, never a question',
    'The full track → gone; its extra stops → one switch on feature',
  ],
  modesNote: cite('modes.landed') + 'ticket-pipeline.md holds it for the agent',
  modes: [
    {
      id: 'feature',
      emoji: '🧩',
      name: 'feature',
      stops: '2 STOPS · 3 WITH reconStop',
      skills: [
        'ticket-recon',
        'ticket-feature',
        'ticket-arch-review',
        'ticket-regression',
        'ticket-report',
      ],
      when: [
        'Every epic, as one ticket T-EXX-00',
        'Chosen by being an epic, not by points',
      ],
      steps: [
        { text: 'Sync: skills + contract fixtures, at the pack’s digests' },
        { text: 'Recon: five sub-agents by area' },
        {
          text: 'Endpoint tests, all red + the contract snapshot',
          stop: 'STOP',
        },
        { text: 'Domain and routes, part by part → green' },
        { text: 'Screens from the spec rows' },
        { text: 'Journeys: e2e-discovery → e2e-category' },
        { text: 'Arch-review: one sub-agent per step' },
        { text: 'Regression: sub-agents by slice' },
        { text: 'Report → the PM’s one commit, push, merge', stop: 'STOP' },
      ],
      question: [
        'Decided + written: “did X because Y” (rule:feature-run-never-stops)',
        'reconStop' +
          cite('modes.reconStopEpics') +
          ': a stop after recon, questions instead of decisions',
        'Why there: a guess about rules or permissions costs most',
      ],
    },
    {
      id: 'standard',
      emoji: '🔧',
      name: 'standard',
      stops: '2 STOPS',
      skills: [
        'ticket-recon',
        'ticket-standard',
        'ticket-arch-review',
        'ticket-regression',
        'ticket-report',
      ],
      when: [
        'Outside an epic, on a pattern that exists',
        'e.g. a command added to a closed epic, a fix across a few files, a pipeline ticket',
        'Two points or more',
      ],
      steps: [
        { text: 'Recon + contract table, one message', stop: 'STOP' },
        { text: 'Red → green, no stop · every test red once' },
        { text: 'Arch-review + regression, one pass' },
        { text: 'Report with “did X because Y”', stop: 'STOP' },
      ],
      question: [
        'Decided + written, as in feature',
        'No move to full: full is gone',
      ],
    },
    {
      id: 'fast',
      emoji: '⚡',
      name: 'fast',
      stops: '1 STOP',
      skills: ['ticket-fast', 'ticket-report'],
      when: [
        'A small ticket: a token, a line of copy, one field, a UI fix inside an existing spec row',
        'Zero or one point',
      ],
      steps: [
        {
          text: 'Build from the pack · every test red once · the suite at zero',
        },
        { text: 'Report', stop: 'STOP' },
      ],
      question: [
        'A clause the repo contradicts → up to standard',
        'No stop of its own · only upward',
      ],
    },
  ],
  facts: [
    {
      emoji: '🎯',
      title: 'HOW A TICKET GETS ITS MODE',
      bullets: [
        'Epic → feature, no points counted',
        'Anything else → points (tracks.js): 2+ standard · 0–1 fast',
        'Only upward: fast → standard when the pack does not hold',
        ...citeLines('modes.reconStopRow'),
      ],
    },
    {
      emoji: '🗑️',
      title: 'GOES',
      bullets: [
        'The full track: eight stages, five stops',
        'ticket-contract, ticket-red, ticket-green, ticket-snapshot as stages of their own',
        'Their rules → _shared.md or the modes’ steps: every test red once · a body emitted, never written · five shuffled runs on the shared database',
        'The snapshot’s “decisions no criterion asked for” → a section of the report',
      ],
    },
    {
      emoji: '🧱',
      title: 'STAYS AS BLOCKS · 11 SKILLS → 7',
      bullets: [
        'ticket-recon · ticket-arch-review (+ architecture-review.md) · ticket-regression · ticket-report',
        'Called by the modes, no STOP of their own',
        'Templates: recon, arch-review, regression, report + new: contract snapshot',
        'e2e-discovery, e2e-category',
        '_shared.md, feature, standard, fast',
      ],
    },
    {
      emoji: '📍',
      title: 'WHERE IT LANDS',
      bullets: [
        'Design side: ticket-pipeline.md (modes, skills) · plans.js rule:three-ticket-modes · tracks.js (no full, reconStop) · design-pack (step 10) · design-refine' +
          cite('modes.refineEpics'),
        'Build side, at the sync: yarn skills · the tests that count skills (theOldTicketSkillIsGone, everySkillIsShort, skillsAreGenerated) · CLAUDE.md · Lane A',
        'When: ' + cite('modes.when') + 'one move',
        'Why then: skills never change under a running ticket · a plans.js change re-cuts the pack',
      ],
    },
  ],
  holdsNote: 'the rules each mode keeps · plans.js · RULES',
} as const;

export { ABOUT_TO_HOLDS_NOTE };
