/**
 * - `node tools/new-epic.ts EXX` · writes the parts an epic's folder lacks, listed
 * - refuses an epic the backlog does not hold: its row is written there first
 */
import fs from 'node:fs';
import path from 'node:path';
import { byId } from '../roadmaps/backlog.ts';
import { epicFilesOf, registered } from '../roadmaps/templates.ts';
import { ROOT } from './root.ts';

const AN_EPIC = /^E\d\d$/;

const id = process.argv[2] ?? '';
const epic = byId[id];
if (!AN_EPIC.test(id) || !epic) {
  console.error(
    `new-epic · ${id || '(no id)'} is not an epic of roadmaps/backlog.ts: write its row there first`,
  );
  process.exit(1);
}

const at = (file: string): string => path.join(ROOT, file);

for (const file of epicFilesOf({ id, name: epic.name })) {
  if (fs.existsSync(at(file.path))) continue;
  fs.mkdirSync(path.dirname(at(file.path)), { recursive: true });
  fs.writeFileSync(at(file.path), file.text);
  const text = registered(fs.readFileSync(at(file.registry), 'utf8'), file);
  if (text !== null) fs.writeFileSync(at(file.registry), text);
  console.log(`new-epic · ${file.path}, listed in ${file.registry}`);
}
