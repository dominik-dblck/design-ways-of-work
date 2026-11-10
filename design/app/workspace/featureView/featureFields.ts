/**
 * - `fieldKindsOf`, `fieldOptionsOf` · kinds, and what any field sets: their epic
 * - `fieldsCodeOf`, `docTypesOf` · the kinds as code; each block's fields
 */
import * as FIELD_KINDS from '../../../sheet/model/fieldKinds.ts';
import { specs as SPECS } from '../../../sheet/samples/blocks.ts';
import { piecesOf } from '../contractView.ts';
import type { CodeLine } from '../contractView.ts';
import type {
  DocTypeView,
  FieldKindView,
  FieldOptionView,
  FieldRowView,
} from './featureFieldTypes.ts';

type Spec = NonNullable<(typeof SPECS)[string]>;
type Field = Spec['fields'][number];

function fieldKindsOf(epic: string): readonly FieldKindView[] {
  if (FIELD_KINDS.decidedIn !== epic) return [];
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

function rowOf(field: Field): FieldRowView {
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

function docTypesOf(epic: string): readonly DocTypeView[] {
  if (FIELD_KINDS.decidedIn !== epic) return [];
  const groups = Object.entries(SPECS).flatMap(([key, spec]) =>
    spec
      ? [{ title: spec.label, tag: key, fields: spec.fields.map(rowOf) }]
      : [],
  );
  return [{ label: 'Blocks and configs', limits: [], groups }];
}

function fieldOptionsOf(epic: string): readonly FieldOptionView[] {
  if (FIELD_KINDS.decidedIn !== epic) return [];
  return FIELD_KINDS.options.map(({ name, ts, means }) => ({
    name,
    ts,
    means,
  }));
}

function fieldsCodeOf(epic: string): readonly CodeLine[] {
  if (FIELD_KINDS.decidedIn !== epic) return [];
  return FIELD_KINDS.typeScript().split('\n').map(piecesOf);
}

export { docTypesOf, fieldKindsOf, fieldOptionsOf, fieldsCodeOf };
