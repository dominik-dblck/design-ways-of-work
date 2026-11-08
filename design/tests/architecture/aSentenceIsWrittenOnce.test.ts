/**
 * - `docs/rules/one-home.md`: a sentence of the process is written once, in `CLAUDE.md`, a skill or a rule file
 * - a rule's text lives in `plans.js · RULES` alone: a skill and `CLAUDE.md` name a rule, never copy it
 */
import { describe, expect, it } from 'vitest';
import { rules } from '../../docs/process/plans.ts';
import { rows as productRows } from '../../sheet/rules.ts';
import { claudeMd, theSkills } from './skills.ts';
import { textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const WORDS = 8;
const A_RULE_SENTENCE = 60;
const A_FENCE = /```[\s\S]*?```/g;

/** The sentences of a text of at least eight words, whitespace and emphasis evened out. */
function sentencesIn(text: string): readonly string[] {
  return text
    .replace(A_FENCE, '')
    .split('\n')
    .flatMap((line) => line.split('|'))
    .flatMap((part) => part.split(/(?<=[.!?])\s+/))
    .map((one) =>
      one
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^[*_>\-\s\d.]+/, ''),
    )
    .filter((one) => /[.!?]$/.test(one) && one.split(' ').length >= WORDS);
}

/** Every sentence two files hold. */
function writtenTwice(sources: readonly Source[]): readonly string[] {
  const homes = new Map<string, Set<string>>();
  for (const source of sources)
    for (const sentence of sentencesIn(source.text))
      homes.set(sentence, (homes.get(sentence) ?? new Set()).add(source.path));
  return [...homes]
    .filter(([, files]) => files.size > 1)
    .map(([sentence, files]) => `${[...files].join(' · ')} · ${sentence}`)
    .sort();
}

const theProcess = (): readonly Source[] => [
  claudeMd(),
  ...theSkills(),
  ...textsUnder('docs/rules', ['.md']),
];

const ruleSentences = (): readonly string[] =>
  [...rules, ...productRows]
    .flatMap((rule) => `${rule.says} ${rule.why}`.split(/(?<=[.:])\s+/))
    .map((one) => one.trim())
    .filter((one) => one.length > A_RULE_SENTENCE);

describe('a sentence is written once', () => {
  it('a sentence in two files is found; a short one, a table cell and a fenced block are not', () => {
    const said = 'The pack is what the build side receives, so read it.';
    expect(
      writtenTwice([
        { path: 'a.md', text: `- ${said}\n- Read it.` },
        {
          path: 'b.md',
          text: `| ${said} | x |\n\`\`\`\nThe pack is cut.\n\`\`\``,
        },
        { path: 'c.md', text: 'Read it. The pack is cut.' },
      ]),
    ).toEqual([`a.md · b.md · ${said}`]);
  });

  it('no sentence of the process is written in two of its files', () => {
    expect(writtenTwice(theProcess())).toEqual([]);
  });

  it('no skill and no CLAUDE.md copies the text of a rule from plans.js', () => {
    const sentences = ruleSentences();
    expect(sentences.length, 'the rules are read').toBeGreaterThan(20);
    expect(
      [claudeMd(), ...theSkills()].flatMap((source) =>
        sentences
          .filter((one) => source.text.includes(one.slice(0, A_RULE_SENTENCE)))
          .map((one) => `${source.path} · ${one.slice(0, 50)}`),
      ),
    ).toEqual([]);
  });
});
