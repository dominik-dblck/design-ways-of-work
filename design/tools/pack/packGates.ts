/**
 * - `refineGate` · no pack for a ticket failing refine-check or its track
 * - `typesFails` · every type the epic's bodies name is in blockModel.json
 * - `sourceFails` · no copy over the guard's scope before a feature is cut
 */
import type { ReadyKey } from '../../docs/process/plans.ts';
import type { Mirror } from '../../guards/checks/checkWorld.ts';
import { ownText } from '../../guards/checks/bundleText.ts';
import type { Cut } from './fileLines.ts';
import { READ_LINES, ticketOf } from './packText.ts';
import * as COMMANDS from '../../sheet/contract/commands.ts';
import * as QUERIES from '../../sheet/contract/queries.ts';
import * as REFINE_CHECK from '../../guards/refineCheck.ts';
import * as SOURCE_CHECK from '../../guards/sourceCheck.ts';
import * as TICKETS from '../../roadmaps/tickets.ts';
import * as TRACKS from '../../roadmaps/tracks.ts';
import { blockModel } from '../../sheet/contract/blockModel.ts';

type Ticket = ReturnType<typeof ticketOf>;
type Said = (line: string) => void;

const held = (ticket: Ticket): boolean =>
  ticket.status === 'doing' || ticket.status === 'done';

function refineFails(
  id: string,
  { cut, log }: { readonly cut: Cut; readonly log: Said },
): readonly string[] {
  const ticket = ticketOf(cut, id);
  const refine = REFINE_CHECK;
  if (!refine?.run(id).length) return [];
  const report = refine.report([id]);
  if (held(ticket))
    log(`refine-check · ${ticket.status}, reported not refused:\n${report}`);
  const clauses: Readonly<Partial<Record<ReadyKey, string>>> =
    TICKETS.checklistRead[id] ?? {};
  const missing = READ_LINES.filter((line) => !clauses[line]);
  return held(ticket)
    ? []
    : [
        report,
        ...(missing.length
          ? [
              `${id} · Checklist, read · no clause for ${missing.map((line) => `rule:${line}`).join(', ')} (tickets.ts · CHECKLIST_READ)`,
            ]
          : []),
      ];
}

function refineGate(
  ids: readonly string[],
  { cut, log }: { readonly cut: Cut; readonly log: Said },
): void {
  const tracks = TRACKS;
  const fails = [
    ...ids.flatMap((id) => refineFails(id, { cut, log })),
    ...ids.flatMap((id) =>
      (tracks?.check(id) ?? []).map((one) => `${id} · track · ${one.text}`),
    ),
  ];
  if (fails.length)
    throw new Error(
      `refine-check · not READY, no pack cut:\n${fails.join('\n')}`,
    );
}

const namesIn = (said: unknown): readonly string[] =>
  [
    ...String(said)
      .replace(/'[^']*'|"[^"]*"/g, '')
      .matchAll(/\b[A-Z][A-Za-z0-9]*\b/g),
  ].map((one) => one[0]);

const typeOf = (said: unknown): string => {
  const text = String(said);
  const at = text.indexOf(':');
  return at < 0 ? '' : String(text.slice(at + 1).split(' — ')[0]);
};

function definedIn(model: unknown): ReadonlySet<string> {
  const text = JSON.stringify(model);
  return new Set([
    'Record',
    'Partial',
    'Array',
    'Readonly',
    ...[...text.matchAll(/"name":"(\w+)"/g)].map((one) => String(one[1])),
    ...[...text.matchAll(/\btype (\w+)\s*=/g)].map((one) => String(one[1])),
  ]);
}

type Query = (typeof QUERIES)['all'][number];

interface Defined {
  readonly id: string;
  readonly defined: ReadonlySet<string>;
}

// the names a text uses that blockModel.json does not define
function undefinedIn(
  names: readonly string[],
  { id, defined, where }: Defined & { readonly where: string },
): readonly string[] {
  return names
    .filter((name) => !defined.has(name))
    .map(
      (name) =>
        `${id} · ${where} names ${name}, which blockModel.json does not define`,
    );
}

// a query's answer and each typed param
function queryFails(query: Query, known: Defined): readonly string[] {
  return [
    ...undefinedIn(namesIn(query.answer), {
      ...known,
      where: `${query.id}’s answer`,
    }),
    ...(query.params || []).flatMap(([name, said]) =>
      String(said).includes(':')
        ? undefinedIn(namesIn(typeOf(said)), {
            ...known,
            where: `${query.id}.${name}`,
          })
        : [`${known.id} · ${query.id}.${name} is not typed name: Type`],
    ),
  ];
}

// every type a body, a param or an answer of the epic names is defined in blockModel.json
function typesFails(
  ticket: Ticket,
  { log }: { readonly log: Said },
): readonly string[] {
  const known = {
    id: ticket.id,
    defined: definedIn(blockModel),
  };
  const commands = COMMANDS.all.filter((one) => one.epic === ticket.epic);
  const queries = QUERIES.all.filter(
    (query) =>
      query.epic === ticket.epic ||
      (ticket.read || []).some((ref) =>
        ref.startsWith(`queries.ts · ${query.id}`),
      ),
  );
  const fails = [
    ...commands.flatMap((one) =>
      String(one.body || '')
        .split(' · ')
        .flatMap((part) =>
          undefinedIn(namesIn(typeOf(part)), { ...known, where: one.id }),
        ),
    ),
    ...queries.flatMap((query) => queryFails(query, known)),
  ];
  log(
    `${ticket.id} · types checked · the epic’s bodies and ${queries.length} queries against ${known.defined.size} names in blockModel.json`,
  );
  return fails;
}

// the scan over the guard's scope and the files a requirement retires code in reads 0 copies
function sourceFails(
  ticket: Ticket,
  { mirror, log }: { readonly mirror: Mirror; readonly log: Said },
): readonly string[] {
  const guard = SOURCE_CHECK;
  const texts = Object.fromEntries(
    [...guard.scope, ...guard.targets()].map((file) => [
      file,
      ownText(file, mirror.readOr(file, '') ?? ''),
    ]),
  );
  const copies = guard.copies(guard.scan(texts));
  if (!copies.length) return [];
  const said = `${ticket.id} · one source of truth (rule:one-source-of-truth): ${copies.length} copies · ${guard
    .summary(copies)
    .slice(0, 12)
    .map((one) => `${one.what} ${one.n}`)
    .join(', ')}`;
  if (held(ticket)) log(`${said} — reported, not refused`);
  return held(ticket) ? [] : [said];
}

export { refineGate, sourceFails, typesFails };
