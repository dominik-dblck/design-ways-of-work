/**
 * - `rules` · components: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/components.ts';

const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: 'The tiers are counted by tests that run on `app/components/` already; the rows still held by `review` get their test with the first component.',
  rows: [
    { rule: 'Every component is a row of `app/styles/components.spec.ts` (built into `fixtures/data/components.spec.json`).', gate: '`review`', exceptions: '—', why: 'A shape the wireframes do not draw is a question, not a component.' },
    { rule: "Every glyph is Lucide's, through `lucide-react` by name, never a copied SVG (D10).", gate: '`review`', exceptions: '—', why: { shared: 'oneGlyphSet' } },
    { rule: "A page reads the sheet's entries as modules and holds no rule of the sheet; it draws the answer.", gate: '`review`', exceptions: '—', why: 'A rule copied onto a page is decided twice, and the copies drift.' },
  ],
  outro: '',
});

export { rules };
