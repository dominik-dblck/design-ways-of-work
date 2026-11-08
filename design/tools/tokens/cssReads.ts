/**
 * - `refuseUnlessCss` · a stylesheet that is not one stops on the line it broke
 * - `declarationsOf` · the custom properties one top-level selector declares
 * - never a delimiter count · `*.svg` in prose opens a comment and still balances
 */
import postcss from 'postcss';

// comments blanked, not cut, so a refusal cites the line the reader opens
const withoutComments = (css: string): string =>
  css.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));

// a declaration may run over several lines · it ends on the line carrying its semicolon
function strayIn(
  lines: readonly string[],
): { readonly line: number; readonly text: string } | null {
  let depth = 0;
  let open = false;
  for (const [index, raw] of lines.entries()) {
    const inside = depth > 0;
    depth += (raw.match(/\{/g) ?? []).length - (raw.match(/\}/g) ?? []).length;
    const text = raw.replace(/[{}]/g, '').trim();
    if (!inside || text === '') {
      open = inside && open;
      continue;
    }
    if (!open && !text.includes(':')) return { line: index + 1, text };
    open = !text.includes(';');
  }
  return null;
}

function refuseUnlessCss(css: string, name: string): void {
  let parsed: string | null = null;
  try {
    postcss.parse(css, { from: name });
  } catch (error) {
    parsed = error instanceof Error ? error.message : String(error);
  }
  // the scan speaks first: postcss stops at the token after the junk, the scan on the junk
  const stray = strayIn(withoutComments(css).split('\n'));
  if (stray)
    throw new Error(
      `${name}:${stray.line} · neither a declaration nor a brace · ${stray.text}`,
    );
  if (parsed !== null) throw new Error(`${name} · ${parsed}`);
}

function declarationsOf(css: string, selector: string): Map<string, string> {
  const found = new Map<string, string>();
  postcss.parse(css).walkRules((rule) => {
    if (rule.parent?.type !== 'root') return;
    if (!rule.selectors.some((one) => one.trim() === selector)) return;
    rule.walkDecls(/^--/, (decl) => {
      found.set(decl.prop, decl.value.replace(/\s+/g, ' ').trim());
    });
  });
  return found;
}

export { declarationsOf, refuseUnlessCss };
