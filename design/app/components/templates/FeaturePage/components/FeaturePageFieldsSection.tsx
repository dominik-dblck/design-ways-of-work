/**
 * - `FeaturePageFieldsSection` · the field kinds, options and code
 * - and every block's fields
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';
import { CodeBlock } from '../../../molecules/CodeBlock/index.ts';
import { Heading } from '../../../atoms/Heading/index.ts';
import { FeaturePageFieldOptions } from './FeaturePageFieldOptions.tsx';
import { FeaturePageFieldKindTable } from './FeaturePageFieldKindTable.tsx';
import { FeaturePageFieldTable } from './FeaturePageFieldTable.tsx';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';

function FeaturePageFieldsSection({
  view,
}: {
  readonly view: FeatureView;
}): ReactElement | null {
  if (!view.fieldKinds.length && !view.docTypes.length) return null;
  return (
    <FoldSection
      id="fields"
      label={words.fields.label}
      note={words.fields.note}
      count={view.fieldKinds.length}
      spacing={2}
    >
      <FeaturePageFieldKindTable kinds={view.fieldKinds} />
      <FeaturePageFieldOptions options={view.fieldOptions} />
      {view.fieldsCode.length ? (
        <Stack spacing={1}>
          <Typography variant="subtitle2" component="h3">
            {words.fields.code}
          </Typography>
          <CodeBlock lines={view.fieldsCode} />
        </Stack>
      ) : null}
      <Heading level={2} quiet note={words.docTypes.note}>
        {words.docTypes.label}
      </Heading>
      {view.docTypes
        .flatMap((type) => type.groups)
        .map((group) => (
          <FeaturePageFieldTable
            key={group.tag}
            title={`${group.title} · ${group.tag}`}
            fields={group.fields}
          />
        ))}
    </FoldSection>
  );
}

export { FeaturePageFieldsSection };
