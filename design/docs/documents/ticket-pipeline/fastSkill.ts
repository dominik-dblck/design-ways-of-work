/**
 * - `FAST_SKILL` · `ticket-fast`: the fast mode
 */
import type { DocumentSection } from '../documentTypes.ts';

// prettier-ignore
export const FAST_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket-fast/SKILL.md`',
    lines: [
      '',
      '```',
      'name: ticket-fast',
      'description: Mode, 0–1 point. A small ticket, no recon. Build from the pack, then report. One stop, plus any question.',
      '```',
      '',
      '**Purpose.** A token, a copy line, one field, a command generated off the sheet, a UI fix inside a',
      'spec row that exists. The pack is the whole reading.',
      '',
      '**Input.** `{ticket-id}` with `track: fast` on its pack.',
      '',
      '**Tasks.**',
      '',
      '1. Read `ticket/_shared.md`, then `ticket/_code.md`',
      '2. Branch as `ticket-recon` task 2, read the ticket with `yarn ticket:read`',
      '3. **Build.** Tests for every criterion, each seen red once; the whole suite and every scan at zero.',
      '   A clause the repository contradicts, or a criterion that reads two ways, stops here: write it as a',
      '   question and the ticket moves to standard.',
      "4. **Report.** `ticket-report`, with the criterion → test table as a section. **STOP** — merge waits for the design side's yes on the report.",
      '',
      '**Does not.** Write a recon or a contract table, or merge before the yes.',
      '',
      '**Stop.** After task 4, and on any question.',
      '',
      '---',
      '',
    ],
  },
];
