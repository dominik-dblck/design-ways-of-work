/**
 * - `fileHeadOf`, `aboutOf` · a file's header: bullets, answers and holds, sentence
 * - `aboutCheck` · a JSON that does not say what it is, in one to three short lines
 */
import type { FileHead, SourceFinding, Texts } from './sourceCheckTypes.ts';

const BLANK: FileHead = { about: '', answers: '', answersCount: 0, holds: [] };

// a JSON says it in $answers and $holds, else in $about
function jsonHead(text: string): FileHead {
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object') return BLANK;
    const answers: unknown = Reflect.get(parsed, '$answers');
    const holds: unknown = Reflect.get(parsed, '$holds');
    const about: unknown = Reflect.get(parsed, '$about');
    if (typeof answers === 'string')
      return {
        about: answers || (typeof about === 'string' ? about : ''),
        answers,
        answersCount: 1,
        holds: Array.isArray(holds)
          ? holds.filter((one) => typeof one === 'string')
          : [],
      };
    return { ...BLANK, about: typeof about === 'string' ? about : '' };
  } catch {
    return BLANK;
  }
}

// a header of bullets, each a holds line, the first one the file's sentence
function bulletHead(lines: readonly string[], first: number): FileHead {
  const holds: string[] = [];
  for (
    let at = first + 1;
    at < lines.length && !/^\s*\*\//.test(lines[at] ?? '');
    at++
  ) {
    const bullet = /^\s*\*\s+-\s+(\S.*)$/.exec(lines[at] ?? '');
    if (bullet) holds.push(String(bullet[1]).trim());
  }
  return { ...BLANK, holds, bullets: true, about: holds[0] ?? '' };
}

// `// name` on line 1, then `// answers:` once and `// holds:` one to three times
function commentHead(lines: readonly string[], first: number): FileHead {
  let answers = '';
  let answersCount = 0;
  const holds: string[] = [];
  for (let at = first + 1; at < lines.length; at++) {
    const said = /^\/\/\s*(answers|holds):\s*(\S.*)$/.exec(
      (lines[at] ?? '').trim(),
    );
    if (!said) break;
    if (said[1] === 'answers') {
      answers = String(said[2]).trim();
      answersCount += 1;
    } else holds.push(String(said[2]).trim());
  }
  return { about: answers, answers, answersCount, holds };
}

// a page's header is its logic's, past its dc-script tag; null when it has none
function bodyOf(
  file: string,
  text: string,
): { readonly body: string; readonly name: string } | null {
  if (!/\.dc\.html$/.test(file)) return { body: text, name: file };
  const script = text.indexOf('data-dc-script');
  if (script < 0) return null;
  return {
    body: text.slice(text.indexOf('>', script) + 1),
    name: file.replace(/\.dc\.html$/, ''),
  };
}

function fileHeadOf(file: string, text: string | null | undefined): FileHead {
  if (text == null) return BLANK;
  if (/\.json$/.test(file)) return jsonHead(text);
  const page = bodyOf(file, text);
  if (!page) return BLANK;
  const lines = page.body.split('\n');
  const found = lines.findIndex((line) => line.trim() !== '');
  const first = found < 0 ? lines.length : found;
  const top = (lines[first] ?? '').trim();
  if (top === '/**') return bulletHead(lines, first);
  const named = `// ${page.name}`;
  if (top.indexOf(`${named} \u00b7 `) === 0)
    return { ...BLANK, about: top.slice(named.length + 3).trim() };
  return top === named ? commentHead(lines, first) : BLANK;
}

function aboutOf(file: string, text: string | null | undefined): string {
  return fileHeadOf(file, text).about;
}

const countFault = (
  holds: readonly string[],
  fault: string,
): readonly string[] => (holds.length < 1 || holds.length > 3 ? [fault] : []);

function answerFaults(head: FileHead): readonly string[] {
  return [
    ...(head.answersCount > 1
      ? ['two answers: one responsibility per file']
      : []),
    ...(head.answers.length > 80 ? ['answers over 80 characters'] : []),
    ...countFault(head.holds, 'holds: 1 to 3 lines'),
    ...head.holds
      .filter((one) => one.length > 60)
      .map(() => 'a holds line over 60 characters'),
  ];
}

function headFaults(head: FileHead): readonly string[] {
  if (head.bullets)
    return [
      ...countFault(head.holds, 'a header of 1 to 3 bullets'),
      ...head.holds
        .filter((one) => one.length > 80)
        .map(() => 'a bullet over 80 characters'),
    ];
  if (head.answersCount) return answerFaults(head);
  const about = head.about;
  if (!about) return ['no sentence on its first line'];
  return about.length > 140 || about.includes(' \u00b7 ')
    ? [`over 140 characters or in parts: ${about.slice(0, 80)}`]
    : [];
}

function aboutCheck(texts: Texts): readonly SourceFinding[] {
  return Object.keys(texts)
    .filter((file) => texts[file] != null && /\.json$/.test(file))
    .flatMap((file) =>
      headFaults(fileHeadOf(file, texts[file])).map((why) => ({
        kind: 'file without a sentence',
        row: 'a file says what it is (PM, 23 Oct)',
        file,
        line: 1,
        text: why,
      })),
    );
}

export { aboutCheck, aboutOf, fileHeadOf };
