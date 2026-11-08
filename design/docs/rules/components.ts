/**
 * - `rules` · components: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Components',
  intro:
    '\nFor the React pages, once a page\nmoves (D7). The tiers are counted by tests that run on `app/components/` already; the rows still held by\n`review` get their test with the first component.\n',
  rows: [
    {
      rule: 'A tier is what a component imports from `components/`: an atom nothing, a molecule atoms and at most one other molecule, an organism two or more molecules.',
      gate: '`anAtomComposesNothing` · `aMoleculeComposesOneMolecule` · `review` (an organism)',
      exceptions: '—',
      why: 'Counted, not judged, so two people sort a component the same way.',
    },
    {
      rule: 'A component file holds one component and its props type; a second component, a type, a helper, a constant or a hook goes to its own folder.',
      gate: '`review`',
      exceptions: '—',
      why: 'A file opened for a component shows that component and nothing else.',
    },
    {
      rule: 'Every component is a row of `app/styles/components.spec.ts` (built into `fixtures/data/components.spec.json`).',
      gate: '`review`',
      exceptions: '—',
      why: 'A shape the wireframes do not draw is a question, not a component.',
    },
    {
      rule: "Every glyph is Lucide's, through `lucide-react` by name, never a copied SVG (D10).",
      gate: '`review`',
      exceptions: '—',
      why: 'One set, one stroke, sizes from the tokens.',
    },
    {
      rule: "A page reads the sheet's entries as modules and holds no rule of the sheet; it draws the answer.",
      gate: '`review`',
      exceptions: '—',
      why: 'A rule copied onto a page is decided twice, and the copies drift.',
    },
  ],
  outro: '',
};

export { rules };
