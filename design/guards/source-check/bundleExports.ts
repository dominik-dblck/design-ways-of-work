/**
 * - `exportsOf` · the names a bundle hands out, with what each is set to
 */
interface Export {
  readonly name: string;
  readonly value: string;
}

const BUNDLED = /^[ \t]*exports\.[A-Za-z_$][\w$]*\s*=[^;]*;/gm;
const OPENED = /\b(?:root|window|globalThis)\.[A-Z]\w*\s*=\s*\{/;

// past a string from its quote, or a comment to its line's end; -1 when the comment never ends
function skipped(text: string, at: number): number | null {
  const char = text.charAt(at);
  if (char === "'" || char === '"' || char === '`') {
    let next = at + 1;
    while (next < text.length && text.charAt(next) !== char)
      next += text.charAt(next) === '\\' ? 2 : 1;
    return Math.min(next + 1, text.length);
  }
  if (char !== '/' || text.charAt(at + 1) !== '/') return null;
  const end = text.indexOf('\n', at);
  return end < 0 ? -1 : end + 1;
}

// the commas between the object's members, and where it closes
function membersEnd(
  text: string,
  start: number,
): { readonly commas: readonly number[]; readonly end: number } {
  const commas: number[] = [];
  let depth = 0;
  let at = start;
  while (at < text.length) {
    const next = skipped(text, at);
    if (next === -1) return { commas, end: -1 };
    if (next !== null) {
      at = next;
      continue;
    }
    const char = text.charAt(at);
    if ('{(['.includes(char)) depth += 1;
    else if ('})]'.includes(char) && depth === 0) break;
    else if ('})]'.includes(char)) depth -= 1;
    else if (depth === 0 && char === ',') commas.push(at);
    at += 1;
  }
  return { commas, end: at };
}

function memberOf(source: string): readonly Export[] {
  const found = /^\s*(get\s+)?([A-Za-z_$][\w$]*)\s*(?:\(|:\s*([\s\S]*)|$)/.exec(
    source,
  );
  if (!found || found[1]) return [];
  return [{ name: String(found[2]), value: (found[3] || '').trim() }];
}

// a bundle hands its entry's exports one line each; a file sets its global to one object
function exportsOf(text: string): readonly Export[] {
  const bundled = text.match(BUNDLED);
  if (bundled)
    return bundled.map((line) => {
      const found = /exports\.([A-Za-z_$][\w$]*)\s*=([^;]*);/.exec(line);
      return { name: String(found?.[1]), value: String(found?.[2]).trim() };
    });
  const opened = OPENED.exec(text);
  if (!opened) return [];
  const start = opened.index + opened[0].length;
  const { commas, end } = membersEnd(text, start);
  const starts = [start, ...commas.map((comma) => comma + 1)];
  const ends = [...commas, end];
  return starts.flatMap((from, index) =>
    memberOf(text.slice(from, ends[index])),
  );
}

export { exportsOf };
