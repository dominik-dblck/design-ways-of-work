/**
 * - writes `dist/project/`: every home's files where `tools/layout.ts` puts them
 * - each sheet entry a classic script setting its global, its imports inlined
 * - a React page bundled with React and all it imports, beside the shell it draws in
 */
import fs from 'node:fs';
import path from 'node:path';
import { build } from 'rolldown';
import { moduleEntries, moduleImports } from '../guards/sourceCheck.ts';
import { copyNamedIcons } from './build/namedIcons.ts';
import { writeVendored } from './build/vendored.ts';
import { emittedTexts } from './emit.ts';
import {
  entryOfModule,
  filesOf,
  importsOfEntry,
  isEntry,
  pageOf,
  publishedOf,
} from './layout.ts';
import type { Page } from './layout.ts';
import { BUILT, ROOT } from './root.ts';
import { headerOf } from '../shared/lint/header.ts';

const OUT = BUILT;

const LEADING_COMMENTS = /^(?:\/\/[^\n]*\n)+/;
const FIRST_LINE_NAME = /^(\/\/ [\w.-]+)\.ts\b/;

// the bundle drops comments, and the header is what source-check reads of every file
function bannerOf(file: string): string {
  const text = fs.readFileSync(file, 'utf8');
  const header = headerOf(text)?.whole;
  if (header !== undefined) return header;
  const head = LEADING_COMMENTS.exec(text)?.[0] ?? '';
  return head.replace(FIRST_LINE_NAME, '$1.js').trimEnd();
}

// the pages read an entry under its PascalCase name: sheetStatus.ts is SheetStatus
function globalOf(file: string): string {
  return path
    .basename(file, '.ts')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

async function bundle(file: string): Promise<void> {
  const name = globalOf(file);
  await build({
    input: file,
    write: true,
    logLevel: 'warn',
    resolve: { symlinks: false },
    output: {
      file: path.join(OUT, `${path.basename(file, '.ts')}.js`),
      format: 'iife',
      name,
      esModule: false,
      banner: bannerOf(file),
      footer: `globalThis.${name} = ${name};`,
    },
  });
}

// the one document a page needs: a root to draw in, and its bundle
function shellOf(page: Page): string {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${page.title}</title>`,
    '</head>',
    '<body>',
    '<div id="root"></div>',
    `<script src="./${page.script}"></script>`,
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

async function bundlePage(file: string, page: Page): Promise<void> {
  await build({
    input: file,
    write: true,
    logLevel: 'warn',
    resolve: { symlinks: false },
    // MUI marks its modules `use client`, which means nothing in one bundle
    onwarn: (warning, report) => {
      if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') report(warning);
    },
    platform: 'browser',
    transform: { jsx: 'react-jsx' },
    output: {
      file: path.join(OUT, page.script),
      format: 'iife',
      minify: true,
    },
  });
  fs.writeFileSync(path.join(OUT, page.shell), shellOf(page));
}

// two sources written at one published path: the second would overwrite the first unseen
function refuseClashes(outputs: readonly string[]): void {
  const twice = outputs.filter((one, at) => outputs.indexOf(one) !== at);
  if (twice.length)
    throw new Error(`two sources write ${twice.join(', ')} in dist/project`);
}

// every file a home holds but its TypeScript, at its published path
function copyFiles(): number {
  const files = filesOf().filter((file) => !file.endsWith('.ts'));
  for (const file of files) {
    const at = publishedOf(file);
    if (at === null) continue;
    const to = path.join(OUT, at);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(file, to);
  }
  return files.length;
}

// each entry and the entries its files import, for the same scan: who reads whom
function writeModuleImports(): void {
  const reads = filesOf()
    .filter(isEntry)
    .map((entry) => [entry, importsOfEntry(entry)] as const)
    .filter(([, read]) => read.length > 0);
  fs.writeFileSync(
    path.join(OUT, moduleImports),
    `${JSON.stringify(Object.fromEntries(reads))}\n`,
  );
}

// each part and the entry it is bundled with, for a scan a page runs over the bundles
function writeModuleEntries(): void {
  const parts = filesOf()
    .filter((file) => file.endsWith('.ts'))
    .flatMap((file) => {
      const entry = entryOfModule(file);
      return entry === file ? [] : [[file, entry] as const];
    });
  fs.writeFileSync(
    path.join(OUT, moduleEntries),
    `${JSON.stringify(Object.fromEntries(parts))}\n`,
  );
}

// the JSON written from its module, into the repository, only when its text moved
async function emitFixtures(): Promise<void> {
  for (const [file, text] of await emittedTexts()) {
    const was = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (was === text) continue;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
    console.log(`${file} · written from its module`);
  }
}

await emitFixtures();
const vendored = writeVendored({ root: ROOT, out: ROOT });
fs.rmSync(OUT, { recursive: true, force: true });
const copied = copyFiles();
const icons = copyNamedIcons(OUT);
const scripts = filesOf().filter(isEntry);
const pages = filesOf().flatMap((file) => {
  const page = pageOf(file);
  return page ? [{ file, page }] : [];
});
refuseClashes([
  ...scripts.map((file) => `${path.basename(file, '.ts')}.js`),
  ...pages.flatMap(({ page }) => [page.script, page.shell]),
]);
await Promise.all(scripts.map(bundle));
await Promise.all(pages.map(({ file, page }) => bundlePage(file, page)));
writeModuleEntries();
writeModuleImports();
console.log(
  `dist/project · ${scripts.length} scripts, ${pages.length} pages built, ${copied} files copied, ${icons} icons from lucide-static`,
);
if (vendored > 0)
  console.log(`vendor/wow · ${vendored} files the build side reads, as taken`);
