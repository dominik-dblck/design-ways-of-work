# Size

Limits count code: blank lines and comments
do not count.

| Rule                                                        | Gate                            | Exceptions              | Why                                                                                                        |
| ----------------------------------------------------------- | ------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| A file holds at most 200 lines of code, data included.      | ESLint `max-lines`              | tests · generated files | A file past 200 lines holds a second job; the split is where that job gets its name (D13).                 |
| A function holds at most 40 lines of code.                  | ESLint `max-lines-per-function` | tests                   | Past 40 lines a function is read by scrolling; its steps want names of their own.                          |
| A function's complexity is at most 10.                      | ESLint `complexity`             | tests                   | Past ten paths a function is run in the head to be read; early returns or a lookup table read at a glance. |
| A block nests at most 3 deep.                               | ESLint `max-depth`              | tests                   | A fourth level is a function that has not been extracted yet.                                              |
| A rule file in `docs/rules/` holds at most 200 lines.       | `everyRuleHasAGate`             | —                       | A rule file is loaded by every review of its layer; past 200 lines it holds two concerns.                  |
| A skill holds at most 2000 words; `CLAUDE.md` at most 1000. | `everySkillIsShort`             | —                       | A skill is read whole when it loads and `CLAUDE.md` on every turn: their words are the context they cost.  |
