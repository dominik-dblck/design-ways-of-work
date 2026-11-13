/**
 * - `statusSectionOf`, `sectionBulletsOf` · a heading's lines, and their bullets
 * - `firstCellsOf`, `subjectOf` · a table's first cells, and a bullet's subject
 * - `unanswered` · why an bullet names no test that exists, null when it does
 */
import fs from 'node:fs';
import path from 'node:path';

const A_TEST = /· `([^`]+)` › (.+)$/;
const NOWHERE = /· nowhere · \S/;

// the lines under a `## heading`, up to the next one; null when the heading is not there
const statusSectionOf = (
  text: string,
  heading: string,
): readonly string[] | null => {
  const lines = text.split('\n');
  const at = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (at === -1) return null;
  const rest = lines.slice(at + 1);
  const end = rest.findIndex((line) => line.startsWith('## '));
  return end === -1 ? rest : rest.slice(0, end);
};

// each `- ` bullet, its wrapped lines joined back; a placeholder in braces is no bullet
const sectionBulletsOf = (lines: readonly string[] | null): readonly string[] =>
  (lines ?? [])
    .reduce<readonly string[]>((bullets, line) => {
      if (line.startsWith('- ')) return [...bullets, line.slice(2).trim()];
      const last = bullets.at(-1);
      return line.startsWith(' ') && line.trim() !== '' && last !== undefined
        ? [...bullets.slice(0, -1), `${last} ${line.trim()}`]
        : bullets;
    }, [])
    .filter((bullet) => !bullet.startsWith('{'));

// the first cell of each body row of the first table: its header and rule skipped
const firstCellsOf = (lines: readonly string[] | null): readonly string[] =>
  (lines ?? [])
    .filter((line) => line.startsWith('|'))
    .slice(2)
    .map((line) => line.split('|')[1]?.trim() ?? '')
    .filter((cell) => cell !== '' && !cell.startsWith('{'));

// what an bullet is about: its text before the first ` · `
const subjectOf = (bullet: string): string => bullet.split(' · ')[0] ?? '';

const unanswered = (bullet: string, root: string): string | null => {
  if (NOWHERE.test(bullet)) return null;
  const named = A_TEST.exec(bullet);
  if (named === null) return `${bullet} · names no test and says no nowhere`;
  const [, file = '', title = ''] = named;
  const at = path.join(root, file);
  if (!fs.existsSync(at)) return `${bullet} · ${file} is not there`;
  return fs.readFileSync(at, 'utf8').includes(title.trim())
    ? null
    : `${bullet} · ${file} holds no test titled so`;
};

export {
  sectionBulletsOf,
  firstCellsOf,
  statusSectionOf,
  subjectOf,
  unanswered,
};
