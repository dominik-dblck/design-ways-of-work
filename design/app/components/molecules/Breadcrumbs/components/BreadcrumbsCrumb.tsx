/**
 * - `BreadcrumbsCrumb` · one crumb by its kind: a link, a switcher, or the page
 */
import type { ElementType } from 'react';
import Box from '@mui/material/Box';
import { Link } from '../../../atoms/Link/index.ts';
import {
  CRUMB_LABEL_SX,
  CRUMB_LINK_SX,
} from '../constants/breadcrumbsConstants.ts';
import type { Crumb } from '../types/breadcrumbsTypes.ts';
import { BreadcrumbsSwitch } from './BreadcrumbsSwitch.tsx';
import { crumbInkOf, crumbLabelOf } from '../utils/breadcrumbsLabelUtils.tsx';

type BreadcrumbsCrumbProps = {
  readonly crumb: Crumb;
  readonly linkComponent: ElementType;
};

/** The page links nowhere · a link to where the reader stands does nothing. */
export function BreadcrumbsCrumb({
  crumb,
  linkComponent,
}: BreadcrumbsCrumbProps): React.ReactElement {
  const { testId } = crumb;
  if (crumb.href !== undefined)
    return (
      <Link
        href={crumb.href}
        testId={testId}
        component={linkComponent}
        sx={CRUMB_LINK_SX}
      >
        {crumbLabelOf(crumb)}
      </Link>
    );
  if (crumb.onSwitch !== undefined)
    return (
      <BreadcrumbsSwitch
        label={crumb.label}
        glyph={crumb.glyph}
        expanded={crumb.expanded}
        muted={crumb.muted}
        onSwitch={crumb.onSwitch}
        testId={testId}
      />
    );
  return (
    <Box
      data-testid={testId}
      component="span"
      aria-current="page"
      sx={[CRUMB_LABEL_SX, { color: crumbInkOf(crumb.muted) }]}
    >
      {crumbLabelOf(crumb)}
    </Box>
  );
}
