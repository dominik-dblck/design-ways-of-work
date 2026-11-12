/**
 * - `BOARD_WORDS` · every word the Board page shows that no row of the sheet holds
 */
import { productStack } from '../../../docs/process/productStack.ts';

// the browser tests' tool, as the product's stack names it
const BROWSER = productStack.browserTests.name;

const BOARD_WORDS = {
  title: 'Board',
  ideas: { label: 'IDEAS', note: 'written down, not yet an epic' },
  columns: { label: 'COLUMNS', note: 'the ideas, then every epic in the column it stands in' },
  contract: { label: 'API CONTRACT' },
  idea: { points: 'THE IDEA', example: 'IN AN EXAMPLE', reads: 'WHAT THE AGENT READS', changes: 'WHEN A REFERENCE CHANGES', connects: 'CONNECTS TO', questions: 'OPEN QUESTIONS', usedBy: 'is used by', notTold: 'not told', together: 'read together' },
  kinds: { label: 'KINDS', note: 'what each kind of ticket is' },
  progress: { label: 'PROGRESS', closed: 'MVP epics closed', doing: 'in hand', ready: 'ready', epics: 'epics', tickets: 'tickets' },
  nextUp: { label: 'NEXT UP', note: 'ready, in backlog order · the top one first' },
  nothingReady: 'Nothing is ready: everything left waits on the doing column.',
  ports: { label: 'PORTS', note: 'what the outside still has to tell us, each behind a mock' },
  noTicket: 'no ticket yet',
  badges: { mvp: 'MVP', later: 'AFTER MVP', deferred: 'DEFERRED' },
  units: { stories: 'stories', of: 'of', typed: 'typed', skipped: 'skipped', lines: 'of lines' },
  project: {
    label: 'PROJECT',
    note: 'the plan and the spec, read from the sheet',
    plan: 'PLAN',
    spec: 'SPEC',
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
    label: 'REPOSITORY',
    note: 'the build side’s code',
    now: 'NOW',
    atClose: 'AT CLOSE',
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
    epics: { label: 'EPICS', note: 'the deferred push left out' },
    mvp: { label: 'MVP', note: 'from creation to send, translations included' },
    tickets: { label: 'TICKETS DONE', note: 'every ticket of every epic' },
    ready: { label: 'READY', note: 'nothing in the way' },
  },
  epic: { acceptance: 'EPIC ACCEPTANCE', stories: 'STORIES', tickets: 'TICKETS', waits: 'WAITS ON', of: 'of' },
  ticket: { criteria: 'DONE MEANS', read: 'READ FIRST', edges: 'EDGES', waits: 'WAITS ON', caveats: 'CAVEATS', flags: 'RECEIPT FLAGS', story: 'STORY', command: 'THE COMMAND', refusals: 'REFUSALS', siblings: 'SAME STORY', why: 'WHY', emits: 'emits', pings: 'pings', nothing: 'nothing', nobody: 'nobody', on: 'on criterion', pmDecides: 'open · the PM decides', contractOwes: 'open · the contract owes it' },
  why: { today: 'today', after: 'after', unlocks: 'unlocks', not: 'not', replaced: 'replaced', dsScan: 'ds-scan' },
  velocity: {
    label: 'VELOCITY',
    note: 'done per working day, off the receipts',
    tickets: 'TICKETS DONE PER DAY',
    criteria: 'CRITERIA DONE PER DAY',
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
