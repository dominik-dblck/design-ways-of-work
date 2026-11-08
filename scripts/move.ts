/**
 * - `node scripts/move.ts <map.tsv>` · moves design/'s files by a map, every relative import rewritten after them
 * - a map row: `from` and `to`, both under design/; a component's root (`{tier}/{Name}/{Name}.tsx`) gets an index.ts
 * - an import from outside a component's folder reads its index.ts, as its barrel; one inside keeps the file
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE } from './repos.ts';

const DESIGN = path.join(HERE, 'design');
const SPECIFIER =
  /(from\s+|import\s*\(\s*|import\s+|export\s+\*\s+from\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;
const A_ROOT =
  /^app\/components\/(atoms|molecules|organisms|templates)\/([^/]+)\/\2\.tsx$/;

function mapOf(file: string): ReadonlyMap<string, string> {
  const rows = fs
    .readFileSync(path.resolve(file), 'utf8')
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const [from = '', to = ''] = line.split('\t');
      return [from, to] as const;
    });
  return new Map(rows);
}

function sourcesOf(): readonly string[] {
  return fs
    .readdirSync(DESIGN, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(ts|tsx|mts)$/.test(entry.name))
    .map((entry) =>
      path
        .relative(DESIGN, path.join(entry.parentPath, entry.name))
        .split(path.sep)
        .join('/'),
    );
}

// where an import of a moved root lands: the barrel, unless the importer sits in the component's own folder
function landingOf(target: string, importer: string): string {
  const root = A_ROOT.exec(target);
  if (root === null) return target;
  const folder = path.posix.dirname(target);
  return importer.startsWith(`${folder}/`) ? target : `${folder}/index.ts`;
}

function rewritten(file: string, moves: ReadonlyMap<string, string>): string {
  const now = moves.get(file) ?? file;
  const text = fs.readFileSync(path.join(DESIGN, now), 'utf8');
  return text.replace(
    SPECIFIER,
    (whole, lead: string, quote: string, spec: string) => {
      const target = path.posix.normalize(
        path.posix.join(path.posix.dirname(file), spec),
      );
      const moved = moves.get(target) ?? target;
      if (moved === target && now === file) return whole;
      const relative = path.posix.relative(
        path.posix.dirname(now),
        landingOf(moved, now),
      );
      return `${lead}${quote}${relative.startsWith('.') ? relative : `./${relative}`}${quote}`;
    },
  );
}

function barrelOf(root: string): string {
  const name = path.posix.basename(root, '.tsx');
  return `/**\n * - \`${name}\` · its face, read from outside its folder\n */\nexport { ${name} } from './${name}.tsx';\n`;
}

function main(): void {
  const moves = mapOf(process.argv[2] ?? '');
  const sources = sourcesOf();
  for (const [from, to] of moves) {
    fs.mkdirSync(path.dirname(path.join(DESIGN, to)), { recursive: true });
    execFileSync(
      'git',
      ['mv', path.join(DESIGN, from), path.join(DESIGN, to)],
      { cwd: HERE },
    );
  }
  const texts = sources.map(
    (file) => [moves.get(file) ?? file, rewritten(file, moves)] as const,
  );
  for (const [file, text] of texts)
    fs.writeFileSync(path.join(DESIGN, file), text);
  const roots = [...moves.values()].filter((to) => A_ROOT.test(to));
  for (const root of roots)
    fs.writeFileSync(
      path.join(DESIGN, path.posix.dirname(root), 'index.ts'),
      barrelOf(root),
    );
  console.log(
    `design/ · ${moves.size} files moved, ${roots.length} barrels written, every relative import rewritten`,
  );
}

main();
