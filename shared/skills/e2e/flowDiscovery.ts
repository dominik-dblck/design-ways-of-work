/**
 * - `FLOW_DISCOVERY` · stage 1 of a screen's flows: its catalogue, and a stop
 */
import type { SkillPage } from '../skillTypes.ts';

const FLOW_DISCOVERY: SkillPage = {
  name: 'e2e-discovery',
  description:
    'Stage 1 of 2. Writes the flow catalogue for one screen and stops — no test bodies, no code. Use when a screen needs browser flows and has no catalogue yet, or its catalogue misses a press, a role or a path.',
  purpose:
    'Enumerate what a person can do on one screen, before a single `run()` body exists. Questions come from writing the flows out, not from reading the component.',
  input: 'One screen.',
  steps: [
    { key: 'read', text: 'Read `{{skills}}/e2e/_shared.md`' },
    {
      key: 'readTheScreen',
      text: 'Read the screen: what it renders, what a person can press, which states it has, what it asks the server for, which of those answers change what is drawn, and what each role is shown of it',
      then: 'Write the matrix before a single entry: every press and every read, against every role ({{ruleNumber:roles}}) and every kind of path ({{ruleNumber:paths}}). Each cell becomes a flow, or a waiver line with the test in another tier that walks it. A ticket’s journeys are cells of this matrix, never the whole of it',
    },
    {
      key: 'catalogue',
      text: 'Write `{{screensRoot}}/{screen}/testingFlows/{screen}FlowsCatalog.ts` from `{{templates}}/e2e-catalog.md` — one entry per flow, the **key is the flow id** and no `id` field inside the entry. Happy paths, refusals, empty states, cancel and back paths, and the variants a role or a switch creates. Every entry names its `paths` and its `expectedResult`: the state the screen changes to once the flow has worked, which is what `e2e-category` asserts',
    },
    {
      key: 'derive',
      text: 'Derive rather than repeat: `flowIdsOf(catalog)` for the union, `flowDataOf(catalog)` for the array. A second list of ids is a second thing to keep true',
    },
    {
      key: 'selectors',
      text: 'Name the selectors each flow needs and check them against `{{registry}}/`. A missing one is a registry entry and a component attribute, in that order — never a role selector added quietly',
    },
    {
      key: 'categories',
      text: 'Group the flows into categories. A category is one pass of `e2e-category`, so it is the unit of work, not a theme. Its name is the gate’s `--grep`, so it matches its own flows and nothing else on the screen — not the suite’s name, not part of another category’s name, not a phrase in the name of a flow outside it',
    },
    {
      key: 'check',
      text: 'Check the catalogue against step {{stepNumber:readTheScreen}} before showing it: every state, press and server answer is reached by a flow or named under what no flow covers; two flows that prove the same thing become one; a flow with two outcomes becomes two. Say what the check changed — new flows, merged, split — or that it changed nothing',
    },
    {
      key: 'status',
      text: 'Write `{{statusRoot}}/{screen}-status.md` from `{{templates}}/e2e-status.md`: every category `pending`, every flow under `## Not yet seen red`, the two waivers and what no flow covers, each line ending with the test that covers it or `nowhere`, so what the reading found outlives the session',
      then: 'Run the three gates: `shared/tests/everyRoleHasAFlow.test.ts`, `shared/tests/everyPathIsWalked.test.ts`, `shared/tests/theStatusFileHolds.test.ts`. A red one is a cell of the matrix nobody answered · answer it, then present',
    },
    { key: 'present', text: 'Present the catalogue and **STOP**' },
  ],
  closing: [
    '**Stop.** Always. The catalogue is what the next stage is measured against, and a catalogue written after the tests is a description of what got built.',
    '**Never here.** No `run()` body. No spec file. No component edit.',
  ],
};

export { FLOW_DISCOVERY };
