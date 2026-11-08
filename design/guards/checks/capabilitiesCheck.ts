/**
 * - `capabilitiesLine` · how the app works (D20): each pointer names a live export
 * - read by the sheet's grammar (`Tickets.filePointer`), each named bundle run
 */
import { bareWorld, lineOf, loadAll } from './checkWorld.ts';
import type { Mirror, World } from './checkWorld.ts';
import * as CAPABILITIES from '../../sheet/logic/capabilities.ts';
import * as TICKETS from '../../roadmaps/tickets.ts';

type FilePointer = (typeof TICKETS)['filePointer'];

const globalOf = (file: string): string =>
  file
    .replace(/\.(js|ts)$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

// a pointer whose bundle does not set the name it points at
function brokenIn(
  world: World,
  {
    pointer,
    filePointer,
  }: { readonly pointer: string; readonly filePointer: FilePointer },
): string | null {
  const named = filePointer(pointer);
  if (!named?.place) return `${pointer} · not a file and a name`;
  const loaded: unknown = world[globalOf(named.file)];
  return loaded && typeof loaded === 'object' && named.place in loaded
    ? null
    : `${pointer} · ${named.file} sets no ${named.place}`;
}

// a pointer names a file, so the check runs the bundles the pointers name, by name
function capabilitiesLine(mirror: Mirror): string {
  const filePointer = TICKETS.filePointer;
  const all = CAPABILITIES.all;
  const pointers = all.flatMap((one) => [
    ...one.states,
    ...one.rules,
    ...one.walk.map((step) => step.at),
    ...one.examples,
  ]);
  // a pointer names the module's source; the check runs its bundle, the same name as .js
  const files = [
    ...new Set(
      pointers.map((one) => filePointer(one)?.file.replace(/\.ts$/, '.js')),
    ),
  ];
  const world: World = bareWorld();
  loadAll(world, {
    mirror,
    files: files.filter((file): file is string => !!file),
  });
  const broken = pointers.flatMap(
    (pointer) => brokenIn(world, { pointer, filePointer }) ?? [],
  );
  return lineOf('capabilities', {
    ok: all.length > 0 && !broken.length,
    text: broken.length
      ? broken.slice(0, 6).join(' | ')
      : `${all.length} capabilities · ${pointers.length} pointers, each a live export`,
  });
}

export { capabilitiesLine };
