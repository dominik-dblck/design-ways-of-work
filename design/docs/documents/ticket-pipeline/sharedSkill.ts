/**
 * - `SHARED_SKILL` · `ticket/_shared.md`: what every ticket skill reads first
 */
import type { DocumentSection } from '../documentTypes.ts';
import { cite, citeLines } from '../cited.ts';
import { productStack } from '../../process/productStack.ts';

export const SHARED_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket/_shared.md`',
    lines: [
      '',
      "Rules that hold at every stage. Every skill's first task is to read this file; a stage that writes or",
      'reviews code then reads `ticket/_code.md`.',
      '',
    ],
  },
  {
    heading: '## The repository never writes to the design project',
    lines: [
      '',
      'The design project is the git repository' +
        cite('sharedSkill.designRepository') +
        ', a file named by its path from its root, read at',
      'the commit the design session names — `release <full sha>`, tagged `release-<yyyy-mm-dd>-<n>`, never HEAD;',
      '`git rev-parse release-<…>^{commit}` must equal it, or the run stops. A file comes through',
      '`yarn sheet:cache {file} --commit <sha>` (`cat-file blob <sha>:{file}`), a list or a size from `ls-tree`. Only read',
      'commands run there (`cat-file`, `ls-tree`, `rev-parse`; `log` or `diff --stat` between two named shas); a',
      "PreToolUse hook refuses the rest. The claude.ai artifact is the PM's render, not read here.",
      "The design session is the project's one writer (rule:build-side-never-writes-spec): `status` and `RECEIPTS` are set there, from the",
      'report. What has to change there is sent to it with `SendMessage`, never as a file; a decision only the PM',
      'can take goes to the PM.' + cite('sharedSkill.1'),
      '',
    ],
  },
  {
    heading: '## How the sheet is read',
    lines: [
      '',
      '0. **The pack first.** `fixtures/packs/{id}.md` on the design side is the ticket row, its edges, its',
      "   dependencies' receipts and the whole checklist in one file, with the module digest of `roadmaps/tickets.ts`",
      "   it was cut from (its entry and parts, as the release's record gives it). One read; when the record's digest",
      "   differs, window the ticket's epic part, `roadmaps/EXX/EXXTickets.ts`, alone. A pack may come in",
      '   parts (`fixtures/packs/{id}.2.md` on): the first names them all, and the run reads every one before recon.',
      '   `.sheet-cache/` is gitignored, so each stage reads the pack at the named commit with',
      '   `yarn sheet:cache fixtures/packs/{id}.md --commit <sha>` before `yarn ticket:read`, which exits 1 naming',
      '   the file when it is missing.' + cite('sharedSkill.2'),
      '1. **The section, never the file.** A read-list entry is `module · section`, the module named by its',
      "   short name and found at its path in the pack's table, The modules. Price a file by its size in",
      '   `ls-tree -l`, then window the saved copy.' + cite('sharedSkill.3'),
      '2. **Never re-read what you hold.** A file is read at the named commit, then its sha256 is checked',
      '   against the digest you hold: equal, take the disk copy; different, it is a newer sheet. At a newer named',
      '   commit, `git rev-parse <sha>:{path}` gives the blob id: a stage stops only when a file it holds',
      "   differs. Each stage opens by comparing the pack's digest with the one last sent; a mismatch stops.",
      "   `tickets.ts` is its entry and its parts: a ticket's row is in its epic's part, `roadmaps/EXX/EXXTickets.ts`.",
      '3. **A ticket is read with the script.** `yarn ticket:read {id} <file>` finds the row,',
      '   prints `acceptance.length`, diffs criteria against the pack the run started from, exits 1 when',
      '   the pack is behind. Nothing else reads the sheet.' +
        cite('sharedSkill.4'),
      '4. **Zero is not a count.** Before a negative result becomes a finding, make the same query find',
      '   something that must be there.' + cite('sharedSkill.5'),
      '5. **The design project is read once per stage**, at one named commit, through `yarn sheet:cache`',
      '   into `.sheet-cache/`; every later read takes the disk copy. One commit is one digest: no reader meets a',
      '   newer sheet halfway through a run' + cite('sharedSkill.6'),
      '',
    ],
  },
  {
    heading: '## Every number is parsed, never read',
    lines: [
      '',
      'A count a test or a contract depends on is extracted mechanically — `acceptance.length`, a parsed',
      "JSON grouped by kind, a fixture's own length — and checked against the criterion's literal. Nothing",
      'sent is a number read from prose or a sentence quoted from memory; both are asserted by containment',
      'against the file first.' + cite('sharedSkill.7'),
      '',
    ],
  },
  {
    heading: '## A question one side has the data for is answered there',
    lines: [
      '',
      'A count over the tree, an import, a git log — if this repository holds it, the question is a',
      'measurement made here, not sent.' + cite('sharedSkill.8'),
      '',
    ],
  },
  {
    heading: '## The pack is verified before every stage',
    lines: [
      '',
      'The read list and EXPECTED FILES are derived from the sheet’s data; EXPECTED',
      'FILES is a proposal recon confirms path by path. A pointer that does not resolve fails the cut on the design side.',
      'The design side re-cuts the pack in the same move as any sheet edit and sends the digest with the answer.',
      ...citeLines('sharedSkill.9'),
      '',
    ],
  },
  {
    heading: '## The line between the two sides',
    lines: [
      '',
      'The design side says what — values as tokens, states, parts, a layout line, what is forbidden. This',
      'side decides how — file, tier, props, DOM, ' +
        productStack.components.name +
        " slot — from the repository's conventions. A test asserts",
      'a value or a mechanism; a shape is checked by a reader at arch-review and snapshot, never parsed. A',
      'criterion that says how is a finding at recon.' + cite('sharedSkill.10'),
      '',
    ],
  },
  {
    heading: '## When something does not work, say so',
    lines: [
      '',
      '"I could not read X" is a fact about a tool call; "X cannot be read" is a claim about the world and',
      'needs proof. Never route around a failure through the next-best source as if it were the named one.',
      '',
    ],
  },
  {
    heading: '## A note is the current truth, never a chronicle',
    lines: [
      '',
      'When a later decision changes a fact an earlier note or D-row states, edit that row — never append a',
      'superseding entry. Git holds the history; the reader holds one document.' +
        cite('sharedSkill.11'),
      ...citeLines('sharedSkill.11+'),
      '',
    ],
  },
  {
    heading: '## No document repeats another',
    lines: [
      '',
      'Reading lives in the recon. Criteria and criterion → test live in the contract table (standard) or the',
      'contract snapshot (feature). Counts live in the report. A section that appears in two of them is fixed with a pointer, not a copy. A code comment',
      'follows `docs/rules/comments.md`.' + cite('sharedSkill.12'),
      '',
    ],
  },
  {
    heading: '## One pass at a time',
    lines: [
      '',
      'Work that splits — the recon by area, the endpoint tests by row, the arch-review by step, the regression by',
      'slice — runs as passes, one after another, in the main thread; no sub-agents for now. A pass is one aspect: it starts',
      "from the pack's path, its aspect and the pass files before it, writes",
      '`roadmaps/{epic}/{id}/passes/{stage}-{n}-{aspect}.md`, and only then does the next start. A pass sends nothing to',
      "the design side. The stage's document is written from the pass files and points at them, never repeats them;",
      'they go into the commit with it.' + cite('sharedSkill.13'),
      ...citeLines('sharedSkill.13+'),
      '',
    ],
  },
  {
    heading: '## Spellings that hold everywhere',
    lines: [
      '',
      '- **A story quote is verbatim from backlog.ts.** If the story does not describe the ticket, quote it',
      '  and add "placed here by the PM" — never paraphrase in a blockquote.' +
        cite('sharedSkill.14'),
      '- **A file is named from the repo root** — `app/api/documents/createDocumentRoute.ts`, never `createDocumentRoute.ts`; scans and',
      '  indexes match on the path (`tests/architecture/theDocsNameRealPaths.test.ts`).' +
        cite('sharedSkill.15'),
      '',
    ],
  },
  {
    heading: '## Decisions are written, design-side files compared',
    lines: [
      '',
      '- **A file the design side authors is compared, never described.** Where a criterion names one, it is read',
      '  at the release, hashed, and every count stated about it is parsed off the file',
      '  (`tests/architecture/everyFixtureRootIsHeld.test.ts`).' +
        cite('sharedSkill.16'),
      '- **A criterion that reads "X, or Y" is decided, never taken in silence:** the pick and why the other',
      '  lost go into the report as “did X because Y”.' +
        cite('sharedSkill.17'),
      '- **The decisions no criterion asked for** — every value, branch or shape chosen because the sheet was',
      '  silent, one line each with `file:line` — open the report (feature: the contract snapshot for the',
      "  contract's)." + cite('sharedSkill.18'),
      '',
    ],
  },
  {
    heading: '## The message shape',
    lines: [
      '',
      'Whenever anything goes back, it is written as the message itself — English, fenced, sent whole to the design session with `SendMessage`,',
      'with one line outside saying which gate it came from and whether it blocks. The block is',
      '`roadmaps/templates/ticket-recon.md · ## Questions`: `{id} · {stage} · {n} question(s)`, then per',
      'question — one line saying what cannot be decided, the sentence quoted with its file, what fires and',
      'why both readings survive, a table (shape · against it · cost in code) over A and B, **Recommended**',
      'with a check somebody can verify, **If it goes the other way**. Then, when non-empty: **Narrowings**',
      '(decisions already taken, "say if wrong") and **Findings** (wrong in the sheet — one touching a',
      'landed ticket names it: it costs a re-port). "Cleaner" is not a check.',
      '',
      '---',
      '',
    ],
  },
];
