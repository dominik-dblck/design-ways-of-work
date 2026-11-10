/**
 * - `BOARD_WORDS` · every word the Board page shows that no row of the sheet holds
 */

const BOARD_WORDS = {
  eyebrow: 'BOARD · WHAT GETS BUILT, IN ITS ORDER',
  title: 'Board',
  intro: 'One card per epic: its feature ticket, and the smaller tickets inside it. An idea waits on the left until it is picked; an epic moves right as its tickets do.',
  ideas: { label: 'IDEAS', note: 'written down, not yet an epic' },
  idea: { points: 'THE IDEA', example: 'IN AN EXAMPLE', reads: 'WHAT THE AGENT READS', changes: 'WHEN A REFERENCE CHANGES', connects: 'CONNECTS TO', questions: 'OPEN QUESTIONS', usedBy: 'is used by', notTold: 'not told', together: 'read together' },
  kinds: { label: 'KINDS', note: 'what each kind of ticket is' },
  nextUp: { label: 'NEXT UP', note: 'ready, in backlog order · the top one first' },
  nothingReady: 'Nothing is ready: everything left waits on the doing column.',
  ports: { label: 'PORTS', note: 'what the outside still has to tell us, each behind a mock' },
  open: { label: 'TO SETTLE', note: 'what the backlog does not settle yet' },
  noTicket: 'no ticket yet',
  badges: { mvp: 'MVP', later: 'AFTER MVP', deferred: 'DEFERRED' },
  stats: {
    epics: { label: 'EPICS', note: 'the deferred push left out' },
    mvp: { label: 'MVP', note: 'from creation to send, translations included' },
    tickets: { label: 'TICKETS DONE', note: 'every ticket of every epic' },
    ready: { label: 'READY', note: 'nothing in the way' },
  },
  epic: { acceptance: 'EPIC ACCEPTANCE', stories: 'STORIES', tickets: 'TICKETS', waits: 'WAITS ON', components: 'PROTOTYPE COMPONENTS', abstractions: 'WHY THE COUNT DROPS', ship: 'ship', none: 'none ship', ported: 'ported, not components', of: 'of' },
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
  close: 'Close',
} as const;

export { BOARD_WORDS };
