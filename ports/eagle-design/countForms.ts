/**
 * - `COUNT_FORMS` · eagle-design's take of the counted plurals' report
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const MESSAGES = 'sheet/words/messages.ts';

// the messages' barrel hands the report on, beside the check and the repeats
const COUNT_FORMS: Migration = {
  release: '0.11.0',
  removes: [],
  moves: [],
  edits: [
    {
      file: MESSAGES,
      from: 'import {\n  check,\n  counts,\n  lineFindings,\n  repeats,\n} from',
      to: 'import {\n  check,\n  countForms,\n  counts,\n  lineFindings,\n  repeats,\n} from',
    },
    {
      file: MESSAGES,
      from: '  check as messageRowsCheck,\n  repeats,\n',
      to: '  check as messageRowsCheck,\n  countForms,\n  repeats,\n',
    },
  ],
  tree: null,
};

export { COUNT_FORMS };
