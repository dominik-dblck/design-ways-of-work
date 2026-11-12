/**
 * - `NEXT` · the release in hand: what it is, what it asks, each output it moves
 * - `RELEASES` · each release put out, the newest first, as the release wrote it
 */
import type { Release, Unreleased } from '../scripts/changelogTypes.ts';

// the built modules whose rows, or the decision note of the schema they bundle, point at the product's plan
const POINTING = [
  'agentFlow',
  'backlog',
  'blockRules',
  'commands',
  'contentList',
  'dbSchema',
  'edges',
  'events',
  'expectedFiles',
  'flowCheck',
  'journeys',
  'measure',
  'payloads',
  'projections',
  'queries',
  'receipts',
  'refusals',
  'roleCombinations',
  'sampleRun',
  'specCheck',
  'testCases',
  'translationFlow',
];

// the modes' parts that ask the product for a text by key
const MODE_PARTS = [
  'aboutToHoldsNote',
  'holdsToLegend',
  'modeExample',
  'runsFeature',
  'runsFeatureFirstRows',
  'runsFeatureLastRows',
];

const NEXT: Unreleased = {
  kind: 'major',
  what: 'a product plugs its own code in through its `product.ts`, and its pure code through its `productView.ts`: the checks’ parts a and w, the pack’s refine check and the Feature page take what is the product’s from their entry point, and no home reads those files; the Feature page takes an epic’s fields from it too, and the source guard names the seven layers itself and reads the requirements from their registry, `sheet/requirements.ts`, where the migration moves their rows; a migration’s moves carry the imports with them, and it may edit a text of a file found exactly once; the block model is a registry, and the build prints as JSON what the product’s `sheet/project.ts` · `buildReads.json` names, each file held by the name its row gives; what knip starts from beside the entries is the home’s `tools/readStarts.ts`, which a product’s scope calls; the spec’s files, the first read, the fact combinations, the drift guards and the decided points are the product’s, a registry, `docs/process/projectPlan.ts`, where the migration moves their rows, and the skills name it; a pointer of the product’s at one of those lists names the plan, and a migration edit may ask for every place its text stands; the eras of a product’s release records are its own, `sheet/project.ts` · `recordEras`, and the home’s tests read every feature by what its registries hold, naming none; a product’s own documents, its API convention and its agent’s instructions, are its modules, printed at their paths from `sheet/project.ts` · `buildReads.documents`; a home’s document asks a product for its own texts by key, `docs/process/documentSlots.ts` · `cites` (a lesson’s reason, a decision’s date, an example), a key it does not hold printing nothing or the home’s example; the board opens with each epic’s tickets by column, the MVP’s whole on top, and the API contract page, `Contract.html`, shows every endpoint as TypeScript (the `ContractPage` organism, `contractView` · `contractPage`), `CodePieces` an atom and `CodeBlock`, which draws it, a molecule; a port leaves a change of its trunk’s that a home holds to the home, by its `CARRIED` row',
  action:
    'the migration `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag; the pin to the tag in the same commit',
  rules: { added: [], changed: [], removed: [] },
  outputs: {
    'eagle-design': {
      ...Object.fromEntries(
        POINTING.map((name) => [
          `dist · project/${name}.js`,
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        ]),
      ),
      'output · yarn cut-pack T-E19-00':
        'the migration’s two new files of the product’s own, under guards/, wait to be committed with the pack',
      'output · yarn build':
        'the requirements are a module of their own: one script more',
      'output · yarn spec-check':
        'the requirements are a module of their own: one script more',
      'output · yarn checks':
        'one script more, the requirements’; the content types’ snapshot holds the map of the files, where the source guard now reads the requirements’ registry, a file no type is made of: one link fewer, its files key moved, retaken on the product’s side at its take',
      'exit · yarn checks · 0 → 1':
        'the content types’ snapshot holds the map of the files, where the source guard now reads the requirements’ registry, a file no type is made of: one link fewer, its files key moved, retaken on the product’s side at its take',
      'output · yarn checks:gate':
        'the content types’ snapshot holds the map of the files, where the source guard now reads the requirements’ registry, a file no type is made of: one link fewer, its files key moved, retaken on the product’s side at its take',
      'exit · yarn checks:gate · 0 → 1':
        'the content types’ snapshot holds the map of the files, where the source guard now reads the requirements’ registry, a file no type is made of: one link fewer, its files key moved, retaken on the product’s side at its take',
      'dist · project/approvalLogic.js':
        'the approval logic no longer holds the requirements’ rows',
      'dist · project/requirements.js':
        'the requirements’ rows, a module of their own',
      'dist · project/module-entries.json':
        'the requirements are an entry: their rows, their cut and their types; the product’s plan an entry, its two parts and its types',
      'dist · project/sourceView.js':
        'the Source page’s guard reads the requirements’ registry',
      'written · records/release-5-3-1.md':
        'the requirements are a module of the homes the build side reads: one module and three files more, the approval logic two files fewer; the block model’s JSON a file read whole, its digest recorded; the product’s plan a module more, the plans two files fewer, the standing words read where they stand now, under sheet/, and the tickets’ digest moved by their context and their pointers',
      'dist · project/project.js':
        'the project names the JSON its build side reads, each from a module’s export, and the eras of its release records',
      'written · fixtures/data/block-model.json':
        'the block model as JSON, back where the build side reads it by blob; its prose names files by the port’s names',
      'written · fixtures/data/components.spec.json':
        'the components’ spec as JSON, back where the build side reads it by blob; its prose names files by the port’s names',
      'written · fixtures/data/modes.json':
        'the ticket modes as JSON, back where the build side reads it by blob; its prose names files by the port’s names',
      'output · yarn test':
        'the product’s own test of its fields and the home’s test that each slot row is asked: two files and three tests more; the Feature page’s combinations read in two cases, one more',
      'dist · project/sourceCheck.js':
        'the source guard holds the seven layers’ names, which the map draws',
      'written · guards/__snapshots__/guardMap.ts':
        'the source guard’s built file holds the seven layers’ names: the lines of its findings there move by nine',
      'dist · project/feature-page.js':
        'the page’s entry hands the product’s view to the Feature page',
      'dist · project/featureView.js':
        'the feature view reads no scenes and no role combinations: the page hands them in; it reads the combinations from the product’s plan',
      'dist · project/refineCheck.js':
        'the refine check reads no scenes: the pack hands the states an epic names in',
      'dist · project/module-imports.json':
        'the feature view imports neither scenes.ts nor roleCombinations.ts, the refine check no scenes.ts; the source guard imports the requirements’ registry, not approvalLogic.ts; the feature view and the tickets import the product’s plan; the assembly logic imports the standing words from beside it',
      'dist · project/plans.js':
        'the plans hold the rules, the checklist and the refine steps; the spec’s files, the first read, the combinations, the drift guards and the decided points left for the product’s plan',
      'dist · project/projectPlan.js':
        'the product’s plan, a module of its own: the spec’s files, the first read, the combinations, the drift guards and the decided points',
      'dist · project/tickets.js':
        'the ticket context reads its first read from the product’s plan, bundled beside the plans’ rules; the tickets’ pointers name projectPlan.js, where the lists they point at moved',
      'dist · project/boardView.js':
        'the board bundles the ticket context, which reads its first read from the product’s plan; the tickets’ pointers name projectPlan.js; the view counts every epic’s tickets by column, the list on top',
      'dist · project/board-page.js':
        'the board bundles the ticket context, which reads its first read from the product’s plan; the tickets’ pointers name projectPlan.js; the board opens with each epic’s tickets by column, the MVP’s whole on top',
      'dist · project/contractView.js':
        'a pointer it holds names the product’s plan, projectPlan.js; the view builds the contract page, bundling the backlog, the tickets, the block model and the refusals it reads',
      'dist · project/contract-page.js':
        'the API contract page’s script: every endpoint as TypeScript, the numbers, the legend, the filters and what every endpoint shares',
      'dist · project/Contract.html':
        'the API contract page, a page of its own',
      'dist · project/documentSlots.js':
        'the product’s own texts a home’s document asks for by key, a module of its own',
      'dist · project/modes.js':
        'the modes ask the product for their story, their dates and their example ticket by key, its texts bundled with them',
      'written · .claude/skills/design-answer-cc/SKILL.md':
        'a lesson lands in two places: the way of working’s rule in the pipeline’s data, the product’s cite in docs/process/documentSlots.ts',
      'written · vendor/wow/docs/documents/cited.ts':
        'the helper a home’s document asks a product’s text through, cite and citeLines: vendored with the documents',
      ...Object.fromEntries(
        MODE_PARTS.map((name) => [
          `written · vendor/wow/docs/process/modes/${name}.ts`,
          'the part asks the product for its story, its date or its example by key: the modes print as before',
        ]),
      ),
      'dist · project/contentTypeLogic.js':
        'the standing words bundled from where they stand now, beside the assembly logic',
      'dist · project/sheetStatus.js':
        'the standing words built from where they stand now, beside the assembly logic, under the same name',
      'dist · project/agent-instructions.md':
        'the agent’s first read opens on the product’s plan, projectPlan.ts',
      'written · docs/process/agent-instructions.md':
        'the agent’s first read opens on the product’s plan, projectPlan.ts',
      'dist · project/new-project.md':
        'a new project empties the rows of the product’s plan, docs/process/projectPlan/',
      'written · docs/process/new-project.md':
        'a new project empties the rows of the product’s plan, docs/process/projectPlan/',
      'dist · project/packs/T-E19-00.md':
        'the digests move: the tickets’ parts by their context and their pointers, the plans’ module two parts fewer',
      'written · fixtures/packs/T-E19-00.md':
        'the digests move: the tickets’ parts by their context and their pointers, the plans’ module two parts fewer',
      'written · .claude/skills/design-refine/SKILL.md':
        'the refine skill asks for the product’s decided points in its plan, docs/process/projectPlan.ts',
      'written · .claude/skills/design-start/SKILL.md':
        'the start skill names the product’s decided points in its plan, docs/process/projectPlan.ts',
      'written · vendor/wow/app/workspace/sheetStatus.ts':
        'the standing words are the product’s own, under sheet/: the take no longer vendors them',
      'written · vendor/wow/docs/process/plans.ts':
        'the vendored plans hold the rules, the checklist and the refine steps alone',
      'written · vendor/wow/docs/process/plans/driftGuards.ts':
        'the drift guards and the decided points are the product’s plan’s: no longer vendored',
      'written · vendor/wow/docs/process/plans/specFiles.ts':
        'the spec’s files, the first read and the combinations are the product’s plan’s: no longer vendored',
      'written · .claude/skills/design-sheet/SKILL.md':
        'the sheet skill says where each printed file comes from: the JSON from buildReads.json, the product’s documents from buildReads.documents',
      'written · vendor/wow/docs/process/plans/plansTypes.ts':
        'the plans’ types lose the five the product’s plan holds now',
    },
  },
};

const RELEASES: readonly Release[] = [
  {
    version: '0.3.0',
    date: '2026-11-11',
    kind: 'major',
    what: 'the design home reads a product through a contract: its registries at their paths, its own parts through its `product.ts`',
    action:
      'the migration `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag; the pin to the tag in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the api convention’s module holds the sixth check and the 502 row its `main` wrote: the build finds the page written already',
        'output · yarn checks':
          'the journeys’ part reads its epics off the backlog: the cases met of E10 and E14, the journeys of E14 and E19',
        'output · yarn cut-pack T-E19-00':
          'the pack carries the api convention as its `main` holds it; the pins’ registry is one file more to commit',
        'output · yarn test':
          'the closed notebooks’ test reads the pins off the product’s registry, the newest epic’s among them',
        'exit · yarn test · 1 → 0':
          'the pins’ test fails on the tag, which holds five pins of its own; the product’s registry holds the sixth',
        'dist · project/api-convention.md':
          'the sixth check and the 502 row, word for word as its `main` holds them',
        'dist · project/module-entries.json':
          'the pins’ registry is a file of the module roadmaps/notes.ts',
        'dist · project/packs/T-E19-00.md':
          'the pack carries the api convention, the 502 row and the sixth check in it',
        'written · fixtures/packs/T-E19-00.md':
          'the pack carries the api convention, the 502 row and the sixth check in it',
        'written · records/release-5-3-1.md':
          'the module roadmaps/notes.ts counts the pins’ registry: one file more, its digest moved',
        'written · sheet/contract/api-convention.md':
          'the sixth check and the 502 row, word for word as its `main` holds them',
      },
    },
    moved: {},
    tried: { 'eagle-design': '590a2b0' },
  },
  {
    version: '0.2.0',
    date: '2026-11-11',
    kind: 'minor',
    what: 'an install unpacks the four homes and the manifest alone and runs no second install; the homes are byte for byte those of v0.1.10',
    action: 'none: move the pin to the tag',
    rules: { added: [], changed: [], removed: [] },
    outputs: {},
    moved: {},
    tried: { 'eagle-design': '590a2b0' },
  },
];

export { NEXT, RELEASES };
