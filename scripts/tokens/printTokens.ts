/**
 * - `groupsModule` · a home's token groups as one TypeScript module, a line a token
 * - `fontsModule`, `elementsModule`, `originModule` · the faces, the element styles, the system's notes
 */
import { quoted } from '../tsLiteral.ts';
import type {
  ElementStyle,
  FontFace,
  SheetGroup,
  SheetToken,
} from './sheetTypes.ts';

const HEADER = (bullets: readonly string[]): readonly string[] => [
  '/**',
  ...bullets.map((bullet) => ` * - ${bullet}`),
  ' */',
];

const OPTIONAL: readonly (keyof SheetToken)[] = [
  'dark',
  'reducedMotion',
  'why',
  'whyDark',
];

function tokenLine(token: SheetToken): string {
  const fields = [
    `name: ${quoted(token.name)}`,
    `light: ${quoted(token.light)}`,
    ...OPTIONAL.flatMap((key) => {
      const value = token[key];
      return value === undefined ? [] : [`${key}: ${quoted(value)}`];
    }),
  ];
  return `      { ${fields.join(', ')} },`;
}

function groupLines(group: SheetGroup): readonly string[] {
  return [
    '  {',
    `    title: ${quoted(group.title)},`,
    `    intro: ${quoted(group.intro)},`,
    ...(group.darkNotes.length
      ? [`    darkNote: ${quoted(group.darkNotes.join('\n\n'))},`]
      : []),
    '    entries: [',
    ...group.parts.flatMap((part) => [
      ...(part.note === null ? [] : [`      { note: ${quoted(part.note)} },`]),
      ...part.tokens.map(tokenLine),
    ]),
    '    ],',
    '  },',
  ];
}

function groupsModule({
  name,
  about,
  groups,
  types,
}: {
  readonly name: string;
  readonly about: string;
  readonly groups: readonly SheetGroup[];
  readonly types: string;
}): string {
  return [
    ...HEADER([`\`${name}\` · ${about}`]),
    `import type { TokenGroup } from '${types}';`,
    '',
    '// prettier-ignore',
    `const ${name}: readonly TokenGroup[] = [`,
    ...groups.flatMap(groupLines),
    '];',
    '',
    `export { ${name} };`,
    '',
  ].join('\n');
}

function dataModule({
  bullet,
  declarations,
  names,
  types,
}: {
  readonly bullet: string;
  readonly declarations: readonly string[];
  readonly names: readonly string[];
  readonly types: readonly string[];
}): string {
  return [
    ...HEADER([bullet]),
    ...(types.length
      ? [`import type { ${types.join(', ')} } from './designTypes.ts';`, '']
      : []),
    ...declarations,
    `export { ${names.join(', ')} };`,
    '',
  ].join('\n');
}

const fontsModule = (fonts: readonly FontFace[], note: string): string =>
  dataModule({
    bullet:
      '`fonts`, `fontsNote` · the faces of the families, each a file in `fonts/`',
    types: ['FontFace'],
    names: ['fonts', 'fontsNote'],
    declarations: [
      `const fontsNote = ${quoted(note)};`,
      '',
      '// prettier-ignore',
      'const fonts: readonly FontFace[] = [',
      ...fonts.map(
        (face) =>
          `  { family: ${quoted(face.family)}, file: ${quoted(face.file)}, format: ${quoted(face.format)}, weight: ${face.weight}, style: ${quoted(face.style)}, display: ${quoted(face.display)} },`,
      ),
      '];',
      '',
    ],
  });

const elementsModule = (
  elements: readonly ElementStyle[],
  note: string,
): string =>
  dataModule({
    bullet:
      '`elements`, `elementsNote` · the styles an element or a class takes',
    types: ['ElementStyle'],
    names: ['elements', 'elementsNote'],
    declarations: [
      `const elementsNote = ${quoted(note)};`,
      '',
      '// prettier-ignore',
      'const elements: readonly ElementStyle[] = [',
      ...elements.map(
        (one) =>
          `  { selector: ${quoted(one.selector)}, style: [${one.style.map(([prop, value]) => `[${quoted(prop)}, ${quoted(value)}]`).join(', ')}] },`,
      ),
      '];',
      '',
    ],
  });

const originModule = (origin: string, darkRule: string): string =>
  dataModule({
    bullet:
      '`origin`, `darkRule` · where the system came from; how dark mode is kept',
    types: [],
    names: ['darkRule', 'origin'],
    declarations: [
      `const origin = ${quoted(origin)};`,
      '',
      `const darkRule = ${quoted(darkRule)};`,
      '',
    ],
  });

export { elementsModule, fontsModule, groupsModule, originModule };
