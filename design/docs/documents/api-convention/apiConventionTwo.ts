/**
 * - `CONVENTION_TWO` · api-convention.md, its part 2 of 2
 */
import type { DocumentSection } from '../documentTypes.ts';

// prettier-ignore
export const CONVENTION_TWO: readonly DocumentSection[] = [
  {
    heading: '## What a contract for one endpoint states',
    lines: [
      '',
      "Descriptions, not code — how it is built is the build side's.",
      '',
      '- method + path · actor',
      '- body or params, typed',
      '- **validation per field**: which row of the table above, plus anything of its own (e.g. a name unique',
      '  in its group, case aside)',
      '- **edge cases of its own**, each with its answer (status + refusal key), beyond the nine above —',
      '  e.g. a copy of a trashed document, a rename to the name it already has',
      "- the 200's result · the events it emits",
      '',
      'Rules a type cannot say are checked by the design side against edges.ts, block-rules.ts and gate-rules.ts.',
      '',
    ],
  },
];
