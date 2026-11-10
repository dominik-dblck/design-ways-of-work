/**
 * - `skill` · design-refine: what it does, when to use it, its sections
 */
import { refineSteps } from '../process/plans.ts';
import type { SkillFile } from './skillTypes.ts';

// a line of the flow opens with its step's name, read from the one list of steps
const step = (place: number, text: string): string =>
  `**${refineSteps[place - 1]}** · ${text}`;

const skill: SkillFile = {
  title: 'design-refine · one feature, start to finish',
  description:
    "Refines a feature with the PM: the contract, the test cases, the wireframe walk, the journeys, the spec rows and the feature ticket, each point decided one at a time in the shape the PM set, with the feature's notebook. Use when the PM brings an idea or an epic, or a point of a feature has to be decided.",
  intro:
    'A feature is one epic, shipped as one ticket (`T-EXX-00`, kind and track `feature`) that the build side builds in one run (`ticket-pipeline.md · ticket-feature`). A feature may run with `reconStop`, a stop after recon for questions. In parallel: while the build side runs feature N, steps 1–3 for feature N+1.',
  sections: [
    {
      heading: 'The flow',
      lead: null,
      first: 1,
      lines: [
        step(
          1,
          'design side + PM, one question at a time → `sheet/contract/commands.ts` / `sheet/contract/queries.ts` rows with `checks` and `cases`; shared rules in `sheet/contract/api-convention.md`; shown on the Feature page’s API (`app/pages/feature.tsx`) · written into the sheet as soon as it is decided, never held as prose; steps 2–6 correct it where they find a gap — the sheet moves first, then the wireframe, journey or row',
        ),
        step(
          2,
          'generated from the contract’s rows, never written by hand: each case, each refusal a row names, each field check and each shared case every endpoint answers (`sheet/cases/sharedCases.ts`) is one test case, with a generated id `Endpoint.kind.slug` (`sheet/cases/testCases.ts`) — shown on the Feature page’s Test cases (`app/pages/feature.tsx`) · walked with the PM endpoint by endpoint, like the contract: a case that hides two conditions (two inputs, two answers) is split in the sheet, while several facts of one answer stay one test case (TC3); a missing variant is a gap in the contract and the sheet moves first · every test case is one endpoint test in the run; journeys name the ones they cover; the pack carries the table and the report its uncovered, each with why (AT1, TC2) · each carries its reach — shown, guarded, api — and shown and guarded need a journey (JR2)',
        ),
        step(
          3,
          'screen by screen: its states, what differs from the contract, what is missing → the wireframe moves, or the PM decides; missing screens are drawn; a new component, or a change to a built one, is a draft (rule:draft-until-built)',
        ),
        step(
          4,
          'one per user action, written from the people’s actions and checked against step 2, never generated from it (JR1) · data in `sheet/cases/journeys.ts`: who (initials, `sheet/model/directory.ts`), goal, steps as [where, does, sees, covers], and what the test checks after a reload · a step may also name the 02a states it shows, `[where, does, sees, covers, states]`, and `Journeys.check` measures them beside the cases: every state of the epic shown (`GateRules.stateIndex`, its epic read off its facts), a code that is gone, and a state whose print moved since `WALKED` was stamped — walk that journey again, then `Journeys.stamp(epic)` writes the new prints; a state code is never renamed or reused (SC2) · a CM state is the whole line, an AP state the reader’s own approval, the rest of its line context (SA1) · one flow, so a step starts where the one before ended; the moves between are steps of their own, and a step that starts elsewhere names its seeded state (JC1) · `covers` sits on the step: the test cases that step makes happen, by id; a journey covers what its steps cover (JR4) · a refusal a step shows is `{refusal:key|name=value}`, its line read from `sheet/contract/refusals.ts` when shown, never a copied sentence · done when `Journeys.check(epic, groups)` is empty: every shown or guarded test case on a step, no cover naming a missing case, no unknown person or refusal key (JR3, JR4) · one journey = one Playwright flow · rendered on the Feature page’s Journeys, the coverage on top, each step opening its test cases',
        ),
        step(
          5,
          'every shape the journeys touch has its `app/styles/componentsSpec.ts` row',
        ),
        step(
          6,
          'the journeys become the criteria — read from `sheet/cases/journeys.ts` and printed into the pack with their steps and covers (`tools/pack.ts`) — plus the parts, every test case as one endpoint test (the pack’s table, step 2) and the epic’s done test (`roadmaps/backlog.ts · done`); refine-check refuses a ticket whose `Journeys.check` is not empty; pack cut; the PM sends it',
        ),
        step(
          7,
          'recon (no stop: every gap decided and written as “did X because Y”, rule:feature-run-never-stops) → endpoint tests red → **contract snapshot**: the types and endpoints it wrote, verbatim, reviewed here against `sheet/contract/commands.ts` / `sheet/contract/queries.ts` → routes, screens, flows, arch-review, regression → report → review · ✅ / ⛔ / ⚠️, fixes in one block; the epic closes with the receipt',
        ),
      ],
    },
    {
      heading: 'How a point is decided · the checklist',
      lead: 'From `docs/process/plans.ts` · TICKET_CHECKLIST (“decided one point at a time, and the path is the record”), made the rule for every refinement question.',
      first: 0,
      lines: [
        "**Its home first (rule:one-source-of-truth).** Find where the thing the point is about lives on the map; an option that holds it a second time, or leaves the old beside the new, is not an option. Where two places already hold it, that is the point to decide, before any other. After every change SourceCheck.ratchet reads 0 (the Feature page shows it); a decision that retires code names it in its REQUIREMENTS row's replaces.",
        '**One point, isolated.** One question at a time; a question that needs another answered first waits.',
        "**What it does, and where that is written** — the contract row, the ticket, `sheet/contract/blockModel.ts`, the wireframe. If it is hard to picture, draw it first. And what earlier epics decided on it, read before any option: grep the point's words in the EDGES of the tickets it depends on (`roadmaps/EXX/EXXEdges.ts`), in `docs/process/plans.ts` · DECISIONS by their phrases, and in those epics' notebooks — the proposal names what it found, or none found.",
        '**A scenario:** a person and an action (“the author clears a required field”). A scenario that says what a built rule does — live, greyed, refused, sent — names where it runs: a combinations row, a journey step or a named state; without one it is called a hypothesis.',
        '**Two or three options that differ on an axis you can name.** The first idea that worked is option a, written down so the question can test it. Each solves the whole problem and leaves no defect behind — never the case asked with its cause kept; a defect every option shares is fixed in each first.',
        '**The one question, asked of each option first: which is more stable in the long term, and easier to develop and maintain?** An investment in the future wins over what is quicker now. Then each option’s cost, written out: what moves (files, tests, counts, the pack, the build side’s port), who moves it, what the person sees change.',
        '**Then, in order:** it agrees with what is decided (tickets, block-model, earlier picks, what the earlier epics decided, read at step 2) · one source of truth — one rule, one implementation · the model stays whole (indexes, versions, events) · what the person sees, and can act on — a reason beside every greyed control, no text lost · the epic’s scope — nothing unreachable is built, but the UI is drawn now with the epic that turns it on · the repository’s patterns before new ones · a known UX pattern before an invented one — what people already know from the tools they use (`sheet/project.ts` · referenceTools) · ux-eval, unless a PM decision with its edge says otherwise.',
        '**An option that builds another ticket’s or epic’s thing loses**, whatever its merit.',
        '**Pick, and one line on why the others lost.**',
        '**Written twice, both now:** into `roadmaps/EXX/EXXNotes.ts` (the reasoning) and into the sheet (the contract row, the refusal, the event); at the feature ticket, into the criterion and as one EDGES row — edge, options, pick, why, into.',
        '**Re-read against the pick:** every earlier decision, criterion or drawing that names the same file or shape — one that still carries the losing option has not been decided.',
      ],
    },
    {
      heading: 'The proposal',
      lead: null,
      first: null,
      lines: [
        'A point to decide follows rule:decide-one-point-at-a-time, and every proposal carries, in this order: 🧭 what earlier epics decided on it — their EDGES, `docs/process/plans.ts` · DECISIONS, their notebooks — or none found · 🧩 what it is today · 💥 a concrete scenario — one that says what a built rule does names its combinations row, journey step or state, or reads as a hypothesis · two or three options, each valid, on one named axis — each with 🔮 the long term, 🔧 how it is developed and maintained, 💰 its cost written out — what moves (files, tests, counts, the pack, the build side’s port), who moves it, what the person sees change — and line 5 (an option that builds another ticket’s thing loses) · 📋 the checklist of what moves · 🏁 the pick and one line on why the others lost · then the re-read of line 20: every file and neighbouring criterion that names the same thing',
        'Each option carries its breakdown by rule, after its cost: one row per rule the point touches, each marked holds or breaks with a few words on how · always rule:one-source-of-truth (SSoT: one home per fact) and rule:one-responsibility (SRP: one question per function, one kind of fact per file), then every other rule of a group (`docs/process/plans/`) or a slot (`sheet/rules/`) whose words the option touches, by key (rule:layers-read-downward, rule:server-facts-screen-view…), then lines 5–7 (stable in the long term, agrees with what is decided, the model whole, what the person sees, the scope, the repository’s patterns, a known UX pattern, ux-eval, another epic’s thing) · in chat one table, a row per rule and a column per option · a rule an option breaks makes it not valid: it is fixed in the option before it is offered, or the option is dropped',
      ],
    },
    {
      heading: 'A feature notebook · EXXNotes.ts',
      lead: 'Ours only: never on a read list, never named in a pack. The reasoning lives in `roadmaps/EXX/EXXNotes.ts` as data (`roadmaps/notes.ts`, shown on the Feature page); the answer lives in the sheet. A closed epic’s notebook is frozen: markdown before the move, its data after.',
      first: 1,
      lines: [
        '**The contract is never held as prose.** A decision about an endpoint, a refusal or an event is written into `sheet/contract/commands.ts` / `sheet/contract/queries.ts` / `sheet/contract/refusals.ts` / `sheet/contract/events.ts` the same day; the notebook says why. `rule:contract-on-sheet-when-decided`',
        '**The contract moves through the whole feature.** The walk, the journeys and the spec rows correct it where they find a gap — the sheet first, then the wireframe, journey or row, then one line in the notebook.',
        '**Sections, in this order, each a `kind`:** Carried in (`carriedIn`) · Found on the first read (`found`) · Contract queue (`contractQueue`) · Decisions (`decisions`) · Check against the sheet (`check`) · Test cases (`testCases`) · Wireframe walk (`wireframeWalk`) · Journeys (`journeys`) · Spec rows (`specRows`); an ask, a principle, the points, the steps, the next and the scope have their kinds too (`roadmaps/notes/notesTypes.ts`).',
        '**Every decision:** id, pick, who and when (“**B3 · B**”, then the PM and the day), what it changes in the sheet.',
        '**Before the feature ticket:** a second pass over every decision against the later picks (step 10), and the status row below moved.',
        '**A question to the PM** is the proposal above, whole and in its order (The proposal), drawn first where it is hard to picture.',
        "A line carried to another epic goes into that epic's notebook, under Carried in — never in this skill.",
      ],
    },
  ],
};

export { skill };
