**Read first, at both stages.** The rules below hold whatever is being written; neither skill
repeats them. What the framework is, and what it deliberately is not, is `e2e/framework/README.md`
— read once, before either stage's first task.

**1 · The app is running, and the probe says so.** `GET /api/health` answers `{ ok: true }` and reads
nothing — no session, no store, no environment. The runner fetches it in `beforeAll` and fails the
whole suite with one sentence when it does not answer. A red probe means the process is down and
nothing else.

**2 · A flow reads the app, never the runner's environment.** `process.env.AUTH_GOOGLE_ID` inside a
spec describes the Playwright process, not the server under test. A flow that needs a particular
mode establishes it from what rendered — the sign-in card is on screen, or the rail is — and calls
`skip()` with a sentence naming what it needed. A suite that skips says why.

**3 · Selectors come from `e2e/testingIds/`** — the rule is `docs/rules/components.md`'s. The
component and the flow read the same ID; a new selector is a registry entry first and an attribute
second.

**4 · Nothing in shipped code exists for a test** — the rule is `docs/rules/tests.md`'s. A behaviour
that cannot be reached without a test switch is a finding to raise, not a branch to add. Production edits from this tier are two things only: a real bug fix, and a `data-testid`
that comes from the registry. The test id goes in without asking. The bug fix is a **STOP** before
the edit — the file, the behaviour that is wrong, the flow that caught it — and it waits for a yes.
Every stop carries the line `Production code · none | test ids only | approved fix`, and names the
files behind the last two.

**5 · `e2e/framework/` imports nothing from the application.** Not `@/app`, not `@domain`, not
`@store`. Anything that knows this repository's roster, cookies or routes lives beside the framework
and not inside it — `tests/architecture/theBrowserTierIsPortable.test.ts` is the check, and it is
what keeps the tier liftable into the next project.

**6 · The spec file holds no assertion.** Runtime, registry, one `runCategorisedTests` call. Every
`expect` is in the implementations file. This is what keeps a suite readable once it has thirty
flows instead of five.

**7 · Retries are zero and a flake is a defect.** `clickWithFallback` retries a click that Playwright
reports as transient, and that is the only retrying this tier does. A test that passes on the second
run and not the first is reported, never re-run.

**8 · Say what was run.** Every stop names the exact command and its result — the gate is
`yarn e2e e2e/{screen} --grep "<category>"`, the path holding it to one screen and the name to one
category, and a category is not done until that line is green.

**9 · The database is up and seeded, or nothing runs.** The tier opens `content_test` and its
`globalSetup` asks the app for the seed first; `docker compose up -d` and one `yarn test` are what it
needs, and its sentence says so.

**10 · The run is read, never written.** `e2e/theRun/` takes its acts, chapters and `seen` from
`run.ts`, generated from `events.js`, so a changed run changes the tests and not their code. A new
screen adds one door keyed by its command, and a check for each event nobody performs.

**11 · Every role meets the screen.** A catalogue holds a flow for every role a person can have —
the `person` rows of `ROLES` in `packages/domain/directory/directory.ts` — and one for a visitor with
no session, or its status file says under `## Roles no flow takes, and why` why that role is no
variant here. The roles are read off the directory, so a role added there reddens every catalogue
until each one answers it · `tests/architecture/everyRoleHasAFlow.test.ts`.

**12 · Every kind of path is walked.** An entry names the `paths` it walks, from `FLOW_PATHS` in
`e2e/framework/theFlowCatalog.ts`: `happy`, `refusal`, `role`, `cancel`, `empty`, `loading`,
`error`, `edge`. A screen walks every kind, or its status file names under
`## Paths no flow takes, and why` the test in another tier that walks it, or says `nowhere` and why ·
`tests/architecture/everyPathIsWalked.test.ts`.

**13 · The status file is measured, not narrated.** Every line under `## What no flow covers, and
why` and under the two waivers ends with the test that covers it — ``· `path/to/file.test.ts` › its
title`` — or with `· nowhere · {why}`, and a named test exists under that title. The red table holds
one row per catalogue key and no other; a flow nobody has seen fail stands under
`## Not yet seen red`, and while one does the screen's `done` reads `not yet` ·
`tests/architecture/theStatusFileHolds.test.ts`.

**14 · The registry is the only way in, both ways.** A flow reaches an element by `getByTestId`:
never `getByRole`, `getByText`, `getByLabel` or `getByPlaceholder`, and never `.locator('input')` —
a text field's id sits on its `<input>` through `slotProps.htmlInput`. `filter({ hasText })` picks
among rows by their data and stays. Every registry id is rendered by a component and read by a flow
or an app test; an id nothing reads is a control nobody tests · `tests/architecture/e2eReachesByTheRegistry.test.ts`.

**15 · Time is moved, never waited** — the rule is `docs/rules/tests.md`'s. A flow that proves nothing
happens inside a debounce or a pause installs `page.clock` and runs it forward; `waitForTimeout` is
red in the same scan as rule 14.

**16 · One command on the database at a time.** `yarn test` resets `content_test` to the seed before
its run and after it; a vitest started while `yarn e2e` runs empties the database under it, and
whatever that run reports says nothing. `yarn test`, then `yarn e2e`, never side by side.
