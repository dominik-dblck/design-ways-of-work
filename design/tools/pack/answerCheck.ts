/**
 * - `answerFails` · one file, one path across a ticket: its criteria, its note,
 * - its read list and its receipts' caveats name each basename by one path
 */
import type { ticketOf } from './packText.ts';
import * as RECEIPTS from '../../roadmaps/receipts.ts';

type Ticket = ReturnType<typeof ticketOf>;

const PATH =
  /(?:^|[\s(·,;:"'—–])((?:app|scripts|tests|packages|docs|roadmaps|\.claude)\/[A-Za-z0-9_.<>/-]+\.(?:tsx?|mjs|json|md|css|js))/g;

// a framework names these by their folder: two route.ts are two files by design
const BY_FOLDER: readonly string[] = [
  'route.ts',
  'page.tsx',
  'layout.tsx',
  'index.ts',
  'index.tsx',
];

// each text the ticket says, and where it says it
function placesOf(ticket: Ticket): readonly (readonly [string, string])[] {
  const caveats = Object.values(RECEIPTS.receipts).flatMap((receipt) =>
    (receipt.caveats || []).filter(
      (one): one is string =>
        typeof one === 'string' && one.includes(ticket.id),
    ),
  );
  return [
    ...ticket.acceptance.map((said, at): readonly [string, string] => [
      String(said),
      `c${at + 1}`,
    ]),
    [ticket.note || '', 'note'],
    ...(ticket.read || []).map((ref, at): readonly [string, string] => [
      ref,
      `read[${at}]`,
    ]),
    ...caveats.map((said, at): readonly [string, string] => [
      said,
      `receipt caveat[${at}]`,
    ]),
  ];
}

function answerFails(ticket: Ticket): readonly string[] {
  const seen = new Map<string, Map<string, string[]>>();
  for (const [text, where] of placesOf(ticket))
    for (const found of text.matchAll(PATH)) {
      const file = String(found[1]);
      const base = String(file.split('/').pop());
      const paths = seen.get(base) ?? new Map<string, string[]>();
      paths.set(file, [...(paths.get(file) ?? []), where]);
      seen.set(base, paths);
    }
  return [...seen]
    .filter(([base, paths]) => !BY_FOLDER.includes(base) && paths.size > 1)
    .map(
      ([base, paths]) =>
        `${ticket.id} · answer-check · ${base} has ${paths.size} paths: ${[...paths].map(([file, where]) => `${file} (${where.join(', ')})`).join(' · ')}`,
    );
}

export { answerFails };
