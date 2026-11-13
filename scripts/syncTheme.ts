/**
 * - `node scripts/syncTheme.ts <sha>` · the build side's theme and atoms, copied
 * - read at a sha its review passed, read only; only the imports are rewritten
 * - its record, `ports/build-theme/taken.ts`, written by it: the sha and each file
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { BUILD_THEME } from '../ports/build-theme/copySet.ts';
import { TAKEN } from '../ports/build-theme/taken.ts';
import { prettierConfigOf } from '../shared/lint/prettierConfig.ts';
import { BUILD_REPO, HERE } from './repos.ts';
import { copiedFrom, reviewRefusal, specified } from './syncFiles.ts';
import { quoted } from './tsLiteral.ts';

const RECORD = path.join(HERE, 'ports', 'build-theme', 'taken.ts');
// a product's formatter, its tables aside: a copied file never holds one
const { overrides: _tables, ...FORMAT } = prettierConfigOf({
  ignores: [],
  productTrees: [],
  generated: [],
  generators: [],
  tables: [],
  unformatted: {},
});

const [sha = ''] = process.argv.slice(2);
if (!/^[0-9a-f]{7,40}$/.test(sha)) {
  console.log('syncTheme · node scripts/syncTheme.ts <sha>');
  process.exit(2);
}
const git = (args: readonly string[]): string =>
  execFileSync('git', args, {
    cwd: BUILD_REPO,
    encoding: 'utf8',
    maxBuffer: 1 << 28,
  });
const full = git(['rev-parse', '--verify', `${sha}^{commit}`]).trim();
// the record as committed there, on any branch: an uncommitted or edited one decides nothing
const recordFile = BUILD_THEME.reviewed.replace('{sha}', full.slice(0, 8));
const recordAt = git([
  'log',
  '-1',
  '--all',
  '--format=%H',
  '--',
  recordFile,
]).trim();
const committed = (): string | null => {
  try {
    return git(['show', `${recordAt}:${recordFile}`]);
  } catch {
    return null;
  }
};
const refusal = reviewRefusal({
  record: recordAt === '' ? null : committed(),
  sha: full,
});
if (refusal !== null) {
  console.log(`syncTheme · ${full} · ${refusal}: review it there first (W105)`);
  process.exit(1);
}
const files = new Set(
  git(['ls-tree', '-r', '-z', '--name-only', full]).split('\0').filter(Boolean),
);
const read = (file: string): string => git(['show', `${full}:${file}`]);
const copied = copiedFrom({ set: BUILD_THEME, read, files });

// a file the last copy wrote that this one does not: retired to legacy/ by script first, never dropped here
const gone = TAKEN.files.filter((file) => !copied.includes(file));
for (const file of gone)
  console.log(`syncTheme · ${file} · gone at ${full}: retire it first`);
if (gone.length > 0) process.exit(1);

for (const file of copied) {
  const target = path.join(HERE, BUILD_THEME.into, file);
  const text = specified({ file, text: read(file), files });
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(
    target,
    await prettier.format(text, { ...FORMAT, filepath: target }),
  );
}
const record = [
  '/**',
  " * - `TAKEN` · the build side's sha the theme and atoms were copied at, each file",
  ' */',
  'const TAKEN: { readonly sha: string; readonly files: readonly string[] } = {',
  `  sha: ${quoted(full)},`,
  '  files: [',
  ...copied.map((file) => `    ${quoted(file)},`),
  '  ],',
  '};',
  '',
  'export { TAKEN };',
  '',
].join('\n');
// the record as this repository formats it: the next copy reads it back unchanged
fs.writeFileSync(
  RECORD,
  await prettier.format(record, {
    ...(await prettier.resolveConfig(RECORD)),
    filepath: RECORD,
  }),
);
console.log(`syncTheme · ${String(copied.length)} files at ${full}`);
