/**
 * - `PLAN` · the workspace’s pages: the board, the feature page, the contract, as a design product took them first
 */
import type { Decision } from '../../scripts/decisionTypes.ts';

const PLAN: readonly Decision[] = [
  {
    id: 'W89',
    title:
      'the views follow the Claude Design originals, every word and count read from the data',
    held: '12 Nov · PM: “A lec teraz”, “tylko wszystko data driven”, “nic pisanego z ręki poza templatem boarda i contractu”',
    says: 'The board, the Feature page and the contract page follow plan-Kanban, plan-Feature and plan-API contract, read from their 3 Nov export. Everything they show is read from the data: nothing is written by hand but the templates of the board and the contract page. They are built on eagle-design’s main and wow carries them into its homes; eagle-dev’s atoms go to wow’s stack part by a sync script, never a hand copy. The point-by-point record is `notes/view-alignment.md`.',
    from: 'eagle-design D77',
  },
  {
    id: 'W90',
    title:
      'SourceCheck retires: each kind it found is held by a lint or a test',
    held: '12 Nov · PM, A: “te checki można wywalić, trzymają nas już linty”',
    says: 'Nothing stops being held. The layers read upwards becomes a wow boundaries rule over the sheet’s seven layers; a replaced requirement still there, with its two siblings, a wow test over `sheet/requirements.ts`; a banned word joins wow’s words lint; a typed list, a value typed by hand, a status map and a status function become eagle-design’s own checks; a typed colour is held in `.ts` as in `.tsx`. Then SourceCheck goes to `legacy/`.',
    from: 'eagle-design D78',
  },
  {
    id: 'W91',
    title:
      'the board opens on the list of epics, and every epic opens its Feature page',
    held: '12 Nov · PM: “listę łatwiej się czyta niż ten board” · every epic, A',
    says: 'The board leads with the original’s list: each epic with its status and its progress, read from the data; the column board stands below it, folded. A row opens `Feature.html?epic=EXX`. The artifact switches pages without their address, so the pick also travels in the browser (`app/pages/common/pickedEpic.ts`): the Feature page reads the address, then the pick, and an open page follows a new pick. Its tabs are every epic, each with its board column as its status.',
    from: 'eagle-design D79',
  },
  {
    id: 'W92',
    title:
      'the board is lighter, and what was left to settle goes onto its tickets',
    held: '12 Nov · PM: “do dropdowna”, “to powinna być część ticketu” · A',
    says: 'The board keeps its title and loses its eyebrow and intro; its numbers are small chips. The columns (with the kinds), the ports and the whole API contract fold under their heads. Each point once “to settle” is an open edge with no pick on its ticket: the anchor outside the database on T-E11-04, the log’s pruning and its scope on T-E11-03; Push v4 is a story of EPUSH until it has a ticket. The backlog’s open list retires.',
    from: 'eagle-design D80',
  },
  {
    id: 'W93',
    title: 'the Feature page folds every section, and the refine steps retire',
    held: '12 Nov · PM: “żeby można było łatwo scrollować i sobie rozwijać”; the steps, A, after “w sensie co one wnoszą?”',
    says: 'Every section folds, its count beside its label; the endpoints and the test cases fold one by one, with show all and hide all; the test cases come before the API; the notebook’s lines read as bullets; the source check folds under the title; the intro and the jump chips go. The seven refine steps leave the page and their data retires: `roadmaps/features.ts` said again what the board, the counts, the notebooks and git hold, and its rows went to `legacy/feature-steps-12-nov.md`; the refine skill no longer moves a row.',
    from: 'eagle-design D81',
  },
  {
    id: 'W94',
    title:
      'the epics read in one order: closed first, then the open MVP, after it, deferred last',
    held: '12 Nov · PM: “skończone powinny lecieć na górę”, “to samo w feature”',
    says: 'The board’s list and the Feature page’s tabs read the epics in one order, `boardEpics.ts · listed`: every closed epic, then the open MVP epics, then those after the MVP, then the deferred, each group in the backlog’s order.',
    from: 'eagle-design D82',
  },
  {
    id: 'W95',
    title: 'the board counts what the project holds',
    held: '12 Nov · PM, A: “delikatnie”',
    says: 'Under the board’s numbers, a row of small chips counts the spec, each from its own data: endpoints and how many are typed, test cases, journeys, criteria, refusals, events, decisions and open findings. Endpoints open the contract page; test cases and journeys, the Feature page. A finding is open until its line opens on what closed it.',
    from: 'eagle-design D83',
  },
  {
    id: 'W96',
    title:
      'the ids are typed: an epic, a story or a ticket gone fails tsc wherever a row still names it',
    held: '12 Nov · PM: “fajnie jakby je też linter albo typescript chronił”, “to zróbmy to teraz”',
    says: '`yarn build` writes `roadmaps/ids.ts` from the backlog and the tickets (`tools/ids.ts`): EpicId, EpicNum, StoryId, TicketId. The rows written by hand take them: a command’s and a query’s epic and story, a query’s ticket (or the ticket and the epic it grows in), a destination port’s, a journey’s, a notebook’s and a combinations file’s epic, a backlog row’s deps and merges, a port’s epic, an authored ticket’s epic, story and depends, a caveat’s until. Every map keyed by ticket (edges, receipts, caveats, status, checklist reads, command states) `satisfies TicketKeyed`, so a key no ticket holds fails; `yarn new-epic` writes it so. `aGeneratedFileIsItsModule` keeps the file fresh. The two receipts keyed by tickets merged into Assign, T-E06-03 and T-E06-07, went to `legacy/e06-merged-receipts-12-nov.md`. In prose, `aNamedTicketExists` holds every ticket an open ticket, the sheet, the documents and the skills name to the board; a closed ticket, a notebook and a decision keep the words of their day.',
    from: 'eagle-design D84',
  },
  {
    id: 'W97',
    title:
      'the board’s numbers stand in two cards: the project and the repository',
    held: '12 Nov · PM: “żebyśmy mieli podział na projekt i na repozytorium”',
    says: 'PROJECT holds the plan (epics, MVP, tickets done, ready) and the spec (D83); REPOSITORY holds what the build side reported, summed over the receipts of the tickets on the board: tests reported and tickets reported. Each number is its label in capitals and its value, its line on hover; amends D83’s chips. The repository’s other numbers (the tests it holds, its e2e, its coverage) join once a source carries them.',
    from: 'eagle-design D86',
  },
  {
    id: 'W98',
    title:
      'every report ends on the build repository whole: its tests, its e2e, its coverage',
    held: '12 Nov · PM, A (“A może być”); “zapytaj eagle-dev w sumie o pokrycie”',
    says: 'The report, any shape, ends on one line read from the repository’s own tools at its commit: `repository: {sha} · tests {n} · e2e {n} · coverage lines, branches, functions, statements` (`ticket-pipeline.md` · Report, 6b), a number its tools cannot give `—`. The receipt carries it as `repository` (`roadmaps/receipts/repositoryState.ts`), copied as the other numbers are. The board’s REPOSITORY card shows the newest state, each count with its change since the report before, and still sums what the receipts reported; until a report carries the line it says so. eagle-dev’s answer set its sources: `yarn test` (passed, skipped), `yarn e2e --list`, and coverage as the last row of its `roadmaps/coverage/history.jsonl` with that row’s own sha, a fresh `yarn test:coverage` (4–5× slower) taken at a feature’s end, not on every report. T-E19-00’s receipt holds the first state, its last measured row at dbd3f54d. It reaches the build side with the next release.',
    from: 'eagle-design D87',
  },
  {
    id: 'W99',
    title:
      'every number on the board says what it counts; the repository reads now and at close',
    held: '12 Nov · PM: “trzeba to opisać w tooltipie i rozróżnić”, after “czemu jest różnica między tests a tests reported?”',
    says: 'Each number of the two cards carries its line on hover, a word of `boardWords.ts`, and each line of numbers its name: PLAN and SPEC in the project; NOW (with the commit it was read at) and AT CLOSE in the repository. NOW is the repository whole at its last report: the suite’s tests (every test, units to acceptance), skipped, e2e, and coverage of lines with the other three and the run’s commit on hover. AT CLOSE sums the acceptance tests each ticket reported the day it closed, one per criterion, history never recounted, so it stays below the suite’s count. Amends D86.',
    from: 'eagle-design D88',
  },
  {
    id: 'W100',
    title:
      'the atoms keep the design system’s names; the sheet’s types take their domain’s',
    held: '12 Nov · eagle-design’s pick, on WoW’s question (one name, one home, as eagle-dev’s atoms join wow)',
    says: 'Where an atom and a sheet type share a name, the atom keeps the design system’s and the sheet’s type is named for what it is: gate-rules’ `Button` is `GateButton`, content-type-logic’s `Badge` is `BoardBadge`, and block-rules’ own `Badge` is `BlockBadge`. Nothing they hold changes.',
    from: 'eagle-design D89',
  },
  {
    id: 'W101',
    title:
      'the board’s numbers read as tiles: the value large, a few words beside it, a bar',
    held: '12 Nov · PM: “a mógłbyś to teraz jakoś ładnie ostylować?”',
    says: 'Each number of the two cards is a tile in a grid: its label small above, its value large, a few words beside it (its whole, its parts, its change, what it skipped), and a bar where it is a share of a whole (tickets done, endpoints typed, lines covered), in the board’s done colour. Each line of tiles stands under its name, a rule between the lines; every number is one Stat (`boardTypes.ts`). Amends D86 and D88.',
    from: 'eagle-design D90',
  },
  {
    id: 'W102',
    title:
      'the board’s two cards of numbers fold, as every other board section does',
    held: '12 Nov · PM: “na Board daj zwijane te statystyki na górze”',
    says: 'PROJECT and REPOSITORY are each a FoldSection (`app/pages/common/FoldSection.tsx`), side by side on a wide screen, folded when the page opens like the columns, the contract and the ports; a link to `#project` or `#repository` opens one. Amends D86 and D90.',
    from: 'eagle-design D91',
  },
  {
    id: 'W103',
    title: 'the contract’s SHARED types fold, as the board’s sections do',
    held: '12 Nov · PM: “SHARED · What every endpoint uses => to zrób dropdown w api contracts”',
    says: 'SHARED is a FoldSection (`app/pages/contract/SharedTypes.tsx`), folded when the page opens; `#shared` opens it; Show the model’s notes sits inside it. Amends D91’s pattern to the contract page.',
    from: 'eagle-design D95',
  },
];

export { PLAN };
