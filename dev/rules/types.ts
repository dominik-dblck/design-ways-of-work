/**
 * - `rules` · types: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Types',
  intro: '\nA type holds the values the code can meet and no others. The review\'s sweep for it is\n`.claude/evaluations/types-eval.md`, its first pass.\n',
  rows: [
    { rule: 'A type takes the highest rung its set of values allows: a literal union (`\'rule\' \\| \'store\'`, `keyof typeof THE_TABLE`), then a narrowing tied to a sibling (`FactsFor<K>`, `Record<RefusalKey, Refusal>`), then a brand, then a primitive, which is left for a value that is open (free text a person typed, an id minted elsewhere).', gate: '`review`', exceptions: 'a field holding a row nobody parsed stays a primitive: a brand stops at the port (`StoredState.builtBy?: string`)', why: 'A primitive where the set is known lets a wrong value compile.' },
    { rule: 'A brand is a zod brand declared under `packages/domain/model/brands/` (`z.string().min(1).brand<\'BlockId\'>()`), never `string & { __brand }`.', gate: '`brandsCrossOnce` · `review`', exceptions: '—', why: 'The zod brand has a `parse`; the hand-written one can only be entered by a cast.' },
    { rule: 'A brand is minted where a value is checked or produced, by a schema parsing `unknown` or by a generator writing a literal, never to satisfy a signature; a payload field is branded by its schema, not by a table.', gate: '`brandsCrossOnce` · `payloadBrandsComeFromTheSchema`', exceptions: 'the files the scan lists, each with why it checks or produces · a runtime test that builds the value a refusal needs', why: 'A constructor called to please a signature is a cast with a function\'s name, and it moves the check to where nothing checks.' },
    { rule: 'A cast (`as`, `<T>`) appears only where a brand is minted; anywhere else it is let through in place by a directive with its reason.', gate: 'ESLint `consistent-type-assertions` (`assertionStyle: "never"`)', exceptions: '`as const` · tests · fixtures · generated files · the files `castingFiles.json` names, which `brandsCrossOnce` reads too', why: 'A cast is the one place the compiler takes the code\'s word for it.' },
    { rule: 'An opaque id is never read for meaning: no split, slice or regex over a `UserId` or a stream id, and no caller filters streams by a prefix.', gate: '`nothingParsesAUserId` · `streamIdIsOpaque`', exceptions: '—', why: 'Initials and paths are not a contract: after a move the id says one folder and the state another.' },
    { rule: 'A version is counted and named by its doors: `versionAfter`, `versionBefore`, `versionsThrough` count it, `versionTag`, `versionLabel` name it; no `(version ?? 0) + 1`, `version - 1` or `` `v${…}` `` anywhere else.', gate: '`aVersionIsCountedOnce`', exceptions: '—', why: 'Four screens counted the next version by hand, two of them from a draft, and a tag spelled by hand reads `v0` where the door refuses it.' },
    { rule: 'A shape the server and a screen both read is the domain\'s: its zod schema and its inferred type side by side in `packages/domain/{area}/` (`documentRowSchema`, `DocumentRow = z.infer<…>`); `app/` holds no types folder.', gate: '`theMapIsTheTree` (no types folder under `app/`) · `review`', exceptions: 'an organism\'s own props, in its `types/`', why: 'One schema is both the check at the door and the type behind it.' },
    { rule: 'No `any`.', gate: 'ESLint `no-explicit-any`', exceptions: '—', why: '`any` switches the checker off for everything the value touches.' },
    { rule: 'No `@ts-ignore`; `@ts-expect-error` stands only in a `*.test-d.ts`, where it is the proof, and every brand has one there proving it rejects the swap.', gate: 'ESLint `ban-ts-comment` · `review` (a brand\'s proof)', exceptions: '—', why: 'A brand nobody proved rejects the swap is a brand nobody checked.' },
    { rule: 'An exported function states its parameter and return types.', gate: 'ESLint `explicit-module-boundary-types`', exceptions: '—', why: 'The signature is the contract a caller reads; an inferred one changes when the body does.' },
    { rule: 'A type-only import is `import type`.', gate: 'ESLint `consistent-type-imports`', exceptions: 'never together with `verbatimModuleSyntax`, which conflicts with it', why: 'It is erased at build, so a client bundle never pulls a server module in through a type.' },
    { rule: 'A `switch` over a union handles every member.', gate: 'ESLint `switch-exhaustiveness-check`', exceptions: '—', why: 'A member added to the union is a red line at every switch, not a silent fall-through.' },
    { rule: 'A field always present is not optional; shapes that differ are a discriminated union (`{ kind: \'error\'; message } \\| { kind: \'ok\'; data }`), not one shape of optional fields; a union of literals stands where a boolean flag would.', gate: '`review`', exceptions: '—', why: 'Each shape says what it carries, so no reader checks a field the shape cannot have.' },
    { rule: 'Data nobody mutates is `readonly` (`readonly T[]`, `.readonly()` on a schema).', gate: '`dataIsReadonly`', exceptions: 'a function\'s local · a `declare module` augmentation, which follows its library · a ref\'s `current` · the working states and library hand-offs `tests/architecture/mutableByDesign.json` names with their why', why: 'A mutation becomes a compile error instead of a shared-state bug.' },
    { rule: 'A schema is strict at every depth (`z.strictObject`), an answer read off the wire as much as a body, a payload or a record: a key it does not name is refused.', gate: '`aSchemaIsStrict`', exceptions: 'the two that read part of something bigger: a refusal read for its reason in `getDiffService`, the clipboard\'s copy · a `.catchall` names its keys too', why: 'Drift between the server and a screen fails a test, not a reader; one style, since an answer\'s rows were strict already.' },
    { rule: 'The code compiles under `strict`.', gate: '`yarn tsc` (pre-commit)', exceptions: '—', why: 'Strict is the floor every rule above stands on.' },
  ],
  outro: '',
};

export { rules };
