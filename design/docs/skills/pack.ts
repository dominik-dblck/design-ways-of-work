/**
 * - `skill` · design-pack: what it does, when to use it, its sections
 */
import type { SkillFile } from './skillTypes.ts';

const skill: SkillFile = {
  title: 'design-pack · one ticket, from refinement to its pack',
  description:
    'Takes one ticket from refinement to the pack the build side receives: its criteria and edges, its reader lines, the scripts that refuse it, the cut, and what comes back per mode. Use when a ticket is refined, made READY, or its pack is cut or re-cut.',
  intro:
    'One ticket in hand at a time (RULES). The pack is what the build side receives — read it.',
  sections: [
    {
      heading: 'One ticket, start to finish',
      lead: null,
      first: 1,
      lines: [
        'Refine N+1 while the build side builds N. Never the one in hand. `rule:one-ticket-at-a-time`',
        'One criterion = one test. Names what a file must HOLD, never that it exists. ≤ 600 characters; history goes to the note. `rule:one-criterion-one-test, rule:criterion-is-only-the-assertion, rule:criterion-says-what-file-holds`',
        'Every count is dated and made against the sheet as it is now — a split re-counts. `rule:a-count-carries-its-date`',
        'Every criterion has an edge beside it: two or three options on a named axis, each solving the whole problem with no defect left and its cost written out, pick, why the others lost, `into`. `rule:every-case-has-an-edge, rule:decide-one-point-at-a-time`',
        '`why` for the PM: today · after · unlocks · not · oneLine. Product words, no paths. `rule:why-for-the-pm`',
        'Note names EXPECTED FILES from the repo root. `rule:note-lists-files-touched`',
        'A draft the ticket builds goes in the pack with its pictures and its difference from the pinned package version; the report that builds it retires it. `rule:draft-until-built`',
        'CHECKLIST_READ[id]: one clause per reader line (2, 5, 8, 10–14, 19, 21–23). Recon confirms or contradicts each; a contradicted one blocks the contract. `rule:regex-lines-run-as-code`',
        'Run `refine-check` → `spec-check` → the feature’s combinations (deadEnds: 0 dead, 0 conflicts) → `yarn cut-pack` (`tools/pack.ts`). A finding refuses the pack. The pack is what the build side receives — read it. `rule:pack-read-before-ready, rule:regex-lines-run-as-code, rule:spec-check-before-ready`',
        'Recon → answer in the sheet first, re-cut the pack in the SAME move, then the block. Every block carries the digests.',
        "What comes back, per mode — **feature:** contract snapshot → read against the sheet, a moved row with its digest (with `reconStop`, the recon's questions first) · report. **Standard:** recon + contract table → accept or move a criterion (and its row) · report. **Fast:** report. Every report → its “did X because Y” read, RECEIPTS + CAVEATS (with `until`) + STATUS in one edit, next ticket → doing.",
      ],
    },
    {
      heading: 'Before READY · what the scripts refuse',
      lead: null,
      first: null,
      lines: [
        '`guards/refine-check.ts` · the checklist rules a regex reads, each finding named by its rule’s key (rule:regex-lines-run-as-code) — mechanically; every other rule is the reader’s, ticked in the pack under Checklist, read.',
        '`sheet/cases/test-cases.ts` + `sheet/cases/journeys.ts` · the test cases are generated from the rows, each with its reach (shown, guarded, api); the journeys are data, covers per step · `Journeys.check` empty before a feature ticket is READY (JR2–JR4) · refine-check’s rule:journeys-in-one-grammar still parses the old one-line journey grammar, until `sheet/cases/journeys.ts` holds it.',
        '`guards/spec-check.ts` · parts exist, tokens declared, no hex outside gate-dot, canon states or `skip`, wrapper paths follow the tier, `layout` on every molecule, an organism’s parts named after it.',
        "`tools/pack.ts` · verbatim, one path per basename, refuses a todo ticket with findings. Each section is cut from `{home}/{name}.ts` or one of its parts and carries that file's sha256; the pack is one file. A `whole` pointer travels whole, file by file. Every file a root loads, and every fixture the repository holds, travels with its digest (The files the roots load).",
        '`guards/source-check.ts` · after every change `SourceCheck.ratchet` reads 0 (no kind of copy above its baseline; a retired `replaces` still in its file fails) · zero copies before a feature ticket is READY; `tools/pack.ts` refuses the pack. `rule:one-source-of-truth`',
      ],
    },
    {
      heading: 'The cut',
      lead: null,
      first: null,
      lines: [
        "`yarn cut-pack {id}` (build, then `tools/pack.ts` and its parts in `tools/pack/`) — one file, `fixtures/packs/{id}.md`, each section cut from `{home}/{name}.ts` and its parts under that file's sha256; the world it checks is the bundles in `dist/project/`; refine-check inside it; a refusal is a finding, the pack is not sent. It removes an older cut's `{id}.2.md` (publish it as `null`).",
        'A sheet edit, its re-cut pack and its digests go out in the same move (`design-publish`).',
      ],
    },
  ],
};

export { skill };
