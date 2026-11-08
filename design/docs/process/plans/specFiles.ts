/**
 * - `SPEC` · the files that are the spec, read where they sit
 * - `PROJECT_CONTEXT` · what an agent reads before its first ticket
 * - `COMBINATIONS` · the fact combinations, one file
 */
import type { FileRow, ContextRead, CombinationFile } from './plansTypes.ts';

// the files that are the spec: read where they sit, nothing copies them wholesale · a ticket whose tests need one as data says so and copies that one as a fixture
export const SPEC: readonly FileRow[] = [
  {
    file: 'glossary.js',
    holds:
      'one name per idea, every decided mechanic, the open questions · and its screen words (ui), the single source of truth for both (UV1 · PM, 18 Oct)',
  },
  {
    file: 'block-model.json',
    holds: 'the 25 decisions and the types · the schema is generated from this',
  },
  {
    file: 'events.js',
    holds:
      '45 event types by key, who produces each, who it pings · and the 96-step run that is the acceptance test (counted 2026-10-16)',
  },
  {
    file: 'commands.js',
    holds:
      '43 commands · route, body, the rules that refuse it, the events it appends',
  },
  {
    file: 'refusals.js',
    holds:
      'every way a command can be refused · the key, its order and its note · its sentence and its fix are messages.js’ (MS2)',
  },
  {
    file: 'messages.js',
    holds:
      'every sentence a person sees: State, Move (× five readers), Outcome, and every refusal’s line and fix · the one place (MS1, MS2 · PM, 18 Oct)',
  },
  {
    file: 'queries.js',
    holds:
      '7 queries · route, params, the store each one reads, the response shape',
  },
  {
    file: 'directory.js',
    holds:
      'who exists, their roles and languages · pools derive from this · copied into the domain as data at T-E00-12, the way refusals.js is at T-E00-10',
  },
  {
    file: 'projections.js',
    holds:
      'the three projections T-E00-11 asserts · from Payloads.all() to the shape blocks.js, signatures.js and threads.js hold · copied as a fixture and ported once',
  },
  {
    file: 'measure.js',
    holds:
      'one measurement, one way · Measure.run() loads nothing and counts everything a criterion quotes about the sheet, with every module in Measure.load order · “measured <date>” means this',
  },
  {
    file: 'payloads.js',
    holds:
      'the payload of every step of the run · one function over events.js · RUN plus a FACTS table, 99 entries typed to their key · what T-E00-11 seeds from',
  },
  {
    file: 'gate-rules.js',
    holds:
      'the action rules and their reason strings · 41 documented states as fixtures',
  },
  {
    file: 'block-rules.js',
    holds:
      'what a block shows and what may be done to it · 9 situations as fixtures',
  },
  { file: 'gate-states.js', holds: 'the legend for every gate dot' },
  {
    file: 'backlog.js',
    holds: 'epics, stories, dependencies · and how the work gets built',
  },
  {
    file: 'edges.js',
    holds:
      'one decision tree per case a criterion does not name · loaded before tickets.js',
  },
  {
    file: 'receipts.js',
    holds:
      'what a closed ticket reported, and the caveats it left · loaded before tickets.js',
  },
  {
    file: 'tickets.js',
    holds:
      'the tickets, their tests, and the one hand-written field: status · reads the two above',
  },
  { file: 'plans.js', holds: 'this file · the map of the rest' },
  {
    file: 'agent-instructions.md',
    holds:
      'read first in the repo · what to read, what never to write, and the one shape a report back takes',
  },
  {
    file: 'db-schema.js',
    holds:
      'the tables and their columns · the ten criteria behind Postgres, their tally and the answer (db-schema.js · rows, tally, answer, oneLine), and what would flip them',
  },
];

// the reading order for an agent before its first ticket · short on purpose: everything else is reached from a ticket’s own read list
export const PROJECT_CONTEXT: readonly ContextRead[] = [
  {
    read: 'plans.js · this file',
    why: 'what exists and which of it is the spec',
  },
  {
    read: 'glossary.js · every term',
    why: 'the one name for each idea, and the decided mechanics: snapshot, stream version, hash chain, refusal, silent command',
  },
  {
    read: 'block-model.json · decisions',
    why: 'what a block, a revision and a version are · a version holds no text',
  },
  {
    read: 'backlog.js · the header comment',
    why: 'how it gets built: tests first, agents as users, one thing after another',
  },
  {
    read: 'commands.js · contract',
    why: 'what every command carries and what every command may answer',
  },
  {
    read: 'events.js · the RUN',
    why: 'the one document from creation to send · the acceptance test for the whole domain',
  },
];

// the fact combinations, one file: every role × its own gate × the document × a language’s facts, and the menu’s classes · reductionCheck proves a role’s button reads its own gate alone · the Feature page counts it from the file when asked
export const COMBINATIONS: readonly CombinationFile[] = [
  {
    epic: 'E09',
    file: 'role-combinations.js',
    fn: 'all',
    call: 'RoleCombinations.combinationRows()',
    count: 'RoleCombinations.count',
    criteria: 'T-E09-00 c27 · re-ports T-E06-00 c13, T-E06-13 c16',
    what: 'Every role’s button over its own gate × the document × a language’s facts (882 rows), and the content manager’s menu over every class of gates (67), counted 16 Oct · reductionCheck 0, deadEnds 0.',
  },
];
