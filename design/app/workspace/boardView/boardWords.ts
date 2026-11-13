/**
 * - `BOARD_WORDS` · every word the Board page shows that no row of the sheet holds
 */
import { productStack } from '../../../docs/process/productStack.ts';

// the browser tests' tool, as the product's stack names it
const BROWSER = productStack.browserTests.name;

const BOARD_WORDS = {
  title: 'Board',
  ideas: { label: 'Ideas', note: 'written down, not yet an epic' },
  columns: { label: 'Columns', note: 'the ideas, then every epic in the column it stands in' },
  contract: { label: 'API contract' },
  idea: { points: 'The idea', example: 'In an example', reads: 'What the agent reads', changes: 'When a reference changes', connects: 'Connects to', questions: 'Open questions', usedBy: 'is used by', notTold: 'not told', together: 'read together' },
  kinds: { label: 'Kinds', note: 'what each kind of ticket is' },
  progress: { label: 'Progress', closed: 'MVP epics closed', doing: 'in hand', ready: 'ready', epics: 'epics', tickets: 'tickets' },
  nextUp: { label: 'Next up', note: 'ready, in backlog order · the top one first' },
  nothingReady: 'Nothing is ready: everything left waits on the doing column.',
  ports: { label: 'Ports', note: 'what the outside still has to tell us, each behind a mock' },
  noTicket: 'no ticket yet',
  badges: { mvp: 'MVP', later: 'After MVP', deferred: 'Deferred' },
  units: { stories: 'stories', of: 'of', typed: 'typed', skipped: 'skipped', lines: 'of lines' },
  project: {
    label: 'Project',
    note: 'the plan and the spec, read from the sheet',
    plan: 'Plan',
    spec: 'Spec',
    endpoints: 'endpoints',
    cases: 'test cases',
    journeys: 'journeys',
    criteria: 'criteria',
    refusals: 'refusals',
    events: 'events',
    decisions: 'decisions',
    findings: 'open findings',
    notes: {
      endpoints: 'every command and query in the contract, and how many have every field typed',
      cases: 'every test case the contract rows generate: a case, a refusal, a field check, a shared case',
      journeys: `every journey written, one ${BROWSER} flow each`,
      criteria: 'every acceptance criterion of every ticket, open and closed',
      refusals: 'every refusal a command or query can answer with',
      events: 'every event the commands append',
      decisions: 'every decision on how the design project works',
      findings: 'what the design side and the build side hold open',
    },
  },
  repository: {
    label: 'Repository',
    note: 'the build side’s code',
    now: 'Now',
    atClose: 'At close',
    waiting: 'its tests, e2e and coverage come with the next report',
    tests: 'suite tests',
    e2e: 'e2e',
    coverage: 'coverage',
    reportedTests: 'acceptance tests',
    reportedTickets: 'tickets',
    notes: {
      now: 'the repository whole, as its last report read it',
      tests: 'every test yarn test passes at that commit, units to acceptance, beside the ones it skips and its change since the report before',
      e2e: `every ${BROWSER} test yarn e2e --list counts`,
      coverage: 'lines covered, from the last coverage run',
      atClose: 'what each ticket reported the day it closed: history, never recounted',
      reportedTests: 'one test per criterion, summed over the tickets’ receipts; a test rewritten since keeps its count',
      reportedTickets: 'tickets on the board whose report gave a receipt',
    },
  },
  stats: {
    epics: { label: 'Epics', note: 'the deferred push left out' },
    mvp: { label: 'MVP', note: 'from creation to send, translations included' },
    tickets: { label: 'Tickets done', note: 'every ticket of every epic' },
    ready: { label: 'Ready', note: 'nothing in the way' },
  },
  epic: { acceptance: 'Epic acceptance', stories: 'Stories', tickets: 'Tickets', waits: 'Waits on', of: 'of' },
  ticket: { criteria: 'Done means', read: 'Read first', edges: 'Edges', waits: 'Waits on', caveats: 'Caveats', flags: 'Receipt flags', story: 'Story', command: 'The command', refusals: 'Refusals', siblings: 'Same story', why: 'Why', emits: 'emits', pings: 'pings', nothing: 'nothing', nobody: 'nobody', on: 'on criterion', pmDecides: 'open · the PM decides', contractOwes: 'open · the contract owes it' },
  why: { today: 'today', after: 'after', unlocks: 'unlocks', not: 'not', replaced: 'replaced', dsScan: 'ds-scan' },
  velocity: {
    label: 'Velocity',
    note: 'done per working day, off the receipts',
    tickets: 'Tickets done per day',
    criteria: 'Criteria done per day',
    day: 'Day',
    show: 'Show the numbers',
    hide: 'Hide the numbers',
    none: 'No receipt yet.',
  },
  tags: { after: 'after', none: 'no dependency', port: 'port', code: 'ported code', screens: 'screens' },
  back: 'Back to the epic',
  openFeature: 'Open the feature',
  close: 'Close',
} as const;

export { BOARD_WORDS };
