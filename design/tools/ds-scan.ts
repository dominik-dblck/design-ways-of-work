/**
 * - runs ds-scan over every drawing of the built project, the spec's shapes beside
 * - `node tools/ds-scan.ts` · each finding is printed, and any finding exits 1
 */
import fs from 'node:fs';
import path from 'node:path';
import { run } from '../guards/ds-scan.ts';
import { designSystem } from '../sheet/project.ts';
import { builtRoot } from './root.ts';

const PROJECT = builtRoot();

const read = (file: string): string =>
  fs.readFileSync(path.join(PROJECT, file), 'utf8');

function main(): number {
  const files = fs
    .readdirSync(PROJECT)
    .filter((name) => name.endsWith('.dc.html'))
    .map((name) => ({ name, text: read(name) }));
  const spec: unknown = JSON.parse(read('components.spec.json'));
  const rows =
    spec &&
    typeof spec === 'object' &&
    'atoms' in spec &&
    'molecules' in spec &&
    'organisms' in spec
      ? [spec.atoms, spec.molecules, spec.organisms].flatMap((tier) =>
          Array.isArray(tier) ? tier : [],
        )
      : [];
  const scan = run({
    files,
    tokensCss: read('tokens.css'),
    dsCss: read(designSystem),
    map: { rows },
  });
  console.log(
    `ds-scan · ${files.length} drawings · ${scan.findings.length} findings`,
  );
  for (const finding of scan.findings)
    console.log(`  ${JSON.stringify(finding)}`);
  return scan.findings.length ? 1 : 0;
}

process.exitCode = main();
