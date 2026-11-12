/**
 * - `productView/productFields.ts`: the fields on the epic that decided them alone
 */
import { describe, expect, it } from 'vitest';
import { decidedIn } from '../../sheet/model/fieldKinds.ts';
import { fieldsOf } from '../../productView/productFields.ts';

describe('the product’s fields', () => {
  it('holds the field kinds on the epic that decided them, and only there', () => {
    const fields = fieldsOf(decidedIn);
    expect(fields?.kinds.length).toBeGreaterThan(0);
    expect(fields?.options.map((one) => one.name)).toContain('localized');
    expect(fields?.code).toContain('type Field =');
    expect(fields?.docTypes[0]?.groups.length).toBeGreaterThan(0);
    expect(fieldsOf('E06')).toBeUndefined();
  });
});
