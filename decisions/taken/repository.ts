/**
 * - `REPOSITORY` · the repository, the sessions, how the build side reads, as a design product took them first
 */
import type { Decision } from '../../scripts/decisionTypes.ts';

const REPOSITORY: readonly Decision[] = [
  {
    id: 'W32',
    title: 'one source of truth',
    held: '3 Nov · A',
    says: 'this artifact is the design project. The Claude Design copy is the archive until it closes; nothing is written there. RULES 66.',
    from: 'eagle-design D1',
  },
  {
    id: 'W33',
    title: 'two sessions, one writer',
    held: '3 Nov',
    says: 'the design session is a local Claude Code in `~/projects/eagle-design`, and it alone publishes to this artifact. The repo session (mailing-automation) reads only. The repo session sends its messages to the design session with `SendMessage`, never as a file in the project; the design session answers it the same way; a decision goes to the PM. RULES 37 holds.',
    from: 'eagle-design D2',
  },
  {
    id: 'W34',
    title: 'how the build side reads',
    held: '3 Nov',
    says: "`ticket-pipeline.md · _shared.md` — the Artifact tool's `read`, the file by its path, then its sha256 against the digest held, as it was with `get_file`. Never publish, delete, comment or write data. Messages go back with `SendMessage` (the message shape, the contract snapshot). ticket-pipeline.md `ba36b983…` (3 Nov).",
    from: 'eagle-design D3',
  },
  {
    id: 'W35',
    title: 'the git repository is the source',
    held: '3 Nov · A, replaces D1',
    says: "`~/projects/eagle-design` (remote `github.com/dominik-dblck/eagle-design`, private) holds the design project under `project/`, path for path as the artifact does. The artifact is the PM's render: the PM's browser edits come back by a three-way merge on the last published commit (`tools/pm-edits.mjs`). RULES 66 holds: one home, the repository.",
    from: 'eagle-design D5',
  },
  {
    id: 'W36',
    title: 'the build side reads by commit',
    held: '3 Nov · B, replaces D3 once switched',
    says: "the design session names a release, `release <full sha>` tagged `release-<yyyy-mm-dd>-<n>`; the build side reads `git cat-file blob <sha>:project/{file}` and checks each file's sha256; a stage stops only when a file it holds differs. A released commit is never rewritten (no amend, rebase or force push on `main`). The build side runs read commands only there, held by its PreToolUse hook (PM: yes). `ticket-pipeline.md · _shared.md` carries it. D3 stands until the build side's switch commit (its skills regenerated from that text, its scripts read by commit, its fixture manifests record the commit) lands on the PM's yes.",
    from: 'eagle-design D6',
  },
  {
    id: 'W37',
    title: "the design project's own code",
    held: '3 Nov',
    says: "TypeScript with the repository's tooling (yarn, prettier, strict TS, type-aware eslint, husky, vitest, atomic design, architecture tests) and its own `docs/rules/` (11 files adapted from mailing-automation's); React pages built locally, the artifact gets the build. The sheet's JS moves file by file; until it moves, lint leaves it out. A React trial: `poc/react-wireframes`.",
    from: 'eagle-design D7',
  },
  {
    id: 'W38',
    title: "the ticket pipeline's shared rules in two files",
    held: '3 Nov · B',
    says: '`_shared.md` holds what every stage reads (at most 2000 words, 25 Oct); `_code.md` the rules for writing and reviewing code, read by the stages that do; a rule a test of the repository holds is a pointer to that test. `ticket-pipeline.md`, release 2.',
    from: 'eagle-design D8',
  },
  {
    id: 'W39',
    title: 'passes run in the main thread',
    held: '3 Nov',
    says: 'no sub-agents for now. `ticket-pipeline.md · One pass at a time`.',
    from: 'eagle-design D9',
  },
  {
    id: 'W40',
    title: 'what a package gives comes from the package',
    held: '3 Nov',
    says: "an icon is named by its `lucide` name and drawn from the package, never from a copied SVG. A page takes `lucide-react` when it moves to React (D7); `lucide-icons/`, `ds-icons/` and the screens' copies go with the last page that reads them (3 Nov · A).",
    from: 'eagle-design D10',
  },
  {
    id: 'W41',
    title: 'history lives in git',
    held: '3 Nov · A',
    says: "the project keeps what a page, a check or the pack generator reads, and the design session's working files; no messages, reports or uploads. The rest is at the tag `archive-claude-design-2`: `git grep -n X archive-claude-design-2 -- project/`.",
    from: 'eagle-design D11',
  },
];

export { REPOSITORY };
