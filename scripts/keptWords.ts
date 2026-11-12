/**
 * - `keptIn` · a product's files no move rewrites, kept as written
 * - its epics' notebooks stand where its registry says, read from the product
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { childEnv } from './scratch.ts';

interface Kept {
  readonly isKept: (file: string) => boolean;
  // a notebook the product's checks read: what it imports may not move
  readonly isNotebook: (file: string) => boolean;
}

// a legacy copy, a release's record, a note
const FOLDERS = /^(?:legacy|records|notes)\//;
// the registry the contract names: where a notebook stands, beside each closed one's pin
const NOTEBOOKS = 'roadmaps/notes/frozenNotebooks.ts';

const isPattern = (read: unknown): read is readonly [string, string] =>
  Array.isArray(read) &&
  read.length === 2 &&
  read.every((part) => typeof part === 'string');

// read by a node of its own, so a script that runs in step reads the product's TypeScript
function notebookIn(root: string): RegExp {
  const file = path.join(root, NOTEBOOKS);
  if (!fs.existsSync(file))
    throw new Error(
      `${root} lacks ${NOTEBOOKS}, the registry of its notebooks`,
    );
  const said = execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      `const { A_NOTEBOOK } = await import(${JSON.stringify(pathToFileURL(file).href)}); console.log(JSON.stringify([A_NOTEBOOK.source, A_NOTEBOOK.flags]));`,
    ],
    { encoding: 'utf8', env: childEnv(), stdio: ['ignore', 'pipe', 'pipe'] },
  );
  const read: unknown = JSON.parse(said);
  if (!isPattern(read)) throw new Error(`${NOTEBOOKS}: no A_NOTEBOOK pattern`);
  return new RegExp(...read);
}

function keptIn(root: string): Kept {
  const notebook = notebookIn(root);
  return {
    isKept: (file) => FOLDERS.test(file) || notebook.test(file),
    isNotebook: (file) => notebook.test(file),
  };
}

export { keptIn };
