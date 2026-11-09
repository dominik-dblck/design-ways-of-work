/**
 * - `node shared/sync/syncGroups.ts --agreed <json> --release <json> --ours <json>`
 * - a file holds each group's data and kind; its form computed here, once for both
 * - each group moved since the agreed form, a table: path, values, who moved it
 */
import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { formOf } from './normalForms.ts';
import type { FormKind } from './normalForms.ts';
import { movedGroups } from './syncReport.ts';
import type { GroupMove } from './syncReport.ts';

const { values: files } = parseArgs({
  options: {
    agreed: { type: 'string' },
    release: { type: 'string' },
    ours: { type: 'string' },
  },
});

const KINDS: readonly FormKind[] = ['shape', 'tokens', 'words'];

// a group as a side writes it: `{ "kind": "tokens", "data": … }`
const kindOf = (group: unknown): FormKind | undefined =>
  KINDS.find(
    (kind) =>
      typeof group === 'object' &&
      group !== null &&
      Reflect.get(group, 'kind') === kind,
  );

// each group's form by its name; a side with no file yet holds no group, a group of no known kind is refused
function formsIn(file: string | undefined): Readonly<Record<string, unknown>> {
  if (file === undefined || !fs.existsSync(file)) return {};
  const read: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (typeof read !== 'object' || read === null) return {};
  return Object.fromEntries(
    Object.entries(read).map(([name, group]: [string, unknown]) => {
      const kind = kindOf(group);
      if (kind === undefined)
        throw new Error(
          `${file} · ${name} names no kind of ${KINDS.join(', ')}`,
        );
      return [name, formOf(kind, Reflect.get(Object(group), 'data'))];
    }),
  );
}

const cell = (shown: unknown): string =>
  shown === undefined ? '—' : JSON.stringify(shown).replaceAll('|', '\\|');

const tableOf = ({ group, rows }: GroupMove): string =>
  [
    `## ${group}`,
    '',
    '| path | agreed | release | ours | moved |',
    '| ---- | ------ | ------- | ---- | ----- |',
    ...rows.map(
      (row) =>
        `| ${row.path} | ${cell(row.agreed)} | ${cell(row.release)} | ${cell(row.ours)} | ${row.moved} |`,
    ),
  ].join('\n');

const moved = movedGroups({
  agreed: formsIn(files.agreed),
  release: formsIn(files.release),
  ours: formsIn(files.ours),
});
console.log(
  moved.length === 0
    ? 'sync:groups · no group moved'
    : moved.map(tableOf).join('\n\n'),
);
