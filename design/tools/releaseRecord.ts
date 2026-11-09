/**
 * - writes a release record's digests below its head, then reads them back
 * - `node tools/releaseRecord.ts 3.4` · records/release-3-4.md, its head first
 * - a digest the tree no longer has is a fault, exit 1
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  MARK,
  recordFaults,
  recordSections,
} from './release-record/recordText.ts';
import { ROOT } from './root.ts';

function main(): number {
  const version = process.argv[2];
  if (!version || !/^\d+(\.\d+)*$/.test(version)) {
    console.error('usage: yarn release:record 3.4');
    return 2;
  }
  const file = path.join(
    ROOT,
    'records',
    `release-${version.replaceAll('.', '-')}.md`,
  );
  if (!fs.existsSync(file)) {
    console.error(
      `${path.relative(ROOT, file)} · write its head first: the title and What it carries`,
    );
    return 2;
  }
  const was = fs.readFileSync(file, 'utf8');
  const head = was.includes(MARK) ? was.slice(0, was.indexOf(MARK)) : was;
  fs.writeFileSync(file, `${head.trimEnd()}\n\n${recordSections()}`);
  const faults = recordFaults(fs.readFileSync(file, 'utf8'));
  console.log(
    faults.length
      ? `${path.relative(ROOT, file)} · ${faults.length} faults\n${faults.join('\n')}`
      : `${path.relative(ROOT, file)} · every digest read back from the tree`,
  );
  return faults.length ? 1 : 0;
}

process.exitCode = main();
