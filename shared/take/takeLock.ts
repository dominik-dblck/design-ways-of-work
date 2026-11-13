/**
 * - `fileDigestOf` · a file's sha256, or none when the disk lacks it
 * - `checkLock` · each file `wow.lock` names is on the disk as taken, none edited
 * - it reads the tree alone: a build repository's CI needs no way of working
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { LOCK, takenFiles } from './takeRecord.ts';

const fileDigestOf = (file: string): string | undefined =>
  fs.existsSync(file)
    ? createHash('sha256').update(fs.readFileSync(file)).digest('hex')
    : undefined;

// a taken file gone or edited is red: its change goes to the way of working, then a tag
function checkLock(root: string): boolean {
  if (!fs.existsSync(path.join(root, LOCK))) {
    console.log(`${LOCK} · none here: take a tag first`);
    return false;
  }
  const locked = takenFiles(root);
  const drifted = [...locked].flatMap(([file, digest]) => {
    const onDisk = fileDigestOf(path.join(root, file));
    if (onDisk === digest) return [];
    return [`  ${onDisk === undefined ? 'GONE' : 'EDITED'} · ${file}`];
  });
  for (const line of drifted) console.log(line);
  console.log(
    drifted.length === 0
      ? `${LOCK} · ${locked.size} files, each as taken`
      : `${LOCK} · ${drifted.length} taken files changed: ask the way of working for the change, then take its tag`,
  );
  return drifted.length === 0;
}

export { checkLock, fileDigestOf };
