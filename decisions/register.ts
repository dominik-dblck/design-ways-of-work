/**
 * - `DECISIONS` · the PM's decisions on how this repository works, by number
 * - a product's own decisions stand in that product; a rule stands in `CLAUDE.md`
 */
import type { Decision } from '../scripts/decisionTypes.ts';

const DECISIONS: readonly Decision[] = [
  {
    id: 'W1',
    title: 'the way of working keeps its own rules',
    held: '8 Nov',
    says: 'its own code takes no switch, suppression or exemption from the rules it defines.',
    from: 'plan/log/overnight-8-nov.md',
  },
  {
    id: 'W2',
    title: 'no wireframe page',
    held: '8 Nov',
    says: 'the `.dc.html` wireframes leave the way of working: no tool, guard or check part reads one.',
    from: 'plan/log/extraction-progress.md',
  },
  {
    id: 'W3',
    title: 'the code rules in three lists',
    held: '8 Nov',
    says: 'the rules both sides keep stand once in `shared/rules/`, each with each side’s gate; the design side’s and the build side’s own stand in their homes.',
    from: 'plan/log/extraction-progress.md',
  },
  {
    id: 'W4',
    title: 'a check is a tool first',
    held: '8 Nov · A',
    says: 'linters first, then tsc, a unit test last, for what crosses files in a way no tool reads.',
    from: 'plan/log/extraction-progress.md',
  },
  {
    id: 'W5',
    title: 'an emptied baseline goes',
    held: '8 Nov',
    says: 'a baseline left empty is removed, never kept as an empty list; the commit that carries the removal says so.',
    from: 'plan/log/overnight-8-nov.md',
  },
  {
    id: 'W6',
    title: 'one owner, once both ports land',
    held: '8 Nov · A',
    says: 'a session `wow` is this repository’s one writer; the design and build sides send it requests, take it at a tag and cross-check each change on their own tree.',
    from: 'plan/log/extraction-progress.md',
  },
  {
    id: 'W7',
    title: 'one design system',
    held: '8 Nov',
    says: 'one system both products read, no product’s own in it, all TypeScript: what a browser needs is written by a build. A change a repository asks for goes, once approved, to its root here.',
    from: 'plan/log/extraction-progress.md',
  },
  {
    id: 'W8',
    title: 'the browser tier comes whole',
    held: '8 Nov',
    says: 'the e2e framework and its gates stand here; the journeys stay each product’s.',
    from: 'plan/log/extraction-progress.md',
  },
  {
    id: 'W9',
    title: 'fast development that keeps the harness',
    held: '9 Nov, said to eagle-dev',
    says: 'checks in three tiers, one map in the shared scope, the same on both sides: the edit, the commit, the feature’s end.',
    from: 'plan/log/overnight-8-nov.md',
  },
  {
    id: 'W10',
    title: 'taken at a tag',
    held: '9 Nov · B',
    says: 'a product takes the way of working as a git dependency pinned to a tag; a script writes the homes it names onto its paths and its git ignores them: nothing of it enters a product’s history.',
    from: 'plan/log/run-9-nov.md',
  },
  {
    id: 'W11',
    title: 'data is TypeScript',
    held: '10 Nov · B',
    says: 'no JSON of data, but a file a tool reads as JSON alone; every HTML and CSS goes to `legacy/`, neither built, published nor checked.',
    from: 'plan/log/run-9-nov.md',
  },
  {
    id: 'W12',
    title: 'the owner now',
    held: '11 Nov · A, replaces W6',
    says: 'the session started in this repository owns it before the ports land: its one writer, the products’ repositories read only from it.',
    from: 'plan/review-11-nov.md',
  },
  {
    id: 'W13',
    title: 'Argus starts from a clean way of working',
    held: '11 Nov',
    says: 'the way of working is configured, stable and clean of Eagle first; Eagle’s design and build sides catch up after; what must move to eagle-design is settled with it.',
    from: 'plan/argus-first.md',
  },
  {
    id: 'W14',
    title: 'the design side first',
    held: '11 Nov',
    says: 'the plan is accepted for the design side alone; the build side is parked until the PM asks for it.',
    from: 'plan/argus-first.md',
  },
  {
    id: 'W15',
    title: 'one source for both design repositories',
    held: '11 Nov',
    says: 'the design side is done when eagle-design and argus-design take the same tag.',
    from: 'plan/argus-first.md',
  },
  {
    id: 'W16',
    title: 'a run shows its progress and is verified',
    held: '11 Nov, replaces W21',
    says: 'work goes task by task, its progress printed by the run hook; eagle-design verifies each task by its commit, and its findings are mended before the task counts.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W17',
    title: 'the migration is rehearsed on main',
    held: '11 Nov',
    says: 'eagle-design’s migration is rehearsed on a fresh clone of its `main`, never on the frozen branch.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W18',
    title: 'the run to the end of the design side',
    held: '11 Nov',
    says: 'the last tasks of the foundation, the release of v0.2.0 with them, and the whole of the design side’s cleaning run without a stop between tasks; a breaking release still waits for the PM’s word.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W19',
    title: 'it names no product',
    held: 'before 8 Nov, eagle-design’s D28',
    says: 'the way of working is product-agnostic: no product’s fact lives in it; a product’s facts stand in that product.',
    from: 'plan/log/extraction-plan-8-nov.md',
  },
  {
    id: 'W20',
    title: 'the rules re-read after each part',
    held: '8 Nov',
    says: 'one home per fact, one responsibility per file, the long term over the work of today, nothing by hand, and correct over fast: a check runs whole and fresh, with a red proof for every new check.',
    from: 'plan/log/overnight-8-nov.md',
  },
  {
    id: 'W21',
    title: 'pushed on green, probed after',
    held: '9 Nov · B',
    says: 'the side that writes here pushes when its own checks are green; the build side probes the pushed commits in batches, its findings landing as commits after.',
    from: 'plan/log/run-9-nov.md',
  },
];

export { DECISIONS };
