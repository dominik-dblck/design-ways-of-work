/**
 * - `OPEN_PAIRS` · each pair of blocks written twice it holds open, with the reason
 */
const OPEN_PAIRS: readonly (readonly [pair: string, why: string])[] = [
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

export { OPEN_PAIRS };
