/**
 * - a release record lists every module the build side reads with what they import
 * - and each file it reads whole that is no module, by its own digest
 * - from the tool on, `yarn release:record` writes it: each count matches its lines
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ROOT } from './tree.ts';
import { entryOfModule, importsOfEntry } from '../../tools/layout.ts';
import { readModules } from '../../tools/release-record/readModules.ts';
import { MARK } from '../../tools/release-record/recordText.ts';
import * as PROJECT from '../../sheet/project.ts';

// the records written before the tool, by hand or by a script outside the repository
const BEFORE_THE_TOOL: readonly string[] = [
  'release-3.md',
  'release-3-1.md',
  'release-3-2.md',
  'release-3-3.md',
  'release-3-3-1.md',
];
// the records the tool wrote before it named the files read whole
const BEFORE_THE_FILES: readonly string[] = ['release-3-4.md'];
const WRITTEN_BY = 'Written by `yarn release:record`';

// a section's count in its heading against the lines it lists
function countFaults(name: string, text: string): readonly string[] {
  const sections = text.split(/^## /m).slice(1);
  return sections.flatMap((section) => {
    const heading = String(section.split('\n')[0]);
    const said = /· (\d+)$/.exec(heading)?.[1];
    const listed = section
      .split('\n')
      .filter((line) => /sha256 [0-9a-f]{64}$/.test(line)).length;
    return said !== undefined && listed > 0 && Number(said) !== listed
      ? [`${name} · ${heading} lists ${listed}`]
      : [];
  });
}

describe('a release record is whole', () => {
  it('the read set holds every module it imports, and names modules alone', () => {
    const read = new Set(readModules());
    const open = [...read].flatMap((entry) =>
      importsOfEntry(entry)
        .filter((imported) => !read.has(imported))
        .map((imported) => `${entry} imports ${imported}`),
    );
    const notModules = PROJECT.buildReads.modules.filter(
      (file) => entryOfModule(file) !== file,
    );
    const filesMissing = PROJECT.buildReads.files.filter(
      (file) => !fs.existsSync(path.join(ROOT, file)),
    );
    expect({ open, notModules, filesMissing }).toEqual({
      open: [],
      notModules: [],
      filesMissing: [],
    });
  });

  it('a section whose count says one number and lists another is found', () => {
    const text = `## Every file · 2\n\n- a.ts · sha256 ${'0'.repeat(64)}\n`;
    expect(countFaults('planted', text)).toEqual([
      'planted · Every file · 2 lists 1',
    ]);
  });

  it('every record after the tool is written by it, each count its lines', () => {
    const records = fs
      .readdirSync(path.join(ROOT, 'records'))
      .filter((name) => /^release-[\d-]+\.md$/.test(name))
      .filter((name) => !BEFORE_THE_TOOL.includes(name));
    const faults = records.flatMap((name) => {
      const text = fs.readFileSync(path.join(ROOT, 'records', name), 'utf8');
      const stamped = text.includes(MARK) && text.includes(WRITTEN_BY);
      const whole =
        BEFORE_THE_FILES.includes(name) ||
        PROJECT.buildReads.files.every((file) =>
          text.includes(`- ${file} · sha256 `),
        );
      return [
        ...(stamped ? [] : [`${name} · not written by the tool`]),
        ...(whole ? [] : [`${name} · the files read whole are not all named`]),
        ...countFaults(name, text),
      ];
    });
    expect(faults).toEqual([]);
  });
});
