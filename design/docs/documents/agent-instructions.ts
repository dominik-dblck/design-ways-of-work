/**
 * - `agentInstructions` · agent-instructions.md as data, printed byte for byte
 */
import type { DocumentFile, DocumentSection } from './documentTypes.ts';

const SECTIONS: readonly DocumentSection[] = [
  {
    heading: '# Instructions for the agent building this',
    lines: [
      '',
      'Read this before the first ticket. It is short on purpose; everything it does not say is in a',
      'file it points at.',
      '',
    ],
  },
  {
    heading: '## What this is',
    lines: [
      '',
      'A content approval tool for Deblock. A content manager writes a marketing mailing in blocks,',
      'versions freeze the text, the CEO and Legal sign a version, five languages are translated and',
      'signed on it, and a signature falls when the text under it moves. Everything that happens is an',
      'event in one append-only log, and the state is replayed from that log.',
      '',
      'The whole system is specified before it is built. You are not deciding what it does — that work',
      'is done, and where it is not done, it is marked as not done.',
      '',
    ],
  },
  {
    heading: '## Where the specification lives',
    lines: [
      '',
      'In the design project, which you can read: at the release the design side names, each file by its',
      'path and its sha256, as `ticket-pipeline.md · _shared.md` says. Nothing in the repository reproduces it.',
      '',
      'Read these six, in this order, before you start:',
      '',
      '1. `plans.ts` — what exists and which of it is the specification',
      '2. `glossary.ts` — one name per idea, and the decided mechanics: snapshot, stream version, hash chain, refusal, silent command',
      '3. `block-model.json` — what a block, a revision and a version are · a version holds no text',
      '4. `backlog.ts` — the header comment: how this gets built',
      '5. `commands.ts` — `contract`: what every command carries and what every command may answer',
      '6. `events.ts` — the RUN: one document from creation to send, in 99 steps, and the acceptance test for the whole domain',
      '',
      'Then take a ticket from `tickets.ts`. Each one carries its own read list. A line names a module by',
      'its short name — `commands.ts · AddBlock` — and the pack’s table, The modules, gives each one its path',
      'in the design repository and its sha256; a module is its entry and the files bundled with it.',
      '',
    ],
  },
  {
    heading: '## What you write, and what you never write',
    lines: [
      '',
      'You write the repository: code, tests, migrations, configuration.',
      '',
      'You read the design project as often as you like — read the ticket again before every step, because',
      'it moves. You never write it. Not the specification, not the tickets, not a status.',
      '',
      'This is a rule, not an impossibility. The design project is a repository you can reach from the',
      'terminal, so the channel is there and not using it is a choice; your hook holds you to read',
      'commands there. Two reasons it stays that way, and the second is the one that matters: a change to the',
      'specification is a decision, and decisions are made in conversation there, where the person who',
      'has to live with them is present. And these files move in conversations you are not part of — six',
      'edits landed in block-model.json between your two reads of it on T-E00-03 — so a write from here',
      'can silently drop work you never saw.',
      '',
      'When your tests need a specification file as data — `events.ts` for the run, `blocks.ts` and',
      '`signatures.ts` and `threads.ts` as the assertions the seed is checked against, `directory.ts`,',
      '`refusals.ts`, the fixtures in `gate-rules.ts` and `block-rules.ts` — copy it into the repository',
      'as a fixture. The ticket that needs it names it. Copy nothing on speculation.',
      '',
    ],
  },
  {
    heading: '## How the work goes',
    lines: [
      '',
      '- The log is the truth. State is replayed from it, never written by hand. A command that changes something a reader can see appends an event.',
      '- Write the tests first. They are named on the ticket, and a ticket is done when they are green.',
      '- Write the contract before the first test: one row per acceptance criterion, the criterion quoted verbatim, the test that will prove it, and the file it lives in. Report it and wait. This is where the specification’s contradictions surface while they are still text — T-E00-03’s contract found a decided rename never applied, two dangling type references, a field the levels table called derived and the types table stored, and one fact with two homes. None of those would have failed a test; all of them would have been frozen into code.',
      '- The server works out the stream version; a caller never sends one. A command whose sense is "I read this" — a signature, a confirmation — states the version and the content identity it read — a version’s hash, a block’s revision id — and is refused with 409 when either has moved. A merge is never the answer.',
      '- A refusal carries the rule key, one sentence for a person, what it fired on, the current stream version, and what would make the call pass.',
      '- Event types are named by key. Nothing names one by number.',
      '- A payload is what the carries sentence names, plus what the command body carried, plus what the rule computed — and every field the sentence does not name is listed in the contract with the source that put it there. It never repeats by or at: both live on Event, from the session and the server clock.',
      "- A key never changes meaning. Events written years ago are replayed by today's code, so a key is added, split or retired — never redefined and never migrated.",
      '- Files are never overwritten. Every upload is a new object.',
      '- Read the ticket again before you report it done. It may have moved while you were working.',
      '',
    ],
  },
  {
    heading: '## Reporting back',
    lines: [
      '',
      'The report’s shape is the skill’s template — ticket-pipeline.md, the report step and its receipt — and this file copies none of it: a second copy is how a shape drifts (PM, 1 Oct). Ticket status is set in the design project from those reports.',
      '',
    ],
  },
];

const agentInstructions: DocumentFile = {
  path: 'docs/process/agent-instructions.md',
  sections: SECTIONS,
};

export { agentInstructions };
