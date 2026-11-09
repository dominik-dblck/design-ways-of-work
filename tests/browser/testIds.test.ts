import { describe, expect, it } from 'vitest';
import {
  conditionalExportsIn,
  literalIdsIn,
  unregisteredIn,
} from '../../shared/tests/testIds.ts';

const AGAINST = {
  registry: 'e2e/testingIds',
  componentRoots: ['app/components/*/*'],
  sibling: (): undefined => undefined,
};
const IMPORTS_IDS =
  "import { rowTestIds } from '../../../../e2e/testingIds/rowTestIds';\n";

describe('test ids, on sources never put on disk', () => {
  it('red · an id spelled in place, a string or a template', () => {
    expect(
      literalIdsIn({
        file: 'planted.tsx',
        text: '<Box data-testid="testid-planted" />\n<Box data-testid={`testid-${id}`} />',
      }),
    ).toEqual(['planted.tsx:1', 'planted.tsx:2']);
  });

  it('green · an id read off the registry, a branch of two registry ids', () => {
    const text = `${IMPORTS_IDS}<Box data-testid={rowTestIds.cell} />\n<Box data-testid={on ? rowTestIds.on : rowTestIds.off} />`;
    expect(
      literalIdsIn({ file: 'app/components/atoms/Row/Row.tsx', text }),
    ).toEqual([]);
    expect(
      unregisteredIn(
        { file: 'app/components/atoms/Row/Row.tsx', text },
        AGAINST,
      ),
    ).toEqual([]);
  });

  it('red · an id from nowhere, and testId its props never declare', () => {
    expect(
      unregisteredIn(
        {
          file: 'app/components/atoms/Row/Row.tsx',
          text: '<Box data-testid={somewhereElse.thing} />\n<Box data-testid={testId} />',
        },
        AGAINST,
      ),
    ).toEqual([
      'app/components/atoms/Row/Row.tsx:1 · somewhereElse',
      'app/components/atoms/Row/Row.tsx:2 · testId',
    ]);
  });

  it('green · testId forwarded where its props, or its own folder’s types file, declare it', () => {
    expect(
      unregisteredIn(
        {
          file: 'app/components/atoms/Row/Row.tsx',
          text: 'interface Props { readonly testId?: string }\n<Box data-testid={testId} />',
        },
        AGAINST,
      ),
    ).toEqual([]);
    expect(
      unregisteredIn(
        {
          file: 'app/components/atoms/Row/Row.tsx',
          text: "import type { RowProps } from './rowTypes';\n<Box data-testid={testId} />",
        },
        {
          ...AGAINST,
          sibling: (file: string) =>
            file === 'app/components/atoms/Row/rowTypes.ts'
              ? 'interface RowProps { readonly testId?: string }'
              : undefined,
        },
      ),
    ).toEqual([]);
  });

  it('red · a types file outside its folder is not the component declaring it', () => {
    expect(
      unregisteredIn(
        {
          file: 'app/components/atoms/Row/Row.tsx',
          text: "import type { RowProps } from '../Other/rowTypes';\n<Box data-testid={testId} />",
        },
        {
          ...AGAINST,
          sibling: () => 'interface RowProps { readonly testId?: string }',
        },
      ),
    ).toEqual(['app/components/atoms/Row/Row.tsx:2 · testId']);
  });

  it('red and green · a registry export one build holds and another not', () => {
    expect(
      conditionalExportsIn({
        file: 'planted.ts',
        text: "export const ids = IS_DEV ? { a: 'testid-a' } : {};\nexport const kept = { b: 'testid-b' };",
      }),
    ).toEqual(['planted.ts · ids']);
  });
});
