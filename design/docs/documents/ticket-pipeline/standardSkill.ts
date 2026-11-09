/**
 * - `STANDARD_SKILL` · `ticket-standard`: the standard mode
 */
import type { DocumentSection } from '../documentTypes.ts';

export const STANDARD_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket-standard/SKILL.md`',
    lines: [
      '',
      '```',
      'name: ticket-standard',
      'description: Mode, outside an epic on a pattern that exists. Four steps, two stops: after the recon and its contract table, after the report.',
      '```',
      '',
      '**Purpose.** A ticket whose pattern a landed ticket set, in four steps. Nothing the old stages checked',
      'is dropped; the rules they held are in `_code.md`.',
      '',
      '**Input.** `{ticket-id}` with `track: standard` on its pack.',
      '',
      '**Tasks.**',
      '',
      '1. Read `ticket/_shared.md`, then `ticket/_code.md`',
      '2. **Recon and contract table, one message.** `ticket-recon`, then `## Contract` appended to the same',
      '   file: criteria **verbatim**, criterion → test → file, one row each, test names as `it(…)` will say',
      '   them; every criterion owns a row, every row one criterion; one Counts line under the table, the only',
      '   place a count lives. A pipe in a criterion is `&#124;`. A gap is decided and written “did X because Y”',
      '   beside its row. Present and **STOP** — the design side reads the table before code.',
      '3. **Red → green, no stop.** Every test seen red once, by its kind (`_code.md`); the report lists each',
      '   red run. A question is decided and written for the report (rule:feature-run-never-stops).',
      '4. **Arch-review and regression, one pass.** `ticket-arch-review`, then `ticket-regression`.',
      '5. **Report.** `ticket-report`. **STOP**.',
      '',
      '**Does not.** Change its own mode down, or move to another mode for a question — it decides.',
      '',
      '**Stop.** After task 2 and after task 5.',
      '',
      '---',
      '',
    ],
  },
];
