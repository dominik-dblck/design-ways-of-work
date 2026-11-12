/**
 * - `guardTail` · part a's last lines, this product's own: its types' words, its
 * - pools against their snapshot, Measure.run
 */
import { lineOf } from './checkWorld.ts';
import type { Mirror } from './checkWorld.ts';
import { measureLines } from './measureCheck.ts';
import { poolsLine } from './parsePools.ts';
import * as MESSAGES_CONTENT from '../../sheet/words/messagesContent.ts';

function guardTail(mirror: Mirror): readonly string[] {
  const typeWords = MESSAGES_CONTENT.typeWordsCheck();
  return [
    lineOf('MessagesContent.typeWordsCheck', {
      ok: !typeWords.length,
      text: typeWords.join(' | ') || '0',
    }),
    poolsLine(mirror),
    ...measureLines(mirror),
  ];
}

export { guardTail };
