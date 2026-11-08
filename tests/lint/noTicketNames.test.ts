import { noTicketNames } from '../../shared/lint/rules/noTicketNames.ts';
import { ruleTester } from './ruleTester.ts';

const PART = 'roadmaps/receipts/E04Run.ts';
const trace = (name: string) => ({
  messageId: 'trace' as const,
  data: { name },
});

ruleTester.run('no-ticket-names', noTicketNames, {
  valid: [
    {
      name: 'a part keeps its own epic; a string is no name',
      filename: PART,
      code: 'const E04_RUN_RECEIPTS = 1;\nconst words = "T-E01-13 E06 18 Sep";',
    },
    {
      name: 'a name imported from a part named for its epic keeps that epic',
      filename: 'roadmaps/receipts.ts',
      code: "import { E04_RUN_RECEIPTS } from './receipts/E04Run.ts';\nconst all = [E04_RUN_RECEIPTS];",
    },
  ],
  invalid: [
    {
      name: 'a ticket, a date and another epic, each once',
      filename: PART,
      code: 'const TE0113_ROWS = 2;\nconst seenOn18Sep = 3;\nconst E05_ROWS = 4;\nconst again = E05_ROWS;',
      errors: [trace('TE0113_ROWS'), trace('seenOn18Sep'), trace('E05_ROWS')],
    },
    {
      name: 'a name imported from a part not named for an epic',
      filename: 'roadmaps/receipts.ts',
      code: "import { E05_ROWS } from './receipts/rows.ts';\nconst all = [E05_ROWS];",
      errors: [trace('E05_ROWS')],
    },
  ],
});
