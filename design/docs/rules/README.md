# Rules

The rules of the design project's own code, one file per concern, each row **rule · gate · exceptions ·
why**. A gate is a scan in `tests/architecture/`, an ESLint rule, a `yarn` script or `review`; a
reviewer reads only the rows marked `review`, the suite holds the rest. Adapted from mailing-automation's
`docs/rules/` at `359b2ac` (Q4 · A, D15): a row kept, narrowed to this project, or left out where the
project has no such code.

Each rule file is data (D21): `{concern}.ts` holds its rows, and `yarn build` writes `{concern}.md` from it
(`tools/emit.ts`), the table padded to its widest cell. Edit the `.ts`; `aGeneratedFileIsItsModule` fails on a
hand-edited `.md`.

Production code here is a hand-written `.ts` in a home of `tools/layout.ts` or under `tools/`, and a `.mjs` under `tools/`.
A `.d.ts`, a test and a sheet file still in `.js` (the move to TypeScript, D12) are not.

The specification is data: a string of the sheet is its content and keeps its sources (a ticket id, an
epic, a date, a decision). The rules below hold the code around that data, never the data's words.

| File                | Applies to                                                  |
| ------------------- | ----------------------------------------------------------- |
| `size.md`           | every production file and every rule file                  |
| `responsibility.md` | every production file: its header, its exports, its folder  |
| `one-home.md`       | every file, code and `.md`                                  |
| `names.md`          | every identifier, file name and comment                     |
| `comments.md`       | every comment                                               |
| `functions.md`      | every function                                              |
| `types.md`          | every type                                                  |
| `tests.md`          | every test and scan                                         |
| `components.md`     | the React pages, once a page moves (D7)                     |
| `styling.md`        | the React pages' look                                       |
| `checks.md`         | every rule: the tool that holds it, its gate, its scope     |
| `constants.md`      | the React pages' words and values                           |

## Adding a sheet file

1. **Types first** — `{home}/{name}/{area}Types.ts` (`types.md`)
2. **The data and the rules over it** — parts in `{home}/{name}/`, each one job under 200 lines (`size.md`)
3. **The entry** — `{home}/{name}.ts`, its named exports the API the build sets as the global (D14)
4. **The header** — 1–3 bullets naming every exported value (`responsibility.md`)
5. **The checks** — `yarn lint`, `yarn tsc`, `yarn test`, `yarn checks`
