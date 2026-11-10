/**
 * - `docs/rules/one-home.md`: a block is written once · fifty tokens alike, in two files or twice in one
 * - imports are left out; a pair the PM has still to decide is named below with its finding
 */
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const SAME_TOKENS = 50;

// a pair the sheet still holds open, or holds as two facts that agree by value, each with its reason
const OPEN: readonly (readonly [string, string])[] = [
  [
    'app/styles/componentsSpec/atomsButton.ts · app/styles/componentsSpec/atomsIconButton.ts',
    'two facts: each control names the tokens it draws, the shared choice is the tokens',
  ],
  [
    'app/styles/componentsSpec/atomsCheckbox.ts · app/styles/componentsSpec/atomsCheckbox.ts',
    'two facts: Checkbox and Radio name the same tokens unchecked, the shared choice is the tokens',
  ],
  [
    'sheet/model/catalog/campaignRows.ts · sheet/model/catalog/summerRows.ts',
    'two facts: two sample campaigns, alike by chance',
  ],
];

type Token = { readonly text: string; readonly at: number };
type Spot = { readonly source: Source; readonly start: number };

function tokensOf(source: Source): readonly Token[] {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, true);
  scanner.setText(source.text);
  const tokens: Token[] = [];
  let isInImport = false;
  for (
    let kind = scanner.scan();
    kind !== ts.SyntaxKind.EndOfFileToken;
    kind = scanner.scan()
  ) {
    if (kind === ts.SyntaxKind.ImportKeyword) isInImport = true;
    if (!isInImport)
      tokens.push({
        text: scanner.getTokenText(),
        at: scanner.getTokenStart(),
      });
    if (kind === ts.SyntaxKind.SemicolonToken) isInImport = false;
  }
  return tokens;
}

const keyOf = (tokens: readonly Token[], start: number): string =>
  createHash('sha1')
    .update(
      tokens
        .slice(start, start + SAME_TOKENS)
        .map((token) => token.text)
        .join('\u0000'),
    )
    .digest('base64');

/** Every pair of files that hold the same fifty tokens · a long copy is named once. */
function pairsWrittenTwice(sources: readonly Source[]): readonly string[] {
  const first = new Map<string, Spot>();
  const twice = new Set<string>();
  for (const source of sources) {
    const tokens = tokensOf(source);
    for (let start = 0; start + SAME_TOKENS <= tokens.length; start += 1) {
      const key = keyOf(tokens, start);
      const seen = first.get(key);
      if (seen === undefined) first.set(key, { source, start });
      else if (seen.source !== source || start - seen.start >= SAME_TOKENS)
        twice.add(`${seen.source.path} · ${source.path}`);
    }
  }
  return [...twice].sort();
}

const A_BODY = `{
  const held = replayedDocument(state);
  const refused = standingRefusal(held, streamVersion);
  if (refused) return refused;
  if (held.bulkEdit !== null) return { ok: true, events: [] };
  return { ok: true, events: [emitted({ key: 'planted', payload: {} })] };
}`;

describe('a block is written once', () => {
  it('a body in two files and twice in one are found; a shared import list is not', () => {
    const imports = Array.from(
      { length: 12 },
      (_, nth) => `import { planted${nth} } from './planted${nth}.ts';`,
    ).join('\n');
    expect(
      pairsWrittenTwice([
        { path: 'a.ts', text: `function one() ${A_BODY}` },
        { path: 'b.ts', text: `function two() ${A_BODY}` },
        {
          path: 'f.ts',
          text: `const x = () => ${A_BODY};\nconst y = () => ${A_BODY};`,
        },
        { path: 'd.ts', text: `${imports}\nexport const d = 1;` },
        { path: 'e.ts', text: `${imports}\nexport const e = 2;` },
      ]),
    ).toEqual(['a.ts · b.ts', 'a.ts · f.ts', 'f.ts · f.ts']);
  });

  it('no block is written twice but the pairs open on the sheet', () => {
    const open = new Set(OPEN.map(([pair]) => pair));
    const found = pairsWrittenTwice(productionSources());
    expect(found.filter((pair) => !open.has(pair))).toEqual([]);
    expect(
      [...open].filter((pair) => !found.includes(pair)),
      'a pair fixed leaves the list',
    ).toEqual([]);
  });
});
