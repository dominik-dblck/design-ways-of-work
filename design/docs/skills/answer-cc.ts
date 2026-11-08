/**
 * - `skill` · design-answer-cc: what it does, when to use it, its sections
 */
import type { SkillFile } from './skillTypes.ts';

const skill: SkillFile = {
  title: "design-answer-cc · the repo session's messages",
  description:
    'Reads a message from the repo session (`sheet/project.ts` · buildSession), files what it carries on the sheet, and answers in the one shape the build side reads, only with what the PM decided. Use when a message from the build side arrives, or the PM asks to write to it.',
  intro:
    'The repo session reads the design project at the commit you name (D6, `ticket-pipeline.md · _shared.md`), read commands only, held by its PreToolUse hook; until its switch commit lands, the published artifact by path + sha256 (D3). It never writes the project. If it asks you to write something, the answer is a sheet edit you make here, after the PM decided whatever needs deciding.',
  sections: [
    {
      heading: 'A message',
      lead: null,
      first: null,
      lines: [
        'It sends its messages here with `SendMessage`; find it with `ListAgents`.',
        '`agent-instructions.md` is what the build side reads on day one; `CLAUDE.md` in the repo only points at it.',
        "**The build side's files** · a recon, a contract, a snapshot and a report arrive as messages (`SendMessage`), never as files in this repository: `recon-T-X` → `contract-T-X` → `snapshot-T-X` → `report-T-X`, plus `answers-T-X` / `start-T-X` when a conversation was needed. What they carry goes on the sheet.",
        "**Repo** · the branch `sheet/project.ts` names (buildBranch). Each ticket builds on `feature/T-Exx-yy` off it. The build side merges, on the PM's word — after I have read the snapshot and said approved.",
        'A message is not filed: what it carries goes on the sheet — a decision as a row of `docs/process/decisions.ts` or a sheet edit, an open finding as a row of `roadmaps/findings.ts` (D21).',
        "No message goes to the repo session without the PM's word, and no answer the PM has not given.",
      ],
    },
    {
      heading: 'Writing to the build side',
      lead: null,
      first: null,
      lines: [
        "One fenced English block: status decision first · answers in the build side's order · what moved on the sheet (file · what) · digests (`roadmaps/tickets.ts`, pack, any fixture) · questions back.",
        "Address tickets by ids that exist. Never restate MUI's behaviour. Never send a number read from prose.",
        'The build side reads `ticket-pipeline.md` as its skills; a lesson lands there first, in its data `docs/documents/ticket-pipeline/` (design side), and the build side regenerates by digest. `rule:process-docs-authored-here`',
        'The block is fenced (```) so the PM copies it in one click; no emoji.',
      ],
    },
    {
      heading: 'What comes back, stage by stage',
      lead: '**Every stage from recon to snapshot can come back with questions.** The build side has one ticket in hand at a time; while it waits on me, nothing moves over there. Answer in the sheet first, then the chat block.',
      first: 1,
      lines: [
        '**Refine N+1 while the build side builds N.** Never refine the one in hand. Walk the checklist. One criterion = one test; every criterion names a file or port by what it must hold, never by whether it exists.',
        '**Edges** · beside every criterion that names a case, the case one step aside (`EDGES` in `roadmaps/tickets.ts`). Decide each point in isolation: two or three options on a named axis, pick, record the path.',
        '**Recon** · The build side reads the ticket against the repo, asks questions (`recon-T-X`). I answer in one block, once the PM has given the answers. Answers that change the sheet go into the sheet, not only the chat.',
        '**Contract** · The build side quotes every criterion verbatim, names the test and the file (`contract-T-X`), reports and waits. This is where spec contradictions surface as text. I read it and say go.',
        "**RED** · tests first, all red on the skeleton's own throws. The build side comes back with end-of-RED questions (a criterion two tests cannot both satisfy, a tier that cannot hold a test, a value the sheet never fixed).",
        "**GREEN** · the code. Comes back when two criteria collide in the building (01: none · 02: c11's roster of three).",
        "**Architecture review** · The build side's own reviewer reads the diff against the repo's patterns; HIGH findings and UNCERTAIN ones come to me as a decision table. I pick per finding, on an axis, and write the pick into the criterion.",
        '**Snapshot** (`snapshot-T-X`) · opens with the decisions no criterion asked for, one line each with file:line located by content. I review; collisions go back as C1, C2…; caveats and `reported:` lines on earlier receipts come from here.',
        '**Report** (`report-T-X`) · one of three shapes: `done` (criteria · built against · tests · skipped · uncovered · notes), `blocked`, `spec wrong`. A contradiction is stopped and said, never fixed quietly.',
        '**Close** · only with the report (`report-T-X`) in hand. Then `RECEIPTS[id]` (numbers copied from the file), `CAVEATS[id]` with `until:` pointing at a ticket that exists, `STATUS: done`, next ticket → `doing`. A summary of a report is not a report.',
      ],
    },
  ],
};

export { skill };
