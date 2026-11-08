/**
 * - `selfFails` · a pack against its sources: every criterion, edge, receipt and
 * - checklist line verbatim, every pointer expanded, each section where it was
 * - asked, every digest live, every quoted section in its file
 */
import type { Cut } from './fileLines.ts';
import { sha256 } from './packSources.ts';
import { declaredName } from './sheetSections.ts';
import type { ticketOf } from './packText.ts';
import { readyRows } from './packText.ts';
import * as EDGES from '../../roadmaps/edges.ts';
import * as RECEIPTS from '../../roadmaps/receipts.ts';

type Ticket = ReturnType<typeof ticketOf>;

const entryOf = (expanded: string, ref: string): string =>
  String(String(expanded.split(`### ${ref}\n`)[1] ?? '').split('\n### ')[0]);

const normal = (text: string): string =>
  text.toLowerCase().replace(/[’']/g, "'");

// the row, the edges, the receipts and the checklist as the sheet holds them
function rowFails(
  ticket: Ticket,
  { md }: { readonly md: string },
): readonly string[] {
  const id = ticket.id;
  const edges = EDGES.byTicket[id] ?? [];
  const receipts = RECEIPTS.receipts;
  const checklist = readyRows();
  return [
    ...ticket.acceptance.flatMap((said, at) =>
      md.includes(`### c${at + 1}\n\n> ${said}\n`)
        ? []
        : [`${id} c${at + 1} not verbatim`],
    ),
    ...((md.match(/^### E\d+ · on c\d+$/gm) ?? []).length === edges.length
      ? []
      : [`${id} edges count`]),
    ...(ticket.depends || []).flatMap((one) => {
      const receipt = receipts[one];
      return receipt && !md.includes(JSON.stringify(receipt, null, 1))
        ? [`${id} receipt ${one}`]
        : [];
    }),
    ...checklist.flatMap((line) =>
      md.includes(`rule:${line.id} · ${line.says}`)
        ? []
        : [`${id} rule:${line.id}`],
    ),
  ];
}

// a section a named pointer quotes starts at one of the names it was asked for
function startFails(
  ticket: Ticket,
  { expanded, cut }: { readonly expanded: string; readonly cut: Cut },
): readonly string[] {
  return (ticket.read || []).flatMap((ref) => {
    const core = String(ref.split(/\s+—\s+/)[0]);
    const sources = cut.reader.sourcesOf(String(core.split(/\s+·\s+/)[0]));
    const want = core
      .split(/\s+·\s+/)
      .slice(1)
      .join(' · ')
      .replace(/\s*\([^)]*\)/g, '');
    const terms = want
      .split(/\s+and\s+|,\s*|\s·\s/)
      .map((one) => one.replace(/^the\s+/i, '').trim())
      .filter(Boolean)
      .flatMap((term) => [term, declaredName(sources, term) ?? []].flat());
    if (!terms.length || /\bwhole\b/i.test(want)) return [];
    const starts = [
      ...entryOf(expanded, ref).matchAll(
        /```(?:ts|js|json|md|css|html)\n((?:[^\n]*\n){1,3})/g,
      ),
    ].map((one) => normal(String(one[1])));
    return starts
      .filter(
        (start) =>
          !terms.some(
            (term) =>
              start.includes(normal(term)) ||
              start.includes(normal(term).replace(/\s+/g, '_')),
          ),
      )
      .map(
        (start) =>
          `${ticket.id} · a section of ${ref.slice(0, 50)} starts elsewhere: ${String(start.split('\n')[0]).trim().slice(0, 80)}`,
      );
  });
}

// each pointer expanded; a journey the epic's; a sheet row with its digest
function entryFails(ticket: Ticket, expanded: string): readonly string[] {
  return (ticket.read || []).flatMap((ref) => {
    const entry = entryOf(expanded, ref);
    const hasJourney =
      /^journeys\.ts · J\d+/.test(ref) &&
      !entry.includes(`epic: '${ticket.epic}'`) &&
      !entry.includes(`"epic": "${ticket.epic}"`);
    const hasRow =
      /^(commands|queries|refusals|events|glossary)\.ts · /.test(ref) &&
      !/sha256 [0-9a-f]{64}/.test(entry);
    return [
      ...(expanded.includes(`### ${ref}\n`)
        ? []
        : [`${ticket.id} no expansion: ${ref.slice(0, 40)}`]),
      ...(hasJourney ? [`${ticket.id} · a journey of another epic: ${ref}`] : []),
      ...(hasRow ? [`${ticket.id} · no digest on ${ref.slice(0, 50)}`] : []),
    ];
  });
}

// a digest names its file's live bytes, and each section under it is in that file
function digestFails(
  ticket: Ticket,
  { expanded, cut }: { readonly expanded: string; readonly cut: Cut },
): readonly string[] {
  return [
    ...expanded.matchAll(/^_([^_\n]+)_ · (.*?)sha256 ([0-9a-f]{12,64})…?/gm),
  ].flatMap((head) => {
    const file = String(head[1]);
    const live = cut.reader.read(file);
    if (live === null) return [];
    const rest =
      expanded.slice(head.index + head[0].length).split('\n### ')[0] ?? '';
    const under = rest.split(/\n_[^_\n]+_ · /)[0] ?? '';
    const quoted = [...under.matchAll(/```[a-z]*\n([\s\S]*?)\n```/g)].map(
      (one) => String(one[1]),
    );
    return [
      ...(sha256(live).startsWith(String(head[3]))
        ? []
        : [`${ticket.id} digest ${file}`]),
      ...quoted
        .filter((one) => !live.includes(one))
        .map(() => `${ticket.id} section not verbatim in ${file}`),
    ];
  });
}

function selfFails(
  ticket: Ticket,
  { md, cut }: { readonly md: string; readonly cut: Cut },
): readonly string[] {
  const expanded = md.split('## The read list, expanded')[1] ?? '';
  return [
    ...rowFails(ticket, { md }),
    ...entryFails(ticket, expanded),
    ...startFails(ticket, { expanded, cut }),
    ...digestFails(ticket, { expanded, cut }),
  ];
}

export { selfFails };
