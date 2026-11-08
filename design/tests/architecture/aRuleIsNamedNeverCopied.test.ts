/**
 * - `docs/rules/one-home.md`: a rule's text lives in `plans.js · RULES` alone
 * - a skill and `CLAUDE.md` name a rule, never copy it
 */
import { describe, expect, it } from 'vitest';
import { rules } from '../../docs/process/plans.ts';
import { rows as productRows } from '../../sheet/rules.ts';
import { claudeMd, theSkills } from './skills.ts';

const A_RULE_SENTENCE = 60;

const ruleSentences = (): readonly string[] =>
  [...rules, ...productRows]
    .flatMap((rule) => `${rule.says} ${rule.why}`.split(/(?<=[.:])\s+/))
    .map((one) => one.trim())
    .filter((one) => one.length > A_RULE_SENTENCE);

describe('a rule is named, never copied', () => {
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
