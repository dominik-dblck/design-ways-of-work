/**
 * - `pagesPart` · part r: every page's logic made as the runtime makes it, no props,
 * - and its values asked: a class that does not evaluate, a renderVals that throws
 */
import { lineOf, messageOf } from './checkWorld.ts';
import type { Mirror, World } from './checkWorld.ts';
import { PageLogic, REACT } from './pageShims.ts';
import { legacyWorld } from './legacyWorld.ts';
import * as CONTENT_SAMPLES from '../../sheet/samples/content-samples.ts';
import * as CONTENT_TYPES from '../../sheet/model/content-types.ts';

type Made = { readonly state: unknown; readonly renderVals?: unknown };
type Page = new (props: unknown) => Made;

const SCRIPT =
  /<script type="text\/x-dc" data-dc-script(?: data-props="[^"]*")?[^>]*>/;

// a page's second path, with something open: the type page hands the editor a document by id
function openProps(file: string): unknown {
  if (file !== 'EditorScreen.dc.html') return null;
  const samples = CONTENT_SAMPLES;
  const slug = Reflect.get(Object(CONTENT_TYPES), 'defaultType');
  const document = samples && samples.groups(slug)[0]?.docs[0];
  return document ? { docId: document.id, slug } : null;
}

function made(Made: Page, props: unknown): void {
  const page = new Made(props);
  if (page.state == null) Reflect.set(page, 'state', {});
  if (typeof page.renderVals === 'function') page.renderVals();
}

// the open path asks for its values whatever the class holds
function opened(Made: Page, props: unknown): void {
  const page = new Made(props);
  Reflect.set(page, 'state', { ...Object(page.state || {}) });
  if (typeof page.renderVals !== 'function')
    throw new TypeError('c2.renderVals is not a function');
  page.renderVals();
}

// the logic made from its source; a class that does not evaluate is the fault
function classOf(logic: string, world: World): Page | string {
  try {
    return new Function(
      'DCLogic',
      'React',
      'window',
      'document',
      `${logic}\n;return Component;`,
    )(PageLogic, REACT, world, world.document);
  } catch (error) {
    return messageOf(error);
  }
}

// made with no props, then with something open: each throw is a fault
function madeFaults(file: string, Made: Page): readonly string[] {
  const faults: string[] = [];
  try {
    made(Made, {});
  } catch (error) {
    faults.push(`${file} · renderVals · ${messageOf(error).slice(0, 90)}`);
  }
  try {
    const props = openProps(file);
    if (props) opened(Made, props);
  } catch (error) {
    faults.push(
      `${file} · renderVals, open · ${messageOf(error).slice(0, 90)}`,
    );
  }
  return faults;
}

function pageFaults(
  file: string,
  { text, world }: { readonly text: string; readonly world: World },
): readonly string[] {
  const tag = SCRIPT.exec(text)?.[0];
  if (!tag) return [];
  const start = text.indexOf(tag) + tag.length;
  const logic = text.slice(start, text.indexOf('</script>', start));
  const faults: string[] = [];
  if (/MSG\(\)|window\.Messages/.test(text.slice(0, text.indexOf(tag))))
    faults.push(
      `${file} · class · code in the markup (a JS read where a {{ hole }} belongs)`,
    );
  if (!/class Component/.test(logic)) return faults;
  if ((logic.match(/\n {2}componentDidMount\(\) \{/g) ?? []).length > 1)
    faults.push(`${file} · two componentDidMount`);
  const Made = classOf(logic, world);
  if (typeof Made === 'string') return [...faults, `${file} · class · ${Made}`];
  return [...faults, ...madeFaults(file, Made)];
}

// a page whose renderVals throws fails too
function pagesPart(mirror: Mirror): readonly string[] {
  const world = legacyWorld(mirror);
  const pages = mirror.list().filter((file) => /\.dc\.html$/.test(file));
  const faults = pages.flatMap((file) =>
    pageFaults(file, { text: mirror.read(file), world }),
  );
  return [
    lineOf('pages run', {
      ok: !faults.length,
      text: faults.length
        ? `${faults.length} · ${faults.slice(0, 12).join(' | ')}`
        : `${pages.length} pages`,
    }),
  ];
}

export { pagesPart };
