/**
 * - `VENDOR`, `vendoredFiles` · the folder; the read files a take wrote
 * - `writeVendored` · each under vendor/wow/ at its own path, byte for byte
 * - a release's commit holds them, so the build side reads one sha (D6)
 */
import fs from 'node:fs';
import path from 'node:path';
import { filesOfHomes } from '../../shared/take/takeHomes.ts';
import { takenFiles } from '../../shared/take/takeRecord.ts';
import { readFiles } from '../releaseRecord/readModules.ts';

const VENDOR = path.join('vendor', 'wow');

const vendoredFiles = (root: string): readonly string[] => {
  const taken = takenFiles(root);
  return readFiles().filter((file) => taken.has(file));
};

// the folders a gone file left empty go too, the deepest first
function removeEmpty(folder: string): void {
  if (!fs.existsSync(folder)) return;
  for (const entry of fs.readdirSync(folder, { withFileTypes: true }))
    if (entry.isDirectory()) removeEmpty(path.join(folder, entry.name));
  if (fs.readdirSync(folder).length === 0) fs.rmdirSync(folder);
}

// written where its bytes moved; a file the build side no longer reads leaves
function writeVendored({
  root,
  out,
}: {
  readonly root: string;
  readonly out: string;
}): number {
  const files = vendoredFiles(root);
  for (const file of files) {
    const bytes = fs.readFileSync(path.join(root, file));
    const to = path.join(out, VENDOR, file);
    if (fs.existsSync(to) && fs.readFileSync(to).equals(bytes)) continue;
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.writeFileSync(to, bytes);
  }
  const kept = new Set(files);
  for (const [held, file] of filesOfHomes({
    source: out,
    homes: [[VENDOR, '']],
  }))
    if (!kept.has(file)) fs.rmSync(held);
  removeEmpty(path.join(out, VENDOR));
  return files.length;
}

export { VENDOR, vendoredFiles, writeVendored };
