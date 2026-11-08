/**
 * - `projectCheck` · a component beside its second version, a page drawing the rules
 */
import { isHistory, RULES_PAGES } from './sourceScope.ts';
import type { SourceFinding, Texts } from './sourceCheckTypes.ts';

const VIEW = 'the view of it all';

function twoVersions(names: readonly string[]): readonly SourceFinding[] {
  const all = new Set(names);
  return names.flatMap((name) => {
    const match = /^(.*?)[ _-](v\d+|copy|new|old)\.dc\.html$/i.exec(name);
    if (isHistory(name) || !match || !all.has(`${String(match[1])}.dc.html`))
      return [];
    return [
      {
        kind: 'two versions',
        row: VIEW,
        file: name,
        line: 0,
        text: `beside ${String(match[1])}.dc.html`,
      },
    ];
  });
}

// a page that reads the rules to draw them is a logic page: the rules are the sheet's data
function logicPages(pages: Texts): readonly SourceFinding[] {
  return Object.keys(pages).flatMap((name) => {
    const text = String(pages[name]);
    if (
      RULES_PAGES.includes(name) ||
      !/design_doc_mode/.test(text) ||
      !/gate-rules\.js|translation-flow\.js|role-combinations\.js/.test(text)
    )
      return [];
    return [
      {
        kind: 'logic page',
        row: VIEW,
        file: name,
        line: 0,
        text: 'a page drawing the rules, which are the sheet’s data',
      },
    ];
  });
}

function projectCheck(
  names?: readonly string[],
  pages?: Texts,
): readonly SourceFinding[] {
  return [...twoVersions(names ?? []), ...logicPages(pages ?? {})];
}

export { projectCheck };
