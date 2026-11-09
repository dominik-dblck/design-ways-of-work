/**
 * - `withContents` · a document past 100 lines opens with `## Contents`
 * - so does each section the build side cuts from it past 100 lines
 */

// past this, a file read in part opens with what it holds (shared/rules/size.ts)
const CONTENTS_FROM = 100;
const RULE = '---';
// a heading naming the file the build side cuts its section into
const CUT = /^# `[^`]+`$/;
const SUB = /^## /;

// [the line a Contents goes before, its headings]
type Contents = readonly [number, readonly string[]];

const indexesOf = (
  lines: readonly string[],
  test: (line: string, at: number) => boolean,
): readonly number[] =>
  lines.flatMap((line, at) => (test(line, at) ? [at] : []));

// a cut section runs to the next rule or path heading, as the build side's cutter reads it
function cutContents(lines: readonly string[]): readonly Contents[] {
  return indexesOf(lines, (line) => CUT.test(line)).flatMap((from) => {
    const next = lines.findIndex(
      (line, at) => at > from && (line === RULE || CUT.test(line)),
    );
    const to = next < 0 ? lines.length : next;
    const subs = indexesOf(
      lines,
      (line, at) => at > from && at < to && SUB.test(line),
    );
    const first = subs[0];
    return to - from > CONTENTS_FROM && first !== undefined && subs.length > 1
      ? [[first, subs.map((at) => lines[at]?.slice(3) ?? '')] as const]
      : [];
  });
}

// a document's: its opening's headings, then its parts (a heading after a rule), else every `##`
function documentContents(lines: readonly string[]): readonly Contents[] {
  const parts = indexesOf(
    lines,
    (line, at) =>
      line.startsWith('# ') && lines[at - 1] === '' && lines[at - 2] === RULE,
  );
  const opening = parts[0] ?? lines.length;
  const subs = indexesOf(
    lines,
    (line, at) => SUB.test(line) && (parts.length === 0 || at < opening),
  );
  const first = subs[0];
  const headings = [
    ...subs.map((at) => lines[at]?.slice(3) ?? ''),
    ...parts.map((at) => lines[at]?.slice(2) ?? ''),
  ];
  return lines.length > CONTENTS_FROM &&
    first !== undefined &&
    headings.length > 1
    ? [[first, headings]]
    : [];
}

// each Contents written above the heading it opens, the document's first
function withContents(text: string): string {
  const lines = text.split('\n');
  const above = new Map<number, readonly string[]>();
  for (const [at, headings] of [
    ...documentContents(lines),
    ...cutContents(lines),
  ])
    above.set(at, [
      ...(above.get(at) ?? []),
      '## Contents',
      '',
      ...headings.map((heading) => `- ${heading}`),
      '',
    ]);
  return lines
    .flatMap((line, at) => [...(above.get(at) ?? []), line])
    .join('\n');
}

export { withContents };
