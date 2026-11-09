/**
 * - `rules` · types: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/types.ts';

const rules = ruleFileFor({
  side: 'build',
  shared,
  intro: "The review's sweep for it is\n`.claude/evaluations/types-eval.md`, its first pass.",
  rows: [
    { rule: "A type takes the highest rung its set of values allows: a literal union (`'rule' \\| 'store'`, `keyof typeof THE_TABLE`), then a narrowing tied to a sibling (`FactsFor<K>`, `Record<RefusalKey, Refusal>`), then a brand, then a primitive, which is left for a value that is open (free text a person typed, an id minted elsewhere).", gate: '`review`', exceptions: 'a field holding a row nobody parsed stays a primitive: a brand stops at the port (`StoredState.builtBy?: string`)', why: { shared: 'highestRung' } },
    { rule: 'A brand is minted where a value is checked or produced, by a schema parsing `unknown` or by a generator writing a literal, never to satisfy a signature; a payload field is branded by its schema, not by a table.', gate: '`brandsCrossOnce` · `payloadBrandsComeFromTheSchema`', exceptions: 'the files the scan lists, each with why it checks or produces · a runtime test that builds the value a refusal needs', why: "A constructor called to please a signature is a cast with a function's name, and it moves the check to where nothing checks." },
    { rule: 'A cast (`as`, `<T>`) appears only where a brand is minted; anywhere else it is let through in place by a directive with its reason.', gate: 'ESLint `consistent-type-assertions` (`assertionStyle: "never"`)', exceptions: '`as const` · tests · fixtures · generated files · the files `castingFiles.json` names, which `brandsCrossOnce` reads too', why: { shared: 'noCast' } },
    { rule: 'An opaque id is never read for meaning: no split, slice or regex over a `UserId` or a stream id, and no caller filters streams by a prefix.', gate: '`nothingParsesAUserId` · `streamIdIsOpaque`', exceptions: '—', why: 'Initials and paths are not a contract: after a move the id says one folder and the state another.' },
    { rule: 'A version is counted and named by its doors: `versionAfter`, `versionBefore`, `versionsThrough` count it, `versionTag`, `versionLabel` name it; no `(version ?? 0) + 1`, `version - 1` or `` `v${…}` `` anywhere else.', gate: '`aVersionIsCountedOnce`', exceptions: '—', why: 'Four screens counted the next version by hand, two of them from a draft, and a tag spelled by hand reads `v0` where the door refuses it.' },
    { rule: "A shape the server and a screen both read is the domain's: its zod schema and its inferred type side by side in `packages/domain/{area}/` (`documentRowSchema`, `DocumentRow = z.infer<…>`); `app/` holds no types folder.", gate: '`theMapIsTheTree` (no types folder under `app/`) · `review`', exceptions: "an organism's own props, in its `types/`", why: 'One schema is both the check at the door and the type behind it.' },
    { rule: 'No `@ts-ignore`; `@ts-expect-error` stands only in a `*.test-d.ts`, where it is the proof, and every brand has one there proving it rejects the swap.', gate: "ESLint `ban-ts-comment` · `review` (a brand's proof)", exceptions: '—', why: 'A brand nobody proved rejects the swap is a brand nobody checked.' },
  ],
  outro: '',
});

export { rules };
