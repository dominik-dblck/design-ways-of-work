# Overnight, 8 Nov: the way of working's run to the end, with eagle-dev

The PM, 8 Nov evening: "lec autonomicznie z eagle dev calosc, rob notatki … leccie do konca zapisuj decyzje i
pytania, rano odpowiem na wszystko, dzialajcie wspolnie i wypracujcie najlepsze rozwiazania, po kazdej czesci
przypominaj sobie nasze zasady, SRP SSoT i wszystkie zasady projektowe ktore wypracowalismy".

## The rules, re-read after each part

- One source of truth: one home per fact, rule, word and sentence; a second copy is the point to fix first.
- One responsibility: one question per function, one kind of fact per file; a file states its job in 1–3 bullets.
- The long term wins over the work of today; code already built is no reason; every option valid.
- Product-agnostic: the way of working names no product; a product's facts live in its `scope.ts`.
- Nothing by hand: every move, rename and regeneration by script; generated files never edited.
- eagle-design untouched (its changes live in `ports/eagle-design/port.patch`); mailing-automation read-only.
- docs/rules in full: header bullets ≤80 characters, a `//` comment one line and an invariant, past two
  parameters one object, names that say their purpose, no placeholder names, sizes (200 lines, 40 a function).
- Correct over fast: verify whole and fresh every part; a red proof for every new check.
- Every part: consult eagle-dev, its cross-check of the diff and its probe of the design copy before the commit.
- From code, not copies: a package gives what it holds; nothing hand-copied.
- After the commit: the progress bar; notes in `plan/eagle-notes.md` and `plan/dev-notes.md`.

## Calls (what · why · how to undo)

- eagle-dev's limits for the night (its message, 8 Nov): read-only in design-ways-of-work, the copy and
  mailing-automation; a choice that sets its scope or changes its code (suppress, rename, move, drop at its
  port) is Dom's: its recommendation with numbers goes to the morning list, never decided by the two sessions.
- 7a: `TESTS` holds `${SHARED_TESTS}/**` (its delta probe's suggestion): a helper beside a shared test is test
  code. Undo: drop the line in `shared/repoScope.ts`.

- 7c before 7b: the shared tests carry a baseline, so one baseline format comes first. Undo: the parts' order
  in `plan/progress.md`.
- 7c, the PM's answer (8 Nov): an emptied baseline is removed, never kept as `[]`; `BASELINES=write` prints
  the removal, and the commit that carries it says so (git is the record; rules carry no history).

## Morning: for the PM
