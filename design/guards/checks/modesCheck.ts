/**
 * - `modesLine` · the ticket modes, read off modes.json, their one home
 * - each mode and each skill a mode runs has its section in ticket-pipeline.md
 */
import { lineOf, parsedOr } from './checkWorld.ts';
import type { Mirror } from './checkWorld.ts';

const SKILL_HEADING = /^# `\.claude\/skills\/(ticket-[\w-]+)\/SKILL\.md`$/gm;

type Mode = { readonly id: string; readonly skills: readonly string[] };

const textsOf = (field: unknown): readonly string[] =>
  Array.isArray(field) ? field.map(String) : [];

function pageModes(mirror: Mirror): readonly Mode[] {
  const page: unknown = parsedOr(mirror.readOr('modes.json', null));
  const modes: unknown = Reflect.get(Object(page), 'modes');
  return Array.isArray(modes)
    ? modes.map((one: unknown) => ({
        id: String(Reflect.get(Object(one), 'id')),
        skills: textsOf(Reflect.get(Object(one), 'skills')),
      }))
    : [];
}

function modesLine(mirror: Mirror): string {
  const source = mirror.readOr('ticket-pipeline.md', '') ?? '';
  const sections = new Set(
    [...source.matchAll(SKILL_HEADING)].map(([, skill = '']) => skill),
  );
  const modes = pageModes(mirror);
  const faults = modes.flatMap(({ id, skills }) => [
    ...(skills.length ? [] : [`${id} runs no skill`]),
    ...[`ticket-${id}`, ...skills]
      .filter((skill) => !sections.has(skill))
      .map((skill) => `${id} · ${skill} has no section in ticket-pipeline.md`),
  ]);
  return lineOf('modes', {
    ok: modes.length > 0 && !faults.length,
    text: faults.length
      ? [...new Set(faults)].slice(0, 6).join(' | ')
      : `${modes.length} modes · each skill they run has its ticket-pipeline.md section`,
  });
}

export { modesLine };
