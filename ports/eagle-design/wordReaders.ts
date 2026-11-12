/**
 * - `WORD_READERS` · eagle-design's take of the words' readers, homes from now
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// split from the rows it gathers on its own tree first: the readers, at the paths the product held them
const WORD_READERS: Migration = {
  release: '0.9.0',
  removes: [],
  moves: [],
  homed: [
    'sheet/words/glossary.ts',
    'sheet/words/glossary/glossaryTypes.ts',
    'sheet/words/messages/liveWords.ts',
    'sheet/words/messages/messageCells.ts',
    'sheet/words/messages/messageChecks.ts',
    'sheet/words/messages/messageUsage.ts',
    'sheet/words/messages/messagesTypes.ts',
    'sheet/words/messages/refusals.ts',
    'sheet/words/messages/sayWord.ts',
    'sheet/words/messages/situations.ts',
    'sheet/words/messages/words.ts',
  ],
  tree: null,
};

export { WORD_READERS };
