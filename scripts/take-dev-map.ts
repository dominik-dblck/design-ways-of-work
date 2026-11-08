/**
 * - `node scripts/take-dev-map.ts [build repo]` · its directory map, the product's folders cut: dev/map.ts
 * - reads the tree in docs/map.md; keeps a folder unless PRODUCT_FOLDERS names it or a folder above it
 * - the folders only: a file line is the product's, and the build repository's own map lists its files
 */
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const SOURCE = path.resolve(process.argv[2] ?? path.join(HERE, '..', 'mailing-automation'));
const TO = path.join(HERE, 'dev', 'map.ts');

// the build repository's own product: its routes, its screens' renderers, its domain's concepts
const PRODUCT_FOLDERS: readonly RegExp[] = [
  /^app\/\[/,
  /^app\/(signin|design|fonts|renderers)\//,
  /^app\/api\/(auth|documents|assets)\//,
  /^app\/services\/(handleRoute|session)\//,
  /^packages\/domain\/./,
  /^scripts\/seed\//,
  /^knowledge\/(ux|ai)\/./,
];

// a concept of the domain: the one line that stands for the folders cut under packages/domain/
const DOMAIN_CONCEPT = '│   │   └── {concept}/              # One folder per concept · its decides, its rules, its __fixtures__';

interface TreeLine {
  readonly path: string;
  readonly text: string;
}

function treeOf(text: string): readonly TreeLine[] {
  const block = text.split('```')[1] ?? '';
  const parents: string[] = [];
  return block
    .split('\n')
    .slice(2)
    .flatMap((line) => {
      const at = line.search(/[^│├└─\s]/);
      const name = /^(\S+\/)\s/.exec(`${line.slice(at)} `)?.[1];
      if (at < 0 || name === undefined) return [];
      const depth = Math.floor(at / 4);
      parents.length = depth;
      parents.push(name);
      return [{ path: parents.join(''), text: line.trimEnd() }];
    });
}

const quoted = (text: string): string => `'${text.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;

function main(): void {
  const lines = treeOf(fs.readFileSync(path.join(SOURCE, 'docs', 'map.md'), 'utf8'))
    .filter((line) => !PRODUCT_FOLDERS.some((one) => one.test(line.path)))
    .flatMap((line) => (line.path === 'packages/domain/' ? [line.text, DOMAIN_CONCEPT] : [line.text]));
  const data = [
    '/**',
    " * - `directoryMap` · the build repository's folders, every product's: dev/map.md",
    ' */',
    "import type { DocumentFile } from '../docs/documents/documentTypes.ts';",
    '',
    '// prettier-ignore',
    'const directoryMap: DocumentFile = {',
    "  path: 'dev/map.md',",
    '  sections: [',
    '    {',
    "      heading: '# Directory map',",
    '      lines: [',
    "        '',",
    "        'Every build repository holds these folders; its own map adds its routes, its screens and its domain.',",
    "        '`{name}/` stands for every folder at its level. Taken from eagle-dev by `scripts/take-dev-map.ts`.',",
    "        '',",
    "        '```',",
    "        '{project}/',",
    ...lines.map((line) => `        ${quoted(line)},`),
    "        '```',",
    "        '',",
    '      ],',
    '    },',
    '  ],',
    '};',
    '',
    'export { directoryMap };',
    '',
  ].join('\n');
  fs.writeFileSync(TO, data);
  console.log(`dev/map.ts · ${lines.length} folders of ${path.relative(HERE, SOURCE)}/docs/map.md`);
}

main();
