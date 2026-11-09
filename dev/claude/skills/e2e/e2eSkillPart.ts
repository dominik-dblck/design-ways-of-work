/**
 * - `e2eSkillPart` · this product's half of the e2e skills: its database, its run
 * - imports nothing, so it reads the same at `.claude/skills/e2e/` and in the way of working
 */
const e2eSkillPart = {
  folder: '.claude/skills',
  rules: [
    {
      key: 'readsTheApp',
      text: "**A flow reads the app, never the runner's environment.** `process.env.AUTH_GOOGLE_ID` inside a spec describes the Playwright process, not the server under test. A flow that needs a particular mode establishes it from what rendered — the sign-in card is on screen, or the rail is — and calls `skip()` with a sentence naming what it needed. A suite that skips says why.",
    },
    {
      key: 'seeded',
      text: '**The database is up and seeded, or nothing runs.** The tier opens `content_test` and its `globalSetup` asks the app for the seed first; `docker compose up -d` and one `yarn test` are what it needs, and its sentence says so.',
    },
    {
      key: 'theRunIsRead',
      text: '**The run is read, never written.** `e2e/theRun/` takes its acts, chapters and `seen` from `run.ts`, generated from `events.js`, so a changed run changes the tests and not their code. A new screen adds one door keyed by its command, and a check for each event nobody performs.',
    },
    {
      key: 'oneCommand',
      text: '**One command on the database at a time.** `yarn test` resets `content_test` to the seed before its run and after it; a vitest started while `{{command}}` runs empties the database under it, and whatever that run reports says nothing. `yarn test`, then `{{command}}`, never side by side.',
    },
  ],
  after: {
    'e2e-discovery.input':
      "The screen roster is the design project's; the code is here.",
    'e2e-discovery.status':
      'Here they run as one `yarn vitest run` on the three, never while `{{command}}` runs ({{ruleNumber:oneCommand}}).',
    'e2e-category.flows':
      'A case the sheet does not hold goes on the entry as `added`, and in the report.',
  },
};

export { e2eSkillPart };
