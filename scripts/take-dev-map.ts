/**
 * - `node scripts/take-dev-map.ts [build repo]` · its folder map, product cut out
 * - read from docs/map.md; a folder stays unless PRODUCT_FOLDERS names it or above
 * - folders only: a file line is the product's, and its own map lists its files
 */
import fs from 'node:fs';
import path from 'node:path';
import { BUILD_REPO, HERE, repoAt } from './repos.ts';
import { quoted } from './tsLiteral.ts';

const SOURCE = repoAt(BUILD_REPO);
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
const DOMAIN_CONCEPT =
  '│   │   └── {concept}/              # One folder per concept · its decides, its rules, its __fixtures__';

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

// the folders of the build repository's map, its product's cut and its domain named by concept
const mapLines = (): readonly string[] =>
  treeOf(fs.readFileSync(path.join(SOURCE, 'docs', 'map.md'), 'utf8'))
    .filter((line) => !PRODUCT_FOLDERS.some((one) => one.test(line.path)))
    .flatMap((line) =>
      line.path === 'packages/domain/'
        ? [line.text, DOMAIN_CONCEPT]
        : [line.text],
    );

const mapModule = (lines: readonly string[]): string =>
  [
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

function main(): void {
  const lines = mapLines();
  fs.writeFileSync(TO, mapModule(lines));
  console.log(
    `dev/map.ts · ${lines.length} folders of ${path.relative(HERE, SOURCE)}/docs/map.md`,
  );
}

main();
