/**
 * - `NEXT` · the release in hand: what it is, what it asks, each output it moves
 * - `RELEASES` · each release put out, the newest first, as the release wrote it
 */
import type { Release, Unreleased } from '../scripts/changelogTypes.ts';

const NEXT: Unreleased = {
  kind: 'minor',
  what: 'the homes are green on a product that names none, the sample: the board skips an epic whose stories wait (`storiesWait` on its row), never one named by id; the criteria skill asks the product for its own lines (`criteria.*` slots); a home test asserts the relation, never a product’s count; the pairs of blocks a product holds open stand in its `tests/architecture/openPairs.ts`; the new-project guide names only paths every product holds; knip in a product reads the files its take wrote as entries, judging its own code alone; `tools/writeGenerated.ts` writes every file the scope’s generators own',
  action:
    'the pin to the tag: its migration marks the push epic’s stories as waiting, writes its criteria lines and its open pairs into files of its own, and gathers the lines in its slots; the counts the homes no longer hold stand in its own tests if it wants them',
  rules: { added: [], changed: [], removed: [] },
  outputs: {
    'eagle-design': {
      'output · yarn build':
        'the build writes the new-project guide anew from its home',
      'output · yarn cut-pack T-E19-00':
        'the files the migration and the build changed wait uncommitted in the trial: the push epic’s row, the slots, their criteria file, the new-project guide; 7, not 3',
      ...Object.fromEntries(
        [
          'agentFlow',
          'approvalLogic',
          'backlog',
          'blockRules',
          'boardView',
          'commands',
          'contentList',
          'contentTypeLogic',
          'contractView',
          'events',
          'expectedFiles',
          'featureView',
          'flowCheck',
          'journeys',
          'measure',
          'payloads',
          'projections',
          'queries',
          'refusals',
          'roleCombinations',
          'sampleRun',
          'specCheck',
          'testCases',
          'translationFlow',
        ].map((name) => [
          `dist · project/${name}.js`,
          'the bundle carries the backlog as the product holds it: the push epic’s row reads `storiesWait: true`',
        ]),
      ),
      ...Object.fromEntries(
        ['board-page', 'contract-page', 'feature-page'].map((name) => [
          `dist · project/${name}.js`,
          'the page’s bundle carries the push epic’s row with `storiesWait: true`; the minifier’s names shift with it',
        ]),
      ),
      ...Object.fromEntries(
        ['refineCheck', 'tickets'].map((name) => [
          `dist · project/${name}.js`,
          'the bundle carries the push epic’s row with `storiesWait: true`, and the stories without a ticket skip an epic by that flag, never by its id',
        ]),
      ),
      ...Object.fromEntries(
        ['documentSlots', 'modes'].map((name) => [
          `dist · project/${name}.js`,
          'the bundle carries the criteria lines from the product’s own file (`CRITERIA_CITES`), spread in its slots',
        ]),
      ),
      'dist · project/module-entries.json':
        'the criteria file is a part of the module docs/process/documentSlots.ts',
      'dist · project/new-project.md':
        'the new-project guide names only paths every product holds: `sheet/rules.ts`, `app/styles/componentsSpec.ts`, its logic and samples whole',
      'dist · project/packs/T-E19-00.md':
        'the pack’s digests cover the push epic’s row and the slots with their criteria file: one file more, 588',
      'written · docs/process/new-project.md':
        'the new-project guide names only paths every product holds: `sheet/rules.ts`, `app/styles/componentsSpec.ts`, its logic and samples whole',
      'written · fixtures/packs/T-E19-00.md':
        'the pack’s digests cover the push epic’s row and the slots with their criteria file: one file more, 588',
      'written · records/release-5-3-1.md':
        'the record counts the criteria file in the slots’ module, 12 files, not 11, and the backlog’s and the tickets’ digests moved',
      'written · vendor/wow/roadmaps/backlog/backlogTypes.ts':
        'the home in hand: an epic’s row may say its stories wait (`storiesWait`)',
      'written · vendor/wow/roadmaps/tickets/ticketViews.ts':
        'the home in hand: the stories without a ticket skip an epic whose stories wait',
    },
  },
};

const RELEASES: readonly Release[] = [
  {
    version: '0.15.0',
    date: '2026-11-12',
    kind: 'minor',
    what: 'a design product’s scope is a preset the way of working gives (W27): `tools/scopePreset.ts`, which a product’s `scope.ts` spreads, naming its backup, its browser and what differs; eagle-design’s scope is cut to it, the same scope resolved; the run’s example in `tools/runKeepsTheTurn.ts` is two lines joined, so no word is read across them',
    action:
      'the pin to the tag: its migration cuts `scope.ts` to the preset, keeping its own words, people, catalog, assets and the PM’s words; a new design product’s `scope.ts` spreads `SCOPE_PRESET`',
    rules: { added: [], changed: [], removed: [] },
    outputs: {},
    moved: {},
    tried: { 'eagle-design': '3e48e51' },
  },
  {
    version: '0.14.0',
    date: '2026-11-12',
    kind: 'minor',
    what: 'the user hooks of the way of working stand in `shared/user-hooks/`, byte for byte as the machine runs them, and tested: the work mode (read at every turn, its flag refused to an agent) and the run’s bars; `installUserHooks.ts` writes one a machine lacks, keeps one byte-equal, and never overwrites one that differs',
    action:
      'the pin to the tag; on a new machine, `node shared/user-hooks/installUserHooks.ts` (this repository: `yarn hooks:user`); a hook that differs on the machine is left as it is and reported',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the build counts every file a home holds beside its TypeScript, the two user hooks’ among them: 386, not 384; neither is published',
        'output · yarn checks':
          'the build counts every file a home holds beside its TypeScript, the two user hooks’ among them: 386, not 384; neither is published',
        'output · yarn spec-check':
          'the build counts every file a home holds beside its TypeScript, the two user hooks’ among them: 386, not 384; neither is published',
        'output · yarn cut-pack T-E19-00':
          'the build counts every file a home holds beside its TypeScript, the two user hooks’ among them: 386, not 384; neither is published',
      },
    },
    moved: {},
    tried: { 'eagle-design': 'f4112e6' },
  },
  {
    version: '0.13.0',
    date: '2026-11-12',
    kind: 'minor',
    what: 'the decisions a design product took on how the way of working works stand in this register now, W32 to W103, each in its words of the day and naming the product’s row it was; the homes cite them by their W id; a product’s decision row may name the register’s row that holds it (`heldBy`)',
    action:
      'the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, 72 of its decision rows gain `heldBy`, each keeping its words, its number and the cites that name it); the pin to the tag, then `yarn build`, its copies under `vendor/wow/` in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the build writes again the six files whose homes cite a moved decision by its W id: the skills, the new-project page, the modes’ data',
        'output · yarn cut-pack T-E19-00':
          'the migration edits six decision rows files, and the build writes two files under its folders again: eight more count as uncommitted until the product commits them with its pin',
        'dist · project/board-page.js':
          'a bundle holding the decisions or the plans’ rules: a row’s `heldBy`, a cite by W id',
        'dist · project/boardView.js':
          'a bundle holding the decisions or the plans’ rules: a row’s `heldBy`, a cite by W id',
        'dist · project/decisions.js':
          'a bundle holding the decisions or the plans’ rules: a row’s `heldBy`, a cite by W id',
        'dist · project/feature-page.js':
          'a bundle holding the decisions or the plans’ rules: a row’s `heldBy`, a cite by W id',
        'dist · project/featureView.js':
          'a bundle holding the decisions or the plans’ rules: a row’s `heldBy`, a cite by W id',
        'dist · project/modes.js':
          'a bundle holding the decisions or the plans’ rules: a row’s `heldBy`, a cite by W id',
        'dist · project/new-project.md':
          'the page cites the moved decisions by their W ids',
        'dist · project/packs/T-E19-00.md':
          'the pack’s digests of the rules and decisions files the release changed',
        'written · .claude/skills/design-answer-cc/SKILL.md':
          'the skill cites a moved decision by its W id',
        'written · .claude/skills/design-release/SKILL.md':
          'the skill cites a moved decision by its W id',
        'written · .claude/skills/design-sheet/SKILL.md':
          'the skill cites a moved decision by its W id',
        'written · .claude/skills/design-start/SKILL.md':
          'the skill cites a moved decision by its W id',
        'written · docs/process/new-project.md':
          'the page cites the moved decisions by their W ids',
        'written · fixtures/data/modes.json':
          'the modes’ note cites the ticket’s mode chip by its W id',
        'written · fixtures/packs/T-E19-00.md':
          'the pack’s digests of the rules and decisions files the release changed',
        'written · records/release-5-3-1.md':
          'the record digests the decisions’ and the plans’ modules again',
        'written · vendor/wow/docs/process/decisions/decisionTypes.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
        'written · vendor/wow/docs/process/modes/aboutToHoldsNote.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
        'written · vendor/wow/docs/process/plans.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
        'written · vendor/wow/docs/process/plans/checklistRules.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
        'written · vendor/wow/docs/process/plans/deliveryRules.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
        'written · vendor/wow/docs/process/plans/designRules.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
        'written · vendor/wow/docs/process/plans/plansTypes.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
        'written · vendor/wow/docs/process/plans/principleRules.ts':
          'the vendored copy of a home the release changed: a cite by W id, or the decision type’s `heldBy`',
      },
    },
    moved: {},
    tried: { 'eagle-design': 'fc73685' },
  },
  {
    version: '0.12.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'a design product’s way-of-working files are homes: the six tools’ configs and vitest’s, the session’s hooks (`.claude/settings.json`), the findings’, decisions’ and project plan’s types, the rules’ checks page; the backup script is one, found by git at whatever depth, for this repository and each product; the post-commit hook is a home (`shared/hooks/postCommit.ts`): every ref bundled under ~/backups and the branch pushed to the remote a new scope field names (`backup`), only where origin is that remote, read as host/owner/repo, so a clone does nothing; a design product’s `tsconfig.json` is written from its scope by the home `tools/writeTsconfig.ts` (the design layout, the homes taken, the scope’s new `extraRoots`); prettier’s ignore file names each line once; knip reads a git hook’s runs; the epic template’s test is a home, on a registry of its own',
    action:
      'the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, twelve files leave its index as the homes’ text, `tools/zipRepo.sh`, `.husky/post-commit` and `tests/sheet/epicTemplate.test.ts` leave for the homes’, its scope names its remote in `backup`, its `extraRoots` and the tsconfig’s writer, its ignore file written again); a product with no backup names `backup: { none: <why> }`, one with no TypeScript beyond the layout `extraRoots: []`; the pin to the tag, then `yarn build`, its copies under `vendor/wow/` in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the build reads three registry types that are homes now: its copies under `vendor/wow/` are 94, not 91',
        'output · yarn checks':
          'the build reads three registry types that are homes now: its copies under `vendor/wow/` are 94, not 91',
        'output · yarn spec-check':
          'the build reads three registry types that are homes now: its copies under `vendor/wow/` are 94, not 91',
        'output · yarn cut-pack T-E19-00':
          'the build reads three registry types that are homes now: its copies under `vendor/wow/` are 94, not 91; the four homed files under its folders (three types, the checks page) count as uncommitted until the product commits them with its pin',
        'written · vendor/wow/docs/process/decisions/decisionTypes.ts':
          'the vendored copy of a type the build reads, a home now',
        'written · vendor/wow/docs/process/projectPlan/projectPlanTypes.ts':
          'the vendored copy of a type the build reads, a home now',
        'written · vendor/wow/roadmaps/findings/findingTypes.ts':
          'the vendored copy of a type the build reads, a home now',
      },
    },
    moved: {},
    tried: { 'eagle-design': 'f44929d' },
  },
  {
    version: '0.11.0',
    date: '2026-11-12',
    kind: 'minor',
    what: 'the words’ checks report each counted plural with no singular beside it (`{key}One`, or its stem’s) and each singular that still counts, over the cells, the screen’s and the say table’s lines; the guard prints the count, never failing, until a later release holds it',
    action:
      'the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, the messages’ barrel hands `countForms` on); the pin to the tag, then `yarn build`, its copies under `vendor/wow/` in the same commit; each line the report names is the product’s to mend before the release that holds it',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn checks':
          'the guard prints one line more: the counted plurals with no singular, 14, reported and not held',
        'output · yarn cut-pack T-E19-00':
          'the migration edits the messages’ barrel: one file more counts as uncommitted until the product commits it with its pin',
        'dist · project/agentFlow.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/approvalLogic.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/blockRules.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/board-page.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/boardView.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/contentList.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/contentTypeLogic.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/contract-page.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/contractView.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/expectedFiles.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/feature-page.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/featureView.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/flowCheck.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/gateRules.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/journeys.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/messages.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/packs/T-E19-00.md':
          'the pack’s digest of the messages’ barrel and its parts',
        'dist · project/refineCheck.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/roleCombinations.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/scenes.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/screenView.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/sourceCheck.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/sourceView.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/specCheck.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/tickets.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'dist · project/translationFlow.js':
          'a bundle holding the words’ checks: `countForms` and the lines it reads',
        'written · fixtures/packs/T-E19-00.md':
          'the pack’s digest of the messages’ barrel and its parts',
        'written · guards/__snapshots__/guardMap.ts':
          'the messages’ bundle hands `countForms` on, and its lines move',
        'written · records/release-5-3-1.md':
          'the record digests the messages’ barrel and its checks again',
        'written · vendor/wow/sheet/words/messages/messageChecks.ts':
          'the vendored copy of the home the release changed',
      },
    },
    moved: {},
    tried: { 'eagle-design': '61dbda5' },
  },
  {
    version: '0.10.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'two homes stop holding a product’s facts: the source check’s map and the files it reads stand in the product’s `guards/sourceCheck/sourceMap.ts`, a registry the contract names; the publish skill asks the product for its artifact’s address by the slot `publish.artifact`, and the slots’ test reads the skills’ asks too; five exports nothing reads leave the homes (the refusals’ order’s TIER, the events’ ActorKey, Batch and TargetKey, the directory’s RoleKey)',
    action:
      'the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, `guards/sourceCheck/sourceMap.ts` and `docs/process/documentSlots/publishCites.ts` written, the slots’ barrel spreading the second, the people’s file no longer exporting the roles’ key no home reads); a product with no such map writes the file with empty lists, and one that publishes no artifact names no slot; the pin to the tag, then `yarn build`, its copies under `vendor/wow/` in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'dist · project/documentSlots.js':
          'the slots’ barrel spreads the publish skill’s slot, its module new',
        'dist · project/modes.js':
          'the slots’ barrel spreads the publish skill’s slot, its module new: the modes’ page bundles the slots',
        'dist · project/module-entries.json':
          'two modules more: the product’s source map and its publish slot',
        'dist · project/sourceCheck.js':
          'the source check’s map and scope come from the product’s sourceMap.ts, a module of its own',
        'dist · project/sourceView.js':
          'the source check’s map and scope come from the product’s sourceMap.ts, a module of its own',
        'written · guards/__snapshots__/guardMap.ts':
          'the guard’s map reads a file more under guards/sourceCheck/: the product’s source map',
        'dist · project/boardView.js':
          'a bundle holding the homes the unread exports left: the refusals’ order, the events’ and the directory’s types',
        'dist · project/featureView.js':
          'a bundle holding the homes the unread exports left: the refusals’ order, the events’ and the directory’s types',
        'dist · project/refineCheck.js':
          'a bundle holding the homes the unread exports left: the refusals’ order, the events’ and the directory’s types',
        'dist · project/refusals.js':
          'a bundle holding the homes the unread exports left: the refusals’ order, the events’ and the directory’s types',
        'dist · project/tickets.js':
          'a bundle holding the homes the unread exports left: the refusals’ order, the events’ and the directory’s types',
        'dist · project/packs/T-E19-00.md':
          'the pack’s digests of the refusals’ order, the events’ and the directory’s types, the people’s file, and of the readers that gather them',
        'written · fixtures/packs/T-E19-00.md':
          'the pack’s digests of the refusals’ order, the events’ and the directory’s types, the people’s file, and of the readers that gather them',
        'written · vendor/wow/sheet/contract/events/eventsTypes.ts':
          'the home hands on no name its readers take from the rows',
        'written · vendor/wow/sheet/contract/refusals/refusalOrder.ts':
          'the home hands on no name its readers take from the rows',
        'written · vendor/wow/sheet/model/directory/directoryTypes.ts':
          'the home hands on no name its readers take from the rows',
        'written · records/release-5-3-1.md':
          'the record digests the slots’ barrel and its new publish slot again',
        'output · yarn cut-pack T-E19-00':
          'the migration writes two files and edits the slots’ barrel and the people’s file: four more count as uncommitted until the product commits them with its pin',
        'exit · yarn lint:exports · 1 → 0':
          'five exports nothing reads leave the homes: TIER from the refusals’ order, ActorKey, Batch and TargetKey from the events’ types, RoleKey from the directory’s, and the people’s file stops exporting RoleKey',
        'output · yarn lint:exports':
          'five exports nothing reads leave the homes: TIER from the refusals’ order, ActorKey, Batch and TargetKey from the events’ types, RoleKey from the directory’s, and the people’s file stops exporting RoleKey',
      },
    },
    moved: {},
    tried: { 'eagle-design': '7e05c94' },
  },
  {
    version: '0.9.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'the words’ readers are homes, at the paths a product held them: the glossary’s reader and types, the messages’ live words, say word, situations, refusals, words, cells, checks, usage and types; a product holds their rows apart, each gathered in a file the contract names (the glossary’s terms, the messages’ rows and tables, the screen’s words); the messages’ barrel stays the product’s, its exports naming its own words',
    action:
      'the product’s rows split from the words’ readers on its own tree first, the readers byte-equal to the homes; the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, the eleven readers leave its index, the take writing them back); the pin to the tag, then `yarn build`, its copies under `vendor/wow/` in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the build side reads eleven files more in vendor/wow/: the words’ readers, homes now',
        'output · yarn checks':
          'the build side reads eleven files more in vendor/wow/: the words’ readers, homes now',
        'output · yarn spec-check':
          'the build side reads eleven files more in vendor/wow/: the words’ readers, homes now',
        'output · yarn cut-pack T-E19-00':
          'the build side reads eleven files more in vendor/wow/: the words’ readers, homes now; the eleven the migration takes out of the index count as uncommitted until the product commits them with its pin',
        'written · vendor/wow/sheet/words/glossary.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/glossary/glossaryTypes.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/liveWords.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/messageCells.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/messageChecks.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/messageUsage.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/messagesTypes.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/refusals.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/sayWord.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/situations.ts':
          'the words’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/words/messages/words.ts':
          'the words’ reader is a home now, copied with the homes',
      },
    },
    moved: {},
    tried: { 'eagle-design': 'b908e81' },
  },
  {
    version: '0.8.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'the contract’s, the directory’s and the screens’ readers are homes, at the paths a product held them: the commands’, the events’, the queries’ and the refusals’ readers and types, the refusals’ catalog, order and sentences, the directory’s reader and types, the screens’ rows and types; a product holds their rows apart, each gathered in a file the contract names (the commands’, the events’, the queries’ and the refusals’ rows, the people, the languages, the screens written by hand)',
    action:
      'the product’s rows split from the sheet’s readers on its own tree first, the readers byte-equal to the homes; the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, the fifteen readers leave its index, the take writing them back); the pin to the tag, then `yarn build`, its copies under `vendor/wow/` in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the build side reads fifteen files more in vendor/wow/: the contract’s, the directory’s and the screens’ readers, homes now',
        'output · yarn checks':
          'the build side reads fifteen files more in vendor/wow/: the contract’s, the directory’s and the screens’ readers, homes now',
        'output · yarn spec-check':
          'the build side reads fifteen files more in vendor/wow/: the contract’s, the directory’s and the screens’ readers, homes now',
        'output · yarn cut-pack T-E19-00':
          'the build side reads fifteen files more in vendor/wow/: the contract’s, the directory’s and the screens’ readers, homes now; the fifteen the migration takes out of the index count as uncommitted until the product commits them with its pin',
        'written · vendor/wow/sheet/contract/commands.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/commands/commandsTypes.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/events.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/events/eventsTypes.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/queries.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/queries/queriesTypes.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/refusals.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/refusals/refusalCatalog.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/refusals/refusalOrder.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/refusals/refusalSentences.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/contract/refusals/refusalsTypes.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/model/directory.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/model/directory/directoryTypes.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/screens/wireframes/screenRows.ts':
          'the sheet’s reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/screens/wireframes/screenTypes.ts':
          'the sheet’s reader is a home now, copied with the homes',
      },
    },
    moved: {},
    tried: { 'eagle-design': '9bf04a8' },
  },
  {
    version: '0.7.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'the cases’ readers are homes, at the paths a product held them: the journeys’ barrel, reads, check, words and types, the test cases’ barrel, baseline, reach, text, endpoint cases and types, the shared cases’ reader and types; a product holds their rows apart, each gathered in a file the contract names (the journeys with their walked prints and the states they walk, the shared cases with the roles’ count, the refusals’ reach)',
    action:
      'the product’s rows split from the cases’ readers on its own tree first, the readers byte-equal to the homes; the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, the thirteen readers leave its index, the take writing them back); the pin to the tag, then `yarn build`, its copies under `vendor/wow/` in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the build side reads thirteen files more in vendor/wow/: the cases’ readers, homes now',
        'output · yarn checks':
          'the build side reads thirteen files more in vendor/wow/: the cases’ readers, homes now',
        'output · yarn spec-check':
          'the build side reads thirteen files more in vendor/wow/: the cases’ readers, homes now',
        'output · yarn cut-pack T-E19-00':
          'the build side reads thirteen files more in vendor/wow/: the cases’ readers, homes now; the thirteen the migration takes out of the index count as uncommitted until the product commits them with its pin',
        'written · vendor/wow/sheet/cases/journeys.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/journeys/journeyCheck.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/journeys/journeyReads.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/journeys/journeyTypes.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/journeys/journeyWords.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/sharedCases.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/sharedCases/sharedCasesTypes.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/testCases.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/testCases/caseBaseline.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/testCases/caseReach.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/testCases/caseText.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/testCases/endpointCases.ts':
          'the cases’ reader is a home now, copied with the homes',
        'written · vendor/wow/sheet/cases/testCases/testCasesTypes.ts':
          'the cases’ reader is a home now, copied with the homes',
      },
    },
    moved: {},
    tried: { 'eagle-design': 'a6abea2' },
  },
  {
    version: '0.6.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'the roadmap’s readers are homes, at the paths a product held them: the backlog’s, the notes’, the templates’ and the new epic’s files, the tracks’, the tickets’ barrel, kinds, types, list, board, views, context, receipt flags, pointers and command tickets; a product holds their rows apart, each gathered in a file the contract names (the backlog’s, the notes’, the pointers’, the tickets’, the checklist’s reads, the commands’ states, the tracks)',
    action:
      'the product’s rows split from the roadmap’s readers on its own tree first, the readers byte-equal to the homes; the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, the sixteen readers leave its index, the take writing them back); the pin to the tag in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'output · yarn build':
          'the build side reads sixteen files more in vendor/wow/: the roadmap’s readers, homes now',
        'output · yarn checks':
          'the build side reads sixteen files more in vendor/wow/: the roadmap’s readers, homes now',
        'output · yarn spec-check':
          'the build side reads sixteen files more in vendor/wow/: the roadmap’s readers, homes now',
        'output · yarn cut-pack T-E19-00':
          'the build side reads sixteen files more in vendor/wow/: the roadmap’s readers, homes now; the sixteen the migration takes out of the index count as uncommitted until the product commits them with its pin',
        'written · vendor/wow/roadmaps/backlog.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/notes.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/templates.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/templates/epicFiles.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/commandTickets.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/pointerResolve.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/receiptFlags.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/ticketBoard.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/ticketContext.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/ticketExpand.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/ticketKinds.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/ticketList.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/ticketViews.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tickets/ticketsTypes.ts':
          'the roadmap’s reader is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tracks.ts':
          'the roadmap’s reader is a home now, copied with the homes',
      },
    },
    moved: {},
    tried: { 'eagle-design': '8de80db' },
  },
  {
    version: '0.5.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'the board’s numbers fold, the project’s and the repository’s, each number a tile with its value, the words beside it, its bar and its note; the repository now, at its last report’s commit, read from the receipts’ `RepositoryState`, and what each ticket reported at close; the contract’s shared types fold; every report ends on the repository whole at its commit, the receipt carrying it as `repository`, and the close copies it; the board names the browser tests’ tool from the product’s stack; the expected files’ text is `expectedText` and the source check’s layers `SOURCE_LAYERS`, so the theme may hold `text` and `LAYERS`; no move rewrites an epic’s notebook, markdown or data, where the product’s registry says one stands, and a migration that would move what a notebook imports is refused before anything moves; a repository takes each migration its pin is before, in release order; the tokens module types a colour as `TokenHex`, as the build side’s does; the roadmap’s eight type files (the backlog’s, the edges’, the ideas’, the notes’, the receipts’ and the repository state’s, the templates’, the tracks’) are homes, at the paths a product held them, so no import moves; a migration names the files a home holds from its release on, and refuses a copy whose text is not the home’s',
    action:
      'the product’s `roadmaps/receipts.ts` exports the type `RepositoryState` and a receipt’s optional `repository`; the migrations `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag (for eagle-design, `roadmaps/tickets/ticketExpand.ts` reads `expectedText` and T18 points at `SOURCE_LAYERS`, and the roadmap’s eight type files leave its index, the take writing them back); the build’s `app/styles/tokens.ts`, which now exports `TokenHex`, committed; the pin to the tag in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'dist · project/ticket-pipeline.md':
          'every report ends on the repository whole at its commit (6b), the receipt carrying it as `repository`',
        'written · docs/process/ticket-pipeline.md':
          'every report ends on the repository whole at its commit (6b), the receipt carrying it as `repository`',
        'output · yarn build':
          'the tag’s build writes the ticket pipeline and the answer-cc skill back from its modules, which lack the repository line the trunk carries, and this one’s modules carry it; the build’s line counts two component files more, the board’s number line and share bar',
        'output · yarn checks':
          'the build’s line counts two component files more, the board’s number line and share bar',
        'output · yarn spec-check':
          'the build’s line counts two component files more, the board’s number line and share bar',
        'output · yarn cut-pack T-E19-00':
          'the build’s line counts two component files more, the board’s number line and share bar',
        'output · yarn test':
          'one test more: the board’s repository card, its state from the reports that carry it',
        'dist · project/board-page.js':
          'the board’s numbers fold, the project’s and the repository’s, each a tile with its value, the words beside it, its bar and its note; the contract’s shared types fold',
        'dist · project/contract-page.js': 'the contract’s shared types fold',
        'written · vendor/wow/roadmaps/backlog/backlogTypes.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/edges/edgeTypes.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/ideas/ideasTypes.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/notes/notesTypes.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/receipts/receiptsTypes.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/receipts/repositoryState.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/templates/templatesTypes.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'written · vendor/wow/roadmaps/tracks/tracksTypes.ts':
          'the roadmap’s type file is a home now, copied with the homes',
        'dist · project/contentTypeLogic.js':
          'T18 points at the source check’s `SOURCE_LAYERS`',
        'written · app/styles/tokens.ts':
          'the tokens module types a colour as `TokenHex`, as the build side’s does',
        'dist · project/contractView.js':
          'the expected files’ text reads `expectedText`, the name the theme’s `text` frees',
        'dist · project/expectedFiles.js':
          'the expected files’ text reads `expectedText`, the name the theme’s `text` frees',
        'dist · project/refineCheck.js':
          'the expected files’ text reads `expectedText`, the name the theme’s `text` frees',
        'dist · project/tickets.js':
          'the expected files’ text reads `expectedText`, the name the theme’s `text` frees',
        'dist · project/sourceCheck.js':
          'the source check’s layers read `SOURCE_LAYERS`, the name the theme’s `LAYERS` frees',
        'dist · project/sourceView.js':
          'the source check’s layers read `SOURCE_LAYERS`, the name the theme’s `LAYERS` frees',
        'dist · project/plans.js':
          'the layers’ principle names the finding `SOURCE_LAYERS`',
        'written · vendor/wow/guards/expectedFiles.ts':
          'the expected files’ text reads `expectedText`, the name the theme’s `text` frees',
        'written · vendor/wow/docs/process/plans/principleRules.ts':
          'the layers’ principle names the finding `SOURCE_LAYERS`',
        'dist · project/boardView.js':
          'each number a Stat with its words, its bar and its note; the repository now from the receipts’ RepositoryState, and at close; the browser tests’ tool from the product’s stack',
        'dist · project/featureView.js':
          'it bundles the board’s view, whose numbers moved',
        'dist · project/feature-page.js':
          'it bundles the board’s view, whose numbers moved',
        'dist · project/module-imports.json':
          'the board’s view reads the product’s stack, docs/process/productStack.ts',
        'dist · project/packs/T-E19-00.md':
          'the ticket pipeline’s digest moves: every report ends on the repository',
        'written · fixtures/packs/T-E19-00.md':
          'the ticket pipeline’s digest moves: every report ends on the repository',
        'written · records/release-5-3-1.md':
          'the ticket pipeline’s digest moves: every report ends on the repository',
        'written · .claude/skills/design-answer-cc/SKILL.md':
          'the tag’s build writes the skill back without the close’s repository line, which the trunk carries; this one leaves it',
      },
    },
    moved: {
      design: [
        'design/app/components/organisms/BoardPage/constants/boardPageNumberGroupConstants.ts → gone',
      ],
    },
    tried: { 'eagle-design': '212a690' },
  },
  {
    version: '0.4.0',
    date: '2026-11-12',
    kind: 'major',
    what: 'a product plugs its own code in through its `product.ts`, and its pure code through its `productView.ts`: the checks’ parts a and w, the pack’s refine check and the Feature page take what is the product’s from their entry point, and no home reads those files; the Feature page takes an epic’s fields from it too, and the source guard names the seven layers itself and reads the requirements from their registry, `sheet/requirements.ts`, where the migration moves their rows; a migration’s moves carry the imports with them, and it may edit a text of a file found exactly once; the block model is a registry, and the build prints as JSON what the product’s `sheet/project.ts` · `buildReads.json` names, each file held by the name its row gives; what knip starts from beside the entries is the home’s `tools/readStarts.ts`, which a product’s scope calls; the spec’s files, the first read, the fact combinations, the drift guards and the decided points are the product’s, a registry, `docs/process/projectPlan.ts`, where the migration moves their rows, and the skills name it; a pointer of the product’s at one of those lists names the plan, and a migration edit may ask for every place its text stands; the eras of a product’s release records are its own, `sheet/project.ts` · `recordEras`, and the home’s tests read every feature by what its registries hold, naming none; a product’s own documents, its API convention and its agent’s instructions, are its modules, printed at their paths from `sheet/project.ts` · `buildReads.documents`; a home’s document asks a product for its own texts by key, `docs/process/documentSlots.ts` · `cites` (a lesson’s reason, a decision’s date, an example), a key it does not hold printing nothing or the home’s example; the board opens with each epic’s tickets by column, the MVP’s whole on top, and the API contract page, `Contract.html`, shows every endpoint as TypeScript (the `ContractPage` organism, `contractView` · `contractPage`), `CodePieces` an atom and `CodeBlock`, which draws it, a molecule; a port leaves a change of its trunk’s that a home holds to the home, by its `CARRIED` row; every epic has its Feature page, the pages fold their sections under counted heads (`FoldSection`, a molecule), the contract’s body is an organism the board mounts too (`ContractBody`), the tones and the code inks are the theme’s, and the board’s pick travels to the Feature page in the browser (`boardView` · `pickedEpic`); every endpoint and each endpoint’s test cases fold, shown or hidden all at once (`FoldList`, a molecule on the `Fold` atom; `EndpointFolds`, an organism), and the features’ refine standing is retired; the board’s numbers stand in two cards, the project’s and the repository’s, its epics listed done, MVP, later, deferred; the build writes `roadmaps/ids.ts`, every id the sheet holds as types, and the migration lists it in the scope’s emit and in `.prettierignore`; a product names its stack in `sheet/project.ts` · `stack`, a key of `shared/stack/stacks.ts`, and the home’s documents read each part’s name from it (`docs/process/productStack.ts` · `productStack`)',
    action:
      'the migration `ports/` names for the repository, on its checkout: `node scripts/migrate.ts <name> <checkout>`, run from this repository at the tag; the pin to the tag in the same commit',
    rules: { added: [], changed: [], removed: [] },
    outputs: {
      'eagle-design': {
        'dist · project/agentFlow.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/backlog.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/blockRules.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/commands.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/contentList.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/dbSchema.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/edges.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/events.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/expectedFiles.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/flowCheck.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/journeys.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/measure.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/payloads.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/projections.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/queries.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/receipts.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/refusals.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/roleCombinations.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/sampleRun.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/specCheck.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/testCases.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'dist · project/translationFlow.js':
          'a pointer it holds or bundles names the product’s plan, projectPlan.js, where it named plans.js: nothing else moves',
        'output · yarn cut-pack T-E19-00':
          'the migration’s two new files of the product’s own, under guards/, wait to be committed with the pack',
        'output · yarn build':
          'the requirements are a module of their own: one script more',
        'output · yarn spec-check':
          'the requirements are a module of their own: one script more',
        'output · yarn checks':
          'one script more, the requirements’; the content types’ snapshot holds the map of the files, where the source guard now reads the requirements’ registry, a file no type is made of: one link fewer, its files key moved, retaken on the product’s side at its take',
        'output · yarn checks:gate':
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
          'the page’s entry hands the product’s view to the Feature page; every epic is a tab with its status, each section folds under its count, journeys and cases read as chips, the notebook as bullets, and the epic opens from the address or the board’s pick; the test cases fold by endpoint, before the API, whose endpoints fold as the contract page’s; the refine standing is gone',
        'dist · project/featureView.js':
          'the feature view reads no scenes and no role combinations: the page hands them in; it reads the combinations from the product’s plan; every epic is a tab, its status its board column; the notebook reads as head, source and points, a point never ending inside brackets or bold; no refine standing',
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
          'the board bundles the ticket context, which reads its first read from the product’s plan; the tickets’ pointers name projectPlan.js; the view counts every epic’s tickets by column, the list on top; each epic links to its Feature page, the pick kept in the browser; the backlog’s open list is no longer read; the numbers counted for the project and for the repository, the epics listed done, MVP, later, deferred',
        'dist · project/board-page.js':
          'the board bundles the ticket context, which reads its first read from the product’s plan; the tickets’ pointers name projectPlan.js; the board opens with each epic’s tickets by column, the MVP’s whole on top; each row and epic panel opens the Feature page; the columns, the ports and the whole API contract fold, each endpoint in it too; the title stands alone; the numbers in two cards, the project’s and the repository’s, each with its note on hover',
        'dist · project/contractView.js':
          'a pointer it holds names the product’s plan, projectPlan.js; the view builds the contract page, bundling the backlog, the tickets, the block model and the refusals it reads',
        'dist · project/contract-page.js':
          'the API contract page’s script: every endpoint as TypeScript, the numbers, the legend, the filters and what every endpoint shares; the contract’s body is an organism the board mounts too; each endpoint folds under its head, all shown or hidden at once; the code drawn in the palette’s code inks',
        'exit · yarn build · 1 → 0':
          'the tag’s views read what eagle-design’s main retired (the backlog’s open list, the features’ steps, the E15 prototype): the tag’s build fails, this one passes',
        'exit · yarn spec-check · 1 → 0':
          'the tag’s views read what eagle-design’s main retired (the backlog’s open list, the features’ steps, the E15 prototype): the tag’s spec check fails, this one passes',
        'output · yarn tsc':
          'the tag’s views read what eagle-design’s main retired (the backlog’s open list, the features’ steps, the E15 prototype): errors on the tag, none here',
        'exit · yarn tsc · 2 → 0':
          'the tag’s views read what eagle-design’s main retired (the backlog’s open list, the features’ steps, the E15 prototype): tsc fails on the tag, passes here',
        'exit · yarn test · 1 → 0':
          'the tag’s views read what eagle-design’s main retired (the backlog’s open list, the features’ steps, the E15 prototype): the board’s, the Feature page’s and the docs’ paths tests fail on the tag, pass here',
        'output · yarn lint:exports':
          'the tag’s feature view reads the features’ steps, roadmaps/features.ts, which eagle-design’s main retired: two unresolved imports on the tag, none here',
        'exit · yarn lint:exports · 1 → 0':
          'the tag’s feature view reads the features’ steps, which eagle-design’s main retired: the export lint fails on the tag, passes here',
        'written · .claude/skills/design-publish/SKILL.md':
          'the publish skill sends the module maps with any bundle, so the source check never reads a bundle whole',
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
        'written · vendor/wow/docs/process/modes/aboutToHoldsNote.ts':
          'the part asks the product for its story, its date or its example by key: the modes print as before',
        'written · vendor/wow/docs/process/modes/holdsToLegend.ts':
          'the part asks the product for its story, its date or its example by key: the modes print as before',
        'written · vendor/wow/docs/process/modes/modeExample.ts':
          'the part asks the product for its story, its date or its example by key: the modes print as before',
        'written · vendor/wow/docs/process/modes/runsFeature.ts':
          'the part asks the product for its story, its date or its example by key: the modes print as before',
        'written · vendor/wow/docs/process/modes/runsFeatureFirstRows.ts':
          'the part asks the product for its story, its date or its example by key: the modes print as before',
        'written · vendor/wow/docs/process/modes/runsFeatureLastRows.ts':
          'the part asks the product for its story, its date or its example by key: the modes print as before',
        'dist · project/contentTypeLogic.js':
          'the standing words bundled from where they stand now, beside the assembly logic',
        'dist · project/sheetStatus.js':
          'the standing words built from where they stand now, beside the assembly logic, under the same name',
        'dist · project/agent-instructions.md':
          'the agent’s first read opens on the product’s plan, projectPlan.ts',
        'written · docs/process/agent-instructions.md':
          'the agent’s first read opens on the product’s plan, projectPlan.ts',
        'dist · project/new-project.md':
          'a new project empties the rows of the product’s plan, docs/process/projectPlan/; the features’ rows are no registry to cut',
        'written · docs/process/new-project.md':
          'a new project empties the rows of the product’s plan, docs/process/projectPlan/; the features’ rows are no registry to cut',
        'dist · project/packs/T-E19-00.md':
          'the digests move: the tickets’ parts by their context and their pointers, the plans’ module two parts fewer',
        'written · fixtures/packs/T-E19-00.md':
          'the digests move: the tickets’ parts by their context and their pointers, the plans’ module two parts fewer',
        'written · .claude/skills/design-refine/SKILL.md':
          'the refine skill asks for the product’s decided points in its plan, docs/process/projectPlan.ts; no status row to move before the feature ticket',
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
        'dist · project/productStack.js':
          'the stack the product names in sheet/project.ts, each part by its name: a module of its own, bundled with the documents that read it',
        'dist · project/ids.js':
          'every id the sheet holds, as types: roadmaps/ids.ts, which the build writes, a module of its own',
        'dist · project/textPoints.js':
          'a text cut into its points, read by the Feature page’s notes and the contract’s fields: a module of its own',
        'written · vendor/wow/docs/process/productStack.ts':
          'the build side’s closure reads the stack its product names: vendored with it',
        'written · vendor/wow/shared/stack/stacks.ts':
          'the build side’s closure reads the stacks the way of working defines: vendored with it',
      },
    },
    moved: {
      design: [
        'design/app/components/atoms/CodeBlock/constants/codeBlockInkConstants.ts → design/app/components/atoms/CodePieces/constants/codePiecesInkConstants.ts',
        'design/app/components/atoms/CodeBlock/utils/codeBlockWeightUtils.ts → design/app/components/atoms/CodePieces/utils/codePiecesWeightUtils.ts',
        'design/app/components/atoms/CodeBlock/CodeBlock.tsx → design/app/components/molecules/CodeBlock/CodeBlock.tsx',
        'design/app/components/atoms/CodeBlock/index.ts → design/app/components/molecules/CodeBlock/index.ts',
        'design/app/components/organisms/BoardPage/components/BoardPageOutsideAndOpen.tsx → gone',
        'design/app/components/organisms/BoardPage/utils/boardPageTonesUtils.ts → gone',
        'design/app/components/organisms/FeaturePage/components/FeaturePageEndpointItem.tsx → gone',
        'design/app/components/organisms/FeaturePage/components/FeaturePageSteps.tsx → gone',
        'design/app/components/organisms/FeaturePage/constants/featurePageStepsConstants.ts → gone',
        'design/app/components/organisms/FeaturePage/utils/featurePageHeadJumpUtils.ts → gone',
        'design/app/workspace/boardView/boardPrototype.ts → gone',
        'design/app/workspace/featureView/featureFields.ts → gone',
        'design/app/workspace/sheetStatus.ts → gone',
        'design/docs/documents/agent-instructions.ts → gone',
        'design/docs/documents/api-convention.ts → gone',
        'design/docs/documents/api-convention/endpointChecks.ts → gone',
        'design/docs/documents/api-convention/endpointShape.ts → gone',
        'design/docs/process/plans/driftGuards.ts → gone',
        'design/docs/process/plans/specFiles.ts → gone',
      ],
    },
    tried: { 'eagle-design': '29fdc87' },
  },
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
