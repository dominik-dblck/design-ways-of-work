/**
 * - `writeNamedIcons` · each lucide icon a source names, as an SVG file at
 * - lucide-icons/<name>.svg, drawn from `lucide-react`'s data (W40, W109)
 * - a name the package lacks fails the build
 */
import fs from 'node:fs';
import path from 'node:path';
import { filesOf } from '../layout.ts';
import { ROOT } from '../root.ts';

const NAMED = /lucide-icons\/([a-z0-9-]+)\.svg/g;

type IconNode = readonly (readonly [
  string,
  Readonly<Record<string, string | number>>,
])[];

interface IconData {
  readonly name: string;
  readonly node: IconNode;
}

// the attributes every lucide icon draws with, as lucide writes them
const FRAME = [
  'xmlns="http://www.w3.org/2000/svg"',
  'width="24"',
  'height="24"',
  'viewBox="0 0 24 24"',
  'fill="none"',
  'stroke="currentColor"',
  'stroke-width="2"',
  'stroke-linecap="round"',
  'stroke-linejoin="round"',
];

// the icons any source names, each once
const namedIcons = (): ReadonlySet<string> =>
  new Set(
    filesOf()
      .filter((file) => /\.tsx?$/.test(file))
      .flatMap((file) =>
        [...fs.readFileSync(path.join(ROOT, file), 'utf8').matchAll(NAMED)].map(
          (found) => String(found[1]),
        ),
      ),
  );

// React's own key is no attribute of the drawing
const elementOf = ([tag, attributes]: IconNode[number]): string => {
  const written = Object.entries(attributes)
    .filter(([name]) => name !== 'key')
    .map(([name, setting]) => `${name}="${String(setting)}"`);
  return `  <${tag} ${written.join(' ')} />`;
};

const svgOf = ({ name, node }: IconData, version: string): string =>
  [
    `<!-- @license lucide-react v${version} - ISC -->`,
    '<svg',
    `  class="lucide lucide-${name}"`,
    ...FRAME.map((attribute) => `  ${attribute}`),
    '>',
    ...node.map(elementOf),
    '</svg>',
    '',
  ].join('\n');

const versionOf = (): string => {
  const manifest: Readonly<Record<string, unknown>> = JSON.parse(
    fs.readFileSync(
      new URL(import.meta.resolve('lucide-react/package.json')),
      'utf8',
    ),
  );
  return String(manifest.version);
};

const isIconData = (drawing: unknown): drawing is IconData =>
  typeof Reflect.get(Object(drawing), 'name') === 'string' &&
  Array.isArray(Reflect.get(Object(drawing), 'node'));

async function iconDataOf(name: string): Promise<IconData> {
  const loaded: unknown = await import(`lucide-react/icons/${name}`).catch(
    () => null,
  );
  const drawing: unknown = Reflect.get(Object(loaded), '__iconData');
  if (!isIconData(drawing))
    throw new Error(`lucide-react has no ${name}, which a source names`);
  return drawing;
}

async function writeNamedIcons(out: string): Promise<number> {
  const names = namedIcons();
  const version = versionOf();
  for (const name of names) {
    const to = path.join(out, 'lucide-icons', `${name}.svg`);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.writeFileSync(to, svgOf(await iconDataOf(name), version));
  }
  return names.size;
}

export { writeNamedIcons };
