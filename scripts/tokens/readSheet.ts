/**
 * - `readSheet` · a stylesheet as data: its token groups, light and dark, its fonts, its element styles
 * - every comment kept: a header opens a group, a line between tokens a part, one after a token its why
 */
import postcss from 'postcss';
import type { ChildNode, Comment, Container, Rule } from 'postcss';
import type {
  FontFace,
  Sheet,
  SheetGroup,
  SheetToken,
  Source,
} from './sheetTypes.ts';

const HEADER = /^=====\s*([^\n]*?)\s*=====([\s\S]*)$/;
const DARK = /\.dbk-dark/;

// a comment on its own line heads what follows; one beside a declaration is its why
const onItsOwnLine = (node: Comment): boolean =>
  (node.raws.before ?? '').includes('\n');

const besideText = (node: ChildNode | undefined): string | null =>
  node?.type === 'comment' && !onItsOwnLine(node) ? oneLineOf(node.text) : null;

const oneLineOf = (text: string): string => text.replace(/\s*\n\s*/g, ' ');

// a comment's lines, their shared indent removed, so a table in it keeps its columns
function dedent(text: string): string {
  const lines = text.replace(/^\n+|\s+$/g, '').split('\n');
  const indents = lines
    .filter((line) => line.trim() !== '')
    .slice(1)
    .map((line) => /^\s*/.exec(line)?.[0].length ?? 0);
  const cut = indents.length ? Math.min(...indents) : 0;
  return lines
    .map((line, at) => (at === 0 ? line.trim() : line.slice(cut)))
    .join('\n');
}

function lightOf(rule: Rule, source: Source, into: SheetGroup[]): void {
  const nodes = rule.nodes;
  for (const [at, node] of nodes.entries()) {
    if (node.type === 'comment' && onItsOwnLine(node)) {
      const header = HEADER.exec(node.text);
      if (header) {
        const [, title = '', rest = ''] = header;
        into.push({
          source,
          title,
          intro: dedent(rest),
          darkNotes: [],
          parts: [{ note: null, tokens: [] }],
        });
      } else into.at(-1)?.parts.push({ note: dedent(node.text), tokens: [] });
    }
    if (node.type !== 'decl') continue;
    const token: SheetToken = { name: node.prop, light: oneLineOf(node.value) };
    const why = besideText(nodes[at + 1]);
    if (why !== null) token.why = why;
    const part = into.at(-1)?.parts.at(-1);
    if (!part) throw new Error(`${node.prop} · declared before any group`);
    part.tokens.push(token);
  }
}

function darkOf(rule: Rule, groups: readonly SheetGroup[]): void {
  const owner = new Map(
    groups.flatMap((group) =>
      group.parts.flatMap((part) =>
        part.tokens.map((token) => [token.name, { group, token }] as const),
      ),
    ),
  );
  let pending: string[] = [];
  for (const [at, node] of rule.nodes.entries()) {
    if (node.type === 'comment' && onItsOwnLine(node))
      pending.push(dedent(node.text));
    if (node.type !== 'decl') continue;
    const held = owner.get(node.prop);
    if (!held) throw new Error(`${node.prop} · dark, and never light`);
    if (held.token.dark !== undefined)
      throw new Error(`${node.prop} · dark twice`);
    held.token.dark = node.value;
    const whyDark = besideText(rule.nodes[at + 1]);
    if (whyDark !== null) held.token.whyDark = whyDark;
    held.group.darkNotes.push(...pending);
    pending = [];
  }
}

function declsOf(container: Container): ReadonlyMap<string, string> {
  const found = new Map<string, string>();
  container.walkDecls((decl) => {
    found.set(decl.prop, decl.value);
  });
  return found;
}

function fontOf(face: Container): FontFace {
  const decls = declsOf(face);
  const src = /url\("\.\/([^"]+)"\)\s*format\("([^"]+)"\)/.exec(
    decls.get('src') ?? '',
  );
  return {
    family: (decls.get('font-family') ?? '').replace(/^"|"$/g, ''),
    file: src?.[1] ?? '',
    format: src?.[2] ?? '',
    weight: Number(decls.get('font-weight')),
    style: decls.get('font-style') ?? '',
    display: decls.get('font-display') ?? '',
  };
}

function reducedOf(media: Container, groups: readonly SheetGroup[]): void {
  for (const [name, value] of declsOf(media)) {
    const token = groups
      .flatMap((group) => group.parts.flatMap((part) => part.tokens))
      .find((one) => one.name === name);
    if (!token) throw new Error(`${name} · reduced, and never declared`);
    token.reducedMotion = value;
  }
}

function readSheet(css: string, source: Source, sheet: Sheet): void {
  const own: SheetGroup[] = [];
  postcss.parse(css).each((node) => {
    if (node.type === 'comment') sheet.notes.push(dedent(node.text));
    if (node.type === 'atrule' && node.name === 'font-face')
      sheet.fonts.push(fontOf(node));
    if (node.type === 'atrule' && node.name === 'media')
      reducedOf(node, [...sheet.groups, ...own]);
    if (node.type !== 'rule') return;
    if (node.selector === ':root') lightOf(node, source, own);
    else if (DARK.test(node.selector)) darkOf(node, [...sheet.groups, ...own]);
    else
      sheet.elements.push({
        selector: node.selector.replace(/\s+/g, ' '),
        style: [...declsOf(node)],
      });
  });
  sheet.groups.push(...own);
}

export { readSheet };
