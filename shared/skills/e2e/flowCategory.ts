/**
 * - `FLOW_CATEGORY` · stage 2 of a screen's flows: one category, its gate, a stop
 */
import type { SkillPage } from '../skillTypes.ts';

const FLOW_CATEGORY: SkillPage = {
  name: 'e2e-category',
  description:
    'Stage 2 of 2. Implements one category of a screen’s flows, runs its gate and stops — one category per pass. Use when a screen’s catalogue exists and a category is pending or red.',
  purpose:
    'Turn one category of the catalogue into flows that run, and prove it with the gate before anything else is written.',
  input: 'A screen whose catalogue exists, and one category name from it.',
  steps: [
    {
      key: 'read',
      text: 'Read `{{skills}}/e2e/_shared.md`, then the catalogue',
    },
    {
      key: 'oneAtATime',
      text: 'Confirm the category is in the catalogue and that no earlier category is failing. **One category at a time**, and never a second while the first is red. Mark it `running` in `{{statusRoot}}/{screen}-status.md` before anything else is written, so a lost context finds where it stopped — a screen without one gets it from `{{templates}}/e2e-status.md` first',
    },
    {
      key: 'spec',
      text: 'Write or extend `{{screensRoot}}/{screen}/{screen}-flows.spec.ts` — runtime, registry, one `runCategorisedTests` call, **no assertion**',
    },
    {
      key: 'flows',
      text: 'Implement this category’s flows in `{{screensRoot}}/{screen}/{screen}-flows-implementations.ts`:',
      points: [
        'reach every element through `{{registry}}/` and `getByTestId` alone ({{ruleNumber:registryOnly}}); move time with `page.clock`, never wait it out ({{ruleNumber:time}})',
        'reuse `shared/e2e/` before writing an interaction — `clickWithFallback`, `isVisibleWithin`, `expectUrl`, `pickUp`, `carryIn`',
        "enter with `page.goto(url, { waitUntil: 'domcontentloaded' })` and then wait on something the screen draws. Never `networkidle` — it answers late under a dev server and not at all under recompilation",
        'assert the entry’s `expectedResult` as a state the UI actually changes to: a control that swaps, a view that appears, a row that goes. Not a test id that no longer renders',
        'register what ran with the coverage callback, `covered(flowId)` · the steps and the cases it makes happen live on its catalogue entry, never in the run',
      ],
    },
    {
      key: 'list',
      text: 'List the gate before running it: `{{command}} {{screensRoot}}/{screen} --list --grep "<category>"`. Every line reads `› <suite name> › <category> ›`; one that does not means the name is not unique, and the name changes in the catalogue — the grep is never tuned by hand',
    },
    {
      key: 'gate',
      text: 'Run the gate: `{{command}} {{screensRoot}}/{screen} --grep "<category>"`. Red → first find a flow in another suite that already does the same thing — the same interaction, the same component, the same pending or refusal branch — and reuse how it does it. Then fix it here, in this category — a fix outside `{{screensRoot}}/` is {{ruleNumber:noTestCode}}’s stop — and run again. Do not start the next category, do not widen the change, do not re-run hoping',
      then: 'Green, then red: each flow of the category once against a planted fault in what it tests — the registry id removed, the branch inverted, the role let through — never in the flow itself. Quote the red line, take the fault out, run green again. A fault that leaves the flow green means the flow proves less than its `expectedResult` says · tighten the flow, not the fault',
    },
    {
      key: 'status',
      text: 'Update the status file: the category `passed` or `blocked`, the gate’s result, each flow moved from `## Not yet seen red` to the red table with its fault and its red line, and for each red run its cause, the flow whose approach was borrowed or `none`, and what changed',
    },
    {
      key: 'present',
      text: 'Present the category, the exact gate command, its result and **STOP**',
    },
  ],
  closing: [
    '**Stop.** Always — the gate is the point, and a stop is where somebody reads it.',
    '**Done, for the screen.** Every category `passed` and none `running`; one `{{command}} {{screensRoot}}/{screen}` green, its coverage line copied into the status file; every catalogued flow covered, or skipped with what it waits on; `## Not yet seen red` empty; what no flow covers written down with the test that covers it or `nowhere`; the three gates `e2e-discovery` runs and the registry’s gates green. Until then the screen is in progress, whatever its last category said.',
    '**Never here.** No production branch for a test. No second category. No selector invented at the call site.',
  ],
};

export { FLOW_CATEGORY };
