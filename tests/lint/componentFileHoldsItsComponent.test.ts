import { componentFileHoldsItsComponent } from '../../shared/lint/rules/componentFileHoldsItsComponent.ts';
import { ruleTester } from './ruleTester.ts';

// two component trees, as the build side keeps a mobile renderer's beside its app's
const ROOTS = [
  { components: ['app/components', 'app/renderers/mobile/components'] },
] as const;
const at = (filename: string, code: string) => ({
  filename,
  code,
  options: ROOTS,
});
const MARK = 'app/components/atoms/Mark/Mark.tsx';
const MENU = 'app/components/molecules/Menu/Menu.tsx';

ruleTester.run(
  'component-file-holds-its-component',
  componentFileHoldsItsComponent,
  {
    valid: [
      {
        name: 'a component and its props, a directive above them',
        ...at(
          MARK,
          "'use client';\nimport type { ReactElement } from 'react';\ninterface MarkProps { readonly label: string }\nfunction Mark({ label }: MarkProps): ReactElement { return <b>{label}</b>; }\nexport { Mark };\nexport type { MarkProps };",
        ),
      },
      {
        name: 'a provider holds its context beside its provider',
        ...at(
          'app/components/organisms/Board/providers/BoardProvider.tsx',
          'const BoardContext = createContext(null);\nconst BOARD_KEY = 1;\nfunction BoardProvider() { return null; }',
        ),
      },
      {
        name: 'an icon file holds its glyph beside its icon',
        ...at(
          'app/components/icons/Glyph.tsx',
          "const PATH = 'M0';\nfunction Glyph() { return null; }",
        ),
      },
      {
        name: 'a lower-case file holds constants and one lazy component; an arrow named in capitals is a constant',
        ...at(
          'app/components/organisms/Editor/constants/editorFieldConstants.tsx',
          "const SORT = (one: number, other: number) => one - other;\nconst LazyField = dynamic(() => import('./Field.tsx'));",
        ),
      },
      {
        name: 'an overloaded component is one, its signatures its own',
        ...at(
          MENU,
          'function Menu(label: string): null;\nfunction Menu(count: number): null;\nfunction Menu(): null { return null; }',
        ),
      },
      {
        name: 'a file named in capitals holds its component alone, as any other',
        ...at(
          'app/components/atoms/UI/UI.tsx',
          'interface UIProps { readonly on: boolean }\nfunction UI(): null { return null; }',
        ),
      },
      {
        name: 'a file outside the component roots',
        ...at(
          'app/pages/board.tsx',
          'function Row() { return null; }\nfunction Board() { return null; }',
        ),
      },
      {
        name: 'a component under the second root',
        ...at(
          'app/renderers/mobile/components/atoms/Mark/Mark.tsx',
          'function Mark() { return null; }',
        ),
      },
    ],
    invalid: [
      {
        name: 'a second component, the file keeping its own',
        ...at(
          MENU,
          'function Row() { return null; }\nfunction Menu() { return null; }',
        ),
        errors: [{ messageId: 'two', line: 1 }],
      },
      {
        name: 'an arrow, a forwardRef, a memo and a lazy one each count',
        ...at(
          MENU,
          'function Menu() { return null; }\nconst Row = () => null;\nconst Field = forwardRef(function Field() { return null; });\nconst Pill = React.memo(() => null);\nconst Late = lazy(() => import("./Late.tsx"));',
        ),
        errors: [
          { messageId: 'two', line: 2 },
          { messageId: 'two', line: 3 },
          { messageId: 'two', line: 4 },
          { messageId: 'two', line: 5 },
        ],
      },
      {
        name: 'a type, a constant, a helper and a hook beside the component',
        ...at(
          'app/components/atoms/Button/Button.tsx',
          "type ButtonSize = 'sm' | 'lg';\nconst SIZES = { sm: 8 } as const;\nfunction heightOf(size: ButtonSize) { return SIZES[size]; }\nfunction useHeight() { return 1; }\nfunction Button() { return null; }",
        ),
        errors: [
          { messageId: 'beside', line: 1 },
          { messageId: 'beside', line: 2 },
          { messageId: 'beside', line: 3 },
          { messageId: 'beside', line: 4 },
        ],
      },
      {
        name: 'an overloaded helper beside the component is one breach',
        ...at(
          MENU,
          'function sizeOf(label: string): number;\nfunction sizeOf(count: number): number;\nfunction sizeOf(): number { return 1; }\nfunction Menu(): null { return null; }',
        ),
        errors: [{ messageId: 'beside', line: 1 }],
      },
      {
        name: 'beside a component named in capitals',
        ...at(
          'app/components/atoms/UI/UI.tsx',
          'const GAP = 2;\nfunction UI(): null { return null; }',
        ),
        errors: [{ messageId: 'beside', line: 1 }],
      },
      {
        name: "a constant beside a component under the second root, the renderer's own",
        ...at(
          'app/renderers/mobile/components/organisms/MobileHome/MobileHome.tsx',
          "const FIGMA_BANNER = 'x';\nfunction MobileHome() { return null; }",
        ),
        errors: [{ messageId: 'beside', line: 1 }],
      },
    ],
  },
);
