/**
 * - `RUNS_FEATURE_FIRST_ROWS` · the feature run’s first rows, in the page’s order
 */
import { buildBranch } from '../../../sheet/project.ts';

const RUNS_FEATURE_FIRST_ROWS = [
  {
    n: '0',
    name: 'Hand-off',
    pm: { title: 'Sends the block', bullets: ['what, how, the digests'] },
    ds: {
      title: 'Pack cut, digests into the block',
      bullets: ['packs/T-E03-00.md · tickets.js · ticket-pipeline.md'],
    },
    cc: {
      title: 'Loads ticket-feature, reads the ticket',
      chips: ['ticket-feature', '_shared.md'],
      bullets: [
        'the pack via readTicket.mjs',
        'api-convention.md',
        'every row on the read list',
      ],
    },
  },
  {
    n: '1–2',
    name: 'Branch and skills',
    cc: {
      title: 'Branch cut, skills synced',
      chips: ['_shared.md · Sync'],
      bullets: [
        `feature/T-E03-00 from ${buildBranch}`,
        'ticket-pipeline.md re-copied',
        'yarn skills',
        'byte-for-byte test green',
      ],
    },
  },
  {
    n: '2a',
    name: 'Contract sync',
    cc: {
      title: 'Our contract copied in, types generated',
      bullets: [
        'commands.js · queries.js · refusals.js · events.js at the pack’s digests',
        'hashes.json → emitter → commandBodies.ts, queryIds.ts, queryParams.ts',
        'a test against a fresh emit',
      ],
      stop: { label: 'STOP · IF A DIGEST DIFFERS', kind: 'if' },
    },
  },
  {
    n: '3',
    name: 'Recon',
    pm: {
      title: 'Nothing to do here',
      muted: true,
      bullets: [
        'every gap decided by CC, with its why',
        'read at the snapshot',
      ],
    },
    ds: {
      title: 'Nothing to do here',
      muted: true,
      bullets: [
        'the decisions arrive with the snapshot (rule:feature-run-never-stops)',
      ],
    },
    cc: {
      title: 'Five sub-agents, one per area; findings merged',
      chips: ['ticket-recon · 3a'],
      bullets: [
        'roadmaps/E03/T-E03-00/recon-T-E03-00.md',
        'a narrowing: written down, the run goes on',
        'a gap: “decided X because Y”, never asked',
      ],
    },
    sub: {
      count: '×5',
      title: 'One per area, each file read once',
      bullets: [
        'the domain',
        'routes and services',
        'screens and components',
        'tests and fixtures',
        'the pack against the repo',
        'per part: confirmed · contradicted · question',
      ],
    },
  },
  {
    n: '4',
    name: 'Endpoint tests + contract snapshot',
    pm: {
      title: 'Types and endpoints reviewed',
      bullets: ['in TypeScript, as CC wrote them'],
    },
    ds: {
      title: 'Snapshot vs our rows',
      bullets: [
        'every “did X because Y” read',
        'commands.js · queries.js',
        'a moved row → back with its digest',
      ],
    },
    cc: {
      title: 'Every endpoint test written, all red; what it wrote sent',
      bullets: [
        'one test per [when, answer] + api-convention.md’s edge cases',
        'contract-snapshot-T-E03-00.md: the types; per endpoint path, who, body, answer, refusals, red tests',
        'every decision the sheet did not make',
        'a new event → marked NEW EVENT',
      ],
      stop: { label: 'STOP · ALWAYS', kind: 'stop' },
    },
  },
  {
    n: '5',
    name: 'Domain and routes',
    cc: { title: 'Part by part, in the ticket’s order → green' },
  },
] as const;

export { RUNS_FEATURE_FIRST_ROWS };
