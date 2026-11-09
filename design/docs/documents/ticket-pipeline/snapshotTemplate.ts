/**
 * - `SNAPSHOT_TEMPLATE` · the contract snapshot template
 */
import type { DocumentSection } from '../documentTypes.ts';

export const SNAPSHOT_TEMPLATE: readonly DocumentSection[] = [
  {
    heading: '# `roadmaps/templates/ticket-contract-snapshot.md`',
    lines: [
      '',
      '```markdown',
      '# contract-snapshot-{id} · {date}',
      '',
      '> endpoint tests {n}, all red · sent before any domain code',
      '',
      '## Types',
      '{verbatim TypeScript, each block headed by its file: brands, bodies, answers, refusal keys}',
      '',
      '## Endpoints',
      '| Method and path | Who may call | Body | Answer (every case) | Refusal keys | Red tests |',
      '|---|---|---|---|---|---|',
      '',
      '## Decided',
      '{one “did X because Y” each: a case, a field, a refusal, a query parameter · NEW EVENT marked}',
      '',
      '## Differs from the sheet',
      '{row · what · why — or "none"}',
      '```',
      '',
      '---',
      '',
    ],
  },
];
