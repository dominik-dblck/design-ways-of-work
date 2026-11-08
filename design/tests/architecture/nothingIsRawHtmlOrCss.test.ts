/**
 * - `docs/rules/styling.md`: no hand-written HTML or CSS; a page is TSX drawn with MUI, styled in JS
 * - a stylesheet or a page file lives only where the list below names it, each with its reason
 */
import { describe, expect, it } from 'vitest';
import { reactSources } from './components.ts';
import { textsUnder } from './tree.ts';

// the files of HTML or CSS kept, each with why · everything in `legacy/` retires with phase 6
const KEPT: readonly (readonly [RegExp, string])[] = [
  [/^legacy\//, 'the Claude Design pages, until React replaces each'],
];

const RAW_MARKUP: readonly (readonly [RegExp, string])[] = [
  [/(?:^|[\s({>?:=]|&&|\|\|)<([a-z][a-z\d-]*)(?=[\s/>])/gm, 'an HTML element'],
  [/\bdangerouslySetInnerHTML\b/g, 'markup as a string'],
  [/\bstyle=\{/g, 'an inline style'],
  [/\b(?:css|keyframes|styled(?:\.\w+|\([^)]*\)))`/g, 'CSS as a string'],
  [/^\s*import\s+['"][^'"]+\.css['"]/gm, 'a stylesheet import'],
];

const isKept = (file: string): boolean =>
  KEPT.some(([where]) => where.test(file));

// each raw piece of markup or CSS in a text, as `line · what it is`
function rawIn(text: string): readonly string[] {
  return RAW_MARKUP.flatMap(([pattern, what]) =>
    [...text.matchAll(pattern)].map(
      (match) =>
        `${text.slice(0, match.index).split('\n').length} · ${what}${match[1] ? ` <${match[1]}>` : ''}`,
    ),
  );
}

describe('nothing is raw HTML or CSS', () => {
  it('the scan sees an element, a string of markup, a style and CSS; MUI and a generic pass', () => {
    expect(
      rawIn(
        [
          "import './page.css';",
          'return <div className="row">',
          '  <Box sx={{ p: 1 }}><span>{name}</span></Box>',
          '  <Stack style={{ gap: 4 }} dangerouslySetInnerHTML={{ __html: x }} />',
          '  const Row = styled.div`display: flex;`;',
          '  const [open, setOpen] = useState<boolean>(false);',
          '  const map: Map<string, number> = new Map();',
        ].join('\n'),
      ),
    ).toEqual([
      '2 · an HTML element <div>',
      '3 · an HTML element <span>',
      '4 · markup as a string',
      '4 · an inline style',
      '5 · CSS as a string',
      '1 · a stylesheet import',
    ]);
  });

  it('no file of HTML or CSS is written by hand outside the kept list', () => {
    expect(
      textsUnder('.', ['.html', '.css', '.scss', '.less'])
        .map((source) => source.path)
        .filter((file) => !isKept(file)),
    ).toEqual([]);
  });

  it('no React code writes an HTML element, an inline style or CSS as a string', () => {
    expect(
      reactSources().flatMap((source) =>
        rawIn(source.text).map((one) => `${source.path}:${one}`),
      ),
    ).toEqual([]);
  });
});
