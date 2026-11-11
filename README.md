# design-ways-of-work

The way of working more than one product runs: rules, checks, tools, skills and a design system.
A repository takes it at a tag; nothing of it enters that repository's history.

- `design/`, `dev/`, `shared/`, `design-system/` · the four homes a repository takes, each at the path it reads it from
- `ports/consumers.ts` · the repositories that take it
- `scripts/consumers.ts` · the gate: a commit tried on a fresh clone of each of them, against its pinned tag
- `releases/changelog.ts` · the release in hand, and each output it means to move

- `yarn hooks` · once a clone: git then runs the checks at each commit and each push; no install sets them
- `yarn release` · the release in hand put out: its row, its version, `main` pushed past the gate, then its tag

```
yarn hooks
yarn consumers
```

The plan in force is `plan/argus-first.md`; the run's notes are `plan/run-11-nov.md`.
