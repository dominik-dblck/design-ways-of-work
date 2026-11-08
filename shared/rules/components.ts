/**
 * - `shared` · components: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'A tier is what a component imports from `app/components/`: an atom nothing, a molecule atoms and at most one other molecule, an organism two or more molecules or a screen\'s own flow, a template a page\'s layout.', why: 'Counted, not judged, so two people sort a component the same way.', design: { gate: '`anAtomComposesNothing` · `aMoleculeComposesOneMolecule` · `review` (an organism)', exceptions: '—' }, build: { gate: '`anAtomComposesNothing` · `aMoleculeComposesOneMolecule`', exceptions: '—' } },
  { rule: 'A component file holds one component and its props type; a second component goes to `components/`, a type to `types/`, a helper to `utils/`, a constant to `constants/`, a hook to `hooks/`.', why: 'A file opened for a component shows that component and nothing else.', design: { gate: '`review`', exceptions: '—' }, build: { gate: '`oneComponentAFile` · `aComponentFileHoldsItsComponent`', exceptions: 'an icon: one flat file, its path data beside it' } },
  { rule: 'Hover text is a tooltip (the build side\'s `Hint`); no element carries a native `title`.', why: 'One look and one delay for every hover.', design: { gate: 'ESLint `wow/markup-syntax` (a hover text)', exceptions: '—' }, build: { gate: '`hoverTextIsAHint`', exceptions: '—' } },
];

export { shared };
