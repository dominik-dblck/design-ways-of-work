/**
 * - `REGRESSION_TEMPLATE` · the regression template
 */
import type { DocumentSection } from '../documentTypes.ts';
import { cite, citeLines } from '../cited.ts';
import { buildBranch } from '../../../sheet/project.ts';

export const REGRESSION_TEMPLATE: readonly DocumentSection[] = [
  {
    heading: '# `roadmaps/templates/ticket-regression.md`',
    lines: [
      '',
      '```markdown',
      '# regression-{id} · {date}',
      '',
      '> against `' +
        buildBranch +
        '` · drift {n} · suite {n} red · touched {n} files · re-ports {n}',
      '',
      '## 1 · Spec drift',
      '',
      '`yarn ticket:read {id}` against the pack the run started from · exit {0|1}',
      '',
      '| Criterion | Was | Is now | Tests affected |',
      '|---|---|---|---|',
      '',
      'or `0 — the pack matches the sheet`',
      '',
      '## 2 · Suite',
      '',
      '`vitest` · {n} projects · {n} passed · {n} skipped · {n} failed',
      '',
      '| Failing test | Owning ticket (receipts.ts) | Cause |',
      '|---|---|---|',
      '',
      'or `0 red outside this ticket`',
      '',
      '## 3 · Touched outside scope',
      '',
      '`git diff --name-only ' +
        buildBranch +
        "` minus this ticket's `touches`",
      '',
      '| File | Owned by | Criterion re-read | unchanged / changed (how) / needs re-port |',
      '|---|---|---|---|',
      '',
      'or `0 files outside touches`',
      '',
      '## Re-ports needed',
      '',
      '{n} rows in `re-ports-{id}.json` over {n} landed tickets · causes: {letter} {what moved} … — or `none`',
      '',
      '## 4 · Beyond the suite (when the ticket moved a rendered value)',
      '',
      'What a green suite cannot show. The worked shape: restore the replaced code beside the new,',
      'render every screen under both, fingerprint the computed properties per element, diff, and trace',
      'every difference to the criterion that ordered it — or list it in §3.' +
        cite('regressionTemplate.1'),
      ...citeLines('regressionTemplate.1+'),
      '',
      '| Screen | Elements | Differ | Every diff traced to a criterion? |',
      '|---|---|---|---|',
      '```',
      '',
      '---',
      '',
    ],
  },
];
