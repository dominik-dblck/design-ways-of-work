/**
 * - `shared` · types: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'No `any`.', why: '`any` switches the checker off for everything the value touches.', design: { gate: 'ESLint `no-explicit-any`', exceptions: '—' }, build: { gate: 'ESLint `no-explicit-any`', exceptions: '—' } },
  { rule: 'An exported function states its parameter and return types.', why: 'The signature is the contract a caller reads; an inferred one changes when the body does.', design: { gate: 'ESLint `explicit-module-boundary-types`', exceptions: '—' }, build: { gate: 'ESLint `explicit-module-boundary-types`', exceptions: '—' } },
  { rule: 'A type-only import is `import type`.', why: 'It is erased at build, so a client bundle never pulls a server module in through a type.', design: { gate: 'ESLint `consistent-type-imports`', exceptions: '—' }, build: { gate: 'ESLint `consistent-type-imports`', exceptions: 'never together with `verbatimModuleSyntax`, which conflicts with it' } },
  { rule: 'A `switch` over a union handles every member.', why: 'A member added to the union is a red line at every switch, not a silent fall-through.', design: { gate: 'ESLint `switch-exhaustiveness-check`', exceptions: '—' }, build: { gate: 'ESLint `switch-exhaustiveness-check`', exceptions: '—' } },
  { rule: 'A field always present is not optional; shapes that differ are a discriminated union (`{ kind: \'error\'; message } \\| { kind: \'ok\'; data }`), not one shape of optional fields; a union of literals stands where a boolean flag would.', why: 'Each shape says what it carries, so no reader checks a field the shape cannot have.', design: { gate: '`review`', exceptions: 'a row of the sheet\'s data that leaves a field out, as written' }, build: { gate: '`review`', exceptions: '—' } },
  { rule: 'Data nobody mutates is `readonly` (`readonly T[]`, `.readonly()` on a schema).', why: 'A mutation becomes a compile error instead of a shared-state bug.', design: { gate: 'ESLint `wow/data-is-readonly`', exceptions: 'a function\'s local · a tally a scan fills as it runs, named in `eslint.config.ts` (`mutable`)' }, build: { gate: '`dataIsReadonly`', exceptions: 'a function\'s local · a `declare module` augmentation, which follows its library · a ref\'s `current` · the working states and library hand-offs `tests/architecture/mutableByDesign.json` names with their why' } },
  { rule: 'The code compiles under `strict`.', why: 'Strict is the floor every rule above stands on.', design: { gate: '`tsc` (pre-commit)', exceptions: '—' }, build: { gate: '`yarn tsc` (pre-commit)', exceptions: '—' } },
];

export { shared };
