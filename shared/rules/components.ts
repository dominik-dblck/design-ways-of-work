/**
 * - `shared` · components: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'A tier is what a component imports from `app/components/`: an atom nothing, a molecule atoms and at most one other molecule, an organism two or more molecules or a screen\'s own flow, a template a page\'s layout.', why: 'Counted, not judged, so two people sort a component the same way.', design: { gate: 'ESLint `boundaries/dependencies` (an atom, a molecule above its tier) · ESLint `wow/molecules-compose-one-molecule` · `review` (an organism)', exceptions: '—' }, build: { gate: '`anAtomComposesNothing` · `aMoleculeComposesOneMolecule`', exceptions: '—' } },
  { rule: 'An organism is reached through its barrel, its `index.ts`: a page mounts one, and another organism renders it, only through that file.', why: 'The barrel is the organism\'s face; the files behind it can move.', design: { gate: 'ESLint `boundaries/dependencies` (past a barrel)', exceptions: '—' }, build: { gate: '`organismsMeetAtTheBarrel`', exceptions: '—' } },
  { rule: 'A renderer is an app inside the app: it draws another product\'s design system, with tiers and colours of its own. It imports nothing of the app around it, and the app enters it at a component\'s barrel, its `index.ts`, whatever that component\'s tier there.', why: 'The app sees a renderer from outside, one embedded whole, as it sees a package\'s component; the dependency runs one way, the app to the renderer, never back.', design: { gate: 'ESLint `wow/renderer-stands-alone` · ESLint `boundaries/dependencies` (its tiers, held within it)', exceptions: '—' }, build: { gate: '`review`', exceptions: '—' } },
  { rule: 'A molecule reads no context, and an organism reads one in its `providers/` or `hooks/` alone: `useContext` and `use` are imported by name there, and a hook is never read off `React`.', why: 'A component that reads a context draws what it fetched, not what it was handed; a read kept in one layer is found in one place.', design: { gate: 'ESLint `boundaries/dependencies` (a context) · ESLint `no-restricted-syntax` (a hook off `React`)', exceptions: '—' }, build: { gate: '`theMoleculesAreDumb` · `organismPartsOnlyDraw`', exceptions: '—' } },
  { rule: 'A component file holds one component and its props type; a second component goes to `components/`, a type to `types/`, a helper to `utils/`, a constant to `constants/`, a hook to `hooks/`.', why: 'A file opened for a component shows that component and nothing else.', design: { gate: 'ESLint `wow/component-file-holds-its-component`', exceptions: 'a provider\'s file, an icon\'s' }, build: { gate: '`oneComponentAFile` · `aComponentFileHoldsItsComponent`', exceptions: 'an icon: one flat file, its path data beside it' } },
  { rule: 'Hover text is a tooltip (the build side\'s `Hint`); no element carries a native `title`.', why: 'One look and one delay for every hover.', design: { gate: 'ESLint `wow/markup-syntax` (a hover text)', exceptions: '—' }, build: { gate: '`hoverTextIsAHint`', exceptions: '—' } },
];

export { shared };
