/**
 * - a skill's `description` says what it does and when, in 1024 characters at most
 * - its `name` is its folder's: each skill the scope lists, `instructions.skills`
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { heldToItsBaseline } from './baseline.ts';
import { filesNamedBy, globsNamingNothing } from './globs.ts';

interface Text {
  readonly path: string;
  readonly text: string;
}

// as Anthropic's skill guide caps a description
const LONGEST = 1024;
const A_FIELD = (field: string): RegExp =>
  new RegExp(`^---\\n[\\s\\S]*?^${field}:[ \\t]*(.+)$[\\s\\S]*?^---$`, 'm');
const A_WHEN = /\bUse (?:it )?when\b/;

// why a skill's head falls short: nothing when it says what and when, under its folder's name
function shortfallOf(skill: Text): readonly string[] {
  const description = A_FIELD('description').exec(skill.text)?.[1]?.trim();
  const name = A_FIELD('name').exec(skill.text)?.[1]?.trim();
  if (description === undefined || description === '')
    return ['no description'];
  return [
    description.length > LONGEST ? `over ${String(LONGEST)} characters` : null,
    A_WHEN.test(description) ? null : 'no "Use when"',
    name === path.posix.basename(path.posix.dirname(skill.path))
      ? null
      : `named ${String(name)}`,
  ].filter((why): why is string => why !== null);
}

describe('a skill says what it does and when to use it', () => {
  it('no when, too long, none at all and a wrong name are found; one with both is not', () => {
    const skill = (head: string): Text => ({
      path: '.claude/skills/planted/SKILL.md',
      text: `---\n${head}\n---\n\n# Planted\n`,
    });
    const tooLong = `Do. Use when asked. ${'x'.repeat(LONGEST)}`;
    expect(
      shortfallOf(skill('name: planted\ndescription: Writes a doc.')),
    ).toEqual(['no "Use when"']);
    expect(
      shortfallOf(skill(`name: planted\ndescription: ${tooLong}`)),
    ).toEqual([`over ${String(LONGEST)} characters`]);
    expect(shortfallOf(skill('name: planted'))).toEqual(['no description']);
    expect(
      shortfallOf(skill('name: other\ndescription: Writes. Use when asked.')),
    ).toEqual(['named other']);
    expect(
      shortfallOf(skill('name: planted\ndescription: Writes. Use when asked.')),
    ).toEqual([]);
  });

  it('each glob of the scope names a skill, and each says what and when, beyond its baseline', () => {
    const { skills } = scope.instructions;
    expect(
      globsNamingNothing(scope, skills),
      'a glob that names no skill',
    ).toEqual([]);
    // an entry per reason: a reason gained is new, one fixed leaves the list alone
    const short = filesNamedBy(scope, skills).flatMap((file) => {
      const text = fs.readFileSync(path.join(scope.root, file), 'utf8');
      return shortfallOf({ path: file, text }).map((why) => `${file} · ${why}`);
    });
    expect(heldToItsBaseline('aSkillSaysWhatAndWhen', short)).toEqual({
      added: [],
      fixed: [],
    });
  });
});
