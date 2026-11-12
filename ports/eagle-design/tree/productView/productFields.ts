/**
 * - `fieldsOf` · the field kinds, their options and code, and each block's fields
 * - on the epic that decided them alone: the Feature page draws them
 */
import * as FIELD_KINDS from '../sheet/model/fieldKinds.ts';
import { specs as SPECS } from '../sheet/samples/blocks.ts';
import type { ProductFields } from '../tools/productTypes.ts';

type Spec = NonNullable<(typeof SPECS)[string]>;
type Field = Spec['fields'][number];
type DocType = ProductFields['docTypes'][number];
type FieldRow = DocType['groups'][number]['fields'][number];

function kindsOf(): ProductFields['kinds'] {
  return FIELD_KINDS.kinds.map((kind) => ({
    kind: kind.kind,
    value: kind.value,
    component: kind.component,
    always: kind.always,
    validators: kind.validators.map((name) => {
      const found = FIELD_KINDS.validators[name];
      return found ? `${name} · at ${found.when} · ${found.means}` : name;
    }),
  }));
}

function rulesOf(field: Field): readonly string[] {
  return [
    ...(field.options ? [`one of ${field.options.join(', ')}`] : []),
    ...(field.when
      ? [`only while ${field.when.field} is ${String(field.when.is)}`]
      : []),
    ...(field.defaultValue !== undefined && field.defaultValue !== null
      ? [`default ${String(field.defaultValue)}`]
      : []),
    ...(field.description ? [`“${field.description}”`] : []),
    ...(field.translatable ? ['translated'] : []),
  ];
}

function rowOf(field: Field): FieldRow {
  const length = field.maxLength
    ? `${field.recommended ?? '—'} · ${field.maxLength}`
    : '—';
  return {
    name: field.name,
    kind: field.kind,
    required: field.requiredAt === 'submit' ? 'at submit' : 'optional',
    length,
    rules: rulesOf(field),
  };
}

function docTypeOf(): DocType {
  const groups = Object.entries(SPECS).flatMap(([key, spec]) =>
    spec
      ? [{ title: spec.label, tag: key, fields: spec.fields.map(rowOf) }]
      : [],
  );
  return { label: 'Blocks and configs', limits: [], groups };
}

function fieldsOf(epic: string): ProductFields | undefined {
  if (FIELD_KINDS.decidedIn !== epic) return undefined;
  return {
    kinds: kindsOf(),
    options: FIELD_KINDS.options.map(({ name, ts, means }) => ({
      name,
      ts,
      means,
    })),
    code: FIELD_KINDS.typeScript(),
    docTypes: [docTypeOf()],
  };
}

export { fieldsOf };
