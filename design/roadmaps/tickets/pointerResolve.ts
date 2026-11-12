/**
 * - `resolvePointer` · a pointer read as what it names: a term, a rule, an event
 * - `filePointer` · a design file and the place in it, as the packs read it too
 */
import { byId as EPIC_BY_ID } from '../backlog.ts';
import { byId as COMMAND_BY_ID } from '../../sheet/contract/commands.ts';
import type { Resolved } from './ticketsTypes.ts';
import { PRODUCT_READERS, SHORT_NAMES, WIREFRAME } from './pointerRows.ts';
import * as QUERIES from '../../sheet/contract/queries.ts';
import * as EVENTS from '../../sheet/contract/events.ts';
import * as REFUSALS from '../../sheet/contract/refusals.ts';
import * as GLOSSARY from '../../sheet/words/glossary.ts';

type Match = RegExpMatchArray;
type Reader = (found: Match, ref: string) => Resolved | null;

const at = (found: Match, index: number): string => String(found[index] ?? '');

// a design file, its name with spaces or brackets, then `·` or `→` and the place in it
const FILE_POINTER =
  /^([\w[\] ./-]+\.(?:ts|js|json|md|css|dc\.html))(?:\s*[·→](.+))?$/;

// the place after `·` or `→`, the spaces before it left off
const placeIn = (found: Match): string | undefined => found[2]?.trimStart();

// what comes after ` — ` explains the pointer and is no part of the place
function filePointer(
  ref: string,
): { readonly file: string; readonly place: string | null } | null {
  const found = FILE_POINTER.exec(String(ref.split(/\s—\s/)[0]).trim());
  return found
    ? { file: at(found, 1).trim(), place: placeIn(found) ?? null }
    : null;
}

function term(found: Match, ref: string): Resolved | null {
  const wanted = at(found, 1).trim().toLowerCase();
  const row = GLOSSARY.terms.find((one) => one.term.toLowerCase() === wanted);
  if (!row) return null;
  const body = row.means + (row.note ? ` — ${row.note}` : '');
  return { ref, kind: 'term', title: row.term, body, where: 'glossary.ts' };
}

function refusal(found: Match, ref: string): Resolved | null {
  const refusals = REFUSALS;
  const key = at(found, 1);
  const row = refusals?.byKey[key];
  if (!refusals || !row) return null;
  const pass = row.fix ? `to pass: ${row.fix}` : 'nothing makes this one pass';
  const body = `“${refusals.refusalSentence(key)}” · ${pass}`;
  return { ref, kind: 'refusal', title: key, body, where: 'refusals.ts' };
}

function event(found: Match, ref: string): Resolved | null {
  const row = EVENTS.byKey[at(found, 1)];
  if (!row) return null;
  const pings = row.mention ? ` · pings ${row.mentionWho}` : ' · pings nobody';
  const title = `${at(found, 1)} · ${row.name}`;
  return {
    ref,
    kind: 'event',
    title,
    body: `carries: ${row.carries}${pings}`,
    where: WIREFRAME,
  };
}

function target(found: Match, ref: string): Resolved | null {
  const events = EVENTS;
  if (!events) return null;
  const row = Object.entries(events.targets).find(
    ([key]) => key === at(found, 1),
  )?.[1];
  if (!row) return null;
  return {
    ref,
    kind: 'target',
    title: `mention → ${row.short}`,
    body: row.means,
    where: WIREFRAME,
  };
}

function command(found: Match, ref: string): Resolved | null {
  const row = COMMAND_BY_ID[at(found, 1)];
  if (!row) return null;
  const body = `body: ${row.body}${row.note ? ` — ${row.note}` : ''}`;
  return {
    ref,
    kind: 'command',
    title: `${row.id} · ${row.route}`,
    body,
    where: 'commands.ts',
  };
}

function story(found: Match, ref: string): Resolved | null {
  const id = `${at(found, 1)}-S${at(found, 2)}`;
  const row = EPIC_BY_ID[at(found, 1)]?.stories.find((one) => one.id === id);
  if (!row) return null;
  return {
    ref,
    kind: 'story',
    title: `${row.id} · ${row.title}`,
    body: row.criterion,
    where: 'Board.html',
  };
}

function query(found: Match, ref: string): Resolved | null {
  const row = QUERIES.byId[at(found, 1)];
  if (!row) return null;
  const body = `reads the ${row.reads} — ${row.note}`;
  return {
    ref,
    kind: 'query',
    title: `${row.id} · ${row.route}`,
    body,
    where: 'queries.ts',
  };
}

// a file, or a place in one: the agent opens it, a person clicks it
function file(found: Match, ref: string): Resolved {
  const [name, place] = [at(found, 1), placeIn(found)];
  const title = name + (place ? ` · ${place}` : '');
  return {
    ref,
    kind: 'file',
    title,
    body: place ? `open ${name} at ${place}` : `read ${name}`,
    where: name,
  };
}

// a module everybody names by its short name, the extension left off
function shortFile(found: Match, ref: string): Resolved {
  const [name, place] = [at(found, 1), at(found, 2)];
  return {
    ref,
    kind: 'file',
    title: `${name}.ts · ${place}`,
    body: `open ${name}.ts at ${place}`,
    where: `${name}.ts`,
  };
}

// a closed ticket keeps the X.js it was sent with; an open one names the module X.ts
const READERS: readonly (readonly [RegExp, Reader])[] = [
  [/^glossary(?:\.[tj]s)?\s*·\s*([^·]+)/i, term],
  [/^refusals(?:\.[tj]s)?\s*·\s*([\w.]+)$/i, refusal],
  ...PRODUCT_READERS,
  [/^events\.[tj]s\s*·\s*([a-z_]+\.[a-z_]+)$/, event],
  [/^events\.[tj]s\s*·\s*TARGET\.(\w+)$/, target],
  [/^commands\.[tj]s\s*·\s*(\w+)$/, command],
  [/^backlog\.[tj]s\s*·\s*(E\d\d|E[A-Z]+)-S(\d+)$/, story],
  [/^queries\.[tj]s\s*·\s*(\w+)$/, query],
  [FILE_POINTER, file],
  [new RegExp(`^(${SHORT_NAMES.join('|')})\\s*·\\s*(.+)$`), shortFile],
];

// a pointer that names nothing comes back as text: the signal it needs rewriting
function resolvePointer(ref: string): Resolved {
  for (const [pattern, read] of READERS) {
    const found = ref.match(pattern);
    const resolved = found ? read(found, ref) : null;
    if (resolved) return resolved;
  }
  return { ref, kind: 'text', title: ref, body: '', where: null };
}

export { filePointer, resolvePointer };
