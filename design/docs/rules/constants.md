# Constants

Values the code reads and never
computes: the words a person reads, the keys a page switches on.

| Rule                                                                                                                                         | Gate                   | Exceptions | Why                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | ---------------------------------------------------------------- |
| A word a page shows is the sheet's (a `words` table, `sheet/words/messages.ts`, the glossary's screen words), never a literal in the markup. | `review`               | —          | A word is changed in one place and reads the same on every page. |
| A table of words is a part of its own (`pageWords.ts`) whose values are UPPER_SNAKE, read through its entry.                                 | `aConstantIsUpperCase` | —          | The case says a value is read, not called.                       |
| A count picks its form in one function: a noun with its count, or two whole sentences where the verb moves with the count.                   | `review`               | —          | No page reads "1 blocks".                                        |
