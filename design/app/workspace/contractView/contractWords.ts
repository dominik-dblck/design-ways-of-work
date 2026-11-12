/**
 * - `CONTRACT_WORDS` · every word the API contract page shows that no row holds
 */

const CONTRACT_WORDS = {
  eyebrow: 'PLAN · API CONTRACT',
  title: 'Every endpoint, as TypeScript',
  intro:
    'Read live from the contract’s rows: commands.ts, queries.ts, ports.ts, refusals.ts and blockModel.ts. What every endpoint shares is typed once, in the first block; each endpoint then names its body and its whole answer.',
  stats: {
    endpoints: 'endpoints in the sheet',
    typed: 'typed in the sheet',
    draft: 'drafted from the model · to confirm',
    todo: 'something still to type',
    noRow: 'named by a ticket, with no row in the sheet yet',
  },
  legend: {
    typed: 'in the sheet',
    draft: 'from the model, confirmed when its row is refined',
    todo: 'no type yet',
  },
  states: { all: 'All', typed: 'Typed', draft: 'Draft', todo: 'To type' },
  allEpics: 'ALL',
  shared: {
    label: 'SHARED',
    note: 'What every endpoint uses',
    aliases: '// the model’s aliases · blockModel.ts',
    refusals: '// every refusal key · refusals.ts',
    showNotes: 'Show the model’s notes',
    hideNotes: 'Hide the notes',
  },
  endpoints: {
    label: 'ENDPOINTS',
    note: 'each with its body and its whole answer, in the backlog’s order',
  },
  kinds: { command: 'COMMAND', query: 'QUERY', port: 'PORT' },
  nothing: 'No endpoint matches these filters.',
  folds: { showAll: 'Show all', hideAll: 'Hide all' },
} as const;

export { CONTRACT_WORDS };
