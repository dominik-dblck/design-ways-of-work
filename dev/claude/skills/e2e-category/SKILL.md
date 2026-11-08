---
name: e2e-category
description: Stage 2 of 2. Implements one category of a screen's flows, runs its gate and stops — one category per pass. Use when a screen's catalogue exists and a category is pending or red.
---

**Purpose.** Turn one category of the catalogue into flows that run, and prove it with the gate
before anything else is written.

**Input.** A screen whose catalogue exists, and one category name from it.

**Tasks.**

1. Read `.claude/skills/e2e/_shared.md`, then the catalogue
2. Confirm the category is in the catalogue and that no earlier category is failing. **One category
   at a time**, and never a second while the first is red. Mark it `running` in
   `roadmaps/e2e/{screen}-status.md` before anything else is written, so a lost context finds where
   it stopped — a screen without one gets it from `roadmaps/templates/e2e-status.md` first
3. Write or extend `e2e/{screen}/{screen}-flows.spec.ts` — runtime, registry, one
   `runCategorisedTests` call, **no assertion**
4. Implement this category's flows in `e2e/{screen}/{screen}-flows-implementations.ts`:
   - reach every element through `e2e/testingIds/` and `getByTestId` alone (`_shared.md` rule 14);
     move time with `page.clock`, never wait it out (rule 15)
   - reuse `e2e/framework/` before writing an interaction — `clickWithFallback`, `isVisibleWithin`,
     `expectUrl`, `pickUp`, `carryIn`
   - enter with `page.goto(url, { waitUntil: 'domcontentloaded' })` and then wait on something the
     screen draws. Never `networkidle` — it answers late under a dev server and not at all under
     recompilation
   - assert the entry's `expectedResult` as a state the UI actually changes to: a control that
     swaps, a view that appears, a row that goes. Not a test id that no longer renders
   - register what ran with the coverage callback, `covered(flowId)` · the steps and the cases it
     makes happen live on its catalogue entry, never in the run · a case the sheet does not hold
     goes on the entry as `added` and in the report
5. List the gate before running it: `yarn e2e e2e/{screen} --list --grep "<category>"`. Every line
   reads `› <suite name> › <category> ›`; one that does not means the name is not unique, and the
   name changes in the catalogue — the grep is never tuned by hand
6. Run the gate: `yarn e2e e2e/{screen} --grep "<category>"`. Red → first find a flow in another
   suite that already does the same thing — the same interaction, the same component, the same
   pending or refusal branch — and reuse how it does it. Then fix it here, in this category — a fix
   outside `e2e/` is `_shared.md` rule 4's stop — and run again. Do not start the next category, do
   not widen the change, do not re-run hoping
   6a. Green, then red: each flow of the category once against a planted fault in what it tests — the
   registry id removed, the branch inverted, the role let through — never in the flow itself. Quote
   the red line, take the fault out, run green again. A fault that leaves the flow green means the
   flow proves less than its `expectedResult` says · tighten the flow, not the fault
7. Update the status file: the category `passed` or `blocked`, the gate's result, each flow moved
   from `## Not yet seen red` to the red table with its fault and its red line, and for each red
   run its cause, the flow whose approach was borrowed or `none`, and what changed
8. Present the category, the exact gate command, its result and **STOP**

**Stop.** Always — the gate is the point, and a stop is where somebody reads it.

**Done, for the screen.** Every category `passed` and none `running`; one `yarn e2e e2e/{screen}`
green, its coverage line copied into the status file; every catalogued flow covered, or skipped
with what it waits on; `## Not yet seen red` empty; what no flow covers written down with the test
that covers it or `nowhere`; the three gates of `e2e-discovery` 8a and rule 14's scan green. Until
then the screen is in progress, whatever its last category said.

**Never here.** No production branch for a test. No second category. No selector invented at the
call site.
