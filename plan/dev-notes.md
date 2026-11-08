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

7. **Every runner keeps the links.** Vitest `resolve.preserveSymlinks: true`; ESLint `NODE_OPTIONS='--preserve-symlinks'`
   and `ESLINT_FLAGS=unstable_native_nodejs_ts_config`; a hook whose main file is linked adds `--preserve-symlinks-main`,
   so `eslint` resolves from the repository's own `node_modules`. `NODE_OPTIONS` on `test` reaches its tests'
   child node processes, harmlessly.
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
