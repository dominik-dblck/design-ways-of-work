/**
 * - `docs/rules/names.md`: a relative import names its file with the extension (`./glossary/modelTerms.ts`)
 * - a package import is left out; so is a declaration file's `import()` of a type
 */
import { describe, expect, it } from 'vitest';
import { productionSources, textsUnder } from './tree.ts';

const A_RELATIVE_IMPORT =
  /^\s*(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?['"](\.[^'"]*)['"]/gm;
const AN_EXTENSION = /\.(?:ts|tsx|json|mjs)$/;

const bareIn = (text: string): readonly string[] =>
  [...text.matchAll(A_RELATIVE_IMPORT)]
    .map(([, specifier]) => specifier)
    .filter((specifier) => !AN_EXTENSION.test(specifier));

describe('an import names its extension', () => {
  it('the scan sees a bare relative import, and passes one with its extension and a package', () => {
    expect(
      bareIn(
        [
          "import { terms } from './glossary/modelTerms';",
          "import type { Row } from '../model/rowTypes.ts';",
          "export { all } from './parts/allParts.ts';",
          "import data from '../fixtures/data/modes.json';",
          "import ts from 'typescript';",
        ].join('\n'),
      ),
    ).toEqual(['./glossary/modelTerms']);
  });

  it('no source of the homes, the tools or the tests imports a file without its extension', () => {
    expect(
      [...productionSources(), ...textsUnder('tests', ['.ts'])].flatMap(
        (source) => bareIn(source.text).map((one) => `${source.path} · ${one}`),
      ),
    ).toEqual([]);
  });
});
