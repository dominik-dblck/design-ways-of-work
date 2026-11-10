/**
 * - `packText` · one read of a ticket, every pointer expanded, the files it loads
 * - `READ_LINES`, `ticketOf` · the checklist lines a reader confirms, a ticket
 * - `readyRows` · the checklist's lines, then the rules it cites
 */
import type { ReadyKey, RuleRow } from '../../docs/process/plans.ts';
import type { Mirror } from '../../guards/checks/checkWorld.ts';
import { expandPointer } from './expandPointer.ts';
import type { Cut } from './fileLines.ts';
import { loadedSection } from './loadedFiles.ts';
import { modulesSection } from './moduleTable.ts';
import { bytesOf, sheetDigest } from './packSources.ts';
import * as EDGES from '../../roadmaps/edges.ts';
import * as PLANS from '../../docs/process/plans.ts';
import * as RECEIPTS from '../../roadmaps/receipts.ts';
import * as REFINE_CHECK from '../../guards/refineCheck.ts';
import * as TICKETS from '../../roadmaps/tickets.ts';
import * as TRACKS from '../../roadmaps/tracks.ts';

type Ticket = ReturnType<(typeof TICKETS)['all']>[number];

// the lines a regex cannot read, one clause each, written at refinement
const READ_LINES: readonly ReadyKey[] = [
  'expected-side-from-criterion',
  'say-what-it-does-not-do',
  'decisions-named-in-criteria',
  'write-the-hardest-shape',
  'grep-the-contract-for-types',
  'shared-policy-is-a-rule',
  'next-ticket-refined-first',
  'grep-the-old-sentence',
  'snapshot-opens-with-decisions',
  'criterion-verbatim-in-contract',
  'rule-wording-survives-scans',
  'wireframe-read-against-spec',
];

// what a ticket is read against before READY: the checklist's own lines and the rules it cites
function readyRows(): readonly RuleRow[] {
  const plans = PLANS;
  const cited = new Set<string>(plans?.checklistCites ?? []);
  return [
    ...(plans?.ticketChecklist ?? []),
    ...(plans?.rules ?? []).filter((rule) => cited.has(rule.id)),
  ];
}

function ticketOf(cut: Cut, id: string): Ticket {
  const ticket = TICKETS?.all().find((one) => one.id === id);
  if (!ticket) throw new Error(`no ticket ${id}`);
  return ticket;
}

function trackOf(cut: Cut, ticket: Ticket): string {
  const track = TRACKS.of(ticket.id);
  if (track)
    return `${track.track} (${track.points} points, tracks.ts)${track.reconStop ? ' · reconStop' : ''}`;
  return ticket.kind === 'feature'
    ? 'feature (by kind)'
    : 'not set — standard by default';
}

function headLines(cut: Cut, ticket: Ticket): readonly string[] {
  const sources = cut.reader.sourcesOf('tickets.ts');
  const bytes = sources.reduce((sum, one) => sum + bytesOf(one.text), 0);
  const found = REFINE_CHECK.run(ticket.id) ?? [];
  const refined = found.length
    ? `${found.length} findings (${ticket.status}, reported not refused — the design side owes them before the next stage)`
    : 'clean';
  return [
    `# ${ticket.id} · pack · ${new Date().toISOString().slice(0, 10)}`,
    '',
    `> One read of the ticket: the row, its edges, its dependencies' receipts, the checklist, and every design-side pointer of the read list expanded to its text. Generated on the design side (tools/pack.ts) from roadmaps/tickets.ts and its ${sources.length - 1} parts, sha256 \`${sheetDigest(sources)}\` over their paths and bytes in path order (${bytes} bytes) — staleness is checked where the pack is cut: regenerate and compare this digest; a pack whose digest differs from a fresh cut is stale and the row is windowed instead (contract 10 · C3 · A). Each expanded file is named by its path in this repository and carries its own sha256, of its bytes as the release's commit holds them (git cat-file blob <sha>:<path>); a file named by its short name (X.ts) is under The modules at the end.`,
    `> Epic ${ticket.epic} · story ${ticket.story} · kind ${ticket.kind} · status ${ticket.status} · depends ${JSON.stringify(ticket.depends || [])} · track ${trackOf(cut, ticket)}`,
    '',
    `> refine-check · ${refined} · the checklist rules a regex reads run as code (rule:regex-lines-run-as-code); the reader's are under Checklist, read`,
    '',
  ];
}

function rowLines(ticket: Ticket): readonly string[] {
  const why = ticket.why;
  const read = ticket.read || [];
  return [
    `## ${ticket.title}`,
    '',
    `acceptance.length = ${ticket.acceptance.length}`,
    '',
    ...ticket.acceptance.flatMap((said, at) => [
      `### c${at + 1}`,
      '',
      `> ${said}`,
      '',
    ]),
    `## Read list · ${read.length} pointers, design-side ones expanded below`,
    '',
    ...read.map((ref) => `- ${ref}`),
    '',
    ...(ticket.note ? ['## Note', '', ticket.note, ''] : []),
    ...(why
      ? [
          '## Why',
          '',
          ...(['today', 'after', 'unlocks', 'not', 'oneLine'] as const).flatMap(
            (key) => (why[key] ? [`- **${key}** · ${why[key]}`] : []),
          ),
          '',
        ]
      : []),
  ];
}

// the checklist's read lines; recon confirms or contradicts each against the repository
function checklistReadLines(cut: Cut, ticket: Ticket): readonly string[] {
  const clauses: Readonly<Partial<Record<ReadyKey, string>>> =
    TICKETS.checklistRead[ticket.id] ?? {};
  return [
    `## Checklist, read · ${READ_LINES.length} rules for recon to confirm`,
    '',
    ...READ_LINES.map(
      (line) =>
        `- **rule:${line}** · ${clauses[line] || 'NOT WRITTEN — the design side owes this clause; recon treats a missing clause as contradicted'}`,
    ),
    '',
  ];
}

function edgeLines(cut: Cut, ticket: Ticket): readonly string[] {
  const edges = EDGES.byTicket[ticket.id] ?? [];
  return [
    `## Edges · ${edges.length}`,
    '',
    ...edges.flatMap((edge, at) => [
      `### E${at + 1} · on c${edge.on}`,
      '',
      `**${edge.edge}**`,
      '',
      ...Object.entries(edge.options || {}).map(
        ([key, said]) => `- ${key} · ${said}`,
      ),
      '',
      `pick **${edge.pick}** · ${edge.why}${edge.into ? ` · into: ${edge.into}` : ''}`,
      '',
    ]),
  ];
}

function receiptLines(cut: Cut, ticket: Ticket): readonly string[] {
  const depends = ticket.depends || [];
  const receipts = RECEIPTS.receipts ?? {};
  return [
    '## Receipts of dependencies',
    '',
    ...(depends.length ? [] : ['none', '']),
    ...depends.flatMap((id) => {
      const receipt = receipts[id];
      return [
        `### ${id}`,
        '',
        receipt
          ? '```js\n' + JSON.stringify(receipt, null, 1) + '\n```'
          : '_no receipt — not done_',
        '',
      ];
    }),
  ];
}

function packText(
  id: string,
  { cut, mirror }: { readonly cut: Cut; readonly mirror: Mirror },
): string {
  const ticket = ticketOf(cut, id);
  const checklist = readyRows();
  const lines = [
    ...headLines(cut, ticket),
    ...rowLines(ticket),
    ...checklistReadLines(cut, ticket),
    ...edgeLines(cut, ticket),
    ...receiptLines(cut, ticket),
    `## TICKET_CHECKLIST · ${checklist.length} lines`,
    '',
    ...checklist.flatMap((line) => [`rule:${line.id} · ${line.says}`, '']),
    '## The read list, expanded',
    '',
    "Every pointer above, resolved on this side. A _repo_ entry is the build side's to read; everything else is the text the ticket points at, with the digest of the file it was cut from.",
    '',
    ...(ticket.read || []).map((ref) => expandPointer(ref, cut)),
  ];
  const text = lines.join('\n');
  return [
    ...lines,
    loadedSection(text, { cut, mirror }),
    modulesSection(text, cut),
  ].join('\n');
}

export { packText, READ_LINES, readyRows, ticketOf };
