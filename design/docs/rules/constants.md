# Constants

Values the code reads and never
computes: the words a person reads, the keys a page switches on.

| Rule                                                                                                                                                                                                                             | Gate                   | Exceptions | Why                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | ------------------------------------------------------------------ |
| A word a person reads is a constant (`{name}Words.ts`) or the domain's own sentence, never a literal in the markup (its text, a string child, a label a reader hears); a table of words (`…_WORDS`) is declared in a Words file. | `review`               | —          | A word is changed in one place and reads the same on every screen. |
| A count picks its form in one function: a noun with its count, or two whole sentences where the verb moves with the count.                                                                                                       | `review`               | —          | No page reads "1 blocks".                                          |
| A table of words is a part of its own (`pageWords.ts`) whose values are UPPER_SNAKE, read through its entry.                                                                                                                     | `aConstantIsUpperCase` | —          | The case says a value is read, not called.                         |
