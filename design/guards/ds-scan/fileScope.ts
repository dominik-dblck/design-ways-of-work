/**
 * - `isBoardPage` · plan- and rules- pages are annotation, never scanned
 * - `chromeRanges`, `inChrome` · another product's bezel, marked inline, is skipped
 * - `stripComments`, `lineOf`, `cssParses` · comments blanked, a hit's line, the css
 */
function isBoardPage(base: string): boolean {
  return /^(plan|rules)-/.test(base);
}

// a bezel sits between chrome:start and chrome:end · EmailPreview and AvatarStack are exempt whole
function chromeRanges(text: string): [number, number][] {
  const out: [number, number][] = [];
  for (
    let start = text.indexOf('chrome:start');
    start >= 0;
    start = text.indexOf('chrome:start', out[out.length - 1][1] + 1)
  ) {
    const end = text.indexOf('chrome:end', start);
    out.push([start, end < 0 ? text.length : end]);
  }
  return out;
}

function inChrome(ranges: readonly [number, number][], index: number): boolean {
  return ranges.some(([start, end]) => index >= start && index <= end);
}

function lineOf(text: string, index: number): number {
  return text.slice(0, index).split('\n').length;
}

function blank(text: string): string {
  return text.replace(/[^\n]/g, ' ');
}

// a comment quoting markup is not markup: blanked, every byte kept, so a hit's line stays true
function stripComments(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(
      /(^|[^:])\/\/[^\n]*/g,
      (whole, before: string) => before + blank(whole.slice(before.length)),
    )
    .replace(/\/\*[\s\S]*?\*\//g, blank);
}

// tokens.css must parse, not merely balance: a */ at the wrong end of a header made prose CSS with every opener closed · so comments are stripped, and every non-blank line inside a block is a declaration or a brace
function cssParses(css: string): string[] {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, blank);
  let depth = 0;
  const bad: string[] = [];
  stripped.split('\n').forEach((line, index) => {
    const text = line.trim();
    if (!text) return;
    if (/^[^{}]*\{$/.test(text)) {
      depth += 1;
    } else if (text === '}') {
      depth -= 1;
    } else if (depth > 0 && !/^--?[A-Za-z][\w-]*\s*:\s*.+;$/.test(text)) {
      bad.push(`${index + 1}: ${text.slice(0, 60)}`);
    }
  });
  return bad;
}

export {
  chromeRanges,
  cssParses,
  inChrome,
  isBoardPage,
  lineOf,
  stripComments,
};
