/**
 * - `slug`, `digest`, `compound`, `refs` · a case's id, print, claims, decisions
 */
const SEPARATOR = ' · ';
const OPENERS = '([{';
const CLOSERS = ')]}';
const MAX_SLUG = 60;
const MIN_CUT = 20;

function slug(text: unknown): string {
  const plain = String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (plain.length <= MAX_SLUG) return plain;
  const short = plain.slice(0, MAX_SLUG);
  const cut = short.lastIndexOf('-');
  return cut > MIN_CUT ? short.slice(0, cut) : short;
}

// FNV-1a over the text: a fingerprint to see that a test case moved, not a security hash
function digest(text: unknown): string {
  const plain = String(text);
  let hash = 0x811c9dc5;
  for (let index = 0; index < plain.length; index += 1) {
    hash ^= plain.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

// the parts of a sentence at its top level: a separator inside (), [] or {} is a reference, not a second claim
function topParts(text: unknown): string[] {
  const sentence = String(text || '');
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (let index = 0; index < sentence.length; index += 1) {
    const char = sentence.charAt(index);
    if (OPENERS.includes(char)) depth += 1;
    else if (CLOSERS.includes(char)) depth = Math.max(0, depth - 1);
    if (depth === 0 && sentence.startsWith(SEPARATOR, index)) {
      parts.push(current);
      current = '';
      index += SEPARATOR.length - 1;
    } else {
      current += char;
    }
  }
  parts.push(current);
  return parts.map((part) => part.trim()).filter(Boolean);
}

// several conditions: the top-level parts end in two or more different status codes
function compound(text: unknown): boolean {
  const codes = new Set(
    topParts(text).flatMap(
      (part) => part.match(/\b(200|400|401|403|404|409|500)\b/)?.slice(1) ?? [],
    ),
  );
  return codes.size > 1;
}

// the decisions a text names: B6, FD13, RS1, rule:contract-on-sheet-when-decided, a ticket id · an epic id is not a decision
function refs(text: string): string[] {
  const found =
    text.match(/\b(?:RULES \d+|T-E\d\d-\d\d|[A-Z]{1,3}\d{1,2}[a-z]?)\b/g) ?? [];
  return [...new Set(found.filter((ref) => !/^E\d\d$/.test(ref)))];
}

export { compound, digest, refs, slug };
