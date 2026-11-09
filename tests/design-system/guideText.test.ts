import { describe, expect, it } from 'vitest';
import { guide } from '../../design-system/guide.ts';
import { guideText } from '../../design-system/guideText.ts';
import type { Guide } from '../../design-system/designTypes.ts';

// a guide of one section holding the given lines
const guideOf = (lines: readonly string[]): Guide => ({
  title: 'Small',
  intro: [],
  sections: [{ heading: 'One', level: 2, lines }],
});

describe('the guide names each value by its token', () => {
  it('writes the whole guide, every token it names found, nothing left in braces', () => {
    expect(guideText(guide)).not.toMatch(/\{(?:--|why:)/);
  });

  it('writes a token with its value, its dark one when asked, through each `var()`', () => {
    const text = guideText(
      guideOf(['Canvas {--n-25}, dark {--bg-subtle:dark}.']),
    );
    expect(text).toContain('Canvas `--n-25` (#fbfaf9), dark `--bg-subtle` (');
    expect(text).toMatch(/`--bg-subtle` \(#[0-9a-f]{6} dark\)/);
  });

  it('lists the tokens a `{why:}` names, each with its value and its use', () => {
    expect(guideText(guideOf(['{why:--r-pill,--shadow-card}']))).toContain(
      '- `--r-pill` (999px) · primary CTAs\n- `--shadow-card` (',
    );
  });

  it('refuses a token the system does not hold, and a listed one without a use', () => {
    expect(() => guideText(guideOf(['{--n-26}']))).toThrow('no token --n-26');
    expect(() => guideText(guideOf(['{why:--r-xxs}']))).toThrow(
      '--r-xxs has no use',
    );
  });

  it('opens with the parts it holds, under `## Contents`', () => {
    expect(guideText(guide)).toContain(
      '## Contents\n\n- CONTENT FUNDAMENTALS\n- VISUAL FOUNDATIONS\n- ICONOGRAPHY\n',
    );
  });
});
