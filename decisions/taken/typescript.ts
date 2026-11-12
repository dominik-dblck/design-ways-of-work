/**
 * - `TYPESCRIPT` · the project in TypeScript, how its modules are read, as a design product took them first
 */
import type { Decision } from '../../scripts/decisionTypes.ts';

const TYPESCRIPT: readonly Decision[] = [
  {
    id: 'W42',
    title: 'TypeScript only',
    held: '3 Nov · A',
    says: "no `.js` stays in git: each sheet file becomes `project/{name}.ts` where its `.js` stood, and the build side reads the `.ts` by commit. The build writes `dist/project/` (outside git) for the artifact's pages and the checks. The PM edits nothing by hand: the PM's-edits pull leaves the session start. Replaces Q1 · A.",
    from: 'eagle-design D12',
  },
  {
    id: 'W43',
    title: 'a file holds one job, at most 200 lines',
    held: '3 Nov · B',
    says: 'a sheet file past 200 lines is split by its jobs, data included: `project/{name}.ts` is the entry the pages load, its parts sit in `project/{name}/` (`tickets/E18.ts`, `glossary/modelTerms.ts`), and the build bundles each entry with its parts into one `dist/project/{name}.js`. No exception for data (mailing-automation · `docs/rules/size.md`). The parts are the one home, never a copy (O7).',
    from: 'eagle-design D13',
  },
  {
    id: 'W44',
    title: 'an entry exports its API',
    held: '3 Nov · B, PM in the repo session',
    says: "the build side imports `project/{name}.ts` and its parts as modules, with no loader and no build step. An entry's named exports are its API; the bundle names them after the file (`sheetStatus.ts` → `SheetStatus`) and sets the global the pages and the checks read. Importing a file writes nothing outside itself; erasable syntax only; an entry and its parts import each other by relative path with the extension; no DOM or window read at a module's top level; the layout stays as it is. The build side holds 26 sheet files (glossary, threads, payloads and measure among them): it reads the release-2 bytes until release 3 brings the `.ts`.",
    from: 'eagle-design D14',
  },
  {
    id: 'W45',
    title: 'the repository keeps the core',
    held: '3 Nov, PM',
    says: 'what was built for Claude Design and for plain JS goes, and a hand-written check whose job TypeScript or a test now does is handed to them; checked as each file is cleaned or moved, step by step, not in one sweep. The core is the specification: the sheet\'s data, its rules, the contract, the pages the PM reads and the pack. The design session decides what goes overnight and writes each call in `notes/overnight-3-nov.md` for the PM to confirm (3 Nov, PM: "podejmuj decyzje sam i zbieraj notatki").',
    from: 'eagle-design D16',
  },
];

export { TYPESCRIPT };
