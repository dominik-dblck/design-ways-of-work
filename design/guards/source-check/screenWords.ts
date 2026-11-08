/**
 * - `wordPattern`, `bannedPatterns` · a glossary word and its endings, as a pattern
 * - `wordBans`, `bansHit` · the words and replaced phrases a text may not say
 */
import type { WordBan } from './sourceCheckTypes.ts';
import * as GLOSSARY from '../../sheet/words/glossary.ts';

function wordPattern(word: string): RegExp {
  return new RegExp(
    `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(s|es|d|ed|n)?\\b`,
    'i',
  );
}

function bannedPatterns(): readonly RegExp[] {
  return GLOSSARY.uiRows().flatMap((row) => row.not.map(wordPattern));
}

// a screen word's not-words, then a term's replaced phrases of two words or more
function wordBans(): readonly WordBan[] {
  const words = GLOSSARY.uiRows().flatMap((row) =>
    row.not
      .filter((word) => word.charAt(0) !== '{')
      .map((word) => ({
        word,
        pattern: wordPattern(word),
        except: row.except,
        term: row.term,
      })),
  );
  const phrases = GLOSSARY.terms.flatMap((term) =>
    term.replaces
      .filter((word) => / /.test(word) && !/[()]/.test(word))
      .map((word) => ({
        word,
        pattern: wordPattern(word),
        except: [],
        term: `${term.term} · replaced`,
      })),
  );
  return [...words, ...phrases];
}

// a fill reads as a break, an exception's own words pass, taking over from a holder is no ban
function bansHit(bans: readonly WordBan[], text: string): readonly WordBan[] {
  const bare = text.replace(/\{\w+\}/g, '·');
  return bans.filter(
    (ban) =>
      ban.pattern.test(bare) &&
      !ban.except.some((one) => text.includes(one)) &&
      !(ban.word === 'take over' && /in charge|from \{holder\}/.test(text)),
  );
}

export { bannedPatterns, bansHit, wordBans };
