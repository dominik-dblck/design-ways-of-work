# design-ways-of-work

The design side's way of working, taken out of eagle-design so more than one product runs it (D75, D76).
The plan is `plan/README.md`; where it stands is `plan/progress.md`.

- `design/` · the tools, checks, pages, skills and documents, each at the path a product reads it from
- `scripts/rehearse.ts` · a copy of a product with design/'s files linked back in place
- `scripts/verify.ts` · that copy against a clone of the product as it is: every output compared

```
yarn verify ../eagle-design
```

A product's node runs keep a link's own path (`NODE_OPTIONS='--preserve-symlinks --preserve-symlinks-main'`,
`preserveSymlinks` in tsconfig and vitest, `resolve.symlinks: false` in rolldown), so a linked file's `..`
reaches the product.
