/**
 * - `ARCH_REVIEW_CITES` · the texts the arch review asks this product for
 */
const ARCH_REVIEW_CITES: Readonly<Record<string, string>> = {
  'archReviewSkill.1':
    '`why: T-E00-08` — eight files changed here after GREEN and no snapshot saw them',
  'archReviewSkill.2': ' (D11 · PM, 25 Oct)',
  'archReviewSkill.3':
    ' `why: T-E01-09` — data-theme correct in the markup, overwritten after hydration,',
  'archReviewSkill.3+': '   three criteria green throughout',
  'archReviewSkill.4':
    ' `why: T-E02-04` — F2 turned `?__proto__=1` from 200 into 400 with no row',
  'archReviewSkill.5': ' `why: T-E01-07` — "44 rows" in',
  'archReviewSkill.5+': '   a 23-row contract',
  'archReviewSkill.6': " `why: T-E01-08` — row 6e carried GREEN's",
  'archReviewSkill.6+': '   title through regression and snapshot',
  'archReviewSkill.7':
    ' `why: T-E04-00` — O40, four journeys red at the next e2e',
  'archReviewSkill.8': ' `why: T-E06-00` — the',
  'archReviewSkill.8+':
    '   re-layer moved gate-dot and the chip’s key, and the copy read 5 until the regression',
  'archReviewSkill.9': ' `why: T-E01-10` — N18',
  'archReviewSkill.10':
    ' `why: T-E02-01` — `commentsAreInvariants` cited a heading',
  'archReviewSkill.10+':
    'renamed on 22 Sep and exempted what the current section forbids (F2)',
  'archReviewSkill.11':
    " `why: T-E06-13` — c15's contract title stood from the recon to the report",
};

export { ARCH_REVIEW_CITES };
