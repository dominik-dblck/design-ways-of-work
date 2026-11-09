/**
 * - `BROWSER_OPENING`, `BROWSER_RULES` · what both e2e stages read first
 */
import type { SkillRule } from '../../browserTypes.ts';

const BROWSER_OPENING =
  "**Read first, at both stages.** The rules below hold whatever is being written; neither skill repeats them. What the framework is, and what it deliberately is not, is `shared/e2e/README.md` — read once, before either stage's first task.";

// `{{name}}` is a name the scope's browser tier gives, `{{ruleNumber:key}}` a rule's number: the writer resolves both
const BROWSER_RULES: readonly SkillRule[] = [
  {
    key: 'probe',
    text: '**The app is running, and the probe says so.** `GET {{healthPath}}` answers and reads nothing — no session, no store, no environment. `runCategorisedTests` fetches it in `beforeAll` and fails the whole suite with one sentence when it does not answer. A red probe means the process is down and nothing else.',
  },
  {
    key: 'registry',
    text: '**Selectors come from `{{registry}}/`.** The component and the flow read the same id; a new selector is a registry entry first and an attribute second.',
  },
  {
    key: 'noTestCode',
    text: '**Nothing in shipped code exists for a test** — the tests rules’ “Production reads no test switch”. A behaviour that cannot be reached without a test switch is a finding to raise, not a branch to add. Production edits from this tier are two things only: a real bug fix, and a test id that comes from the registry. The test id goes in without asking. The bug fix is a **STOP** before the edit — the file, the behaviour that is wrong, the flow that caught it — and it waits for a yes. Every stop carries the line `Production code · none | test ids only | approved fix`, and names the files behind the last two.',
  },
  {
    key: 'portable',
    text: '**`shared/e2e/` imports nothing from the product.** Node’s builtins, `@playwright/test` and its own files alone. Anything that knows the product’s roster, cookies or routes lives beside the framework and not inside it · `shared/tests/theBrowserTierIsPortable.test.ts`.',
  },
  {
    key: 'specHoldsNoAssertion',
    text: '**The spec file holds no assertion.** Runtime, registry, one `runCategorisedTests` call. Every `expect` is in the implementations file, which keeps a suite readable once it has thirty flows instead of five.',
  },
  {
    key: 'noRetries',
    text: '**Retries are zero and a flake is a defect.** `clickWithFallback` retries a click that Playwright reports as transient, and that is the only retrying this tier does. A test that passes on the second run and not the first is reported, never re-run.',
  },
  {
    key: 'sayWhatRan',
    text: '**Say what was run.** Every stop names the exact command and its result — the gate is `{{command}} {{screensRoot}}/{screen} --grep "<category>"`, the path holding it to one screen and the name to one category, and a category is not done until that line is green.',
  },
  {
    key: 'roles',
    text: '**Every role meets the screen.** A catalogue holds a flow for every role the browser tier names — {{roles}} — or its status file says under `## Roles no flow takes, and why` why that role is no variant here · `shared/tests/everyRoleHasAFlow.test.ts`.',
  },
  {
    key: 'paths',
    text: '**Every kind of path is walked.** An entry names the `paths` it walks, from `FLOW_PATHS` in `shared/e2e/flowPaths.ts`. A screen walks every kind, or its status file names under `## Paths no flow takes, and why` the test in another tier that walks it, or says `nowhere` and why · `shared/tests/everyPathIsWalked.test.ts`.',
  },
  {
    key: 'statusMeasured',
    text: '**The status file is measured, not narrated.** Every line under `## What no flow covers, and why` and under the two waivers ends with the test that covers it — ``· `path/to/file.test.ts` › its title`` — or with `· nowhere · {why}`, and a named test exists under that title. The red table holds one row per catalogue key and no other; a flow nobody has seen fail stands under `## Not yet seen red`, and while one does the screen’s `done` reads `not yet` · `shared/tests/theStatusFileHolds.test.ts`.',
  },
  {
    key: 'registryOnly',
    text: '**The registry is the only way in, both ways.** A flow reaches an element by `getByTestId` alone: never `getByRole`, `getByText`, `getByLabel` or `getByPlaceholder`, never a css `locator` (ESLint, `FLOW_SHAPES`). `filter({ hasText })` picks among rows by their data and stays. A component writes no id in place: it imports it from the registry or forwards the `testId` its props declare · `shared/tests/testIdsComeFromTheRegistry.test.ts`. Every registry id is rendered by the product’s code and read by a flow or a test; an id nothing reads is a control nobody tests · `shared/tests/everyRegistryIdIsRenderedAndRead.test.ts`.',
  },
  {
    key: 'time',
    text: '**Time is moved, never waited** — the tests rules’ row. A flow that proves nothing happens inside a debounce or a pause installs `page.clock` and runs it forward; a timer awaited is red (`wow/time-is-moved-not-waited`).',
  },
];

export { BROWSER_OPENING, BROWSER_RULES };
