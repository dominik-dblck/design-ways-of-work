/**
 * - `node scripts/take-tokens.ts [copy]` · a product copy's two stylesheets as design-system/ data
 * - the company's system and the tool's layer become one system; the product keeps its own tokens
 * - ran once: the stylesheets move to the copy's legacy/, and a second run refuses
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE, repoAt } from '../../scripts/repos.ts';
import {
  elementsModule,
  fontsModule,
  groupsModule,
  originModule,
} from './tokens/printTokens.ts';
import { readSheet } from './tokens/readSheet.ts';
import type { Sheet } from './tokens/sheetTypes.ts';
import { splitGroups } from './tokens/splitGroups.ts';
import type { SplitRow } from './tokens/splitGroups.ts';

const COPY = repoAt(path.join(HERE, '.rehearsal', 'eagle-design'));
const OUT = path.join(HERE, 'design-system');
const STYLES = path.join(COPY, 'app', 'styles');
const PRODUCT_LAYER = path.join(STYLES, 'product-tokens.ts');

// each home of the system, in the order a theme reads them, and what it holds
const HOMES: readonly (readonly [string, string])[] = [
  ['palette', 'the colour ramps, and the steps they lack'],
  ['roles', 'the semantic roles of the surfaces, the inks and the borders'],
  ['typography', 'the families, the type scale and the dense steps of a tool'],
  ['spacing', 'the 4pt grid'],
  ['radii', 'the radius scale, and which control takes which step'],
  ['elevation', 'the shadows and blurs, and the three a tool uses'],
  ['outlines', 'the strong outline, and a chip’s edge'],
  ['inks', 'the inks no role holds: micro, annotation, link, signal'],
  ['glyphs', 'the tint a glyph takes on its surface'],
  ['hover', 'one hover, and the selected fill beside it'],
  ['sizes', 'one scale of control heights, glyphs and marks'],
  ['surfaces', 'the floating paper of menus, popovers and dialogs'],
  ['layers', 'the z-index scale'],
  ['motion', 'the easing and the durations, and their reduced motion'],
];

function splitRows(): readonly SplitRow[] {
  return fs
    .readFileSync(path.join(HERE, 'plan', 'token-split.tsv'), 'utf8')
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const [from = '', key = '', home = ''] = line.split('\t');
      if (from !== 'ds' && from !== 'product')
        throw new Error(`a row from ${from}`);
      return { from, key, home };
    });
}

const noteOf = (notes: readonly string[], opening: string): string => {
  const found = notes.find((note) => note.startsWith(opening));
  if (found === undefined) throw new Error(`no note opens with ${opening}`);
  return found;
};

function readBoth(system: string): Sheet {
  const sheet: Sheet = { groups: [], fonts: [], elements: [], notes: [] };
  readSheet(fs.readFileSync(path.join(system, 'colors_and_type.css'), 'utf8'), {
    source: 'ds',
    sheet,
  });
  readSheet(fs.readFileSync(path.join(STYLES, 'tokens.css'), 'utf8'), {
    source: 'product',
    sheet,
  });
  return sheet;
}

type Homes = ReturnType<typeof splitGroups>;

// each home of the system, then the product's own layer in the copy
function writeHomes(homes: Homes): void {
  const stray = [...homes.keys()].filter(
    (home) =>
      !['product', 'cut', ...HOMES.map(([name]) => name)].includes(home),
  );
  if (stray.length)
    throw new Error(`homes no list names · ${stray.join(' · ')}`);
  fs.mkdirSync(path.join(OUT, 'tokens'), { recursive: true });
  for (const [name, about] of HOMES)
    fs.writeFileSync(
      path.join(OUT, 'tokens', `${name}.ts`),
      groupsModule({
        name,
        about,
        groups: homes.get(name) ?? [],
        types: '../designTypes.ts',
      }),
    );
  fs.writeFileSync(
    PRODUCT_LAYER,
    groupsModule({
      name: 'productTokens',
      about: 'the tokens only this product holds, over design-system/',
      groups: homes.get('product') ?? [],
      types: '../../design-system/index.ts',
    }),
  );
}

// the notes, the faces and the element styles, then the fonts and the guide as files
function writeBeside(sheet: Sheet, system: string): void {
  const darkRule = noteOf(sheet.notes, '===== DARK =====').replace(
    /^===== DARK =====\s*·\s*/,
    '',
  );
  const write = (file: string, text: string): void => {
    fs.writeFileSync(path.join(OUT, file), text);
  };
  write(
    'origin.ts',
    originModule(noteOf(sheet.notes, 'Deblock Design System'), darkRule),
  );
  write(
    'fonts.ts',
    fontsModule(sheet.fonts, noteOf(sheet.notes, 'Basis Grotesque Pro')),
  );
  write(
    'elements.ts',
    elementsModule(sheet.elements, noteOf(sheet.notes, '===== BASE RESETS')),
  );
  fs.cpSync(path.join(system, 'fonts'), path.join(OUT, 'fonts'), {
    recursive: true,
  });
  fs.copyFileSync(
    path.join(system, 'README.md'),
    path.join(OUT, 'deblock-guide.md'),
  );
}

function writeSystem(sheet: Sheet, system: string): void {
  const homes = splitGroups(sheet.groups, splitRows());
  writeHomes(homes);
  writeBeside(sheet, system);
  const cut = homes.get('cut') ?? [];
  console.log(
    `cut, no token in them: ${cut.map((group) => group.title.split(' · ')[0]).join(' · ')}`,
  );
}

function main(): void {
  if (fs.existsSync(OUT)) {
    console.error(
      'design-system/ exists: it is the source now; edit it, never take it again',
    );
    process.exit(1);
  }
  const fixtures = path.join(STYLES, '__fixtures__');
  const [folder = ''] = fs
    .readdirSync(fixtures)
    .filter((one) => one.startsWith('deblock-design-system-'));
  const system = path.join(fixtures, folder);
  const sheet = readBoth(system);
  writeSystem(sheet, system);
  const git = (args: readonly string[]): void => {
    execFileSync('git', args, { cwd: COPY });
  };
  git(['mv', 'app/styles/tokens.css', 'legacy/tokens.css']);
  git(['mv', `app/styles/__fixtures__/${folder}`, `legacy/${folder}`]);
  const tokens = sheet.groups.flatMap((group) =>
    group.parts.flatMap((part) => part.tokens),
  );
  console.log(
    `design-system/ · ${tokens.length} tokens (${tokens.filter((one) => one.dark !== undefined).length} with a dark value), ${sheet.fonts.length} faces, ${sheet.elements.length} element styles; the product's own in app/styles/product-tokens.ts`,
  );
}

main();
