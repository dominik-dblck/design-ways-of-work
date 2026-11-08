/**
 * - `FieldKindView`, `FieldOptionView`, `FieldRowView`, `DocTypeView` · the fields
 */
interface FieldKindView {
  readonly kind: string;
  readonly value: string;
  readonly component: string;
  readonly always: string;
  readonly validators: readonly string[];
}

interface FieldRowView {
  readonly name: string;
  readonly kind: string;
  readonly required: string;
  readonly length: string;
  readonly rules: readonly string[];
}

interface DocTypeView {
  readonly label: string;
  readonly limits: readonly string[];
  readonly groups: readonly {
    readonly title: string;
    readonly tag: string;
    readonly fields: readonly FieldRowView[];
  }[];
}

interface FieldOptionView {
  readonly name: string;
  readonly ts: string;
  readonly means: string;
}

export type { DocTypeView, FieldKindView, FieldOptionView, FieldRowView };
