# What mailing-automation needs when the shared checks reach it

From eagle-dev's cross-check of the checks, chunk 2 (8 Nov, its tree at `7696dd86`). Nothing here changes
mailing-automation: each line waits for its port (phase 9) and the PM's word. Ranked: the first is worth most.

## Its scope, named in its own `eslint.config.ts`

1. **Imports.** Its imports carry no extension and go through `@/`, `@domain/`, `@store/` (moduleResolution
   bundler). `import-x/extensions` 'always' fails every one, and `import-x/no-cycle` cannot follow the aliases.
   It needs the TypeScript resolver and either a migration to extensions or the rule named per scope.
2. **React code.** Leave `app/styles/**` (the theme and generated tokens), `app/renderers/**` (the phone's own
   look, Figma values on purpose) and `app/components/icons/**` (brand-icon fills) out of `react`. Leave Next's
   `app/layout.tsx` and `app/global-error.tsx` out too, which must write `<html>`, `<body>`, `<main>` and `<p>`.
3. **Tests.** Besides `**/__tests__/**` (in the shared list since this chunk), its Playwright `e2e/**`
   (`*.spec.ts`) is a test: the scope names it, because `*.spec.ts` is data in eagle-design.
4. **Names.** It has no entries or parts: 465 PascalCase components, camelCase zod schemas, query keys and
   test ids, and Next's fixed names (`GET`, `POST`, `PATCH`, `DELETE`, `dynamic`, `metadata`). `entries: []`;
   `parts` is at most `app/**/constants/*.ts`, after its 7 camelCase exports are looked at.
5. **Known fails, not exceptions.** `atoms/Wordmark/constants` reads next/font's `var(--font-wordmark)` and
   `atoms/AppMark/constants` a `var(--app-mark)` mask: the font one is next/font's documented output, the
   mask is theirs to move. Each is a suppression with its reason, never a hole in the shared selector.

## Its files

6. **ls-lint.** `app/globals.css` (Next's global stylesheet), the copied fixtures (`app/styles/__fixtures__/*.css`,
   the sheet copy's `tokens.css`, `.claude/__fixtures__/*.js`), `eslint.config.js` and the root `index.html`
   are banned extensions: the fixture roots go in its ignore, the rest move or are named.

## Linked in place

7. **Its files are real, so no runner needs a flag (its cross-check of chunk 6a).** The rehearsal hard-links the
   way of working, a real tree, and the patch carries no `--preserve-symlinks`; its port adds none. The way of
   working reaches it as copies taken at a release sha (`git cat-file`) with a hashes file and a gate that the
   copy's bytes are the release's (its `everyFixtureRootIsHeld` pattern), never links into its working tree: its
   pre-commit `eslint --fix` and `prettier --write` would write through a link, and drift a copy; the copy is left
   out of its writes, or takes the way of working's prettier config (3.9.6 and one `.prettierrc` today).
   `ESLINT_FLAGS=unstable_native_nodejs_ts_config` stays: ESLint reads a TypeScript config.
8. **The way of working stays in the tree.** Node refuses to strip types under `node_modules`: `shared/`, `tools/`
   and `design-system/` are linked into the tree, never a `link:` dependency.

## The way of working's own rules (chunk 3, 8 Nov)

9. **Its tests that are now `wow` rules.** `theCodeNamesNoTicket`, `aFileStatesItsJob`, `commentsAreInvariants`,
   `dataIsReadonly`, `aNameHasOneHome` exist on both sides; the shared config runs them as
   `wow/no-ticket-names`, `wow/file-states-its-job`, `wow/comments-are-invariants`, `wow/data-is-readonly`,
   `wow/one-home-per-name`. Its `mutableByDesign.json` becomes the scope's `mutable`; a route's HTTP verbs and
   `default` become the scope's `families` (`{ files: 'app/**/route.ts', name: 'GET' }`…).
10. **Names.** `naming-convention` (types PascalCase, values camelCase or UPPER_SNAKE, a boolean `is…`) and the
    placeholder and count-alone shapes (its `aNameSaysWhatNotHowMany`, regex unchanged) reach it with the config:
    its count of fails is measured at its port, each held in its suppressions until renamed by `scripts/rename.ts`.
11. **What its tests hold beyond the rules (its cross-check of chunk 3).** Its `theCodeNamesNoTicket` reads
    strings, test titles, assertion messages, the root configs, `db/*.sql` and `.husky/`: ESLint reads
    identifiers, so the rest stays its test until a shape on test titles holds it. Its `dataIsReadonly` also reads
    a function's signature, a module's unexported constants, zod's `.readonly()` and exempts a ref's `current`:
    `wow/data-is-readonly` grows to the union at its port. Its header may run 12 prose lines and its comments
    carry `Read at stream:`; both stay its own.
12. **Its scope at its port.** Next's handlers written `export async function GET` need UPPER_CASE functions in
    `app/**/route.ts`; the boolean prefix flags 224 names there and the placeholder shape 152 (`value` in its type
    guards and handlers most), each held in its suppressions; `scripts/` adds 19 names twice to one-home.
13. **Its e2e framework comes to the way of working whole (PM, 8 Nov).** The skills `e2e`, `e2e-category`,
    `e2e-discovery`, `e2e/framework/` and the test-id registry are shared; its journeys and page objects
    (`e2e/theDocuments/`, `e2e/theEditor/`…) stay its own. The 11 gates that hold the framework (every role a
    flow, every path walked, test ids from the registry and prefixed, a drag through the framework…) become shared
    tests, each scope naming its own roles and paths.

## The shapes and rules of chunk 4 (8 Nov)

14. **Its tests that are now shapes and `wow` rules.** `timeIsMovedNotWaited` and `aPresenceIsReadOneWay`
    (shapes on tests), the `__brand` half of `brandsCrossOnce` (every file), `noComponentWritesAHeight`,
    `anSxIsAsConst` and `aStyleReadsItsScale` (React code), `aWordIsNotInTheMarkup` and `hoverTextIsAHint`
    (`wow/markup-syntax`), `noTestOnlyBranchInProduction`, `aSchemaIsStrict` (with zod 4's `.loose()`),
    `copyLivesInAWordsFile` and `.brand()` outside its home (`wow/production-syntax`), `reExportsLiveInBarrels`,
    `noTestMocksItsSubject`, `aHookIsNamedForItsFile`, `aFileTakesOneStyle` (`wow` rules). Their rows moved to
    `shared/rules/`: its gate stays its test until the port. A layer, a weight, a fade or a radius named off its
    scale (`zIndex: 'appBar'`) stays its test: a selector cannot know a scale's names.
15. **Its scope at its port (its cross-check of chunk 4).** `react` is the look (renderers, icons, `app/styles/**`,
    `layout.tsx`, `global-error.tsx` out); `markup` is what a person reads, every `app/**/*.tsx`, renderers in;
    `barrels: ['app/**/route.ts']`, a route re-exporting its own handler; `words:
    ['packages/domain/messages/**']` (`messageTables.ts`' four tables); `brands: ['packages/domain/model/brands/**']`;
    `scripts/` stays out of the loose-schema shape and `one-call-style` or takes a scope of its own (its re-check: 83 loose
    schemas reading part of a report file, 4 one-call-style hits there; PM decides at its port). Its named waits (`aWhile`,
    `holding`), the two loose schemas that read part of more, its `PhonePreview`/`LayoutPreview` corners and its
    fixtures' brands are suppressions with their reasons. Its 27 `.not.toMatchTypeOf` in
    `tests/types/brands.test-d.ts` become `.not.toExtend` (expect-type 1.2), never `.not.toEqualTypeOf`.
    A corner is one style on both sides (PM, 8 Nov): its `radiusOf` is the design side's too
    (`design/app/theme/tokenReads.ts`), one helper for both at its port. The TypeScript resolver reads its `@/`
    aliases (`import-x/no-cycle` proven on an aliased fixture).
16. **Its tiers at its port (chunk 5, its consult).** `anAtomComposesNothing`, `aMoleculeComposesOneMolecule` and
    `organismsMeetAtTheBarrel` are boundaries and `wow/molecules-compose-one-molecule` in the shared config;
    `theMoleculesAreDumb` and `organismPartsOnlyDraw` keep their product halves (queries, requests, commands,
    providers, clients, the router) as its scope's layers, their context half shared (`useContext`, `use`,
    `React.use*`). Its rows moved: the barrel and the context to `shared/rules/components.ts`, the strip to a row
    of its own (`theStripIsNotTheShells`); the barrel row's exception went, a header slot read through the barrel
    being no exception to it. A known loss: its barrel test read tests as importers, the shared
    config does not (0 such today; the design side's tests read parts from `tests/`). Its layers and doors
    (`app/api`, `app/clients`, `app/services`, `app/providers`, `app/utils`, `packages/domain`, the store, the
    edge) are named in its scope at its port, and `boundaries/no-unknown-files` turns on with them, a scope switch
    off until a scope names every element. Its alias rule (`anImportLeavesByTheAlias`) lands with those layers:
    the design side imports by relative path and has no alias to hold.
