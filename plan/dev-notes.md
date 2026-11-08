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
