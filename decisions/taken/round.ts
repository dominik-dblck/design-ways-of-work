/**
 * - `ROUND` · the decision round: the sides, the drafts, the pages, as a design product took them first
 */
import type { Decision } from '../../scripts/decisionTypes.ts';

const ROUND: readonly Decision[] = [
  {
    id: 'W63',
    title: 'a product rule a requirement holds leaves the rules',
    held: '4 Nov · role-held-on-a-type · A, PM',
    says: 'where a requirement row says what a product rule says, the row is the home and the rule goes to `legacy/rules-retired.md`: rule:role-held-on-a-type became RT1, T13, T74, T85 and T86, its folders-are-shared clause retired by T4 (open as O19). The same test found no requirement holding the other product and experience rules, so they stay.',
    from: 'eagle-design D36',
  },
  {
    id: 'W64',
    title: 'Checklist, read holds only tickets still to be built',
    held: '4 Nov · Checklist, read · A, PM',
    says: "`CHECKLIST_READ` keeps the clauses of a ticket not yet built; a built ticket's clauses go whole to `legacy/checklist-read-done-tickets.md`, its pack in `fixtures/packs/` the record.",
    from: 'eagle-design D37',
  },
  {
    id: 'W65',
    title: "code rules are the build side's",
    held: '4 Nov · 7.5 · B, PM',
    says: "how code is written is D31's code group, the build side's `docs/rules`: the six code rules held in delivery go to `legacy/rules-retired.md`; the two the build side lacks, `config-through-a-factory` and `one-owner-per-rendered-value`, go to it as proposed rows with release 3.",
    from: 'eagle-design D38',
  },
  {
    id: 'W66',
    title: 'two rows alike by value: one fact or two',
    held: '4 Nov · O15, PM',
    says: "a block written twice is one constant when it is one fact (Checkbox's check mark, the scheduled moves of one-time and automated delivery) and stays twice, with its reason in the test's OPEN list, when it is two facts that agree (Button and IconButton outlined, Checkbox and Radio, the two sample campaigns). Closes O15.",
    from: 'eagle-design D39',
  },
  {
    id: 'W67',
    title: 'the design side draws only what is not built',
    held: '4 Nov · Prototyping · A, PM',
    says: "a registry resolves each component by name, the design side's draft or else the build side's package; a change to a built component starts from it at a pinned version; a draft leaves at the report that builds it (rule:draft-until-built). The registry, the stub and the pin's test are built when the package lands.",
    from: 'eagle-design D41',
  },
  {
    id: 'W68',
    title: "the shared component code is the build side's package",
    held: '4 Nov · Shared component code · A, PM',
    says: "only the build side writes it, as a versioned package with a changelog and its provider wrapper; the design side reads it at a pin and never writes into it, `design-start` lists its changes since the pin, and the prototype's API stub is generated from the contract and the samples (rule:components-ship-as-a-package).",
    from: 'eagle-design D42',
  },
  {
    id: 'W69',
    title: 'the design side says what, the build side how',
    held: '4 Nov · Responsibilities, PM',
    says: 'the design side defines what the product does and means, every word on screen included; the build side decides how it is built and finally looks; the contract never syncs back, and a change the build side wants is a proposal the PM reads (rule:design-says-what-build-says-how).',
    from: 'eagle-design D43',
  },
  {
    id: 'W70',
    title: 'a skill line carries no history',
    held: '4 Nov · O17 · A, PM',
    says: 'D27 holds for the skills: a line says its rule, without a date, an attribution, a ticket or an epic; the stage names stay, the words the process runs on. The skills as they stood are `legacy/skills-before-4-nov.md`, and `aRuleCarriesNoHistory` reads `docs/skills/`. Closes O17.',
    from: 'eagle-design D44',
  },
  {
    id: 'W71',
    title: 'the build side’s markdown is printed from data',
    held: '4 Nov · O13 · A, PM',
    says: '`ticket-pipeline.md`, `agent-instructions.md` and `api-convention.md` are sections in `docs/documents/`, and `yarn build` prints each at its path byte for byte, so the build side’s digests do not move; a hand edit fails `aGeneratedFileIsItsModule`. The path moves with release 3. Closes O13.',
    from: 'eagle-design D46',
  },
  {
    id: 'W72',
    title: 'a retired page leaves the tree, git keeps it',
    held: '4 Nov · Drawings and pages, PM',
    says: 'amends D24 for pages and drawings: one the decision round retires is removed, with the data only it read, and git keeps it. Gone 4 Nov: Roles per type with its roles-per-type module (RT1 holds it), Ticket tracks (the mode is a chip on the ticket, D19), Block model detail, Message Workflow v3, Content platform, ContentTypeFiles, Data map (O14), PlanNav with the plan pages’ reading order, and Icons with the design system’s icon copies (D10). Pipeline stays: two checks read its data.',
    from: 'eagle-design D47',
  },
  {
    id: 'W73',
    title: 'a drawing leaves at the report that builds it',
    held: '4 Nov · Drawings and pages, PM: point 14, 3.6e',
    says: 'PhonePreview, MoveDocumentDialog, NewDocumentDialog and FolderListHeader leave the tree: T-E18-00 and the epics before it built them (PhonePreview, TypeLibraryMoveDialog, TypeLibraryNewDocumentDialog, GroupListHeader), and the words only NewDocumentDialog read go with it (R4). The source check counts a component without a drawing only while its owning ticket is not done (rule:draft-until-built), frozen at 0. TypeLibrary stays while part d reads it.',
    from: 'eagle-design D48',
  },
  {
    id: 'W74',
    title: 'a sheet module imports what it reads (O16 B, done)',
    held: '4 Nov · O16, PM: B',
    says: 'The content assembly imports the content types, the modules, the blocks and the directory; the gate cast imports the assembly and the content types; the tickets import the commands, the backlog, the journeys and the spec. gateRules.js waits on no global, and aModuleReadsNothingAtLoad holds every sheet module, none left open.',
    from: 'eagle-design D50',
  },
  {
    id: 'W75',
    title: 'the architecture review is the sheet’s data, its page gone',
    held: '4 Nov · B, PM',
    says: 'The review of the engineer’s proposal (27 Oct: 17 points, the 13 questions, the split between eagle-cms and Eagle Core) moves whole into sheet/model/eagleReview.ts in its own shape, each point with the engineer’s proposal, ours, why and its requirements as lists, so a ticket reads them by name (eagleReview.js · points, split, questions, map, board, tree, duties, kinds, export); the Eagle architecture review page leaves the tree (D47) with the words only it drew; dbSchema.js is the pattern: the criteria behind a decision kept as data.',
    from: 'eagle-design D53',
  },
  {
    id: 'W76',
    title:
      'an open epic’s notebook is data, a closed one’s frozen (O12 B, done)',
    held: '4 Nov · O12, PM: B; the walk decided alone (PM: finish what follows from the sheet)',
    says: 'The notebooks of the open epics E05, E08, E10, E14 and E15 are `roadmaps/EXX/EXXNotes.ts`, read by `roadmaps/notes.ts · notesOf` and shown on the Feature page: a title, a lede and sections, each with its kind (roadmaps/notes/notesTypes.ts), every line as it was written, the one line every notebook repeated (ours only, never on a read list) said once by the entry and rule:no-notebook-in-the-pack. The lines keep what they mean: a decision in them reaches the sheet as the refinement writes it, into the criterion and an EDGES row (design-refine step 9). The closed epics E03, E04, E06, E09 and E18 stay markdown; aClosedNotebookIsFrozen pins a notebook in either form once its feature ticket is done.',
    from: 'eagle-design D55',
  },
  {
    id: 'W77',
    title: 'a new epic starts from the template, after its backlog row',
    held: '4 Nov · the tree’s roadmaps/templates/, decided alone (PM: finish what follows from the sheet)',
    says: 'roadmaps/templates.ts holds the shape of an epic’s folder: its four parts (EXXTickets.ts, EXXEdges.ts, EXXReceipts.ts, EXXNotes.ts, each named for the entry it serves) and the registry that lists each. `yarn new-epic EXX` writes the parts a folder lacks and lists them in epic order; it refuses an epic the backlog does not hold, because the backlog row is the epic’s one home and its order (the tree’s epic.ts is that row). An existing folder gains a part the same way when it needs one; no empty part is added ahead of need.',
    from: 'eagle-design D56',
  },
  {
    id: 'W78',
    title:
      'a page reaches the project root from its folder; the menu lists only served pages (O5)',
    held: '4 Nov · O5, decided alone (PM: finish what follows from the sheet)',
    says: 'scraps/wf-bars.html loads support.js, the design system, tokens.css, the sheet’s scripts and the avatars from `../`, the project root it is published under. compat.json lists only pages the build serves: the Mailing Workflow v2 entry named a file the repository never held. What wf-bars still lacks is O21. The Wireframes page moves to React with the build side’s component package (D41, D42): drawn again here, the built components would be held twice.',
    from: 'eagle-design D57',
  },
  {
    id: 'W79',
    title:
      'the Feature page reads as plan-Feature does; a page’s source check reads the bundles as the checks do',
    held: '4 Nov · decided alone (PM: finish what follows from the sheet)',
    says: 'The React Feature page shows the source check above the epic (the copies in the scope, the ratchet, each kind beside its base) and the epic’s notebook (D55), beside its journeys, endpoints, test cases, fields, decisions and pages; a component is a link to its drawing with its spec row, and is drawn in place once the build side’s package lands (D41). The source check a page runs reads each bundle as its own modules, an entry it imports as its global, the way the checks read it: one `ownModulesText` serves both, and which entry a part serves stays the layout’s, written by the build as module-entries.json. The pages had counted the sentences gateRules.js and contentAssembly.js carry from messages.js (86) where the checks count none.',
    from: 'eagle-design D58',
  },
  {
    id: 'W80',
    title:
      'the build side’s read channel as decided; the Pages menu grouped; the artifact opens on the Board (O3, O4)',
    held: '4 Nov · O3, O4, decided alone (PM: finish what follows from the sheet)',
    says: 'agent-instructions.md names the channel D3 and D6 decided: the design project at the release the design side names, each file by its path and sha256, read commands only (its hook); the Claude Design MCP is no longer the channel. It reaches the build side with release 3. The Pages menu lists the React pages first, then the other pages, then the components, each group by title (O4 A, the group read off each entry’s kind). The artifact opens on Board.html, where it opened on plan-Icons, a page D47 retired. app/styles/gateStates.ts keeps its name: gateStates.js is a published path the drawings and the build side read, and its home is already the styles’.',
    from: 'eagle-design D59',
  },
  {
    id: 'W81',
    title:
      'the design tokens come with the build side’s package; until then they travel whole',
    held: '5 Nov · design system · B, PM',
    says: 'the build side holds the tokens and ships them with its components’ package (D42); a new token is a proposal in a pack. Until the package lands, the design system’s files stay as they are, their folder named once in `sheet/project.ts`, and a new project of the company takes them whole: the projects are internal. Then the copy goes to `legacy/` with tokens.css and its generator.',
    from: 'eagle-design D60',
  },
  {
    id: 'W82',
    title: 'a new project is a copy of this one, the product cut by hand',
    held: '5 Nov · template · PM: copy it, cut what is Eagle’s, build every part development needs',
    says: 'a new project starts as a copy of this repository, the product’s homes cut by hand: no tool writes it and no empty project is tested. The guide, `docs/process/new-project.md` written from `docs/documents/new-project.ts`, says what to fill, what to cut and what stays, and `tsc` names the files that read what was cut. The work goes into the parts development needs: the pages, the checks, the packs. Replaces the versioned package of the way of working planned on 4 Nov.',
    from: 'eagle-design D61',
  },
];

export { ROUND };
