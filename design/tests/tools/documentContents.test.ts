import { describe, expect, it } from 'vitest';
import { withContents } from '../../tools/emit/documentContents.ts';

// `count` filler lines, so a document or a section runs past 100 lines or stays under
const filler = (count: number): readonly string[] =>
  Array.from({ length: count }, (_, at) => `line ${at}`);

const sectionOf = (path: string, count: number): readonly string[] => [
  '---',
  '',
  `# \`${path}\``,
  '',
  '## One',
  ...filler(count),
  '## Two',
  '',
];

describe('a long document opens with its contents', () => {
  it('a document of sections past 100 lines lists them above its first', () => {
    const text = [
      '# Convention',
      '',
      '## Routes',
      ...filler(100),
      '## Bodies',
      '',
    ].join('\n');
    expect(withContents(text).split('\n').slice(0, 9)).toEqual([
      '# Convention',
      '',
      '## Contents',
      '',
      '- Routes',
      '- Bodies',
      '',
      '## Routes',
      'line 0',
    ]);
  });

  it('a document of 100 lines or fewer is printed as it is', () => {
    const text = ['# Short', '', '## A', ...filler(90), '## B', ''].join('\n');
    expect(withContents(text)).toBe(text);
  });

  it("a document of parts lists its opening's headings, then each part", () => {
    const text = [
      '# Pipeline',
      '',
      '## Sync',
      '',
      ...sectionOf('.claude/skills/a/SKILL.md', 45),
      ...sectionOf('.claude/skills/b/SKILL.md', 45),
    ].join('\n');
    expect(withContents(text).split('\n').slice(2, 8)).toEqual([
      '## Contents',
      '',
      '- Sync',
      '- `.claude/skills/a/SKILL.md`',
      '- `.claude/skills/b/SKILL.md`',
      '',
    ]);
  });

  it('a section the build side cuts, past 100 lines, opens with its own; a short one does not', () => {
    const text = [
      '# Pipeline',
      '',
      ...sectionOf('.claude/skills/long/SKILL.md', 100),
      ...sectionOf('.claude/skills/short/SKILL.md', 10),
    ].join('\n');
    const lines = withContents(text).split('\n');
    const cut = lines.indexOf('# `.claude/skills/long/SKILL.md`');
    expect(lines.slice(cut + 2, cut + 8)).toEqual([
      '## Contents',
      '',
      '- One',
      '- Two',
      '',
      '## One',
    ]);
    expect(lines.filter((line) => line === '## Contents')).toHaveLength(1);
  });
});
