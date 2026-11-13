/**
 * - `DECISIONS` · the PM's decisions on how the way of working works, by number
 * - its own, those a design product took first (`taken/`), then its own again
 * - a product's own decisions stand in that product; a rule stands in `CLAUDE.md`
 */
import { PLAN } from './taken/plan.ts';
import { REPOSITORY } from './taken/repository.ts';
import { RESTRUCTURE } from './taken/restructure.ts';
import { ROUND } from './taken/round.ts';
import { SYNC } from './taken/sync.ts';
import { TYPESCRIPT } from './taken/typescript.ts';
import type { Decision } from '../scripts/decisionTypes.ts';

const OWN: readonly Decision[] = [
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
  {
    id: 'W22',
    title: 'the gate tries the product as it stands today',
    held: '11 Nov · A',
    says: 'eagle-design is tried on its newest `main`, not on a branch frozen behind it: the rehearsal of its migration comes before the rest of the design side’s cleaning, not at its end.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W23',
    title: 'a release before the design side is clean',
    held: '11 Nov · A',
    says: 'v0.3.0 goes out so eagle-design’s branch can take its `main` now, in one commit of its own: the merge, its pin, its migration. v1.0.0 stays the end of the design side, on the PM’s word.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W24',
    title: 'one stack, defined here',
    held: '12 Nov · A',
    says: 'every product is built on the stack the way of working defines (Next, React, MUI, TanStack Query, Zod, Vitest, Playwright, Postgres, the company’s design system), and its project names it by key; its stack’s parts and atoms come in stage 2, before the sample product.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W25',
    title: 'the build side’s atoms, synced once they pass here',
    held: '12 Nov · A',
    says: 'the build side mends its atoms to this repository’s rules on its own tree, then a script copies them here unchanged, never a hand copy, until its port turns the direction.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W26',
    title: 'one theme, the internal apps’',
    held: '12 Nov · the PM’s word',
    says: 'every product is an internal app, so there is one theme and every app looks the same: the theme the build side runs, held here with its atoms, the design pages drawn with it; the build side takes it from here once its port turns the direction.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W27',
    title: 'a scope spreads a preset',
    held: '12 Nov · A',
    says: 'the way of working gives a design product’s scope as a preset; a product’s `scope.ts` spreads it and names only what differs, written by script, never by hand: `yarn spawn` writes a new project’s, and a script cuts an existing product’s to what differs from the preset; a default moves in one place.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W28',
    title: 'the hooks come from here',
    held: '12 Nov · A',
    says: 'every hook of the way of working, a project’s and a user’s, has its source here, tested, and is installed by script: a spawned product, a product taking a tag and a new machine get the same; a person’s own data, as a Slack id, stays in a local file never committed.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W29',
    title: 'the mode’s hook from here, changed by release',
    held: '12 Nov · B, replaces the rule that kept it outside every repository',
    says: 'the work-mode hook’s source stands here, tested; a change to it goes out only in a release, on the PM’s word; no session edits the installed hook or its flag.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W30',
    title: 'the releases up to 1.0.0 are this session’s',
    held: '12 Nov · the PM’s word',
    says: 'each release up to and with 1.0.0 goes out on this session’s call, never before its checks are green: the feature tier, the fresh clone and the gate, by pre-push; a release that changes the work-mode hook still waits for the PM’s word (W29).',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W31',
    title: 'the mode’s hook brought in as it runs is a W30 release',
    held: '12 Nov · A',
    says: 'the release that brings the work-mode hook’s source here byte-equal to the installed one, tested and installed by script, goes out under W30; a change to what the hook does (its modes, what it holds for the PM) still waits for the PM’s word (W29).',
    from: 'plan/run-11-nov.md',
  },
];

// the PM's word given after the taken rows, numbered on from them
const SINCE: readonly Decision[] = [
  {
    id: 'W104',
    title: 'the run’s holds given, all but the spawn of argus-design',
    held: '13 Nov · the PM’s word, here',
    says: 'v1.0.0 goes out once the build side’s theme and atoms are in and the gates are green; the rules of `CLAUDE.md` that reached this session relayed stand, with three more (no `BASELINES=write`, no pushed commit rewritten, no secret pasted or printed); this session talks to the build side’s session directly; `.rehearsal/` leaves the disk; a product’s board, pages and props get a check part; eagle-design takes v1 onto its `main`. The spawn of argus-design waits on the PM’s own word.',
    from: 'eagle-design D103',
  },
  {
    id: 'W105',
    title:
      'a move is reviewed for architecture, and the build side’s guard comes here',
    held: '13 Nov · the PM’s word, here',
    says: 'a move of files across repositories gets an architecture review before its sha leaves; the scans and the review the build side runs come to the homes, those not held here yet, before v1.0.0.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W106',
    title: 'one heavy run on the machine at a time',
    held: '13 Nov · the PM’s word, here',
    says: 'the sessions on one machine take turns at heavy runs (a full suite, a sample, a gate, a release, an end-to-end run): one that runs is let finish before another starts, through one lock all of them take (`machineLock.py`).',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W107',
    title:
      'the shared atoms stay whole, the build side’s glyph sets and states with them',
    held: '13 Nov · the PM’s word, here',
    says: 'the atoms and theme copied from the build side stay as copied, the editor’s and the phone preview’s glyph sets, the approval states and the version sides included; a product that needs more extends them, the way of working staying the same.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W108',
    title: 'v1.0.0 now, the build side’s plain molecules after it as v1.1',
    held: '13 Nov · the PM’s word, here',
    says: 'v1.0.0 goes out without molecules; the build side’s plain molecules (about 22, with the utils they read) move in one batch, its words made props with defaults, one review, one record, one sha, the whole e2e at its end, and go out as v1.1.0; the molecules reading the product’s domain and its previews stay the product’s.',
    from: 'plan/run-11-nov.md',
  },
  {
    id: 'W109',
    title: 'icons come from lucide-react alone',
    held: '13 Nov · the PM’s word, here',
    says: 'one icon package, `lucide-react`, the one the React code draws with; no icon is an SVG file: the build writes none, and a row a legacy HTML page reads keeps its path as a string until that page retires; `lucide-static` leaves every repository, by migration.',
    from: 'plan/run-11-nov.md',
  },
];

// a product's rows keep their words of the day and their order, each naming the row it was
const DECISIONS: readonly Decision[] = [
  ...OWN,
  ...REPOSITORY,
  ...TYPESCRIPT,
  ...RESTRUCTURE,
  ...ROUND,
  ...SYNC,
  ...PLAN,
  ...SINCE,
];

export { DECISIONS };
