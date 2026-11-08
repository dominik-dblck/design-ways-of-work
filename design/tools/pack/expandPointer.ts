/**
 * - `expandPointer` · one read-list pointer resolved to its text: a sheet row,
 * - a ticket and its criteria, a repo path, files, a derived journey, a design
 * - file's sections; what it cannot read fails the cut
 */
import { expandFile } from './expandFile.ts';
import { buildPaths } from '../../sheet/project.ts';
import type { Cut } from './fileLines.ts';
import { namedLine } from './fileLines.ts';
import { sheetDigest } from './packSources.ts';
import * as JOURNEYS from '../../sheet/cases/journeys.ts';
import * as RECEIPTS from '../../roadmaps/receipts.ts';
import * as TICKETS from '../../roadmaps/tickets.ts';

const REPO = new RegExp(
  `^(${buildPaths.map((one) => one.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
);

// a row of a sheet file travels verbatim too, with its file's digest
const ROW_KINDS = /^(command|query|refusal|event|term|target)$/;

const coreOf = (ref: string): string => String(ref.split(/\s+—\s+/)[0]).trim();

// the sheet's own reading of the pointer: a row's title and body
function resolvedLines(ref: string): readonly string[] | null {
  const read = TICKETS.resolve(ref);
  if (!read?.body || read.kind === 'file' || read.kind === 'text') return null;
  return [`_${read.kind}_ · ${read.title}`, '', read.body, ''];
}

// a criterion as it now reads: a landed ticket's criterion re-ported in this run
function criterionLine(
  said: unknown,
  {
    name,
    ref,
    cut,
  }: { readonly name: string; readonly ref: string; readonly cut: Cut },
): readonly string[] {
  if (said === undefined) cut.miss(`${ref} · ${name} not found`);
  if (said === undefined) return [];
  const text =
    typeof said === 'string'
      ? said
      : String(Reflect.get(Object(said), 'text') || JSON.stringify(said));
  return [`- ${name} · ${text}`];
}

type Ticket = ReturnType<(typeof TICKETS)['all']>[number];

// a ticket's line and its receipt's
function ticketHead(ticket: Ticket): readonly string[] {
  const receipt = RECEIPTS.receipts[ticket.id];
  const why = ticket.why?.oneLine ? ` · ${ticket.why.oneLine}` : '';
  return [
    `_ticket_ · ${ticket.title} · status ${ticket.status}${why}`,
    '',
    receipt ? `receipt: \`${JSON.stringify(receipt)}\`` : 'no receipt',
    '',
  ];
}

// a ticket, its receipt, and the criteria the pointer names
function ticketLines(ref: string, cut: Cut): readonly string[] | null {
  const id = /^(T-E\d\d-\d\d)\b/.exec(ref)?.[1];
  const ticket = TICKETS?.all().find((one) => one.id === id);
  if (!ticket) return null;
  const named = /·\s*(c\d+(?:\s*,\s*c\d+)*)\s*$/.exec(coreOf(ref))?.[1];
  const criteria = (named ?? '')
    .split(/\s*,\s*/)
    .filter(Boolean)
    .flatMap((name) =>
      criterionLine((ticket.acceptance || [])[Number(name.slice(1)) - 1], {
        name,
        ref,
        cut,
      }),
    );
  return [...ticketHead(ticket), ...(named ? [...criteria, ''] : [])];
}

// a list of design files: each source named with its size and whole digest
function filesLines(ref: string, cut: Cut): readonly string[] | null {
  const name = String.raw`[\w.\/ -]+\.(?:ts|json|md|css)`;
  if (!new RegExp(`^${name}(?:\\s*,\\s*${name})+$`).test(ref)) return null;
  const files = ref.split(/\s*,\s*/);
  return [
    `_files_ · ${files.length} · each named with its size and whole digest — fetch and check it`,
    '',
    ...files.flatMap((file) => {
      const sources = cut.reader.sourcesOf(file);
      return sources.length
        ? sources.map(namedLine)
        : [`- ${file} · not found here`];
    }),
    '',
  ];
}

// a journey expanded at load, one per built type: the data, and the two sheets it is made from
function derivedLines(ref: string, cut: Cut): readonly string[] | null {
  const named = /^journeys\.ts · (J\d+-[\w-]+) \((E\d\d)\)$/.exec(coreOf(ref));
  const journeys = JOURNEYS;
  if (!named || !journeys) return null;
  const journey = journeys
    .journeysOfEpic(String(named[2]))
    .find((one) => one.id === named[1]);
  if (!journey) cut.miss(`${ref} · not expanded`);
  if (!journey) return [];
  const digest = (file: string): string => {
    const sources = cut.reader.sourcesOf(file);
    return `${sources[0]?.path ?? file} and its ${sources.length - 1} parts sha256 ${sheetDigest(sources)}`;
  };
  return [
    `_derived_ · expanded at load by journeys.ts · perType, off its type’s row in content-types.ts · ${digest('journeys.ts')} · ${digest('content-types.ts')} (each over its files' paths and bytes in path order)`,
    '',
    '```json',
    JSON.stringify(journey, null, 1),
    '```',
    '',
  ];
}

// a design file and the place in it, by the sheet's one grammar (`Tickets.filePointer`)
function namedFileLines(ref: string, cut: Cut): readonly string[] | null {
  const named = TICKETS.filePointer(ref);
  if (!named) return null;
  if (/\.js$/.test(named.file))
    cut.miss(
      `${ref} · a module is named by its source, ${named.file.replace(/\.js$/, '.ts')}`,
    );
  return expandFile(ref, {
    file: named.file,
    want: named.place ?? undefined,
    cut,
  });
}

function otherLines(ref: string, cut: Cut): readonly string[] {
  if (REPO.test(ref) || /,\s*(scripts|docs|app)\//.test(ref))
    return ['_repo_ · read locally; this side holds no copy', ''];
  if (/^packs\//.test(ref))
    return ['_this file_ · the pack you are reading', ''];
  const read =
    filesLines(ref, cut) ??
    derivedLines(ref, cut) ??
    namedFileLines(ref, cut);
  if (read) return read;
  if (/\.(?:ts|js|json|md|css)\b/.test(coreOf(ref)))
    cut.miss(`${ref} · names a design file the pack cannot read`);
  return ['_pointer_ · not a file or a ticket; read as named', ''];
}

function expandPointer(ref: string, cut: Cut): string {
  const resolved = resolvedLines(ref);
  const kind = TICKETS.resolve(ref).kind ?? '';
  const head = [`### ${ref}`, '', ...(resolved ?? [])];
  if (resolved && !ROW_KINDS.test(kind)) return head.join('\n');
  const rest = ticketLines(ref, cut) ?? otherLines(ref, cut);
  return [...head, ...rest].join('\n');
}

export { expandPointer };
