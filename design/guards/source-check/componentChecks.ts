/**
 * - `componentsCheck` · a spec row without its drawing, a drawing without its row
 * - `propsCheck` · a prop never read, a sentence typed into a component's attribute
 */
import { isHistory, SHEET_PAGE } from './sourceScope.ts';
import type { SourceFinding, Texts } from './sourceCheckTypes.ts';

interface SpecRow {
  readonly id?: unknown;
  readonly wrapper?: unknown;
  readonly mui?: unknown;
  readonly wireframe?: unknown;
  readonly shape?: unknown;
  readonly ownedBy?: unknown;
}

type Spec = Readonly<Record<string, readonly SpecRow[] | undefined>>;

const VIEW = 'the view of it all';
const TIERS: readonly string[] = ['atoms', 'molecules', 'organisms'];

const baseOf = (row: SpecRow): string =>
  (
    String(row.wrapper || '')
      .split('/')
      .pop() ?? ''
  ).replace(/\.tsx?$/, '');

function muiOf(row: SpecRow): readonly unknown[] {
  if (Array.isArray(row.mui)) return row.mui;
  return row.mui ? [String(row.mui)] : [];
}

// a library atom is MUI's, unless one of its parts is custom
const isLibrary = (row: SpecRow, tier: string): boolean =>
  tier === 'atoms' &&
  muiOf(row).length > 0 &&
  !muiOf(row).some((one) => /custom/i.test(String(one)));

// a built row needs no drawing: a drawing stands until the report that builds it (rule:draft-until-built)
type Built = (ticket: string) => boolean;

// a row's wireframe names the drawings it is drawn in
function namedIn(row: SpecRow, drawings: readonly string[]): readonly string[] {
  const wireframe = String(row.wireframe || '');
  return drawings.filter((drawing) =>
    new RegExp(
      `(^|[^A-Za-z])${drawing.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`,
    ).test(wireframe),
  );
}

// a row is drawn by the drawing its wrapper names, or one its wireframe names
function undrawnRows(
  spec: Spec,
  {
    drawings,
    rowed,
    built,
  }: {
    readonly drawings: readonly string[];
    readonly rowed: Set<string>;
    readonly built: Built;
  },
): readonly SourceFinding[] {
  return TIERS.flatMap((tier) =>
    (spec[tier] ?? []).flatMap((row) => {
      const base = baseOf(row);
      rowed.add(base);
      if (row.shape) rowed.add(String(row.shape));
      if (
        isLibrary(row, tier) ||
        built(String(row.ownedBy)) ||
        drawings.includes(base) ||
        namedIn(row, drawings).length
      )
        return [];
      return [
        {
          kind: 'component without a drawing',
          row: VIEW,
          file: 'components.spec.json',
          line: 0,
          text: `${String(row.id)} · ${base}.dc.html`,
        },
      ];
    }),
  );
}

// the browser's window chrome is the wireframes' frame, never a product drawing
function componentsCheck(
  spec: Spec,
  {
    names,
    built = () => false,
  }: { readonly names?: readonly string[]; readonly built?: Built } = {},
): readonly SourceFinding[] {
  const drawings = (names ?? [])
    .filter((name) => /\.dc\.html$/.test(name))
    .map((name) => name.replace(/\.dc\.html$/, ''));
  const rowed = new Set<string>();
  const undrawn = undrawnRows(spec, { drawings, rowed, built });
  const unrowed = drawings
    .filter(
      (drawing) =>
        !rowed.has(drawing) &&
        !SHEET_PAGE.test(`${drawing}.dc.html`) &&
        !isHistory(`${drawing}.dc.html`) &&
        drawing !== 'Browser',
    )
    .map((drawing) => ({
      kind: 'drawing without a row',
      row: VIEW,
      file: `${drawing}.dc.html`,
      line: 0,
      text: `${drawing} · no row in components.spec.json`,
    }));
  return [...undrawn, ...unrowed];
}

const viewFinding = (
  kind: string,
  {
    file,
    line,
    text,
  }: { readonly file: string; readonly line: number; readonly text: string },
): SourceFinding => ({ kind, row: VIEW, file, line, text: text.slice(0, 140) });

function propsOf(text: string): object | null {
  const props = /data-props="([^"]*)"/.exec(text);
  if (!props) return null;
  try {
    const parsed: unknown = JSON.parse(
      String(props[1]).replace(/&quot;/g, '"'),
    );
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

// a prop is read as props.x, through a destructuring of the props, or as {{ x }} in the template
function readProps({
  code,
  template,
}: {
  readonly code: string;
  readonly template: string;
}): ReadonlySet<string> {
  const read = new Set<string>();
  for (const found of code.match(/\b(?:this\.props|props|p)\.(\w+)/g) ?? [])
    read.add(found.split('.').pop() ?? '');
  for (const found of code.match(/\{([^{}]*)\}\s*=\s*(?:this\.)?props\b/g) ??
    [])
    for (const key of found.slice(1, found.indexOf('}')).split(','))
      read.add((key.split(':')[0] ?? '').replace(/=.*$/, '').trim());
  for (const found of template.match(/\{\{ (\w+)/g) ?? [])
    read.add(found.slice(3));
  return read;
}

const PLAIN_ATTRIBUTE =
  /^(name|hint-size|style|src|icon|from|order|kind|mode|variant)$/;

function attributeSentences(
  file: string,
  template: string,
): readonly SourceFinding[] {
  return template.split('\n').flatMap((line, index) =>
    (line.match(/<dc-import name="[^"]+"[^>]*>/g) ?? []).flatMap((tag) =>
      (tag.match(/\s([\w-]+)="([^"{][^"]*)"/g) ?? []).flatMap((attribute) => {
        const [, name = '', value = ''] =
          /\s([\w-]+)="([^"]*)"/.exec(attribute) ?? [];
        if (
          PLAIN_ATTRIBUTE.test(name) ||
          !/[A-Za-z]{2,}[’']?\w* [a-z]{2,}\w* [a-z]{2,}/.test(value)
        )
          return [];
        const component = String(/name="([^"]+)"/.exec(tag)?.[1]);
        return [
          viewFinding('sentence in an attribute', {
            file,
            line: index + 1,
            text: `${component} ${name}="${value}"`,
          }),
        ];
      }),
    ),
  );
}

function propsCheck(pages?: Texts): readonly SourceFinding[] {
  return Object.keys(pages ?? {}).flatMap((file) => {
    const text = String(pages?.[file] || '');
    const props = propsOf(text);
    const start = text.indexOf('class Component');
    const code = start >= 0 ? text.slice(start) : '';
    const script = text.indexOf('<script data-dc-script');
    const template = text.slice(0, script >= 0 ? script : text.length);
    const read = props ? readProps({ code, template }) : new Set<string>();
    const unread = Object.keys(props ?? {})
      .filter((key) => key !== '$preview' && !read.has(key))
      .map((key) =>
        viewFinding('prop never read', {
          file,
          line: 0,
          text: `${file.replace('.dc.html', '')}.${key}`,
        }),
      );
    return [...unread, ...attributeSentences(file, template)];
  });
}

export { componentsCheck, propsCheck };
