import { FLOW_SHAPES } from '../../shared/lint/flowShapes.ts';
import { SHAPES } from '../../shared/lint/shapes.ts';
import { refusal, restrictedSyntax, shapeTester } from './shapeTester.ts';

const OPTIONS = [...SHAPES, ...FLOW_SHAPES];
const AT = 'e2e/aScreen/journeys/plantedFlow.spec.ts';
const valid = (name: string, code: string) => ({
  name,
  code,
  filename: AT,
  options: OPTIONS,
});

shapeTester.run('the shapes a flow refuses', restrictedSyntax, {
  valid: [
    valid(
      'a registry id, narrowed by what it holds, and a locator from a locator',
      "await page.getByTestId(ids.row).filter({ hasText: 'x' }).click();\nconst inner = row.locator(cell);\nconst text = 'page.getByRole(x)';",
    ),
  ],
  invalid: [
    {
      ...valid(
        'by a role, a text, a label, a placeholder, and two css selectors',
        "page.getByRole('button');\npage.getByText('x');\nform.getByLabel('x');\nfield.getByPlaceholder('x');\nfield.locator('input');\npage.locator(`#${id}`);",
      ),
      errors: Array.from({ length: 6 }, () =>
        refusal(FLOW_SHAPES, 'registry id'),
      ),
    },
  ],
});
