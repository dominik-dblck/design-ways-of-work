/**
 * - `FieldsSection` · the field kinds, options and code, and every block's fields
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { FeatureView } from '../../../../workspace/feature-view.ts';
import { CodeBlock } from '../../../atoms/CodeBlock/index.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { FieldOptions } from './FieldOptions.tsx';
import { FieldKindTable } from './FieldKindTable.tsx';
import { FieldTable } from './FieldTable.tsx';

function FieldsSection({ view }: { readonly view: FeatureView }): ReactElement | null {
  if (!view.fieldKinds.length && !view.docTypes.length) return null;
  return (
    <Stack spacing={2} id="fields">
      <SectionHead label={words.fields.label} note={words.fields.note} />
      <FieldKindTable kinds={view.fieldKinds} />
      <FieldOptions options={view.fieldOptions} />
      {view.fieldsCode.length ? (
        <Stack spacing={1}>
          <Typography variant="subtitle2" component="h3">{words.fields.code}</Typography>
          <CodeBlock lines={view.fieldsCode} />
        </Stack>
      ) : null}
      <SectionHead label={words.docTypes.label} note={words.docTypes.note} />
      {view.docTypes.flatMap((type) => type.groups).map((group) => (
        <FieldTable key={group.tag} title={`${group.title} · ${group.tag}`} fields={group.fields} />
      ))}
    </Stack>
  );
}

export { FieldsSection };
