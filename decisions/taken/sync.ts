/**
 * - `SYNC` · the sync with the build side: imports, reads, reports, as a design product took them first
 */
import type { Decision } from '../../scripts/decisionTypes.ts';

const SYNC: readonly Decision[] = [
  {
    id: 'W83',
    title:
      'a ticket names a module by its source, X.ts; the pack names each file by its path here',
    held: '5 Nov · file names in tickets · B, PM',
    says: 'An open ticket’s criteria, read list and edges, the epics’ code, the reads the sheet derives and the documents the build side reads (agent-instructions, ticket-pipeline, api-convention) name a module by its short name, `commands.ts · AddBlock`; its path lives once, in `tools/layout.ts`, so a file that moves touches no ticket. The pack names every file it quotes or lists by its path in this repository, `sheet/contract/commands/E02Groups.ts` where it printed `commands/E02Groups.ts`, a path neither the repository nor the artifact held, and ends with The modules: each short name it uses, its path, its parts and one digest. A module is its entry and the files bundled with it. A closed ticket keeps the X.js it was sent with and the grammar reads both; the pack refuses an X.js line. Amends D63’s gateRules.js. The sheet’s own text still says X.js (O22).',
    from: 'eagle-design D64',
  },
  {
    id: 'W84',
    title:
      'every file reads another module by import, the checks and the pack too',
    held: '5 Nov · PM, B (“lecimy całość B”); scope: “repo ma byc zoptymalizowane, artefakt tylko view only”',
    says: 'No source reads a sheet global: an entry is read through its namespace (`import * as MESSAGES`), a part by name, so a module is never undefined and its type is its own. The checks and the pack import what they read; the guard sees each entry’s direct imports (`module-imports.json`), presence guards and “load X first” throws are gone with the global, and so are lendSheet, loadSheet, packWorld, sheetOf and sheet/sheetGlobals.d.ts. Each entry still builds as a classic bundle setting its global for the legacy pages, which keep them until they leave; `guards/checks/legacyWorld.ts` is the one window the checks still run. Lost: an ES build with one shared chunk and module pages, chosen first, which would have moved pages the artifact retires (the artifact is the PM’s view; the wireframes and the board stay). Replaces types.md’s row naming sheetGlobals.d.ts.',
    from: 'eagle-design D71',
  },
  {
    id: 'W85',
    title: 'the pipeline names the build side’s scripts by their yarn command',
    held: '5 Nov · the repo session’s question on release 3.1 · PM, B',
    says: 'ticket-pipeline.md names a script of the build side by its command, never its file: `yarn sheet:cache`, `yarn ticket:read`, `yarn reports:check`. A file it renames, as its scripts go from .mjs to .ts, never touches the pipeline again, nor the skills the build side generates from it byte for byte. The rule that names a file from the repo root takes an example that is no script. A count in a stage file is read from the runner’s output alone: `assert-contract{id}.mjs` is a trail the build side stopped writing after T-E02-04 and has no command (the repo session, 5 Nov), so the pipeline names it no more. Lost: A, the paths as .ts (`node scripts/readTicket.ts`), which tied the pipeline to a file name only the build side owns.',
    from: 'eagle-design D72',
  },
  {
    id: 'W86',
    title: 'a check the types, a test or the build already holds goes',
    held: '5 Nov · O10, PM: C (“usuńmy rzeczy, które nam się już nie przydadzą”)',
    says: 'Four checks go, each held elsewhere: parse (tsc and the build compile every bundle, and part r runs every page), function names and one name in two files (aNameHasOneHome over every part, and modules share no global), and a bundle’s head (aFileStatesItsJob over its entry). Every other check stays: each reads data or a string no type reaches — a pointer, an id once, the cases and journeys, a snapshot, a page, a sentence. Closes O10.',
    from: 'eagle-design D73',
  },
  {
    id: 'W87',
    title:
      'a second product runs the same way of working: four repositories, the way of working a package',
    held: '8 Nov · PM',
    says: 'Argus, the FinCrime review tool whose backend another team builds in Kotlin, gets its front end the way Eagle is built: argus-design (the spec, one writer) and argus-dev (the front end on Argus’s REST), beside eagle-design and eagle-dev, four repositories, each design side apart from its build side so the writer’s boundary is the repository’s (D2) and a release is a tag the build side reads by sha (D6). The way of working (tools, checks, skills, rules, pages) becomes a package eagle-design publishes and argus-design takes by version, so a fix to it lands once: D61’s copy stands for what is the product’s own. Each product its own sessions, so each context holds one product. Lost: one design repository for both products (one context for two, the homes split per product); the design inside the build repository (the boundary a convention, two sessions in one tree); a second copy of the way of working (fixes carried by hand).',
    from: 'eagle-design D75',
  },
  {
    id: 'W88',
    title:
      'one way-of-working repository, its rules the design side’s, steering every build side',
    held: '8 Nov · PM',
    says: 'The way of working lives in its own repository, way-of-working, private as the design repositories are: eagle-design and argus-design link it by path, with no package and no registry (D75’s package retires). It holds the design side’s way of working and the build side’s, the code rules among them: D38 turns, the design side writes how code is written for every build side, and each build side sends what its architecture review finds as a proposal. The rules reach a build repository the way ticket-pipeline.md does: written from data, carried by its product’s release, taken by digest, its own generator writing them there, so crm-workflow and argus-dev install anywhere. One writer: the eagle-design session writes way-of-working; argus-design proposes. Lost: the build side’s rules kept by one build side (one build side ruling the other); a build repository linking the private one by path (it breaks for anyone else who clones it).',
    from: 'eagle-design D76',
  },
];

export { SYNC };
