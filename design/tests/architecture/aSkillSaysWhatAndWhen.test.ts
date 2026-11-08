/**
 * - `docs/rules/names.md`: a skill's `description` says what it does and when to use it
 * - at most 1024 characters, as Anthropic's skill guide caps it; its `name` is its folder's
 */
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { theSkills } from './skills.ts';
import type { Source } from './tree.ts';

const LONGEST = 1024;
const A_FIELD = (field: string): RegExp =>
  new RegExp(`^---\\n[\\s\\S]*?^${field}:[ \\t]*(.+)$[\\s\\S]*?^---$`, 'm');
const A_WHEN = /\bUse (?:it )?when\b/;

/** Why a skill's head falls short · nothing when it says what and when, under its folder's name. */
function shortfallOf(source: Source): readonly string[] {
  const description = A_FIELD('description').exec(source.text)?.[1]?.trim();
  const name = A_FIELD('name').exec(source.text)?.[1]?.trim();
  if (description === undefined || description === '')
    return ['no description'];
  return [
    description.length > LONGEST ? `${description.length} characters` : null,
    A_WHEN.test(description) ? null : 'no "Use when"',
    name === path.posix.basename(path.posix.dirname(source.path))
      ? null
      : `named ${String(name)}`,
  ].filter((why): why is string => why !== null);
}

describe('a skill says what it does and when to use it', () => {
  it('no when, too long, none at all and a wrong name are found; one with both is not', () => {
    const skill = (head: string): Source => ({
      path: '.claude/skills/planted/SKILL.md',
      text: `---\n${head}\n---\n\n# Planted\n`,
    });
    expect(
      shortfallOf(skill('name: planted\ndescription: Writes a doc.')),
    ).toEqual(['no "Use when"']);
    expect(
      shortfallOf(
        skill(
          `name: planted\ndescription: Do. Use when asked. ${'x'.repeat(LONGEST)}`,
        ),
      ),
    ).toEqual([`${LONGEST + 20} characters`]);
    expect(shortfallOf(skill('name: planted'))).toEqual(['no description']);
    expect(
      shortfallOf(skill('name: other\ndescription: Writes. Use when asked.')),
    ).toEqual(['named other']);
    expect(
      shortfallOf(skill('name: planted\ndescription: Writes. Use when asked.')),
    ).toEqual([]);
  });

  it('every skill of the design side says what and when, under its folder name', () => {
    const skills = theSkills();
    expect(skills.length, 'the build writes the skills').toBeGreaterThan(5);
    expect(
      skills.flatMap((source) =>
        shortfallOf(source).map((why) => `${source.path} · ${why}`),
      ),
    ).toEqual([]);
  });
});
