/**
 * - `shared` · types: title, opening, rules and reasons both sides share
 */
import type { SharedRules } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: SharedRules<'highestRung' | 'noCast'> = {
  title: 'Types',
  opening: 'A type holds the values the code can meet and no others.',
  rows: [
    { rule: 'No `any`.', why: '`any` switches the checker off for everything the value touches.', design: { gate: 'ESLint `no-explicit-any`', exceptions: '—' }, build: { gate: 'ESLint `no-explicit-any`', exceptions: '—' } },
    { rule: 'An exported function states its parameter and return types.', why: 'The signature is the contract a caller reads; an inferred one changes when the body does.', design: { gate: 'ESLint `explicit-module-boundary-types`', exceptions: '—' }, build: { gate: 'ESLint `explicit-module-boundary-types`', exceptions: '—' } },
    { rule: 'A type-only import is `import type`.', why: 'It is erased at build, so a client bundle never pulls a server module in through a type.', design: { gate: 'ESLint `consistent-type-imports`', exceptions: '—' }, build: { gate: 'ESLint `consistent-type-imports`', exceptions: 'never together with `verbatimModuleSyntax`, which conflicts with it' } },
    { rule: 'A `switch` over a union handles every member.', why: 'A member added to the union is a red line at every switch, not a silent fall-through.', design: { gate: 'ESLint `switch-exhaustiveness-check`', exceptions: '—' }, build: { gate: 'ESLint `switch-exhaustiveness-check`', exceptions: '—' } },
    { rule: 'A field always present is not optional; shapes that differ are a discriminated union (`{ kind: \'error\'; message } \\| { kind: \'ok\'; data }`), not one shape of optional fields; a union of literals stands where a boolean flag would.', why: 'Each shape says what it carries, so no reader checks a field the shape cannot have.', design: { gate: '`review`', exceptions: 'a row of the sheet\'s data that leaves a field out, as written' }, build: { gate: '`review`', exceptions: '—' } },
    { rule: 'Data nobody mutates is `readonly` (`readonly T[]`, `.readonly()` on a schema).', why: 'A mutation becomes a compile error instead of a shared-state bug.', design: { gate: 'ESLint `wow/data-is-readonly`', exceptions: 'a function\'s local · a tally a scan fills as it runs, named in `eslint.config.ts` (`mutable`)' }, build: { gate: '`dataIsReadonly`', exceptions: 'a function\'s local · a `declare module` augmentation, which follows its library · a ref\'s `current` · the working states and library hand-offs `tests/architecture/mutableByDesign.json` names with their why' } },
    { rule: 'The code compiles under one base both sides extend, `shared/tsconfig.base.json`: `strict` and the checks beside it; a side\'s own tsconfig adds its environment alone (target, modules, types, paths).', why: 'Strict is the floor every rule above stands on, and one base keeps both sides on one floor.', design: { gate: '`tsc` (pre-commit)', exceptions: '—' }, build: { gate: '`yarn tsc` (pre-commit)', exceptions: '—' } },
    { rule: 'A brand is a zod brand declared in its home (`z.string().min(1).brand<\'BlockId\'>()`; the build side\'s `packages/domain/model/brands/`), never `string & { __brand }`.', why: 'The zod brand has a `parse`; the hand-written one can only be entered by a cast.', design: { gate: 'ESLint `no-restricted-syntax` (`__brand`) · ESLint `wow/production-syntax` (`.brand()` outside its home)', exceptions: '—' }, build: { gate: '`brandsCrossOnce` · `review`', exceptions: '—' } },
    { rule: 'A schema is strict at every depth (`z.strictObject`), an answer read off the wire as much as a body, a payload or a record: a key it does not name is refused.', why: 'Drift between the server and a screen fails a test, not a reader; one style, since an answer\'s rows were strict already.', design: { gate: 'ESLint `wow/production-syntax` (a loose schema)', exceptions: '—' }, build: { gate: '`aSchemaIsStrict`', exceptions: 'the two that read part of something bigger: a refusal read for its reason in `getDiffService`, the clipboard\'s copy · a `.catchall` names its keys too' } },
    { rule: 'No deprecated API: what a declaration marks `@deprecated` is replaced by what it names instead.', why: 'A deprecated call breaks on its library\'s next major, and its successor is already written down.', design: { gate: 'ESLint `no-deprecated`', exceptions: 'ESLint\'s `builtinRules`, the one door to a core rule\'s module, deprecated with no successor' }, build: { gate: '`review`', exceptions: 'until its port, each deprecated call replaced or held in `eslint-suppressions.json`' } },
  ],
  whys: {
    highestRung: 'A primitive where the set is known lets a wrong value compile.',
    noCast: 'A cast is the one place the compiler takes the code\'s word for it.',
  },
};

export { shared };
