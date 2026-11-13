/**
 * - `PersonFace` · a person's face, or their initials
 */
import Avatar from '@mui/material/Avatar';
import type { SxProps, Theme } from '@mui/material/styles';
import { initialsOf } from '../../../utils/initialsUtils.ts';

/** Its own props, and what a wrapping hint or group hands the element · its listeners, its ref, its class. */
export type PersonFaceProps = Omit<
  React.DOMAttributes<HTMLDivElement>,
  'children' | 'dangerouslySetInnerHTML'
> & {
  readonly ref?: React.Ref<HTMLDivElement>;
  readonly className?: string;
  // the URL the edge resolved, or null for the initials
  readonly face: string | null;
  readonly name: string;
  readonly describe: boolean;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function PersonFace({
  face,
  name,
  describe,
  testId,
  sx,
  ...handed
}: PersonFaceProps): React.ReactElement {
  return (
    <Avatar
      {...handed}
      src={face ?? undefined}
      alt={describe ? name : ''}
      slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
      variant="circular"
      data-testid={testId}
      sx={sx}
    >
      {initialsOf(name)}
    </Avatar>
  );
}
