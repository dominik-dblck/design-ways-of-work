---
name: e2e-discovery
description: Stage 1 of 2. Writes the flow catalogue for one screen and stops — no test bodies, no code. Use when a screen needs browser flows and has no catalogue yet, or its catalogue misses a press, a role or a path.
---

**Purpose.** Enumerate what a person can do on one screen, before a single `run()` body exists.
Questions come from writing the flows out, not from reading the component — the same reason the
ticket pipeline reads before it transcribes.

**Input.** One screen. The screen roster is the design project's; the code is here.

**Tasks.**

1. Read `.claude/skills/e2e/_shared.md`
2. Read the screen: what it renders, what a person can press, which states it has, what it asks the
   server for, which of those answers change what is drawn, and what each role and a visitor with
   no session is shown of it
   2a. Write the matrix before a single entry: every press and every read, against every role
   (`_shared.md` rule 11) and every kind of path (rule 12). Each cell becomes a flow, or a waiver
   line with the test in another tier that walks it. A ticket's journeys are cells
   of this matrix, never the whole of it
3. Write `e2e/{screen}/testingFlows/{screen}FlowsCatalog.ts` from
   `roadmaps/templates/e2e-catalog.md` — one entry per flow, the **key is the flow id** and no
   `id` field inside the entry. Happy paths, refusals, empty states, cancel and back paths, and the
   variants a role or a switch creates. Every entry names its `paths` and its `expectedResult`: the
   state the screen changes to once the flow has worked, which is what `e2e-category` asserts
4. Derive rather than repeat: `flowIdsOf(catalog)` for the union, `flowDataOf(catalog)` for the
   array. A second list of ids is a second thing to keep true
5. Name the selectors each flow needs and check them against `e2e/testingIds/`. A missing one is a
   registry entry and a component attribute, in that order — not a role selector added quietly
6. Group the flows into categories. A category is one pass of `e2e-category`, so it is the unit of
   work, not a theme. Its name is the gate's `--grep`, so it matches its own flows and nothing else
   on the screen — not the suite's name, not part of another category's name, not a phrase in the
   name of a flow outside it
7. Check the catalogue against step 2 before showing it: every state, press and server answer is
   reached by a flow or named under what no flow covers; two flows that prove the same thing become
   one; a flow with two outcomes becomes two. Say what the check changed
   — new flows, merged, split — or that it changed nothing
8. Write `roadmaps/e2e/{screen}-status.md` from `roadmaps/templates/e2e-status.md`: every category
   `pending`, every flow under `## Not yet seen red`, the two waivers and what no flow covers, each
   line ending with the test that covers it or `nowhere`, so what the reading found outlives the
   session
   8a. Run the three gates, not while `yarn e2e` runs (rule 16):
   `yarn vitest run tests/architecture/everyRoleHasAFlow.test.ts tests/architecture/everyPathIsWalked.test.ts tests/architecture/theStatusFileHolds.test.ts`.
   A red one is a cell of the matrix nobody answered · answer it, then present
9. Present the catalogue and **STOP**

**Stop.** Always. The catalogue is what the next stage is measured against, and a catalogue written
after the tests is a description of what got built.

**Never here.** No `run()` body. No spec file. No component edit.
